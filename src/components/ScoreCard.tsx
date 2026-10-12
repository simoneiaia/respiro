import { BAND_COPY, BAND_COLOR, BAND_ORDER } from "@/lib/questionnaire";
import { BAND_USER_GUIDANCE, INTENSITY_LABEL } from "@/lib/result-copy";
import type { BandKey } from "@/lib/types";

export interface ScoreCardProps {
  band: BandKey;
  meanScore: number;
  clinicalScore: number;
}

export function ScoreCard({ band, meanScore, clinicalScore }: ScoreCardProps) {
  const copy = BAND_COPY[band];
  const guidance = BAND_USER_GUIDANCE[band];
  const color = BAND_COLOR[band];
  const bandIndex = BAND_ORDER.indexOf(band);

  return (
    <div className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-soft">
      <div
        className="h-1.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${color}55, ${color})`,
        }}
        aria-hidden
      />
      <div className="space-y-5 p-6">
      <div>
        <p className="text-caption font-medium uppercase tracking-wide text-brand-500">
          Come stai, in sintesi
        </p>
        <h2 className="mt-1 font-display text-2xl font-semibold text-brand-900">
          {guidance.headline}
        </h2>
        <p className="mt-2 text-sm font-medium" style={{ color }}>
          Segnali {INTENSITY_LABEL[band]} · ultimi 14 giorni
        </p>
      </div>

      <div className="flex gap-1.5" aria-hidden>
        {BAND_ORDER.map((b, i) => (
          <div
            key={b}
            className="h-2.5 flex-1 rounded-full transition-all"
            style={{
              backgroundColor: i <= bandIndex ? color : "#e2e8f0",
              opacity: i === bandIndex ? 1 : i < bandIndex ? 0.85 : 1,
              transform: i === bandIndex ? "scaleY(1.25)" : undefined,
            }}
            title={BAND_COPY[b].label}
          />
        ))}
      </div>
      <p className="text-caption text-brand-500">
        Da sinistra a destra: da segnali lievi a segnali intensi. La barra indica dove si
        collocano le tue risposte complessive.
      </p>

      <div className="space-y-3 rounded-2xl bg-gradient-to-br from-sky-50 to-teal-50/70 p-4">
        <p className="text-sm leading-relaxed text-brand-800">{guidance.reflection}</p>
        <p className="text-sm leading-relaxed text-brand-700">{copy.text}</p>
      </div>

      <details className="rounded-xl border border-brand-100 p-4">
        <summary className="cursor-pointer text-sm font-medium text-brand-700">
          Dettagli numerici (opzionale)
        </summary>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-white p-3">
            <p className="text-caption text-brand-500">Media risposte</p>
            <p className="mt-1 text-lg tabular-nums text-brand-900">
              {meanScore.toFixed(2)}
              <span className="text-sm font-normal text-brand-500"> / 4</span>
            </p>
          </div>
          <div className="rounded-lg bg-white p-3">
            <p className="text-caption text-brand-500">Indice 0–40</p>
            <p className="mt-1 text-lg tabular-nums text-brand-900">
              {clinicalScore}
              <span className="text-sm font-normal text-brand-500"> / 40</span>
            </p>
          </div>
        </div>
        <p className="mt-2 text-caption text-brand-500">
          Due modi di leggere lo stesso risultato. Non sono soglie cliniche né una diagnosi.
        </p>
      </details>
      </div>
    </div>
  );
}
