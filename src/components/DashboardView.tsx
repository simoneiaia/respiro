"use client";

import { useMemo, useState } from "react";
import { HistoryChart } from "./HistoryChart";
import { AreaScores } from "./AreaScores";
import { ScoreCard } from "./ScoreCard";
import { BAND_COPY, BAND_COLOR } from "@/lib/questionnaire";
import { clinicalScore } from "@/lib/scoring";
import type { StoredAssessment } from "@/lib/firebase/assessments";
import type { BandKey } from "@/lib/types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("it-IT", { dateStyle: "medium", timeStyle: "short" });
}

// Parte presentazionale della dashboard: grafico storico, variazione, lista
// sessioni selezionabile e dettaglio. Indipendente da Supabase: riceve gli
// items già caricati (riusata sia dalla dashboard reale sia dalla demo).
export function DashboardView({ items }: { items: StoredAssessment[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(
    items.length ? items[items.length - 1].id : null,
  );

  const recent = useMemo(() => [...items].reverse(), [items]);
  const selected = useMemo(
    () => items.find((i) => i.id === selectedId) ?? null,
    [items, selectedId],
  );

  const latest = items[items.length - 1];
  const previous = items[items.length - 2];
  const delta =
    latest && previous ? latest.total_mean_score - previous.total_mean_score : null;

  return (
    <div className="space-y-5">
      {items.length >= 2 && (
        <>
          <HistoryChart items={items} />
          {delta !== null && (
            <p className="text-body-sm text-brand-600">
              {delta === 0
                ? "Ultimo self-check stabile rispetto al precedente."
                : delta < 0
                  ? `Ultimo self-check in calo di ${Math.abs(delta).toFixed(2)} (meno segnali).`
                  : `Ultimo self-check in aumento di ${delta.toFixed(2)} (più segnali).`}{" "}
              I grafici mostrano l&apos;andamento dei punteggi, non un andamento clinico
              certificato.
            </p>
          )}
        </>
      )}

      {items.length === 1 && (
        <p className="text-body-sm text-brand-600">
          Hai un solo risultato salvato. L&apos;andamento sarà disponibile dal secondo
          self-check.
        </p>
      )}

      <div className="card">
        <h2>Le tue compilazioni</h2>
        <ul className="mt-3 divide-y divide-brand-100">
          {recent.map((a) => {
            const active = a.id === selectedId;
            return (
              <li key={a.id}>
                <button
                  onClick={() => setSelectedId(a.id)}
                  className={[
                    "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition duration-180",
                    active ? "bg-accent-soft" : "hover:bg-brand-50",
                  ].join(" ")}
                  aria-pressed={active}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: BAND_COLOR[a.band as BandKey] }}
                      aria-hidden
                    />
                    <span className="text-body-sm">
                      <span className="block text-brand-900">
                        {BAND_COPY[a.band as BandKey]?.label ?? a.band}
                      </span>
                      <span className="block text-caption text-brand-500">
                        {formatDate(a.created_at)}
                      </span>
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-caption tabular-nums text-brand-600">
                    {a.risk_flag && (
                      <span className="rounded-full bg-[#fbf1f0] px-2 py-0.5 text-danger">
                        attenzione
                      </span>
                    )}
                    {a.total_mean_score.toFixed(2)}/4
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {selected && (
        <>
          <ScoreCard
            band={selected.band as BandKey}
            meanScore={selected.total_mean_score}
            clinicalScore={clinicalScore(selected.total_mean_score)}
          />
          <AreaScores areas={selected.area_scores} />
          {selected.notes && (
            <div className="card">
              <p className="text-h4 text-brand-900">Nota personale</p>
              <p className="mt-2 whitespace-pre-wrap text-body-sm text-brand-800">
                {selected.notes}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
