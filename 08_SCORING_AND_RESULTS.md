# Scoring e Risultati

## Obiettivo

Trasformare le risposte in punteggi leggibili, senza produrre diagnosi o classificazioni cliniche improprie.

## Input

Per ogni domanda:

- `answer_value`;
- `reverse_scored`;
- `area`;
- `is_risk_item`;
- `risk_trigger_values`.

## Output

- `total_raw_score`;
- `total_mean_score`;
- `area_scores`;
- `band`;
- `risk_flag`;
- `safety_message_required`.

## Formula punteggio domanda

```text
if reverse_scored:
  scored_value = max_scale_value - answer_value
else:
  scored_value = answer_value
```

## Formula totale

```text
total_raw_score = sum(scored_value)
total_mean_score = average(scored_value)
```

## Formula per area

```text
area_raw_score = sum(scored_value for area)
area_mean_score = average(scored_value for area)
```

## Fasce orientative MVP

Queste soglie sono placeholder di prodotto, non soglie cliniche validate.

| Media | Fascia | Copy |
|---|---|---|
| 0.00 - 0.99 | basso | Segnali contenuti |
| 1.00 - 1.99 | moderato | Alcuni segnali da osservare |
| 2.00 - 2.99 | elevato | Disagio percepito significativo |
| 3.00 - 4.00 | molto elevato | Disagio percepito intenso |

## Copy risultato: basso

Il risultato suggerisce un livello contenuto di disagio percepito nelle risposte fornite. Questo non significa che eventuali difficoltà vadano ignorate. Può essere utile continuare a osservare il proprio benessere nel tempo.

## Copy risultato: moderato

Il risultato suggerisce la presenza di alcuni segnali di disagio percepito. Potrebbe essere utile parlarne con una persona di fiducia o con un professionista, soprattutto se questi segnali persistono.

## Copy risultato: elevato

Il risultato suggerisce un livello significativo di disagio percepito. Questo strumento non formula diagnosi, ma può essere opportuno confrontarsi con uno psicologo, psicoterapeuta o medico.

## Copy risultato: molto elevato

Il risultato suggerisce un livello intenso di disagio percepito. Questo strumento non sostituisce una valutazione professionale. Considera la possibilità di chiedere supporto quanto prima a un professionista o a una persona di fiducia.

## Rischio

Se `risk_flag = true`, mostrare sempre il messaggio di sicurezza, indipendentemente dal punteggio totale.

## Visualizzazione grafica

Dashboard:

- grafico linea per punteggio totale nel tempo;
- grafico barre per aree nell'ultima compilazione;
- evidenza variazione rispetto alla compilazione precedente.

## Avvertenza grafici

I grafici mostrano andamento dei punteggi, non andamento clinico certificato.
