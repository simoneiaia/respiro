"use client";

import { ControllerNotice } from "@/components/ControllerNotice";
import { DataManagementIntro } from "@/components/DataManagementIntro";
import { DataRightsPanel } from "@/components/DataRightsPanel";
import { DeleteDataPanel } from "@/components/DeleteDataPanel";
import { ExportHistoryPanel } from "@/components/ExportHistoryPanel";
import { ReminderSettings } from "@/components/ReminderSettings";

export default function GestioneDatiPage() {
  return (
    <div className="container-app space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Privacy e dati</h1>
        <p className="mt-1 text-sm text-brand-700">
          Esercita i tuoi diritti GDPR, cancella i dati e gestisci account e promemoria.
        </p>
      </div>
      <ControllerNotice compact />
      <DataManagementIntro />
      <DataRightsPanel />
      <ReminderSettings />
      <ExportHistoryPanel />
      <DeleteDataPanel />
    </div>
  );
}
