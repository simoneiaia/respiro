/** Utility di sicurezza: sanitizzazione input e limiti anti-fughe dati. */

export const MAX_NOTE_LENGTH = 2000;

/** Rimuove caratteri di controllo e normalizza spazi. */
export function sanitizeNote(text: string): string {
  return text
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_NOTE_LENGTH);
}

/** Blocca log accidentali di dati sensibili in produzione. */
export function safeLog(context: string, message: string): void {
  if (process.env.NODE_ENV === "development") {
    console.warn(`[${context}] ${message}`);
  }
}
