-- Vincoli di sicurezza aggiuntivi per le note personali.

alter table public.assessments
  drop constraint if exists assessments_notes_length;

alter table public.assessments
  add constraint assessments_notes_length
  check (notes is null or char_length(notes) <= 2000);
