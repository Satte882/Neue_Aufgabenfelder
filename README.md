# Neue Aufgabenfelder – TASKSHIFT

Eine lokale, statische Web-App zur Frage:

> **Welche Aufgaben kann eine Rolle mit KI künftig selbst übernehmen – und welche fachliche Verantwortung muss beim Spezialisten bleiben?**

Die App operationalisiert Befunde aus OpenAI Economic Research, Microsoft Work Trend Index 2026 und Microsofts Frontier Playbook zu einem transparenten Vorgehensmodell.

## Was die App kann

- Rolle und gewünschtes Geschäftsergebnis erfassen.
- Kandidaten für **Task Crossover** / neue Aufgabenfelder bewerten.
- Zwei getrennte Größen sichtbar machen:
  - **Expansion Potential**: Nutzen einer Aufgabenverschiebung.
  - **Human Boundary**: Stärke der menschlichen Urteils-/Freigabegrenze.
- Passenden AI-Arbeitsmodus ableiten: **Asking, Collaboration, Delegation, Exploration**.
- Ein Designmuster zuordnen: **Persona Acceleration, AI-Powered Process Redesign, AI-First Possibility**.
- Pro Aufgabe eine Pilothypothese, Freigabegrenze, KPI-Set und Scale Gate erzeugen.
- Aufgaben im Portfolio visualisieren.
- Ergebnis als Markdown exportieren oder über den Browser als PDF drucken.
- Alle Daten lokal im Browser speichern; keine API, kein Backend, keine Datenübertragung.

## Sofort starten

**Variante 1 – ohne Installation**

`index.html` direkt im Browser öffnen. Die App nutzt keine externen Abhängigkeiten.

**Variante 2 – lokaler Webserver**

```bash
python -m http.server 8000
```

Dann `http://localhost:8000` öffnen.

Beim ersten Start ist ein Demo-Portfolio für einen **Produktmanager bei einem Reiseveranstalter** geladen. Über „Zurücksetzen“ kann mit einer leeren Analyse begonnen werden.

## Vorgehensmodell in Kurzform

1. **Outcome setzen** – Geschäftsergebnis und Baseline definieren.
2. **Arbeit sichtbar machen** – Handoffs, Wartezeiten, Ausnahmen, Daten und Entscheidungsrechte erfassen.
3. **Task-Crossover-Kandidaten finden** – Aufgaben identifizieren, die heute nur wegen Funktionsgrenzen weitergereicht werden.
4. **Human Boundary festlegen** – Ausführung von Urteil, Entscheidung und formaler Freigabe trennen.
5. **AI-Arbeitsmodus designen** – Asking, Collaboration, Delegation oder Exploration.
6. **Mit realen Fällen pilotieren** – End-to-End-Wert statt Prompt-Qualität messen.
7. **Wiederholung prüfen** – Ein neues Aufgabenfeld entsteht erst, wenn die Aufgabe verlässlich in den Arbeitsalltag zurückkehrt.
8. **Kodifizieren und skalieren** – Qualitätsstandard, Leitplanken, Monitoring und Lessons Learned institutionalisieren.

Details: [docs/METHODOLOGY.md](docs/METHODOLOGY.md)

## Scoring – bewusst transparent

Das Scoring ist **keine empirisch validierte Prognose**, sondern eine Entscheidungsheuristik.

### Expansion Potential

| Kriterium | Gewicht |
| --- | ---: |
| Business Value | 24% |
| AI Leverage | 20% |
| Handoff Friction | 16% |
| Context Proximity | 16% |
| Recurrence | 14% |
| Data Readiness | 10% |

### Human Boundary

| Kriterium | Gewicht |
| --- | ---: |
| Judgment Stakes | 55% |
| Specialist Accountability | 45% |

Die App trennt damit bewusst zwei Fragen:

- **Lohnt es sich, die Aufgabe näher an die Rolle zu ziehen?**
- **Wer muss trotz KI die fachliche Entscheidung oder Freigabe behalten?**

## Forschungsbasis

Siehe [docs/EVIDENCE.md](docs/EVIDENCE.md). Kerngedanken:

- OpenAI: KI-Nutzung überschreitet Berufsgrenzen; manche dieser Tätigkeiten werden wiederkehrender Bestandteil des Jobs.
- OpenAI Jobs Transition Framework: technische Fähigkeit allein sagt nicht, ob ein Beruf verschwindet; menschliche Zentralität und Nachfrage sind eigenständige Dimensionen.
- Microsoft Work Trend Index: KI verschiebt Wert in Richtung Urteil, Qualitätskontrolle und Design von Arbeit.
- Microsofts eigene Transformation: Geschäftsergebnis zuerst, End-to-End-Workflow statt isolierter Task-Optimierung, Menschen und Lernschleifen in den Mittelpunkt.
- Frontier Playbook: Rollenbefähigung, Prozessredesign und AI-First-Neugestaltung sind unterschiedliche Transformationsmuster.

## Projektstruktur

```text
.
├── index.html
├── styles.css
├── model.js
├── app.js
├── package.json
├── tests/
│   └── model.test.js
└── docs/
    ├── METHODOLOGY.md
    ├── EVIDENCE.md
    └── ARCHITECTURE.md
```

## Qualität / Tests

```bash
npm run check
```

Prüft Syntax und Kernlogik des Scoring-Modells.

## Definition of Done

- [x] Vollständig nutzbare App ohne externe Abhängigkeiten.
- [x] Demo-Daten und leerer Arbeitsmodus.
- [x] Transparente Entscheidungslogik.
- [x] Portfolio-Visualisierung.
- [x] Pilotplan pro Aufgabe.
- [x] Markdown- und Print/PDF-Export.
- [x] Persistenz via `localStorage`.
- [x] Mobile Darstellung.
- [x] Methodik und Evidenz dokumentiert.
- [x] Automatisierte Kernlogik-Tests.
