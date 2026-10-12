// Persistenza dei risultati per utenti registrati e consenzienti.
// RLS Supabase garantisce che ogni utente acceda solo ai propri record.
// Non viene salvato il testo delle risposte: solo punteggi aggregati e flag.

import { getSupabase } from "./client";
import type { AssessmentResult } from "../types";
import { sanitizeNote } from "../security";

export interface StoredAssessment {
  id: string;
  created_at: string;
  questionnaire_slug: string;
  questionnaire_version: string;
  total_raw_score: number;
  total_mean_score: number;
  band: string;
  risk_flag: boolean;
  area_scores: AssessmentResult["area_scores"];
  notes: string | null;
}

/**
 * Salva un risultato. Richiede utente autenticato e consenso storico già
 * verificato dal chiamante. Ritorna l'id creato.
 */
export async function saveAssessment(result: AssessmentResult): Promise<string> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase non configurato.");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Devi accedere per salvare il risultato.");

  const { data, error } = await supabase
    .from("assessments")
    .insert({
      user_id: user.id,
      questionnaire_slug: result.questionnaire_slug,
      questionnaire_version: result.questionnaire_version,
      total_raw_score: result.total_raw_score,
      total_mean_score: result.total_mean_score,
      band: result.band,
      risk_flag: result.risk_flag,
      area_scores: result.area_scores,
      notes: result.notes ? sanitizeNote(result.notes) : null,
    })
    .select("id")
    .single();

  if (error) throw error;
  return data.id as string;
}

/** Aggiorna la nota personale di un risultato salvato dell'utente. */
export async function updateAssessmentNotes(id: string, notes: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase non configurato.");
  const { error } = await supabase
    .from("assessments")
    .update({ notes: sanitizeNote(notes) || null })
    .eq("id", id);
  if (error) throw error;
}

/** Storico dell'utente corrente, dal più vecchio al più recente. */
export async function listAssessments(): Promise<StoredAssessment[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("assessments")
    .select(
      "id, created_at, questionnaire_slug, questionnaire_version, total_raw_score, total_mean_score, band, risk_flag, area_scores, notes",
    )
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as StoredAssessment[];
}

/** Cancella un singolo risultato dell'utente. */
export async function deleteAssessment(id: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase non configurato.");
  const { error } = await supabase.from("assessments").delete().eq("id", id);
  if (error) throw error;
}

/** Cancella tutti i risultati dell'utente corrente. */
export async function deleteAllAssessments(): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase non configurato.");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Nessun utente autenticato.");
  const { error } = await supabase.from("assessments").delete().eq("user_id", user.id);
  if (error) throw error;
}
