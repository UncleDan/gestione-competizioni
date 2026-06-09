# CHANGELOG — Gestione Competizioni Baskin
## finali.html

---

### v2.11.5 — Orario 🕐 nel badge arbitri
- Badge arbitri: aggiunto orario con icona 🕐 accanto al turno (es. "Venerdì Pomeriggio 🕐 15:00")
- Confermato: tutte le stampe (gironi per turno, gironi completo, finali) hanno già 🕐

### v2.11.4 — Icona 🕐 negli orari delle stampe
- Aggiunta icona orologio 🕐 prima di ogni orario in tutte le stampe (designazioni gironi per turno e complete, finali)

### v2.11.3 — Fix orari: sorgente dati e sincronizzazione
- Root cause: `aggiornaOrarioPartita` aggiornava `calSlots` ma non `stato.calendario.turni` (usato dalle stampe)
- `aggiornaOrarioPartita`: aggiorna ora anche `stato.calendario.turni`
- `aggiornaOrario` (default): propaga anche a `stato.calendario.turni`
- Aggiunto helper `syncOrariCalendario()`: dopo import/sync allinea orari da `calSlots` → `stato.calendario.turni`
- Chiamato dopo `importaStato` e `importaJSON` nella sezione Designazioni

### v2.11.2 — Fix orario coverage
- `importaStato`: ripristino `orariDefault` dalla sezione Date
- `importaJSON`: ripristino `orarioF34/F12` dalla sezione Finali
- Orari finali presenti in tutte le stampe (stampaPDF, stampaPDFTurno)
- Audit completo: tutti i percorsi export/import/stampa coprono gli orari

