# Cloud Functions di Respiro

## Stato verificato il 27 novembre 2026

La verifica autenticata di Service Usage restituisce `DISABLED` per Cloud Functions, Cloud Run e Cloud Scheduler nel progetto `respiro-benessere`. Le richieste di inventario Functions v1/v2, Run e Scheduler falliscono con `403 SERVICE_DISABLED`. Questo non è un inventario vuoto: non certifica l’assenza di vecchie risorse conservate da Google Cloud.

Nel codice è presente una sola esportazione: `sendSixMonthReminders`. È uno scheduler email giornaliero alle 09:00 Europe/Rome. Non è il promemoria in app del frontend e non è un job di retention.

La configurazione Hosting principale non include il pacchetto Functions. Nessun servizio è stato abilitato, nessuna funzione pubblicata e nessuna email inviata durante l’aggiornamento di sicurezza.

## Dipendenze e compatibilità

- Runtime: Node 22.
- Firebase Admin SDK 14 e Functions SDK 7; import modulari del nuovo Admin SDK.
- Resend resta sulla serie 4: non è stato necessario un aggiornamento maggiore per risolvere l’audit.
- Lo script `scripts/retention-audit.mjs` è stato adattato allo stesso SDK; non è stato eseguito contro i dati reali.

## Verifica locale

```sh
node --version # usare Node 22
npm ci --prefix functions
npm test --prefix functions
npm audit --prefix functions
node --check scripts/retention-audit.mjs
```

I test usano solo dati sintetici e adapter fittizi. Verificano manifest Firebase, compatibilità Firestore/Auth, consenso email separato, assenza di invio con il solo promemoria in app, sei mesi di calendario, fine mese e anno bisestile, dati malformati, cooldown di 14 giorni, errori e chiavi idempotenti. Nessun accesso a Firestore o Resend.

## Comportamento della funzione

- Legge solo gli utenti con `reminder_email_enabled == true`; non converte il consenso del promemoria in app in consenso email.
- Richiede un indirizzo email e un assessment con data valida.
- Non invia prima dei sei mesi, né entro 14 giorni dal precedente invio registrato.
- Le scadenze nei giorni 29–31 vengono limitate all’ultimo giorno del mese di destinazione.
- Aggiorna l’ultimo invio solo dopo la conferma del provider; errori di singoli utenti non bloccano il batch.
- I log contengono solo conteggi, senza UID, indirizzi o messaggi del provider.
- La chiave idempotente resta stabile per utente e scadenza. Non è una garanzia di invio esattamente una volta oltre la finestra di deduplicazione del provider; invio riuscito e aggiornamento Firestore non sono una transazione unica.

## Decisione attuale: solo promemoria in app

Il 27 novembre 2026 il proprietario ha confermato di mantenere solo i promemoria in app, senza attivare le email. Non abilitare servizi cloud né eseguire il deploy dello scheduler email. Il pacchetto corretto rimane nel repository come codice non attivato.

## Eventuale attivazione futura

Non eseguire il deploy come semplice conseguenza dell’audit. Prima servono una scelta esplicita sui promemoria email, verifica del consenso effettivo e dei testi pubblici, configurazione del mittente/Resend e dei segreti, regione, piano e costi. Queste verifiche non sono state sostituite dai test locali.

È predisposto `firebase.functions.json`, separato da Hosting e con codebase `respiro-reminders`. Il comando `npm run deploy --prefix functions` riguarda solo `sendSixMonthReminders` in quella codebase, ed esegue i test prima del deploy. La regione resta quella predefinita del codice originario finché non viene deliberata la configurazione di attivazione.

Segreti previsti dal codice: `RESEND_API_KEY`, `REMINDER_FROM_EMAIL`. Non inserire valori nel repository. Non sono stati letti durante la verifica.

Fonti tecniche: [runtime Firebase](https://firebase.google.com/docs/functions/manage-functions), [migrazione Admin SDK 14](https://firebase.google.com/support/release-notes/admin/node).
