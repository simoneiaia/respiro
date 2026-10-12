\#\# masterplan.md

\# CORE-OM Digital Tracker

\#\# Elevator pitch  
CORE-OM Digital Tracker è una web app che consente a un utente individuale di compilare digitalmente il CORE-OM, ottenere scoring automatico corretto, vedere l’andamento nel tempo e consultare una sintesi esplicativa prudente e non clinica.

\#\# Problem & mission  
Molti questionari standardizzati vengono ancora gestiti in PDF, carta o strumenti poco usabili. Questo rende più difficile compilare bene, calcolare i punteggi senza errori e leggere i trend nel tempo.

La missione del prodotto è semplice: rendere il CORE-OM chiaro, digitale e leggibile, senza trasformarlo in uno strumento clinico attivo o in un sistema di raccomandazione terapeutica.

\#\# Target audience  
\- \*\*Primario:\*\* utente individuale  
  \- vuole compilare il questionario in autonomia  
  \- vuole vedere risultati e andamento storico  
  \- vuole una lettura comprensibile e non giudicante  
\- \*\*Secondario:\*\* demo / portfolio / research showcase  
  \- mostra digitalizzazione corretta dello strumento  
  \- dimostra UX, tracking, scoring e reporting prudente

\#\# What the product does  
\- digitalizza la compilazione del \*\*CORE-OM\*\*  
\- salva le sessioni nel tempo  
\- calcola automaticamente i punteggi  
\- mostra \*\*entrambi i formati di score\*\*  
  \- media item \*\*0–4\*\*  
  \- clinical score \*\*0–40\*\*  
\- visualizza storico e trend  
\- genera una sintesi testuale non clinica

\#\# What the product does not do  
\- non è un dispositivo medico  
\- non fornisce diagnosi  
\- non sostituisce supporto psicologico o clinico  
\- non produce raccomandazioni terapeutiche  
\- non effettua triage clinico  
\- non include chatbot terapeutico  
\- non gestisce ruoli terapeuta/paziente nel MVP

\#\# Core feature set  
\- \*\*Auth essenziale\*\*  
  \- signup  
  \- login  
  \- logout  
\- \*\*Onboarding sicuro\*\*  
  \- disclaimer iniziale  
  \- spiegazione di scopo e limiti  
\- \*\*Questionnaire flow\*\*  
  \- 34 item CORE-OM  
  \- risposte su scala 0–4  
  \- riferimento esplicito agli ultimi 7 giorni  
\- \*\*Scoring\*\*  
  \- total mean score 0–4  
  \- clinical score ×10 su 0–40  
  \- domain scores  
  \- gestione item reverse-scored  
  \- gestione item mancanti secondo regola dichiarata  
\- \*\*Results\*\*  
  \- riepilogo ultima compilazione  
  \- breakdown per domini  
  \- nota esplicativa prudente  
\- \*\*History\*\*  
  \- archivio compilazioni  
  \- trend chart nel tempo  
  \- dettaglio singola sessione  
\- \*\*Optional MVP+\*\*  
  \- export report  
  \- nota personale post-compilazione

\#\# Instrument logic that is product-critical  
Il prodotto deve rispettare in modo esplicito la logica dello strumento:

\- \*\*34 item\*\*  
\- scala Likert \*\*0–4\*\*  
\- finestra temporale: \*\*ultimi 7 giorni\*\*  
\- 4 domini principali:  
  \- benessere  
  \- problemi  
  \- funzionamento  
  \- rischio  
\- \*\*6 item di rischio\*\*  
  \- 4 rischio verso sé  
  \- 2 rischio verso altri  
\- \*\*8 item reverse-scored\*\*  
\- punteggi mostrati in due modi:  
  \- \*\*media item 0–4\*\*  
  \- \*\*clinical score 0–40\*\*  
\- punteggio totale calcolabile solo con \*\*massimo 3 item mancanti\*\*  
  \- quindi almeno \*\*31 item compilati\*\*

\#\# High-level tech stack  
\- \*\*Frontend: Next.js \+ React\*\*  
  \- ottimo per app web snelle e portfolio-ready  
\- \*\*Styling: Tailwind CSS\*\*  
  \- veloce, coerente, facile da mantenere  
\- \*\*Backend/API: Next.js Route Handlers\*\*  
  \- stack compatto, poche parti mobili  
