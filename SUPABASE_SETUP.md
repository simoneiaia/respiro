# Configurazione Supabase per Respiro

## Situazione attuale

L'organizzazione Supabase ha raggiunto il limite di **2 progetti free attivi**.
I progetti esistenti sono entrambi in pausa:

| Progetto | ID | Regione |
|----------|-----|---------|
| Simone 30s | `zcadlvwmbhmhquieiisa` | eu-central-1 |
| ErasmusEasy | `oukoalbabnnkepqlqeqb` | eu-west-1 |

## Passi per abilitare login e dashboard

### 1. Riattiva un progetto

1. Vai su [Supabase Dashboard](https://supabase.com/dashboard)
2. Seleziona **Simone 30s** (consigliato per Respiro)
3. Clicca **Restore project** e attendi che torni attivo (~2 minuti)

### 2. Applica le migration

Nel **SQL Editor** del progetto, esegui in ordine:

1. `supabase/migrations/0001_init.sql`
2. `supabase/migrations/0002_notes_security.sql`

### 3. Configura Auth

In **Authentication → Providers → Email**:
- Abilita Email/Password
- In **URL Configuration**, aggiungi i redirect:
  - `http://localhost:3000/**`
  - `https://mental-check-italia.web.app/**`
  - `https://mental-check-italia.firebaseapp.com/**`

### 4. Copia le chiavi API

In **Project Settings → API**:
- **Project URL**: `https://zcadlvwmbhmhquieiisa.supabase.co`
- **anon public key**: copia la chiave

### 5. Configura l'ambiente locale

```bash
cp .env.example .env.local
```

Compila:

```env
NEXT_PUBLIC_APP_URL=https://mental-check-italia.web.app
NEXT_PUBLIC_SUPABASE_URL=https://zcadlvwmbhmhquieiisa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=la_tua_chiave_anon
```

### 6. Build e deploy con Supabase attivo

```bash
npm run deploy
```

Le variabili `NEXT_PUBLIC_*` vengono incluse nel build statico.
Ricostruisci e ridistribuisci ogni volta che cambiano.

## Sicurezza

- RLS attiva: ogni utente vede solo i propri `assessments`
- Non vengono salvate le singole risposte, solo punteggi aggregati
- Le note hanno un limite di 2000 caratteri (client + database)
- Nessun log delle risposte in produzione
- La chiave `service_role` non va mai nel browser
