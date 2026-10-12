import { BAND_USER_GUIDANCE } from "@/lib/result-copy";
import type { BandKey } from "@/lib/types";

export function ResultNextSteps({ band }: { band: BandKey }) {
  const guidance = BAND_USER_GUIDANCE[band];

  return (
    <div className="card space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-brand-900">Cosa puoi fare adesso</h2>
        <p className="mt-1 text-sm text-brand-600">
          Piccoli passi concreti. Scegli quello che ti sembra più realistico, senza pressione.
        </p>
      </div>
      <ul className="space-y-3">
        {guidance.suggestions.map((s, i) => (
          <li
            key={i}
            className="flex gap-3 rounded-xl border border-brand-100 bg-white p-3 text-sm leading-relaxed text-brand-800"
          >
            <span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sky-100 to-teal-100 text-xs font-semibold text-teal-800"
              aria-hidden
            >
              {i + 1}
            </span>
            <span className="pt-0.5">{s}</span>
          </li>
        ))}
      </ul>
      <p className="text-caption leading-relaxed text-brand-500">
        Queste indicazioni sono orientative. Non sostituiscono il parere di un professionista.
      </p>
    </div>
  );
}
