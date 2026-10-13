// Pruebas de la conversión de unidades y de los comparadores de ofertas (npm test).
import test from 'node:test';
import assert from 'node:assert/strict';
import * as C from '../src/lib/conversion.js';
import * as K from '../src/lib/costos.js';

const cerca = (a, b, tol = 0.01) => assert.ok(Math.abs(a - b) <= tol, `${a} ≠ ${b}`);

test('conversiones frecuentes entre unidades convencionales y SI', () => {
  cerca(C.convertir('glucosa', 100, 'mg/dL', 'mmol/L'), 5.55);
  cerca(C.convertir('glucosa', 5.55, 'mmol/L', 'mg/dL'), 100, 0.05);
  cerca(C.convertir('colesterol', 200, 'mg/dL', 'mmol/L'), 5.17);
  cerca(C.convertir('trigliceridos', 150, 'mg/dL', 'mmol/L'), 1.69);
  cerca(C.convertir('creatinina', 1, 'mg/dL', 'µmol/L'), 88.4);
  cerca(C.convertir('urea', 30, 'mg/dL', 'BUN mg/dL'), 14.0, 0.05);
  cerca(C.convertir('urea', 30, 'mg/dL', 'mmol/L'), 4.99);
  cerca(C.convertir('acido-urico', 5, 'mg/dL', 'µmol/L'), 297.4, 0.1);
  cerca(C.convertir('calcio', 9.5, 'mg/dL', 'mmol/L'), 2.37);
  cerca(C.convertir('bilirrubina', 1, 'mg/dL', 'µmol/L'), 17.1, 0.01);
  cerca(C.convertir('hemoglobina', 14, 'g/dL', 'g/L'), 140);
  cerca(C.convertir('hemoglobina', 14, 'g/dL', 'mmol/L'), 8.69);
  cerca(C.convertir('hierro', 100, 'µg/dL', 'µmol/L'), 17.91);
});

test('las conversiones son reversibles y las unidades inexistentes dan NaN', () => {
  for (const a of C.ANALITOS) {
    const [base, otra] = Object.keys(a.unidades);
    cerca(C.convertir(a.id, C.convertir(a.id, 123.4, base, otra), otra, base), 123.4, 1e-9);
    cerca(C.convertir(a.id, 7, base, base), 7, 1e-12);
  }
  assert.ok(Number.isNaN(C.convertir('glucosa', 1, 'mg/dL', 'g/L')));
  assert.ok(Number.isNaN(C.convertir('no-existe', 1, 'a', 'b')));
});

test('HbA1c: IFCC, NGSP y glucosa promedio estimada', () => {
  cerca(C.hba1cAIfcc(7), 53.0, 0.05);
  cerca(C.hba1cANgsp(C.hba1cAIfcc(6.4)), 6.4, 1e-9);
  cerca(C.hba1cAIfcc(5.7), 38.8, 0.05);
  cerca(C.glucosaPromedioEstimada(7), 154.2, 0.05);
});

const produccion = {
  muestras: 800,
  repeticionPct: 5,
  corridasControl: 30,
  nivelesControl: 2,
  calibraciones: 4,
  replicadosCalib: 2,
};

test('comparador de ofertas: la más barata por resultado reportable y las diferencias', () => {
  const r = K.compararOfertas(produccion, [
    { nombre: 'A', precioKit: 240000, deterKit: 500, perdidaKit: 20, costoFijoMes: 100000 },
    { nombre: 'B', precioKit: 200000, deterKit: 500, perdidaKit: 20, costoFijoMes: 300000 },
    { nombre: 'C', precioKit: NaN, deterKit: 500 },
  ]);
  const a = K.costoDeterminacion({ ...produccion, precioKit: 240000, deterKit: 500, perdidaKit: 20, costoFijoMes: 100000 });
  const b = K.costoDeterminacion({ ...produccion, precioKit: 200000, deterKit: 500, perdidaKit: 20, costoFijoMes: 300000 });
  cerca(r.filas[0].costo, a.costo, 1e-9);
  cerca(r.filas[1].costo, b.costo, 1e-9);
  const mejor = a.costo < b.costo ? 0 : 1;
  assert.equal(r.indiceMejor, mejor);
  cerca(r.filas[mejor].difUnitaria, 0, 1e-9);
  const peor = 1 - mejor;
  cerca(r.filas[peor].difAnio, (r.filas[peor].costo - r.filas[mejor].costo) * 800 * 12, 1e-6);
  cerca(r.filas[0].totalAnio, a.total * 12, 1e-6);
  assert.ok(r.filas[2].costo !== r.filas[2].costo || r.filas[2].resultado === null || Number.isNaN(r.filas[2].costo));
});

test('comparador de ofertas sin ofertas válidas', () => {
  const r = K.compararOfertas(produccion, [{ nombre: 'X', precioKit: 100, deterKit: 0 }]);
  assert.equal(r.indiceMejor, -1);
});
