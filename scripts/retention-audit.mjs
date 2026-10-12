#!/usr/bin/env node
/**
 * Audit (e opzionale purge) retention GDPR per Respiro.
 *
 * Policy (LEGAL v3.1):
 * - assessments: max 24 mesi dalla created_at
 * - users inattivi: 24 mesi senza accesso (last_login_at / updated_at / created_at)
 * - --apply cancella assessment scaduti + account inattivi (Firestore), senza preavviso email
 *   (la privacy v3.2 e il preavviso generale art. 13)
 *
 * Uso:
 *   npm run retention:audit              # dry-run
 *   npm run retention:apply              # purge automatica
 *   node scripts/retention-audit.mjs --json
 *
 * Auth (in ordine):
 *   1. GOOGLE_APPLICATION_CREDENTIALS (service account) — consente anche delete Auth
 *   2. Token da `firebase login` (~/.config/configstore/firebase-tools.json)
 */

import { createRequire } from "module";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { homedir } from "os";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const APPLY = process.argv.includes("--apply");
const AS_JSON = process.argv.includes("--json");
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "respiro-benessere";
const ASSESSMENT_MONTHS = Number(process.env.RETENTION_ASSESSMENT_MONTHS || 24);
const INACTIVITY_MONTHS = Number(process.env.RETENTION_INACTIVITY_MONTHS || 24);

function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function monthsAgo(months) {
  return addMonths(new Date(), -months);
}

function loadFirebaseCliToken() {
  const p = join(homedir(), ".config/configstore/firebase-tools.json");
  if (!existsSync(p)) return null;
  try {
    const cfg = JSON.parse(readFileSync(p, "utf8"));
    return cfg?.tokens?.access_token || null;
  } catch {
    return null;
  }
}

function firestoreValue(v) {
  if (v == null) return null;
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return Number(v.doubleValue);
  if ("booleanValue" in v) return v.booleanValue;
  if ("timestampValue" in v) return v.timestampValue;
  if ("nullValue" in v) return null;
  if ("mapValue" in v) {
    const out = {};
    for (const [k, val] of Object.entries(v.mapValue.fields || {})) {
      out[k] = firestoreValue(val);
    }
    return out;
  }
  if ("arrayValue" in v) {
    return (v.arrayValue.values || []).map(firestoreValue);
  }
  return null;
}

function docToObject(doc) {
  const fields = doc.fields || {};
  const data = {};
  for (const [k, v] of Object.entries(fields)) data[k] = firestoreValue(v);
  const id = doc.name.split("/").pop();
  return { id, data };
}

async function listCollectionRest(accessToken, collectionId) {
  const docs = [];
  let pageToken = "";
  do {
    const url = new URL(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collectionId}`,
    );
    url.searchParams.set("pageSize", "300");
    if (pageToken) url.searchParams.set("pageToken", pageToken);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Firestore REST ${collectionId}: ${res.status} ${text}`);
    }
    const json = await res.json();
    for (const doc of json.documents || []) docs.push(docToObject(doc));
    pageToken = json.nextPageToken || "";
  } while (pageToken);
  return docs;
}

