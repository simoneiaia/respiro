import Link from "next/link";
import { APP_NAME, GITHUB_REPO_URL, HELPLINES, OWNER } from "@/lib/brand";
import { DATA_CONTROLLER } from "@/lib/legal";
import { GitHubMark } from "@/components/GitHubMark";

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-brand-100 bg-surface">
      <div className="container-app max-w-3xl py-8 text-sm text-brand-700">
        <p className="mb-3">
          {APP_NAME} è uno strumento <strong>orientativo</strong> e non diagnostico. Non
          sostituisce psicologi, psicoterapeuti, medici o servizi di emergenza. In caso di
          pericolo immediato chiama il{" "}
          <a href={HELPLINES.emergency.tel} className="link">
            {HELPLINES.emergency.number}
          </a>
          . Per un ascolto anonimo:{" "}
          <a href={HELPLINES.telefonoAmico.tel} className="link">
            {HELPLINES.telefonoAmico.number}
          </a>
          .
        </p>

        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 inline-flex items-center gap-2 rounded-xl border border-brand-100 bg-brand-50/80 px-3.5 py-2.5 text-sm font-medium text-brand-800 transition hover:border-brand-200 hover:bg-white"
        >
          <GitHubMark size={18} className="text-brand-900" />
          <span>
            Progetto <strong>open source</strong>
            <span className="font-normal text-brand-600"> · codice su GitHub</span>
          </span>
        </a>

        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Link legali">
          <Link href="/come-funziona" className="link">
            Come funziona
          </Link>
          <Link href="/privacy" className="link">
            Privacy
          </Link>
          <Link href="/termini" className="link">
            Termini d&apos;uso
          </Link>
          <Link href="/account/dati" className="link">
            Gestione dati e diritti GDPR
          </Link>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 link"
          >
            <GitHubMark size={14} />
            GitHub
          </a>
        </nav>
        <p className="mt-4 text-caption text-brand-500">
          © {new Date().getFullYear()} · Titolare del trattamento: {DATA_CONTROLLER.entity}{" "}
          ({DATA_CONTROLLER.legalRepresentative}) · P.IVA {OWNER.vat} ·{" "}
          <a href={`mailto:${DATA_CONTROLLER.email}`} className="link">
            {DATA_CONTROLLER.email}
          </a>
        </p>
      </div>
    </footer>
  );
}
