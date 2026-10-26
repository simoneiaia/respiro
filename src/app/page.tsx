import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";
import {
  APP_NAME,
  APP_TAGLINE,
  GITHUB_REPO_URL,
  TOOL_NATURE,
  USER_FEARS,
} from "@/lib/brand";
import { GitHubMark } from "@/components/GitHubMark";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero full-bleed */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mt-8 w-screen sm:-mt-12">
        <div className="relative min-h-[72vh] overflow-hidden sm:min-h-[78vh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-calm.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/35 via-brand-900/45 to-[#f8fafc]" />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/20 via-transparent to-teal-900/25" />

          <div className="relative mx-auto flex min-h-[72vh] max-w-3xl flex-col justify-end px-5 pb-14 pt-24 sm:min-h-[78vh] sm:pb-16">
            <p className="animate-rise inline-flex flex-col font-display text-4xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-5xl">
              <span>{APP_NAME}</span>
              <svg
                width="120"
                height="10"
                viewBox="0 0 120 10"
                fill="none"
                aria-hidden
                className="mt-1 text-sky-200"
              >
                <path
                  d="M2 5.5 C18 1.5, 28 9, 42 5.5 C56 2, 66 9, 80 5.5 C94 2, 104 8.5, 118 4.5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </p>
            <h1 className="animate-rise mt-3 max-w-xl font-display text-2xl font-medium leading-snug text-white/95 sm:text-3xl">
              {APP_TAGLINE}
            </h1>
            <p className="animate-rise mt-4 max-w-lg text-base leading-relaxed text-white/85">
              Un momento privato per fermarti, rispondere con onestà e ricevere un quadro chiaro.
              Non è una diagnosi: è un primo passo verso te stesso/a.
            </p>
            <div className="animate-rise mt-7 flex flex-wrap gap-3">
              <Link
                href="/consenso"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-accent-800 shadow-soft transition hover:bg-sky-50"
              >
                Inizia quando sei pronto/a
              </Link>
              <a
                href="#come-funziona"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-5 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Come funziona
              </a>
            </div>
            <p className="mt-4 text-sm text-white/70">
              Circa 8–10 minuti · una domanda alla volta · puoi fermarti quando vuoi
            </p>
          </div>
        </div>
      </section>

      <div className="container-app max-w-3xl space-y-10">
        <Disclaimer />

        <section className="card">
          <h2 className="text-xl font-semibold">Che cos&apos;è (e cosa non è)</h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-700">{TOOL_NATURE}</p>
          <Link href="/come-funziona" className="link mt-3 inline-block text-sm">
            Dettagli sul percorso →
          </Link>
        </section>

        <section id="come-funziona" className="scroll-mt-8 space-y-6">
          <div className="text-center">
            <h2 className="font-display text-2xl font-semibold">Come funziona</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-brand-600">
              Dal self-check al risultato: un percorso chiaro, senza fretta.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Quadro chiaro",
                d: "Segnali per area (benessere, sensazioni, vita quotidiana) in linguaggio semplice.",
              },
              {
                t: "Azioni su misura",
                d: "Micro-passi pratici basati su ciò che emerge dalle tue risposte.",
              },
              {
                t: "Pausa di respiro",
                d: "Un minuto guidato subito dopo il risultato, se ti fa bene scendere di tono.",
              },
              {
                t: "Andamento nel tempo",
                d: "Con account: storico, confronto e promemoria in app ogni 6 mesi.",
              },
            ].map((item) => (
              <div
                key={item.t}
                className="rounded-2xl border border-sky-100/80 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                <div className="mb-3 h-1 w-10 rounded-full bg-gradient-to-r from-sky-400 to-teal-500" />
                <p className="font-display text-lg font-semibold text-brand-900">{item.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-700">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="paure" className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Forse ti riconosci in una di queste paure</h2>
            <p className="mt-2 text-sm text-brand-600">
              Sono normali. {APP_NAME} è stato pensato proprio per questo.
            </p>
          </div>
          <ul className="space-y-3">
            {USER_FEARS.map((item) => (
              <li
                key={item.fear}
                className="rounded-2xl border border-brand-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm"
              >
                <p className="font-medium text-brand-900">&ldquo;{item.fear}&rdquo;</p>
                <p className="mt-1 text-sm text-brand-700">{item.answer}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-soft sm:grid sm:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/breath-pause.jpg"
            alt="Persona in un momento di presenza"
            className="h-48 w-full object-cover object-[center_25%] sm:h-full"
          />
          <div className="flex flex-col justify-center space-y-3 p-6 sm:p-8">
            <p className="text-caption font-medium uppercase tracking-wide text-teal-700">
              Dopo il self-check
            </p>
            <h2 className="font-display text-xl font-semibold">Non resti solo/a con il risultato</h2>
            <p className="text-sm leading-relaxed text-brand-700">
              Ricevi indicazioni prudenti, azioni concrete e una pausa di respiro guidata. Se
              vuoi, puoi scaricare un report da condividere con chi ti cura.
            </p>
            <Link href="/come-funziona" className="link text-sm">
              Scopri il percorso completo →
            </Link>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-sky-50 via-white to-teal-50 p-6 text-center shadow-soft sm:p-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/soft-nature.jpg"
            alt=""
            className="mx-auto mb-5 h-28 w-full max-w-md rounded-2xl object-cover opacity-90"
          />
          <h2 className="font-display text-2xl font-semibold">Pronto/a a dedicarti questo tempo?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-brand-700">
            Nessuna etichetta, nessun giudizio. Solo un modo privato per leggere come stai.
          </p>
          <Link href="/consenso" className="btn-primary mt-6 inline-flex px-8">
            Inizia il self-check
          </Link>
          <p className="mt-3 text-caption text-brand-500">
            Privato · orientativo · riservato a chi ha almeno 18 anni
          </p>
        </section>

        <section className="overflow-hidden rounded-3xl border border-brand-100 bg-white p-6 shadow-soft sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-7">
          <div className="space-y-2">
            <p className="text-caption font-medium uppercase tracking-wide text-accent-700">
              Open source
            </p>
            <h2 className="font-display text-xl font-semibold text-brand-900">
              Codice aperto, ispezionabile
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-brand-700">
              {APP_NAME} è un progetto open source: puoi leggere il codice, segnalare problemi e
              contribuire sul repository GitHub.
            </p>
          </div>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-4 inline-flex shrink-0 items-center gap-2 sm:mt-0"
          >
            <GitHubMark size={18} />
            Vedi su GitHub
          </a>
        </section>
      </div>
    </div>
  );
}
