"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { StoredAssessment } from "@/lib/firebase/assessments";
import { BAND_COLOR } from "@/lib/questionnaire";

// Grafico storico del punteggio medio totale nel tempo, con fasce orientative
// sullo sfondo (basso → molto elevato). Mostra andamento dei punteggi, non un
// andamento clinico certificato.

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("it-IT", { day: "2-digit", month: "short", year: "2-digit" });
}

export function HistoryChart({ items }: { items: StoredAssessment[] }) {
  const data = items.map((a) => ({
    date: formatDate(a.created_at),
    media: Number(a.total_mean_score.toFixed(2)),
  }));

  return (
    <div className="card">
      <h3 className="text-base font-semibold text-brand-900">Andamento nel tempo</h3>
      <p className="mb-4 mt-1 text-sm text-brand-600">
        Punteggio medio totale per ogni self-check (scala 0-4). Le bande indicano le fasce
        orientative.
      </p>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: -16 }}>
            {/* Bande orientative di sfondo */}
            <ReferenceArea y1={0} y2={1} fill={BAND_COLOR.low} fillOpacity={0.12} />
            <ReferenceArea y1={1} y2={2} fill={BAND_COLOR.moderate} fillOpacity={0.12} />
            <ReferenceArea y1={2} y2={3} fill={BAND_COLOR.high} fillOpacity={0.12} />
            <ReferenceArea y1={3} y2={4} fill={BAND_COLOR.very_high} fillOpacity={0.12} />
            <CartesianGrid strokeDasharray="3 3" stroke="#e7ece9" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#346b62" }} />
            <YAxis domain={[0, 4]} tick={{ fontSize: 12, fill: "#346b62" }} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: "1px solid #daece7", fontSize: 13 }}
              formatter={(value: number) => [value.toFixed(2), "media"]}
            />
            <Line
              type="monotone"
              dataKey="media"
              stroke="#1f2937"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#7c9a7e", strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
