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
    cerca(F.ldlMartin(v.ct, v.hdl, v.tg), v.martin, 0.05);
  }
});

test('tabla de Martin-Hopkins: forma y coherencia (detecta errores de transcripción)', () => {
  assert.equal(F.TABLA_MARTIN.length, 30);
  F.TABLA_MARTIN.forEach(([, fila], i) => {
    assert.equal(fila.length, 6);
    for (let c = 1; c < 6; c++) assert.ok(fila[c] <= fila[c - 1], `fila ${i}: el factor no baja con más no HDL`);
    if (i > 0) fila.forEach((v, c) => assert.ok(v >= F.TABLA_MARTIN[i - 1][1][c] - 0.11, `fila ${i} col ${c}: el factor sube con más TG (medianas empíricas: se tolera una caída de 0,1 como en 97-100 / ≥220)`));
  });
  const desdes = F.TABLA_MARTIN.map(([d]) => d);
  assert.deepEqual(desdes, [...desdes].sort((a, b) => a - b));
});

test('factor y LDL de Martin-Hopkins: celdas y bordes de estrato', () => {
  assert.equal(F.factorMartin(7, 90), 3.5);
  assert.equal(F.factorMartin(49, 99.9), 3.5);
  assert.equal(F.factorMartin(50, 100), 3.9);
  assert.equal(F.factorMartin(150, 150), 5.7);
  assert.equal(F.factorMartin(399, 230), 5.9);
  assert.equal(F.factorMartin(400, 230), 6.7);
  assert.equal(F.factorMartin(800, 80), 11.9);
  assert.equal(F.factorMartin(13975, 160), 8.1);
  assert.equal(F.factorMartin(293, 189.9), 7.0);
  assert.equal(F.factorMartin(293, 190), 6.5);
  assert.ok(Number.isNaN(F.factorMartin(6, 100)));
  cerca(F.ldlMartin(200, 50, 150), 150 - 150 / 5.7, 1e-9);
});

test('comparación de LDL: filas, rangos y diferencias contra el directo', () => {
  const f = F.comparacionLdl(250, 40, 450, { directo: 110 });
  assert.deepEqual(f.map((x) => x.id), ['friedewald', 'martin', 'sampson', 'directo']);
  assert.equal(f[0].fueraDeRango, true);
  assert.equal(f[1].fueraDeRango, true);
  assert.equal(f[2].fueraDeRango, false);
  cerca(f[1].valor, 210 - 450 / 7.5, 1e-9);
  cerca(f[1].difDirecto, f[1].valor - 110, 1e-9);
  cerca(f[1].pctDirecto, ((f[1].valor - 110) / 110) * 100, 1e-9);
  assert.ok(Number.isNaN(f[3].difDirecto));
  assert.equal(F.comparacionLdl(200, 50, 900)[2].fueraDeRango, true);
  assert.equal(F.comparacionLdl(200, 50, 150).length, 3);
  assert.equal(F.comparacionLdl(200, 50, 3).length, 2);
});

test('barrido de triglicéridos: Friedewald se separa de Sampson al subir los TG', () => {
  const b = F.barridoTg(250, 40, [100, 400, 800]);
  assert.equal(b.length, 3);
  cerca(b[0].friedewald, 250 - 40 - 20, 1e-9);
  assert.ok(Math.abs(b[2].diferencia) > Math.abs(b[0].diferencia));
  cerca(b[1].diferencia, b[1].friedewald - b[1].sampson, 1e-9);
  cerca(b[2].martin, 210 - 800 / 7.5, 1e-9);
});

test('rendimiento diagnóstico: tabla 2×2 con valores a mano', () => {
  const r = F.rendimientoDiagnostico({ vp: 90, fp: 20, fn: 10, vn: 80 });
  cerca(r.sensibilidad, 90, 1e-9);
  cerca(r.especificidad, 80, 1e-9);
  cerca(r.exactitud, 85, 1e-9);
  cerca(r.prevalenciaUsada, 50, 1e-9);
  cerca(r.vpp, (90 / 110) * 100, 1e-9);
  cerca(r.vpn, (80 / 90) * 100, 1e-9);
  cerca(r.lrPositiva, 4.5, 1e-9);
  cerca(r.lrNegativa, 0.125, 1e-9);
  cerca(r.youden, 70, 1e-9);
  assert.ok(r.ciLrPositiva[0] < 4.5 && r.ciLrPositiva[1] > 4.5);
  assert.ok(r.ciSensibilidad[0] < 90 && r.ciSensibilidad[1] > 90);
});

test('rendimiento diagnóstico: prevalencia externa (Bayes) y casos inválidos', () => {
  const r = F.rendimientoDiagnostico({ vp: 90, fp: 20, fn: 10, vn: 80, prevalencia: 5 });
  // sens 0,9; esp 0,8; prevalencia 5 %: VPP = 0,045 / (0,045 + 0,2 × 0,95) = 19,1 %
  cerca(r.vpp, (0.045 / (0.045 + 0.19)) * 100, 1e-9);
  cerca(r.vpn, ((0.8 * 0.95) / (0.8 * 0.95 + 0.1 * 0.05)) * 100, 1e-9);
  assert.ok(Number.isNaN(r.ciVpp[0]));
  assert.equal(F.rendimientoDiagnostico({ vp: 0, fp: 0, fn: 0, vn: 5 }), null);
  assert.equal(F.rendimientoDiagnostico({ vp: 1.5, fp: 1, fn: 1, vn: 1 }), null);
});

test('temperatura cinética media: constante, mayor que el promedio y valor conocido', () => {
  cerca(F.temperaturaCineticaMedia([25, 25, 25]), 25, 1e-9);
  const m = F.temperaturaCineticaMedia([25, 35]);
  assert.ok(m > 30 && m < 35);
  cerca(m, 31.2, 0.1);
  assert.ok(Number.isNaN(F.temperaturaCineticaMedia([])));
});
