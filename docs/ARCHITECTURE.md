# Architektur

## Ziel

Die App soll ohne Infrastruktur, Konto oder API direkt vorführbar sein. Deshalb wurde bewusst eine **statische Single-Page-Web-App ohne Framework und ohne Build-Schritt** gewählt.

## Komponenten

- `index.html` – UI-Struktur und statische Evidenzdarstellung.
- `styles.css` – responsive Darstellung und Print-Layout.
- `model.js` – reine Entscheidungslogik, Scoring, Empfehlungen, Pilotplan, Markdown-Export.
- `app.js` – Browserzustand, Events, Rendering und `localStorage`.
- `tests/model.test.js` – Kernlogik mit Node `assert`.

## Datenfluss

```text
Eingabe im Browser
   ↓
app.js
   ↓
model.js  → Scores / Empfehlung / Pilotplan
   ↓
UI + localStorage + Markdown/Print Export
```

## Datenschutz

- Keine Server-Komponente.
- Keine externe API.
- Keine Telemetrie.
- Keine Cookies.
- Alle Eingaben bleiben im lokalen Browser (`localStorage`).
- Export erfolgt clientseitig als Datei oder Browser-Druck.

## Warum kein LLM in der App?

Das Produktziel ist zunächst **Work Design**, nicht Textgenerierung. Ein LLM würde:

- zusätzliche Infrastruktur und Schlüsselverwaltung erfordern,
- die deterministische Vergleichbarkeit des Portfolios schwächen,
- das Kernproblem (Verantwortungsgrenze und Arbeitsdesign) unnötig mit Modellqualität vermischen.

Eine spätere Erweiterung könnte Kandidaten aus Prozessbeschreibungen vorschlagen. Die finale Entscheidung sollte weiterhin durch die explizite Matrix laufen.

## Deployment

Die App funktioniert direkt über `file://` und über jeden statischen Webserver. Dadurch ist sie kompatibel mit GitHub Pages, internem Webhosting oder einem einfachen lokalen HTTP-Server, ohne Codeänderung.
