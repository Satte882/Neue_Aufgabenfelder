# TASKSHIFT Design System

Dieses Dokument beschreibt die verbindlichen UI-Regeln für neue oder geänderte Oberflächen in TASKSHIFT.
Der gemeinsame Designkern ist bewusst mit dem KI-UseCase-Radar synchronisiert; TASKSHIFT-spezifische Regeln sind separat gekennzeichnet.

## Zielbild

- Ruhige, hochwertige B2B-Arbeitsoberfläche mit klarer Informationshierarchie.
- Neutraler Graphit-/Schwarzraum mit kühlem Eisblau und Silber als Akzent.
- Sichtbare räumliche Tiefe und Atmosphäre, ohne Effekthascherei.
- Daten bleiben schneller erfassbar als die visuelle Inszenierung.
- Dunkel ist der einzige aktive Modus; Tokens müssen einen späteren Hellmodus erlauben.

## Gestaltungsprinzipien

1. Erst Aufgabe und Informationshierarchie, dann Oberfläche.
2. Flächen durch Abstand, Linien und Tonwert trennen; nicht alles in Karten setzen.
3. Primäraktionen deutlich, Nebenaktionen ruhig und reversibel gestalten.
4. Status immer zusätzlich durch Text vermitteln, nie ausschließlich durch Farbe.
5. Dichte an Scan-Aufgabe und Datenmenge ausrichten, nicht an Showcase-Screenshots.

## Tokens

- Farben ausschließlich über semantische CSS Custom Properties definieren.
- Keine beliebigen Hex-, RGB- oder OKLCH-Werte direkt in Komponenten ergänzen.
- Surface-Stufen: `surface-0` Hintergrund, `surface-1` Shell, `surface-2` Kontrolle,
  `surface-3` aktiver oder angehobener Zustand.
- Linien: `line-soft`, `line`, `line-strong`.
- Text: `ink`, `muted`; Akzente: `ice`, `ice-strong`, `silver`.
- Semantik: `success`, `warning`, `danger`.
- Radien: klein 7 px, mittel 11 px, groß 16 px.
- Schatten: Stufe 1 Kante, Stufe 2 Bedienfläche, Stufe 3 Hauptoberfläche.

## Typografie

- Bestehenden System-Font-Stack beibehalten.
- Überschriften mit enger Laufweite und klarer Gewichtung, nicht ultrafett.
- Fließtext kompakt und gut lesbar; keine dekorativen Versalien.
- Versalien nur für kurze Kicker, Labels und Tabellenköpfe einsetzen.
- Zahlen und Termine tabellarisch setzen, wenn sie untereinander verglichen werden.
- Inter, Poppins oder eine neue Webfont nicht ohne eigene Designentscheidung einführen.

## Layout

- Der Seitenrahmen trägt die Atmosphäre; Inhalte benötigen nicht jeweils eine Karte.
- Seitentitel, Zweck und Aktionen bilden eine klare Kopfzone.
- Filter bleiben sichtbar und stehen direkt vor der Ergebnisliste.
- Desktop nutzt Breite für eine Filterzeile; Tablet darf kontrolliert umbrechen.
- Mobile stapelt Bedienelemente und erlaubt horizontales Scrollen großer Datentabellen.
- Inhaltsbreite und Abstände müssen auch bei 5 und bei 60 Zeilen funktionieren.

### Arbeits- und Formularflächen

- Scan-/Listenseiten bleiben möglichst flach. Tabellen, Kennzahlen und Register werden primär über Abstand, Linien und Tonwert gegliedert.
- Arbeits- und Formularseiten dürfen zusammengehörige Eingaben, Entscheidungen oder Bewertungsblöcke als gemeinsame funktionale Surface gruppieren.
- Eine solche Surface ist keine dekorative Karte: Sie muss eine fachliche Einheit sichtbar machen, z. B. Eingabeblock, Gate, Entscheidung oder Bewertungsdimension.
- Funktionale Arbeitsflächen verwenden bevorzugt `surface-1` oder `surface-2`, `line` bzw. `line-strong` und höchstens `shadow-1`.
- Eingabefelder müssen sich im Ruhezustand klar von ihrer umgebenden Arbeitsfläche unterscheiden. Der Defaultzustand darf nicht erst durch Hover oder Fokus erkennbar werden.
- Verschachtelte Kartenhierarchien bleiben verboten. Innerhalb einer Arbeitsfläche werden Untergruppen nur dann erneut eingefasst, wenn die Gruppierung eine eigene fachliche Bedeutung besitzt.

## Progressive Disclosure

