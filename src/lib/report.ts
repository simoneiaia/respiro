// Costruzione del report testuale (copia / download / stampa).
// Wording prudente e non diagnostico. Include sempre il disclaimer.

import type { AssessmentResult } from "./types";
import { BAND_COPY } from "./questionnaire";
import { APP_NAME, HELPLINES } from "./brand";

export function buildReportText(result: AssessmentResult, dateISO?: string): string {
  const copy = BAND_COPY[result.band];
  const date = new Date(dateISO ?? Date.now()).toLocaleString("it-IT", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const areas = result.area_scores
    .filter((a) => a.count > 0)
    .map((a) => `  - ${a.label}: media ${a.mean_score.toFixed(1)} / 4`)
    .join("\n");

  const lines = [
    `${APP_NAME.toUpperCase()} · REPORT ORIENTATIVO`,
    "(self-report, non diagnostico)",
    "",
    `Data: ${date}`,
    "Periodo di riferimento: ultimi 14 giorni",
    "",
    `Fascia orientativa: ${copy.label}`,
    `Punteggio medio: ${result.total_mean_score.toFixed(2)} / 4`,
    `Punteggio (formato 0-40): ${result.total_clinical_score} / 40`,
    "",
    "Segnali per area:",
    areas,
    "",
    "Lettura:",
    copy.text,
  ];

  if (result.risk_flag) {
    lines.push(
      "",
      "Nota di sicurezza:",
      `Sono emersi segnali che meritano attenzione. In caso di pericolo immediato chiama il ${HELPLINES.emergency.number}. Questo risultato non è una diagnosi e non sostituisce un professionista.`,
    );
  }

  if (result.notes && result.notes.trim()) {
    lines.push("", "Nota personale:", result.notes.trim());
  }

  lines.push(
    "",
    "---",
    `Questo strumento (${APP_NAME}) offre un'indicazione orientativa e non costituisce diagnosi, trattamento, consulenza sanitaria o psicoterapia. In caso di disagio significativo, rivolgiti a un professionista qualificato. In caso di emergenza o pericolo immediato, chiama il ${HELPLINES.emergency.number}.`,
  );

  return lines.join("\n");
}

/** Avvia il download del report come file di testo. */
export function downloadReport(result: AssessmentResult, dateISO?: string): void {
  if (typeof window === "undefined") return;
  const text = buildReportText(result, dateISO);
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `self-check-${new Date(dateISO ?? Date.now()).toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
