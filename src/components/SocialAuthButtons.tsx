"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  type AuthProvider,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";

type ProviderKey = "google" | "apple" | "microsoft" | "github";

const PROVIDERS: {
  key: ProviderKey;
  label: string;
  ready: boolean;
  build: () => AuthProvider;
}[] = [
  {
    key: "google",
    label: "Continua con Google",
    ready: true,
    build: () => new GoogleAuthProvider(),
  },
  {
    key: "apple",
    label: "Continua con Apple",
    ready: false,
    build: () => new OAuthProvider("apple.com"),
  },
  {
    key: "microsoft",
    label: "Continua con Microsoft",
    ready: false,
    build: () => new OAuthProvider("microsoft.com"),
  },
  {
    key: "github",
    label: "Continua con GitHub",
    ready: false,
    build: () => new GithubAuthProvider(),
  },
];

function friendlyAuthError(msg: string, key: ProviderKey): string {
  if (msg.includes("auth/popup-closed-by-user") || msg.includes("auth/cancelled-popup-request")) {
    return "Finestra di accesso chiusa. Puoi riprovare quando vuoi.";
  }
  if (msg.includes("auth/account-exists-with-different-credential")) {
    return "Esiste già un account con questa email, ma con un altro metodo di accesso.";
  }
  if (
    msg.includes("auth/operation-not-allowed") ||
    msg.includes("auth/admin-restricted-operation") ||
    msg.includes("auth/internal-error")
  ) {
    return `Accesso con ${key} non ancora attivo sul progetto. Usa Google oppure email e password.`;
  }
  if (msg.includes("auth/unauthorized-domain")) {
    return "Questo dominio non è autorizzato per l'accesso.";
  }
  return "Accesso non riuscito. Riprova o usa email e password.";
}

export function SocialAuthButtons() {
  const router = useRouter();
  const [busy, setBusy] = useState<ProviderKey | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  async function signIn(key: ProviderKey) {
    const auth = getFirebaseAuth();
    if (!auth) return;
    const entry = PROVIDERS.find((p) => p.key === key);
    if (!entry) return;

    setBusy(key);
    setError(null);
    try {
      await signInWithPopup(auth, entry.build());
      router.push("/dashboard");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "errore";
      setError(friendlyAuthError(msg, key));
    } finally {
      setBusy(null);
    }
  }

  const primary = PROVIDERS.filter((p) => p.ready);
  const secondary = PROVIDERS.filter((p) => !p.ready);

  return (
    <div className="space-y-3">
      <div className="relative py-1 text-center">
        <span className="relative z-10 bg-white px-3 text-caption text-brand-500">oppure</span>
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-brand-100" aria-hidden />
      </div>

      <div className="grid gap-2">
        {primary.map((p) => (
          <button
            key={p.key}
            type="button"
            disabled={busy !== null}
            onClick={() => signIn(p.key)}
            className="btn-secondary w-full justify-center text-sm font-medium"
          >
            {busy === p.key ? "Attendere…" : p.label}
          </button>
        ))}
      </div>

      {secondary.length > 0 && (
        <div className="space-y-2">
          <button
            type="button"
            className="text-caption text-brand-500 underline-offset-2 hover:underline"
            onClick={() => setShowMore((v) => !v)}
          >
            {showMore ? "Nascondi altri metodi" : "Altri metodi (Apple, Microsoft, GitHub)"}
          </button>
          {showMore && (
            <div className="grid gap-2">
              {secondary.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  disabled={busy !== null}
                  onClick={() => signIn(p.key)}
                  className="btn-ghost w-full justify-center border border-brand-100 text-sm"
                >
                  {busy === p.key ? "Attendere…" : p.label}
                </button>
              ))}
              <p className="text-caption leading-relaxed text-brand-500">
                Per attivarli servono account sviluppatore esterni (Apple, Azure, GitHub) e le
                relative chiavi in Firebase Auth. Non sono recuperabili da qui: vanno create lì.
                Google è già attivo.
              </p>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}
