# Stato

Ultimo aggiornamento: 2026-11-27

## Dove siamo
Respiro è un self-check orientativo per maggiorenni, non una scala clinica validata. Frontend Next.js 16 / React 19 con export statico su Firebase Hosting; autenticazione Google con Firebase Auth e storico facoltativo su Firestore. I moduli Supabase e alcuni documenti iniziali descrivono un percorso precedente.

Correzioni sul ramo `fix/respiro-reliability-and-positioning`:
- errore di salvataggio conservato nel risultato con recupero manuale nello stesso account;
- note sincronizzate con report, eliminabili e aggiornate solo dopo conferma del salvataggio;
- gestione errore appunti, TXT e stampa del report aggiornato;
- avviso sui segnali di rischio durante la compilazione e ritorno diretto alla revisione;
- istruzioni accessibili della pausa guidata e gestione dei cicli senza aggiornamenti di stato annidati;
- chiarimenti su perdita progressi, contrasto della homepage e avviso cookie senza sovrapposizioni;
- messaggio iniziale sul benessere psicologico, nome Respiro mantenuto, link GitHub/MIT espliciti.

## Verifiche
TypeScript, 15 test e build completati. Percorso anonimo mobile collaudato con risposte sintetiche, compresi export TXT/PDF, note, revisione, segnale di rischio e cancellazione. Errori di salvataggio e note verificati con componenti reali e backend fittizio. Nessun dato di test inviato a Firestore.

## Prossimi passi
- Controllo desktop completato. Registrare l’esito del deploy Hosting nel rapporto di verifica.
- Login Google, storico e cancellazione di un account reale richiedono un collaudo autenticato dedicato. Non sono stati usati account o dati reali in questa sessione.
- Verificare operativamente la retention prima di dichiararla collaudata.
