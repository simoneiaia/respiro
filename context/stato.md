# Stato

Ultimo aggiornamento: 2026-11-27

## Dove siamo
Il frontend Respiro è pubblicato su https://respiro-benessere.web.app. Le correzioni frontend del 27 novembre sono sul ramo `fix/respiro-reliability-and-positioning`, PR #10, non unita a main.

Questa sessione lavora sul ramo separato `fix/cloud-functions-security`, basato su `origin/main`, per evitare di includere la PR frontend nell’aggiornamento del backend.

## Cloud Functions
- Nel repository c’è una sola funzione, `sendSixMonthReminders`: scheduler email giornaliero alle 09:00 Europe/Rome. Non è un job di retention né il promemoria in app del sito.
- Service Usage restituisce `DISABLED` per Cloud Functions, Cloud Run e Cloud Scheduler. Gli inventari v1/v2/Run/Scheduler restituiscono 403 SERVICE_DISABLED; non costituiscono la prova di un inventario vuoto. Il tentativo Cloud Asset restituisce errore 500.
- Nessuna API abilitata, nessuna funzione pubblicata, nessuna email inviata e nessun dato reale letto o cancellato.
- Pacchetto aggiornato a Node 22, Firebase Admin 14.5.1 e Functions 7.4.0. Script retention adattato agli import modulari di Admin.
- Log senza identificativi o errori del provider; gestione date/cooldown e isolamento dei fallimenti verificati.
- Installazione pulita, build, 12 test e audit completo passati: zero vulnerabilità segnalate nel pacchetto functions.
- Configurazione futura `firebase.functions.json` separata da Hosting, con test obbligatori prima del deploy.

PR di questo intervento: https://github.com/simoneiaia/respiro/pull/11, aperta come bozza e non unita a main.

## Prossimo passo
È stata chiesta la scelta tra mantenere i soli promemoria in app e preparare anche i promemoria email. In attesa della scelta non si abilita o distribuisce lo scheduler email. Un’eventuale attivazione richiede verifica di consenso, configurazione, regione e costi, seguita da un nuovo inventario prima del deploy.

Dettagli: `functions/README.md` e `docs/VERIFICA-FUNCTIONS-2026-11-27.md`.
