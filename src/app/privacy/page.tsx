import Link from "next/link";
import { ControllerNotice } from "@/components/ControllerNotice";
import { APP_NAME, HELPLINES, MIN_AGE } from "@/lib/brand";
import {
  DATA_CONTROLLER,
  DATA_PROCESSORS,
  DELETION_ACTIONS,
  LEGAL,
  RETENTION_ROWS,
} from "@/lib/legal";

export const metadata = { title: `Privacy | ${APP_NAME}` };

export default function PrivacyPage() {
  return (
    <div className="container-app max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Informativa privacy</h1>
        <p className="mt-1 text-sm text-brand-600">
          Versione {LEGAL.privacyVersion} · In vigore dal {LEGAL.effectiveDate}
        </p>
        <p className="mt-2 text-sm text-brand-700">
          Informativa resa ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (GDPR) per
          il servizio {APP_NAME} ({LEGAL.serviceUrl}).
        </p>
      </div>

      <ControllerNotice />

      <div className="card space-y-5 text-sm leading-relaxed text-brand-800">
        <section>
          <h2 className="text-base font-semibold text-brand-900">
            Responsabili del trattamento (art. 28 GDPR)
          </h2>
          <p className="mt-1">
            Per l&apos;erogazione tecnica del servizio ci avvaliamo dei seguenti fornitori, che
            trattano dati per nostro conto in qualità di <strong>responsabili del trattamento</strong>
            (o sub-responsabili), sulla base di accordi conformi al GDPR:
          </p>
          <ul className="mt-3 space-y-3">
            {DATA_PROCESSORS.map((p) => (
              <li key={p.name} className="rounded-xl border border-brand-100 p-3">
                <p className="font-medium text-brand-900">{p.name}</p>
                <p className="mt-1 text-brand-700">{p.role}</p>
                <p className="mt-1 text-caption text-brand-600">{p.location}</p>
                <a
                  href={p.dpaUrl}
                  className="link mt-1 inline-block text-caption"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Accordo sul trattamento dati (DPA)
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-brand-600">{DATA_CONTROLLER.scopeNote}</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Quali dati trattiamo</h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-brand-700">
            <li>
              <strong>Sessione anonima:</strong> risposte al questionario, solo in memoria RAM
              durante la compilazione, per calcolare il risultato. Non salviamo le singole
              risposte in modo persistente né in cache del browser.
            </li>
            <li>
              <strong>Con account:</strong> indirizzo email; se acconsenti separatamente, punteggi
              aggregati, fasce orientative, flag di rischio, eventuale nota personale. Non
              salviamo il testo delle singole risposte nel database.
            </li>
            <li>
              <strong>Preferenze:</strong> impostazioni promemoria in app (solo con account).
            </li>
            <li>
              <strong>Dati tecnici minimi:</strong> gestiti da Firebase/Google per
              autenticazione e sicurezza (es. identificativo utente, token di sessione). Non
              utilizziamo Firebase Analytics per profilare le risposte al questionario.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">
            Finalità e base giuridica
          </h2>
          <ul className="mt-2 space-y-2 text-brand-700">
            <li>
              <strong>Calcolo del risultato orientativo:</strong> consenso esplicito dell&apos;interessato
              (art. 9, par. 2, lett. a) GDPR — dati relativi alla salute).
            </li>
            <li>
              <strong>Salvataggio storico e andamento:</strong> consenso separato, facoltativo
              (art. 9 GDPR).
            </li>
            <li>
              <strong>Promemoria in app:</strong> consenso separato, facoltativo (art. 6, lett. a)
              GDPR).
            </li>
            <li>
              <strong>Autenticazione account:</strong> esecuzione del servizio richiesto
              dall&apos;utente (art. 6, lett. b) GDPR).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">
            Obbligatorietà del conferimento
          </h2>
          <p className="mt-1">
            Il conferimento dei dati per il calcolo del risultato è <strong>facoltativo</strong> ma
            necessario per usare il self-check. Senza consenso al trattamento delle risposte non
            è possibile completare il questionario. Il salvataggio dello storico e i promemoria
            sono opzionali.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">
            Processi automatizzati e profilazione
          </h2>
          <p className="mt-1">
            Non effettuiamo decisioni basate unicamente su trattamenti automatizzati né
            profilazione ai sensi dell&apos;art. 22 GDPR. Il punteggio è calcolato con regole
            deterministiche configurate nello strumento, senza intelligenza artificiale.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Minori</h2>
          <p className="mt-1">
            Il servizio è riservato a persone di almeno <strong>{MIN_AGE} anni</strong>. Non è
            destinato a minori. Chiediamo una dichiarazione di età prima del self-check.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">
            Trasferimenti verso paesi terzi
          </h2>
          <p className="mt-1">
            I fornitori indicati possono trattare dati anche al di fuori dello Spazio Economico
            Europeo. I trasferimenti avvengono nel rispetto delle garanzie previste dal GDPR
            (es. Clausole Contrattuali Standard approvate dalla Commissione Europea).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Cookie e memorizzazione locale</h2>
          <p className="mt-1">
            {APP_NAME} usa cookie e memorizzazione tecnica strettamente necessari al funzionamento
            (sessione, autenticazione, preferenze essenziali come l&apos;avviso cookie). Non usiamo
            cookie di profilazione pubblicitaria né strumenti di analytics di marketing. Se accedi
            con Google o altri provider, quei servizi possono impostare cookie propri secondo le
            loro informative.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">
            Conservazione e retention (art. 13 GDPR)
          </h2>
          <p className="mt-1">
            Conserviamo i dati solo per il tempo necessario alle finalità indicate. Puoi
            cancellarli in qualsiasi momento dalla pagina{" "}
            <Link href="/account/dati" className="link">
              gestione dati
            </Link>
            .
          </p>
          <div className="mt-3 overflow-x-auto rounded-xl border border-brand-100">
            <table className="w-full min-w-[28rem] text-left text-caption">
              <thead className="bg-brand-50 text-brand-700">
                <tr>
                  <th className="px-3 py-2 font-semibold">Dato</th>
                  <th className="px-3 py-2 font-semibold">Quanto resta</th>
                  <th className="px-3 py-2 font-semibold">Quando finisce</th>
                </tr>
              </thead>
              <tbody>
                {RETENTION_ROWS.map((row) => (
                  <tr key={row.data} className="border-t border-brand-100 align-top">
                    <td className="px-3 py-2 font-medium text-brand-900">{row.data}</td>
                    <td className="px-3 py-2 text-brand-700">{row.period}</td>
                    <td className="px-3 py-2 text-brand-700">{row.end}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-brand-700">
            In particolare: i <strong>risultati salvati</strong> hanno una retention massima di{" "}
            <strong>{LEGAL.assessmentMaxRetentionMonths} mesi</strong> dalla creazione di ciascun
            record. Un account senza accessi per{" "}
            <strong>{LEGAL.inactivityRetentionMonths} mesi</strong> viene cancellato in automatico
            insieme ai dati associati, senza ulteriore preavviso individuale: questa informativa
            costituisce l&apos;informazione preventiva (art. 13 GDPR), salvo obblighi di legge.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">
            Cancellazione dei dati (art. 17 GDPR)
          </h2>
          <p className="mt-1">
            Puoi richiedere la cancellazione in qualsiasi momento. Meccanismi disponibili:
          </p>
          <ul className="mt-3 space-y-3">
            {DELETION_ACTIONS.map((action) => (
              <li key={action.id} className="rounded-xl border border-brand-100 p-3">
                <p className="font-medium text-brand-900">{action.title}</p>
                <p className="mt-1 text-brand-700">{action.deletes}</p>
                {action.id !== "email" && (
                  <Link href="/account/dati" className="link mt-2 inline-block text-caption">
                    Vai a gestione dati →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">
            Diritti dell&apos;interessato (artt. 15–22 GDPR)
          </h2>
          <p className="mt-1">
            Hai diritto di accesso, rettifica, cancellazione, limitazione, portabilità,
            opposizione (ove applicabile) e revoca del consenso in qualsiasi momento, senza
            pregiudicare la liceità del trattamento basata sul consenso prestato prima della
            revoca.
          </p>
          <p className="mt-2">
            Per esercitare i diritti scrivi a{" "}
            <a href={`mailto:${DATA_CONTROLLER.email}`} className="link">
              {DATA_CONTROLLER.email}
            </a>{" "}
            oppure usa la pagina{" "}
            <Link href="/account/dati" className="link">
              gestione dati
            </Link>
            . Risponderemo entro <strong>{LEGAL.rightsResponseDays} giorni</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Reclamo al Garante</h2>
          <p className="mt-1">
            Hai il diritto di proporre reclamo all&apos;Autorità Garante per la protezione dei
            dati personali (
            <a href="https://www.garanteprivacy.it" className="link" target="_blank" rel="noopener noreferrer">
              garanteprivacy.it
            </a>
            ), se ritieni che il trattamento violi il GDPR.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Sicurezza</h2>
          <p className="mt-1">
            Adottiamo misure tecniche e organizzative adeguate: regole di sicurezza Firestore
            (accesso solo al proprio utente), nessun logging delle risposte al questionario,
            nessuna interpretazione tramite IA. Il titolare mantiene un registro interno delle
            attività di trattamento.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Modifiche all&apos;informativa</h2>
          <p className="mt-1">
            Possiamo aggiornare questa informativa. La versione in vigore è sempre pubblicata su
            questa pagina con data di efficacia. Per modifiche sostanziali, informeremo gli utenti
            registrati via email o tramite avviso in app.
          </p>
        </section>
      </div>

      <p className="text-sm text-brand-600">
        In caso di pericolo immediato chiama il{" "}
        <a href={HELPLINES.emergency.tel} className="link font-semibold">
          {HELPLINES.emergency.number}
        </a>
        .
      </p>
    </div>
  );
}
