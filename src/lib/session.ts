// Stato di sessione solo in memoria (RAM). Nessun sessionStorage, localStorage
// o cache del browser: i dati sensibili spariscono alla chiusura della scheda
// o quando l'utente cancella la sessione.

import type { Answers, AssessmentResult } from "./types";

export interface ConsentState {
  /** Conferma di avere almeno 18 anni. */
  ageConfirm: boolean;
  essential: boolean;
  health: boolean;
  saveHistory: boolean;
  /** Promemoria in-app ogni 6 mesi (solo con account). */
  sixMonthReminder: boolean;
  mode: "anonymous" | "account";
  acceptedAt: string;
}

let memoryConsent: ConsentState | null = null;
let memoryAnswers: Answers = {};
let memoryResult: AssessmentResult | null = null;

export function saveConsent(consent: ConsentState): void {
  memoryConsent = consent;
}

export function getConsent(): ConsentState | null {
  return memoryConsent;
}

export function hasValidConsent(): boolean {
  const c = memoryConsent;
  return !!c && c.ageConfirm && c.essential && c.health;
}

/** @deprecated Le risposte restano solo nello stato React del questionario. */
export function saveAnswers(_answers: Answers): void {
  memoryAnswers = _answers;
}

export function getAnswers(): Answers {
  return { ...memoryAnswers };
}

export function saveResult(result: AssessmentResult): void {
  memoryResult = result;
}

export function getResult(): AssessmentResult | null {
  return memoryResult;
}

/** Cancella tutti i dati della sessione corrente dalla memoria. */
export function clearSession(): void {
  memoryConsent = null;
  memoryAnswers = {};
  memoryResult = null;
}
