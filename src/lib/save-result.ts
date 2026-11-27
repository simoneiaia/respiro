import type { AssessmentResult } from "./types";

export const RESULT_SAVE_ERROR =
  "Il risultato è stato calcolato, ma non è stato salvato nel tuo account. Resta disponibile solo in questa sessione: puoi scaricarlo o riprovare.";

/** Non registra risposte o errori del fornitore nei log. */
export async function persistResult(
  result: AssessmentResult,
  save: (result: AssessmentResult) => Promise<string>,
): Promise<AssessmentResult> {
  try {
    const id = await save(result);
    return { ...result, saved_id: id, save_error: null };
  } catch {
    return { ...result, save_error: RESULT_SAVE_ERROR };
  }
}
