"use client";

import type { Question, Scale } from "@/lib/types";

export interface QuestionCardProps {
  question: Question;
  scale: Scale;
  value: number | undefined;
  onChange: (value: number) => void;
}

export function QuestionCard({ question, scale, value, onChange }: QuestionCardProps) {
  return (
    <div className="space-y-4">
      <h2
        id={`q-${question.id}`}
        className="px-0.5 text-lg font-medium leading-relaxed text-brand-900 sm:text-xl"
      >
        {question.text}
      </h2>

      <div
        className="card space-y-2 p-4 sm:p-6"
        role="radiogroup"
        aria-labelledby={`q-${question.id}`}
      >
        {scale.labels.map((opt) => {
          const checked = value === opt.value;
          const id = `${question.id}-${opt.value}`;
          return (
            <label
              key={opt.value}
              htmlFor={id}
              className={[
                "flex min-h-[3rem] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-body-sm transition duration-180 active:scale-[0.99] sm:min-h-[3.25rem]",
                checked
                  ? "border-teal-400 bg-gradient-to-r from-sky-50 to-teal-50 ring-1 ring-teal-200"
                  : "border-brand-100 bg-surface hover:border-sky-200 hover:bg-sky-50/40",
              ].join(" ")}
            >
              <input
                type="radio"
                id={id}
                name={question.id}
                value={opt.value}
                checked={checked}
                onChange={() => onChange(opt.value)}
                className="h-5 w-5 shrink-0 accent-accent-600"
              />
              <span className="text-brand-800">{opt.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
