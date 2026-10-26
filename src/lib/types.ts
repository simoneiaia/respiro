// Tipi condivisi del motore questionario. Nessuna dipendenza dalla UI.

export type BandKey = "low" | "moderate" | "high" | "very_high";

export interface ScaleLabel {
  value: number;
  label: string;
}

export interface Scale {
  min: number;
  max: number;
  labels: ScaleLabel[];
}

export interface Area {
  key: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  area: string;
  reverse_scored: boolean;
  required: boolean;
  is_risk_item: boolean;
  risk_trigger_values: number[];
}

export interface Band {
  key: BandKey;
  min_mean: number;
  max_mean: number;
  label: string;
}

export interface Questionnaire {
  slug: string;
  title: string;
  version: string;
  description: string;
  timeframe: string;
  scale: Scale;
  areas: Area[];
  questions: Question[];
  bands: Band[];
}

/** Mappa questionId -> valore grezzo selezionato dall'utente. */
export type Answers = Record<string, number>;

export interface AreaScore {
  area_key: string;
  label: string;
  raw_score: number;
  mean_score: number;
  band: BandKey;
  count: number;
}

export interface AssessmentResult {
  questionnaire_slug: string;
  questionnaire_version: string;
  total_raw_score: number;
  total_mean_score: number;
  /** Punteggio in formato 0–40 (media × 10), mostrato accanto alla media 0–4. */
  total_clinical_score: number;
  band: BandKey;
  area_scores: AreaScore[];
  risk_flag: boolean;
  safety_message_required: boolean;
  /** Numero domande di rischio attivate (non i contenuti). */
  risk_triggered_count: number;
  /** Id del record salvato (solo se utente registrato + consenso). */
  saved_id?: string | null;
  /** Nota personale opzionale post-compilazione. */
  notes?: string;
}
