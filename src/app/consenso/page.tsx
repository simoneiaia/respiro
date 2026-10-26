"use client";

import { useRouter } from "next/navigation";
import { ConsentPanel } from "@/components/ConsentPanel";
import { useUser } from "@/lib/useUser";
import { saveConsent, type ConsentState } from "@/lib/session";
import { enableReminder } from "@/lib/firebase/preferences";

export default function ConsensoPage() {
  const router = useRouter();
  const { user, configured } = useUser();
  const accountAvailable = configured && !!user;

  async function handleConfirm(consent: ConsentState) {
    saveConsent(consent);
    if (accountAvailable && consent.sixMonthReminder) {
      try {
        await enableReminder();
      } catch {
        /* promemoria opzionale */
      }
    }
    router.push("/questionario");
  }

  return (
    <div className="container-app space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Prima di iniziare</h1>
        <p className="mt-1 text-sm text-brand-700">
          Prenditi il tempo che ti serve. Puoi tornare indietro in qualsiasi momento.
        </p>
      </div>
      <ConsentPanel accountAvailable={accountAvailable} onConfirm={handleConfirm} />
    </div>
  );
}