async function deleteDocRest(accessToken, collectionId, id) {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collectionId}/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Delete ${collectionId}/${id}: ${res.status} ${text}`);
  }
}

async function runWithRest(accessToken) {
  const cutoffAssessments = monthsAgo(ASSESSMENT_MONTHS);
  const cutoffInactivity = monthsAgo(INACTIVITY_MONTHS);

  const assessments = await listCollectionRest(accessToken, "assessments");
  const users = await listCollectionRest(accessToken, "users");

  const expiredAssessments = [];
  for (const { id, data } of assessments) {
    const created = data.created_at ? new Date(data.created_at) : null;
    if (!created || Number.isNaN(created.getTime())) continue;
    if (created < cutoffAssessments) {
      expiredAssessments.push({
        id,
        user_id: data.user_id ?? null,
        created_at: data.created_at,
        band: data.band ?? null,
      });
    }
  }

  const inactiveUsers = [];
  for (const { id, data } of users) {
    const candidates = [
      data.last_login_at,
      data.last_access_at,
      data.updated_at,
      data.created_at,
      data.reminder_enabled_at,
    ]
      .filter(Boolean)
      .map((v) => new Date(v))
      .filter((d) => !Number.isNaN(d.getTime()));

    const lastActivity =
      candidates.length > 0
        ? new Date(Math.max(...candidates.map((d) => d.getTime())))
        : null;

    // Solo con data di attivita chiara oltre soglia (niente delete "alla cieca")
    if (lastActivity && lastActivity < cutoffInactivity) {
      inactiveUsers.push({
        id,
        email: data.email ?? null,
        last_activity_at: lastActivity.toISOString(),
        note: "oltre soglia inattivita",
      });
    }
  }

  const report = {
    generated_at: new Date().toISOString(),
    project_id: PROJECT_ID,
    mode: APPLY ? "apply" : "dry-run",
    auth: "firebase-cli-token",
    policy: {
      assessment_max_months: ASSESSMENT_MONTHS,
      inactivity_months: INACTIVITY_MONTHS,
      assessment_cutoff: cutoffAssessments.toISOString(),
      inactivity_cutoff: cutoffInactivity.toISOString(),
      prior_notice_required: false,
    },
    counts: {
      assessments_scanned: assessments.length,
      assessments_expired: expiredAssessments.length,
      users_scanned: users.length,
      users_inactive_candidates: inactiveUsers.length,
    },
    expired_assessments: expiredAssessments,
    inactive_user_candidates: inactiveUsers,
    actions_taken: [],
  };

  if (APPLY) {
    for (const item of expiredAssessments) {
      await deleteDocRest(accessToken, "assessments", item.id);
      report.actions_taken.push({ type: "deleted_assessment", id: item.id });
    }
    for (const user of inactiveUsers) {
      const userAssessments = assessments.filter((a) => a.data.user_id === user.id);
      for (const a of userAssessments) {
        await deleteDocRest(accessToken, "assessments", a.id);
        report.actions_taken.push({
          type: "deleted_assessment_for_inactive_user",
          id: a.id,
          user_id: user.id,
        });
      }
      await deleteDocRest(accessToken, "users", user.id);
      report.actions_taken.push({ type: "deleted_user_doc", id: user.id });
    }
  }

  return report;
}

async function runWithAdmin() {
  let admin;
  try {
    admin = require(join(ROOT, "functions/node_modules/firebase-admin"));
  } catch {
    admin = require("firebase-admin");
  }
  if (!admin.apps.length) admin.initializeApp({ projectId: PROJECT_ID });
  const db = admin.firestore();
  const cutoffAssessments = monthsAgo(ASSESSMENT_MONTHS);
  const cutoffInactivity = monthsAgo(INACTIVITY_MONTHS);

  const assessmentsSnap = await db.collection("assessments").get();
  const usersSnap = await db.collection("users").get();

  const expiredAssessments = [];
  for (const doc of assessmentsSnap.docs) {
    const data = doc.data();
    const created = data.created_at ? new Date(data.created_at) : null;
    if (!created || Number.isNaN(created.getTime())) continue;
    if (created < cutoffAssessments) {
      expiredAssessments.push({
        id: doc.id,
        user_id: data.user_id ?? null,
        created_at: data.created_at,
        band: data.band ?? null,
      });
    }
  }

  const inactiveUsers = [];
  for (const doc of usersSnap.docs) {
    const data = doc.data();
    const candidates = [
      data.last_login_at,
      data.last_access_at,
      data.updated_at,
      data.created_at,
      data.reminder_enabled_at,
    ]
      .filter(Boolean)
      .map((v) => new Date(v))
      .filter((d) => !Number.isNaN(d.getTime()));
    const lastActivity =
      candidates.length > 0
        ? new Date(Math.max(...candidates.map((d) => d.getTime())))
        : null;
    if (lastActivity && lastActivity < cutoffInactivity) {
      inactiveUsers.push({
        id: doc.id,
        email: data.email ?? null,
        last_activity_at: lastActivity.toISOString(),
        note: "oltre soglia inattivita",
      });
    }
  }

  const report = {
    generated_at: new Date().toISOString(),
    project_id: PROJECT_ID,
    mode: APPLY ? "apply" : "dry-run",
    auth: "firebase-admin",
    policy: {
      assessment_max_months: ASSESSMENT_MONTHS,
      inactivity_months: INACTIVITY_MONTHS,
      assessment_cutoff: cutoffAssessments.toISOString(),
      inactivity_cutoff: cutoffInactivity.toISOString(),
      prior_notice_required: false,
    },
    counts: {
      assessments_scanned: assessmentsSnap.size,
      assessments_expired: expiredAssessments.length,
      users_scanned: usersSnap.size,
      users_inactive_candidates: inactiveUsers.length,
    },
    expired_assessments: expiredAssessments,
    inactive_user_candidates: inactiveUsers,
    actions_taken: [],
  };

  if (APPLY) {
    for (const item of expiredAssessments) {
      await db.collection("assessments").doc(item.id).delete();
      report.actions_taken.push({ type: "deleted_assessment", id: item.id });
    }
    for (const user of inactiveUsers) {
      const q = await db.collection("assessments").where("user_id", "==", user.id).get();
      for (const d of q.docs) {
        await d.ref.delete();
        report.actions_taken.push({
          type: "deleted_assessment_for_inactive_user",
          id: d.id,
          user_id: user.id,
        });
      }
      await db.collection("users").doc(user.id).delete();
      report.actions_taken.push({ type: "deleted_user_doc", id: user.id });
      try {
        await admin.auth().deleteUser(user.id);
        report.actions_taken.push({ type: "deleted_auth_user", id: user.id });
      } catch (e) {
        report.actions_taken.push({
          type: "auth_delete_skipped",
          id: user.id,
          reason: e instanceof Error ? e.message : String(e),
        });
      }
    }
  }
  return report;
}

function printReport(report) {
  const reportsDir = join(ROOT, "scripts/reports");
  mkdirSync(reportsDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outPath = join(reportsDir, `retention-${stamp}.json`);
  writeFileSync(outPath, JSON.stringify(report, null, 2));
  report.report_path = outPath;

  if (AS_JSON) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log(`Respiro retention audit (${report.mode})`);
  console.log(`Progetto: ${report.project_id} · auth: ${report.auth}`);
  console.log(`Assessments scansionati: ${report.counts.assessments_scanned}`);
  console.log(
    `Assessments scaduti (>${report.policy.assessment_max_months} mesi): ${report.counts.assessments_expired}`,
  );
  console.log(`Users scansionati: ${report.counts.users_scanned}`);
  console.log(
    `Users candidati inattivita (>${report.policy.inactivity_months} mesi): ${report.counts.users_inactive_candidates}`,
  );
  if (APPLY) {
    console.log(`Azioni eseguite: ${report.actions_taken.length}`);
  } else {
    console.log(
      "Dry-run: nessuna cancellazione. Usa npm run retention:apply per purge automatica (assessment scaduti + account inattivi).",
    );
  }
  console.log(`Report: ${outPath}`);
}

async function main() {
  let report;
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    report = await runWithAdmin();
  } else {
    const token = process.env.FIREBASE_ACCESS_TOKEN || loadFirebaseCliToken();
    if (!token) {
      throw new Error(
        "Nessuna credenziale. Imposta GOOGLE_APPLICATION_CREDENTIALS oppure esegui firebase login.",
      );
    }
    report = await runWithRest(token);
  }
  printReport(report);
}

main().catch((err) => {
  console.error("Retention audit fallito:", err.message || err);
  process.exit(1);
});
