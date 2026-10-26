import { onSchedule } from "firebase-functions/v2/scheduler";
import { defineSecret } from "firebase-functions/params";
import * as admin from "firebase-admin";
import { Resend } from "resend";

admin.initializeApp();

const resendApiKey = defineSecret("RESEND_API_KEY");
const reminderFromEmail = defineSecret("REMINDER_FROM_EMAIL");

const APP_URL = "https://respiro-benessere.web.app";
const REMINDER_MONTHS = 6;

function addMonths(iso: string, months: number): Date {
  const d = new Date(iso);
  d.setMonth(d.getMonth() + months);
  return d;
}

function buildEmailHtml(): string {
  return `
    <div style="font-family: system-ui, sans-serif; max-width: 520px; margin: 0 auto; color: #0f172a;">
      <p style="font-size: 18px; font-weight: 600;">Ciao,</p>
      <p style="line-height: 1.6;">
        sono passati circa 6 mesi dal tuo ultimo self-check su <strong>Respiro</strong>.
        Rifarlo ti aiuta a capire come stai oggi, senza giudizio e senza diagnosi.
      </p>
      <p style="margin: 28px 0;">
        <a href="${APP_URL}/consenso"
           style="background: #2563eb; color: #fff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 600;">
          Fai un nuovo self-check
        </a>
      </p>
      <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
        Ricevi questa email perché hai attivato il promemoria. Puoi disattivarlo in qualsiasi
        momento da Gestione dati nell'app. In caso di emergenza chiama il 112.
      </p>
    </div>
  `;
}

/** Ogni giorno alle 9:00 (Roma) invia email a chi ha superato i 6 mesi dall'ultimo check. */
export const sendSixMonthReminders = onSchedule(
  {
    schedule: "0 9 * * *",
    timeZone: "Europe/Rome",
    secrets: [resendApiKey, reminderFromEmail],
  },
  async () => {
    const db = admin.firestore();
    const resend = new Resend(resendApiKey.value());
    const from = reminderFromEmail.value();

    const usersSnap = await db
      .collection("users")
      .where("reminder_email_enabled", "==", true)
      .get();

    for (const userDoc of usersSnap.docs) {
      const uid = userDoc.id;
      const prefs = userDoc.data();
      const email = prefs.email as string | undefined;
      if (!email) continue;

      const lastSent = prefs.last_reminder_email_sent_at as string | undefined;
      if (lastSent) {
        const daysSince =
          (Date.now() - new Date(lastSent).getTime()) / (1000 * 60 * 60 * 24);
        if (daysSince < 14) continue;
      }

      const assessmentsSnap = await db
        .collection("assessments")
        .where("user_id", "==", uid)
        .orderBy("created_at", "desc")
        .limit(1)
        .get();

      if (assessmentsSnap.empty) continue;

      const lastAt = assessmentsSnap.docs[0].data().created_at as string;
      const dueDate = addMonths(lastAt, REMINDER_MONTHS);
      if (new Date() < dueDate) continue;

      const dueKey = dueDate.toISOString().slice(0, 10);
      const { error } = await resend.emails.send(
        {
          from,
          to: [email],
          subject: "Respiro: è un buon momento per un nuovo self-check",
          html: buildEmailHtml(),
        },
        { idempotencyKey: `respiro-reminder/${uid}/${dueKey}` },
      );

      if (!error) {
        await userDoc.ref.update({
          last_reminder_email_sent_at: new Date().toISOString(),
        });
      } else {
        console.error(`Reminder failed for ${uid}:`, error.message);
      }
    }
  },
);
