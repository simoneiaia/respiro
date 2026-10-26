# Respiro

Self-check orientativo del benessere psicologico. Privato, non diagnostico, open source.

[![App](https://img.shields.io/badge/app-respiro--benessere.web.app-2563eb)](https://respiro-benessere.web.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-skyblue.svg)](./LICENSE)

- **App live:** https://respiro-benessere.web.app  
- **Repo:** https://github.com/simoneiaia/respiro  

## Cosa fa

Respiro offre un questionario originale (non una scala clinica validata) per riflettere sul benessere nelle ultime due settimane. Restituisce un quadro orientativo per area, azioni suggerite e una pausa di respiro guidata. Con account: storico e promemoria in app.

**Non è una diagnosi** e non sostituisce professionisti o servizi di emergenza.

## Stack

- Next.js 14 (static export)
- Firebase Auth + Firestore + Hosting
- TypeScript, Tailwind CSS

## Avvio locale

```bash
npm install
cp .env.example .env.local   # inserisci le chiavi Firebase pubbliche
npm run dev
```

## Script utili

```bash
npm run build
npm run deploy                 # build + Firebase hosting/firestore
npm run retention:audit        # dry-run retention GDPR
npm run retention:apply        # purge assessment/account scaduti
```

## Auth

- Solo Google Sign-In (Firebase Auth)
- Self-check anonimo sempre disponibile senza account

## Privacy

Informativa in app (`/privacy`). Retention risultati e account inattivi: 24 mesi. Job operativo: `16_OPS_RETENTION.md`.

## Licenza

MIT. Vedi [LICENSE](./LICENSE).
