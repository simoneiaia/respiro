# Requisiti Funzionali

## 1. Landing page

La landing page deve contenere:

- descrizione dello strumento;
- indicazione che non si tratta di diagnosi;
- pulsante “Inizia self-check”;
- link a privacy policy;
- link a termini d'uso;
- indicazione emergenza: in caso di pericolo immediato, chiamare il 112.

## 2. Consenso

Prima del questionario l'utente deve vedere:

- finalità del trattamento;
- natura orientativa dello strumento;
- trattamento di dati potenzialmente relativi alla salute;
- scelta tra compilazione anonima e accesso con account;
- consenso esplicito per il trattamento;
- consenso separato per salvataggio storico, se applicabile.

## 3. Questionario

Il questionario deve:

- essere caricato da configurazione;
- supportare domande dirette e invertite;
- supportare aree o dimensioni;
- supportare opzioni di risposta numeriche;
- impedire invio se mancano risposte obbligatorie;
- mostrare progresso di compilazione;
- consentire revisione prima dell'invio.

## 4. Calcolo punteggio

Il sistema deve calcolare:

- punteggio totale;
- media totale;
- punteggio per area;
- media per area;
- eventuali flag di rischio.

Il calcolo deve essere lato server o comunque replicato lato server prima del salvataggio.

## 5. Risultato

La pagina risultato deve mostrare:

- fascia complessiva;
- breve spiegazione;
- aree con punteggio più elevato;
- invito prudenziale al supporto professionale;
- pulsante per scaricare o salvare il risultato, se previsto;
- pulsante per cancellare i dati della sessione.

## 6. Storico

Solo per utenti registrati e consenzienti:

- elenco compilazioni;
- grafico andamento punteggio totale;
- grafico andamento aree;
- cancellazione singolo risultato;
- cancellazione completa account e dati.

## 7. Emergenza e rischio

Se le risposte indicano rischio autolesivo, suicidario o per altri:

- mostrare messaggio immediato e prominente;
- non aspettare la fine del questionario;
- invitare a contattare il 112 in caso di pericolo immediato;
- invitare a contattare una persona di fiducia o un professionista;
- evitare interpretazioni automatizzate rassicuranti.

## 8. Admin futuro

Funzioni future:

- gestione questionari;
- versionamento domande;
- export dati aggregati anonimi;
- gestione soglie;
- gestione testi UX;
- audit log modifiche.
