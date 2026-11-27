export interface ReminderUser {
  id: string;
  email?: unknown;
  reminder_email_enabled?: unknown;
  last_reminder_email_sent_at?: unknown;
}

export interface ReminderDependencies {
  listUsers(): Promise<ReminderUser[]>;
  latestAssessment(uid: string): Promise<unknown>;
  send(email: string, idempotencyKey: string): Promise<boolean>;
  markSent(uid: string, iso: string): Promise<void>;
}

const COOLDOWN_MS = 14 * 24 * 60 * 60 * 1000;

function parseDate(value: unknown): Date | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date : null;
}

/** Sei mesi di calendario, senza slittare al mese successivo nei giorni 29–31. */
export function reminderDueDate(lastAssessment: unknown): Date | null {
  const date = parseDate(lastAssessment);
  if (!date) return null;
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + 6);
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, lastDay));
  return date;
}

export async function processReminders(deps: ReminderDependencies, now = new Date()) {
  const summary = { sent: 0, skipped: 0, failed: 0 };
  for (const user of await deps.listUsers()) {
    if (user.reminder_email_enabled !== true || typeof user.email !== "string" || !user.email.trim()) {
      summary.skipped++;
      continue;
    }
    if (user.last_reminder_email_sent_at != null) {
      const sentAt = parseDate(user.last_reminder_email_sent_at);
      if (!sentAt || now.getTime() - sentAt.getTime() < COOLDOWN_MS) {
        summary.skipped++;
        continue;
      }
    }
    try {
      const due = reminderDueDate(await deps.latestAssessment(user.id));
      if (!due || now < due) { summary.skipped++; continue; }
      const key = `respiro-reminder/${user.id}/${due.toISOString().slice(0, 10)}`;
      if (await deps.send(user.email.trim(), key)) {
        await deps.markSent(user.id, now.toISOString());
        summary.sent++;
      } else {
        summary.failed++;
      }
    } catch {
      // Un singolo record o invio fallito non impedisce gli altri promemoria.
      summary.failed++;
    }
  }
  return summary;
}
