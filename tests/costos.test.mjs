// Pruebas de las fórmulas de costos y rendimiento (npm test). Valores de referencia calculados a mano.
import test from 'node:test';
import assert from 'node:assert/strict';
import * as K from '../src/lib/costos.js';

const cerca = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) <= tol, `${a} ≠ ${b}`);

// Kit de 500 determinaciones, 20 perdidas por kit; 800 muestras, 5 % de repeticiones,
// 30 corridas × 2 niveles de control, 4 calibraciones × 2 réplicas.
const base = {
  deterKit: 500,
  perdidaKit: 20,
  muestras: 800,
  repeticionPct: 5,
  corridasControl: 30,
  nivelesControl: 2,
  calibraciones: 4,
  replicadosCalib: 2,
};

test('rendimiento del reactivo: consumo, kits y reparto', () => {
  const r = K.rendimientoReactivo(base);
  cerca(r.consumo, 800 + 40 + 60 + 8); // 908
  cerca(r.kitsMes, 908 / 480);
  assert.equal(r.kitsAComprar, 2);
  cerca(r.reportablesPorKit, 800 / (908 / 480));
  cerca(r.rendimiento, (800 / ((908 / 480) * 500)) * 100);
  cerca(r.diasPorKit, 480 / (908 / 30));
  const suma = Object.values(r.reparto).reduce((s, x) => s + x, 0);
  cerca(suma, 100, 1e-9); // todo el kit queda repartido
});

test('rendimiento: sin pérdidas ni controles es 100 %', () => {
  const r = K.rendimientoReactivo({ deterKit: 100, muestras: 300 });
  cerca(r.rendimiento, 100);
  cerca(r.kitsMes, 3);
});

test('rendimiento: datos inválidos devuelven null', () => {
  assert.equal(K.rendimientoReactivo({ deterKit: 100, perdidaKit: 100, muestras: 10 }), null);
  assert.equal(K.rendimientoReactivo({ deterKit: 100, muestras: 0 }), null);
});

test('costo por determinación: suma de componentes y margen', () => {
  const c = K.costoDeterminacion({
    ...base,
    precioKit: 240000,
    costoControlMes: 40000,
    costoCalibradorMes: 20000,
    insumoPorDeterminacion: 10,
    minutosPorMuestra: 3,
    costoHora: 6000,
    costoFijoMes: 100000,
    arancel: 1500,
  });
  const reactivo = (908 / 480) * 240000;
  const insumos = 908 * 10;
  const personal = (800 * 3 * 6000) / 60; // 240000
  cerca(c.mensual.reactivo, reactivo);
  cerca(c.mensual.insumos, insumos);
  cerca(c.mensual.personal, personal);
  const total = reactivo + 40000 + 20000 + insumos + personal + 100000;
  cerca(c.total, total);
  cerca(c.costo, total / 800);
  cerca(Object.values(c.porDeterminacion).reduce((s, x) => s + x, 0), c.costo, 1e-9);
  cerca(c.margen, 1500 - total / 800);
  cerca(c.resultadoMes, c.margen * 800);
  // Equilibrio: costo fijo / (arancel − costo variable)
  cerca(c.equilibrio, 100000 / (1500 - (total - 100000) / 800));
});

test('costo por determinación: sin arancel no hay margen ni equilibrio', () => {
  const c = K.costoDeterminacion({ ...base, precioKit: 240000 });
  assert.ok(Number.isNaN(c.margen));
  assert.ok(Number.isNaN(c.equilibrio));
  cerca(c.costo, c.mensual.reactivo / 800);
});

test('equilibrio imposible si el arancel no cubre el costo variable', () => {
  const c = K.costoDeterminacion({ ...base, precioKit: 240000, costoFijoMes: 50000, arancel: 100 });
  assert.ok(Number.isNaN(c.equilibrio));
});

// Comprar vs. derivar: 400 al mes; propio con $900 variables y $200.000 fijos; externo a $1.400 + $100 de logística.
const dv = { volumen: 400, varInterno: 900, fijoInterno: 200000, tarifaExterna: 1400, logisticaPorMuestra: 100 };

test('comprar vs. derivar: costos mensuales, diferencia y equilibrio', () => {
  const r = K.comprarVsDerivar(dv);
  cerca(r.interno, 200000 + 900 * 400); // 560.000
  cerca(r.externo, 1500 * 400); // 600.000
  cerca(r.internoPorDet, 1400);
  cerca(r.externoPorDet, 1500);
  assert.equal(r.mejor, 'interno');
  cerca(r.ahorroMes, 40000);
  cerca(r.equilibrio, 200000 / 600); // 333,3 al mes
  assert.equal(r.sentido, 'sobre');
});

test('comprar vs. derivar: con poco volumen conviene derivar', () => {
  const r = K.comprarVsDerivar({ ...dv, volumen: 200 });
  assert.equal(r.mejor, 'externo');
  cerca(r.diferencia, 200 * 1500 - (200000 + 900 * 200)); // −80.000
});

test('comprar vs. derivar: sin costo fijo propio, lo propio siempre gana si es más barato', () => {
  const r = K.comprarVsDerivar({ ...dv, fijoInterno: 0 });
  assert.equal(r.mejor, 'interno');
  assert.ok(Number.isNaN(r.equilibrio));
});

test('comprar vs. derivar: el costo fijo del envío adelanta el equilibrio; escenarios y entradas inválidas', () => {
  const r = K.comprarVsDerivar({ ...dv, fijoExterno: 50000 });
  cerca(r.equilibrio, 150000 / 600);
  assert.deepEqual(r.escenarios.map((e) => e.volumen), [200, 400, 600, 800]);
  assert.equal(K.comprarVsDerivar({ ...dv, volumen: 0 }), null);
  assert.equal(K.comprarVsDerivar({ ...dv, tarifaExterna: NaN }), null);
  assert.equal(K.comprarVsDerivar({ ...dv, varInterno: -1 }), null);
});
