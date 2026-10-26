"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/useUser";
import { deleteAllAssessments, deleteUserAccount } from "@/lib/firebase/assessments";
import { clearSession } from "@/lib/session";

export function DeleteDataPanel() {
  const router = useRouter();
  const { user, configured } = useUser();
  const [confirmingHistory, setConfirmingHistory] = useState(false);
  const [confirmingAccount, setConfirmingAccount] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function clearLocal() {
    clearSession();
    setDone("Dati della sessione corrente cancellati da questo dispositivo.");
  }

  async function deleteHistory() {
    setBusy(true);
    setError(null);
    try {
      await deleteAllAssessments();
      clearSession();
      setDone("Tutti i tuoi risultati salvati sono stati eliminati.");
      setConfirmingHistory(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore durante la cancellazione.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteAccount() {
    setBusy(true);
    setError(null);
    try {
      await deleteUserAccount();
      clearSession();
      setDone("Account eliminato. Verrai reindirizzato alla home.");
      setConfirmingAccount(false);
      setTimeout(() => router.push("/"), 2000);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Errore durante l'eliminazione.";
      setError(
        msg.includes("requires-recent-login")
          ? "Per sicurezza, esci e accedi di nuovo prima di eliminare l'account."
          : msg,
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-brand-900">Cancella i tuoi dati</h2>
        <p className="mt-1 text-sm text-brand-700">
          Puoi eliminare i dati in qualsiasi momento. Le azioni non possono essere annullate.
        </p>
      </div>

      <div className="rounded-xl border border-brand-100 p-4">
        <p className="text-sm font-medium text-brand-900">Dati di sessione corrente</p>
        <p className="mt-1 text-sm text-brand-700">
          Consenso, risposte in corso e risultato non ancora chiuso (su questo dispositivo, in
          memoria).
        </p>
        <button onClick={clearLocal} className="btn-secondary mt-3">
          Cancella dati di sessione
        </button>
      </div>

      {configured && user && (
        <>
          <div className="rounded-xl border border-[#e3c9c5] bg-[#fbf1f0] p-4">
            <p className="text-sm font-medium text-[#5e2a2a]">Storico salvato</p>
            <p className="mt-1 text-sm text-[#5e2a2a]/90">
              Risultati aggregati nel tuo account ({user.email}). Le singole risposte non sono
              salvate.
            </p>
            {!confirmingHistory ? (
              <button
                onClick={() => setConfirmingHistory(true)}
                className="btn mt-3 bg-danger text-white hover:bg-[#6e2f2f]"
              >
                Cancella tutto lo storico
              </button>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={deleteHistory}
                  disabled={busy}
                  className="btn bg-danger text-white hover:bg-[#6e2f2f]"
                >
                  {busy ? "Cancellazione…" : "Sì, cancella lo storico"}
                </button>
                <button onClick={() => setConfirmingHistory(false)} className="btn-ghost">
                  Annulla
                </button>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-[#e3c9c5] bg-[#fbf1f0] p-4">
            <p className="text-sm font-medium text-[#5e2a2a]">Elimina account</p>
            <p className="mt-1 text-sm text-[#5e2a2a]/90">
              Elimina definitivamente l&apos;account, lo storico, le preferenze e i promemoria.
            </p>
            {!confirmingAccount ? (
              <button
                onClick={() => setConfirmingAccount(true)}
                className="btn mt-3 border border-danger bg-white text-danger hover:bg-[#fdf3f1]"
              >
                Elimina il mio account
              </button>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={deleteAccount}
                  disabled={busy}
                  className="btn bg-danger text-white hover:bg-[#6e2f2f]"
                >
                  {busy ? "Eliminazione…" : "Sì, elimina account"}
                </button>
                <button onClick={() => setConfirmingAccount(false)} className="btn-ghost">
                  Annulla
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {done && <p className="text-sm text-brand-700">{done}</p>}
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}
