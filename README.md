# Gestione Competizioni Baskin

Applicazione web progressiva (PWA) per la gestione di competizioni Baskin: sorteggio gironi, designazioni arbitrali, calendario partite, risultati e classifiche.

**URL pubblico:** https://uncledan.github.io/gestione-competizioni/pwa/

---

## Struttura del progetto

```
/
├── finali.html              ← Modulo Finali Nazionali 2026
├── sw.js                    ← Service worker (cache offline)
├── pwa/
│   ├── index.html           ← Launcher PWA (schermata di selezione moduli)
│   ├── manifest.json        ← Manifest PWA (nome, icone, colori)
│   ├── icon-192.png
│   └── icon-512.png
├── save/
│   └── finali-2026.json     ← Dati iniziali (squadre, arbitri) — non contiene dati personali
└── README.md
```

> ⚠️ I file con dati personali (nomi reali arbitri) **non** sono inclusi nel repository.  
> Importarli localmente tramite il tab **⇅ Import/Export** dell'applicazione.

---

## Deploy su GitHub Pages

1. Crea il repo `gestione-competizioni` su GitHub (account: `uncledan`)
2. Carica tutti i file mantenendo la struttura delle cartelle
3. Vai su **Settings → Pages → Branch: main → / (root)**
4. L'app sarà disponibile su `https://uncledan.github.io/gestione-competizioni/pwa/`

---

## Installazione come app (PWA)

### Android / Tablet
1. Apri `https://uncledan.github.io/gestione-competizioni/pwa/` in Chrome
2. Tocca il menu ⋮ → **Aggiungi alla schermata Home**
3. Oppure usa il pulsante **⬇ Installa App** che appare nella pagina

### PC (Windows / Mac / Linux)
1. Apri l'URL in Chrome o Edge
2. Clicca l'icona di installazione nella barra degli indirizzi (⊕)
3. Oppure: menu → **Installa Gestione Competizioni**

Una volta installata, l'app funziona **offline** grazie al service worker.

---

## Utilizzo

### Prima apertura
1. Apri il launcher (`pwa/index.html`)
2. Seleziona il modulo desiderato (es. **Finali Nazionali 2026**)
3. Opzionale: importa i dati iniziali da **⇅ Import/Export → Carica JSON** selezionando `save/finali-2026.json`

### Flusso di lavoro
1. **Gironi** — sorteggio casuale o inserimento manuale con drag & drop
2. **Calendario** — distribuzione partite sui campi (automatica o manuale)
3. **Designazioni** — generazione automatica terne arbitrali con gestione deroghe
4. **Risultati** — inserimento punteggi e classifica in tempo reale
5. **Finali** — selezione squadre e terne arbitrali manuali
6. **PDF** — esporta designazioni, risultati e classifica finale

### Salvataggio dati
Usa **⇅ Import/Export** per salvare e ripristinare lo stato completo della competizione in formato JSON. Il nome file generato include data, ora e codice univoco per evitare sovrascritture.

---

## Aggiungere un nuovo modulo

1. Aggiungi il file HTML nella root (es. `nazionale-2027.html`)
2. Aggiungi una voce all'array `MODULI` in `pwa/index.html`:
```js
{
  id: 'nazionale-2027',
  nome: 'Nazionale 2027',
  desc: 'Descrizione del modulo',
  anno: '2027',
  file: `${BASE}/nazionale-2027.html`,
  icon: '🏀',
  attivo: true,
}
```
3. Aggiorna `sw.js` aggiungendo il file al array `PRECACHE`
4. Fai push su GitHub — la PWA si aggiorna automaticamente

---

## Tecnologie

- HTML5 + CSS3 + JavaScript vanilla (zero dipendenze)
- Progressive Web App (PWA) con Service Worker
- Drag & Drop nativo con supporto touch
- Algoritmo di backtracking esaustivo per designazioni arbitrali ottimali
- Esportazione PDF tramite file HTML scaricabile

---

## Note privacy

- Nessun dato viene inviato a server esterni
- Tutto gira localmente nel browser
- I nomi nel codice sorgente sono fittizi (stesse iniziali degli arbitri reali)
- I dati personali reali vanno importati localmente e mai committati nel repo

---

*Sviluppato per la gestione delle competizioni Baskin — uncledan.it · 2026*
