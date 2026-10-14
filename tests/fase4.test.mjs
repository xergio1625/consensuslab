// Pruebas de la fase 4: pruebas t y F, valores atípicos, Pareto, gráfico p, OEE y AMEF (npm test).
import test from 'node:test';
import assert from 'node:assert/strict';
import { fAcumulada } from '../src/lib/metodos.js';
import * as E from '../src/lib/estadistica.js';

const cerca = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) <= tol, `${a} ≠ ${b}`);

test('F de Snedecor contra valores críticos de tablas', () => {
  cerca(fAcumulada(3.3258, 5, 10), 0.95, 1e-3);
  cerca(fAcumulada(2.9782, 10, 10), 0.95, 1e-3);
  cerca(fAcumulada(4.2361, 5, 10), 0.975, 1e-3);
  assert.equal(fAcumulada(0, 5, 10), 0);
});

test('comparar series: t de Welch, intervalo y F', () => {
  const r = E.compararSeries([1, 2, 3, 4, 5], [2, 3, 4, 5, 6]);
  cerca(r.diferencia, 1, 1e-9);
  cerca(r.t, 1, 1e-9);
  cerca(r.gl, 8, 1e-9);
  cerca(r.pMedias, 0.3466, 1e-3);
  cerca(r.ciDiferencia[0], 1 - 2.306 * 1, 5e-3);
  cerca(r.ciDiferencia[1], 1 + 2.306 * 1, 5e-3);
  cerca(r.f, 1, 1e-9);
  cerca(r.pVarianzas, 1, 1e-6);
  cerca(r.diferenciaPct, (1 / 3) * 100, 1e-9);
});

test('comparar series: varianzas distintas, gl de Welch y entradas inválidas', () => {
  const a = [10, 10.2, 9.8, 10.1, 9.9, 10.0];
  const b = [11, 13, 9, 12, 8, 10, 14, 7];
  const r = E.compararSeries(a, b);
  assert.ok(r.f > 10);
  assert.ok(r.pVarianzas < 0.01);
  assert.ok(r.gl < a.length + b.length - 2);
  assert.ok(r.gl > Math.min(a.length, b.length) - 1);
  assert.equal(E.compararSeries([1], [1, 2]), null);
  assert.equal(E.compararSeries([1, 2], [1, NaN]), null);
  assert.ok(E.compararSeries([5, 5, 5], [5, 5, 5]).pMedias === 1);
});

test('Grubbs: valores críticos de la tabla bilateral (α = 0,05) y ejemplo del manual NIST', () => {
  const tabla = { 3: 1.155, 5: 1.715, 8: 2.127, 10: 2.29, 15: 2.549, 20: 2.709, 30: 2.908 };
  for (const [n, esperado] of Object.entries(tabla)) {
    const datos = Array.from({ length: Number(n) }, (_, i) => i + (i === 0 ? 0.5 : 0));
    cerca(E.grubbs(datos).critico, esperado, 3e-3);
  }
  const nist = E.grubbs([199.31, 199.53, 200.19, 200.82, 201.92, 201.95, 202.18, 245.57]);
  cerca(nist.g, 2.4687, 1e-3);
  assert.equal(nist.atipico, true);
  assert.equal(nist.lado, 'alto');
  assert.equal(nist.indice, 7);
});

test('Grubbs: sin atípico, atípico bajo y entradas inválidas', () => {
  assert.equal(E.grubbs([10, 10.1, 9.9, 10.2, 9.8, 10.05, 10.15]).atipico, false);
  const bajo = E.grubbs([10, 10.1, 9.9, 10.2, 9.8, 10.05, 4]);
  assert.equal(bajo.atipico, true);
  assert.equal(bajo.lado, 'bajo');
  assert.equal(E.grubbs([1, 2]), null);
  assert.equal(E.grubbs([5, 5, 5, 5]), null);
});

