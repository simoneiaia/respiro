"use client";

import { HELPLINES } from "@/lib/brand";

export interface SafetyAlertProps {
  variant?: "inline" | "result";
  onInterrupt?: () => void;
  onContinue?: () => void;
  onClearAnswers?: () => void;
}

export function SafetyAlert({
  variant = "inline",
  onInterrupt,
  onContinue,
  onClearAnswers,
}: SafetyAlertProps) {
  return (
    <section
      role="alert"
      aria-live="assertive"
      className="rounded-2xl border-2 border-danger bg-[#fdf3f1] p-5 text-[#5e2a2a]"
    >
      <h2 className="flex items-center gap-2 text-h3 text-danger">
        <span aria-hidden>🛟</span> La tua sicurezza viene prima di tutto
      </h2>

      {variant === "result" ? (
        <div className="mt-3 space-y-3 text-sm leading-relaxed">
          <p className="font-medium">
            Nelle tue risposte sono emersi segnali che meritano attenzione immediata. Questo
            messaggio ha priorità sul punteggio e sulla fascia orientativa.
          </p>
          <p>
            Se pensi di essere in <strong>pericolo immediato</strong> o temi di poter fare del
            male a te stesso/a o ad altri, chiama subito il{" "}
            <a href={HELPLINES.emergency.tel} className="font-semibold underline underline-offset-2">
              {HELPLINES.emergency.number}
            </a>{" "}
            o recati al pronto soccorso più vicino. Parla con un adulto di fiducia se ne hai
            bisogno.
          </p>
          <p>
            Se non sei in pericolo immediato, puoi contattare il{" "}
            <a
              href={HELPLINES.telefonoAmico.tel}
              className="font-semibold underline underline-offset-2"
            >
              Telefono Amico ({HELPLINES.telefonoAmico.number})
            </a>
            , il tuo medico, uno psicologo o una persona di fiducia.
          </p>
          <p className="text-brand-700">
            Questo risultato <strong>non è una diagnosi</strong> e non sostituisce un supporto
            professionale.
          </p>
        </div>
      ) : (
        <div className="mt-3 space-y-3 text-sm leading-relaxed">
          <p>
            Dalle risposte emerge un possibile segnale di rischio. Questo strumento non può
            valutare la tua situazione né sostituire un aiuto professionale.
          </p>
          <p>
            Se pensi di essere in pericolo immediato o temi di poter fare del male a te stesso o
            ad altri, chiama subito il{" "}
            <a href={HELPLINES.emergency.tel} className="font-semibold underline underline-offset-2">
              {HELPLINES.emergency.number}
            </a>{" "}
            o recati al pronto soccorso più vicino.
          </p>
          <p>
            Se non sei in pericolo immediato, puoi contattare il{" "}
            <a
              href={HELPLINES.telefonoAmico.tel}
              className="font-semibold underline underline-offset-2"
            >
              Telefono Amico ({HELPLINES.telefonoAmico.number})
            </a>
            , una persona di fiducia, il tuo medico o uno psicologo.
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <a href={HELPLINES.emergency.tel} className="btn bg-danger text-white hover:bg-[#7a3333]">
          Chiama il {HELPLINES.emergency.number}
        </a>
        <a
          href={HELPLINES.telefonoAmico.tel}
          className="btn-secondary border-danger/30 text-danger hover:bg-[#fdf3f1]"
        >
          Telefono Amico
        </a>
        {variant === "inline" && onContinue && (
          <button onClick={onContinue} className="btn-secondary">
            Continua compilazione
          </button>
        )}
        {variant === "inline" && onInterrupt && (
          <button onClick={onInterrupt} className="btn-ghost">
            Interrompi
          </button>
        )}
        {onClearAnswers && (
          <button onClick={onClearAnswers} className="btn-ghost">
            Cancella le mie risposte
          </button>
        )}
      </div>
    </section>
  );
}
