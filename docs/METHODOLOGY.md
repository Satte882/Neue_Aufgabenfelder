# TASKSHIFT – Vorgehensmodell zur KI-gestützten Erweiterung von Aufgabenfeldern

## 1. Problemdefinition

Viele KI-Programme optimieren bestehende Tätigkeiten innerhalb bestehender Rollen. Die vorliegenden Forschungs- und Praxisquellen deuten auf eine weitergehende Veränderung: Mit KI können Menschen wiederholt Tätigkeiten übernehmen, die historisch anderen Berufen oder Funktionsbereichen zugeordnet waren. Die relevante Managementfrage wird damit nicht nur „Welche Aufgabe kann KI erledigen?“, sondern:

> **Welche Arbeit sollte künftig bei welcher Rolle liegen – und welche menschliche Verantwortung darf dabei nicht verschwimmen?**

TASKSHIFT ist ein operatives Vorgehensmodell für genau diese Frage.

## 2. Designprinzipien

### P1 – Geschäftsergebnis vor Technologie

Eine neue Aufgabenverteilung ist nur sinnvoll, wenn sie einen messbaren Geschäftseffekt adressiert. Der Startpunkt ist daher ein Outcome (z. B. Durchlaufzeit, Entscheidungsqualität, Conversion, Risiko, Kundenwert), nicht ein KI-Tool.

### P2 – End-to-End vor Einzelaufgabe

Lokale Beschleunigung kann den nächsten Engpass nur vergrößern. Deshalb wird die Aufgabe im Kontext von Handoffs, Daten, Ausnahmen und Entscheidungsrechten bewertet.

### P3 – Task Crossover ist ein Kandidat, kein Freifahrtschein

Dass KI eine berufsfremde Aufgabe technisch unterstützt, bedeutet nicht automatisch, dass die Rolle sie organisatorisch oder regulatorisch vollständig übernehmen sollte.

### P4 – Ausführung und Verantwortung getrennt modellieren

Eine Rolle kann Analyse, Entwurf oder Vorprüfung selbst übernehmen, während Entscheidung oder formale Freigabe beim Spezialisten bleibt. Diese Trennung ist der Kern der **Human Boundary**.

### P5 – Wiederholung macht aus Experimenten neue Arbeit

Ein einmaliger Erfolg ist noch kein erweitertes Aufgabenfeld. Erst wenn eine Tätigkeit verlässlich wiederkehrt und in einen stabilen Workflow übergeht, sollte sie in Rolle, Prozess und Governance verankert werden.

### P6 – Capability Add statt nur Effizienz

Der relevante Wert kann darin liegen, dass eine Rolle neue Szenarien analysiert, mehr Optionen prüft oder Arbeit selbst abschließt, die vorher aus Kapazitäts- oder Handoff-Gründen nicht möglich war.

### P7 – Lernen muss institutionell werden

Skalierung braucht dokumentierte Qualitätsstandards, Verantwortlichkeiten, Evals, Monitoring und einen Mechanismus, mit dem lokale Lernerfahrungen in den Standard zurückfließen.

---

## 3. Acht Schritte

### Schritt 0 – Outcome setzen

**Fragen**

- Welches Geschäftsergebnis soll sich verändern?
- Wo liegt heute die Baseline?
- Welche Qualitäts- oder Risikogrenze darf nicht schlechter werden?

**Output**: Outcome Statement + Baseline-KPI.

### Schritt 1 – Arbeit sichtbar machen

Nicht mit Organigramm oder Sollprozess starten, sondern mit tatsächlich ausgeführter Arbeit.

Erfassen:

- Handoffs und Wartezeiten
- Rückfragen / Schleifen
- Datenquellen
- Ausnahmen
- Entscheidungs- und Freigaberechte
- manuelle Reconciliation

**Output**: schlanke End-to-End-Map.

### Schritt 2 – Task-Crossover-Kandidaten identifizieren

Gesucht werden Tätigkeiten, die heute an Spezialisten übergeben werden, obwohl die Ausgangsrolle:

- das Problem zuerst erkennt,
- bereits viel Kontext besitzt,
- regelmäßig auf die Leistung angewiesen ist,
- durch den Handoff relevante Verzögerung oder Informationsverlust erlebt.

**Output**: Kandidatenliste mit Herkunftsbereich.

### Schritt 3 – Expansion Potential bewerten

Die App nutzt sechs Kriterien auf einer Skala 0–4:

| Kriterium | Leitfrage | Gewicht |
| --- | --- | ---: |
| Business Value | Verbessert die Verschiebung das definierte Outcome? | 24% |
| AI Leverage | Kann KI substanzielle Analyse/Erstellung/Prüfung übernehmen? | 20% |
| Handoff Friction | Erzeugt die heutige Übergabe Wartezeit/Rückfragen? | 16% |
| Context Proximity | Liegt Problemkontext bereits bei der Ausgangsrolle? | 16% |
| Recurrence | Tritt die Aufgabe wiederkehrend auf? | 14% |
| Data Readiness | Sind Quellen ausreichend verfügbar und nutzbar? | 10% |

Formel:

```text
Expansion Potential = Σ(Kriterium_0..4 × Gewicht) / 4 × 100
```

