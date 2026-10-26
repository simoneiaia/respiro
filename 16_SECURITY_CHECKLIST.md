# Security Checklist

## Applicazione

- [ ] HTTPS attivo.
- [ ] Headers sicurezza configurati.
- [ ] CSP definita.
- [ ] Protezione CSRF dove necessaria.
- [ ] Validazione input lato client e server.
- [ ] Rate limit su endpoint sensibili.
- [ ] Nessuna risposta sensibile nei log.
- [ ] Nessuna chiave segreta nel frontend.
- [ ] Error boundary senza dettagli tecnici sensibili.
- [ ] Dipendenze aggiornate.

## Supabase

- [ ] RLS attiva su tutte le tabelle dati utente.
- [ ] Policy testate.
- [ ] Service role mai esposto.
- [ ] Accesso admin limitato.
- [ ] Backup configurati.
- [ ] Storage non usato o protetto.
- [ ] Audit accessi amministrativi pianificato.

## Privacy

- [ ] Consenso esplicito.
- [ ] Consenso salvataggio separato.
- [ ] Informativa breve prima del questionario.
- [ ] Privacy policy completa.
- [ ] Cancellazione dati.
- [ ] Export dati.
- [ ] Revoca consenso.
- [ ] Retention definita.

## Rischio

- [ ] Risk flag testato.
- [ ] Safety alert immediato.
- [ ] Messaggio 112 presente.
- [ ] Nessun chatbot di crisi.
- [ ] Nessuna rassicurazione automatica.
- [ ] Nessuna notifica a terzi senza base e analisi separata.

## Proprietà intellettuale

- [ ] Nessun item di scale cliniche protette.
- [ ] Nessuna traduzione di scale cliniche protette.
- [ ] Nessun nome di scale cliniche protette nel prodotto.
- [ ] Nessuna soglia di scale cliniche protette.
- [ ] Questionario proprietario o autorizzato.
- [ ] Evidenza diritti conservata.
