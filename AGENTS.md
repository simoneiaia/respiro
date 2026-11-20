# AGENTS.md - respiro

<!-- SIMONEIAIA:CONTESTO -->
## Contesto di lavoro SIMONEIAIA

Regole comuni a Claude Code, Codex e qualsiasi altro agente. `CLAUDE.md` rimanda a questo file: si modifica solo qui.

**Progetto:** Respiro: self-check orientativo del benessere psicologico. Open source, non diagnostico. App: https://respiro-benessere.web.app
**Proprietario:** Simone Iaia, SIMONEIAIA Marketing & Comunicazione.
**Stack:** Next.js + React + Firebase + Supabase + Tailwind. Comandi: `npm run dev`, `npm run build`, `npm run lint`, `npm run test`, `npm run deploy`.
**Pubblicazione:** Firebase Hosting. Il ramo `main` va in produzione dove è collegato un deploy automatico: niente esperimenti su `main`.

### Prima di lavorare
1. Leggi `context/stato.md` (dove siamo e prossimi passi).
2. Leggi `context/decisioni.md` prima di cambiare struttura, stack o scelte già prese.
3. Le fonti (link, documenti, referenti) sono in `context/fonti.md`.

### A fine sessione (obbligatorio)
- Aggiorna `context/stato.md`: cosa è stato fatto, cosa resta, prossimo passo. Data in testa.
- Se hai preso una decisione, aggiungila in `context/decisioni.md` con data e motivo.
- Il contesto vive in questi file, non nelle chat: una nuova sessione deve poter ripartire leggendo solo qui.

### Regole
- Italiano. Niente trattino lungo. "IA" e non "AI".
- Mai credenziali, token o password nei file o nei commit: vanno nelle variabili d'ambiente.
- Aggiornamenti di dipendenze maggiori solo con build verificata e su un ramo separato.
- Prima di un push su `main`, la build deve passare in locale.
