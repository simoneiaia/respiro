/** Identità visiva e testi di brand centralizzati. */
export const APP_NAME = "Respiro";
/** URL Firebase Hosting (progetto respiro-benessere). */
export const APP_URL = "https://respiro-benessere.web.app";
/** Repo pubblico GitHub (progetto open source). */
export const GITHUB_REPO_URL = "https://github.com/simoneiaia/respiro";
export const APP_TAGLINE = "Capire come stai, senza giudizio";
export const APP_DESCRIPTION =
  "Uno spazio tranquillo per riflettere sul tuo benessere. Orientativo, privato, non diagnostico. Non sostituisce uno psicologo, un medico o i servizi di emergenza.";


/**
 * Natura del questionario.
 * Domande originali: non è una scala clinica validata/protetta.
 * Si può dire che è orientativo senza usare "proprietario".
 */
export const TOOL_NATURE = `Il self-check di ${APP_NAME} non è un test diagnostico né una scala clinica validata. Non utilizza strumenti protetti da copyright: le domande sono originali. È uno strumento orientativo per aiutarti a riflettere su alcune aree del benessere psicologico negli ultimi 14 giorni.`;

export const MIN_AGE = 18;

export const OWNER = {
  name: "SIMONEIAIA - Marketing & Comunicazione",
  legalName: "Simone Iaia",
  vat: "02696110747",
  email: "info@simoneiaia.com",
  privacyEmail: "info@simoneiaia.com",
  address: "Via Dalmazia 21/a, 72100 Brindisi (BR), Italia",
  website: "https://www.simoneiaia.com",
} as const;

export const HELPLINES = {
  emergency: { number: "112", label: "Emergenze", tel: "tel:112" },
  telefonoAmico: {
    number: "02 2327 2327",
    label: "Telefono Amico",
    tel: "tel:+390223272327",
    note: "Ascolto anonimo e gratuito, tutti i giorni dalle 10 alle 24",
  },
} as const;

/** Paure comuni che l'app affronta esplicitamente (copy empatico). */
export const USER_FEARS = [
  {
    fear: "Ho paura che mi giudichino",
    answer:
      "In modalità anonima non salviamo le tue risposte in modo persistente: le usiamo solo per calcolare il risultato durante la sessione. Con un account, salviamo solo punteggi aggregati se lo scegli tu.",
  },
  {
    fear: "Non voglio una diagnosi",
    answer: "Non ne forniamo una. Ricevi solo un'indicazione orientativa, con parole semplici.",
  },
  {
    fear: "Non so se è il momento giusto",
    answer: "Puoi fermarti quando vuoi. Bastano pochi minuti, al tuo ritmo.",
  },
  {
    fear: "Ho bisogno di capire se chiedere aiuto",
    answer: "Il risultato ti aiuta a leggere i segnali, senza spaventarti né rassicurarti troppo.",
  },
] as const;
