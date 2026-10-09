// Pruebas de las fórmulas de stock y punto de pedido (npm test). Valores de referencia calculados a mano.
import test from 'node:test';
import assert from 'node:assert/strict';
import { puntoDePedido } from '../src/lib/stock.js';

const cerca = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) <= tol, `${a} ≠ ${b}`);

// 60 kits al mes (2 al día), plazo de 10 días, 5 días de retraso posible y consumo hasta 20 % mayor.
const base = { consumoMes: 60, plazoDias: 10, margenDias: 5, picoPct: 20, cicloDias: 30, unidadesEnvase: 1 };

test('stock de seguridad y punto de pedido', () => {
  const r = puntoDePedido(base);
  cerca(r.consumoDia, 2);
  cerca(r.consumoPlazo, 20);
  cerca(r.seguridad, 2 * 1.2 * 15 - 20); // 16
  cerca(r.puntoPedido, 36);
});

test('cantidad por pedido: ciclo, redondeo al envase y stock máximo', () => {
  const r = puntoDePedido(base);
  cerca(r.cantidad, 60);
  cerca(r.stockMaximo, 76);
  cerca(r.coberturaMaxDias, 38);
  const caja = puntoDePedido({ ...base, cicloDias: 20, unidadesEnvase: 12 }); // 40 → 4 cajas de 12 = 48
  assert.equal(caja.envases, 4);
  cerca(caja.cantidad, 48);
  const exacto = puntoDePedido({ ...base, cicloDias: 30, unidadesEnvase: 12 }); // 60 → 5 cajas exactas
  assert.equal(exacto.envases, 5);
});

test('estado con stock actual: ok, pedir y urgente', () => {
  assert.equal(puntoDePedido({ ...base, stockActual: 50 }).estado, 'ok');
  assert.equal(puntoDePedido({ ...base, stockActual: 30 }).estado, 'pedir');
  assert.equal(puntoDePedido({ ...base, stockActual: 36 }).estado, 'pedir');
  assert.equal(puntoDePedido({ ...base, stockActual: 15 }).estado, 'urgente'); // menos que el consumo del plazo
  const r = puntoDePedido({ ...base, stockActual: 50 });
  cerca(r.coberturaDias, 25);
  cerca(r.diasHastaPedir, 7);
});

test('riesgo de vencimiento y entradas opcionales', () => {
  assert.equal(puntoDePedido({ ...base, vidaUtilDias: 30 }).riesgoVencimiento, true); // 38 días de stock máximo
  assert.equal(puntoDePedido({ ...base, vidaUtilDias: 60 }).riesgoVencimiento, false);
  const sin = puntoDePedido({ consumoMes: 60, plazoDias: 10 });
  cerca(sin.seguridad, 0);
  assert.ok(Number.isNaN(sin.cantidad));
  assert.equal(sin.estado, null);
});

test('datos inválidos devuelven null', () => {
  assert.equal(puntoDePedido({ consumoMes: 0, plazoDias: 10 }), null);
  assert.equal(puntoDePedido({ consumoMes: 60, plazoDias: -1 }), null);
});
