# Protocollo Rischio e Sicurezza

## Obiettivo

Gestire in modo responsabile le risposte che indicano possibile rischio autolesivo, suicidario o per altre persone.

## Principio

In presenza di rischio, l'app non deve interpretare, rassicurare o minimizzare. Deve fornire un messaggio chiaro e orientare verso supporto umano o servizi di emergenza.

## Trigger

Ogni domanda può avere:

```json
{
  "is_risk_item": true,
  "risk_trigger_values": [2, 3, 4]
}
```

Se una risposta a un item di rischio è contenuta in `risk_trigger_values`, il sistema imposta:

```text
risk_flag = true
safety_message_required = true
```

## Messaggio immediato

Titolo:

```text
La tua sicurezza è importante
```

Testo:

```text
Dalle risposte emerge un possibile segnale di rischio. Questo strumento non può valutare la tua situazione né sostituire un aiuto professionale.

Se pensi di essere in pericolo immediato o temi di poter fare del male a te stesso o ad altri, chiama subito il 112 o recati al pronto soccorso più vicino.

Se non sei in pericolo immediato, considera di contattare una persona di fiducia, il tuo medico, uno psicologo o uno psicoterapeuta.
```

Azioni:

- `Chiama 112`
- `Interrompi compilazione`
- `Continua compilazione`
- `Cancella le mie risposte`

## Messaggio nel risultato

```text
Nelle risposte sono emersi segnali che meritano attenzione immediata. Se c'è un rischio concreto o imminente, contatta il 112. Questo risultato non è una diagnosi e non sostituisce il supporto di un professionista.
```

## Cosa evitare

Non mostrare:

- “Non preoccuparti.”
- “È normale.”
- “Il tuo rischio è basso.”
- “Il sistema ritiene che tu sia al sicuro.”
- suggerimenti terapeutici personalizzati;
- chatbot empatico che prova a gestire la crisi.

## Audit

Per utenti registrati, salvare solo:

- `risk_flag`;
- timestamp;
- versione questionario;
- risposta, se il salvataggio è stato esplicitamente accettato.

Per utenti anonimi, evitare persistenza.

## Escalation

L'MVP non prevede contatto attivo da parte dell'app, chiamate automatiche o notifiche a terzi. Una funzione di escalation attiva richiederebbe analisi legale, clinica, tecnica e organizzativa separata.
