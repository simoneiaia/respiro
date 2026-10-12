"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";

function friendlyAuthError(msg: string): string {
  if (msg.includes("auth/popup-closed-by-user") || msg.includes("auth/cancelled-popup-request")) {
    return "Finestra di accesso chiusa. Puoi riprovare quando vuoi.";
  }
  if (msg.includes("auth/account-exists-with-different-credential")) {
    return "Esiste già un account con questa email, ma con un altro metodo di accesso.";
  }
  if (
    msg.includes("auth/operation-not-allowed") ||
    msg.includes("auth/admin-restricted-operation")
  ) {
    return "Accesso con Google non disponibile al momento. Riprova più tardi.";
  }
  if (msg.includes("auth/unauthorized-domain")) {
    return "Questo dominio non è autorizzato per l'accesso.";
  }
  return "Accesso con Google non riuscito. Riprova.";
}

export function SocialAuthButtons() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signInWithGoogle() {
    const auth = getFirebaseAuth();
    if (!auth) return;

    setBusy(true);
    setError(null);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.push("/dashboard");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "errore";
      setError(friendlyAuthError(msg));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        disabled={busy}
        onClick={signInWithGoogle}
        className="btn-primary w-full justify-center text-sm font-medium"
      >
        {busy ? "Attendere…" : "Continua con Google"}
      </button>
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}
