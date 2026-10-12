"use client";

import Link from "next/link";
import { APP_NAME } from "@/lib/brand";
import { useUser } from "@/lib/useUser";

export function DataManagementIntro() {
  const { user, configured } = useUser();

  if (!configured) {
    return (
      <div className="card text-sm text-brand-700">
        <p>
          Il servizio account non è configurato. Puoi usare {APP_NAME} in modalità anonima: i dati
          restano solo in memoria per la sessione corrente.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="card space-y-3 text-sm text-brand-700">
        <p className="font-medium text-brand-900">Sei in modalità anonima</p>
        <p>
          Da questa pagina puoi cancellare i dati della sessione corrente su questo dispositivo.
          Per gestire storico, promemoria, esportazione o eliminazione account,{" "}
          <Link href="/accedi" className="link">
            accedi al tuo account
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="card space-y-2 text-sm text-brand-700">
      <p className="font-medium text-brand-900">Account: {user.email}</p>
      <p>
        Da qui puoi gestire promemoria, esportare i risultati salvati, cancellare lo storico o
        eliminare l&apos;account. I dati di sessione corrente (compilazione in corso) possono
        essere cancellati separatamente.
      </p>
    </div>
  );
}
