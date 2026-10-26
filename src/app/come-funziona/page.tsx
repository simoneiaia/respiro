import Link from "next/link";
import { APP_NAME, TOOL_NATURE } from "@/lib/brand";
import { questionnaire } from "@/lib/questionnaire";

export const metadata = { title: `Come funziona | ${APP_NAME}` };

const STEPS = [
  {
    n: "01",
    t: "Consenso chiaro",
    d: "Scegli anonimo o account, e cosa vuoi salvare. Niente preselezioni.",
  },
  {
    n: "02",
    t: "Self-check a fasi",
    d: "Circa 8–10 minuti, una domanda alla volta, quattro fasi. Vai al tuo ritmo.",
  },
  {
    n: "03",
    t: "Quadro orientativo",
    d: "Segnali per area, in parole semplici. Non è una diagnosi.",
  },
  {
    n: "04",
    t: "Passi concreti",
    d: "Azioni su misura, pausa di respiro, report scaricabile e (se vuoi) andamento nel tempo.",
  },
];

export default function ComeFunzionaPage() {
  return (
    <div className="container-app max-w-3xl space-y-8">
      <div className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-soft">
        <div className="relative h-40 sm:h-48">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/soft-light.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
        </div>
        <div className="relative -mt-8 px-5 pb-6 sm:px-8">
          <h1 className="font-display text-2xl font-semibold sm:text-3xl">
            Come funziona il self-check
          </h1>
          <p className="mt-2 max-w-xl text-sm text-brand-600">
            Cosa fa {APP_NAME}, cosa non fa, e come leggere il risultato senza ansia.
          </p>
        </div>
      </div>

      <ol className="grid gap-3 sm:grid-cols-2">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="rounded-2xl border border-sky-100 bg-white p-5 shadow-soft"
          >
            <span className="font-display text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-teal-600">
              {s.n}
            </span>
            <p className="mt-2 font-semibold text-brand-900">{s.t}</p>
            <p className="mt-1 text-sm leading-relaxed text-brand-700">{s.d}</p>
          </li>
        ))}
      </ol>

      <div className="card space-y-5 text-sm leading-relaxed text-brand-800">
        <section>
          <h2 className="text-base font-semibold text-brand-900">Che cos&apos;è {APP_NAME}</h2>
          <p className="mt-2">{TOOL_NATURE}</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Cosa non è</h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-brand-700">
            <li>Non è un test diagnostico né una diagnosi.</li>
            <li>
              Non utilizza scale cliniche validate protette da copyright: le
              domande sono originali.
            </li>
            <li>Non sostituisce psicologi, psicoterapeuti, medici o servizi di emergenza.</li>
            <li>Non interpreta le risposte con intelligenza artificiale.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Il questionario</h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-brand-700">
            <li>
              Domande originali scritte per {APP_NAME}, organizzate in <strong>4 fasi</strong>{" "}
              (benessere, come ti senti, vita quotidiana, ultimi passi).
            </li>
            <li>
              Tempo stimato: <strong>circa 8–10 minuti</strong>. Una domanda alla volta; puoi
              fermarti quando vuoi.
            </li>
            <li>
              Riferimento temporale: <strong>{questionnaire.timeframe.toLowerCase()}</strong>.
            </li>
            <li>Scala di risposta da 0 a 4 (da &quot;Mai&quot; a &quot;Sempre o quasi sempre&quot;).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Come viene calcolato il risultato</h2>
          <p className="mt-2">
            Le risposte vengono aggregate per area e tradotte in una <strong>fascia orientativa</strong>{" "}
            (segnali lievi, presenti, più intensi o intensi). Mostriamo anche una media su 0–4 e
            un formato 0–40: sono due modi di leggere lo stesso dato, senza soglie cliniche.
          </p>
          <p className="mt-2">
            Se emergono segnali di rischio, mostriamo un{" "}
            <strong>messaggio di sicurezza separato e prioritario</strong>, indipendentemente dal
            punteggio complessivo.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Anonimo o con account</h2>
          <div className="mt-2 space-y-2 text-brand-700">
            <p>
              <strong>Anonimo:</strong> le risposte restano in memoria solo per la sessione corrente.
              Non salviamo lo storico sul server.
            </p>
            <p>
              <strong>Con account:</strong> puoi salvare i punteggi aggregati (non le singole
              risposte) per vedere l&apos;andamento e attivare un promemoria in app ogni 6 mesi.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-brand-900">Età minima</h2>
          <p className="mt-2">
            Il servizio è riservato a persone di almeno <strong>18 anni</strong>.
          </p>
        </section>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/consenso" className="btn-primary">
          Inizia il self-check
        </Link>
        <Link href="/privacy" className="btn-secondary">
          Informativa privacy
        </Link>
      </div>
    </div>
  );
}
