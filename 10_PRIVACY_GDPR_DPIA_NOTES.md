# Privacy, GDPR e Note DPIA

## Natura dei dati

Le risposte possono rivelare informazioni sul benessere psicologico e sulla salute mentale. Devono essere trattate come dati particolari relativi alla salute o comunque come dati ad alta sensibilità.

## Basi giuridiche ipotizzabili

Per MVP B2C:

- art. 6 GDPR: consenso o esecuzione del servizio richiesto;
- art. 9 GDPR: consenso esplicito per dati relativi alla salute.

La base va validata prima del go-live.

## Consensi separati

Prevedere consensi separati per:

1. uso dello strumento;
2. trattamento di dati potenzialmente relativi alla salute;
3. salvataggio dello storico;
4. eventuale ricezione reminder;
5. eventuale uso di dati aggregati anonimi per statistiche.

## Minimizzazione

MVP consigliato:

- compilazione anonima senza account;
- nessun nome e cognome;
- email solo se account;
- nessun dato di pagamento nella prima versione;
- nessun dato di localizzazione;
- nessun tracciamento marketing invasivo;
- nessun dato sensibile nei log tecnici.

## Conservazione

Proposta:

- sessione anonima: eliminazione alla chiusura o dopo breve timeout;
- account registrato: conservazione fino a cancellazione account o periodo definito;
- log tecnici: retention breve;
- consensi: conservazione per accountability;
- backup: definire finestra massima di cancellazione effettiva.

## Diritti interessati

L'app deve consentire:

- accesso ai dati;
- cancellazione dati;
- revoca consenso;
- esportazione dati;
- rettifica dati account;
- opposizione a comunicazioni non necessarie.

## DPIA

Una DPIA è fortemente raccomandata perché:

- i dati riguardano salute mentale;
- possono emergere informazioni su rischio suicidario o autolesivo;
- vi è potenziale vulnerabilità degli interessati;
- può esserci monitoraggio nel tempo.

## Misure tecniche

- HTTPS obbligatorio.
- RLS Supabase su tutte le tabelle.
- Cifratura a riposo lato provider.
- Cifratura in transito.
- Segreti in environment variables.
- Nessun log di risposte.
- Error monitoring filtrato.
- Backup protetti.
- Accesso admin limitato.
- Audit log per accessi amministrativi futuri.

## Privacy by design

Scelte richieste:

- privacy mode anonimo di default;
- salvataggio storico opt-in;
- cancellazione dati accessibile;
- informative brevi e comprensibili;
- consenso esplicito con checkbox non preselezionata;
- separazione dati identificativi e risposte.
