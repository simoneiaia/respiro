# Environment e Deployment

## Ambienti

Usare tre ambienti:

- `local`
- `staging`
- `production`

## Variabili ambiente

```env
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
ENCRYPTION_SECRET=
SENTRY_DSN=
NEXT_PUBLIC_ANALYTICS_DOMAIN=
```

## Regole segreti

- Mai committare `.env`.
- Creare `.env.example` senza valori reali.
- Ruotare chiavi se esposte.
- Non usare `service_role` lato client.
- Limitare uso di service role a funzioni server sicure.

## Deploy Vercel

1. Collegare repository.
2. Inserire env variables.
3. Impostare build command.
4. Verificare preview deploy.
5. Proteggere ambiente staging.

## Deploy Cloudflare Pages

1. Collegare repository.
2. Configurare framework Next.js.
3. Inserire env variables.
4. Verificare compatibilità SSR/API routes.
5. Usare Cloudflare DNS e WAF.

## Supabase

Azioni minime:

- creare progetto EU quando possibile;
- attivare RLS;
- creare migrations;
- configurare Auth;
- disattivare provider non usati;
- configurare redirect URL;
- verificare backup;
- limitare accessi team.

## Logging

Non loggare:

- risposte;
- punteggi dettagliati;
- messaggi liberi dell'utente;
- dati salute;
- email in chiaro se non necessario.

## Analytics

Preferire analytics senza cookie o con tracciamento minimale.

Eventi consentiti:

- page_view;
- start_assessment;
- complete_assessment;
- create_account.

Eventi vietati:

- question_answered con valore;
- risk_item_answered;
- result_band con identificativo utente;
- area score con user id.
