import Link from "next/link";
import { DATA_CONTROLLER, LEGAL } from "@/lib/legal";

/** Box visibile con identità del titolare del trattamento (art. 13 GDPR). */
export function ControllerNotice({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      className={
        compact
          ? "rounded-xl border border-brand-100 bg-brand-50/80 p-4 text-sm text-brand-800"
          : "card border-l-4 border-l-accent-600 text-sm leading-relaxed text-brand-800"
      }
    >
      <h2 className="font-semibold text-brand-900">Titolare del trattamento</h2>
      <p className="mt-2 text-brand-700">
        Ai sensi del Regolamento UE 2016/679 (GDPR), il titolare del trattamento dei dati
        personali raccolti tramite {LEGAL.serviceUrl.replace("https://", "")} è:
      </p>
      <ul className="mt-3 space-y-1 text-brand-800">
        <li>
          <strong>{DATA_CONTROLLER.entity}</strong>
        </li>
        <li>Legale rappresentante: {DATA_CONTROLLER.legalRepresentative}</li>
        <li>P.IVA {DATA_CONTROLLER.vat}</li>
        <li>{DATA_CONTROLLER.address}</li>
        <li>
          Contatti privacy:{" "}
          <a href={`mailto:${DATA_CONTROLLER.email}`} className="link">
            {DATA_CONTROLLER.email}
          </a>
        </li>
      </ul>
      {!compact && (
        <p className="mt-3 text-brand-600">{DATA_CONTROLLER.scopeNote}</p>
      )}
      <p className="mt-3 text-caption text-brand-500">
        <Link href="/privacy" className="link">
          Leggi l&apos;informativa privacy completa
        </Link>
      </p>
    </aside>
  );
}
