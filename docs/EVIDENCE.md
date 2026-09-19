# Evidenzbasis

## Einordnung

Die App trennt bewusst zwischen:

1. **empirischen Befunden** aus den bereitgestellten OpenAI- und Microsoft-Quellen,
2. **Praxisframeworks** aus Microsofts eigener Transformation,
3. **TASKSHIFT-Synthese** (Scoring, Schwellen, UI-Logik), die nicht als wissenschaftlich validiertes Modell ausgegeben wird.

## Lokale Primärquellen

Die vollständigen Quell-Snapshots für fachliche Reviews liegen unter [`docs/sources/`](sources/README.md). Externe Links bleiben zusätzlich als Herkunftsnachweis erhalten.

## Quellen und Designimplikationen

| Quelle | Befund | Bedeutung für TASKSHIFT |
| --- | --- | --- |
| OpenAI, *How AI is expanding what people do at work* (27.07.2026) | 16,8% der arbeitsbezogenen und 43,5% der berufsspezifischen nicht-generischen Nachrichten betreffen Tätigkeiten außerhalb des eigenen Berufs. Finanzberechnungen und technische Fehlerbehebung tauchen in allen anderen untersuchten Gruppen häufig als berufsfremde Aufgaben auf. | Task Crossover als reale Quelle neuer Aufgabenfelder behandeln; Kandidaten nach Herkunftsbereich sichtbar machen. |
| OpenAI, *How workers are unlocking new ways of working* (16.09.2026) | Bei rund 6.200 durchgängig beobachteten Arbeitenden stieg der Anteil zuvor genutzter Cross-occupation-Tasks an der berufsspezifischen KI-Nutzung von 13,1% auf 25,9%. Follow-up: 23,6% Rückkehr zu zuvor genutzter berufsfremder Aufgabe vs. 8,4% bei Vergleichsgruppe ohne vorherige Nutzung. | Erwartete Wiederholung vor dem Pilot nur als Hypothese behandeln; **Recurrence Gate** erst mit beobachteten realen Fällen nach dem Pilot prüfen. |
| OpenAI, *Modeling an AI jobs transition* (25.04.2026) | Framework trennt drei Fragen: technische KI-Fähigkeit, menschliche Zentralität für Lieferung/Überwachung/Verantwortung und Nachfrageeffekt. 24% der betrachteten US-Jobs werden als wahrscheinlich zu reorganisieren eingeordnet; Kategorien sind ausdrücklich keine Jobverlustprognosen. | Technische Automatisierbarkeit und Human Boundary separat modellieren; Rollen-Szenario ausdrücklich als Szenario, nicht Forecast. |
| Microsoft, *2026 Work Trend Index* | 49% der analysierten Copilot-Konversationen unterstützen Analyse/Reasoning/Deciding. 50% nennen Qualitätskontrolle, 46% kritisches Denken als wichtiger werdende Fähigkeiten. 86% behandeln KI-Output als Ausgangspunkt und bleiben für das Denken verantwortlich. | Human Boundary, Review und Urteil im Modell sichtbar halten; AI-Modus nicht mit vollständiger Autonomie gleichsetzen. |
| Microsoft, *2026 Work Trend Index* | Vier Arbeitsmodi: Delegation, Collaboration, Asking, Exploration. | Diese vier Modi als praktische Designoption pro Aufgabe verwenden. |
| Microsoft, *What we’ve learned from Microsoft’s own AI transformation* (17.09.2026) | Fünf wiederkehrende Learnings: Geschäftsergebnis zuerst; gesamten Workflow neu gestalten; Mitarbeitende ins Zentrum; Fähigkeiten erweitern; lernende Organisation aufbauen. | Reihenfolge des Vorgehensmodells: Outcome → Workflow → Rollen/Boundary → Pilot → Lernen/Skalieren. |
| Microsoft, *Frontier Playbook* (2026) | Fünf Elemente: Business Ambition, Diffusion Engine, People, Advantage & Controls, Security. Drei Transformationsrezepte: Persona Acceleration, AI-Powered Process Redesign, AI-First Possibility. | Scoring nie isoliert skalieren; Ergebnis in Operating Model, People, Controls und Security einordnen. Drei Designmuster in der App. |

## Quellenlinks

- OpenAI – How AI is expanding what people do at work: https://openai.com/de-DE/index/how-ai-is-expanding-what-people-do-at-work/
- OpenAI – How workers are unlocking new ways of working: https://openai.com/index/unlocking-new-ways-of-working/
- OpenAI – Modeling an AI jobs transition: https://openai.com/index/modeling-ai-jobs-transition/
- Microsoft – 2026 Work Trend Index: https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization
- Microsoft – What we’ve learned from Microsoft’s own AI transformation: https://blogs.microsoft.com/blog/2026/09/17/what-weve-learned-from-microsofts-own-ai-transformation/
- Microsoft – Frontier Playbook: https://aka.ms/MicrosoftFrontierPlaybook

## Methodische Vorsicht

- Die OpenAI-Nutzungsdaten zeigen beobachtete KI-Nutzung und Aufgabenklassifikation; sie beweisen nicht, dass Organisationen die formalen Rollen bereits geändert haben.
- Die Microsoft-Befunde enthalten sowohl Telemetrie als auch Selbstbericht. Im Work Trend Index werden statistische Zusammenhänge zu organisationalen Faktoren ausdrücklich nicht als Kausalität ausgewiesen.
- Microsofts Transformationsbeispiele sind interne Fallbeispiele und keine allgemeingültigen Benchmarks.
- Deshalb werden in TASKSHIFT nur die **Strukturprinzipien** übernommen. Konkrete Score-Gewichte und Schwellen sind eine offene, dokumentierte Heuristik.
