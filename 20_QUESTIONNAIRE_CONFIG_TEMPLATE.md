# Questionnaire Config Template

## Nota

Questo file non contiene domande CORE-OM o traduzioni di strumenti protetti.  
Usare solo domande proprietarie, originali o autorizzate.

## Template JSON

```json
{
  "slug": "wellbeing-check-v1",
  "title": "Self-check benessere",
  "version": "1.0.0",
  "description": "Questionario orientativo non diagnostico.",
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
    {"key": "functioning", "label": "Funzionamento quotidiano"},
    {"key": "risk", "label": "Segnali di rischio"}
  ],
  "questions": [
    {
      "id": "q001",
      "text": "[Inserire domanda originale o autorizzata]",
      "area": "wellbeing",
      "reverse_scored": false,
      "required": true,
      "is_risk_item": false,
      "risk_trigger_values": []
    },
    {
      "id": "q002",
      "text": "[Inserire domanda originale o autorizzata]",
      "area": "symptoms",
      "reverse_scored": false,
      "required": true,
      "is_risk_item": false,
      "risk_trigger_values": []
    },
    {
      "id": "q003",
      "text": "[Inserire domanda originale o autorizzata]",
      "area": "risk",
      "reverse_scored": false,
      "required": true,
      "is_risk_item": true,
      "risk_trigger_values": [2, 3, 4]
    }
  ],
  "bands": [
    {
      "key": "low",
      "min_mean": 0,
      "max_mean": 0.99,
      "label": "Segnali contenuti"
    },
    {
      "key": "moderate",
      "min_mean": 1,
      "max_mean": 1.99,
      "label": "Alcuni segnali da osservare"
    },
    {
      "key": "high",
      "min_mean": 2,
      "max_mean": 2.99,
      "label": "Disagio percepito significativo"
    },
    {
      "key": "very_high",
      "min_mean": 3,
      "max_mean": 4,
      "label": "Disagio percepito intenso"
    }
  ]
}
```

## Checklist prima di inserire domande

- [ ] Le domande sono originali o autorizzate.
- [ ] Non sono traduzioni di strumenti protetti.
- [ ] Non replicano struttura sostanziale di uno strumento validato.
- [ ] Sono state revisionate da professionista.
- [ ] Le soglie non sono presentate come cliniche.
- [ ] Le domande di rischio attivano `risk_flag`.
- [ ] La versione del questionario è aggiornata.
