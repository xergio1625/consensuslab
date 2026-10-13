// Pruebas de la fase 3: centrífuga, desinfectantes, actividad enzimática, licitación, curvas de calibración, CUSUM y EWMA.
import test from 'node:test';
import assert from 'node:assert/strict';
import * as L from '../src/lib/laboratorio.js';
import * as K from '../src/lib/calibracion.js';
import * as A from '../src/lib/control_avanzado.js';

const cerca = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) <= tol, `${a} ≠ ${b}`);

test('centrífuga: g ↔ rpm', () => {
  cerca(L.rcf(14000, 8.5), 18625.88, 0.01);
  cerca(L.rcf(3000, 10), 1006.2, 0.01);
  cerca(L.rpmDesdeRcf(L.rcf(14000, 8.5), 8.5), 14000, 1e-6);
  cerca(L.rpmDesdeRcf(1000, 10), Math.sqrt(1000 / 1.118e-4), 1e-9);
});

test('desinfectante: producto, agua y factor, y cloro % ↔ ppm', () => {
  const r = L.diluirDesinfectante({ comercial: 5, objetivo: 0.1, volumenFinal: 1000 });
  cerca(r.producto, 20, 1e-9);
  cerca(r.agua, 980, 1e-9);
  cerca(r.factor, 50, 1e-9);
  assert.equal(L.diluirDesinfectante({ comercial: 1, objetivo: 5, volumenFinal: 100 }).error, 'concentrar');
  assert.equal(L.diluirDesinfectante({ comercial: 5, objetivo: 0, volumenFinal: 100 }).error, 'positivos');
  cerca(L.porcentajeAPpm(0.1), 1000, 1e-9);
  cerca(L.ppmAPorcentaje(5000), 0.5, 1e-12);
});

test('actividad enzimática: U/L, µkat/L y blanco', () => {
  const r = L.actividadEnzimatica({ deltaAbsMin: 0.1, volTotal: 1, volMuestra: 0.02, epsilon: 6.22 });
  cerca(r.ul, (0.1 * 1000) / (6.22 * 0.02), 1e-9);
  cerca(r.ul, 803.86, 0.01);
  cerca(r.ukatL, r.ul / 60, 1e-9);
  cerca(r.nkatL, (r.ul * 1000) / 60, 1e-6);
  const conBlanco = L.actividadEnzimatica({ deltaAbsMin: 0.12, blancoAbsMin: 0.02, volTotal: 1, volMuestra: 0.02, epsilon: 6.22 });
  cerca(conBlanco.ul, r.ul, 1e-6);
  cerca(L.actividadEnzimatica({ deltaAbsMin: 0.1, volTotal: 1, volMuestra: 0.02, epsilon: 6.22, dilucion: 2 }).ul, 2 * r.ul, 1e-6);
  cerca(L.actividadEnzimatica({ deltaAbsMin: 0.1, volTotal: 1, volMuestra: 0.02, epsilon: 6.22, paso: 0.5 }).ul, 2 * r.ul, 1e-6);
  assert.equal(L.actividadEnzimatica({ deltaAbsMin: 0.1, volTotal: 1, volMuestra: 2, epsilon: 6.22 }), null);
  assert.equal(L.actividadEnzimatica({ deltaAbsMin: NaN, volTotal: 1, volMuestra: 0.1, epsilon: 6.22 }), null);
});

const ofertas = [
  { nombre: 'A', precio: 100, tecnico: 80, otros: 50 },
  { nombre: 'B', precio: 80, tecnico: 70, otros: 100 },
  { nombre: 'C', precio: 120, tecnico: 90, otros: 0 },
];

test('puntaje de licitación: económico por precio mínimo y ponderación', () => {
  const r = L.puntajeLicitacion({ ponderacion: { economico: 60, tecnico: 30, otros: 10 }, ofertas });
  cerca(r.precioMinimo, 80, 1e-9);
  cerca(r.filas[0].puntajeEconomico, 80, 1e-9);
  cerca(r.filas[1].puntajeEconomico, 100, 1e-9);
  cerca(r.filas[0].total, 77, 1e-9);
  cerca(r.filas[1].total, 91, 1e-9);
  cerca(r.filas[2].total, 67, 1e-9);
  assert.deepEqual(r.filas.map((f) => f.lugar), [2, 1, 3]);
  assert.equal(r.ganadora.nombre, 'B');
  assert.equal(r.empate, false);
});

test('puntaje de licitación: mínimo técnico excluye y recalcula el precio mínimo', () => {
  const r = L.puntajeLicitacion({ ponderacion: { economico: 60, tecnico: 30, otros: 10 }, ofertas, minimoTecnico: 75 });
  assert.equal(r.filas[1].admisible, false);
  assert.ok(Number.isNaN(r.filas[1].total));
  cerca(r.precioMinimo, 100, 1e-9);
  cerca(r.filas[0].total, 89, 1e-9);
  cerca(r.filas[2].total, 77, 1e-9);
  assert.equal(r.ganadora.nombre, 'A');
});

