"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AreaScore } from "@/lib/types";
import { BAND_COLOR } from "@/lib/questionnaire";
import { AREA_USER_COPY, INTENSITY_LABEL } from "@/lib/result-copy";

export function AreaScores({ areas }: { areas: AreaScore[] }) {
  const sorted = [...areas].filter((a) => a.count > 0).sort((a, b) => b.mean_score - a.mean_score);

  if (sorted.length === 0) return null;

  const chartData = sorted.map((a) => ({
    name: AREA_USER_COPY[a.area_key]?.title ?? a.label,
    media: Number(a.mean_score.toFixed(2)),
    fill: BAND_COLOR[a.band],
    intensity: INTENSITY_LABEL[a.band],
  }));

  return (
    <div className="card space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-brand-900">Le quattro aree a colpo d&apos;occhio</h2>
        <p className="mt-1 text-sm text-brand-600">
          Ogni area racconta un aspetto diverso del tuo benessere. Più la barra è alta, più hai
          indicato segnali in quell&apos;area.
        </p>
      </div>

      <ul className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-3 sm:space-y-0">
        {sorted.map((a) => {
          const info = AREA_USER_COPY[a.area_key];
          return (
            <li
              key={a.area_key}
              className="rounded-xl border border-brand-100 bg-brand-50/50 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-brand-900">{info?.title ?? a.label}</p>
                <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-caption text-brand-600">
                  {INTENSITY_LABEL[a.band]}
                </span>
              </div>
              {info && (
                <p className="mt-2 text-sm leading-relaxed text-brand-700">{info.about}</p>
              )}
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-brand-100">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, (a.mean_score / 4) * 100)}%`,
                    backgroundColor: BAND_COLOR[a.band],
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 8, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7ece9" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#346b62" }}
              interval={0}
              tickFormatter={(v: string) => (v.length > 14 ? v.slice(0, 13) + "…" : v)}
            />
            <YAxis
              domain={[0, 4]}
              tick={{ fontSize: 11, fill: "#346b62" }}
              tickFormatter={() => ""}
            />
            <Tooltip
              cursor={{ fill: "#f0f7f5" }}
              contentStyle={{ borderRadius: 12, border: "1px solid #daece7", fontSize: 13 }}
              formatter={(_value, _name, item) => {
                const intensity = (item?.payload as { intensity?: string })?.intensity ?? "";
                return [`segnali ${intensity}`, "Intensità"];
              }}
            />
            <Bar dataKey="media" radius={[6, 6, 0, 0]} maxBarSize={56}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
