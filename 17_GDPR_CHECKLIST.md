# Checklist GDPR - Respiro (per il titolare)

Documento interno per **Simone Iaia / SIMONEIAIA - Marketing & Comunicazione**.  
Non sostituisce consulenza legale. Verifica con un professionista prima di scalare il servizio.

## Cosa è già implementato nell'app

| Requisito | Stato | Dove |
|-----------|-------|------|
| Informativa privacy art. 13–14 GDPR | ✅ v3.2 | `/privacy` |
| Tabella retention per tipologia di dato | ✅ | `RETENTION_ROWS` in privacy |
| Retention max risultati salvati | ✅ 24 mesi | `LEGAL.assessmentMaxRetentionMonths` |
| Cancellazione account inattivo | ✅ 24 mesi | automatica via `retention:apply`, senza preavviso individuale |
| Titolare del trattamento identificato | ✅ | `src/lib/legal.ts`, footer, privacy |
| Distinzione titolare / responsabili (Firebase) | ✅ | Privacy, sezione fornitori |
| Consenso esplicito dati salute (art. 9) | ✅ | `/consenso` - checkbox separate |
| Consenso separato per storico | ✅ | Consenso + Firestore |
| Età minima 18 anni | ✅ | Consenso + privacy |
| Cancellazione dati di sessione | ✅ | `/account/dati` |
| Cancellazione storico | ✅ | `/account/dati` |
| Eliminazione account completa | ✅ | Firebase Auth + Firestore |
| Esportazione dati (portabilità) | ✅ | JSON da `/account/dati` |
| Richiesta diritti via email | ✅ | Template mailto in gestione dati |
| Reclamo al Garante | ✅ | Privacy |
| Trasferimenti extra-SEE | ✅ | Privacy + link DPA Google |
| Regole Firestore (accesso solo propri dati) | ✅ | `firestore.rules` |
| Nessun analytics sul questionario | ✅ | Policy dichiarata |

## Azioni amministrative consigliate (fuori dal codice)

1. **Registro delle attività di trattamento** (art. 30 GDPR)  
   Tieni un documento interno (anche foglio Excel/Notion) con: finalità, categorie dati, destinatari, retention, misure di sicurezza.

2. **DPA con Google Cloud / Firebase**  
   Accetta il [Data Processing Addendum](https://cloud.google.com/terms/data-processing-addendum) nella console Google Cloud del progetto `respiro-benessere`.

3. **Valutazione DPIA** (art. 35 GDPR)  
   Il trattamento di dati sulla salute a scala può richiedere una DPIA. Consulta un DPO o avvocato privacy se il servizio cresce o viene promosso a largo raggio.

4. **Procedura risposta richieste GDPR**  
   Monitora `info@simoneiaia.com` e rispondi entro **30 giorni**. Conserva copia delle richieste e delle risposte (senza dati sanitari non necessari).

5. **Community / terzi**  
   Se condividi Respiro in community, usa il testo in `DATA_CONTROLLER.scopeNote`: la community **non** è titolare del trattamento. Evita che altri presentino lo strumento come proprio.

6. **Backup Firebase**  
   Verifica in console se sono attivi backup automatici e se la retention è coerente con la policy (24 mesi inattività / 24 mesi risultati).

7. **Job retention operativo (mensile)**  
   Script: `npm run retention:audit` (dry-run) oppure `npm run retention:apply` (assessment >24 mesi + account inattivi).  
   Auth: token `firebase login` oppure service account (`GOOGLE_APPLICATION_CREDENTIALS`).  
   Nessun preavviso email individuale: la privacy v3.2 è il preavviso art. 13.  
   Reminder operativo: email + evento calendario mensile a `simoneiaiaconsulting@gmail.com`.

## Contatti da mantenere aggiornati

Modifica solo in `src/lib/brand.ts` → propagato ovunque:

- `OWNER.name`, `legalName`, `vat`, `address`
- `privacyEmail` (canale diritti GDPR)

## Deploy dopo modifiche legali

```bash
npm run build
npx firebase-tools deploy --only hosting,firestore:rules --project respiro-benessere
```