### v2.11.1 — Fix orario duplicato in designazioni
- Rimossa label statica orario `🕐 HH:MM` dal tab Designazioni (rimane solo l'input nel Calendario)

### v2.11 — Orari partite e finali  *(rilasciata come 2.10.12, poi rinominata)*
- Orario modificabile inline in ogni slot del CALENDARIO (default da tab Date)
- Orario mostrato nel tab DESIGNAZIONI accanto a ogni partita
- FINALI: due input orario diretti nel tab (Finale 3°-4° e Finale 1°-2°)
- Orari in tutte le stampe: designazioni per turno, designazioni gironi completo, finali
- Orari salvati nel JSON/sync (in `calendario[t][c][p].orario` e `finali.orarioF34/F12`)

### v2.10.11 — Fix tab Finali e Risultati disabilitati
- `impostaGironi()`: abilita anche Finali e Risultati
- `importaStato()`: abilita Finali e Risultati quando i gironi sono presenti nel JSON
- INIT: all'avvio riabilita tutti i tab in base allo stato caricato dalla sessione
- Finali sempre accessibili per composizione manuale (nessun requisito sui risultati)

### v2.10.10 — Fix sync banner e turniConfermati
- Pull sync: sezione Opzioni non veniva rilevata (cercava `data['opzioni']` invece di `data.bannerImage`)
- `importaStato` e `importaJSON`: `turniConfermati` non veniva ripristinato dalla sezione Designazioni
- Ora banner e flag definitivi/provvisori vengono correttamente caricati da pull e da JSON

### v2.10.9.1 — Bugfix Cerano
- Corretto nome squadra: Cerrano → Cerano, ST Valle d'Aosta/Piemonte/Liguria → Piemonte/Valle d'Aosta/Liguria

### v2.10.9 — Tab 4.Finali e Risultati disabilitati
- 4. Finali e 📊 Risultati disabilitati finché i gironi non sono impostati
- Si abilitano in `impostaGironi()` assieme a Calendario
- Si disabilitano in `resetApp()` assieme a Calendario e Designazioni
- Si riabilitano all'import se presenti i gironi

### v2.10.8.1 — Fix reset nomiArbitri
- Rimosso doppio azzeramento `nomiArbitri` in `resetApp()` che sovrascriveva i nomi fittizi

### v2.10.8 — UX e fix reset
- Tab 4. Finali spostato prima di 📊 Risultati
- Pulsante ✕ Scollega repo aggiunto nel tab Sync
- `resetApp()`: tutti i `getElementById` con null-guard
- `resetApp()` resetta anche `finali-stamp-area`, `nomiArbitri`; non tocca `syncConfig`

### v2.10.7.1 — Fix pulsante stampa risultati
- Pulsante Stampa Risultati & Classifica aggiunto correttamente in fondo al tab (era scomparso perché innerHTML cancellava il nodo aggiunto con appendChild)

### v2.10.7 — Minor fixes
- Designazioni: pulsante "Tutti" rinominato "Gironi"
- Finali: pulsante stampa rinominato "Finali", rimosso pulsante Risultati & Classifica
- Sync: fix ordinamento lista file dal più recente — `_ts` non veniva salvato

### v2.10.6 — Minor UX fixes
- Pulsante Stampa Risultati & Classifica spostato in fondo al tab (come Designazioni)
- Tab Finali: pulsante Designazioni Finali + Risultati & Classifica in fondo
- Tab Arbitri: rimosso pulsante PDF Designazioni, rimane solo Badge Arbitri

### v2.10.5 — Fix doppioni nel pool partite
- Aggiunto helper `raccogliTuttePartite()` con deduplicazione per id
- `distribuisciAuto()` e `svuotaCalendarioManuale()` usano il nuovo helper
- `renderCalBuilder()` deduplica il pool prima di renderizzare (safety net)
- Eliminato bug per cui svuotare il calendario o ridistribuire poteva generare partite doppie

### v2.10.4 — Sezione Opzioni = solo banner
- Sezione Opzioni contiene solo `bannerImage` (e future opzioni grafiche)
- `turniConfermati` rimane nella sezione Designazioni
- `orariDefault` rimane nella sezione Date
- Compatibilità retroattiva con JSON v1 (bannerImage alla radice)

### v2.10.3 — Sezione Opzioni e fix export/import
- Nuova sezione **Opzioni** in Import/Export e Sync: include banner stampe e conferme turni
- `bannerImage` spostato dalla sezione Palestre alla sezione Opzioni
- `turniConfermati` incluso sia in Opzioni che in Designazioni
- `orariDefault` incluso nella sezione Date
- `campoId` e `orario` inclusi nel calendario esportato
- Fix rilevamento sezione Opzioni nei JSON importati da versioni precedenti
- Versione export JSON: `_versione: 2`

### v2.10.2 — BASEDIR per multi-istanza
- Aggiunta costante `BASEDIR` (root repo) separata da `BASE` (cartella istanza) in tutti e tre i file
- Per creare `pwa-beta`: copiare `pwa/`, cambiare `BASE = BASEDIR + '/pwa-beta'` in `sw.js`, `index.html` e `finali.html`
- `save/demo.json` e `config/` referenziati tramite `BASEDIR` (condivisi tra istanze)

### v2.10.1 — README e CHANGELOG
- README completamente riscritto con tutte le funzionalità
- CHANGELOG.md creato in `pwa/` con storia completa

### v2.10 — Technical update: struttura progetto
- Tutti i file app spostati in `pwa/` (finali.html, sw.js, versions.json)
- Costanti di configurazione (BASE, VERSION, CACHE_NAME) in cima a ogni file
- `sw.js` riscritto con versione nel nome cache (`gestione-competizioni-sw-2.10`)
- `.gitignore` aggiornato per nuova struttura

### v2.9.7.4 — Fix reset btn-pdf
- `resetApp()` cercava `btn-pdf` e `btn-badge` rimossi dalla tabbar in 2.9.7

### v2.9.7.3 — Fix badge versione
- `const VERSION` rimasto a 2.9.6.1; ora tutte le sorgenti versione allineate

### v2.9.7.2 — Fix badge versione (badge HTML)
- Badge HTML hardcoded non aggiornato; ora coincide con `VERSION` JS

### v2.9.7.1 — Fix versione in launcher
- Launcher mostrava versione 2.9.1; aggiunto `KNOWN_VERSIONS` per evitare falsi "tutto aggiornato"

### v2.9.7 — UX miglioramenti
- Pulsanti PDF/Badge rimossi dalla tabbar (solo contestuali)
- Stampa per turno: Dom. Finali spostata nel tab Finali; "Gironi" al posto di "Tutti"
- Pulsante Stampa Risultati & Classifica nel tab Risultati
- Tab Risultati e Finali scambiati di posizione
- Ordine cronologico nelle partite dei risultati (segue il calendario)
- Lista pull sync ordinata dal più recente al più vecchio

### v2.9.6 — Stampe complete
- Tab ⚙ Opzioni con banner stampe e metodo di stampa
- Footer PDF: nome app + versione invece di testo generico
- Riepilogo arbitri sempre incluso nelle stampe per turno (non più condizionale)
- Stampa Designazioni Finali con riepilogo arbitri completo (finali + gironi)
- Pulsante stampa finali nel tab Finali

### v2.9.5.3 — Fix _campoIdCounter e banner timing
- `_campoIdCounter` non dichiarato → fix standalone declaration
- Banner non visibile in Opzioni → `aggiornaBannerUI()` chiamata anche in `showTab('opzioni')`

### v2.9.5.2 — Sync persistente
- Config sync spostata da `sessionStorage` a `localStorage`
- Pulsante ✕ Scollega repo

### v2.9.5.1 — Fix stato init
- `turniConfermati` e `bannerImage` mancavano dall'oggetto `stato` iniziale

### v2.9.5 — Banner e persistenza
- Banner stampe caricabile in base64, salvato in DB/JSON
- Tab ⚙ Opzioni dedicato
- Config sync in `localStorage` (persiste tra sessioni e crash)
- Pulsante ✕ Scollega repo
- Tutti i fallback per import JSON da versioni precedenti

### v2.9.4.1 — Fix template literal
- Caratteri `$` escapati (`\$`) nel turno-sep rendevano il template come testo grezzo

### v2.9.4 — Checkbox conferma turno
- Checkbox Provvisorie/Definitive per ogni turno nel tab Designazioni
- Nota provvisoria/definitiva in ogni stampa
- Stampa per singola mezza giornata (Ven. Pom., Sab. Matt., Sab. Pom.)
- Campo ID progressivo nelle palestre (campo_1, campo_2…)
- Campo snapshot nelle designazioni: nome campo al momento dell'assegnazione

### v2.9.3.2 — Fix annotazione campo drag
- `campoId` non veniva annotato nel drop manuale cella→cella
- Aggiunta annotazione in tutti e tre i casi: pool→cella, sposta, swap

### v2.9.3.1 — Fix _campoIdCounter
- Variabile non dichiarata; reset non ripristinava contatore e `turniConfermati`

### v2.9.3 — Campi e città
- ID progressivo per ogni palestra (campo_1, campo_2…)
- Coerenza campo: `campoId` salvato in ogni slot del calendario
- `campoInfo()`: risolve campo per ID, fallback per indice
- Città accanto al nome squadra in tutte le schermate e stampe (se diversa)
- Downgrade detection nel launcher: alert + conferma prima di applicare

### v2.9.2 — Downgrade
- Rilevamento downgrade nel launcher: confronto semantico versioni
- Alert esplicito con lista versioni attuali → versioni repo

### v2.9.1 — Bugfix regex
- Fix regex base64 con newline letterale nel pull sync

### v2.9 — Sezioni import/export
- Sezioni assenti nel JSON mostrate grigie/disabilitate in Import/Export e Sync

### v2.8 — Pull banner sync
- Pull dal banner con feedback visibile a schermo
- Usa tutte le sezioni disponibili (non dipende dal tab Sync aperto)

### v2.7 — Nome file sync
- Timestamp automatico nel nome file sync, modificabile prima del push
- Formato: `YYYYMMDD-HHMMSS-RRRRRR-gestione-competizioni.json`

### v2.6 — Sezioni Sync
- Checkbox sezioni indipendenti nel tab Sync (separati da Import/Export)

### v2.5 — Gruppo (ex Fascia)
- Rinominato `fascia` → `gruppo` in tutto il codice, dati, UI e CSS

### v2.4 — Fix reset
- `nomiArbitri` reinizializzati su tutti gli arbitri dopo reset
- Guard `null` su `classList` in `showTab`

### v2.3 — Menu
- Pulsante ⌂ Menu per tornare al launcher

### v2.2 — Reset
- Pulsante ↺ Reset ai dati di esempio

### v2.1 — Utente sync
- Campo `user` nei commit sync per identificare chi pubblica

### v2.0 — Sync collaborativo
- Scelta utente se caricare versione remota all'avvio (no caricamento forzato)
- Banner avviso se repo ha versione più recente della sessione locale

### v1.9 — Avvio intelligente
- Caricamento automatico ultima sessione locale
- Avviso se repo sync ha file più recente

### v1.8 — Sincronizzazione GitHub
- Push/pull JSON su repository privato con token PAT
- Lista file repo con data e autore commit

### v1.7 — Versione e aggiornamento
- Badge versione nell'header del modulo
- Controllo aggiornamento via `versions.json`

### v1.6 — Fix caratteri speciali
- Helper `esc()` per escape sicuro nei drag & drop
- Fix nomi squadre con virgolette

### v1.5 — Fix DnD pool
- Pool partite con indice numerico nei data-attributes

### v1.4 — Fix DnD calendario
- Drag & drop calendario via data-attributes (fix SyntaxError)

### v1.3 — Fix input
- `oninput` → `onchange+onblur` su arbitri e palestre

### v1.2 — Modifiche offline
- Modifiche manuali integrate nel codice base

### v1.1 — IndexedDB
- Storico sessioni con IndexedDB
- Salvataggio automatico debounced

### v1.0 — Release iniziale
- Gironi (sorteggio e DnD)
- Calendario (distribuzione automatica e manuale)
- Designazioni arbitrali con backtracking esaustivo
- Vincoli: gruppo, conteggio, territoriali (con deroghe per livelli)
- Risultati e classifica (V=3, S=1, spareggio)
- Finali (3°-4° e 1°-2°)
- Import/Export JSON per sezioni
- Stampa PDF via HTML + browser
