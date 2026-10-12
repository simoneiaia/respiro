"use client";

import { useEffect, useState } from "react";

type Phase = "idle" | "inhale" | "hold" | "exhale";

const CYCLE: { phase: Phase; seconds: number; label: string }[] = [
  { phase: "inhale", seconds: 4, label: "Inspira" },
  { phase: "hold", seconds: 4, label: "Trattieni" },
  { phase: "exhale", seconds: 4, label: "Espira" },
];

const TOTAL_ROUNDS = 4;

export function BreathingPause() {
  const [active, setActive] = useState(false);
  const [round, setRound] = useState(0);
  const [step, setStep] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [done, setDone] = useState(false);

  const current = CYCLE[step];

  useEffect(() => {
    if (!active || done) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1;

        const nextStep = step + 1;
        if (nextStep < CYCLE.length) {
          setStep(nextStep);
          return CYCLE[nextStep].seconds;
        }

        const nextRound = round + 1;
        if (nextRound >= TOTAL_ROUNDS) {
          setActive(false);
          setDone(true);
          return 0;
        }

        setRound(nextRound);
        setStep(0);
        return CYCLE[0].seconds;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [active, done, round, step]);

  function start() {
    setDone(false);
    setRound(0);
    setStep(0);
    setSecondsLeft(CYCLE[0].seconds);
    setActive(true);
  }

  function stop() {
    setActive(false);
    setDone(false);
    setRound(0);
    setStep(0);
    setSecondsLeft(4);
  }

  const scale =
    !active || done
      ? 1
      : current.phase === "inhale"
        ? 1.18
        : current.phase === "hold"
          ? 1.18
          : 0.88;

  return (
    <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-soft">
      <div className="relative h-36 sm:h-40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/breath-pause.jpg"
          alt="Momento di calma e presenza"
          className="h-full w-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
      </div>

      <div className="relative -mt-8 space-y-4 px-5 pb-6 sm:px-6">
        <div>
          <p className="text-caption font-medium uppercase tracking-wide text-teal-700">
            Un minuto per te
          </p>
          <h2 className="mt-1 font-display text-xl font-semibold text-brand-900">
            Pausa di respiro guidata
          </h2>
          <p className="mt-1 text-sm text-brand-600">
            Quattro cicli lenti (4–4–4). Opzionale, ma spesso aiuta a scendere di un tono.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 py-2">
          <div
            className="grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-sky-200 via-accent-200 to-teal-300 shadow-glow transition-transform duration-[900ms] ease-in-out"
            style={{ transform: `scale(${scale})` }}
            aria-hidden
          >
            <div className="grid h-20 w-20 place-items-center rounded-full bg-white/80 text-center">
              {active && !done ? (
                <>
                  <p className="text-sm font-semibold text-brand-900">{current.label}</p>
                  <p className="text-2xl tabular-nums text-accent-700">{secondsLeft}</p>
                </>
              ) : done ? (
                <p className="px-2 text-sm font-medium text-teal-800">Fatto. Grazie.</p>
              ) : (
                <p className="px-2 text-sm text-brand-600">Pronto/a?</p>
              )}
            </div>
          </div>

          {active && !done && (
            <p className="text-caption text-brand-500">
              Ciclo {round + 1} di {TOTAL_ROUNDS}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-2">
            {!active ? (
              <button type="button" onClick={start} className="btn-primary px-6">
                {done ? "Ripeti la pausa" : "Inizia (≈1 min)"}
              </button>
            ) : (
              <button type="button" onClick={stop} className="btn-secondary">
                Interrompi
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
