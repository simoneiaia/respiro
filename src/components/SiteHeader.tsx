"use client";

import Link from "next/link";
import { useUser } from "@/lib/useUser";
import { signOut as firebaseSignOut } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { Logo } from "@/components/Logo";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { GitHubMark } from "@/components/GitHubMark";
import { GITHUB_REPO_URL } from "@/lib/brand";

export function SiteHeader() {
  const { user, configured } = useUser();

  async function signOut() {
    const auth = getFirebaseAuth();
    if (auth) await firebaseSignOut(auth);
  }

  return (
    <header className="no-print border-b border-brand-100 bg-white/90 backdrop-blur-md">
      <EmergencyBanner />
      <div className="container-app flex items-center justify-between py-3">
        <Link href="/" className="text-brand-900 transition hover:opacity-80">
          <Logo />
        </Link>

        <nav className="flex items-center gap-1 text-sm" aria-label="Navigazione principale">
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-2.5 py-2"
            aria-label="Codice open source su GitHub"
            title="Open source su GitHub"
          >
            <GitHubMark size={18} />
          </a>
          <Link href="/consenso" className="btn-ghost px-3 py-2">
            Self-check
          </Link>
          {configured && user && (
            <Link href="/dashboard" className="btn-ghost px-3 py-2">
              Andamento
            </Link>
          )}
          {configured ? (
            user ? (
              <button onClick={signOut} className="btn-secondary px-3 py-2">
                Esci
              </button>
            ) : (
              <Link href="/accedi" className="btn-secondary px-3 py-2">
                Accedi
              </Link>
            )
          ) : null}
        </nav>
      </div>
    </header>
  );
}
