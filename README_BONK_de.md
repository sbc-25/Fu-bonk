# BONK VS Plattform

# Our Website for show: https://kuch3nfresseyt-cpu.github.io/Bonk/

Ein Prototyp einer Fußball-Fan-Interaktionsplattform basierend auf **Next.js 14 + React 18 + TypeScript + Tailwind CSS + Radix UI/shadcn**.  
Das Projekt enthält Modul-Beispiele wie Score-Voting, NFT-Präsentation, Live-Interaktion, Kurzvideos, Community-Themen, Mitgliedschaftssystem und Minispiele.

> Dieses Repository enthält bereits ein gebautes `.next/`-Verzeichnis, sodass man direkt mit `npm start` eine lokale Vorschau starten kann. Für die Entwicklung wird jedoch empfohlen, den Quellcode mit `npm run dev` auszuführen.

---

## ✨ Funktionsübersicht (Auswahl)
- **Startseite**: Datenkarten, wöchentliche Drops, Trendthemen, Video-Bereich, Quick-Actions
- **Vereine/Ligen**: Tabellen, Spielpläne, Datenvergleiche & Diagramme (Recharts)
- **Live**: Mehrkanal-Streams und Chat/Kommentare (Platzhalter)
- **NFT**: Präsentation von Karten wie „Signal Iduna Card“
- **Mitgliedschaft**: Wachstumspunkte, tägliches Einchecken, BONK-Token (Platzhalter)
- **Community**: Themen, Umfragen, Kommentare
- **Amateurfußball**: Teamverwaltung, Ligen & Spielpläne, Spieler-Karten
- **UI-Komponenten**: Navigation, Dialoge, Formulare (react-hook-form + zod), Theme-Switcher, Captcha-Eingabe, Fortschrittsleisten, Tags usw.

---

## 🧰 Technologiestack
- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS** (bereits in `tailwind.config.ts` konfiguriert)
- **Radix UI / shadcn/ui**
- **Recharts** (Diagramme)
- Weitere: `lucide-react` Icons, `date-fns`, `react-hook-form`, `zod` usw.

---

## 📁 Projektstruktur (vereinfacht)
```
Bonk-main/
├─ app/                 # Next.js App Router: Layouts und Seiten
├─ components/          # UI-Komponenten
├─ lib/                 # Hilfsfunktionen und Konstanten
├─ hooks/               # Custom Hooks
├─ public/              # Statische Ressourcen
├─ .next/               # Build-Output
├─ tailwind.config.ts
├─ next.config.mjs
├─ tsconfig.json
├─ package.json
└─ README.md (diese Datei)
```

---

## 🖥️ Entwicklung & Ausführung

### 0) Voraussetzungen
- **Node.js ≥ 18.17 (oder 20+)**
- npm (oder pnpm / yarn, hier Beispiel mit npm)

### 1) Abhängigkeiten installieren
```bash
npm install
```

### 2) Lokale Entwicklung (Hot Reload)
```bash
npm run dev
# öffne http://localhost:3000
```

### 3) Produktions-Build & Start
```bash
npm run build
npm start
# Standardport: 3000
```

> In `next.config.mjs` ist `images.unoptimized = true` gesetzt, damit Bilder auch in statischen Umgebungen (z. B. GitHub Pages) korrekt angezeigt werden.

---

## ⚙️ Umgebungsvariablen
Aktuell sind keine `.env`-Dateien zwingend erforderlich.  
Falls du eine echte API (Auth, Live, Payment, Blockchain etc.) integrierst, nutze:
- Variablen mit `NEXT_PUBLIC_*` Präfix für Frontend-Zugriff
- Server-seitige Variablen für API Routes oder Server Actions

---

## 🧪 FAQ
**Q1: Kann ich direkt `npm start` ausführen?**  
Ja. Da das `.next/`-Verzeichnis bereits enthalten ist, reicht `npm install` + `npm start` aus. Für die Entwicklung: `npm run dev`.

**Q2: GitHub Pages Deployment?**  
Next.js benötigt meist Anpassungen:  
1. **Static Export** mit `next export` (Output in `out/`), oder  
2. Deployment über Plattformen wie **Vercel**, oder  
3. GitHub Actions Workflow für `next build`.  

**Q3: Styles/Icons fehlen?**  
Stelle sicher, dass `app/globals.css` Tailwind-Direktiven enthält und `tailwind.config.ts` alle relevanten Ordner (`app/`, `components/`) abdeckt.

**Q4: TypeScript/ESLint-Fehler beim Build?**  
In `next.config.mjs` ist konfiguriert:
```js
eslint: { ignoreDuringBuilds: true },
typescript: { ignoreBuildErrors: true }
```
Entferne dies, falls du strenge Checks erzwingen willst.

---

## 📜 Nützliche Skripte (package.json)
- `dev`: Entwicklungsmodus
- `build`: Produktions-Build
- `start`: Server mit `.next`-Build starten
- `lint`: ESLint prüfen
- `deploy`: Platzhalter für GitHub Pages Deployment (müsste angepasst werden)

---

## 🗺️ Zukünftige Erweiterungen
- Integration echter Datenquellen (Spiele, Teams, Statistiken)
- Live-Streaming & Chat via WebSocket
- Web3 / BONK-Token-Integration
- User-Management (Login, Rollen, Membership)
- SEO & Mehrsprachigkeit (i18n)
- Testing (Playwright / Testing Library)

---

## 📄 Lizenz
Falls nicht anders angegeben, empfiehlt sich die Verwendung einer **MIT-Lizenz**.  
Bitte prüfe bei externen Medien (Logos, Videos, Bilder, NFT-Beispiele) die Nutzungserlaubnis.

---

**Hinweis**  
Falls du möchtest, kann ich dir noch eine Anleitung für:  
- **Vercel Deployment**  
- **GitHub Actions Workflow**  
direkt hier ergänzen.