\- \*\*Database \+ Auth: Supabase \+ PostgreSQL\*\*  
  \- auth semplice  
  \- relazioni chiare  
  \- buona velocità per MVP  
\- \*\*Hosting: Vercel\*\*  
  \- deploy rapido  
  \- ideale per progetto demo-first  
\- \*\*Charts: libreria leggera\*\*  
  \- trend semplice  
  \- leggibilità prima dell’effetto wow

\#\# Conceptual data model  
\#\#\# profiles  
Un profilo per ogni utente autenticato.

Campi chiave:  
\- id  
\- email  
\- created\_at

\#\#\# assessments  
Una riga per ogni compilazione completata.

Campi chiave:  
\- id  
\- user\_id  
\- completed\_at  
\- total\_mean\_score  
\- clinical\_score\_x10  
\- wellbeing\_score  
\- problems\_score  
\- functioning\_score  
\- risk\_score  
\- notes

\#\#\# assessment\_answers  
Una riga per ogni risposta data a un item.

Campi chiave:  
\- id  
\- assessment\_id  
\- item\_number  
\- raw\_value  
\- scored\_value  
\- was\_reverse\_scored

\#\#\# questionnaire\_items  
Archivio descrittivo degli item ufficiali.

Campi chiave:  
\- item\_number  
\- item\_text  
\- domain  
\- is\_reverse\_scored  
\- is\_risk\_item

\#\# UI design principles  
Il prodotto deve risultare calmo, leggibile e non giudicante.

Principi guida:  
\- \*\*prima il quadro generale\*\*  
  \- ultimo punteggio  
  \- trend  
  \- stato della compilazione  
\- \*\*una scelta per volta\*\*  
  \- una domanda chiara  
  \- scala sempre identica  
\- \*\*scansione facile\*\*  
  \- etichette brevi  
  \- spazio bianco generoso  
  \- gerarchia visiva netta  
\- \*\*tono prudente\*\*  
  \- evitare linguaggio diagnostico  
  \- evitare allarmi aggressivi  
\- \*\*microcopy gentile\*\*  
  \- spiegare senza far pesare  
  \- supportare senza interpretare troppo

\#\# Security & compliance notes  
\- dati personali minimi  
\- accesso limitato ai soli dati dell’utente  
\- disclaimer visibile prima dell’uso  
\- risultati presentati come \*\*self-report\*\*  
\- nessuna diagnosi o raccomandazione clinica  
\- nessuna automazione medical-like  
\- attenzione al riuso del testo ufficiale del questionario:  
  \- usare il testo ufficiale  
  \- non modificarlo  
  \- mantenere nota copyright/licenza dove richiesto

\#\# MVP → V1 → V2 roadmap  
\#\#\# MVP  
\- auth  
\- disclaimer  
\- compilazione CORE-OM  
\- scoring automatico  
\- risultati  
\- storico  
\- trend chart  
\- salvataggio database

\#\#\# V1  
\- breakdown domini più ricco  
\- export report PDF/testo  
\- nota personale post-compilazione  
\- UX migliorata per review di sessione

\#\#\# V2  
\- condivisione controllata dei report  
\- benchmark personali nel tempo  
\- reminder opzionali  
\- pannello professionista separato  
\- layer esplicativo avanzato, sempre non clinico

\#\# Risks & mitigations  
\#\#\# Rischio 1: scoring sbagliato  
Mitigazione:  
\- scoring spec separata  
\- test su reverse scoring  
\- test su missing values  
\- fixtures con risultati attesi

\#\#\# Rischio 2: tono troppo clinico  
Mitigazione:  
\- microcopy prudente  
\- disclaimer forte  
\- review lessicale sistematica

\#\#\# Rischio 3: confusione tra 0–4 e 0–40  
Mitigazione:  
\- mostrare sempre entrambe le metriche  
\- etichette esplicite  
\- tooltip o help text breve

\#\#\# Rischio 4: uso improprio in contesti sensibili  
Mitigazione:  
\- limiti del prodotto ben visibili  
\- nessuna raccomandazione terapeutica  
\- messaggi di supporto neutrali e sicuri

\#\# Future expansion ideas  
\- ruolo terapeuta, fuori dal MVP  
\- export condivisibile con consenso esplicito  
\- reminder periodici  
\- tagging eventi personali  
\- comparazione periodi  
\- localizzazione multilingua  
\- modalità research showcase più ricca  
