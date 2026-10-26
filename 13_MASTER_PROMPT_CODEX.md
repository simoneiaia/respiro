# Master Prompt per Codex

Usa questo prompt per avviare lo sviluppo.

```text
Crea una web app in italiano per un self-check orientativo del benessere psicologico.

Stack richiesto:
- Next.js con TypeScript
- Tailwind CSS
- Supabase per autenticazione opzionale e database
- Recharts per i grafici
- struttura compatibile con deploy su Vercel o Cloudflare Pages

Vincoli fondamentali:
- L'app non deve formulare diagnosi.
- L'app non deve presentarsi come dispositivo medico.
- L'app non deve proporre terapia o trattamento.
- L'app deve avere disclaimer chiari.
- L'app deve prevedere consenso esplicito prima della compilazione.
- L'app deve consentire compilazione anonima.
- Lo storico deve essere salvato solo con account e consenso separato.
- Non inserire item, traduzioni o contenuti di strumenti psicometrici protetti.
- Il questionario deve essere configurabile da file JSON o oggetto TypeScript.
- Le domande devono essere placeholder modificabili.
- Ogni domanda deve supportare:
  - id
  - testo
  - area
  - reverse_scored
  - required
  - is_risk_item
  - risk_trigger_values
- Implementa scoring:
  - valore diretto
  - valore invertito
  - media totale
  - media per area
  - fasce orientative
  - risk_flag
- Se risk_flag è true, mostra un messaggio di sicurezza con invito a chiamare il 112 in caso di pericolo immediato.
- Non usare IA generativa per interpretare le risposte.
- Non inviare risposte a servizi analytics o error monitoring.
- Implementa pagine:
  - /
  - /consenso
  - /questionario
  - /risultato
  - /dashboard
  - /privacy
  - /termini
  - /account/dati
- Crea componenti:
  - ConsentPanel
  - QuestionCard
  - ProgressBar
  - ResultSummary
  - AreaScores
  - SafetyAlert
  - HistoryChart
  - DeleteDataPanel
- Crea funzioni pure testabili:
  - scoreAnswer
  - scoreAssessment
  - calculateAreaScores
  - detectRisk
  - assignBand
- Aggiungi test unitari per lo scoring.
- Crea seed di questionario con domande placeholder non cliniche e non derivate da strumenti protetti.
- Usa copy italiano contenuto nei file markdown del progetto.
- Crea README tecnico con istruzioni di installazione.
```

## Prompt per iterazione successiva

```text
Analizza il codice generato e verifica:
1. nessun testo protetto è stato inserito;
2. lo scoring è separato dalla UI;
3. i dati anonimi non vengono salvati;
4. il consenso per dati salute è separato dal consenso per storico;
5. il risk flag mostra sempre SafetyAlert;
6. non ci sono log di risposte utente;
7. RLS Supabase è documentata;
8. tutte le pagine hanno copy prudenziale.
```