test('vallas de Tukey', () => {
  const r = E.vallasTukey([1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
  cerca(r.q1, 3.25, 1e-9);
  cerca(r.q3, 7.75, 1e-9);
  cerca(r.superior, 7.75 + 1.5 * 4.5, 1e-9);
  assert.equal(r.puntos[9].atipico, true);
  assert.equal(r.puntos[9].extremo, true);
  assert.equal(r.puntos.filter((p) => p.atipico).length, 1);
  assert.equal(E.vallasTukey([1, 2, 3]), null);
});

test('Pareto: orden, acumulado y causas vitales', () => {
  const r = E.pareto([{ nombre: 'B', cantidad: 30 }, { nombre: 'A', cantidad: 50 }, { nombre: 'D', cantidad: 5 }, { nombre: 'C', cantidad: 15 }, { nombre: 'Z', cantidad: 0 }]);
  assert.deepEqual(r.filas.map((f) => f.nombre), ['A', 'B', 'C', 'D']);
  assert.deepEqual(r.filas.map((f) => Math.round(f.acumulado)), [50, 80, 95, 100]);
  assert.equal(r.vitales, 2);
  cerca(r.total, 100, 1e-9);
  assert.equal(E.pareto([{ nombre: 'x', cantidad: 0 }]), null);
});

test('gráfico p: límites por período, fuera de límites y rachas', () => {
  const g = E.graficoP([{ eventos: 2, total: 100 }, { eventos: 3, total: 100 }, { eventos: 2, total: 100 }, { eventos: 12, total: 100 }]);
  cerca(g.pBarra, 19 / 400, 1e-12);
  cerca(g.puntos[0].limiteSup, 19 / 400 + 3 * Math.sqrt((19 / 400) * (381 / 400) / 100), 1e-12);
  assert.deepEqual(g.puntos.map((p) => p.fuera), [false, false, false, true]);
  const chico = E.graficoP([{ eventos: 0, total: 10 }, { eventos: 0, total: 10 }, { eventos: 5, total: 10 }]);
  assert.ok(chico.puntos[0].limiteInf >= 0);
  const racha = E.graficoP([
    ...Array.from({ length: 8 }, () => ({ eventos: 6, total: 100 })),
    ...Array.from({ length: 8 }, () => ({ eventos: 4, total: 100 })),
  ]);
  assert.equal(racha.puntos.slice(0, 8).every((p) => p.racha), true);
  assert.equal(racha.puntos.slice(8).every((p) => p.racha), true);
  const corta = E.graficoP(Array.from({ length: 7 }, (_, i) => ({ eventos: i % 2 ? 6 : 4, total: 100 })));
  assert.equal(corta.puntos.some((p) => p.racha), false);
  assert.equal(E.graficoP([{ eventos: 1, total: 10 }]), null);
  assert.equal(E.graficoP([{ eventos: 11, total: 10 }, { eventos: 1, total: 10 }]), null);
});

test('OEE: disponibilidad, MTBF, MTTR, rendimiento y calidad', () => {
  const r = E.oeeEquipo({ programadas: 100, planificadas: 10, horasFalla: 5, fallas: 2, procesados: 8000, capacidadHora: 100, buenos: 7600 });
  cerca(r.operacion, 85, 1e-9);
  cerca(r.mtbf, 42.5, 1e-9);
  cerca(r.mttr, 2.5, 1e-9);
  cerca(r.disponibilidad, (85 / 90) * 100, 1e-9);
  cerca(r.rendimiento, (8000 / 8500) * 100, 1e-9);
  cerca(r.calidad, 95, 1e-9);
  cerca(r.oee, (85 / 90) * (8000 / 8500) * 0.95 * 100, 1e-9);
  const sinFallas = E.oeeEquipo({ programadas: 100, procesados: 5000, capacidadHora: 60, buenos: 5000 });
  assert.ok(Number.isNaN(sinFallas.mtbf));
  cerca(sinFallas.disponibilidad, 100, 1e-9);
  assert.ok(Number.isNaN(E.oeeEquipo({ programadas: 100 }).oee));
  assert.equal(E.oeeEquipo({ programadas: 10, horasFalla: 10 }), null);
  assert.equal(E.oeeEquipo({ programadas: 10, planificadas: 12 }), null);
});

test('AMEF: NPR, orden y marcas', () => {
  const r = E.amef([{ nombre: 'a', s: 9, o: 3, d: 4 }, { nombre: 'b', s: 5, o: 5, d: 5 }, { nombre: 'c', s: 2, o: 2, d: 2 }]);
  assert.deepEqual(r.map((x) => x.nombre), ['b', 'a', 'c']);
  assert.deepEqual(r.map((x) => x.npr), [125, 108, 8]);
  assert.equal(r[1].critico, true);
  assert.equal(r[0].critico, false);
  assert.equal(r[0].alto, true);
  assert.equal(r[2].alto, false);
  assert.equal(E.amef([{ nombre: 'x', s: 11, o: 1, d: 1 }]), null);
  assert.equal(E.amef([{ nombre: 'x', s: 1.5, o: 1, d: 1 }]), null);
  assert.equal(E.amef([]), null);
  // A igual NPR, la severidad más alta va primero.
  const empate = E.amef([{ nombre: 'p', s: 2, o: 5, d: 6 }, { nombre: 'q', s: 6, o: 5, d: 2 }]);
  assert.equal(empate[0].nombre, 'q');
});
