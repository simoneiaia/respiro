import { describe, it, expect } from "vitest";
import {
  scoreAnswer,
  assignBand,
  calculateAreaScores,
  clinicalScore,
  detectRisk,
  scoreAssessment,
  missingRequired,
} from "../index";
import type { Questionnaire } from "../../types";

const q: Questionnaire = {
  slug: "test-v1",
  title: "Test",
  version: "1.0.0",
  description: "",
  timeframe: "",
  scale: {
    min: 0,
    max: 4,
    labels: [
      { value: 0, label: "Mai" },
      { value: 4, label: "Sempre" },
    ],
  },
  areas: [
    { key: "wellbeing", label: "Benessere" },
    { key: "risk", label: "Rischio" },
  ],
  questions: [
    {
      id: "a1",
      text: "Positiva",
      area: "wellbeing",
      reverse_scored: true,
      required: true,
      is_risk_item: false,
      risk_trigger_values: [],
    },
    {
      id: "a2",
      text: "Diretta",
      area: "wellbeing",
      reverse_scored: false,
      required: true,
      is_risk_item: false,
      risk_trigger_values: [],
    },
    {
      id: "r1",
      text: "Rischio",
      area: "risk",
      reverse_scored: false,
      required: true,
      is_risk_item: true,
      risk_trigger_values: [1, 2, 3, 4],
    },
  ],
  bands: [
    { key: "low", min_mean: 0, max_mean: 0.99, label: "" },
    { key: "moderate", min_mean: 1, max_mean: 1.99, label: "" },
    { key: "high", min_mean: 2, max_mean: 2.99, label: "" },
    { key: "very_high", min_mean: 3, max_mean: 4, label: "" },
  ],
};

describe("scoreAnswer", () => {
  it("valore diretto", () => {
    expect(scoreAnswer({ reverse_scored: false }, 3, 4)).toBe(3);
  });
  it("valore invertito", () => {
    expect(scoreAnswer({ reverse_scored: true }, 3, 4)).toBe(1);
    expect(scoreAnswer({ reverse_scored: true }, 0, 4)).toBe(4);
  });
});

describe("assignBand", () => {
  it("assegna le fasce per media", () => {
    expect(assignBand(0, q.bands)).toBe("low");
    expect(assignBand(0.99, q.bands)).toBe("low");
    expect(assignBand(1, q.bands)).toBe("moderate");
    expect(assignBand(2.5, q.bands)).toBe("high");
    expect(assignBand(4, q.bands)).toBe("very_high");
  });
  it("fallback fuori range", () => {
    expect(assignBand(99, q.bands)).toBe("very_high");
    expect(assignBand(-1, q.bands)).toBe("low");
  });
});

describe("detectRisk", () => {
  it("nessun rischio se valore non in trigger", () => {
    expect(detectRisk(q, { r1: 0 }).risk_flag).toBe(false);
  });
  it("rischio se valore in trigger", () => {
    const res = detectRisk(q, { r1: 1 });
    expect(res.risk_flag).toBe(true);
    expect(res.triggered_count).toBe(1);
  });
});

describe("calculateAreaScores", () => {
  it("somma e media per area con inversione", () => {
    // a1 reverse: 4 -> 0; a2 diretto: 2 -> 2; media wellbeing = 1
    const areas = calculateAreaScores(q, { a1: 4, a2: 2, r1: 0 });
    const wb = areas.find((a) => a.area_key === "wellbeing")!;
    expect(wb.raw_score).toBe(2);
    expect(wb.mean_score).toBe(1);
    expect(wb.band).toBe("moderate");
  });
});

describe("clinicalScore", () => {
  it("riscala media 0-4 in 0-40", () => {
    expect(clinicalScore(0)).toBe(0);
    expect(clinicalScore(2)).toBe(20);
    expect(clinicalScore(4)).toBe(40);
    expect(clinicalScore(1.333)).toBe(13);
  });
});

describe("scoreAssessment", () => {
  it("totale, media, fascia e risk insieme", () => {
    // a1 reverse 4->0, a2 0, r1 4 -> scored [0,0,4], somma 4, media 1.333
    const res = scoreAssessment(q, { a1: 4, a2: 0, r1: 4 });
    expect(res.total_raw_score).toBe(4);
    expect(res.total_mean_score).toBeCloseTo(1.333, 2);
    expect(res.total_clinical_score).toBe(13);
    expect(res.band).toBe("moderate");
    expect(res.risk_flag).toBe(true);
    expect(res.safety_message_required).toBe(true);
  });
});

describe("missingRequired", () => {
  it("rileva domande obbligatorie senza risposta", () => {
    expect(missingRequired(q, { a1: 2 })).toEqual(["a2", "r1"]);
    expect(missingRequired(q, { a1: 2, a2: 2, r1: 0 })).toEqual([]);
  });
  it("rileva valori fuori scala", () => {
    expect(missingRequired(q, { a1: 9, a2: 2, r1: 0 })).toEqual(["a1"]);
  });
});
