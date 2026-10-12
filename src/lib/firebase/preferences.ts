import { doc, getDoc, setDoc } from "firebase/firestore";
import { getFirebaseAuth, getFirestoreDb } from "./client";
import { REMINDER_INTERVAL_MONTHS } from "../reminders";

export interface UserPreferences {
  reminder_enabled: boolean;
  reminder_interval_months: number;
  updated_at: string;
}

const DEFAULT_PREFS: UserPreferences = {
  reminder_enabled: false,
  reminder_interval_months: REMINDER_INTERVAL_MONTHS,
  updated_at: new Date().toISOString(),
};

function prefsRef() {
  const db = getFirestoreDb();
  const uid = getFirebaseAuth()?.currentUser?.uid;
  if (!db || !uid) return null;
  return doc(db, "users", uid);
}

export async function getUserPreferences(): Promise<UserPreferences> {
  const ref = prefsRef();
  if (!ref) return DEFAULT_PREFS;
  const snap = await getDoc(ref);
  if (!snap.exists()) return DEFAULT_PREFS;
  const data = snap.data();
  return {
    reminder_enabled: Boolean(data.reminder_enabled),
    reminder_interval_months:
      typeof data.reminder_interval_months === "number"
        ? data.reminder_interval_months
        : REMINDER_INTERVAL_MONTHS,
    updated_at: typeof data.updated_at === "string" ? data.updated_at : DEFAULT_PREFS.updated_at,
  };
}

export async function setReminderEnabled(enabled: boolean): Promise<void> {
  const ref = prefsRef();
  if (!ref) {
    throw new Error("Devi accedere per gestire i promemoria.");
  }
  await setDoc(
    ref,
    {
      reminder_enabled: enabled,
      reminder_interval_months: REMINDER_INTERVAL_MONTHS,
      updated_at: new Date().toISOString(),
    },
    { merge: true },
  );
}

export async function enableReminder(): Promise<void> {
  await setReminderEnabled(true);
}
