// Pruebas de las fórmulas de «Fórmulas y resultados» (npm test). Valores comprobados a mano.
import test from 'node:test';
import assert from 'node:assert/strict';
import * as F from '../src/lib/formulas.js';

const cerca = (a, b, tol = 0.05) => assert.ok(Math.abs(a - b) <= tol, `${a} ≠ ${b}`);

test('RCV de Fraser: √2 · Z · √(CVa² + CVi²)', () => {
  cerca(F.rcv(3, 5), 16.16, 0.01);
  cerca(F.rcv(3, 5, 1.65), 13.61, 0.01);
  cerca(F.rcv(0, 5, 1.96), 13.86, 0.01);
});

test('delta check: porcentaje, absoluto y marca de revisión', () => {
  const d = F.deltaCheck(100, 130, 25, undefined);
  cerca(d.porcentaje, 30, 1e-9);
  assert.equal(d.superaPorcentaje, true);
  assert.equal(d.revisar, true);
  assert.equal(F.deltaCheck(100, 110, 25, 5).superaAbsoluta, true);
  assert.equal(F.deltaCheck(100, 110, 25, 20).revisar, false);
  assert.ok(Number.isNaN(F.delta(0, 5).porcentaje));
});

test('incertidumbre de medición de arriba hacia abajo', () => {
  const r = F.incertidumbre(3, 2, 2);
  cerca(r.uCal, 1, 1e-9);
  cerca(r.uSesgo, Math.sqrt(5), 1e-9);
  cerca(r.uc, Math.sqrt(14), 1e-9);
  cerca(r.U, 2 * Math.sqrt(14), 1e-9);
  cerca(F.incertidumbre(2, 0).U, 4, 1e-9);
});

test('tasa con intervalo de Wilson y sigma del indicador', () => {
  const t = F.tasa(5, 200);
  cerca(t.tasa, 2.5, 1e-9);
  cerca(t.bajo, 1.07, 0.01);
  cerca(t.alto, 5.72, 0.01);
  assert.equal(F.tasa(0, 100).bajo, 0);
  cerca(F.sigmaDeTasa(0.00135), 4.5, 0.001);
  cerca(F.sigmaDeTasa(0.5), 1.5, 1e-6);
  assert.ok(Number.isNaN(F.sigmaDeTasa(0)));
});

test('percentil como PERCENTILE.INC y resumen de TAT', () => {
  cerca(F.percentil([1, 2, 3, 4, 10], 90), 7.6, 1e-9);
  cerca(F.percentil([5], 90), 5, 1e-9);
  cerca(F.percentil([4, 1, 3, 2], 50), 2.5, 1e-9);
  const r = F.resumenTat([30, 45, 60, 90, 120], 60);
  assert.equal(r.n, 5);
  cerca(r.dentroPct, 60, 1e-9);
  cerca(r.mediana, 60, 1e-9);
});

test('CKD-EPI 2021: vectores de prueba', () => {
  for (const v of F.VECTORES.ckdEpi2021) cerca(F.ckdEpi2021(v.scr, v.edad, v.sexo), v.esperado, 0.05);
  // Creatinina en el punto de quiebre κ: ambas ramas valen 1.
  cerca(F.ckdEpi2021(0.9, 40, 'M'), 142 * 0.9938 ** 40, 1e-9);
  cerca(F.umolAMgdl(88.4), 1, 1e-9);
});

test('LDL calculado: Friedewald y Sampson-NIH', () => {
  for (const v of F.VECTORES.ldl) {
    cerca(F.ldlFriedewald(v.ct, v.hdl, v.tg), v.friedewald, 0.05);
    cerca(F.ldlSampson(v.ct, v.hdl, v.tg), v.sampson, 0.05);
  }
});
