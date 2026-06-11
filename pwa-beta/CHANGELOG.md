# CHANGELOG — Gestione Competizioni Baskin
## finali.html — Ramo BETA (3.x)

Ramo sperimentale. Derivato dal ramo stabile 2.11.5.
Per il changelog del ramo stabile vedere `/pwa/CHANGELOG.md`.

---

### v3.0b17 — Notifiche in alto, stile MD3
- `#notif-area` spostato in alto (sotto tabbar) invece che in basso
- `.notif-card`: sfondo `--md-surface`, testo `--md-on-surface`, bordo sinistro colorato per tipo, bordo `--md-outline-v` — zero hex hardcoded
- Icona tipo (✓/⚠/✕/ℹ) + pulsante ✕ per chiusura manuale con annullamento auto-dismiss
- Animazione entrata da sopra (`translateY(-8px)`) coerente con la nuova posizione
- `session-banner`: bordo cambiato da `#3b82f6` a `var(--md-primary)`

### v3.0b16 — Fix calendario: intestazioni campo duplicate
- Rimosso il vecchio `<div class="cal-grid">` con le intestazioni palestre flottanti rimasto nel codice dopo la ristrutturazione del b14 — era la causa dei nomi campo duplicati e fuori posto

### v3.0b15 — Spaziatura badge Provvisorio/Definitivo
- `.conf-badge-ok` e `.conf-badge-prov`: padding `10px 14px`, `margin:12px 0`, `display:block`
- Rimosso inline style malformato sul div badge che interferiva con il CSS

### v3.0b14 — Fix calendario, cerchietti, Inverti, spaziatura
- Menu: abbandonato tentativo sticky; ripristinato comportamento precedente
- Calendario: template riscritto senza template literal annidate; introdotte classi CSS dedicate (`cal-campi-row`, `cal-campo-col`, `cal-campo-hdr`, `cal-cell`, `cal-empty-slot`) — layout 2 colonne identico alle Designazioni
- Designazioni: `.f-dot` con `margin-right:8px` — cerchietti non più incollati al nome
- Pulsante Inverti: font 14px bold, padding aumentato, bordo più evidente
- Pulsante 🖨 Finali e 🖨 Risultati & Classifica: aggiunto `padding-bottom:24px` — non più appiccicati al bordo

### v3.0b13 — Fix sticky header su PC
- Aggiunto `overflow-y:scroll` su `html` per renderlo lo scroll container esplicito di Chrome/Desktop
- `body` passa da `min-height:100vh` a `min-height:100%` per coerenza col nuovo scroll container
- Header e tabbar restano `position:sticky` (nessuna modifica al layout)

### v3.0b12 — Fix menu scomparso: ripristino sticky
- Ripristinato `position:sticky` per header e tabbar (il `fixed` del b9 li faceva sparire)
- `--header-h` calcolato dinamicamente via JS per il corretto offset del tabbar
- Il menu ora scorre con la pagina fino in cima, poi rimane fisso mentre si scorre verso il basso

### v3.0b11 — Fix pulsante stampa Finali
- Pulsante 🖨 Finali: visibile non appena i gironi sono impostati, non più condizionato all'assegnazione delle squadre

### v3.0b10 — Fix riquadri vincoli e violazioni (integra 3.0b9.1)
- Aggiunte classi CSS mancanti: `.vincolo-banner`, `.deroga-item`, `.violazione-item`, `.v-titolo`, `.v-desc`, `.arb-row.violazione`, `.conf-badge-ok`, `.conf-badge-prov`
- Rimossi tutti gli sfondi hex neri/scuri hardcoded nei riquadri Deroghe, Vincoli e badge Definitivo/Provvisorio — sostituiti con token MD3 (`var(--md-amber-c)`, `var(--md-error-c)`, `var(--md-green-c)`)

### v3.0b9 — *(integrato in 3.0b10)*

### v3.0b9-storico — Menu fisso, notifiche MD3, colori token
- Header e tabbar: `position:fixed` con misurazione dinamica dell'altezza via JS (`--header-h`, `--main-top`) → funziona a qualsiasi risoluzione senza offset hardcoded
- Notifiche: nuovo `#notif-area` in fondo allo schermo con `mostraNotifica(msg, tipo)` — feedback sync/JSON mostrati come balloon con auto-dismiss (niente più overlay inline nei tab)
- Tipi notifica: `.ok` (bordo verde), `.warn` (bordo ambra), `.error` (bordo rosso), default (bordo blu)
- Sostituiti tutti i colori hex hardcoded in JS/HTML con token MD3 (`var(--md-error)`, `var(--md-amber)`, `var(--md-green)`, `var(--md-primary)`, ecc.) — compatibili con tema chiaro e scuro

### v3.0b8 — Fix Calendario, Designazioni cerchietti, Finali MD3, alert finali
- Calendario: layout inline `display:grid 1fr 1fr` per garantire il rendering a 2 colonne con intestazione campo
- `btn-swap` (pulsante Inverti): aggiunto `color:var(--md-on-surface)` e font Noto Sans — era illeggibile su tema chiaro
- Designazioni: cerchietti gruppo `.f-dot.g1/g2/g3` definiti in CSS (circle 28px, colori ambra/blu/viola); rimosso inline style con GRUPPO_COLOR
- Finali: `finaleHtml`, `slotHtml`, `colonnaHtml` riscritti con token MD3 — rimossi tutti i colori hex hardcoded (`#f59e0b`, `#3b82f6`, `#22c55e`, `#071428`)
- Finali: `finaliDrop` mostra alert e blocca il drop se la squadra è già assegnata all'altra finale

### v3.0b7 — Layout Gironi e Calendario, tab Date, pulsanti stampa, tema persistente
- Gironi: aggiunto CSS completo (`.dnd-col`, `.dnd-area` 3 colonne, bordo colorato A=blu/B=verde/Pool=grigio, `.errore`, `.grid-auto`)
- Calendario: layout ristrutturato con blocchi per turno (`cal-turno-block`) contenenti griglia a 2 campi con intestazione campo; niente più celle sparse
- Tab 📅 Date spostato tra 📊 Risultati e Arbitri
- Pulsanti stampa: forma pillola uniforme, colori distinti — Ven.Pom/Sab.Matt/Sab.Pom=ambra, 🖨 Gironi=blu primario, 🪪 Badge=viola, 🖨 Finali=verde, 🖨 Risultati=blu
- Tema: script inline in `<head>` applica il tema salvato PRIMA del render → zero flash bianco/scuro all'apertura

### v3.0b6 — Fix tabbar, riquadri Calendario, orario partite assegnate
- Tabbar: ⌂ Menu, ↺ Reset e 🐛 Debug migrati a classe `tab-btn` (font Noto Sans, dimensioni uniformi con gli altri tab)
- Calendario: ricreate tutte le classi CSS perse nel redesign MD3 (`cal-cell`, `cal-turno-lbl`, `pbuilder`, `cal-pool`, `p-teams`, `p-girone`, `p-actions`) — riquadri in stile card come le Designazioni, con ombra, bordo e highlight al drag
- Calendario: orario 🕐 visibile su ogni partita anche dopo l'assegnazione allo slot (riga dedicata `p-orario`)

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

