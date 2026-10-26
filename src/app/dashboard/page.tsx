"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardView } from "@/components/DashboardView";
import { ReminderBanner } from "@/components/ReminderBanner";
import { useUser } from "@/lib/useUser";
import { listAssessments, type StoredAssessment } from "@/lib/firebase/assessments";
import { getUserPreferences } from "@/lib/firebase/preferences";
import { isReminderDue } from "@/lib/reminders";

export default function DashboardPage() {
  const { user, loading, configured } = useUser();
  const [items, setItems] = useState<StoredAssessment[]>([]);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!configured || !user) {
      setLoadingData(false);
      return;
    }
    Promise.all([listAssessments(), getUserPreferences()])
      .then(([assessments, prefs]) => {
        setItems(assessments);
        setReminderEnabled(prefs.reminder_enabled);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Errore di caricamento."))
      .finally(() => setLoadingData(false));
  }, [loading, configured, user]);

  if (!configured) {
    return (
      <div className="container-app">
        <div className="card">
          <h1>Andamento non disponibile</h1>
          <p className="mt-2 text-body-sm text-brand-700">
            Il salvataggio dello storico richiede un account. Puoi comunque usare il self-check
            in modalità anonima.
          </p>
          <Link href="/consenso" className="btn-primary mt-4">
            Vai al self-check
          </Link>
        </div>
      </div>
    );
  }

  if (loading || loadingData) {
    return (
      <div className="container-app">
        <p className="text-body-sm text-brand-500">Caricamento…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container-app">
        <div className="card text-center">
          <h1>Il tuo percorso, nel tempo</h1>
          <p className="mt-2 text-body-sm text-brand-700">
            Con un account gratuito puoi salvare i risultati, vedere l&apos;andamento e ricevere
            un promemoria ogni 6 mesi per rifare il check.
          </p>
          <Link href="/accedi" className="btn-primary mt-4">
            Crea un account gratuito
          </Link>
        </div>
      </div>
    );
  }

  const lastAssessment = items.length > 0 ? items[items.length - 1] : null;
  const showReminder =
    lastAssessment && isReminderDue(lastAssessment.created_at, reminderEnabled);

  return (
    <div className="container-app max-w-3xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1>Come stai nel tempo</h1>
          <p className="mt-1 text-body-sm text-brand-700">{user.email}</p>
        </div>
        <Link href="/consenso" className="btn-primary">
          Nuovo self-check
        </Link>
      </div>

      {showReminder && <ReminderBanner lastAssessmentAt={lastAssessment!.created_at} />}

      {error && <p className="rounded-xl bg-[#fef2f2] p-3 text-body-sm text-danger">{error}</p>}

      {items.length === 0 ? (
        <div className="card text-center">
          <p className="text-body-sm text-brand-700">
            Non hai ancora risultati salvati. Completa il primo self-check con il consenso al
            salvataggio: da qui potrai seguire come evolve il tuo benessere.
          </p>
          <Link href="/consenso" className="btn-primary mt-4 inline-flex">
            Fai il primo check
          </Link>
        </div>
      ) : (
        <DashboardView items={items} />
      )}

      <p className="text-center text-body-sm text-brand-600">
        <Link href="/account/dati" className="link">
          Gestione dati e promemoria
        </Link>
      </p>
    </div>
  );
}
