// Pruebas de las fórmulas de diluciones y soluciones (npm test). Valores de referencia calculados a mano.
import test from 'node:test';
import assert from 'node:assert/strict';
import * as S from '../src/lib/soluciones.js';

const cerca = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) <= tol, `${a} ≠ ${b}`);

test('C1·V1 = C2·V2: despeja cada una de las cuatro incógnitas', () => {
  // Cloro 5 % → 0,1 % en 1000 mL: 20 mL de stock y 980 de agua.
  const a = S.resolverDilucion({ c1: 5, v1: NaN, c2: 0.1, v2: 1000 });
  cerca(a.v1, 20);
  cerca(a.diluyente, 980);
  cerca(a.factor, 50);
  cerca(S.resolverDilucion({ c1: NaN, v1: 20, c2: 0.1, v2: 1000 }).c1, 5);
  cerca(S.resolverDilucion({ c1: 5, v1: 20, c2: NaN, v2: 1000 }).c2, 0.1);
  cerca(S.resolverDilucion({ c1: 5, v1: 20, c2: 0.1, v2: NaN }).v2, 1000);
});

test('dilución simple: casos inválidos', () => {
  assert.equal(S.resolverDilucion({ c1: 5, v1: 1, c2: 0.1, v2: 10 }).error, 'vacio-uno');
  assert.equal(S.resolverDilucion({ c1: 5, v1: NaN, c2: NaN, v2: 10 }).error, 'faltan-datos');
  assert.equal(S.resolverDilucion({ c1: 5, v1: NaN, c2: 10, v2: 100 }).error, 'concentrar'); // 10 > 5
  assert.equal(S.resolverDilucion({ c1: 5, v1: 200, c2: 1, v2: NaN }).error, undefined);
  assert.equal(S.resolverDilucion({ c1: -1, v1: NaN, c2: 1, v2: 10 }).error, 'positivos');
});

test('dilución seriada: factor 2 y factor 10', () => {
  const f2 = S.dilucionSeriada({ factor: 2, tubos: 4, volFinal: 1, concInicial: 800 });
  assert.deepEqual(f2.map((f) => f.acumulado), [2, 4, 8, 16]);
  assert.deepEqual(f2.map((f) => f.concentracion), [400, 200, 100, 50]);
  cerca(f2[0].traspaso, 0.5);
  cerca(f2[0].diluyente, 0.5);
  const f10 = S.dilucionSeriada({ factor: 10, tubos: 3, volFinal: 9, concInicial: NaN });
  assert.deepEqual(f10.map((f) => f.acumulado), [10, 100, 1000]);
  cerca(f10[0].traspaso, 0.9);
  cerca(f10[0].diluyente, 8.1);
  assert.ok(Number.isNaN(f10[0].concentracion));
  assert.equal(S.dilucionSeriada({ factor: 1, tubos: 3, volFinal: 1 }), null);
  assert.equal(S.dilucionSeriada({ factor: 2, tubos: 2.5, volFinal: 1 }), null);
});

test('soluto a pesar o medir según el tipo de concentración', () => {
  // NaCl 0,9 % p/v en 500 mL = 4,5 g; NaCl 1 M en 100 mL (58,44 g/mol) = 5,844 g.
  cerca(S.cantidadSoluto({ tipo: 'pv', conc: 0.9, volMl: 500 }), 4.5);
  cerca(S.cantidadSoluto({ tipo: 'M', conc: 1, volMl: 100, pm: 58.44 }), 5.844);
  cerca(S.cantidadSoluto({ tipo: 'mM', conc: 150, volMl: 1000, pm: 58.44 }), 8.766);
  cerca(S.cantidadSoluto({ tipo: 'mgml', conc: 10, volMl: 50 }), 0.5);
  cerca(S.cantidadSoluto({ tipo: 'pvv', conc: 70, volMl: 1000 }), 700); // alcohol 70 %
  assert.ok(Number.isNaN(S.cantidadSoluto({ tipo: 'M', conc: 1, volMl: 100 }))); // falta el PM
  assert.ok(Number.isNaN(S.cantidadSoluto({ tipo: 'pv', conc: 0, volMl: 100 })));
});
