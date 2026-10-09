// Pruebas de las reglas del gráfico de Levey-Jennings (npm test). Media 100 y DE 2 en todos los casos.
import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluarLevey, puntuacionZ } from '../src/lib/levey.js';

const evaluar = (valores, activas) => evaluarLevey(valores, 100, 2, activas);
const reglasEn = (puntos, i) => puntos[i - 1].reglas;

test('puntuación z', () => {
  assert.equal(puntuacionZ(104, 100, 2), 2);
  assert.equal(puntuacionZ(97, 100, 2), -1.5);
});

test('1-2s es advertencia y 1-3s rechaza', () => {
  const p = evaluar([100, 104.5, 106.4, 93]);
  assert.equal(p[0].nivel, 'ok');
  assert.deepEqual([p[1].nivel, p[1].reglas], ['advertencia', ['1-2s']]);
  assert.equal(p[2].nivel, 'rechazo');
  assert.deepEqual(reglasEn(p, 3), ['1-2s', '1-3s', '2-2s']); // 104,5 y 106,4: dos seguidos sobre 2 DE
  assert.deepEqual(reglasEn(p, 4), ['1-2s', '1-3s', 'R-4s']); // 93 → z = −3,5, del lado opuesto
});

test('2-2s: dos seguidos del mismo lado, no de lados opuestos', () => {
  assert.ok(reglasEn(evaluar([100, 104.5, 104.2]), 3).includes('2-2s'));
  assert.ok(!reglasEn(evaluar([100, 104.5, 95.5]), 3).includes('2-2s'));
  assert.ok(!reglasEn(evaluar([100, 104.5, 101]), 3).includes('2-2s'));
});

test('R-4s: dos seguidos de lados opuestos que difieren en más de 4 DE', () => {
  assert.ok(reglasEn(evaluar([100, 104.5, 95.5]), 3).includes('R-4s')); // z de 2,25 a −2,25
  assert.ok(!reglasEn(evaluar([100, 104.5, 97]), 3).includes('R-4s')); // difieren 3,75
  assert.ok(!reglasEn(evaluar([100, 104.5, 109]), 3).includes('R-4s')); // mismo lado
});

test('4-1s: cuatro seguidos sobre 1 DE o bajo −1 DE', () => {
  const p = evaluar([100, 102.5, 103, 102.4, 103.1, 100]);
  assert.deepEqual(reglasEn(p, 5), ['4-1s']);
  assert.deepEqual(reglasEn(p, 4), []);
  assert.deepEqual(reglasEn(evaluar([97.5, 97, 97.4, 96.9]), 4), ['4-1s']);
  assert.deepEqual(reglasEn(evaluar([102.5, 103, 97.4, 103.1]), 4), []);
});

test('10-x: diez seguidos del mismo lado de la media', () => {
  const sobre = Array(10).fill(100.5);
  assert.deepEqual(reglasEn(evaluar(sobre), 10), ['10-x']);
  assert.deepEqual(reglasEn(evaluar(sobre.slice(0, 9)), 9), []);
  assert.deepEqual(reglasEn(evaluar([...sobre.slice(0, 9), 99.5]), 10), []);
});

test('reglas desactivadas no se evalúan y el nivel depende de las activas', () => {
  const p = evaluar([100, 104.5, 106.4], ['1-2s']);
  assert.deepEqual(p[2].reglas, ['1-2s']);
  assert.equal(p[2].nivel, 'advertencia');
  assert.equal(evaluar([100, 106.4], []).at(-1).nivel, 'ok');
});
