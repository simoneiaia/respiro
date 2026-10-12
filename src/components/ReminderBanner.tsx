"use client";

import Link from "next/link";
import { formatReminderDueDate } from "@/lib/reminders";

export function ReminderBanner({ lastAssessmentAt }: { lastAssessmentAt: string }) {
  return (
    <div
      role="status"
      className="rounded-2xl border border-accent-200 bg-accent-50 p-5 text-sm text-brand-800"
    >
      <p className="font-medium text-accent-800">È un buon momento per rifare il check</p>
      <p className="mt-2 leading-relaxed">
        L&apos;ultimo self-check risale a più di 6 mesi fa. Rifarlo ti aiuta a capire come
        stai oggi, senza confrontarti con nessuno: solo con te stesso/a.
      </p>
      <p className="mt-1 text-caption text-brand-600">
        Ultimo check:{" "}
        {new Date(lastAssessmentAt).toLocaleDateString("it-IT", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        {" · "}
        Consigliato entro: {formatReminderDueDate(lastAssessmentAt)}
      </p>
      <Link href="/consenso" className="btn-primary mt-4 inline-flex">
        Fai un nuovo self-check
      </Link>
    </div>
  );
}
