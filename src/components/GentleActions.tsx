import {
  AREA_ACTIONS,
  AREA_USER_COPY,
  pickFocusAreas,
} from "@/lib/result-copy";
import type { AssessmentResult } from "@/lib/types";

export function GentleActions({ result }: { result: AssessmentResult }) {
  const focus = pickFocusAreas(result.area_scores);

  if (focus.length === 0) {
    return (
      <div className="card space-y-3">
        <h2 className="text-lg font-semibold text-brand-900">Piccoli gesti utili</h2>
        <p className="text-sm leading-relaxed text-brand-700">
          Continua a osservarti con gentilezza. Se qualcosa cambia, puoi ripetere il self-check
          o parlarne con qualcuno di fiducia.
        </p>
      </div>
    );
  }

  return (
    <div className="card space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-brand-900">Azioni su misura per te</h2>
        <p className="mt-1 text-sm text-brand-600">
          Basate sulle aree in cui hai indicato più segnali. Scegline una o due, senza doverle
          fare tutte.
        </p>
      </div>

      <div className="space-y-4">
        {focus.map((area) => {
          const pack = AREA_ACTIONS[area.area_key];
          const title =
            pack?.title ?? AREA_USER_COPY[area.area_key]?.title ?? area.label;
          const actions = pack?.actions?.slice(0, 2) ?? [];
          if (actions.length === 0) return null;

          return (
            <div
              key={area.area_key}
              className="rounded-2xl border border-teal-100 bg-gradient-to-br from-sky-50/80 to-teal-50/60 p-4"
            >
              <p className="text-sm font-semibold text-brand-900">{title}</p>
              <ul className="mt-3 space-y-2.5">
                {actions.map((action) => (
                  <li
                    key={action}
                    className="flex gap-3 text-sm leading-relaxed text-brand-800"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500"
                      aria-hidden
                    />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
