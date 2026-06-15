# CHANGELOG — Gestione Competizioni Baskin
## finali.html — Ramo BETA (3.x)

Ramo sperimentale. Derivato dal ramo stabile 2.11.5.
Per il changelog del ramo stabile vedere `/pwa/CHANGELOG.md`.

---

### v3.0b35 — Header compatto, menu impilato, tipografia pulsanti, fix Finali
- Header: rimossi `<h1>` e riepilogo squadre/arbitri/turni — solo titolo compatto + versione, padding ridotto (16px→10px)
- Tabbar: tornata a layout impilato (`flex-wrap`), niente scroll orizzontale né frecce; sticky solo sotto l'header (`--header-h`)
- Nuova variabile `--content-h` (header+tabbar) per posizionare `#notif-area`/`#toast` sempre sotto la tabbar
- Sync: "Carica sync-config.json" e "🔄 Aggiorna lista" e "⬇ Pull" → tipografia `.btn-sm` uniforme col resto dell'app
- Palestre: "✕ Rimuovi" → `.btn-sm.btn-danger` (pill), "🗺 Apri" → stondato e Noto Sans
- **Fix critico**: il codice di chiusura di `renderFinali` (evidenziazione conflitti, checkbox Definitivo, pannello vincoli) era finito per errore dentro `renderPalestreForm` durante un edit precedente — spostato al posto giusto
- Completato il wiring mai arrivato a destinazione nei b22/b23: checkbox "✓ Designazioni Definitive" nel tab Finali, `stato.turniConfermati.finali`, `#finali-vincoli-panel`, chiamata a `renderFinaliVincoli()`

### v3.0b34 — Sync: lista file verificata e irrobustita
- Verificato: `syncListFiles` mostra TUTTI i file `.json` della cartella e ordina per `_ts` (data ultimo commit) decrescente — più recente in cima
- Filtro `f.type==='file'` aggiunto: esclude sottocartelle che terminano per coincidenza con `.json`
- Se `syncConfig.path` punta a un file invece che a una cartella, l'API risponde con un oggetto (non array) — ora mostrato come errore esplicito invece di "nessun file trovato"
- Confermato: la lista delle sessioni locali (tab Sessioni) è già ordinata più recente in cima (cursore IndexedDB `prev`) e mostra tutte le sessioni salvate

### v3.0b33 — Launcher MD3, sync feedback unificato
- **Launcher (index.html)** completamente riscritto con stile MD3/Noto Sans/tema chiaro-scuro-auto, identico a finali.html: token CSS, font, toggle tema persistente, toast aggiornamento ristilizzato
- **Sync feedback**: `syncFeedback()` ora instrada su `mostraNotifica()` — rimosso il vecchio div statico `#sync-feedback` (era spesso fuori vista)
- **Audit pulsanti stampa**: confermato — Finali/Risultati/Designazioni sempre visibili quando la rispettiva sezione è attiva (`stato.gironi` truthy)
- **Audit banner**: import/export/sync di `bannerImage` confermato corretto in `costruisciExport`, `importaStato`, `importaJSON`
- **Audit Sync**: push (con gestione SHA per update) e pull (con `importaStato`) confermati corretti

### v3.0b32 — Fix guard retrocompatibilità posizionato male
- Il guard `data.risultati||{}` era finito dentro `costruisciExport` (stessa firma `sezioni`) invece di `importaStato` — causava "data is not defined" al salvataggio sessione
- Spostato correttamente all'inizio di `importaStato`

### v3.0b31 — Fix funzioni risultati mancanti
- Reinserite 4 funzioni perse: `aggiornaRisultato`, `aggiornaRisultatoFinale`, `applicaFinaliste`, `setForfait`
- Stili adattati ai token MD3

### v3.0b30 — Fix renderRisultati mancante + retrocompatibilità JSON
- Reinserita `renderRisultati()` (persa in un passaggio precedente): stili MD3, trovaDataOraPartita per data+ora su ogni partita
- Retrocompatibilità JSON: `data.risultati` e `data.risultatiFinali` inizializzati a `{}` se assenti (evita crash con sessioni vecchie)

