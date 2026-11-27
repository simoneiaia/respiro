# Verifica Cloud Functions Respiro

Data: 27 novembre 2026. Progetto: `respiro-benessere`.
Ramo: `fix/cloud-functions-security`, basato su main e separato dalla PR frontend #10.

## Inventario e infrastruttura

| Lettura autenticata | Risultato |
| --- | --- |
| Firebase `functions:list`, API Functions v1 | 403 SERVICE_DISABLED |
| API Functions v2, tutte le regioni | 403 SERVICE_DISABLED |
| Cloud Run, tutte le regioni | 403 SERVICE_DISABLED |
| Cloud Scheduler | 403 SERVICE_DISABLED |
| Service Usage: cloudfunctions.googleapis.com | 200, stato DISABLED |
| Service Usage: run.googleapis.com | 200, stato DISABLED |
| Service Usage: cloudscheduler.googleapis.com | 200, stato DISABLED |
| Tentativo alternativo Cloud Asset Inventory | errore 500, non conclusivo |

Le risorse effettivamente distribuite non sono enumerabili con le API nello stato attuale. Non è corretto tradurre gli errori in un elenco vuoto o certificare l’assenza di risorse storiche. Non sono stati abilitati servizi per aggirare questo limite.

Nel codice è esportata solo `sendSixMonthReminders`, scheduler che invia email alle 09:00 Europe/Rome, basato su consenso `reminder_email_enabled`. Il frontend usa invece `reminder_enabled` per i promemoria in app. Il job di retention è uno script operativo separato e non una Cloud Function.

## Modifiche

- Firebase Admin 12 → 14.5.1; Firebase Functions 5 → 7.4.0; runtime Node 20 → 22.
- Lockfile aggiornato anche per le dipendenze transitive vulnerabili. Resend mantiene la serie 4.
- Import modulari `firebase-admin/app`, `firebase-admin/firestore`, `firebase-admin/auth` per compatibilità con Admin 14, anche nello script di retention.
- Log con soli conteggi, senza UID, indirizzi e dettagli degli errori del provider.
- Logica estratta per testare consenso, scadenza, cooldown e comportamento in errore senza connessioni cloud.
- Date non valide saltate; scadenze nei giorni 29–31 limitate al mese corretto; errori isolati per singolo utente.
- Configurazione `firebase.functions.json` separata da Hosting e limitata alla codebase `respiro-reminders`; predeploy con build e test.

## Verifiche

Runtime locale dei controlli: Node 22.23.1.

1. `npm ci --prefix functions --no-audit --no-fund`: passato.
2. `npm test --prefix functions`: build TypeScript e 12 test passati.
3. `npm audit --prefix functions`: zero vulnerabilità, incluse le dipendenze di sviluppo.
4. `node --check scripts/retention-audit.mjs`: passato.
5. `git diff --check`: passato.

I test includono: manifest dello scheduler e import senza lettura di segreti; compatibilità SDK Firestore/Auth; configurazione di deploy; mancato invio senza consenso email; assenza di email o assessment; scadenza a sei mesi e limiti temporali; fine mese e anno bisestile; date malformate; cooldown; errore del provider; continuazione dopo un errore; chiave idempotente stabile.

Nessuna email inviata, nessun test su destinatari reali, nessuna query a documenti utente e nessuna esecuzione del purge di retention. I test sono locali e non certificano un’integrazione con Resend/Firestore distribuita.

PR: https://github.com/simoneiaia/respiro/pull/11, unita a main insieme alla PR #10 su richiesta del proprietario.

## Chiusura integrazione

Merge #10 e #11 completati. Verifiche sul risultato combinato passate: TypeScript e build frontend, 15 test frontend, build e 12 test Functions, controllo sintattico retention e audit (frontend di produzione, Functions completo) a zero vulnerabilità. Il contenuto di main coincide con quello testato. Dopo i merge Service Usage conferma ancora DISABLED per Functions, Run e Scheduler.

## Pubblicazione

Nessun deploy cloud eseguito. Con le tre API disabilitate, distribuire il codice significherebbe attivare un servizio email, non aggiornare una funzione attiva identificata. Il proprietario ha confermato il 27 novembre 2026 di mantenere solo i promemoria in app, senza attivare le email. Non sono previste abilitazioni di API né deploy dello scheduler. Un’eventuale attivazione richiede verifica dedicata di consenso, testi, segreti, mittente, regione, piano e costi; ripetere l’inventario dopo l’abilitazione autorizzata e prima del deploy.

## Fonti

- [Firebase: runtime e gestione funzioni](https://firebase.google.com/docs/functions/manage-functions)
- [Admin SDK: rilascio 14 e rimozione delle API namespace](https://firebase.google.com/support/release-notes/admin/node)
- Registro npm e lockfile aggiornato, API Service Usage e richieste di inventario autenticate del progetto.
