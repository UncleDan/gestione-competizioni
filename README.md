# Gestione Competizioni Baskin

Applicazione web progressiva (PWA) per la gestione completa di competizioni Baskin: sorteggio gironi, calendario partite, designazioni arbitrali automatiche, risultati, classifiche e finali.

[![Apri App Stabile](https://img.shields.io/badge/🏀%20App%20Stabile%202.11.5-1a56a0?style=for-the-badge&logoColor=white)](https://uncledan.github.io/gestione-competizioni/pwa/)
[![Apri App Beta](https://img.shields.io/badge/⚠%20Beta%203.0b19-dc2626?style=for-the-badge&logoColor=white)](https://uncledan.github.io/gestione-competizioni/pwa-beta/)

**Repo privato sync:** https://github.com/UncleDan/gestione-competizioni-private

---

## Struttura del progetto

```
gestione-competizioni/
├── README.md
├── .gitignore
├── config/
│   └── demo-sync.json        ← template config sync (gli altri file sono ignorati da git)
├── save/
│   └── demo.json             ← dati di esempio fittizi (gli altri salvataggi sono ignorati)
└── pwa/                      ← tutta l'applicazione
    ├── finali.html           ← modulo principale
    ├── index.html            ← launcher PWA
    ├── sw.js                 ← service worker (cache offline)
    ├── manifest.json         ← manifest PWA
    ├── versions.json         ← versioni componenti (usato per aggiornamento)
    ├── CHANGELOG.md
    └── icon.svg / icon-192.png / icon-512.png
```

> ⚠️ I file con dati personali (nomi reali arbitri, squadre) **non** sono nel repository.  
> Importarli tramite **⇅ Import/Export** o **☁ Sync** nell'applicazione.

---

## Deploy su GitHub Pages

1. Crea il repo `gestione-competizioni` su GitHub (account: `uncledan`)
2. Carica tutti i file mantenendo la struttura
3. **Settings → Pages → Branch: main → / (root) → Save**
4. L'app è disponibile su `https://uncledan.github.io/gestione-competizioni/pwa/`

---

## Installazione come app (PWA)

### Android / Tablet
1. Apri `https://uncledan.github.io/gestione-competizioni/pwa/` in Chrome
2. Tocca ⋮ → **Aggiungi alla schermata Home**, oppure usa il pulsante **⬇ Installa App**

### PC (Windows / Mac / Linux)
1. Apri l'URL in Chrome o Edge
2. Clicca l'icona ⊕ nella barra degli indirizzi → **Installa Gestione Competizioni**

L'app funziona **offline** dopo la prima apertura grazie al service worker.

---

## Flusso di lavoro

### 1. Gironi
- Sorteggio casuale o inserimento manuale con drag & drop (touch supportato)
- 8 squadre divise in Girone A e Girone B

### 2. Calendario
- Distribuzione automatica o manuale delle partite sui campi e turni
- Vincoli: ogni squadra gioca una sola partita per mezza giornata; ogni squadra gioca almeno una partita sul campo principale
- Drag & drop con touch support

### 3. Designazioni arbitrali
- Generazione automatica tramite algoritmo di backtracking esaustivo
- Vincoli intoccabili: 1 arbitro per gruppo (1/2/3) in ogni terna; 3 partite per arbitro; 1 partita per turno per arbitro
- Deroghe territoriali gestite per livelli (macro-ST → ST esatta → ammesso)
- Opzioni: vincolo campo, varia colleghi, bilancia difficoltà/esperienza
- Indice difficoltà squadre (1-5) e indice esperienza arbitri (1-5)
- Override manuale con avviso violazioni (mai bloccato)
- Checkbox conferma per turno: Provvisorie / ✓ Definitive
- Stampa per turno singolo o completa gironi; riepilogo arbitri incluso in ogni stampa

### 4. Risultati
- Inserimento punteggi con validazione (no pareggi)
- Classifica automatica: V=3pt, S=1pt, forfait=0pt
- Spareggio: scontro diretto → quoziente SD → quoziente generale
- Stampa Risultati & Classifica

### 5. Finali
- Domenica mattina: Finale 3°-4° e Finale 1°-2°
- Assegnazione squadre e terne arbitrali manuali
- Stampa Designazioni Finali con riepilogo arbitri (finali + gironi)

---

## Funzionalità avanzate

### Salvataggio automatico (IndexedDB)
Ogni modifica viene salvata automaticamente nel database locale del browser (IndexedDB). All'avvio viene caricata l'ultima sessione. Il tab **🕐 Sessioni** mostra lo storico (max 50), con possibilità di ripristinare, rinominare ed eliminare sessioni.

### Import/Export JSON
Il tab **⇅ Import/Export** permette di esportare e importare per sezioni selezionabili (squadre, arbitri, palestre, date, gironi, calendario, designazioni, finali, risultati). Il nome file include timestamp e codice univoco: `YYYYMMDD-HHMMSS-RRRRRR-gestione-competizioni.json`. Le sezioni assenti nel JSON importato vengono mostrate grigie/disabilitate.

### Sincronizzazione GitHub (☁ Sync)
Collaborazione tra designatore e responsabile arbitri tramite repository privato GitHub:
- Configurare `config/sync-config.json` (non committato) con token PAT, repo, branch e `user` (sigla per i commit)
- La config persiste in `localStorage` — non serve ricaricarla a ogni apertura
- Push: carica il JSON sul repo privato con commit firmato dalla sigla utente
- Pull: lista file dal repo con data/ora e autore dell'ultimo commit, ordinati dal più recente
- All'avvio: se il repo ha un file più recente della sessione locale, viene mostrato un banner con la possibilità di caricarlo
- Pulsante **✕ Scollega repo** per rimuovere il token

### Aggiornamento PWA
- **Verifica aggiornamenti** nel launcher: confronta `versions.json` in cache con quello remoto; segnala sia aggiornamenti che downgrade (con alert di conferma per i downgrade)
- Il service worker aggiorna i file in background; il toast "Aggiornamento disponibile" permette di applicarlo con un tap

### Orari partite
Ogni slot del **Calendario** ha un input orario `🕐` modificabile inline. I default per mezza giornata si configurano nel tab **📅 Date e Orari**. Nel tab **4. Finali** si impostano i due orari delle finali. Gli orari appaiono in tutte le stampe delle designazioni e vengono salvati nel DB locale, JSON e sync.

### Banner stampe
Nel tab **⚙ Opzioni**: carica un'immagine (logo/intestazione) che viene inserita in cima a tutte le stampe. Salvata in base64 nel DB locale e negli export JSON.

### Metodo stampa PDF
Nel tab **⚙ Opzioni**: scegli tra apertura in nuova finestra con stampa automatica (consigliato PC) o download del file HTML (consigliato Android).

### Città accanto al nome squadra
Mostrata in tutte le schermate e stampe quando il nome della città differisce dal nome della squadra.

### Reset
Il pulsante **↺ Reset** nella tabbar ripristina tutti i dati di esempio (nomi fittizi) e azzera gironi, calendario, designazioni e risultati. Non tocca la configurazione sync.

---

## Aggiungere un nuovo modulo

1. Crea il file HTML nella cartella `pwa/` (es. `pwa/nazionale-2027.html`)
2. Aggiungi una voce all'array `MODULI` in `pwa/index.html`:
```js
{
  id: 'nazionale-2027',
  nome: 'Nazionale 2027',
  desc: 'Descrizione del modulo',
  anno: '2027',
  versione: '1.0',
  file: `${BASE}/nazionale-2027.html`,
  icon: '🏀',
  attivo: true,
}
```
3. Aggiungi il file al array `PRECACHE` in `pwa/sw.js`
4. Aggiorna `pwa/versions.json`
5. Fai push — la PWA si aggiorna automaticamente

---

## Configurazione sincronizzazione

Copia `config/demo-sync.json` in `config/sync-config.json` e compila:

```json
{
  "provider": "github",
  "repo": "UncleDan/gestione-competizioni-private",
  "branch": "main",
  "path": "saves",
  "token": "IL_TUO_PERSONAL_ACCESS_TOKEN",
  "user": "SIGLA_UTENTE"
}
```

Il token PAT deve avere permesso `contents: write` sul repo privato. Il campo `email` è opzionale (default: `SIGLA@gestione-competizioni.local`). Il file **non va mai committato** (è in `.gitignore`).

---

## Tecnologie

- HTML5 + CSS3 + JavaScript vanilla (zero dipendenze runtime)
- Progressive Web App con Service Worker (cache offline)
- IndexedDB per storico sessioni locale
- Drag & Drop nativo con touch support completo
- Algoritmo di backtracking esaustivo per designazioni ottimali
- GitHub REST API per sincronizzazione collaborativa
- Stampa via browser nativo o pdfmake (opzionale, richiede connessione)

---

## Privacy e sicurezza

- Nessun dato inviato a server esterni (eccetto sync GitHub se configurato)
- Tutto gira localmente nel browser
- I nomi nel codice sorgente sono fittizi
- Il token PAT è salvato in `localStorage` in chiaro — usare **Scollega repo** su dispositivi condivisi
- I dati personali reali vanno importati localmente e mai committati nel repo

---

*Gestione Competizioni Baskin — uncledan.it · 2026*