### v3.0b29 — Classifica: spareggio 3-way corretto
- Riscritta `calcolaClassifica` con algoritmo a gruppi (non più pairwise sort)
- Tiebreaker 3-way: 1) record scontri diretti tra le 3 squadre, 2) quoziente canestri SOLO tra di loro, 3) quoziente canestri totale
- Niente più dipendenza dall'ordine dei confronti in JavaScript (sort non transitivo con 3-way ciclo)
- La nota di spareggio ora indica quale criterio ha separato le squadre (SD / Q.dir. / Q.gen.)

### v3.0b28 — Tabbar: frecce di navigazione su PC
- Aggiunte frecce ‹ › ai lati della tabbar su schermi ≥600px
- Opacità ridotta sulla freccia in direzione già al limite
- Scroll con rotellina del mouse sopra la tabbar (asse verticale → orizzontale)
- `tabbar-wrap` contenitore sticky che include frecce + `#tabbar`
- `aggiornaOffsetHeader` misura l'altezza combinata header+tabbar-wrap

### v3.0b27 — Sync: caricamento progressivo e diagnostica
- Lista file: mostrata subito senza timestamps (caricamento progressivo)
- Timestamps recuperati in sequenza invece di Promise.all — evita rate limit GitHub con molti file
- Conteggio totale file visibile ("N file trovati")
- Errore caricamento lista → `violazione-item` + `mostraNotifica` (rimosso colore hardcoded `#ef4444`)
- Pulsante Pull stilizzato con classe `btn-stamp-gironi`

### v3.0b26 — Gironi sola andata: fix duplicati
- `pairKey()`: chiave normalizzata (ordinamento alfabetico) per identificare la coppia indipendentemente da chi è casa/ospite
- `getPartiteGirone()`: deduplicazione per `pairKey` — ogni coppia di squadre appare una sola volta (sola andata)
- `getRisultato()`: cerca il risultato sia con chiave A|B che B|A e inverte i punteggi se necessario (retrocompatibilità con sessioni precedenti)
- `deduplicaCalSlots()`: rimuove partite duplicate dai calSlots dopo import JSON e Sync
- Solo la prima partita di ogni coppia viene tenuta

### v3.0b25 — Sistema notifiche unificato
- `.notif-card` ridisegnato come `.violazione-item`: background colorato pieno per gravità (error=rosso, warn=ambra, ok=verde, info=blu), titolo bold + descrizione
- `#toast` spostato in alto (sotto tabbar) — niente più elementi in basso
- `mostraNotifica(msg, tipo, durata, titolo)`: nuovo parametro `titolo` per badge header
- Tutti i residui `alert()` rimpiazzati con `mostraNotifica()` tipizzata
- Sync: push completato, errori, caricamento → tutti in alto come notifica

### v3.0b24 — Fix definitivo logica finali
- Rimosso il blocco `mostraNotifica+return` che impediva l'inserimento della squadra (le versioni precedenti non avevano sostituito il testo corretto)
- `finaliDrop`: nessun check bloccante — l'inserimento avviene sempre; i conflitti sono mostrati da `renderFinaliVincoli()` come `.violazione-item`

### v3.0b23 — Conflitti finali come violazione-item + btn-swap uniforme
- Finali: conflitto squadra doppia visualizzato come `.violazione-item` rosso inline (come vincoli designazioni) — non più balloon
- `renderFinaliVincoli()`: controlla duplicati f34/f12 e mostra `#finali-vincoli-panel` sopra la composizione
- Designazioni: rimosso inline `font-size:9px;padding:2px 6px` dal btn-swap — usa ora il CSS `.btn-swap` (15px bold) identico alle Finali

