(function () {
  'use strict';

  const M = window.TaskShiftModel;
  const STORAGE_KEY = 'neue-aufgabenfelder-taskshift-v1';

  const CRITERIA_GROUPS = [
    {
      key: 'value',
      title: '1. Nutzen & Prozesshebel',
      question: 'Lohnt es sich überhaupt, diese Aufgabe neu zu organisieren?',
      criteria: [
        { key: 'businessValue', title: 'Geschäftswert', desc: 'Wie stark trägt die Aufgabe zum gewünschten Geschäftsergebnis bei?', low: 'niedrig', high: 'hoch' },
        { key: 'handoffFriction', title: 'Übergabereibung', desc: 'Wie viel Wartezeit, Rückfragen oder Reibung erzeugt die heutige Übergabe?', low: 'kaum', high: 'hoch' },
        { key: 'recurrence', title: 'Wiederholung', desc: 'Wie regelmäßig tritt die Aufgabe auf und lohnt damit ein stabiler Arbeitsmodus?', low: 'selten', high: 'häufig' },
      ],
    },
    {
      key: 'fit',
      title: '2. Eignung für KI-gestützte Übernahme',
      question: 'Kann diese Rolle die Aufgabe mit KI sinnvoll selbst übernehmen?',
      criteria: [
        { key: 'contextProximity', title: 'Kontextnähe', desc: 'Wie nah ist die Rolle am Problem, an den Daten und an der Entscheidungssituation?', low: 'fern', high: 'nah' },
        { key: 'aiLeverage', title: 'KI-Hebel', desc: 'Wie gut kann KI Analyse, Entwurf, Vergleich, Prüfung oder Ausführung unterstützen?', low: 'gering', high: 'hoch' },
        { key: 'dataReadiness', title: 'Datenreife', desc: 'Sind relevante Informationen in ausreichender Qualität und Zugänglichkeit vorhanden?', low: 'schwach', high: 'gut' },
      ],
    },
    {
      key: 'boundary',
      title: '3. Verantwortung & Grenze',
      question: 'Wo muss fachliche Verantwortung oder Freigabe bestehen bleiben?',
      criteria: [
        { key: 'judgmentStakes', title: 'Entscheidungsrisiko', desc: 'Wie schwer wiegen Fehlurteile, Ausnahmen, Kundenwirkung oder irreversible Entscheidungen?', low: 'gering', high: 'kritisch' },
        { key: 'specialistAccountability', title: 'Fachverantwortung', desc: 'Wie stark ist formale Fachverantwortung, Freigabe oder Spezialistenwissen zwingend?', low: 'gering', high: 'zwingend' },
      ],
    },
  ];

  const CRITERIA = CRITERIA_GROUPS.flatMap((group) => group.criteria);

  function defaultState() {
    return {
      profile: {
        role: '',
        outcome: '',
        organization: 'mittel',
        readiness: { rules: false, data: false, metrics: false, manager: false },
      },
      tasks: [],
      demandPotential: 2,
      selectedSourceArea: 'Marketing',
      draft: Object.fromEntries(CRITERIA.map((c) => [c.key, 2])),
      draftTouched: Object.fromEntries(CRITERIA.map((c) => [c.key, false])),
    };
  }

  let state = loadState();
  if (!state.tasks || state.tasks.length === 0) {
    state = demoState();
    saveState();
  }

  const $ = (id) => document.getElementById(id);

  function demoState() {
    return {
      profile: JSON.parse(JSON.stringify(M.DEMO.profile)),
      tasks: JSON.parse(JSON.stringify(M.DEMO.tasks)),
      demandPotential: 2,
      selectedSourceArea: 'Marketing',
      draft: Object.fromEntries(CRITERIA.map((c) => [c.key, 2])),
      draftTouched: Object.fromEntries(CRITERIA.map((c) => [c.key, false])),
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      return Object.assign(defaultState(), JSON.parse(raw));
    } catch (_) {
      return defaultState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function toast(message) {
    let el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove('show'), 1800);
  }

  function wireTabs() {
    document.querySelectorAll('.tab').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach((b) => b.classList.toggle('active', b === button));
        document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
        $('tab-' + button.dataset.tab).classList.add('active');
        if (button.dataset.tab === 'portfolio') renderPortfolio();
      });
    });
  }

  function renderSourceAreas() {
    const picker = $('sourceAreaPicker');
    picker.innerHTML = M.SOURCE_AREAS.map((area) =>
      `<option value="${esc(area)}">${esc(area)}</option>`
    ).join('');
    picker.value = state.selectedSourceArea;
    picker.onchange = () => {
      state.selectedSourceArea = picker.value;
      saveState();
    };
  }

  function renderCriteria() {
    $('criteriaGrid').innerHTML = CRITERIA_GROUPS.map((group) => {
      const cards = group.criteria.map((criterion) => {
        const val = Number(state.draft[criterion.key] ?? 2);
        const touched = Boolean(state.draftTouched && state.draftTouched[criterion.key]);
        return `<div class="criterion ${touched ? 'assessed' : 'pending'}" data-criterion-card="${criterion.key}">
          <div class="criterion-head"><div><h4>${esc(criterion.title)}</h4><p>${esc(criterion.desc)}</p></div><span class="level-value" id="value-${criterion.key}" aria-label="${touched ? 'Bewertung ' + val : 'Noch nicht bewertet'}">${touched ? val : '–'}</span></div>
          <input type="range" min="0" max="4" step="1" value="${val}" data-criterion="${criterion.key}" aria-label="${esc(criterion.title)}" />
          <div class="range-labels"><span>${esc(criterion.low)}</span><span>${esc(criterion.high)}</span></div>
        </div>`;
      }).join('');

      return `<section class="criteria-section" aria-labelledby="criteria-${group.key}">
        <div class="criteria-section-head">
          <div>
            <h3 id="criteria-${group.key}">${esc(group.title)}</h3>
            <p>${esc(group.question)}</p>
          </div>
        </div>
        <div class="criteria-section-grid">${cards}</div>
      </section>`;
    }).join('');

    $('criteriaGrid').querySelectorAll('input[type="range"]').forEach((input) => {
      input.addEventListener('input', () => {
        const key = input.dataset.criterion;
        state.draft[key] = Number(input.value);
        state.draftTouched[key] = true;
        $('value-' + key).textContent = input.value;
        $('value-' + key).setAttribute('aria-label', 'Bewertung ' + input.value);
        const card = document.querySelector(`[data-criterion-card="${key}"]`);
        if (card) {
          card.classList.remove('pending');
          card.classList.add('assessed');
        }
        saveState();
        renderLivePreview();
      });
    });
  }

  function assessmentProgress() {
    const touched = CRITERIA.filter((criterion) => Boolean(state.draftTouched && state.draftTouched[criterion.key])).length;
    return { touched, total: CRITERIA.length, remaining: CRITERIA.length - touched, complete: touched === CRITERIA.length };
  }

  function currentDraftTask() {
    return Object.assign({}, state.draft, {
      id: 'draft',
      name: $('taskName').value.trim() || 'Neue Aufgabe',
      sourceArea: state.selectedSourceArea,
      approvalOwner: $('approvalOwner').value.trim(),
      notes: $('taskNotes').value.trim(),
    });
  }

  function renderLivePreview() {
    const progress = assessmentProgress();
    const addButton = $('addTaskBtn');

    if (!progress.complete) {
      if (addButton) {
        addButton.disabled = true;
        addButton.title = 'Erst alle acht Kriterien bewerten.';
      }
      $('livePreview').innerHTML = `<div class="recommendation-preview pending-recommendation">
        <div class="recommendation-copy">
          <span class="preview-kicker">Bewertung noch nicht vollständig</span>
          <strong>Noch ${progress.remaining} von ${progress.total} Kriterien bewerten</strong>
          <p>Eine Empfehlung erscheint erst, wenn jedes Kriterium bewusst bewertet wurde. Die mittlere Sliderposition ist nur ein neutraler Startpunkt und zählt noch nicht als Bewertung.</p>
        </div>
      </div>`;
      return;
    }

    if (addButton) {
      addButton.disabled = false;
      addButton.title = '';
    }

    const t = M.enrichTask(currentDraftTask(), state.profile);
    $('livePreview').innerHTML = `<div class="recommendation-preview">
      <div class="recommendation-copy">
        <span class="preview-kicker">Empfehlung</span>
        <strong>${esc(t.recommendation.label)}</strong>
        <p>${esc(t.recommendation.rationale)}</p>
      </div>
      <details class="info-popover preview-info">
        <summary aria-label="Methodische Details anzeigen" title="Methodische Details">?</summary>
        <div class="info-popover-card">
          <h4>Methodische Details</h4>
          <dl>
            <div><dt>Übernahmepotenzial</dt><dd>${t.potential}/100</dd></div>
            <div><dt>Verantwortungsgrenze</dt><dd>${t.boundary}/100</dd></div>
            <div><dt>Arbeitsmodus</dt><dd>${esc(t.aiMode.label)}</dd></div>
            <div><dt>Designmuster</dt><dd>${esc(t.recipe.label)}</dd></div>
          </dl>
          <p>${esc(t.aiMode.description)}</p>
        </div>
      </details>
    </div>`;
  }

  function syncProfileInputs() {
    $('roleInput').value = state.profile.role || '';
    $('outcomeInput').value = state.profile.outcome || '';
    $('readyRules').checked = !!state.profile.readiness.rules;
    $('readyData').checked = !!state.profile.readiness.data;
    $('readyMetrics').checked = !!state.profile.readiness.metrics;
    $('readyManager').checked = !!state.profile.readiness.manager;
    $('demandPotential').value = state.demandPotential ?? 2;
    document.querySelectorAll('#orgButtons button').forEach((b) => b.classList.toggle('active', b.dataset.value === state.profile.organization));
    renderReadiness();
    renderTransition();
  }

  function renderReadiness() {
    const score = M.readinessScore(state.profile.readiness);
    $('readinessBar').style.width = score + '%';
    $('readinessValue').textContent = score + '%';
  }

  function renderTransition() {
    const s = M.roleTransition(state.tasks, state.demandPotential);
    $('transitionScenario').innerHTML = `<strong>${esc(s.label)}</strong><p>${esc(s.description)}</p>`;
  }

  function addTask() {
    const progress = assessmentProgress();
    if (!progress.complete) {
      toast(`Bitte zuerst alle Kriterien bewerten. Noch ${progress.remaining} offen.`);
      return;
    }

    const name = $('taskName').value.trim();
    if (!name) {
      $('taskName').focus();
      toast('Bitte zuerst eine konkrete Aufgabe benennen.');
      return;
    }
    const task = currentDraftTask();
    task.id = 'task-' + Date.now();
    state.tasks.push(task);
    saveState();
    renderPortfolio();
    renderTransition();
    clearDraftInputs();
    toast('Aufgabe wurde ins Portfolio übernommen.');
  }

  function clearDraftInputs() {
    $('taskName').value = '';
    $('approvalOwner').value = '';
    $('taskNotes').value = '';
    state.draft = Object.fromEntries(CRITERIA.map((c) => [c.key, 2]));
    state.draftTouched = Object.fromEntries(CRITERIA.map((c) => [c.key, false]));
    renderCriteria();
    renderLivePreview();
    saveState();
  }

  function toneClass(rec) {
    if (rec.tone === 'strong') return 'good';
    if (rec.tone === 'guarded' || rec.tone === 'medium') return 'warn';
    return '';
  }

  function renderPortfolio() {
    const items = M.portfolio(state.tasks, state.profile);
    $('portfolioCount').textContent = `${items.length} ${items.length === 1 ? 'Aufgabe' : 'Aufgaben'}`;

    $('plotPoints').innerHTML = items.map((t, idx) => {
      const left = Math.max(4, Math.min(96, t.potential));
      const bottom = Math.max(4, Math.min(96, t.boundary));
      return `<div class="plot-point" style="left:${left}%; bottom:${bottom}%" data-label="${esc(t.name)}" title="${esc(t.name)}">${idx + 1}</div>`;
    }).join('');

    const strong = items.filter((t) => ['own', 'own-with-approval'].includes(t.recommendation.key)).length;
    const guarded = items.filter((t) => t.recommendation.key === 'prepare-only').length;
    const explore = items.filter((t) => t.recommendation.key === 'explore').length;
    const avgPotential = items.length ? Math.round(items.reduce((s, t) => s + t.potential, 0) / items.length) : 0;
    const readiness = M.readinessScore(state.profile.readiness);

    $('portfolioSummary').innerHTML = `
      <div class="summary-card"><strong>${avgPotential}%</strong><span>Ø Übernahmepotenzial</span></div>
      <div class="summary-card"><strong>${strong}</strong><span>direkte Rollenerweiterungs-Kandidaten</span></div>
      <div class="summary-card"><strong>${guarded}</strong><span>nur mit klarer Fachfreigabe / Vorbereitung</span></div>
      <div class="summary-card"><strong>${explore}</strong><span>gezielt explorieren</span></div>
      <div class="summary-card"><strong>${readiness}%</strong><span>Skalierungs-Reife</span></div>`;

    $('taskList').innerHTML = items.length ? items.map((t, idx) => {
      const p = t.pilot;
      return `<article class="task-card">
        <div class="task-head">
          <div><h3>${idx + 1}. ${esc(t.name)}</h3><p>Heute typischerweise: ${esc(t.sourceArea || '–')} · Fachfreigabe: ${esc(t.approvalOwner || 'nicht definiert')}</p></div>
          <div class="task-badges">
            <span class="badge ${toneClass(t.recommendation)}">${esc(t.recommendation.label)}</span>
            <details class="info-popover task-info">
              <summary aria-label="Methodische Details zu ${esc(t.name)} anzeigen" title="Methodische Details">?</summary>
              <div class="info-popover-card">
                <h4>Methodische Details</h4>
                <dl>
                  <div><dt>Übernahmepotenzial</dt><dd>${t.potential}/100</dd></div>
                  <div><dt>Verantwortungsgrenze</dt><dd>${t.boundary}/100</dd></div>
                  <div><dt>Arbeitsmodus</dt><dd>${esc(t.aiMode.label)}</dd></div>
                  <div><dt>Designmuster</dt><dd>${esc(t.recipe.label)}</dd></div>
                </dl>
              </div>
            </details>
          </div>
        </div>
        <div class="task-detail">
          <div>
            <h4>Entscheidungslogik</h4>
            <p>${esc(t.recommendation.rationale)}</p>
            <p><strong>Freigabegrenze:</strong> ${esc(p.humanBoundary)}</p>
            ${t.notes ? `<p><strong>Notiz:</strong> ${esc(t.notes)}</p>` : ''}
          </div>
          <div>
            <h4>Pilot</h4>
            <p>${esc(p.hypothesis)}</p>
            <ul>${p.metrics.slice(0,4).map((m) => `<li>${esc(m)}</li>`).join('')}</ul>
            <p><strong>Scale Gate:</strong> ${esc(p.gate)}</p>
          </div>
        </div>
        <div class="task-actions"><button type="button" data-delete="${esc(t.id)}">Aufgabe entfernen</button></div>
      </article>`;
    }).join('') : '<div class="summary-card"><strong>0</strong><span>Noch keine Aufgabe bewertet. Im Tab „Analyse“ eine Aufgabe hinzufügen.</span></div>';

    $('taskList').querySelectorAll('[data-delete]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.tasks = state.tasks.filter((t) => t.id !== btn.dataset.delete);
        saveState();
        renderPortfolio();
        renderTransition();
      });
    });
  }

  function wireProfile() {
    $('roleInput').addEventListener('input', (e) => { state.profile.role = e.target.value; saveState(); renderLivePreview(); renderPortfolio(); });
    $('outcomeInput').addEventListener('input', (e) => { state.profile.outcome = e.target.value; saveState(); renderLivePreview(); renderPortfolio(); });
    document.querySelectorAll('#orgButtons button').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.profile.organization = btn.dataset.value;
        saveState();
        syncProfileInputs();
      });
    });
    [['readyRules','rules'], ['readyData','data'], ['readyMetrics','metrics'], ['readyManager','manager']].forEach(([id,key]) => {
      $(id).addEventListener('change', (e) => {
        state.profile.readiness[key] = e.target.checked;
        saveState();
        renderReadiness();
        renderPortfolio();
      });
    });
    $('demandPotential').addEventListener('input', (e) => {
      state.demandPotential = Number(e.target.value);
      saveState();
      renderTransition();
    });
  }

  function loadDemo() {
    state = demoState();
    saveState();
    syncProfileInputs();
    renderSourceAreas();
    renderCriteria();
    renderLivePreview();
    renderPortfolio();
    toast('Demo „Produktmanager Reiseveranstalter“ geladen.');
  }

  function resetAll() {
    if (!window.confirm('Alle lokal gespeicherten Eingaben und Aufgaben löschen?')) return;
    state = defaultState();
    saveState();
    syncProfileInputs();
    renderSourceAreas();
    clearDraftInputs();
    renderPortfolio();
    toast('App wurde zurückgesetzt.');
  }

  function exportMarkdown() {
    const content = M.markdownReport(state);
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const roleSlug = (state.profile.role || 'analyse').toLowerCase().replace(/[^a-z0-9äöüß]+/gi, '-').replace(/^-|-$/g, '');
    a.href = url;
    a.download = `neue-aufgabenfelder-${roleSlug || 'analyse'}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast('Markdown-Bericht exportiert.');
  }

  function init() {
    wireTabs();
    wireProfile();
    renderSourceAreas();
    renderCriteria();
    syncProfileInputs();
    renderLivePreview();
    renderPortfolio();

    $('taskName').addEventListener('input', renderLivePreview);
    $('approvalOwner').addEventListener('input', renderLivePreview);
    $('taskNotes').addEventListener('input', renderLivePreview);
    $('addTaskBtn').addEventListener('click', addTask);
    $('clearTaskBtn').addEventListener('click', clearDraftInputs);
    $('loadDemoBtn').addEventListener('click', loadDemo);
    $('resetBtn').addEventListener('click', resetAll);
    $('exportBtn').addEventListener('click', exportMarkdown);
    $('printBtn').addEventListener('click', () => {
      document.querySelector('.tab[data-tab="portfolio"]').click();
      setTimeout(() => window.print(), 80);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
