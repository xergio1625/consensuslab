// Pruebas del autodiagnóstico: semáforo, plan sugerido y acciones (npm test).
import test from 'node:test';
import assert from 'node:assert/strict';
import { BLOQUES, evaluar, semaforo } from '../src/lib/diagnostico.js';

const todo = (a, b, c, d) => ({ a: [a, a, a], b: [b, b, b], c: [c, c, c], d: [d, d, d] });

test('hay cuatro bloques de tres preguntas', () => {
  assert.equal(BLOQUES.length, 4);
  for (const b of BLOQUES) assert.equal(b.preguntas.length, 3);
});

test('semáforo por bloque', () => {
  assert.equal(semaforo(6), 'verde');
  assert.equal(semaforo(5), 'verde');
  assert.equal(semaforo(4), 'amarillo');
  assert.equal(semaforo(3), 'amarillo');
  assert.equal(semaforo(2), 'rojo');
  assert.equal(semaforo(0), 'rojo');
});

test('plan según los bloques débiles: el plan y su aplicación van a Consensus QC', () => {
  assert.equal(evaluar(todo(0, 2, 2, 2)).plan, 'qc');
  assert.equal(evaluar(todo(2, 0, 2, 2)).plan, 'qc');
  assert.equal(evaluar(todo(0, 0, 2, 2)).plan, 'qc');
  assert.equal(evaluar(todo(2, 2, 0, 2)).plan, 'gestion');
  assert.equal(evaluar(todo(2, 2, 2, 0)).plan, 'esencial');
});

test('calidad débil junto con operación o dirección débil: Gestión + Consensus QC', () => {
  assert.equal(evaluar(todo(0, 2, 0, 2)).plan, 'gestion_qc');
  assert.equal(evaluar(todo(2, 0, 2, 0)).plan, 'gestion_qc');
  assert.equal(evaluar(todo(0, 0, 2, 0)).plan, 'gestion_qc');
  assert.equal(evaluar(todo(2, 2, 0, 0)).plan, 'gestion');
});

test('una sola respuesta «a veces» por bloque no lo vuelve débil', () => {
  const r = evaluar({ a: [2, 2, 1], b: [2, 2, 1], c: [2, 2, 1], d: [2, 2, 1] });
  assert.equal(r.cuantosDebiles, 0);
  assert.ok(r.bloques.every((b) => b.semaforo === 'verde'));
});

test('con todo sólido se sugiere según el bloque más bajo', () => {
  assert.equal(evaluar({ a: [2, 2, 1], b: [2, 2, 2], c: [2, 2, 2], d: [2, 2, 2] }).plan, 'qc');
  assert.equal(evaluar({ a: [2, 2, 2], b: [2, 2, 2], c: [2, 2, 1], d: [2, 2, 2] }).plan, 'gestion');
  assert.equal(evaluar({ a: [2, 2, 2], b: [2, 2, 2], c: [2, 2, 2], d: [2, 2, 1] }).plan, 'esencial');
});

test('varias sedes o más de 15 personas dan Institucional sin importar el puntaje', () => {
  assert.equal(evaluar(todo(2, 2, 2, 2), { sedes: '2omas' }).plan, 'institucional');
  assert.equal(evaluar(todo(0, 0, 0, 0), { usuarios: 'mas15' }).plan, 'institucional');
  assert.equal(evaluar(todo(0, 2, 2, 2), { usuarios: '6a15', sedes: '1' }).plan, 'qc');
});

test('tres acciones, empezando por el bloque más débil', () => {
  const r = evaluar(todo(2, 0, 1, 2));
  assert.equal(r.acciones.length, 3);
  assert.equal(r.acciones[0].ruta, BLOQUES[1].acciones[0].ruta);
  assert.equal(r.total, 6 + 0 + 3 + 6);
});

test('las rutas de las acciones son rutas internas con barra final', () => {
  for (const b of BLOQUES) for (const a of b.acciones) assert.match(a.ruta, /^[a-z-]+\/[a-z0-9-]+\/$/);
});
