# Data Model Supabase

## Tabelle principali

## `profiles`

Profilo utente.

| Campo | Tipo | Note |
|---|---|---|
| id | uuid | FK auth.users.id |
| email | text | opzionale in vista applicativa |
| created_at | timestamptz | default now |
| deleted_at | timestamptz | null se attivo |

## `consents`

Registro consensi.

| Campo | Tipo | Note |
|---|---|---|
| id | uuid | primary key |
| user_id | uuid | nullable per anonimo se serve sessione |
| consent_type | text | privacy, health_data, save_history, terms |
| version | text | versione testo |
| accepted | boolean | true/false |
| accepted_at | timestamptz | timestamp |
| ip_hash | text | opzionale, evitare IP in chiaro |
| user_agent_hash | text | opzionale |

## `questionnaire_versions`

Versioni questionario.

| Campo | Tipo | Note |
|---|---|---|
| id | uuid | primary key |
| slug | text | es. wellbeing-check-v1 |
| title | text | titolo |
| version | text | es. 1.0.0 |
| status | text | draft, active, archived |
| config | jsonb | schema domande e scoring |
| created_at | timestamptz | timestamp |

## `assessments`

Compilazioni.

| Campo | Tipo | Note |
|---|---|---|
| id | uuid | primary key |
| user_id | uuid | nullable se anonimo; per MVP anonimo non persistente |
| questionnaire_version_id | uuid | FK |
| total_score | numeric | punteggio totale |
| total_mean | numeric | media totale |
| band | text | low, moderate, high, very_high |
| risk_flag | boolean | true/false |
| completed_at | timestamptz | timestamp |
| deleted_at | timestamptz | soft delete opzionale |

## `assessment_area_scores`

Punteggi per area.

| Campo | Tipo | Note |
|---|---|---|
| id | uuid | primary key |
| assessment_id | uuid | FK |
| area_key | text | es. wellbeing |
| raw_score | numeric | somma |
| mean_score | numeric | media |
| band | text | fascia |

## `assessment_answers`

Risposte singole.

| Campo | Tipo | Note |
|---|---|---|
| id | uuid | primary key |
| assessment_id | uuid | FK |
| question_id | text | id configurazione |
| answer_value | integer | valore risposta |
| scored_value | integer | valore dopo inversione |
| area_key | text | area |
| is_risk_item | boolean | flag |

## Row Level Security

Attivare RLS su tutte le tabelle con dati utente.

Policy base:

- l'utente può leggere solo i propri record;
- l'utente può cancellare solo i propri record;
- l'utente può inserire assessment solo con il proprio `user_id`;
- gli utenti anonimi non hanno accesso a dati persistenti;
- gli admin hanno accesso solo se ruolo esplicito e auditato.

## Retention

Proposta MVP:

- compilazioni anonime: non persistenti;
- account inattivi: cancellazione o anonimizzazione dopo periodo definito;
- log tecnici: retention breve;
- consensi: conservazione per accountability finché necessario.

## Nota sicurezza

Le risposte possono rivelare dati relativi alla salute mentale. Evitare ogni forma di logging non necessario.
