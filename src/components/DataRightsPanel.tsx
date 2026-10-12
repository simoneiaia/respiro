import Link from "next/link";
import { APP_NAME } from "@/lib/brand";
import { DELETION_ACTIONS, DATA_CONTROLLER, LEGAL } from "@/lib/legal";

/** Diritti GDPR e meccanismi di cancellazione (art. 13, 17 GDPR). */
export function DataRightsPanel() {
  return (
    <div className="card space-y-5 text-sm leading-relaxed text-brand-800">
      <div>
        <h2 className="text-lg font-semibold text-brand-900">I tuoi diritti (GDPR)</h2>
        <p className="mt-1 text-brand-700">
          Puoi esercitare in qualsiasi momento i diritti previsti dagli artt. 15–22 del GDPR
          (accesso, rettifica, cancellazione, portabilità, limitazione, opposizione, revoca del
          consenso). Le richieste vanno inviate a{" "}
          <a href={`mailto:${DATA_CONTROLLER.email}`} className="link">
            {DATA_CONTROLLER.email}
          </a>
          : risponderemo entro <strong>{LEGAL.rightsResponseDays} giorni</strong>.
        </p>
        <a
          href={`mailto:${DATA_CONTROLLER.email}?subject=${encodeURIComponent(`Richiesta diritti GDPR - ${APP_NAME}`)}&body=${encodeURIComponent("Gentile titolare,\n\nDesidero esercitare il seguente diritto GDPR:\n[ ] Accesso\n[ ] Rettifica\n[ ] Cancellazione\n[ ] Portabilità\n[ ] Limitazione\n[ ] Revoca consenso\n\nEmail account (se registrato):\n\nDescrizione della richiesta:\n\n")}`}
          className="btn-secondary mt-3 inline-flex"
        >
          Invia richiesta diritti via email
        </a>
      </div>

      <div>
        <h3 className="font-semibold text-brand-900">Come cancellare i dati dall&apos;app</h3>
        <p className="mt-1 text-brand-600">
          Oltre alla richiesta via email, puoi agire direttamente da questa pagina:
        </p>
        <ul className="mt-3 space-y-3">
          {DELETION_ACTIONS.filter((a) => a.id !== "email").map((action) => (
            <li
              key={action.id}
              className="rounded-xl border border-brand-100 bg-brand-50/50 p-4"
            >
              <p className="font-medium text-brand-900">{action.title}</p>
              <p className="mt-1">
                <span className="text-brand-600">Elimina: </span>
                {action.deletes}
              </p>
              <p className="mt-1">
                <span className="text-brand-600">Non tocca: </span>
                {action.keeps}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-brand-700">
        Retention: i risultati salvati restano al massimo{" "}
        <strong>{LEGAL.assessmentMaxRetentionMonths} mesi</strong> dalla creazione; un account
        inattivo per <strong>{LEGAL.inactivityRetentionMonths} mesi</strong> viene cancellato in
        automatico, senza ulteriore preavviso individuale (come indicato in privacy).
      </p>

      <p className="text-caption text-brand-500">
        Reclamo all&apos;autorità di controllo:{" "}
        <a
          href="https://www.garanteprivacy.it"
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Garante per la protezione dei dati personali
        </a>
        . Dettagli in{" "}
        <Link href="/privacy" className="link">
          informativa privacy
        </Link>
        .
      </p>
    </div>
  );
}
