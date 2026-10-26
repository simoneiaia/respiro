"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isFirebaseConfigured } from "@/lib/firebase/client";
import { useUser } from "@/lib/useUser";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";

export default function AccediPage() {
  const router = useRouter();
  const { user } = useUser();
  const configured = isFirebaseConfigured();

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

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
        <h1 className="text-2xl font-semibold">Accedi a Respiro</h1>
        <p className="mt-1 text-sm text-brand-700">
          Entra con Google per salvare i risultati, vedere l&apos;andamento e ricevere un
          promemoria ogni 6 mesi. Puoi sempre usare il check in anonimo.
        </p>
      </div>

      <div className="card space-y-4">
        <SocialAuthButtons />
        <p className="text-center text-xs text-brand-600">
          Accedendo accetti la{" "}
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

      <p className="text-center text-sm text-brand-600">
        Preferisci non creare un account?{" "}
        <Link href="/consenso" className="link">
          Continua in anonimo
        </Link>
      </p>
    </div>
  );
}
