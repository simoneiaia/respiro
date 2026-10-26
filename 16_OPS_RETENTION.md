# 16 · Ops retention Respiro

Promemoria operativo per il titolare.

## Cosa fare ogni mese

1. Apri la cartella locale del progetto.
2. Esegui dry-run:
   ```bash
   npm run retention:audit
   ```
3. Controlla il report in `scripts/reports/retention-*.json`
4. Se ci sono scaduti / inattivi, applica:
   ```bash
   npm run retention:apply
   ```

Niente email di preavviso individuale: la privacy (v3.2) è già l’informazione art. 13.

## Policy (privacy v3.2)

| Dato | Retention | Azione |
|------|-----------|--------|
| Risultati salvati | max 24 mesi dalla creazione | delete automatico con `--apply` |
| Account inattivo | 24 mesi senza accesso | delete automatico doc utente + risultati (Auth se service account) |

## Auth script

- Preferito: service account in `GOOGLE_APPLICATION_CREDENTIALS` (cancella anche Auth)
- Fallback: token da `firebase login` (Firestore ok; Auth eventualmente residuo in Console)

## App

- URL: https://respiro-benessere.web.app
- Progetto Firebase: `respiro-benessere`
