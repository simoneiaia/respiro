"use client";

import { useState } from "react";
import Link from "next/link";
import { Disclaimer } from "./Disclaimer";
import { APP_NAME, MIN_AGE, TOOL_NATURE } from "@/lib/brand";
import { REMINDER_INTERVAL_MONTHS } from "@/lib/reminders";
import type { ConsentState } from "@/lib/session";

export interface ConsentPanelProps {
  accountAvailable: boolean;
  onConfirm: (consent: ConsentState) => void;
}

export function ConsentPanel({ accountAvailable, onConfirm }: ConsentPanelProps) {
  const [ageConfirm, setAgeConfirm] = useState(false);
  const [essential, setEssential] = useState(false);
  const [health, setHealth] = useState(false);
  const [saveHistory, setSaveHistory] = useState(false);
  const [sixMonthReminder, setSixMonthReminder] = useState(false);

  const canProceed = ageConfirm && essential && health;

  function submit() {
    if (!canProceed) return;
    onConfirm({
      ageConfirm,
      essential,
      health,
      saveHistory: accountAvailable ? saveHistory : false,
      sixMonthReminder: accountAvailable && saveHistory ? sixMonthReminder : false,
      mode: accountAvailable ? "account" : "anonymous",
      acceptedAt: new Date().toISOString(),
    });
  }

  return (
    <div className="space-y-5">
      <Disclaimer />

      <div className="card space-y-5">
        <p className="text-sm leading-relaxed text-brand-800">
          Stai per rispondere a domande personali sul tuo benessere. È normale sentirsi
          incerti: questo spazio è fatto per <strong>ascoltarti</strong>, non per giudicarti.
        </p>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-brand-900">1. Chi può usare {APP_NAME}</h2>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-brand-100 p-3 text-sm hover:border-accent-200">
            <input
              type="checkbox"
              checked={ageConfirm}
              onChange={(e) => setAgeConfirm(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-accent-600"
            />
            <span className="text-brand-800">
              Dichiaro di avere almeno <strong>{MIN_AGE} anni</strong>.
            </span>
          </label>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-brand-900">
            2. Natura dello strumento
          </h2>
          <p className="rounded-xl bg-brand-50 p-3 text-xs leading-relaxed text-brand-700">
            {TOOL_NATURE}
          </p>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-brand-100 p-3 text-sm hover:border-accent-200">
            <input
              type="checkbox"
              checked={essential}
              onChange={(e) => setEssential(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-accent-600"
            />
            <span className="text-brand-800">
              Ho capito che questo strumento è <strong>orientativo</strong> e non sostituisce
              una valutazione professionale, una diagnosi o un trattamento.
            </span>
          </label>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-brand-900">
            3. Trattamento delle risposte per il risultato
          </h2>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-brand-100 p-3 text-sm hover:border-accent-200">
            <input
              type="checkbox"
              checked={health}
              onChange={(e) => setHealth(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-accent-600"
            />
            <span className="text-brand-800">
              Acconsento al trattamento delle mie risposte (dati relativi al benessere
              psicologico) <strong>solo per calcolare e mostrarmi il risultato</strong> di
              questa sessione. Ho letto l&apos;{" "}
              <Link href="/privacy" className="link">
                informativa privacy
              </Link>
              .
            </span>
          </label>
        </section>

        {accountAvailable ? (
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-brand-900">
              4. Opzionale: storico e promemoria (account)
            </h2>
            <p className="text-xs text-brand-600">
              Consensi separati e facoltativi. Puoi revocarli in qualsiasi momento dalla
              pagina gestione dati.
            </p>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-brand-100 p-3 text-sm hover:border-accent-200">
              <input
                type="checkbox"
                checked={saveHistory}
                onChange={(e) => setSaveHistory(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-accent-600"
              />
              <span className="text-brand-800">
                <strong>Consenso separato:</strong> salva i punteggi aggregati (non le singole
                risposte) nel mio account per seguire l&apos;andamento nel tempo.
              </span>
            </label>

            {saveHistory && (
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-accent-100 bg-accent-soft p-3 text-sm">
                <input
                  type="checkbox"
                  checked={sixMonthReminder}
                  onChange={(e) => setSixMonthReminder(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-accent-600"
                />
                <span className="text-brand-800">
                  Ricordami ogni {REMINDER_INTERVAL_MONTHS} mesi con un messaggio in app nella
                  dashboard.
                </span>
              </label>
            )}
          </section>
        ) : (
          <section className="rounded-xl bg-accent-soft p-3 text-sm text-brand-700">
            <p className="font-medium text-brand-900">Modalità anonima</p>
            <p className="mt-1">
              Le risposte restano in memoria solo per questa sessione. Per storico e promemoria
              in app,{" "}
              <Link href="/accedi" className="link">
                crea un account gratuito
              </Link>
              .
            </p>
          </section>
        )}

        <button onClick={submit} disabled={!canProceed} className="btn-primary w-full">
          Sono pronto/a, iniziamo
        </button>
      </div>
    </div>
  );
}
