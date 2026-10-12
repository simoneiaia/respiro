"use client";

import { useState } from "react";
import { useUser } from "@/lib/useUser";
import { downloadAssessmentsExport } from "@/lib/firebase/assessments";

export function ExportHistoryPanel() {
  const { user, configured } = useUser();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!configured || !user) return null;

  async function exportData() {
    setBusy(true);
    setError(null);
    try {
      await downloadAssessmentsExport();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore durante l'esportazione.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-brand-900">Esporta i tuoi dati</h2>
        <p className="mt-1 text-sm text-brand-700">
          Scarica un file JSON con tutti i risultati salvati nel tuo account (punteggi, fasce,
          date, note). Non include le singole risposte al questionario.
        </p>
      </div>
      <button onClick={exportData} disabled={busy} className="btn-secondary">
        {busy ? "Esportazione…" : "Scarica storico (.json)"}
      </button>
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}
