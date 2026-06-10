# CHANGELOG — Gestione Competizioni Baskin
## finali.html — Ramo BETA (3.x)

Ramo sperimentale. Derivato dal ramo stabile 2.11.5.
Per il changelog del ramo stabile vedere `/pwa/CHANGELOG.md`.

---

### v3.0b5 — Font offline e orari slot vuoti
- Service worker: cache-first per Google Fonts (CSS + woff2) → Noto Sans funziona offline dopo la prima visita; fallback `system-ui` se mai caricato
- Cache font separata (`-fonts-1`) preservata agli aggiornamenti del SW
- Calendario: gli slot vuoti mostrano l'orario di default (es. "🕐 15:00 · Trascina qui la 1ª partita") prima ancora di inserire le partite
- sw.js → 3.0b5 (cache name aggiornato, forza refresh)

### v3.0b4 — Noto Sans, bottoni uniformi, data+ora nei risultati
- Font cambiato: Atkinson Hyperlegible → **Noto Sans** (FOSS, Google)
- Bottoni: definite classi mancanti `btn-green` e `btn-remove`; tutti i bottoni con dimensioni uniformi (min-height 48px, raggio e padding coerenti)
- Input orari SOLO nel tab 📅 Date — rimosso l'ultimo input residuo dal Calendario (ora solo display 🕐)
- Nuovo helper `trovaDataOraPartita()`: risale a data e orario di ogni partita dai calSlots
- 📅 Data e 🕐 ora visualizzate per ogni partita nel tab Risultati e nella stampa Risultati & Classifica
- Audit completo: orari sincronizzati e visualizzati in tutte le schermate (Calendario, Designazioni, Finali, Risultati) e in tutte le stampe (per turno, completa, finali, badge, risultati)
- Export/import retrocompatibile: JSON e sync di versioni precedenti importabili senza errori (fallback `||null` su orari mancanti)

### v3.0b3 — Tema switcher in Opzioni
- Aggiunto selettore tema (☀️ Chiaro / 🌗 Auto / 🌙 Scuro) nel tab ⚙ Opzioni
- Sincronizzazione pulsanti attivi all'apertura del tab
- Nota: questa voce era mancante in 3.0b2 per errore di tracciamento

### v3.0b2 — Fix font, bottoni Material, porting da 2.11.6.x
- Font Atkinson Hyperlegible applicato a tutti i bottoni inline (rimosso Georgia)
- Tutti i bottoni migrati a classi Material (btn-sm, btn-primary, btn-amber, btn-danger, btn-outline)
- Ported da 2.11.6.x: finaleHtml 🕐, aggiornaOrario dom→finali, rimozione input finali
- `#475569` sostituito con `var(--md-on-surface-v)` in tutti gli stili inline

### v3.0b1 — Redesign Material + Atkinson Hyperlegible
- Fork del ramo stabile 2.11.5 in `/pwa-beta/`
- Redesign completo interfaccia: Material Design 3, tema chiaro/scuro/auto
- Font Atkinson Hyperlegible (FOSS, ottimizzato per leggibilità massima)
- Ottimizzazione mobile-first: smartphone → tablet → PC
- Override tema nelle Opzioni (chiaro / scuro / sistema)
- Tutti i percorsi e cache separati da `/pwa/` (nessuna collisione)

