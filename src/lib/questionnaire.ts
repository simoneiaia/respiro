// Caricamento e validazione della configurazione questionario.
// Il contenuto vive in /data/questionnaire.json e può essere sostituito
// senza toccare la logica di scoring o la UI.

import raw from "../../data/questionnaire.json";
import type { Questionnaire, BandKey } from "./types";

export const questionnaire = raw as Questionnaire;

/** Copy per fascia (orientativo, non clinico). Vedi 08_SCORING_AND_RESULTS.md */
export const BAND_COPY: Record<BandKey, { label: string; text: string }> = {
  low: {
    label: "Segnali lievi",
    text: "Il risultato suggerisce segnali lievi di disagio percepito nelle risposte fornite. Questo non significa che eventuali difficoltà vadano ignorate. Può essere utile continuare a osservare il proprio benessere nel tempo.",
  },
  moderate: {
    label: "Segnali presenti",
    text: "Il risultato suggerisce la presenza di alcuni segnali di disagio percepito. Potrebbe essere utile parlarne con una persona di fiducia o con un professionista, soprattutto se questi segnali persistono.",
  },
  high: {
    label: "Segnali più intensi",
    text: "Il risultato suggerisce segnali più intensi di disagio percepito. Questo strumento non formula diagnosi, ma può essere opportuno confrontarsi con uno psicologo, psicoterapeuta o medico.",
  },
  very_high: {
    label: "Segnali intensi",
    text: "Il risultato suggerisce segnali intensi di disagio percepito. Questo strumento non sostituisce una valutazione professionale. Considera la possibilità di chiedere supporto quanto prima a un professionista o a una persona di fiducia.",
  },
};

/** Colore indicativo per fascia (uso UI/grafici). Tonalità sobrie, non allarmanti. */
export const BAND_COLOR: Record<BandKey, string> = {
  low: "#7c9a7e", // sage
  moderate: "#caa15a", // ambra tenue
  high: "#bd7b48", // ocra
  very_high: "#9a4f43", // terracotta scuro
};

export const BAND_ORDER: BandKey[] = ["low", "moderate", "high", "very_high"];

/**
 * Validazione di integrità della configurazione. Lanciata a build/import time
 * in sviluppo per individuare errori nel JSON. Non blocca a runtime in prod.
 */
export function validateQuestionnaire(q: Questionnaire): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const areaKeys = new Set(q.areas.map((a) => a.key));

  if (!q.version) errors.push("Versione questionario mancante.");
  if (!q.questions.length) errors.push("Nessuna domanda configurata.");

  for (const question of q.questions) {
    if (!question.text?.trim()) errors.push(`Domanda ${question.id} senza testo.`);
    if (ids.has(question.id)) errors.push(`Id domanda duplicato: ${question.id}.`);
    ids.add(question.id);
    if (!areaKeys.has(question.area)) {
      errors.push(`Domanda ${question.id} con area non valida: ${question.area}.`);
    }
    for (const v of question.risk_trigger_values) {
      if (v < q.scale.min || v > q.scale.max) {
        errors.push(`Domanda ${question.id}: risk_trigger_value ${v} fuori scala.`);
      }
    }
  }
  return errors;
}

// In sviluppo, segnala eventuali problemi di configurazione in console.
if (process.env.NODE_ENV !== "production") {
  const errs = validateQuestionnaire(questionnaire);
  if (errs.length) {
    // Errori di config, non risposte utente: log consentito.
    console.warn("[questionnaire] problemi di configurazione:\n" + errs.join("\n"));
  }
}
