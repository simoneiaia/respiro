# Scope e Posizionamento

## Cosa fa l'app

L'app consente all'utente di:

- compilare un questionario di autovalutazione;
- ricevere un punteggio orientativo;
- leggere una spiegazione prudenziale del risultato;
- vedere eventuali aree di attenzione;
- salvare lo storico solo su scelta esplicita;
- ricevere un messaggio di sicurezza se emergono segnali di rischio.

## Cosa non fa l'app

L'app non deve:

- formulare diagnosi;
- identificare patologie;
- sostituire un professionista;
- proporre terapia;
- suggerire farmaci;
- dichiarare che un punteggio equivale a uno stato clinico;
- usare IA per interpretare casi complessi;
- usare contenuti CORE-OM o strumenti protetti senza autorizzazione.

## Linguaggio consentito

Usare formule come:

- “Il risultato suggerisce un livello di disagio percepito...”
- “Potrebbe essere utile confrontarti con un professionista...”
- “Questo strumento offre un'indicazione orientativa...”
- “Il punteggio non rappresenta una diagnosi.”

## Linguaggio vietato

Evitare formule come:

- “Hai un disturbo...”
- “Sei depresso...”
- “Questo test diagnostica...”
- “Il tuo stato mentale è...”
- “Il trattamento consigliato è...”

## Perimetro MVP

L'MVP deve essere una **web app**, non un'app nativa.  
La registrazione utente deve essere opzionale.  
La compilazione anonima deve essere possibile.  
Il salvataggio dello storico deve richiedere consenso separato.

## Ruoli utente

### Utente anonimo

Può compilare il questionario e vedere il risultato, ma i dati non vengono salvati oltre la sessione tecnica necessaria.

### Utente registrato

Può salvare risultati e visualizzare lo storico, previo consenso.

### Admin

In fase MVP può non esistere. I questionari possono essere gestiti da file di configurazione versionato.
