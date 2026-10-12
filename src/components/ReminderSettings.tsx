"use client";

import { useEffect, useState } from "react";
import { getUserPreferences, setReminderEnabled } from "@/lib/firebase/preferences";
import { REMINDER_INTERVAL_MONTHS } from "@/lib/reminders";
import { useUser } from "@/lib/useUser";

export function ReminderSettings() {
  const { user, configured } = useUser();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!configured || !user) {
      setLoading(false);
      return;
    }
    getUserPreferences()
      .then((p) => setEnabled(p.reminder_enabled))
      .finally(() => setLoading(false));
  }, [configured, user]);

  async function save(next: boolean) {
    setBusy(true);
    setMessage(null);
    try {
      await setReminderEnabled(next);
      setEnabled(next);
      setMessage("Preferenze salvate.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Errore nel salvataggio.");
    } finally {
      setBusy(false);
    }
  }

  if (!configured || !user) return null;
  if (loading) return null;

  return (
    <div className="card space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-brand-900">
          Promemoria ogni {REMINDER_INTERVAL_MONTHS} mesi
        </h2>
        <p className="mt-1 text-sm text-brand-700">
          Dopo l&apos;ultimo self-check salvato, un messaggio in app ti ricorda gentilmente di
          rifarlo.
        </p>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-brand-100 p-3">
        <input
          type="checkbox"
          checked={enabled}
          disabled={busy}
          onChange={(e) => save(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-accent-600"
        />
        <span className="text-sm text-brand-800">
          Mostra un promemoria nella dashboard quando sono passati {REMINDER_INTERVAL_MONTHS}{" "}
          mesi dall&apos;ultimo check salvato
        </span>
      </label>

      {message && <p className="text-sm text-brand-600">{message}</p>}
    </div>
  );
}
