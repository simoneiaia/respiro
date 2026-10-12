import Link from "next/link";
import { APP_NAME } from "@/lib/brand";

export function SaveProgressPrompt({ saved }: { saved: boolean }) {
  if (saved) {
    return (
      <div className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 to-sky-50 p-5 sm:p-6">
        <p className="text-caption font-medium uppercase tracking-wide text-teal-700">
          Andamento salvato
        </p>
        <h2 className="mt-1 font-display text-xl font-semibold text-brand-900">
          Tra sei mesi potrai confrontarti
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-700">
          Questo risultato è nel tuo account. Nella dashboard vedi se le cose migliorano, e
          puoi attivare un promemoria in app.
        </p>
        <Link href="/dashboard" className="btn-primary mt-4 inline-flex">
          Apri andamento
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-soft sm:grid sm:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-3 p-5 sm:p-6">
        <p className="text-caption font-medium uppercase tracking-wide text-accent-700">
          Più valore nel tempo
        </p>
        <h2 className="font-display text-xl font-semibold text-brand-900">
          Vuoi vedere se le cose cambiano?
        </h2>
        <p className="text-sm leading-relaxed text-brand-700">
          Con un account gratuito su {APP_NAME} puoi salvare i punteggi aggregati (non le
          singole risposte), confrontarli nel tempo e ricevere un promemoria in app ogni 6 mesi.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Link href="/accedi" className="btn-primary">
            Crea account / Accedi
          </Link>
          <Link href="/come-funziona" className="btn-ghost">
            Come funziona
          </Link>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/soft-light.jpg"
        alt="Luce soft, senso di continuità"
        className="hidden h-full min-h-[10rem] w-full object-cover sm:block"
      />
    </div>
  );
}