### v3.0b22 — Finali: fix popup, checkbox definitivo, stampa con campo
- Rimosso `return` dal conflict check in `finaliDrop` — mostra balloon senza bloccare
- Aggiunto `turniConfermati.finali` e checkbox ✓ Designazioni Definitive nel tab Finali
- `stampaPDFTurno('finali')`: bodyHtml ristrutturato identico alle mezze giornate — campo header con indirizzo e Maps, due partite in sequenza con orario, terne arbitrali

### v3.0b21 — Badge gironi coerenti + conflitti finali non bloccanti
- Badge G.A/G.B: `.gA`=azzurro (`--md-primary`), `.gB`=verde (`--md-green`) — stessi colori della composizione gironi; CSS duplicate rimosse
- Finali: drop squadra già in altra finale non bloccato — mostra balloon `⚠ warn` e permette l'assegnazione
- Finali: `.finali-slot.conflitto` (ambra) evidenzia lo slot in conflitto; scompare quando l'utente rimuove il duplicato

### v3.0b20 — Girone badge designazioni + fix slot finali
- Designazioni: badge G.A/G.B ora correttamente colorati (bug: `toLowerCase()` produceva `.ga` invece di `.gA`); CSS aggiornato per coprire entrambe le varianti
- Finali: `slotHtml` — nome e regione in colonna flex separata, pulsante ✕ pill a destra
- Finali: `.finali-slot` `flex-direction:row` + `gap:8px` — nome/regione non più appiccicati

### v3.0b19 — Fix calendario, pulsante Rimuovi, Verifica Vincoli
- Calendario: rimosso il carattere `>` spurio prima delle partite (doppio chiudi-tag in concatenazione stringa)
- Calendario: `margin-bottom:16px` tra blocchi turno — Sabato Mattina, Sabato Pomeriggio staccati visivamente
- Finali: pulsante Rimuovi (`liberaSlot`) stilizzato inline con `border-radius:sm` e testo "✕ Rimuovi" — non più un cerchio
- Designazioni: 🔍 Verifica Vincoli avvolto in `<div style="margin:14px 0">` per spaziatura

### v3.0b35 — Header compatto, menu impilato, tipografia pulsanti, fix Finali
- Header: rimossi `<h1>` e riepilogo squadre/arbitri/turni — solo titolo compatto + versione, padding ridotto (16px→10px)
- Tabbar: tornata a layout impilato (`flex-wrap`), niente scroll orizzontale né frecce; sticky solo sotto l'header (`--header-h`)
- Nuova variabile `--content-h` (header+tabbar) per posizionare `#notif-area`/`#toast` sempre sotto la tabbar
- Sync: "Carica sync-config.json" e "🔄 Aggiorna lista" e "⬇ Pull" → tipografia `.btn-sm` uniforme col resto dell'app
- Palestre: "✕ Rimuovi" → `.btn-sm.btn-danger` (pill), "🗺 Apri" → stondato e Noto Sans
- **Fix critico**: il codice di chiusura di `renderFinali` (evidenziazione conflitti, checkbox Definitivo, pannello vincoli) era finito per errore dentro `renderPalestreForm` durante un edit precedente — spostato al posto giusto
- Completato il wiring mai arrivato a destinazione nei b22/b23: checkbox "✓ Designazioni Definitive" nel tab Finali, `stato.turniConfermati.finali`, `#finali-vincoli-panel`, chiamata a `renderFinaliVincoli()`

### v3.0b34 — Sync: lista file verificata e irrobustita
- Verificato: `syncListFiles` mostra TUTTI i file `.json` della cartella e ordina per `_ts` (data ultimo commit) decrescente — più recente in cima
- Filtro `f.type==='file'` aggiunto: esclude sottocartelle che terminano per coincidenza con `.json`
- Se `syncConfig.path` punta a un file invece che a una cartella, l'API risponde con un oggetto (non array) — ora mostrato come errore esplicito invece di "nessun file trovato"
- Confermato: la lista delle sessioni locali (tab Sessioni) è già ordinata più recente in cima (cursore IndexedDB `prev`) e mostra tutte le sessioni salvate