Die Gewichte sind **Designheuristik**, nicht aus den Quellen statistisch geschätzt.

### Schritt 4 – Human Boundary bewerten

Zwei getrennte Dimensionen:

| Kriterium | Leitfrage | Gewicht |
| --- | --- | ---: |
| Judgment Stakes | Wie schwer wiegen Fehlurteile, Ausnahmen oder irreversible Entscheidungen? | 55% |
| Specialist Accountability | Wie stark ist formale Fachverantwortung / Freigabe zwingend? | 45% |

Formel:

```text
Human Boundary = Σ(Kriterium_0..4 × Gewicht) / 4 × 100
```

Wichtig: Eine hohe Human Boundary spricht **nicht gegen** die Aufgabenverschiebung. Sie spricht gegen eine unkontrollierte Verschiebung der Verantwortung.

### Schritt 5 – AI-Arbeitsmodus designen

Angelehnt an den Microsoft Work Trend Index:

- **Asking** – punktuelle, kleine Unterstützung.
- **Collaboration** – iteratives Arbeiten mit sichtbarem menschlichen Urteil.
- **Delegation** – Mensch setzt Ziel/Qualitätsbar, KI führt wiederkehrende Arbeit aus.
- **Exploration** – Fähigkeit und Grenze vor Regelbetrieb testen.

### Schritt 6 – Mit realen Fällen pilotieren

Empfohlene Struktur:

1. 2–4 Wochen, überschaubare reale Fälle.
2. Vorher Baseline von Durchlaufzeit, Bearbeitungszeit, Handoffs und Nacharbeit erfassen.
3. Fachfreigabe explizit benennen.
4. Qualitätsfehler nach Schwere klassifizieren.
5. End-to-End-KPI messen; nicht nur Prompt- oder Modellqualität.

Typische Messgrößen:

- End-to-End-Durchlaufzeit
- Zahl der Handoffs / Rückfragen
- Zeit bis zur entscheidungsfähigen Vorlage
- Nacharbeit / Korrekturquote
- First-pass-Freigabequote

### Schritt 7 – Recurrence Gate

Ein neues Aufgabenfeld wird erst dann strukturell relevant, wenn die Tätigkeit:

- wiederholt auftritt,
- von der Rolle wiederholt mit KI bearbeitet wird,
- einen stabilen Qualitätsstandard erreicht,
- nicht bei jedem Fall ein Sonderprojekt bleibt.

**Entscheidung**: einmaliger Use Case vs. neuer Bestandteil der Rolle.

### Schritt 8 – Kodifizieren und skalieren

Skalierung bedeutet:

- Freigabegrenzen dokumentieren
- Datenquellen und Zugriffsrechte standardisieren
- Qualitätsstandard / Eval-Set festlegen
- Monitoring und Auditierbarkeit schaffen
- Learnings in den Workflow zurückspielen
- Rollenbeschreibung und ggf. Kompetenzmodell anpassen

---

## 4. Entscheidungslogik der App

| Expansion Potential | Human Boundary | Arbeitsentscheidung |
| ---: | ---: | --- |
| ≥ 70 | < 40 | **Übernehmen + pilotieren** – direkte Rollenerweiterung innerhalb definierter Leitplanken |
| ≥ 70 | 40–74 | **Übernehmen + Fachfreigabe** – Ausführung wandert, Entscheidung/Freigabe bleibt |
| ≥ 55 | ≥ 75 | **Vorbereiten, nicht freigeben** – hoher Nutzen, aber starke Verantwortungsgrenze |
| 50–69 | beliebig | **Gezielt explorieren** – reale Fälle nutzen, Grenze schärfen |
| < 50 | beliebig | **Handoff vorerst beibehalten** |

Die Schwellen sind bewusst einfach und editierbar im Code. Sie sollen eine Managementdiskussion strukturieren, keine mathematische Gewissheit erzeugen.

## 5. Drei Transformationsmuster

### Persona Acceleration

Die Ausgangsrolle übernimmt einen begrenzten bisher fremden Arbeitsschritt selbst. Typisch: Recherche, Analyse, Entwurf, Vorprüfung, Fehlerdiagnose.

### AI-Powered Process Redesign

Die Aufgabe ist Teil eines Handoff-lastigen, wiederkehrenden End-to-End-Prozesses. Dann ist es meist besser, nicht nur den einzelnen Handoff zu automatisieren, sondern Prozess, Entscheidungsrechte und Datenbasis neu zu schneiden.

### AI-First Possibility

KI ermöglicht einen Output oder ein Leistungsniveau, das vorher wegen Aufwand oder Komplexität unpraktikabel war, z. B. mehr Szenarien, kontinuierliche Analyse oder individualisierte Leistung.

---

## 6. Abgrenzung

TASKSHIFT ist **kein**:

- arbeitsmarktökonomisches Prognosemodell,
- Ersatz für O*NET-basierte Berufsklassifikation,
- rechtliches oder regulatorisches Freigabewerkzeug,
- Modellbenchmark,
- Agenten-Framework.

Es ist ein **Work-Design- und Entscheidungswerkzeug** für die betriebliche Frage, wie KI Aufgabenverteilung verändert.
