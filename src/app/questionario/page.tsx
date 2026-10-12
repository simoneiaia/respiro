"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressBar } from "@/components/ProgressBar";
import { questionnaire } from "@/lib/questionnaire";
import { missingRequired, scoreAssessment } from "@/lib/scoring";
import type { Answers } from "@/lib/types";
import {
  getConsent,
  hasValidConsent,
  saveResult,
} from "@/lib/session";
import { useUser } from "@/lib/useUser";
import { saveAssessment } from "@/lib/firebase/assessments";
import { enableReminder } from "@/lib/firebase/preferences";

const questions = questionnaire.questions;
const total = questions.length;

export default function QuestionarioPage() {
  const router = useRouter();
  const { user } = useUser();

  const [ready, setReady] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasValidConsent()) {
      router.replace("/consenso");
      return;
    }
    setReady(true);
  }, [router]);

  function setAnswer(qId: string, value: number) {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  }

  async function submit() {
    const missing = missingRequired(questionnaire, answers);
    if (missing.length > 0) {
      const idx = questions.findIndex((q) => q.id === missing[0]);
      setStep(idx >= 0 ? idx : 0);
      return;
    }

    const result = scoreAssessment(questionnaire, answers);
    saveResult(result);

    const consent = getConsent();
    const wantsSave = consent?.saveHistory && user;
    if (wantsSave) {
      setSaving(true);
      setSaveError(null);
      try {
        const id = await saveAssessment(result);
        saveResult({ ...result, saved_id: id });
        if (consent?.sixMonthReminder) {
          try {
            await enableReminder();
          } catch {
            /* promemoria opzionale */
          }
        }
      } catch (e) {
        setSaveError(
          e instanceof Error ? e.message : "Risultato calcolato, ma non salvato sul server.",
        );
        setSaving(false);
        router.push("/risultato");
        return;
      }
      setSaving(false);
    }
    router.push("/risultato");
  }

  if (!ready) {
    return (
      <div className="container-app">
        <p className="text-sm text-brand-600">Caricamento…</p>
      </div>
    );
  }

  const onReview = step >= total;
  const currentQuestion = !onReview ? questions[step] : null;
  const currentValue = currentQuestion ? answers[currentQuestion.id] : undefined;
  const answeredCount = questions.filter((q) => answers[q.id] !== undefined).length;

  return (
    <div className="container-app pb-28 sm:pb-8">
      <div className="space-y-6">
        <ProgressBar current={onReview ? total : step + 1} total={total} />

        {!onReview && step === 0 && (
          <p className="rounded-xl bg-accent-soft px-4 py-3 text-sm text-brand-700">
            Rispondi con calma a ciò che ti viene in mente. Non esistono risposte giuste o
            sbagliate: conta come ti sei sentito/a nelle ultime due settimane.
          </p>
        )}

        {!onReview && currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            scale={questionnaire.scale}
            value={currentValue}
            onChange={(v) => setAnswer(currentQuestion.id, v)}
          />
        )}

        {onReview && (
          <div className="space-y-5">
            <div className="card">
              <h2 className="text-lg font-semibold">Rivedi prima di vedere il risultato</h2>
              <p className="mt-1 text-sm text-brand-600">
                {answeredCount} di {total} risposte. Puoi modificare ogni risposta.
              </p>
              <ul className="mt-4 divide-y divide-brand-100">
                {questions.map((q, i) => {
                  const v = answers[q.id];
                  const label =
                    v !== undefined
                      ? questionnaire.scale.labels.find((l) => l.value === v)?.label
                      : "da rispondere";
                  return (
                    <li key={q.id} className="flex items-start justify-between gap-3 py-3">
                      <div className="min-w-0 text-sm">
                        <p className="leading-snug text-brand-900">{q.text}</p>
                        <p className={v !== undefined ? "text-brand-600" : "text-danger"}>
                          {label}
                        </p>
                      </div>
                      <button
                        onClick={() => setStep(i)}
                        className="btn-ghost shrink-0 px-3 py-1.5 text-xs"
                      >
                        Modifica
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {saveError && (
              <p className="rounded-xl bg-[#fdf1ee] p-3 text-sm text-danger">{saveError}</p>
            )}
          </div>
        )}
      </div>

      {/* Navigazione fissa in basso su mobile */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-brand-100 bg-white/95 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:static sm:mt-6 sm:border-0 sm:bg-transparent sm:p-0">
        <div className="container-app flex items-center justify-between gap-3">
          {!onReview ? (
            <>
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="btn-ghost min-h-[2.75rem] px-4"
              >
                Indietro
              </button>
              {step < total - 1 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={currentValue === undefined}
                  className="btn-primary min-h-[2.75rem] flex-1 sm:flex-none sm:px-8"
                >
                  Avanti
                </button>
              ) : (
                <button
                  onClick={() => setStep(total)}
                  disabled={currentValue === undefined}
                  className="btn-primary min-h-[2.75rem] flex-1 sm:flex-none sm:px-8"
                >
                  Rivedi le risposte
                </button>
              )}
            </>
          ) : (
            <>
              <button onClick={() => setStep(total - 1)} className="btn-ghost min-h-[2.75rem]">
                Indietro
              </button>
              <button
                onClick={submit}
                disabled={saving}
                className="btn-primary min-h-[2.75rem] flex-1 sm:flex-none sm:px-8"
              >
                {saving ? "Salvataggio…" : "Vedi risultato"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
