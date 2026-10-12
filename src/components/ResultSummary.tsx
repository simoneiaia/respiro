import type { AssessmentResult } from "@/lib/types";
import { AREA_USER_COPY, INTENSITY_LABEL } from "@/lib/result-copy";

export function ResultSummary({ result }: { result: AssessmentResult }) {
  const areas = [...result.area_scores]
    .filter((a) => a.count > 0)
    .sort((a, b) => b.mean_score - a.mean_score);

  if (areas.length === 0) return null;

  const topAreas = areas.slice(0, 2);
  const otherAreas = areas.slice(2);

  return (
    <div className="card space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-brand-900">Cosa emerge dalle tue risposte</h2>
        <p className="mt-1 text-sm text-brand-600">
          Abbiamo raggruppato le domande in quattro aree. Qui vedi dove hai indicato più segnali
          nelle ultime due settimane.
        </p>
      </div>

      <div className="space-y-3">
        {topAreas.map((a) => {
          const info = AREA_USER_COPY[a.area_key];
          return (
            <div
              key={a.area_key}
              className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-teal-50/50 p-4"
            >
              <p className="text-sm font-semibold text-brand-900">
                {info?.title ?? a.label}
                <span className="ml-2 font-normal text-brand-600">
                  · segnali {INTENSITY_LABEL[a.band]}
                </span>
              </p>
              {info && (
                <p className="mt-2 text-sm leading-relaxed text-brand-700">{info.about}</p>
              )}
              {info && a.mean_score >= 1.5 && (
                <p className="mt-2 text-sm leading-relaxed text-brand-800">{info.whenHigher}</p>
              )}
            </div>
          );
        })}
      </div>

      {otherAreas.length > 0 && (
        <div className="rounded-xl border border-brand-100 p-4">
          <p className="text-sm font-medium text-brand-900">Altre aree</p>
          <ul className="mt-2 space-y-2 text-sm text-brand-700">
            {otherAreas.map((a) => (
              <li key={a.area_key} className="flex justify-between gap-3">
                <span>{AREA_USER_COPY[a.area_key]?.title ?? a.label}</span>
                <span className="shrink-0 text-brand-600">
                  segnali {INTENSITY_LABEL[a.band]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
