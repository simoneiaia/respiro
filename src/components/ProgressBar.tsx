import { questionnaire } from "@/lib/questionnaire";

const AREA_HINT: Record<string, string> = {
  wellbeing: "Benessere",
  symptoms: "Come ti senti",
  functioning: "Vita quotidiana",
  risk: "Ultimi passi",
};

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  const question = questionnaire.questions[Math.min(current - 1, total - 1)];
  const areaLabel = question ? AREA_HINT[question.area] ?? "Self-check" : "Self-check";

  // Posizione relativa nella fase corrente (area)
  const areaQuestions = question
    ? questionnaire.questions.filter((q) => q.area === question.area)
    : [];
  const areaIndex = question
    ? areaQuestions.findIndex((q) => q.id === question.id) + 1
    : 0;

  return (
    <div className="sticky top-0 z-10 -mx-5 bg-[#f8fafc]/95 px-5 py-3 backdrop-blur-sm sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0">
      <div className="mb-2 flex items-center justify-between gap-3 text-sm font-medium text-brand-700">
        <span className="min-w-0 truncate">
          <span className="text-accent-700">{areaLabel}</span>
          {areaIndex > 0 && (
            <span className="text-brand-500">
              {" "}
              · {areaIndex}/{areaQuestions.length}
            </span>
          )}
        </span>
        <span className="shrink-0 tabular-nums text-brand-500" aria-hidden>
          ~{Math.max(1, Math.ceil((total - current + 1) * 0.25))} min
        </span>
      </div>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-brand-100 sm:h-2"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Passo ${current} di ${total}`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-accent-500 to-teal-600 transition-all duration-240"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1.5 text-caption text-brand-500">
        Vai al tuo ritmo. Puoi fermarti quando vuoi.
      </p>
    </div>
  );
}
