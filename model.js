(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.TaskShiftModel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const VERSION = '1.3.0';

  const WEIGHTS = Object.freeze({
    businessValue: 0.24,
    handoffFriction: 0.16,
    contextProximity: 0.16,
    aiLeverage: 0.20,
    recurrence: 0.14,
    dataReadiness: 0.10,
  });

  const BOUNDARY_WEIGHTS = Object.freeze({
    judgmentStakes: 0.55,
    specialistAccountability: 0.45,
  });

  const SOURCE_AREAS = [
    'Marketing',
    'Sales',
    'Finance',
    'Legal',
    'IT / Engineering',
    'Customer Experience',
    'HR',
    'Operations',
    'Sonstiges',
  ];

  const DEMO = Object.freeze({
    profile: {
      role: 'Produktmanager Reiseveranstalter',
      outcome: 'Schnellere Entscheidungen bei gleichbleibender fachlicher Qualität und klaren Freigabegrenzen',
      organization: 'mittel',
      readiness: {
        rules: true,
        data: true,
        metrics: true,
        manager: false,
      },
    },
    tasks: [
      {
        id: 'demo-contract',
        name: 'Hotelangebote und Vertragskonditionen vorprüfen',
        sourceArea: 'Legal',
        approvalOwner: 'Einkauf / Legal',
        notes: 'KI extrahiert und vergleicht Konditionen; finale Vertragsfreigabe bleibt beim Spezialisten.',
        businessValue: 4,
        handoffFriction: 4,
        contextProximity: 4,
        aiLeverage: 4,
        recurrence: 4,
        dataReadiness: 3,
        judgmentStakes: 3,
        specialistAccountability: 4,
      },
      {
        id: 'demo-pricing',
        name: 'Preispositionierung und Wettbewerbsvergleich vorbereiten',
        sourceArea: 'Sales',
        approvalOwner: 'Revenue / Vertrieb',
        notes: 'Produktmanager erstellt mit KI eine belastbare Entscheidungsgrundlage; Preisentscheidung bleibt im definierten Entscheidungsrecht.',
        businessValue: 4,
        handoffFriction: 3,
        contextProximity: 4,
        aiLeverage: 4,
        recurrence: 3,
        dataReadiness: 3,
        judgmentStakes: 3,
        specialistAccountability: 3,
      },
      {
        id: 'demo-invoice',
        name: 'Rechnungsabweichungen vorprüfen und begründen',
        sourceArea: 'Finance',
        approvalOwner: 'Finance',
        notes: 'KI markiert Abweichungen, zieht Vertragsbezug heran und formuliert Klärpunkte; Buchungs- und Zahlungsfreigabe bleibt bei Finance.',
        businessValue: 3,
        handoffFriction: 3,
        contextProximity: 3,
        aiLeverage: 4,
        recurrence: 4,
        dataReadiness: 3,
        judgmentStakes: 3,
        specialistAccountability: 4,
      },
      {
        id: 'demo-it',
        name: 'Buchungssystem-Fehlerbild analysieren und eingrenzen',
        sourceArea: 'IT / Engineering',
        approvalOwner: 'IT',
        notes: 'Produktmanager strukturiert Logs, reproduziert Fehler und grenzt Ursachen mit KI ein; produktive Systemänderung bleibt bei IT.',
        businessValue: 3,
        handoffFriction: 4,
        contextProximity: 4,
        aiLeverage: 3,
        recurrence: 2,
        dataReadiness: 2,
        judgmentStakes: 2,
        specialistAccountability: 4,
      },
    ],
  });

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, Number(value) || 0));
  }

  function normalizeLevel(value) {
    return clamp(value, 0, 4);
  }

  function round(value) {
    return Math.round(value);
  }

  function expansionPotential(task) {
    let weighted = 0;
    for (const [key, weight] of Object.entries(WEIGHTS)) {
      weighted += normalizeLevel(task[key]) * weight;
    }
    return round((weighted / 4) * 100);
  }

  function humanBoundary(task) {
    let weighted = 0;
    for (const [key, weight] of Object.entries(BOUNDARY_WEIGHTS)) {
      weighted += normalizeLevel(task[key]) * weight;
    }
    return round((weighted / 4) * 100);
  }

  function readinessScore(readiness) {
    const values = ['rules', 'data', 'metrics', 'manager'].map((k) => Boolean(readiness && readiness[k]));
    return round((values.filter(Boolean).length / values.length) * 100);
  }

  function recommendation(task) {
    const potential = expansionPotential(task);
    const boundary = humanBoundary(task);

    if (boundary >= 75 && potential >= 55) {
      return {
        key: 'prepare-only',
        label: 'Vorbereiten, nicht freigeben',
        tone: 'guarded',
        rationale: 'Hoher fachlicher oder regulatorischer Verantwortungsanteil. Die Rolle kann Analyse und Vorbereitung übernehmen; Entscheidung und Freigabe bleiben beim Spezialisten.',
      };
    }
    if (potential >= 70 && boundary < 40) {
      return {
        key: 'own',
        label: 'Übernehmen + pilotieren',
        tone: 'strong',
        rationale: 'Hoher Erweiterungsnutzen bei überschaubarer Verantwortungsgrenze. Die Aufgabe ist ein guter Kandidat für eine direkte Rollenerweiterung innerhalb definierter Leitplanken.',
      };
    }
    if (potential >= 70) {
      return {
        key: 'own-with-approval',
        label: 'Übernehmen + Fachfreigabe',
        tone: 'strong',
        rationale: 'Hoher Erweiterungsnutzen, aber relevante fachliche Verantwortung. Durchführung kann in die Rolle wandern; Freigabe bleibt beim benannten Spezialisten.',
      };
    }
    if (potential >= 50) {
      return {
        key: 'explore',
        label: 'Gezielt explorieren',
        tone: 'medium',
        rationale: 'Das Potenzial ist noch nicht eindeutig. Mit realen Fällen testen, wo die Grenze zwischen eigener Durchführung, KI-Unterstützung und Spezialisten-Handoff liegt.',
      };
    }
    return {
      key: 'keep-handoff',
      label: 'Handoff vorerst beibehalten',
      tone: 'low',
      rationale: 'Der erwartete Nutzen einer Aufgabenverschiebung ist aktuell zu gering oder die Voraussetzungen fehlen. Erst Prozessfriktion, Datenlage oder KI-Eignung verbessern.',
    };
  }

  function aiMode(task) {
    const ai = normalizeLevel(task.aiLeverage);
    const recurrence = normalizeLevel(task.recurrence);
    const data = normalizeLevel(task.dataReadiness);
    const boundary = humanBoundary(task);

    if (data <= 1 || ai <= 1) {
      return { key: 'exploration', label: 'Exploration', description: 'Fähigkeit und Grenzen an realen Fällen testen, bevor sie in den Regelprozess kommt.' };
    }
    if (boundary >= 60) {
      return { key: 'collaboration', label: 'Collaboration', description: 'Mensch und KI arbeiten iterativ; fachliches Urteil und Freigabe bleiben sichtbar beim Menschen.' };
    }
    if (ai >= 3 && recurrence >= 3) {
      return { key: 'delegation', label: 'Delegation', description: 'Mensch setzt Ziel und Qualitätsbar; KI führt einen klar umrissenen, wiederkehrenden Arbeitsschritt aus.' };
    }
    if (recurrence <= 1) {
      return { key: 'asking', label: 'Asking', description: 'Punktuelle Unterstützung für einzelne Fragen oder kleine Arbeitsschritte.' };
    }
    return { key: 'collaboration', label: 'Collaboration', description: 'Gemeinsames Bearbeiten mit mehreren Iterationen und menschlicher Qualitätskontrolle.' };
  }

  function transformationRecipe(task) {
    const friction = normalizeLevel(task.handoffFriction);
    const recurrence = normalizeLevel(task.recurrence);
    const ai = normalizeLevel(task.aiLeverage);
    const proximity = normalizeLevel(task.contextProximity);

    if (friction >= 3 && recurrence >= 3 && proximity >= 2) {
      return {
        key: 'process-redesign',
        label: 'AI-Powered Process Redesign',
        description: 'Nicht nur den Handoff beschleunigen: End-to-End-Ablauf, Entscheidungsrechte und Datenfluss neu schneiden.',
      };
    }
    if (ai >= 4 && recurrence <= 2) {
      return {
        key: 'ai-first',
        label: 'AI-First Possibility',
        description: 'Prüfen, ob durch KI ein neuer Output oder ein neuer Arbeitsmodus möglich wird, statt nur den alten Ablauf zu beschleunigen.',
      };
    }
    return {
      key: 'persona',
      label: 'Persona Acceleration',
      description: 'Die konkrete Rolle mit KI befähigen, einen bisher weitergereichten Arbeitsschritt selbst vorzubereiten oder auszuführen.',
    };
  }

  function pilotPlan(task, profile) {
    const rec = recommendation(task);
    const mode = aiMode(task);
    const recipe = transformationRecipe(task);
    const owner = (task.approvalOwner || '').trim() || 'zuständiger Spezialist';
    const role = (profile && profile.role || '').trim() || 'die Rolle';

    const approval = rec.key === 'own'
      ? `Die Rolle „${role}“ darf innerhalb dokumentierter Leitplanken selbst abschließen; Ausnahmen eskalieren.`
      : `Analyse und Vorbereitung bei „${role}“, fachliche Entscheidung/Freigabe bei ${owner}.`;

    let hypothesis;
    if (rec.key === 'own') {
      hypothesis = `Wenn „${role}“ die Aufgabe „${task.name}“ mit KI innerhalb definierter Leitplanken selbst übernimmt, reduzieren sich Handoffs und Durchlaufzeit, ohne dass Qualität oder Kontrollanforderungen schlechter werden.`;
    } else if (rec.key === 'explore') {
      hypothesis = `Wenn „${role}“ die Aufgabe „${task.name}“ in realen Fällen mit KI testet, lässt sich belastbar bestimmen, welche Arbeit künftig selbst übernommen werden kann und wo eine Fachfreigabe erforderlich bleibt.`;
    } else if (rec.key === 'keep-handoff') {
      hypothesis = `Ein Pilot für „${task.name}“ ist erst sinnvoll, wenn Datenlage, KI-Eignung oder Prozessfriktion ausreichend verbessert wurden.`;
    } else {
      hypothesis = `Wenn „${role}“ Analyse und Vorbereitung für „${task.name}“ mit KI selbst übernimmt und die Fachfreigabe bei ${owner} bleibt, reduzieren sich Handoffs und Durchlaufzeit, ohne die fachliche Verantwortungsgrenze aufzuweichen.`;
    }

    return {
      hypothesis,
      scope: '2–4 Wochen mit realen Fällen; zunächst klein genug, dass jeder Fehler nachvollziehbar bleibt.',
      baseline: 'Vor Start aktuelle Durchlaufzeit, aktive Bearbeitungszeit, Handoffs und Nacharbeit erfassen.',
      mode: `${mode.label}: ${mode.description}`,
      humanBoundary: approval,
      metrics: [
        'End-to-End-Durchlaufzeit',
        'Anzahl der Handoffs / Rückfragen',
        'Nacharbeit oder Korrekturquote',
        'Fachliche Freigabequote beim ersten Review',
        'Zeit bis zur entscheidungsfähigen Vorlage',
      ],
      gate: 'Skalieren erst, wenn Business-KPI messbar besser wird und Qualitäts-/Risikoguardrails stabil bleiben. Sonst Scope anpassen oder Handoff beibehalten.',
      recipe: `${recipe.label}: ${recipe.description}`,
    };
  }

  function roleTransition(tasks, demandPotential) {
    if (!tasks || tasks.length === 0) return { key: 'unknown', label: 'Noch nicht ableitbar', description: 'Mindestens eine Aufgabe bewerten.' };
    const avgAi = tasks.reduce((s, t) => s + normalizeLevel(t.aiLeverage), 0) / tasks.length;
    const avgBoundary = tasks.reduce((s, t) => s + humanBoundary(t), 0) / tasks.length;
    const demand = normalizeLevel(demandPotential == null ? 2 : demandPotential);

    if (avgAi < 1.5) return { key: 'less-change', label: 'Weniger unmittelbare Veränderung', description: 'Die betrachteten Kernaufgaben zeigen derzeit geringe KI-Hebelwirkung. Administrative Randaufgaben können sich dennoch verändern.' };
    if (avgAi >= 2.7 && demand >= 3 && avgBoundary >= 40) return { key: 'grow', label: 'Mit KI wachsen', description: 'Hohe KI-Hebelwirkung plus menschliche Zentralität und zusätzliche Nachfrage sprechen für Kapazitäts- oder Leistungswachstum.' };
    if (avgAi >= 2.7 && avgBoundary < 35) return { key: 'automation-pressure', label: 'Höherer Automatisierungsdruck', description: 'Viele betrachtete Aufgaben sind technisch gut delegierbar und benötigen wenig menschliche Zentralität. Das ist ein Szenariohinweis, keine Beschäftigungsprognose.' };
    return { key: 'reorganize', label: 'Rolle reorganisiert sich', description: 'KI kann substanzielle Arbeit übernehmen, während Urteil, Verantwortung, Ausnahmen oder Beziehungen menschlich zentral bleiben.' };
  }

  function enrichTask(task, profile) {
    const clean = Object.assign({}, task);
    const potential = expansionPotential(clean);
    const boundary = humanBoundary(clean);
    return Object.assign(clean, {
      potential,
      boundary,
      recommendation: recommendation(clean),
      aiMode: aiMode(clean),
      recipe: transformationRecipe(clean),
      pilot: pilotPlan(clean, profile || {}),
    });
  }

  function portfolio(tasks, profile) {
    return (tasks || []).map((t) => enrichTask(t, profile)).sort((a, b) => b.potential - a.potential);
  }

  function markdownReport(state) {
    const profile = state.profile || {};
    const items = portfolio(state.tasks || [], profile);
    const readiness = readinessScore(profile.readiness || {});
    const transition = roleTransition(state.tasks || [], state.demandPotential);
    const role = (profile.role || '').trim() || 'Analyse';
    const orgLabels = { klein: 'Klein', mittel: 'Mittel', gross: 'Groß' };
    const lines = [];

    function mdCell(value) {
      return String(value == null || value === '' ? '–' : value)
        .replace(/\|/g, '\\|')
        .replace(/[\r\n]+/g, ' ')
        .trim();
    }

    lines.push(`# Neue Aufgabenfelder – ${role}`);
    lines.push('');
    lines.push('## Ausgangslage');
    lines.push('');
    lines.push('| Feld | Wert |');
    lines.push('| --- | --- |');
    lines.push(`| Rolle | ${mdCell(profile.role)} |`);
    lines.push(`| Geschäftsergebnis | ${mdCell(profile.outcome)} |`);
    lines.push(`| Organisationsgröße | ${mdCell(orgLabels[profile.organization] || profile.organization)} |`);
    lines.push(`| Skalierungsreife | ${readiness}% |`);
    lines.push(`| Rollen-Szenario | ${mdCell(transition.label)} |`);
    lines.push('');
    lines.push('> Methodischer Hinweis: Übernahmepotenzial und Verantwortungsgrenze sind transparente Entscheidungsheuristiken, keine empirisch validierte Prognose.');
    lines.push('');

    lines.push('## Ergebnisübersicht');
    lines.push('');
    lines.push('| Aufgabe | Empfehlung | Fachfreigabe |');
    lines.push('| --- | --- | --- |');
    for (const t of items) {
      lines.push(`| ${mdCell(t.name)} | ${mdCell(t.recommendation.label)} | ${mdCell(t.approvalOwner || 'nicht definiert')} |`);
    }
    if (!items.length) {
      lines.push('| Noch keine Aufgabe bewertet | – | – |');
    }
    lines.push('');

    lines.push('## Aufgaben im Detail');
    lines.push('');
    for (const t of items) {
      const p = t.pilot;
      lines.push(`### ${t.name}`);
      lines.push('');
      lines.push('**Empfehlung**');
      lines.push('');
      lines.push(t.recommendation.label);
      lines.push('');
      lines.push('**Begründung**');
      lines.push('');
      lines.push(t.recommendation.rationale);
      lines.push('');
      lines.push('**Neue Aufgabenteilung**');
      lines.push('');
      if (t.notes) lines.push(`- Vorgesehene Aufgabenteilung: ${t.notes}`);
      lines.push(`- Herkunftsbereich: ${t.sourceArea || '–'}`);
      lines.push(`- Fachfreigabe: ${t.approvalOwner || 'nicht definiert'}`);
      lines.push(`- Verantwortungsgrenze: ${p.humanBoundary}`);
      lines.push('');
      lines.push('**Pilot**');
      lines.push('');
      lines.push(`- Hypothese: ${p.hypothesis}`);
      lines.push(`- Umfang: ${p.scope}`);
      lines.push(`- Baseline: ${p.baseline}`);
      lines.push(`- Scale Gate: ${p.gate}`);
      lines.push('');
    }

    lines.push('## Gemeinsame Erfolgsmessung');
    lines.push('');
    const metrics = items.length ? items[0].pilot.metrics : [
      'End-to-End-Durchlaufzeit',
      'Anzahl der Handoffs / Rückfragen',
      'Nacharbeit oder Korrekturquote',
      'Fachliche Freigabequote beim ersten Review',
      'Zeit bis zur entscheidungsfähigen Vorlage',
    ];
    for (const metric of metrics) lines.push(`- ${metric}`);
    lines.push('');

    if (items.length) {
      lines.push('## Methodische Einordnung');
      lines.push('');
      lines.push('| Aufgabe | Übernahmepotenzial | Verantwortungsgrenze | Arbeitsmodus | Designmuster |');
      lines.push('| --- | ---: | ---: | --- | --- |');
      for (const t of items) {
        lines.push(`| ${mdCell(t.name)} | ${t.potential}/100 | ${t.boundary}/100 | ${mdCell(t.aiMode.label)} | ${mdCell(t.recipe.label)} |`);
      }
      lines.push('');
    }

    lines.push('## Vorgehensmodell');
    lines.push('');
    lines.push('1. Geschäftsergebnis und Baseline definieren.');
    lines.push('2. Arbeit, Handoffs, Wartezeiten und Entscheidungsrechte sichtbar machen.');
    lines.push('3. Kandidaten für neue Aufgabenfelder identifizieren.');
    lines.push('4. Verantwortung und Freigabegrenzen explizit festlegen.');
    lines.push('5. Passenden KI-Arbeitsmodus bestimmen.');
    lines.push('6. Mit realen Fällen pilotieren und End-to-End-Wert messen.');
    lines.push('7. Wiederholung und stabilen Qualitätsstandard prüfen.');
    lines.push('8. Nur bei messbarem Wert und stabilen Leitplanken standardisieren und skalieren.');
    lines.push('');
    lines.push('Erstellt mit Neue Aufgabenfelder / TASKSHIFT.');

    return lines.join('\n');
  }

  return {
    VERSION,
    WEIGHTS,
    BOUNDARY_WEIGHTS,
    SOURCE_AREAS,
    DEMO,
    expansionPotential,
    humanBoundary,
    readinessScore,
    recommendation,
    aiMode,
    transformationRecipe,
    pilotPlan,
    roleTransition,
    enrichTask,
    portfolio,
    markdownReport,
  };
});
