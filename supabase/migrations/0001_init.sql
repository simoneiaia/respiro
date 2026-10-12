-- Mental Check Italia — schema MVP.
-- Salva SOLO punteggi aggregati e flag. Nessun testo di risposta viene
-- persistito. RLS garantisce che ogni utente acceda solo ai propri record.

create extension if not exists pgcrypto;

create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  questionnaire_slug text not null,
  questionnaire_version text not null,
  total_raw_score numeric not null,
  total_mean_score numeric not null,
  band text not null,
  risk_flag boolean not null default false,
  -- Array di punteggi per area: [{ area_key, label, raw_score, mean_score, band, count }]
  area_scores jsonb not null default '[]'::jsonb,
  -- Nota personale opzionale (self-report). Nessun testo di risposta.
  notes text
);

create index if not exists assessments_user_created_idx
  on public.assessments (user_id, created_at);

-- Row Level Security
alter table public.assessments enable row level security;

drop policy if exists "assessments_select_own" on public.assessments;
create policy "assessments_select_own"
  on public.assessments for select
  using (auth.uid() = user_id);

drop policy if exists "assessments_insert_own" on public.assessments;
create policy "assessments_insert_own"
  on public.assessments for insert
  with check (auth.uid() = user_id);

drop policy if exists "assessments_update_own" on public.assessments;
create policy "assessments_update_own"
  on public.assessments for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "assessments_delete_own" on public.assessments;
create policy "assessments_delete_own"
  on public.assessments for delete
  using (auth.uid() = user_id);

-- Nota: gli utenti anonimi non hanno accesso a questa tabella.
-- Le compilazioni anonime restano solo lato client (sessionStorage).
