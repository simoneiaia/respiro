import { HELPLINES } from "@/lib/brand";

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <div
      role="note"
      className="rounded-2xl border border-accent-200 bg-accent-50/60 p-4 text-sm text-brand-800"
    >
      <p className={compact ? "" : "font-medium"}>
        Questo strumento non formula diagnosi e non sostituisce psicologi, psicoterapeuti,
        medici o servizi di emergenza.
      </p>
      {!compact && (
        <p className="mt-2">
          Se sei in pericolo immediato o temi di poter fare del male a te stesso o ad altri,
          chiama il{" "}
          <a href={HELPLINES.emergency.tel} className="font-semibold underline underline-offset-2">
            {HELPLINES.emergency.number}
          </a>{" "}
          o recati al pronto soccorso più vicino. Per un ascolto anonimo e gratuito puoi
          contattare il{" "}
          <a
            href={HELPLINES.telefonoAmico.tel}
            className="font-semibold underline underline-offset-2"
          >
            Telefono Amico ({HELPLINES.telefonoAmico.number})
          </a>
          .
        </p>
      )}
    </div>
  );
}
