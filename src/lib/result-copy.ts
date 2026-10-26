import type { AreaScore, BandKey } from "./types";

/** Spiegazione in linguaggio semplice per ogni area del questionario. */
export const AREA_USER_COPY: Record<
  string,
  { title: string; about: string; whenHigher: string }
> = {
  wellbeing: {
    title: "Benessere",
    about: "Momenti in cui ti sei sentito/a bene dentro: calma, speranza, stabilità emotiva.",
    whenHigher:
      "Più segnali qui indicano che, nelle ultime due settimane, il benessere interno è stato più fragile del solito.",
  },
  symptoms: {
    title: "Sintomi percepiti",
    about: "Sensazioni difficili che hai notato: tensione, tristezza, ansia, sonno, energia.",
    whenHigher:
      "Più segnali qui indicano che hai percepito disagio con una certa frequenza o intensità.",
  },
  functioning: {
    title: "Funzionamento quotidiano",
    about: "Quanto le cose di tutti i giorni (lavoro, relazioni, casa) sono state gestibili per te.",
    whenHigher:
      "Più segnali qui indicano che il disagio ha inciso sulle attività quotidiane.",
  },
  risk: {
    title: "Segnali di rischio",
    about: "Pensieri o situazioni che meritano attenzione particolare e non vanno minimizzati.",
    whenHigher:
      "Hai indicato segnali che richiedono attenzione. Se non l'hai già fatto, leggi il messaggio di sicurezza in alto.",
  },
};

/** Micro-azioni pratiche per area (orientative, non cliniche). */
export const AREA_ACTIONS: Record<string, { title: string; actions: string[] }> = {
  wellbeing: {
    title: "Per il benessere interno",
    actions: [
      "Dedica 5 minuti a qualcosa che ti fa sentire un po' più presente (cammino lento, musica, luce naturale).",
      "Scrivi tre cose che oggi sono andate almeno abbastanza bene, anche se piccole.",
      "Metti in calendario un momento solo per te questa settimana, anche breve.",
    ],
  },
  symptoms: {
    title: "Per le sensazioni difficili",
    actions: [
      "Nota corpo e respiro: 4 secondi inspira, 4 trattieni, 4 espira. Ripeti 4 volte.",
      "Se il sonno è fragile, riduci schermi 30 minuti prima di dormire e tieni orari più regolari.",
      "Quando arriva tensione o tristezza, dai un nome a ciò che senti senza giudicarlo.",
    ],
  },
  functioning: {
    title: "Per la vita quotidiana",
    actions: [
      "Scegli un solo impegno di oggi e spezzalo in tre passi piccoli e realistici.",
      "Chiedi aiuto su una cosa concreta (un messaggio, una commissione, una pausa).",
      "Proteggi 10 minuti tra un'attività e l'altra: acqua, stiramento, aria.",
    ],
  },
  risk: {
    title: "Quando i segnali pesano di più",
    actions: [
      "Se ti senti in pericolo, chiama subito il 112. Non sei solo/a.",
      "Telefono Amico (02 2327 2327) offre ascolto anonimo e gratuito dalle 10 alle 24.",
      "Se puoi, resta vicino a qualcuno di fiducia mentre cerchi supporto.",
    ],
  },
};

/** Seleziona fino a 2 aree su cui basare le micro-azioni personalizzate. */
export function pickFocusAreas(areas: AreaScore[]): AreaScore[] {
  return [...areas]
    .filter((a) => a.count > 0 && a.mean_score >= 1)
    .sort((a, b) => b.mean_score - a.mean_score)
    .slice(0, 2);
}

export const INTENSITY_LABEL: Record<BandKey, string> = {
  low: "lievi",
  moderate: "presenti",
  high: "più intensi",
  very_high: "intensi",
};

/** Guida orientativa per fascia complessiva — tono empatico, non clinico. */
export const BAND_USER_GUIDANCE: Record<
  BandKey,
  { headline: string; reflection: string; suggestions: string[] }
> = {
  low: {
    headline: "In questo momento emergono segnali lievi",
    reflection:
      "Le tue risposte suggeriscono un disagio percepito contenuto nelle ultime due settimane. Non significa che tutto vada bene per forza, né che le difficoltà vadano ignorate: è un punto di partenza per osservarti con gentilezza.",
    suggestions: [
      "Continua a notare come ti senti nei prossimi giorni, senza giudicarti.",
      "Piccole routine di cura (sonno, movimento, contatti con persone fidate) possono aiutare.",
      "Se qualcosa cambia o peggiora, puoi ripetere il self-check o parlarne con qualcuno.",
    ],
  },
  moderate: {
    headline: "Emergono alcuni segnali da tenere d'occhio",
    reflection:
      "Hai descritto un disagio percepito che compare con una certa regolarità. Non è una diagnosi, ma è un invito a non passare oltre come se nulla fosse. Molte persone in situazioni simili trovano utile parlarne.",
    suggestions: [
      "Racconta a una persona di fiducia come ti sei sentito/a in queste settimane.",
      "Valuta se un confronto con uno psicologo o il medico di base possa darti supporto.",
      "Ripeti il check tra qualche settimana per vedere se le cose cambiano.",
    ],
  },
  high: {
    headline: "I segnali che emergono sono più marcati",
    reflection:
      "Le tue risposte indicano un disagio percepito significativo negli ultimi 14 giorni. Chiedere aiuto non è debolezza: è un gesto di cura verso te stesso/a. Non devi affrontare tutto da solo/a.",
    suggestions: [
      "Considera di contattare uno psicologo, psicoterapeuta o il tuo medico di base.",
      "Se hai persone fidate intorno, puoi iniziare da un piccolo passo: dire che non stai bene.",
      "Se il disagio è acuto, non aspettare: i servizi di ascolto sono gratuiti e anonimi.",
    ],
  },
  very_high: {
    headline: "I segnali che emergono sono intensi",
    reflection:
      "Hai descritto un disagio percepito molto presente nelle ultime due settimane. Questo strumento non può aiutarti da solo: meriti supporto reale, umano e tempestivo. Non sei un disturbo, non sei un problema da risolvere in silenzio.",
    suggestions: [
      "Contatta quanto prima uno psicologo, un servizio di ascolto o il tuo medico.",
      "Se pensi di essere in pericolo, chiama il 112 o il Telefono Amico.",
      "Chiedi a qualcuno di fiducia di stare con te mentre cerchi aiuto, se ti fa sentire più al sicuro.",
    ],
  },
};
