# App Self-Check Psicologico - Cartella progetto

Questa cartella contiene i file `.md` da usare come base operativa per sviluppare una web app italiana di autovalutazione orientativa del benessere psicologico.

## Posizionamento corretto

L'app deve essere progettata come **strumento di self-check orientativo**, non come strumento diagnostico, terapeutico o sostitutivo di psicologi, psicoterapeuti, medici o servizi di emergenza.

## Nota importante sulle scale cliniche protette

Il progetto non include il testo né traduzioni di scale cliniche protette da copyright.  
Il motore questionario è configurabile e può ospitare un questionario proprietario o contenuti per i quali siano disponibili i diritti di utilizzo.

Una traduzione autonoma di domande originali protette può costituire opera derivata. Per questo motivo, nel repository non devono essere inseriti item di scale protette, traduzioni non autorizzate o contenuti clinici protetti, salvo verifica dei diritti.

## Struttura dei file

- `01_PRODUCT_BRIEF.md`: visione prodotto, obiettivi, target.
- `02_SCOPE_AND_POSITIONING.md`: cosa l'app fa e cosa non fa.
- `03_FUNCTIONAL_REQUIREMENTS.md`: requisiti funzionali.
- `04_USER_FLOWS.md`: flussi utente.
- `05_TECH_STACK_ARCHITECTURE.md`: architettura consigliata.
- `06_DATA_MODEL_SUPABASE.md`: modello dati.
- `07_QUESTIONNAIRE_ENGINE.md`: motore questionario.
- `08_SCORING_AND_RESULTS.md`: calcolo punteggi e risultati.
- `09_RISK_AND_SAFETY_PROTOCOL.md`: gestione rischio e messaggi di sicurezza.
- `10_PRIVACY_GDPR_DPIA_NOTES.md`: privacy, GDPR, DPIA.
- `11_LEGAL_IP_AND_CONTENT_POLICY.md`: proprietà intellettuale e limiti d'uso.
- `12_UX_UI_COPY_IT.md`: copy UX in italiano.
- `13_MASTER_PROMPT_CODEX.md`: prompt principale per Codex.
- `14_DEVELOPMENT_BACKLOG.md`: backlog MVP.
- `15_ENV_AND_DEPLOYMENT.md`: ambiente e deploy.
- `16_SECURITY_CHECKLIST.md`: checklist sicurezza.
- `17_TEST_PLAN.md`: piano test.
- `18_TERMS_PRIVACY_PLACEHOLDERS.md`: bozze informative e termini.
- `19_AI_USAGE_POLICY.md`: regole sull'uso eventuale di IA.
- `20_QUESTIONNAIRE_CONFIG_TEMPLATE.md`: template per configurare domande senza includere contenuti protetti.

## Stack consigliato

- Frontend: Next.js + TypeScript.
- UI: Tailwind CSS.
- Backend e database: Supabase.
- Grafici: Recharts.
- Hosting: Cloudflare Pages o Vercel.
- Analytics: Plausible, Matomo o soluzione privacy-friendly.
