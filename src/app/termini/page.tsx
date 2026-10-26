import Link from "next/link";
import { APP_NAME, HELPLINES, MIN_AGE, OWNER, TOOL_NATURE } from "@/lib/brand";
import { DATA_CONTROLLER, LEGAL } from "@/lib/legal";

export const metadata = { title: `Termini d'uso | ${APP_NAME}` };

export default function TerminiPage() {
  return (
    <div className="container-app max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Termini d&apos;uso</h1>
        <p className="mt-1 text-sm text-brand-600">
          In vigore dal {LEGAL.effectiveDate}
        </p>
      </div>

      <div className="card space-y-5 text-sm leading-relaxed text-brand-800">
        <section>
          <h2 className="text-base font-semibold text-brand-900">Titolare del servizio</h2>
          <p className="mt-1">
            {APP_NAME} è gestito da <strong>{DATA_CONTROLLER.entity}</strong> (P.IVA{" "}
            {DATA_CONTROLLER.vat}), legale rappresentante {DATA_CONTROLLER.legalRepresentative},
            con sede in {DATA_CONTROLLER.address}. {DATA_CONTROLLER.scopeNote}
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Natura del servizio</h2>
          <p className="mt-1">{TOOL_NATURE}</p>
          <p className="mt-2">
            Non fornisce diagnosi, terapia, consulenza sanitaria, psicoterapia o interventi di
            emergenza.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Privacy e dati personali</h2>
          <p className="mt-1">
            Il trattamento dei dati è disciplinato dall&apos;{" "}
            <Link href="/privacy" className="link">
              informativa privacy
            </Link>
            . Il titolare del trattamento è {DATA_CONTROLLER.entity}. Puoi esercitare i tuoi
            diritti e cancellare i dati dalla pagina{" "}
            <Link href="/account/dati" className="link">
              gestione dati
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Età minima</h2>
          <p className="mt-1">
            Il servizio è riservato a persone di almeno <strong>{MIN_AGE} anni</strong>. Usando
            {APP_NAME} dichiari di soddisfare questo requisito.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Uso corretto</h2>
          <p className="mt-1">
            L&apos;utente si impegna a usare lo strumento per finalità personali e informative.
            I risultati devono essere interpretati come indicazioni orientative, non come
            valutazioni cliniche. Non usare i risultati per auto-diagnosi o per decidere
            trattamenti senza confronto con un professionista.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Emergenze e supporto</h2>
          <p className="mt-1">
            In caso di pericolo immediato, rischio per sé o per altri, o emergenza sanitaria,
            contatta il{" "}
            <a href={HELPLINES.emergency.tel} className="link font-semibold">
              {HELPLINES.emergency.number}
            </a>{" "}
            o recati al pronto soccorso. Per un ascolto anonimo e gratuito puoi contattare il{" "}
            <a href={HELPLINES.telefonoAmico.tel} className="link font-semibold">
              Telefono Amico ({HELPLINES.telefonoAmico.number})
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Limitazione di responsabilità</h2>
          <p className="mt-1">
            Il servizio non sostituisce il confronto con psicologi, psicoterapeuti, medici o
            altri professionisti qualificati. Il titolare non è responsabile per decisioni
            prestate dall&apos;utente sulla base dei risultati orientativi.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Contatti</h2>
          <p className="mt-1">
            Per domande sul servizio:{" "}
            <a href={`mailto:${OWNER.email}`} className="link">
              {OWNER.email}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
