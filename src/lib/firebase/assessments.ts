// Persistenza risultati via Firestore. Ogni utente accede solo ai propri record (security rules).
// Non salviamo le singole risposte: solo punteggi aggregati e flag.

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { getFirebaseAuth, getFirestoreDb } from "./client";
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

function requireUserId(): string {
  const auth = getFirebaseAuth();
  const uid = auth?.currentUser?.uid;
  if (!uid) throw new Error("Devi accedere per salvare il risultato.");
  return uid;
}

export async function saveAssessment(result: AssessmentResult): Promise<string> {
  const db = getFirestoreDb();
  if (!db) throw new Error("Firebase non configurato.");
  const userId = requireUserId();

  const ref = await addDoc(collection(db, "assessments"), {
    user_id: userId,
    created_at: new Date().toISOString(),
    questionnaire_slug: result.questionnaire_slug,
    questionnaire_version: result.questionnaire_version,
    total_raw_score: result.total_raw_score,
    total_mean_score: result.total_mean_score,
    band: result.band,
    risk_flag: result.risk_flag,
    area_scores: result.area_scores,
    notes: result.notes ? sanitizeNote(result.notes) : null,
  });
  return ref.id;
}

export async function updateAssessmentNotes(id: string, notes: string): Promise<void> {
  const db = getFirestoreDb();
  if (!db) throw new Error("Firebase non configurato.");
  requireUserId();
  await updateDoc(doc(db, "assessments", id), {
    notes: sanitizeNote(notes) || null,
  });
}

export async function listAssessments(): Promise<StoredAssessment[]> {
  const db = getFirestoreDb();
  const auth = getFirebaseAuth();
  const uid = auth?.currentUser?.uid;
  if (!db || !uid) return [];

  const q = query(
    collection(db, "assessments"),
    where("user_id", "==", uid),
    orderBy("created_at", "asc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      created_at: data.created_at as string,
      questionnaire_slug: data.questionnaire_slug as string,
      questionnaire_version: data.questionnaire_version as string,
      total_raw_score: data.total_raw_score as number,
      total_mean_score: data.total_mean_score as number,
      band: data.band as string,
      risk_flag: data.risk_flag as boolean,
      area_scores: data.area_scores as AssessmentResult["area_scores"],
      notes: (data.notes as string | null) ?? null,
    };
  });
}

export async function deleteAssessment(id: string): Promise<void> {
  const db = getFirestoreDb();
  if (!db) throw new Error("Firebase non configurato.");
  requireUserId();
  await deleteDoc(doc(db, "assessments", id));
}

export async function deleteAllAssessments(): Promise<void> {
  const db = getFirestoreDb();
  if (!db) throw new Error("Firebase non configurato.");
  const uid = requireUserId();
  const q = query(collection(db, "assessments"), where("user_id", "==", uid));
  const snap = await getDocs(q);
  await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
}

/** Esporta tutti i risultati salvati in JSON (portabilità GDPR). */
export async function exportAssessmentsJson(): Promise<string> {
  const items = await listAssessments();
  return JSON.stringify(
    {
      exported_at: new Date().toISOString(),
      assessments: items,
    },
    null,
    2,
  );
}

function downloadJson(filename: string, content: string): void {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function downloadAssessmentsExport(): Promise<void> {
  const json = await exportAssessmentsJson();
  const date = new Date().toISOString().slice(0, 10);
  downloadJson(`respiro-storico-${date}.json`, json);
}

/** Elimina account, preferenze e tutti i risultati salvati. */
export async function deleteUserAccount(): Promise<void> {
  const auth = getFirebaseAuth();
  const db = getFirestoreDb();
  const user = auth?.currentUser;
  if (!user || !db) throw new Error("Devi accedere per eliminare l'account.");

  await deleteAllAssessments();
  await deleteDoc(doc(db, "users", user.uid)).catch(() => {
    /* doc preferenze può non esistere */
  });
  await deleteUser(user);
}
