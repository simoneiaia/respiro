# Tech Stack e Architettura

## Stack consigliato

- Framework: Next.js con TypeScript.
- Styling: Tailwind CSS.
- UI components: shadcn/ui o componenti custom accessibili.
- Database: Supabase Postgres.
- Auth: Supabase Auth.
- Storage: evitare storage file in MVP, salvo export PDF.
- Charts: Recharts.
- Hosting frontend: Cloudflare Pages o Vercel.
- Backend logic: API routes Next.js o Supabase Edge Functions.
- Analytics: Plausible, Matomo o soluzione privacy-friendly.
- Error monitoring: Sentry, con attenzione a non inviare dati salute nei log.

## Architettura logica

```text
Browser
  ↓
Next.js App
  ↓
Consent Layer
  ↓
Questionnaire Engine
  ↓
Scoring Service
  ↓
Result Page
  ↓
Optional Supabase Persistence
```

## Moduli applicativi

### `/app`

Routing pagine:

- `/`
- `/consenso`
- `/questionario`
- `/risultato`
- `/dashboard`
- `/privacy`
- `/termini`
- `/account/dati`

### `/lib/questionnaire`

- caricamento configurazione;
- validazione risposte;
- calcolo inversione punteggi;
- aggregazione aree;
- risk flag.

### `/lib/scoring`

- funzioni pure di calcolo;
- test unitari;
- nessuna dipendenza dalla UI.

### `/lib/privacy`

- gestione consensi;
- verifiche prima del salvataggio;
- retention.

### `/components`

- question card;
- progress bar;
- consent box;
- result band;
- safety alert;
- charts.

## Principi architetturali

- Separare testo delle domande da logica di scoring.
- Separare scoring da UI.
- Versionare ogni questionario.
- Salvare sempre la versione del questionario usata per ogni compilazione.
- Non salvare risposte anonime in modo persistente.
- Non loggare risposte in console, analytics o error monitoring.

## Deploy

### Opzione A - Vercel + Supabase

Più semplice per Next.js.

### Opzione B - Cloudflare Pages + Supabase

Buona per performance e controllo DNS. Verificare compatibilità funzioni server-side.

## Variabili ambiente

```env
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
ENCRYPTION_SECRET=
SENTRY_DSN=
```

`SUPABASE_SERVICE_ROLE_KEY` non deve mai essere esposta al browser.