test('puntaje de licitación: ponderaciones inválidas, empates y sin ofertas', () => {
  assert.equal(L.puntajeLicitacion({ ponderacion: { economico: 50, tecnico: 30, otros: 10 }, ofertas }), null);
  assert.equal(L.puntajeLicitacion({ ponderacion: { economico: 100 }, ofertas: [{ nombre: 'X', precio: NaN }] }), null);
  const r = L.puntajeLicitacion({
    ponderacion: { economico: 100, tecnico: 0, otros: 0 },
    ofertas: [{ nombre: 'P', precio: 50 }, { nombre: 'Q', precio: 50 }],
  });
  assert.equal(r.empate, true);
  assert.deepEqual(r.filas.map((f) => f.lugar), [1, 1]);
});

test('calibración lineal: recta exacta, ponderaciones e inversa', () => {
  const x = [0, 1, 2, 3, 4];
  const y = x.map((v) => 1 + 2 * v);
  for (const peso of ['ninguno', '1/x', '1/x2']) {
    const a = K.ajusteLineal(x, y, peso);
    cerca(a.a, 1, 1e-9);
    cerca(a.b, 2, 1e-9);
    cerca(a.r2, 1, 1e-9);
  }
  const c = K.calibrar({ x, y, desconocidas: [5, 20] });
  cerca(c.desconocidas[0].concentracion, 2, 1e-9);
  assert.equal(c.desconocidas[0].fueraDeRango, false);
  assert.equal(c.desconocidas[1].fueraDeRango, true);
  cerca(c.estandares[2].recuperacion, 100, 1e-9);
  assert.ok(Number.isNaN(c.estandares[0].recuperacion));
  assert.equal(K.calibrar({ x: [1, 2], y: [1, 2] }), null);
});

const p4 = { a: 0.05, b: 1.5, c: 20, d: 2.5 };
const f4 = (x) => p4.d + (p4.a - p4.d) / (1 + (x / p4.c) ** p4.b);
const x4 = [0, 1, 2.5, 5, 10, 20, 40, 80, 160, 320];

test('4PL: recupera los parámetros de datos sin ruido y la inversa', () => {
  const y4 = x4.map(f4);
  const fit = K.ajuste4pl(x4, y4);
  cerca(fit.a, p4.a, 1e-4);
  cerca(fit.b, p4.b, 1e-4);
  cerca(fit.c, p4.c, 1e-3);
  cerca(fit.d, p4.d, 1e-4);
  cerca(fit.r2, 1, 1e-9);
  cerca(fit.invertir(f4(30)), 30, 1e-3);
  assert.ok(Number.isNaN(fit.invertir(3)), 'señal sobre el máximo de la curva');
  assert.ok(Number.isNaN(fit.invertir(0.01)), 'señal bajo el mínimo de la curva');
});

test('4PL: con ruido pequeño y con curva descendente', () => {
  const ruido = [0.01, -0.02, 0.015, -0.01, 0.02, -0.015, 0.01, -0.02, 0.01, -0.01];
  const fit = K.ajuste4pl(x4, x4.map((v, i) => f4(v) + ruido[i]));
  assert.ok(fit.r2 > 0.999);
  cerca(fit.c, 20, 3);
  const desc = K.ajuste4pl(x4, x4.map((v) => 2.5 - (f4(v) - 0.05) + 0.05));
  cerca(desc.invertir(desc.predecir(15)), 15, 1e-2);
  assert.equal(K.ajuste4pl([1, 2, 3], [1, 2, 3]), null);
  assert.equal(K.ajuste4pl([1, 2, 3, 4, 5], [1, 1, 1, 1, 1]), null);
});

test('CUSUM tabular: señal con un desvío sostenido de 1 DE, y sin desvío', () => {
  const datos = [0, 0, ...Array(11).fill(1)];
  const r = A.cusum(datos, 0, 1);
  cerca(r[11].cMas, 5, 1e-9);
  assert.equal(r[11].senal, false);
  const primera = r.find((p) => p.senal);
  assert.equal(primera.indice, 13);
  assert.equal(primera.sentido, 'alza');
  assert.equal(primera.inicio, 3);
  assert.equal(A.cusum(Array(30).fill(0), 0, 1).some((p) => p.senal), false);
  const baja = A.cusum(Array(14).fill(-1), 0, 1).find((p) => p.senal);
  assert.equal(baja.sentido, 'baja');
  cerca(A.cusum([2], 0, 2)[0].z, 1, 1e-9);
});

test('EWMA: valor y límites exactos del primer punto y límite estable', () => {
  const r = A.ewma([1], 0, 1);
  cerca(r[0].ewma, 0.2, 1e-12);
  cerca(r[0].limiteSup, 0.6, 1e-12);
  cerca(r[0].limiteInf, -0.6, 1e-12);
  const larga = A.ewma(Array(200).fill(0), 0, 1);
  cerca(larga[199].limiteSup, 3 * Math.sqrt(0.2 / 1.8), 1e-6);
  assert.equal(larga.some((p) => p.senal), false);
  const alza = A.ewma(Array(30).fill(1.5), 0, 1);
  assert.ok(alza.some((p) => p.senal));
});