### v3.0b33 — Launcher MD3, sync feedback unificato
- **Launcher (index.html)** completamente riscritto con stile MD3/Noto Sans/tema chiaro-scuro-auto, identico a finali.html: token CSS, font, toggle tema persistente, toast aggiornamento ristilizzato
- **Sync feedback**: `syncFeedback()` ora instrada su `mostraNotifica()` — rimosso il vecchio div statico `#sync-feedback` (era spesso fuori vista)
- **Audit pulsanti stampa**: confermato — Finali/Risultati/Designazioni sempre visibili quando la rispettiva sezione è attiva (`stato.gironi` truthy)
- **Audit banner**: import/export/sync di `bannerImage` confermato corretto in `costruisciExport`, `importaStato`, `importaJSON`
- **Audit Sync**: push (con gestione SHA per update) e pull (con `importaStato`) confermati corretti

### v3.0b32 — Fix guard retrocompatibilità posizionato male
- Il guard `data.risultati||{}` era finito dentro `costruisciExport` (stessa firma `sezioni`) invece di `importaStato` — causava "data is not defined" al salvataggio sessione
- Spostato correttamente all'inizio di `importaStato`

### v3.0b31 — Fix funzioni risultati mancanti
- Reinserite 4 funzioni perse: `aggiornaRisultato`, `aggiornaRisultatoFinale`, `applicaFinaliste`, `setForfait`
- Stili adattati ai token MD3

### v3.0b30 — Fix renderRisultati mancante + retrocompatibilità JSON
- Reinserita `renderRisultati()` (persa in un passaggio precedente): stili MD3, trovaDataOraPartita per data+ora su ogni partita
- Retrocompatibilità JSON: `data.risultati` e `data.risultatiFinali` inizializzati a `{}` se assenti (evita crash con sessioni vecchie)

### v3.0b29 — Classifica: spareggio 3-way corretto
- Riscritta `calcolaClassifica` con algoritmo a gruppi (non più pairwise sort)
- Tiebreaker 3-way: 1) record scontri diretti tra le 3 squadre, 2) quoziente canestri SOLO tra di loro, 3) quoziente canestri totale
- Niente più dipendenza dall'ordine dei confronti in JavaScript (sort non transitivo con 3-way ciclo)
- La nota di spareggio ora indica quale criterio ha separato le squadre (SD / Q.dir. / Q.gen.)

### v3.0b28 — Tabbar: frecce di navigazione su PC
- Aggiunte frecce ‹ › ai lati della tabbar su schermi ≥600px
- Opacità ridotta sulla freccia in direzione già al limite
- Scroll con rotellina del mouse sopra la tabbar (asse verticale → orizzontale)
- `tabbar-wrap` contenitore sticky che include frecce + `#tabbar`
- `aggiornaOffsetHeader` misura l'altezza combinata header+tabbar-wrap

### v3.0b27 — Sync: caricamento progressivo e diagnostica
- Lista file: mostrata subito senza timestamps (caricamento progressivo)
- Timestamps recuperati in sequenza invece di Promise.all — evita rate limit GitHub con molti file
- Conteggio totale file visibile ("N file trovati")
- Errore caricamento lista → `violazione-item` + `mostraNotifica` (rimosso colore hardcoded `#ef4444`)
- Pulsante Pull stilizzato con classe `btn-stamp-gironi`

### v3.0b26 — Gironi sola andata: fix duplicati
- `pairKey()`: chiave normalizzata (ordinamento alfabetico) per identificare la coppia indipendentemente da chi è casa/ospite
- `getPartiteGirone()`: deduplicazione per `pairKey` — ogni coppia di squadre appare una sola volta (sola andata)
- `getRisultato()`: cerca il risultato sia con chiave A|B che B|A e inverte i punteggi se necessario (retrocompatibilità con sessioni precedenti)
- `deduplicaCalSlots()`: rimuove partite duplicate dai calSlots dopo import JSON e Sync
- Solo la prima partita di ogni coppia viene tenuta

