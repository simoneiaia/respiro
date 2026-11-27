"use client";

import { useState } from "react";
import { buildReportText, downloadReport } from "@/lib/report";
import type { AssessmentResult } from "@/lib/types";

export function ExportActions({ result, dateISO }: { result: AssessmentResult; dateISO?: string }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  async function copy() {
    setCopied(false);
    setCopyError(false);
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(buildReportText(result, dateISO));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  }

  return (
    <div className="no-print space-y-3">
      <div className="flex flex-wrap gap-2">
        <button onClick={copy} className="btn-secondary">{copied ? "Copiato ✓" : "Copia report"}</button>
        <button onClick={() => downloadReport(result, dateISO)} className="btn-secondary">Scarica .txt</button>
        <button onClick={() => window.print()} className="btn-secondary">Stampa / PDF</button>
      </div>
      {copyError && <div role="status" className="space-y-2 text-sm text-brand-700">
        <p>Il browser non ha consentito la copia. Seleziona il testo qui sotto oppure usa Scarica .txt.</p>
        <label htmlFor="report-copy" className="block font-medium">Testo del report</label>
        <textarea id="report-copy" readOnly value={buildReportText(result, dateISO)} rows={8}
          onFocus={(event) => event.currentTarget.select()}
          className="w-full rounded-xl border border-brand-200 p-3" />
      </div>}
    </div>
  );
}
