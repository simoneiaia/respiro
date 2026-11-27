import { onSchedule } from "firebase-functions/v2/scheduler";
import { defineSecret } from "firebase-functions/params";
import { getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { logger } from "firebase-functions";
import { processReminders } from "./reminders";
import { Resend } from "resend";

if (getApps().length === 0) initializeApp();

const resendApiKey = defineSecret("RESEND_API_KEY");
const reminderFromEmail = defineSecret("REMINDER_FROM_EMAIL");

const APP_URL = "https://respiro-benessere.web.app";

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
    const db = getFirestore();
    const resend = new Resend(resendApiKey.value());
    const from = reminderFromEmail.value();
    const summary = await processReminders({
      async listUsers() {
        const snapshot = await db.collection("users")
          .where("reminder_email_enabled", "==", true).get();
        return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      },
      async latestAssessment(uid) {
        const snapshot = await db.collection("assessments")
          .where("user_id", "==", uid).orderBy("created_at", "desc").limit(1).get();
        return snapshot.empty ? null : snapshot.docs[0].data().created_at;
      },
      async send(email, idempotencyKey) {
        const { error } = await resend.emails.send({
          from, to: [email],
          subject: "Respiro: è un buon momento per un nuovo self-check",
          html: buildEmailHtml(),
        }, { idempotencyKey });
        return !error;
      },
      async markSent(uid, iso) {
        await db.collection("users").doc(uid).update({ last_reminder_email_sent_at: iso });
      },
    });
    // Solo conteggi: nessun identificativo utente o messaggio del provider nei log.
    logger.info("Reminder batch completed", summary);
  },
);
