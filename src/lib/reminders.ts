/** Intervallo consigliato tra un self-check e il successivo (mesi). */
export const REMINDER_INTERVAL_MONTHS = 6;

export function addMonths(iso: string, months: number): Date {
  const d = new Date(iso);
  d.setMonth(d.getMonth() + months);
  return d;
}

/** True se è passato abbastanza tempo dall'ultimo check salvato. */
export function isReminderDue(
  lastAssessmentAt: string | null | undefined,
  reminderEnabled: boolean,
): boolean {
  if (!reminderEnabled || !lastAssessmentAt) return false;
  return new Date() >= addMonths(lastAssessmentAt, REMINDER_INTERVAL_MONTHS);
}

export function daysUntilReminder(lastAssessmentAt: string): number {
  const due = addMonths(lastAssessmentAt, REMINDER_INTERVAL_MONTHS);
  const diff = due.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function formatReminderDueDate(lastAssessmentAt: string): string {
  return addMonths(lastAssessmentAt, REMINDER_INTERVAL_MONTHS).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
