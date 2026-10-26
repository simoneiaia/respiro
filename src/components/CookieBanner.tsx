"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "respiro_cookie_notice_v1";

/**
 * Banner informativo (non un CMP marketing).
 * Respiro usa cookie/storage tecnici per sessione e autenticazione.
 * Nessun analytics pubblicitario: basta un avviso + link privacy.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-brand-100 bg-white/95 p-4 shadow-soft backdrop-blur-md"
      role="dialog"
      aria-label="Informativa cookie"
    >
      <div className="container-app flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-brand-700">
          Usiamo solo cookie e memorizzazione tecnica necessari al servizio (sessione, accessi,
          preferenze essenziali). Nessun cookie di profilazione pubblicitaria. Dettagli nella{" "}
          <Link href="/privacy" className="link">
            privacy
          </Link>
          .
        </p>
        <button type="button" onClick={dismiss} className="btn-primary shrink-0 px-5">
          Ho capito
        </button>
      </div>
    </div>
  );
}
