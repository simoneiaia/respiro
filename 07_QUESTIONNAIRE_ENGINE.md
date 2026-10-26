# Questionnaire Engine

## Obiettivo

Creare un motore questionario generico, configurabile e indipendente dal contenuto delle domande.

Il motore non deve dipendere da strumenti protetti. Deve poter ospitare:

- questionari proprietari;
- questionari autorizzati;
- questionari sperimentali non clinici;
- versioni future validate da professionisti.

## Schema configurazione

Ogni questionario deve avere:

```json
{
  "slug": "wellbeing-check-v1",
  "title": "Self-check benessere",
  "version": "1.0.0",
  "timeframe": "Negli ultimi 7 giorni",
  "scale": {
    "min": 0,
    "max": 4,
    "labels": [
      {"value": 0, "label": "Mai"},
      {"value": 1, "label": "Raramente"},
      {"value": 2, "label": "A volte"},
      {"value": 3, "label": "Spesso"},
      {"value": 4, "label": "Sempre o quasi sempre"}
    ]
  },
  "areas": [
    {"key": "wellbeing", "label": "Benessere"},
    {"key": "symptoms", "label": "Sintomi percepiti"},
    {"key": "functioning", "label": "Funzionamento"},
    {"key": "risk", "label": "Rischio"}
  ],
  "questions": []
}
```

## Schema domanda

```json
{
  "id": "q001",
  "text": "[Inserire domanda proprietaria o autorizzata]",
  "area": "wellbeing",
  "reverse_scored": false,
  "required": true,
  "is_risk_item": false,
  "risk_trigger_values": []
}
```

## Regola inversione

Se `reverse_scored = true`:

```text
scored_value = scale.max - answer_value
```

Se `reverse_scored = false`:

```text
scored_value = answer_value
```

## Validazione

Il motore deve verificare:

- tutte le domande obbligatorie hanno risposta;
- i valori sono nel range previsto;
- ogni domanda ha un'area valida;
- gli id domanda sono univoci;
- la versione questionario è presente;
- non ci sono domande prive di testo.

## Versionamento

Ogni modifica alle domande deve creare una nuova versione.

Non modificare retroattivamente una versione già usata in compilazioni salvate.

## Protezione contenuti

Non inserire nel repository:

- item di scale cliniche protette;
- traduzioni non autorizzate;
- domande derivate da strumenti clinici protetti;
- scoring proprietari non autorizzati.

Usare placeholder fino a quando il contenuto definitivo non è verificato.
