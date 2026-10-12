# Decisione: niente CORE-OM, strumento orientativo proprietario

Data: 2026-06-07

## Contesto

Il repo contiene due visioni in conflitto:

1. **Doc 00–20 + richiesta iniziale** → strumento di autovalutazione **orientativo**,
   non diagnostico, con **domande proprietarie** (CORE-OM esplicitamente vietato),
   compilazione **anonima**, deploy **Cloudflare Pages**, messaggio di sicurezza sul rischio.
2. **File `## masterplan.md`, `## implementation.md`, `## design.md`** → "CORE-OM Digital
   Tracker": digitalizzazione dello **strumento clinico CORE-OM** (34 item ufficiali, doppio
   score 0–4 / 0–40, regola missing ≥31/34), **auth obbligatoria**, deploy **Vercel**.

## Conflitto critico

Il CORE-OM è protetto da copyright (CORE System Trust). Riprodurne gli item, il nome o le
soglie senza licenza è un rischio legale. Il doc [11_LEGAL_IP_AND_CONTENT_POLICY.md](11_LEGAL_IP_AND_CONTENT_POLICY.md)
lo vieta in modo esplicito; anche una traduzione/adattamento può essere opera derivata.

## Scelta

**Opzione A — versione sicura + nuovo design.** Si resta sullo strumento orientativo
proprietario. Dei tre file nuovi si adotta solo ciò che NON tocca il contenuto protetto:

- ✅ **Design system** completo (palette, tipografia, spaziatura 8pt, motion, accessibilità).
- ✅ **Doppio punteggio** 0–4 e 0–40 (riscalatura generica × 10, non specifica del CORE-OM).
- ✅ **Storico per sessione** con dettaglio selezionabile.
- ✅ **Export report** (copia / .txt / stampa-PDF) con disclaimer.
- ✅ **Nota personale** post-compilazione.
- ❌ Item CORE-OM, nome "CORE-OM", soglie cliniche CORE-OM.
- ❌ Auth obbligatoria (resta anonimo + account opzionale).
- ❌ Switch a Vercel (resta Cloudflare Pages / export statico).

## Se in futuro si vuole davvero il CORE-OM

Prerequisiti bloccanti, prima di toccare il codice:

1. Identificare il titolare dei diritti (CORE System Trust).
2. Ottenere licenza per **uso digitale** e, se applicabile, **commerciale**.
3. Ottenere/validare la **traduzione italiana** autorizzata dei 34 item.
4. Conservare evidenza documentale della licenza.
5. Fornire il **testo ufficiale** degli item (non va ricostruito a memoria).
6. Non modificare wording, scala e scoring se non autorizzato.

L'engine è già generico (`data/questionnaire.json`): a licenza ottenuta, gli item proprietari
placeholder si sostituiscono senza riscrivere la logica.
