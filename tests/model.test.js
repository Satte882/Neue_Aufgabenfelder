const assert = require('node:assert/strict');
const M = require('../model.js');

function task(overrides = {}) {
  return Object.assign({
    name: 'Test',
    businessValue: 2,
    handoffFriction: 2,
    contextProximity: 2,
    aiLeverage: 2,
    recurrence: 2,
    dataReadiness: 2,
    judgmentStakes: 2,
    specialistAccountability: 2,
  }, overrides);
}

assert.equal(M.expansionPotential(task({businessValue:4,handoffFriction:4,contextProximity:4,aiLeverage:4,recurrence:4,dataReadiness:4})), 100);
assert.equal(M.humanBoundary(task({judgmentStakes:0,specialistAccountability:0})), 0);
assert.equal(M.humanBoundary(task({judgmentStakes:4,specialistAccountability:4})), 100);
assert.equal(M.recommendation(task({businessValue:4,handoffFriction:4,contextProximity:4,aiLeverage:4,recurrence:4,dataReadiness:4,judgmentStakes:0,specialistAccountability:0})).key, 'own');
assert.equal(M.recommendation(task({businessValue:4,handoffFriction:4,contextProximity:4,aiLeverage:4,recurrence:4,dataReadiness:4,judgmentStakes:4,specialistAccountability:4})).key, 'prepare-only');
assert.equal(M.aiMode(task({aiLeverage:4,recurrence:4,dataReadiness:4,judgmentStakes:1,specialistAccountability:1})).key, 'delegation');
assert.equal(M.readinessScore({rules:true,data:true,metrics:false,manager:false}), 50);

const report = M.markdownReport({
  profile:{
    role:'Testrolle',
    outcome:'Durchlaufzeit senken',
    organization:'mittel',
    readiness:{rules:true,data:true,metrics:true,manager:true}
  },
  tasks:[task({approvalOwner:'Finance', notes:'Analyse selbst, Freigabe bei Finance.'})],
  demandPotential:2
});
assert.match(report, /# Neue Aufgabenfelder – Testrolle/);
assert.match(report, /## Ausgangslage/);
assert.match(report, /\| Aufgabe \| Empfehlung \| Fachfreigabe \|/);
assert.match(report, /## Gemeinsame Erfolgsmessung/);
assert.match(report, /Übernahmepotenzial/);
assert.match(report, /Verantwortungsgrenze/);
assert.doesNotMatch(report, /Human Boundary/);
assert.doesNotMatch(report, /schnellere entscheidungen.*verbessert sich/i);

console.log('model tests: OK');
