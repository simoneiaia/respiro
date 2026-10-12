import { HELPLINES } from "@/lib/brand";

/** Banner emergenza con 112 e Telefono Amico. */
export function EmergencyBanner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-sm">
        Emergenza:{" "}
        <a href={HELPLINES.emergency.tel} className="font-semibold underline underline-offset-2">
          {HELPLINES.emergency.number}
        </a>
        {" · "}
        Ascolto:{" "}
        <a
          href={HELPLINES.telefonoAmico.tel}
          className="font-semibold underline underline-offset-2"
        >
          {HELPLINES.telefonoAmico.number}
        </a>
      </p>
    );
  }

  return (
    <div className="bg-brand-800 text-white">
      <div className="container-app flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-xs sm:text-sm">
        <span>
          Emergenza:{" "}
          <a href={HELPLINES.emergency.tel} className="font-semibold underline underline-offset-2">
            {HELPLINES.emergency.number}
          </a>
        </span>
        <span className="hidden text-brand-300 sm:inline" aria-hidden>
          |
        </span>
        <span>
          Ascolto:{" "}
          <a
            href={HELPLINES.telefonoAmico.tel}
            className="font-semibold underline underline-offset-2"
          >
            {HELPLINES.telefonoAmico.number}
          </a>
        </span>
      </div>
    </div>
  );
}
