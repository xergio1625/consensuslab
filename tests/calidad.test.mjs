// Pruebas de las fórmulas de las calculadoras (npm test). Valores de referencia calculados a mano.
import test from 'node:test';
import assert from 'node:assert/strict';
import * as C from '../src/lib/calidad.js';

const cerca = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) <= tol, `${a} ≠ ${b}`);

test('números escritos con coma o punto y listas pegadas', () => {
  assert.equal(C.numero('2,5'), 2.5);
  assert.equal(C.numero(' 100 '), 100);
  assert.equal(C.numero('-0,3'), -0.3);
  assert.ok(Number.isNaN(C.numero('abc')));
  assert.ok(Number.isNaN(C.numero('1.2.3')));
  assert.deepEqual(C.valores('98,5\n101\r\n99.5; 100\t102'), [98.5, 101, 99.5, 100, 102]);
});

test('estadística del control: media, DE muestral, CV y límites', () => {
  const r = C.estadistica([98, 100, 102, 100, 100]);
  assert.equal(r.n, 5);
  cerca(r.media, 100);
  cerca(r.de, Math.sqrt(8 / 4)); // Σ(x − media)² = 8; n − 1 = 4
  cerca(r.cv, Math.sqrt(2));
  cerca(r.limites[2].bajo, 100 - 2 * Math.sqrt(2));
  cerca(r.limites[3].alto, 100 + 3 * Math.sqrt(2));
  assert.deepEqual([r.min, r.max], [98, 102]);
});

test('sesgo %, SDI e interpretación', () => {
  cerca(C.sesgo(103, 100), 3);
  cerca(C.sesgo(95, 100), -5);
  cerca(C.sdi(105, 100, 2), 2.5);
  assert.equal(C.categoriaSdi(-1.9).nivel, 'ok');
  assert.equal(C.categoriaSdi(2.5).nivel, 'advertencia');
  assert.equal(C.categoriaSdi(-3.2).nivel, 'error');
});

test('error total, sigma y error sistemático crítico', () => {
  // Glucosa de ejemplo: TEa 10 %, sesgo 2 %, CV 2 %.
  cerca(C.errorTotal(2, 2), 5.3);
  cerca(C.errorTotal(-2, 2), 5.3, 1e-9);
  cerca(C.sigma(10, 2, 2), 4);
  cerca(C.sigma(10, -2, 2), 4);
  cerca(C.errorSistematicoCritico(10, 2, 2), 2.35);
});

test('categoría sigma y reglas sugeridas (Westgard Sigma Rules)', () => {
  assert.equal(C.categoriaSigma(6.2).reglas, '1-3s');
  assert.equal(C.categoriaSigma(5).texto, 'Excelente');
  assert.equal(C.categoriaSigma(4).reglas, '1-3s / 2-2s / R-4s / 4-1s');
  assert.equal(C.categoriaSigma(3.5).texto, 'Marginal');
  assert.equal(C.categoriaSigma(2.5).texto, 'Pobre');
  assert.equal(C.categoriaSigma(1).texto, 'Inaceptable');
  assert.ok(C.categoriaSigma(1).nota);
});

test('funciones de poder: Pfr y Ped de reglas simples (exactas)', () => {
  cerca(C.normalAcumulada(0), 0.5, 1e-7);
  cerca(C.normalAcumulada(1.96), 0.975, 1e-4);
  cerca(C.normalAcumulada(-3), 0.00135, 1e-5);
  const p = (id) => C.PROCEDIMIENTOS_QC.find((x) => x.id === id);
  cerca(C.probabilidadRechazo(p('13s-n2'), 0), 1 - (1 - 0.0027) ** 2, 2e-5); // ≈ 0,5 %
  cerca(C.probabilidadRechazo(p('12s-n2'), 0), 1 - (1 - 0.0455) ** 2, 2e-4); // ≈ 9 %
  // Con un error de 3 DE, cada control cae fuera de 3 DE la mitad de las veces: 1 − 0,5² ≈ 0,75.
  cerca(C.probabilidadRechazo(p('13s-n2'), 3), 0.75, 2e-3);
  assert.equal(C.nombreProcedimiento(p('12.5s-n2')), '1-2,5s · N = 2');
  assert.equal(C.nombreProcedimiento(p('multi-n4r2')), '1-3s / 2-2s / R-4s / 4-1s / 8-x · N = 4, R = 2');
});

test('funciones de poder: multirreglas simuladas y reproducibles', () => {
  const multi = C.PROCEDIMIENTOS_QC.find((x) => x.id === 'multi-n2');
  const pfr = C.probabilidadRechazo(multi, 0, 100000);
  assert.ok(pfr > 0.007 && pfr < 0.014, `Pfr multirregla N = 2 ≈ 1 %: ${pfr}`);
  assert.equal(C.probabilidadRechazo(multi, 2, 5000), C.probabilidadRechazo(multi, 2, 5000), 'misma semilla, mismo resultado');
  assert.ok(C.probabilidadRechazo(multi, 3, 5000) > C.probabilidadRechazo(multi, 2, 5000), 'más error, más detección');
});

test('diseño del control según la Ped mínima y la Pfr máxima', () => {
  // Sigma 6 (ΔSEcrit 4,35): basta la regla más simple.
  let d = C.disenoControl(4.35, 0.9, 0.05, 5000);
  assert.equal(d.recomendado.id, '13.5s-n2');
  // Sigma 4 (ΔSEcrit 2,35) con metas habituales: hace falta más que 1-3s N = 2.
  d = C.disenoControl(2.35, 0.9, 0.05, 5000);
  assert.ok(d.recomendado && !['13.5s-n2', '13s-n2'].includes(d.recomendado.id));
  // Si se acepta más falso rechazo, aparece la 1-2s.
  d = C.disenoControl(2.35, 0.5, 0.1, 5000);
  assert.equal(d.filas.find((f) => f.id === '12s-n2').cumplePfr, true);
  // Sigma 3 (ΔSEcrit 1,35) exigiendo Ped 90 % y Pfr 1 %: ninguno cumple; se informa el mejor posible.
  d = C.disenoControl(1.35, 0.9, 0.01, 5000);
  assert.equal(d.recomendado, null);
  assert.ok(d.mejor && d.mejor.cumplePfr && !d.mejor.cumplePed);
});

test('especificaciones desde la variabilidad biológica (modelo de Fraser)', () => {
  // CVi 5 %, CVg 7 %: √(25 + 49) = 8,602…
  const r = C.especificacionesBiologicas(5, 7);
  const total = Math.sqrt(74);
  cerca(r.deseable.cv, 2.5);
  cerca(r.deseable.sesgo, 0.25 * total);
  cerca(r.deseable.tea, 1.65 * 2.5 + 0.25 * total);
  cerca(r.optimo.cv, 1.25);
  cerca(r.minimo.sesgo, 0.375 * total);
  assert.ok(r.optimo.tea < r.deseable.tea && r.deseable.tea < r.minimo.tea);
});

test('formato con coma decimal', () => {
  assert.equal(C.formato(5.3), '5,30');
  assert.equal(C.formato(4, 1), '4,0');
  assert.equal(C.formato(NaN), '—');
});