- Der verbindliche Progressive-Disclosure-Primitive ist natives `<details>` mit einem direkten `<summary>`. Für normales Ein-/Ausblenden wird kein eigenes ARIA-State-System ergänzt.
- Disclosure ist nur für sekundäre oder ergänzende Information zulässig, die ohne Verlust der aktuellen Arbeitsfähigkeit zunächst verborgen sein darf.
- Aktuelle Entscheidung, Blocker, primäre nächste Aktion, Fehler sowie unmittelbar erforderliche Eingaben oder Aktionen dürfen nicht hinter Disclosure verschwinden.
- Tabs sind ausschließlich für echte gleichrangige Ansichten bzw. Peer-Sichten vorgesehen; sie sind kein generischer Ersatz für `<details>/<summary>`.
- Der `<summary>`-Text benennt konkret, welche Information geöffnet wird.
- Der Offen-/Geschlossen-Zustand muss semantisch bzw. zusätzlich zur Farbe erkennbar bleiben.
- Disclosure entfernt auf Tablet oder Mobile keine Information.
- Für den Primitive ist keine Animation erforderlich. Ergänzt eine visuelle Variante Bewegung, gilt zwingend die globale `prefers-reduced-motion`-Regel.

## Datenlisten

- Tabellen bleiben Tabellen, wenn zeilenweises Überfliegen die Hauptaufgabe ist.
- Tabellenkopf bleibt beim vertikalen Scrollen sichtbar, wenn die Liste lang genug ist.
- Zeilen sind mittel-kompakt; Hover darf keine Lageverschiebung verursachen.
- Primärinformation beginnt jede Zeile; Metadaten sind sichtbar zurückgenommen.
- Spalten ohne unmittelbaren Scan-Wert gehören nicht in die Übersicht.

## Status und Badges

- Badge-Flächen sind kompakt, leicht eckig und semantisch getönt.
- Keine leuchtenden Pillen und keine frei erfundenen Statusfarben.
- Eisblau steht für aktive/strukturelle Zustände, Grün für bereit/positiv, Amber für Prüfung/Warnung, Rot für blockiert/kritisch.
- Status bleibt zusätzlich als Text erkennbar.

## Effektbudget

- Maximal drei Elevation-Stufen pro Ansicht.
- Erlaubt: statisches atmosphärisches Licht, feine Kanten, innere Highlights,
  kurze Hover-, Fokus-, Auswahl- und Statusübergänge.
- Animationen bevorzugen `opacity` und `transform`; Layout darf nicht springen.
- Keine dauerlaufenden Animationen, Partikelfelder, Canvas- oder WebGL-Effekte.
- Kein Effekt darf Textkontrast, Scangeschwindigkeit oder Klickziel verschlechtern.
- `prefers-reduced-motion` ist verpflichtend.

## Harte Verbote

- Kein zentrierter Hero aus Überschrift, Unterzeile und CTA.
- Kein Raster aus drei identischen Feature-Karten.
- Kein lila-blauer Verlauf als Markenabkürzung für „KI“.
- Keine gläsernen Karten auf jeder Ebene.
- Keine willkürlichen Farben, Schatten, Radien oder Icon-Stile.
- Keine neuen Bedienelemente als Attrappe für spätere Features.

## Accessibility und Stabilität

- Sichtbarer Fokus für alle interaktiven Elemente.
- Semantische Überschriften, Labels, Tabellenköpfe und Zeitangaben verwenden.
- Kontrast mindestens WCAG AA für normalen Text.
- Touch-Ziele in mobilen Ansichten mindestens etwa 42 px hoch.
- Bestehende Interaktionslogik und Datenhaltung bei rein visuellen Arbeiten bewahren.

## TASKSHIFT-spezifische Anwendung

- TASKSHIFT bleibt als Standalone-App technisch unabhängig vom KI-UseCase-Radar.
- Die Arbeitsnavigation besteht aus Peer-Ansichten; sie darf nicht wie ein Prozess-Lifecycle inszeniert werden.
- Bewertungsblöcke, Readiness, Empfehlung und Aufgaben-Szenarien sind funktionale Arbeitsflächen und dürfen deshalb klar umrandet und tonal voneinander getrennt sein.
- Die stärkere Kontrastierung aus TASKSHIFT v1.6 ist Referenz für Arbeits- und Formularflächen: klare Surface-Hierarchie, sichtbare Eingabefelder, sparsame Schatten.
- Methodik, Scoring und Empfehlung dürfen durch visuelle Änderungen nicht verändert oder implizit neu gewichtet werden.

## Abnahme

- Wirkt die Ansicht klar hochwertiger und weniger generisch?
- Ist die fachliche Gruppierung beim Überfliegen sofort erkennbar?
- Sind Eingabefelder bereits im Ruhezustand klar als Bedienelemente sichtbar?
- Bleiben Effekte stabil und verdecken keine Information?
- Funktioniert die Ansicht auf Desktop, Tablet und Mobile?
- Sind bestehende fachliche Funktionen vollständig erhalten?
