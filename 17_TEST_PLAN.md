# Test Plan

## Unit test scoring

Testare:

- domanda diretta;
- domanda invertita;
- media totale;
- media per area;
- risposta mancante;
- valore fuori range;
- risk flag;
- assegnazione fascia.

## Esempi casi

### Caso 1 - Tutte risposte 0

Atteso:

- media totale 0;
- fascia basso;
- risk_flag false.

### Caso 2 - Risposta invertita

Scala 0-4, risposta 1, reverse true.

Atteso:

```text
scored_value = 3
```

### Caso 3 - Risk trigger

Domanda con:

```json
"is_risk_item": true,
"risk_trigger_values": [2, 3, 4]
```

Risposta 3.

Atteso:

```text
risk_flag = true
safety_message_required = true
```

## Test funzionali

- Compilazione anonima completa.
- Compilazione anonima interrotta.
- Compilazione con account.
- Salvataggio senza consenso bloccato.
- Dashboard vuota.
- Dashboard con storico.
- Cancellazione dati.

## Test privacy

- Nessun salvataggio anonimo persistente.
- Revoca consenso impedisce salvataggio futuro.
- Cancellazione elimina assessment.
- Export mostra solo dati dell'utente.
- RLS impedisce accesso ad altri utenti.

## Test sicurezza

- Manipolazione valori risposta.
- Invio questionario incompleto.
- Accesso dashboard senza login.
- Accesso assessment di altro utente.
- XSS in testi configurazione.
- Rate limit su submit.

## Test accessibilità

- Navigazione tastiera.
- Label form.
- Contrasto.
- Screen reader.
- Focus visibile.
- Messaggi errore comprensibili.

## Test mobile

- iPhone small viewport.
- Android common viewport.
- Tablet.
- Desktop.
