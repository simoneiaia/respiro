"use client";

import { useState } from "react";
import { updateAssessmentNotes } from "@/lib/firebase/assessments";
import { getResult, saveResult } from "@/lib/session";
import { MAX_NOTE_LENGTH, sanitizeNote } from "@/lib/security";

export function NotesEditor({
  savedId,
  initial = "",
}: {
  savedId?: string | null;
  initial?: string;
}) {
  const [value, setValue] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const trimmed = value.trim();
  const isEmpty = trimmed.length === 0;
  const unchanged = trimmed === (initial?.trim() ?? "");

  async function save() {
    if (isEmpty) {
      setError("Scrivi qualcosa nella nota prima di salvare, oppure lascia il campo vuoto.");
      setStatus("error");
      return;
    }

    if (unchanged && savedId) {
      setError("La nota non è cambiata rispetto all'ultima versione salvata.");
      setStatus("error");
      return;
    }

    const sanitized = sanitizeNote(trimmed);
    setStatus("saving");
    setError(null);

    const current = getResult();
    if (current) saveResult({ ...current, notes: sanitized });

    if (savedId) {
      try {
        await updateAssessmentNotes(savedId, sanitized);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Nota non salvata sul server.");
        setStatus("error");
        return;
      }
    }

    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <div className="card">
      <label htmlFor="nota" className="block text-h4 text-brand-900">
        Nota personale (opzionale)
      </label>
      <p className="mt-1 text-body-sm text-brand-500">
        Uno spazio tuo per annotare un pensiero su come stai. Nessuno la interpreta.
      </p>
      <textarea
        id="nota"
        value={value}
        onChange={(e) => {
          setValue(e.target.value.slice(0, MAX_NOTE_LENGTH));
          if (status === "error") setStatus("idle");
        }}
        rows={3}
        maxLength={MAX_NOTE_LENGTH}
        className="mt-3 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-body-sm focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
        placeholder="Es. settimana intensa, ho dormito poco…"
      />
      <p className="mt-1 text-caption text-brand-400">
        {value.length}/{MAX_NOTE_LENGTH} caratteri
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          onClick={save}
          disabled={status === "saving" || isEmpty}
          className="btn-accent"
        >
          {status === "saving" ? "Salvataggio…" : "Salva nota"}
        </button>
        {status === "saved" && <span className="text-body-sm text-success">Salvata ✓</span>}
        {status === "error" && <span className="text-body-sm text-danger">{error}</span>}
        {!savedId && !isEmpty && (
          <span className="text-caption text-brand-500">
            In modalità anonima la nota resta solo qui e nell&apos;export.
          </span>
        )}
      </div>
    </div>
  );
}
