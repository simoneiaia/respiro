// Funzioni pure di scoring. Nessuna dipendenza dalla UI o da Supabase.
// Testabili in isolamento (vedi __tests__/scoring.test.ts).

import type {
  Answers,
  AreaScore,
  AssessmentResult,
  BandKey,
  Question,
  Questionnaire,
} from "../types";

/**
 * Punteggio di una singola risposta.
 * Inversione: scored = scale.max - answer; diretto: scored = answer.
 */
export function scoreAnswer(
  question: Pick<Question, "reverse_scored">,
  answerValue: number,
  scaleMax: number,
): number {
  return question.reverse_scored ? scaleMax - answerValue : answerValue;
}

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
}

/**
 * Punteggio in formato 0–40 a partire dalla media 0–4 (media × 10).
 * È solo una riscalatura della media, non una soglia clinica.
 */
export function clinicalScore(meanScore: number): number {
  return Math.round(meanScore * 10);
}

/** Assegna la fascia a partire dalla media e dalle soglie del questionario. */
export function assignBand(meanScore: number, bands: Questionnaire["bands"]): BandKey {
  for (const band of bands) {
    if (meanScore >= band.min_mean && meanScore <= band.max_mean) {
      return band.key;
    }
  }
  // Fallback prudenziale: se fuori range alto, fascia massima; altrimenti minima.
  const sorted = [...bands].sort((a, b) => a.min_mean - b.min_mean);
  if (meanScore > sorted[sorted.length - 1].max_mean) {
    return sorted[sorted.length - 1].key;
  }
  return sorted[0].key;
}

/** Punteggi per area (somma e media dei valori già invertiti). */
export function calculateAreaScores(
  questionnaire: Questionnaire,
  answers: Answers,
): AreaScore[] {
  const { areas, questions, scale, bands } = questionnaire;

  return areas.map((area) => {
    const areaQuestions = questions.filter((q) => q.area === area.key);
    const scored: number[] = [];

    for (const q of areaQuestions) {
      const raw = answers[q.id];
      if (raw === undefined || raw === null) continue;
      scored.push(scoreAnswer(q, raw, scale.max));
    }

    const raw_score = scored.reduce((a, b) => a + b, 0);
    const mean_score = mean(scored);

    return {
      area_key: area.key,
      label: area.label,
      raw_score,
      mean_score,
      band: assignBand(mean_score, bands),
      count: scored.length,
    };
  });
}

/**
 * Rileva il rischio. risk_flag = true se almeno una risposta a un item di
 * rischio ricade in risk_trigger_values. Nessuna interpretazione, solo flag.
 */
export function detectRisk(
  questionnaire: Questionnaire,
  answers: Answers,
): { risk_flag: boolean; triggered_count: number } {
  let triggered = 0;
  for (const q of questionnaire.questions) {
    if (!q.is_risk_item) continue;
    const value = answers[q.id];
    if (value === undefined || value === null) continue;
    if (q.risk_trigger_values.includes(value)) triggered += 1;
  }
  return { risk_flag: triggered > 0, triggered_count: triggered };
}

/** Verifica che una singola risposta attivi un trigger di rischio. */
export function isRiskTriggered(question: Question, value: number | undefined): boolean {
  if (!question.is_risk_item || value === undefined || value === null) return false;
  return question.risk_trigger_values.includes(value);
}

/** Calcolo completo dell'assessment. */
export function scoreAssessment(
  questionnaire: Questionnaire,
  answers: Answers,
): AssessmentResult {
  const { questions, scale, bands } = questionnaire;

  const scoredValues: number[] = [];
  for (const q of questions) {
    const raw = answers[q.id];
    if (raw === undefined || raw === null) continue;
    scoredValues.push(scoreAnswer(q, raw, scale.max));
  }

  const total_raw_score = scoredValues.reduce((a, b) => a + b, 0);
  const total_mean_score = mean(scoredValues);
  const area_scores = calculateAreaScores(questionnaire, answers);
  const { risk_flag, triggered_count } = detectRisk(questionnaire, answers);

  return {
    questionnaire_slug: questionnaire.slug,
    questionnaire_version: questionnaire.version,
    total_raw_score,
    total_mean_score,
    total_clinical_score: clinicalScore(total_mean_score),
    band: assignBand(total_mean_score, bands),
    area_scores,
    risk_flag,
    safety_message_required: risk_flag,
    risk_triggered_count: triggered_count,
    saved_id: null,
  };
}

/** Elenco id delle domande obbligatorie senza risposta valida. */
export function missingRequired(questionnaire: Questionnaire, answers: Answers): string[] {
  const { min, max } = questionnaire.scale;
  return questionnaire.questions
    .filter((q) => q.required)
    .filter((q) => {
      const v = answers[q.id];
      return v === undefined || v === null || v < min || v > max;
    })
    .map((q) => q.id);
}