### v3.0b25 — Sistema notifiche unificato
- `.notif-card` ridisegnato come `.violazione-item`: background colorato pieno per gravità (error=rosso, warn=ambra, ok=verde, info=blu), titolo bold + descrizione
- `#toast` spostato in alto (sotto tabbar) — niente più elementi in basso
- `mostraNotifica(msg, tipo, durata, titolo)`: nuovo parametro `titolo` per badge header
- Tutti i residui `alert()` rimpiazzati con `mostraNotifica()` tipizzata
- Sync: push completato, errori, caricamento → tutti in alto come notifica

### v3.0b24 — Fix definitivo logica finali
- Rimosso il blocco `mostraNotifica+return` che impediva l'inserimento della squadra (le versioni precedenti non avevano sostituito il testo corretto)
- `finaliDrop`: nessun check bloccante — l'inserimento avviene sempre; i conflitti sono mostrati da `renderFinaliVincoli()` come `.violazione-item`

### v3.0b23 — Conflitti finali come violazione-item + btn-swap uniforme
- Finali: conflitto squadra doppia visualizzato come `.violazione-item` rosso inline (come vincoli designazioni) — non più balloon
- `renderFinaliVincoli()`: controlla duplicati f34/f12 e mostra `#finali-vincoli-panel` sopra la composizione
- Designazioni: rimosso inline `font-size:9px;padding:2px 6px` dal btn-swap — usa ora il CSS `.btn-swap` (15px bold) identico alle Finali

### v3.0b22 — Finali: fix popup, checkbox definitivo, stampa con campo
- Rimosso `return` dal conflict check in `finaliDrop` — mostra balloon senza bloccare
- Aggiunto `turniConfermati.finali` e checkbox ✓ Designazioni Definitive nel tab Finali
- `stampaPDFTurno('finali')`: bodyHtml ristrutturato identico alle mezze giornate — campo header con indirizzo e Maps, due partite in sequenza con orario, terne arbitrali

### v3.0b21 — Badge gironi coerenti + conflitti finali non bloccanti
- Badge G.A/G.B: `.gA`=azzurro (`--md-primary`), `.gB`=verde (`--md-green`) — stessi colori della composizione gironi; CSS duplicate rimosse
- Finali: drop squadra già in altra finale non bloccato — mostra balloon `⚠ warn` e permette l'assegnazione
- Finali: `.finali-slot.conflitto` (ambra) evidenzia lo slot in conflitto; scompare quando l'utente rimuove il duplicato

### v3.0b20 — Girone badge designazioni + fix slot finali
- Designazioni: badge G.A/G.B ora correttamente colorati (bug: `toLowerCase()` produceva `.ga` invece di `.gA`); CSS aggiornato per coprire entrambe le varianti
- Finali: `slotHtml` — nome e regione in colonna flex separata, pulsante ✕ pill a destra
- Finali: `.finali-slot` `flex-direction:row` + `gap:8px` — nome/regione non più appiccicati

### v3.0b19 — Fix calendario, pulsante Rimuovi, Verifica Vincoli
- Calendario: rimosso `>` spurio prima delle partite (doppio chiudi-tag in concatenazione stringa)
- Calendario: `margin-bottom:16px` tra blocchi turno
- Finali: pulsante liberaSlot stilizzato "✕ Rimuovi" con `border-radius:sm`
- Designazioni: `#vincoli-panel` con `margin:16px 0`; `h3` con padding e separatore

### v3.0b18 — Designazioni e Finali: font, spaziatura, alert
- `.f-dot`: 30px, `margin-right:10px`; `.arb-row`: gap e separatore bordo inferiore
- `btn-swap`: font 15px bold, padding `10px 22px`, `min-height:48px` — uguale alle Designazioni
- `liberaSlot` (Finali): pulsante migrato a `btn-sm btn-danger`
- Alert UX (pareggio, squadra doppia, sync, errori) → `mostraNotifica()` in cima come balloon, rimossi i popup `alert()`

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

