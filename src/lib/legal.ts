import { APP_NAME, APP_URL, OWNER } from "./brand";

/** Riferimenti legali centralizzati (GDPR). Usati in privacy, termini e gestione dati. */
export const LEGAL = {
  /** Versione interna dell'informativa. Non va mostrata in UI. */
  privacyVersion: "3.2",
  effectiveDate: "12 ottobre 2026",
  /** Art. 12 GDPR — tempo massimo di risposta alle richieste dell'interessato. */
  rightsResponseDays: 30,
  /**
   * Retention massima dei risultati salvati (mesi dalla data di creazione).
   * Indipendente dall'attività: dopo questo periodo i dati vanno cancellati.
   */
  assessmentMaxRetentionMonths: 24,
  /** Mesi di inattività account senza accesso prima della cancellazione automatica. */
  inactivityRetentionMonths: 24,
  /**
   * La privacy (art. 13) è già il preavviso generale.
   * Nessuna email individuale obbligatoria prima della cancellazione per retention/inattività.
   */
  inactivityRequiresPriorNotice: false,
  serviceUrl: APP_URL,
} as const;

/** Tabella retention per tipologia di dato (trasparenza art. 13 GDPR). */
export const RETENTION_ROWS = [
  {
    data: "Risposte al questionario (sessione anonima)",
    period: "Solo in memoria RAM durante la sessione",
    end: "Chiusura scheda, refresh, o cancellazione da gestione dati",
  },
  {
    data: "Risultato aggregato della sessione corrente",
    period: "Solo in memoria RAM fino a chiusura o cancellazione",
    end: "Non viene salvato sul server in modalità anonima",
  },
  {
    data: "Email account e autenticazione",
    period: "Fino a eliminazione account da parte tua",
    end: "O su tua richiesta via email entro 30 giorni",
  },
  {
    data: "Risultati salvati (punteggi, fasce, note)",
    period: `Massimo ${LEGAL.assessmentMaxRetentionMonths} mesi dalla data di creazione di ciascun risultato`,
    end: "O cancellazione anticipata da gestione dati / eliminazione account",
  },
  {
    data: "Preferenze promemoria",
    period: "Finché l'account è attivo",
    end: "Eliminate con l'account o alla disattivazione del promemoria",
  },
  {
    data: "Account inattivo (nessun accesso)",
    period: `${LEGAL.inactivityRetentionMonths} mesi di inattività`,
    end: "Cancellazione automatica di account e dati associati (senza ulteriore preavviso individuale)",
  },
] as const;

/** Titolare del trattamento (art. 4, n. 7 GDPR). */
export const DATA_CONTROLLER = {
  entity: OWNER.name,
  legalRepresentative: OWNER.legalName,
  vat: OWNER.vat,
  address: OWNER.address,
  email: OWNER.privacyEmail,
  website: OWNER.website,
  /** Respiro è gestito dal titolare in proprio, non da una community o associazione. */
  scopeNote: `${APP_NAME} è un servizio digitale gestito dal titolare del trattamento indicato sopra. Non è un servizio collettivo: eventuali community o gruppi che condividono il link non sono titolari né responsabili del trattamento dei dati.`,
} as const;

/** Responsabili del trattamento (art. 28 GDPR) — subfornitori con accesso ai dati. */
export const DATA_PROCESSORS = [
  {
    name: "Google LLC / Google Cloud (Firebase)",
    role: "Hosting, autenticazione, database (Firestore)",
    location: "UE e paesi terzi (con garanzie GDPR)",
    dpaUrl: "https://cloud.google.com/terms/data-processing-addendum",
  },
] as const;

/** Cosa viene cancellato con ogni azione utente (trasparenza art. 13). */
export const DELETION_ACTIONS = [
  {
    id: "session",
    title: "Cancella dati di sessione",
    deletes:
      "Consenso, risposte in memoria e risultato della compilazione corrente su questo dispositivo.",
    keeps: "Nessun dato sul server (modalità anonima). Con account, lo storico salvato resta intatto.",
    where: "/account/dati",
  },
  {
    id: "history",
    title: "Cancella tutto lo storico",
    deletes:
      "Tutti i risultati aggregati salvati (punteggi, fasce, note, date). Solo con account.",
    keeps: "Account e email di accesso. Preferenze promemoria.",
    where: "/account/dati",
  },
  {
    id: "account",
    title: "Elimina account",
    deletes:
      "Account Firebase Auth, email di registrazione, storico completo, preferenze e promemoria.",
    keeps: `Nessun dato personale associato all'account sul servizio ${APP_NAME}.`,
    where: "/account/dati",
  },
  {
    id: "email",
    title: "Richiesta via email",
    deletes: "Su richiesta: accesso, rettifica, cancellazione, portabilità, limitazione.",
    keeps: "Risposta documentata entro 30 giorni.",
    where: `mailto:${OWNER.privacyEmail}?subject=Richiesta%20diritti%20GDPR%20-%20${encodeURIComponent(APP_NAME)}`,
  },
] as const;
