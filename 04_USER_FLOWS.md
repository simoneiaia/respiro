# User Flows

## Flow A - Compilazione anonima

1. L'utente apre la landing page.
2. Legge descrizione e disclaimer.
3. Clicca “Inizia self-check”.
4. Visualizza consenso e informativa breve.
5. Sceglie “Compila senza account”.
6. Accetta il consenso essenziale.
7. Compila il questionario.
8. Riceve risultato orientativo.
9. Può scaricare o copiare il risultato.
10. Chiude la sessione.
11. I dati non vengono salvati in modo persistente.

## Flow B - Compilazione con account

1. L'utente apre la landing page.
2. Clicca “Crea account”.
3. Inserisce email e password oppure usa magic link.
4. Accetta privacy e consenso.
5. Attiva consenso separato per salvataggio storico.
6. Compila il questionario.
7. Visualizza risultato.
8. Il risultato viene salvato.
9. Può vedere dashboard e storico.

## Flow C - Rischio durante compilazione

1. L'utente risponde a una domanda contrassegnata come `risk_item`.
2. Il sistema valuta la soglia di attivazione.
3. Se la soglia è superata, appare un messaggio di sicurezza.
4. L'utente può continuare, interrompere o cancellare la sessione.
5. Il messaggio deve rimanere disponibile anche nella pagina risultato.

## Flow D - Cancellazione dati

1. L'utente accede al profilo.
2. Va su “Privacy e dati”.
3. Seleziona “Cancella tutti i miei dati”.
4. Conferma.
5. Il sistema elimina risultati, risposte e consensi associati.
6. Il sistema mostra conferma.

## Flow E - Nuova compilazione periodica

1. L'utente registrato accede alla dashboard.
2. Clicca “Nuovo self-check”.
3. Compila il questionario.
4. Visualizza confronto con compilazioni precedenti.
5. Riceve spiegazione prudenziale dell'andamento.

## Stati chiave

- `not_started`
- `consent_pending`
- `in_progress`
- `risk_alert_triggered`
- `completed`
- `saved`
- `deleted`
