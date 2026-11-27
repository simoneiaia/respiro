# Decisioni

Formato: data, decisione, motivo.

- 2026-11-20: adottata la struttura AGENTS.md + context/ per condividere il contesto tra Claude Code e Codex.
- 2026-11-27: aggiornamento di sicurezza Functions in un ramo separato dalla PR frontend. Adottati Node 22 e API modulari di Admin 14; configurazione di deploy separata da Hosting. Non attivato lo scheduler email: le API cloud risultano disabilitate e il frontend offre promemoria in app; scelta funzionale richiesta al proprietario.
- 2026-11-27: decisione esplicita del proprietario: mantenere per ora solo i promemoria in app, senza attivare le email. Nessuna abilitazione di API o deploy dello scheduler email; le correzioni di sicurezza restano disponibili nella PR #11.
- 2026-11-27: su indicazione del proprietario, mantenuto il nome Respiro e chiarito subito il benessere psicologico. Resi espliciti GitHub e licenza MIT già esistente.
- 2026-11-27: dati anonimi ancora solo in memoria; nessun salvataggio persistente aggiunto per conservare i progressi. Il report usa lo stato del risultato aggiornato e il salvataggio fallito può essere ritentato soltanto nello stesso account.

- 2026-11-27: il proprietario ha autorizzato il merge delle PR #10 e #11 dopo risoluzione dei conflitti e verifica del risultato combinato. Le email restano disattivate; nessun deploy Functions previsto.
