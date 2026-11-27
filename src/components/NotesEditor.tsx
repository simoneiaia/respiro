"use client";

import { useState } from "react";
import { MAX_NOTE_LENGTH, sanitizeNote } from "@/lib/security";

export function NotesEditor({ savedId, initial = "", onSave, disabled = false }: {
  savedId?: string | null;
  initial?: string;
  onSave: (notes: string) => Promise<void>;
  disabled?: boolean;
}) {
  const [value, setValue] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const trimmed = value.trim();
  const unchanged = trimmed === initial.trim();

  async function save() {
    setStatus("saving");
    setError(null);
    try {
      const sanitized = sanitizeNote(trimmed);
      await onSave(sanitized);
      setValue(sanitized);
      setStatus("saved");
    } catch {
      setError("Nota non salvata. Il testo resta nel campo: puoi riprovare.");
      setStatus("error");
    }
  }

  return (
    <div className="card">
      <label htmlFor="nota" className="block text-h4 text-brand-900">Nota personale (opzionale)</label>
      <p className="mt-1 text-body-sm text-brand-500">
        Uno spazio tuo per annotare un pensiero su come stai. Nessuno la interpreta.
        Salva la nota per includerla nel report. Puoi svuotare il campo e salvare per rimuoverla.
      </p>
      <textarea id="nota" value={value} disabled={disabled || status === "saving"}
        onChange={(e) => { setValue(e.target.value.slice(0, MAX_NOTE_LENGTH)); setStatus("idle"); }}
        rows={3} maxLength={MAX_NOTE_LENGTH}
        className="mt-3 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-body-sm focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
        placeholder="Es. settimana intensa, ho dormito poco…" />
      <p className="mt-1 text-caption text-brand-400">{value.length}/{MAX_NOTE_LENGTH} caratteri</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button onClick={save} disabled={disabled || status === "saving" || unchanged} className="btn-accent">
          {status === "saving" ? "Salvataggio…" : "Salva nota"}
        </button>
        <span aria-live="polite" className="text-body-sm">
          {status === "saved" && (savedId ? "Nota salvata nell’account e nel report." : "Nota aggiornata nel report di questa sessione.")}
          {status === "error" && error}
          {status === "idle" && !unchanged && "Modifiche non salvate nel report."}
        </span>
        {!savedId && <p className="text-caption text-brand-500">La nota non è salvata sul server. Scarica il report prima di chiudere.</p>}
      </div>
    </div>
  );
}
