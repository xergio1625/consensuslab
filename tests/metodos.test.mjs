// Pruebas de la estadística de verificación y comparación de métodos (npm test). Valores comprobados a mano
// o contra valores de tablas conocidas (cuantiles de chi cuadrado y t).
import test from 'node:test';
import assert from 'node:assert/strict';
import * as M from '../src/lib/metodos.js';

const cerca = (a, b, tol = 1e-3) => assert.ok(Math.abs(a - b) <= tol, `${a} ≠ ${b}`);

test('cuantiles de chi cuadrado y t contra tablas', () => {
  cerca(M.chi2Cuantil(0.95, 20), 31.4104, 1e-3);
  cerca(M.chi2Cuantil(0.95, 1), 3.8415, 1e-3);
  cerca(M.chi2Cuantil(0.95, 2), -2 * Math.log(0.05), 1e-6);
  cerca(M.chi2Cuantil(0.975, 10), 20.4832, 1e-3);
  cerca(M.tCuantil(0.975, 10), 2.2281, 1e-3);
  cerca(M.tCuantil(0.975, 24), 2.0639, 1e-3);
  cerca(M.tCuantil(0.975, 1), 12.706, 1e-2);
  cerca(M.tCuantil(0.5, 7), 0, 1e-6);
  cerca(M.tAcumulada(0, 5), 0.5, 1e-6);
});

test('precisión por ANOVA: repetibilidad, intralaboratorio y Satterthwaite', () => {
  const r = M.precisionAnova([[10, 11], [12, 13], [9, 10]]);
  cerca(r.sr, Math.sqrt(0.5), 1e-9);
  cerca(r.swl, Math.sqrt(0.5 + 2.083333), 1e-5);
  cerca(r.entreDias, Math.sqrt(2.083333), 1e-5);
  assert.equal(r.glR, 3);
  cerca(r.glWl, 2.4329, 1e-3);
  cerca(r.media, 10.8333, 1e-3);
});

test('precisión: componente entre días negativo se toma como 0 y diseño inválido', () => {
  const r = M.precisionAnova([[10, 12], [11, 11], [10, 12]]);
  assert.equal(r.entreDias, 0);
  cerca(r.swl, r.sr, 1e-12);
  assert.equal(r.glWl, r.glR);
  assert.equal(M.precisionAnova([[1, 2, 3], [1, 2]]), null);
  assert.equal(M.precisionAnova([[1, 2]]), null);
});

test('límite de verificación: CV declarado × √(χ²/gl)', () => {
  cerca(M.limiteVerificacion(2, 20, 0.95), 2 * Math.sqrt(31.4104 / 20), 1e-3);
  assert.ok(M.limiteVerificacion(2, 20, 0.95) > 2);
  assert.ok(M.limiteVerificacion(2, 40, 0.95) < M.limiteVerificacion(2, 20, 0.95));
});

const x = [1, 2, 3, 4, 5];
const y = [1.1, 2.3, 2.9, 4.2, 5.1];

test('Bland-Altman: sesgo, DE y límites', () => {
  const b = M.blandAltman(x, y);
  cerca(b.sesgo, 0.12, 1e-9);
  cerca(b.de, Math.sqrt(0.022), 1e-9);
  cerca(b.limiteInf, 0.12 - 1.96 * Math.sqrt(0.022), 1e-9);
  cerca(b.limiteSup, 0.12 + 1.96 * Math.sqrt(0.022), 1e-9);
  assert.ok(b.ciInf[0] < b.limiteInf && b.ciInf[1] > b.limiteInf);
  assert.ok(b.ciSesgo[0] < 0.12 && b.ciSesgo[1] > 0.12);
  assert.deepEqual(b.promedios, [1.05, 2.15, 2.95, 4.1, 5.05].map((v) => v), 'promedios');
});

const xs = Array.from({ length: 10 }, (_, i) => i + 1);
const exacta = xs.map((v) => 2 + 1.1 * v);

test('regresiones sobre una recta exacta recuperan pendiente e intercepto', () => {
  const o = M.regresionOls(xs, exacta);
  cerca(o.pendiente, 1.1, 1e-9);
  cerca(o.intercepto, 2, 1e-9);
  cerca(o.r, 1, 1e-9);
  const d = M.regresionDeming(xs, exacta, 1);
  cerca(d.pendiente, 1.1, 1e-9);
  cerca(d.intercepto, 2, 1e-9);
  const pb = M.passingBablok(xs, exacta);
  cerca(pb.pendiente, 1.1, 1e-9);
  cerca(pb.intercepto, 2, 1e-9);
  assert.equal(pb.pares, 45);
  assert.equal(pb.k, 0);
  cerca(pb.ciPendiente[0], 1.1, 1e-9);
  cerca(pb.ciPendiente[1], 1.1, 1e-9);
});

test('Passing-Bablok resiste un valor atípico y la regresión simple no', () => {
  const y2 = [...exacta];
  y2[4] += 40;
  const pb = M.passingBablok(xs, y2);
  const o = M.regresionOls(xs, y2);
  cerca(pb.pendiente, 1.1, 0.2);
  assert.ok(Math.abs(o.pendiente - 1.1) > Math.abs(pb.pendiente - 1.1));
  assert.ok(pb.ciPendiente[0] <= pb.pendiente && pb.pendiente <= pb.ciPendiente[1]);
});

test('Deming: con razón de varianzas muy grande tiende a mínimos cuadrados', () => {
  const ruido = [0.2, -0.3, 0.1, 0.4, -0.2, 0.3, -0.1, 0.0, -0.4, 0.2];
  const yr = exacta.map((v, i) => v + ruido[i]);
  const o = M.regresionOls(xs, yr);
  const d = M.regresionDeming(xs, yr, 1e9);
  cerca(d.pendiente, o.pendiente, 1e-4);
  const d1 = M.regresionDeming(xs, yr, 1);
  assert.ok(d1.pendiente > o.pendiente);
  assert.ok(d1.ciPendiente[0] < d1.pendiente && d1.ciPendiente[1] > d1.pendiente);
});

test('comparación completa: sesgo en niveles de decisión y entradas inválidas', () => {
  const r = M.compararMetodos(xs, exacta, { niveles: [5, 10] });
  cerca(r.nivelesDeming[0].estimado, 7.5, 1e-9);
  cerca(r.nivelesDeming[0].sesgo, 2.5, 1e-9);
  cerca(r.nivelesDeming[0].sesgoPct, 50, 1e-9);
  cerca(r.nivelesPb[1].sesgo, 2 + 0.1 * 10, 1e-9);
  assert.equal(r.n, 10);
  assert.equal(M.compararMetodos([1, 2], [1, 2]), null);
  assert.equal(M.compararMetodos([1, 2, NaN], [1, 2, 3]), null);
});
