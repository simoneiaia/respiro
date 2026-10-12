"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase/client";
import { useUser } from "@/lib/useUser";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";

type Mode = "signin" | "signup";

export default function AccediPage() {
  const router = useRouter();
  const { user } = useUser();
  const configured = isFirebaseConfigured();

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const auth = getFirebaseAuth();
    if (!auth) return;
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Account creato. Ora puoi salvare i tuoi risultati.");
        router.push("/dashboard");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/dashboard");
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Operazione non riuscita.";
      if (msg.includes("invalid-credential")) {
        setError("Email o password non corretti.");
      } else if (msg.includes("email-already-in-use")) {
        setError("Questa email è già registrata. Prova ad accedere.");
      } else if (msg.includes("weak-password")) {
        setError("La password deve avere almeno 6 caratteri.");
      } else {
        setError(msg);
      }
    } finally {
      setBusy(false);
    }
  }

  if (!configured) {
    return (
      <div className="container-app">
        <div className="card">
          <h1 className="text-xl font-semibold">Accesso non disponibile</h1>
          <p className="mt-2 text-sm text-brand-700">
            Il servizio account non è configurato in questo ambiente. Puoi comunque usare il
            self-check in modalità anonima, senza salvataggio.
          </p>
          <Link href="/consenso" className="btn-primary mt-4">
            Vai al self-check anonimo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app max-w-md space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">
          {mode === "signin" ? "Bentornato/a" : "Crea il tuo spazio"}
        </h1>
        <p className="mt-1 text-sm text-brand-700">
          Un account gratuito ti permette di salvare i risultati, vedere l&apos;andamento e
          ricevere un promemoria ogni 6 mesi. Puoi sempre usare il check in anonimo.
        </p>
      </div>

      <form onSubmit={submit} className="card space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-brand-800">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:border-accent-400"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-brand-800">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm focus:border-accent-400"
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
          />
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}
        {message && <p className="text-sm text-brand-700">{message}</p>}

        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy ? "Attendere…" : mode === "signin" ? "Accedi" : "Crea account"}
        </button>

        <SocialAuthButtons />
      </form>

      <p className="text-center text-sm text-brand-700">
        {mode === "signin" ? (
          <>
            Non hai un account?{" "}
            <button onClick={() => setMode("signup")} className="link">
              Creane uno
            </button>
          </>
        ) : (
          <>
            Hai già un account?{" "}
            <button onClick={() => setMode("signin")} className="link">
              Accedi
            </button>
          </>
        )}
      </p>

      <p className="text-center text-xs text-brand-600">
        Creando un account accetti la{" "}
        <Link href="/privacy" className="link">
          privacy policy
        </Link>{" "}
        e i{" "}
        <Link href="/termini" className="link">
          termini d&apos;uso
        </Link>
        .
      </p>
    </div>
  );
}
