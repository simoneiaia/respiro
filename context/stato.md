# Stato

Ultimo aggiornamento: 2026-11-27

## Progetto
Respiro è un self-check orientativo per maggiorenni, non una scala clinica validata. Frontend Next.js 16 / React 19 con export statico su Firebase Hosting; Google Sign-In e storico facoltativo Firestore. App: https://respiro-benessere.web.app.

## Integrazione PR #10 e #11
PR #10 e #11 unite a main su richiesta del proprietario. Conflitti risolti solo nei file di contesto, mantenendo entrambe le serie di decisioni. Il contenuto combinato su main coincide con quello verificato prima dei merge.

Verifiche finali passate: TypeScript, build frontend, 15 test frontend, build Functions, 12 test Functions, sintassi script retention, audit frontend di produzione e audit completo Functions senza vulnerabilità segnalate. Checkout main pulito e sincronizzato dopo la chiusura documentale.

- PR #10: messaggio sul benessere psicologico, nome Respiro mantenuto, link GitHub/MIT; affidabilità risultato, note ed export; UX e accessibilità della compilazione e respirazione. Frontend già pubblicato e percorso anonimo verificato anche online.
- PR #11: Node 22, Firebase Admin 14.5.1 e Functions 7.4.0; migrazione SDK anche nello script retention; log senza identificativi, test dei promemoria e dipendenze corrette. Audit functions passato a zero vulnerabilità.

## Email disattivate
Decisione esplicita: solo promemoria in app. Non abilitare API, distribuire lo scheduler o configurare invii email. La sola funzione nel codice è uno scheduler email, non un job di retention. Service Usage ha restituito DISABLED per Functions, Run e Scheduler; gli inventari 403 SERVICE_DISABLED non certificano l’assenza di risorse storiche. La configurazione Functions resta separata da Hosting e non ci sono workflow GitHub nel repository che la distribuiscano al merge. Stato DISABLED di tutte e tre le API riconfermato dopo i merge. Nessun deploy Functions eseguito.

## Verifiche e limiti
Frontend: 15 test, TypeScript, build e percorso anonimo collaudati. Functions: installazione pulita, build e 12 test sintetici, audit completo senza vulnerabilità. Nessuna email inviata e nessun dato reale letto o cancellato.

Restano fuori da questa chiusura il collaudo autenticato con account reale (login/storico/cancellazione) e la verifica operativa della retention. Non dichiararli verificati. Un’eventuale futura attivazione email richiede nuova indicazione esplicita.

Rapporti: `docs/VERIFICA-2026-11-27.md`, `docs/VERIFICA-FUNCTIONS-2026-11-27.md`.
