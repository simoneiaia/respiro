"use client";

import { useState } from "react";
import { buildReportText, downloadReport } from "@/lib/report";
import type { AssessmentResult } from "@/lib/types";

// Azioni di export del report: copia, download .txt, stampa/PDF.
// Il report include sempre disclaimer e wording non diagnostico.
export function ExportActions({
  result,
  dateISO,
}: {
  result: AssessmentResult;
  dateISO?: string;
}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(buildReportText(result, dateISO)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div className="no-print flex flex-wrap gap-2">
      <button onClick={copy} className="btn-secondary">
        {copied ? "Copiato ✓" : "Copia report"}
      </button>
      <button onClick={() => downloadReport(result, dateISO)} className="btn-secondary">
        Scarica .txt
      </button>
      <button onClick={() => window.print()} className="btn-secondary">
        Stampa / PDF
      </button>
    </div>
  );
}
