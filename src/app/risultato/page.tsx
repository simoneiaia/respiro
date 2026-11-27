"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ScoreCard } from "@/components/ScoreCard";
import { ResultSummary } from "@/components/ResultSummary";
import { ResultNextSteps } from "@/components/ResultNextSteps";
import { GentleActions } from "@/components/GentleActions";
import { BreathingPause } from "@/components/BreathingPause";
import { SaveProgressPrompt } from "@/components/SaveProgressPrompt";
import { AreaScores } from "@/components/AreaScores";
import { SafetyAlert } from "@/components/SafetyAlert";
import { NotesEditor } from "@/components/NotesEditor";
import { ExportActions } from "@/components/ExportActions";
import { Disclaimer } from "@/components/Disclaimer";
import { getResult, saveResult, clearSession, getConsent } from "@/lib/session";
import { saveAssessment, updateAssessmentNotes } from "@/lib/firebase/assessments";
import { buildReportText } from "@/lib/report";
import { persistResult } from "@/lib/save-result";
import { enableReminder } from "@/lib/firebase/preferences";
import { useUser } from "@/lib/useUser";
import type { AssessmentResult } from "@/lib/types";

export default function RisultatoPage() {
  const router = useRouter();
  const { user, configured } = useUser();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);

  function updateResult(next: AssessmentResult) {
    saveResult(next);
    setResult(next);
  }

  async function saveNote(notes: string) {
    if (!result) return;
    if (result.saved_id) await updateAssessmentNotes(result.saved_id, notes);
    if (getResult() !== result) return;
    updateResult({ ...result, notes });
  }

  async function retrySave() {
    const consent = getConsent();
    if (!result || saving || result.saved_id || !consent?.saveHistory ||
        !user || user.uid !== result.save_user_id) return;
    setSaving(true);
    const next = await persistResult(result, saveAssessment);
    if (getResult() !== result) { setSaving(false); return; }
    updateResult(next);
    if (next.saved_id && consent.sixMonthReminder) {
      try { await enableReminder(); } catch { /* Gestibile dalla dashboard. */ }
    }
    setSaving(false);
  }

  useEffect(() => {
    if (!result || result.saved_id) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [result]);

  useEffect(() => {
    setResult(getResult());
    setReady(true);
  }, []);

  function endSession() {
    clearSession();
    router.push("/");
  }

  if (!ready) {
    return (
      <div className="container-app">
        <p className="text-body-sm text-brand-500">Caricamento…</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container-app">
        <div className="card text-center">
          <h1>Nessun risultato da mostrare</h1>
          <p className="mt-2 text-body-sm text-brand-700">
            La compilazione anonima non salva lo storico. I dati restano solo in memoria
            finché non chiudi la scheda o cancelli la sessione.
          </p>
          <Link href="/consenso" className="btn-primary mt-4">
            Inizia un nuovo self-check
          </Link>
        </div>
      </div>
    );
  }

  const consent = getConsent();
  const saved = !!(configured && user && consent?.saveHistory && result.saved_id);

  return (
    <div className="container-app max-w-2xl">
      <pre className="print-report hidden whitespace-pre-wrap font-sans text-sm">{buildReportText(result)}</pre>
      <div className="result-screen space-y-6">
        {result.safety_message_required && <SafetyAlert variant="result" />}

        <header className="animate-rise space-y-2">
          <p className="text-sm text-teal-700">Grazie per aver dedicato questo tempo a te</p>
          <h1 className="font-display text-2xl font-semibold text-brand-900 sm:text-3xl">
            Ecco cosa dicono le tue risposte
          </h1>
          <p className="text-sm leading-relaxed text-brand-700">
            Questo è un <strong>quadro orientativo</strong> basato su come ti sei descritto/a negli
            ultimi 14 giorni. Non è una diagnosi e non ti mette un&apos;etichetta: è un modo per
            leggere i segnali con calma.
          </p>
        </header>

        <section className="no-print rounded-xl border border-brand-200 bg-white p-4 text-sm" aria-live="polite">
          <p role={result.save_error ? "alert" : undefined}>
            {result.save_error || (result.saved_id
              ? "Risultato salvato nel tuo account."
              : "Risultato solo in questa sessione. Scarica il report prima di chiudere o ricaricare la pagina.")}
          </p>
          {result.save_error && consent?.saveHistory && user && user.uid === result.save_user_id && (
            <button onClick={retrySave} disabled={saving} className="btn-secondary mt-3">
              {saving ? "Salvataggio…" : "Riprova salvataggio"}
            </button>
          )}
        </section>

        <ScoreCard
          band={result.band}
          meanScore={result.total_mean_score}
          clinicalScore={result.total_clinical_score}
        />

        <ResultSummary result={result} />
        <AreaScores areas={result.area_scores} />

        {!result.safety_message_required && (
          <>
            <GentleActions result={result} />
            <ResultNextSteps band={result.band} />
          </>
        )}

        {result.safety_message_required && <GentleActions result={result} />}

        <BreathingPause />

        <NotesEditor savedId={result.saved_id} initial={result.notes ?? ""} onSave={saveNote} disabled={saving} />

        <SaveProgressPrompt saved={saved} />

        <div className="card space-y-4">
          <div>
            <p className="text-h4 text-brand-900">Conserva o condividi</p>
            <p className="mt-1 text-body-sm text-brand-600">
              Puoi scaricare un report testuale da mostrare a un professionista o a una persona di
              fiducia, se ti va.
            </p>
          </div>
          <ExportActions result={result} />
          <div className="no-print flex flex-wrap gap-2 border-t border-brand-100 pt-4">
            {saved && (
              <Link href="/dashboard" className="btn-ghost">
                Vedi andamento nel tempo
              </Link>
            )}
            <Link href="/consenso" className="btn-ghost">
              Nuovo self-check
            </Link>
            <button onClick={endSession} className="btn-ghost">
              Cancella dati di sessione
            </button>
          </div>
        </div>

        <Disclaimer compact />
      </div>
    </div>
  );
}
