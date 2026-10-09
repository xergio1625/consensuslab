// Gráfico de Levey-Jennings: puntuación z de cada resultado y reglas de Westgard sobre una serie de un solo nivel
// de control. Funciones puras (se prueban con `npm test`).

/** Reglas disponibles. La 1-2s es solo una advertencia; las demás rechazan la corrida. */
export const REGLAS_LJ = [
  { id: '1-2s', nivel: 'advertencia', texto: 'Un resultado pasa ±2 DE', corta: 'advertencia' },
  { id: '1-3s', nivel: 'rechazo', texto: 'Un resultado pasa ±3 DE', corta: 'error aleatorio o sistemático' },
  { id: '2-2s', nivel: 'rechazo', texto: 'Dos seguidos pasan 2 DE del mismo lado', corta: 'error sistemático' },
  { id: 'R-4s', nivel: 'rechazo', texto: 'Dos seguidos difieren en más de 4 DE', corta: 'error aleatorio' },
  { id: '4-1s', nivel: 'rechazo', texto: 'Cuatro seguidos pasan 1 DE del mismo lado', corta: 'error sistemático' },
  { id: '10-x', nivel: 'rechazo', texto: 'Diez seguidos del mismo lado de la media', corta: 'error sistemático (tendencia o desvío)' },
];

/** Puntuación z: cuántas desviaciones estándar se aleja de la media. */
export function puntuacionZ(valor, media, de) {
  return (valor - media) / de;
}

/** ¿Los últimos `n` valores hasta `i` cumplen la condición? */
const ultimos = (zs, i, n, cumple) => i >= n - 1 && zs.slice(i - n + 1, i + 1).every(cumple);

/**
 * Evalúa las reglas en orden cronológico. Cada regla se marca en el punto que la completa.
 * Devuelve un objeto por resultado: {indice (desde 1), valor, z, reglas, nivel} con nivel 'ok', 'advertencia' o 'rechazo'.
 */
export function evaluarLevey(valores, media, de, activas = REGLAS_LJ.map((r) => r.id)) {
  const zs = valores.map((v) => puntuacionZ(v, media, de));
  const reglaDe = Object.fromEntries(REGLAS_LJ.map((r) => [r.id, r]));
  return zs.map((z, i) => {
    const previo = zs[i - 1];
    const dispara = {
      '1-2s': Math.abs(z) > 2,
      '1-3s': Math.abs(z) > 3,
      '2-2s': i >= 1 && ((z > 2 && previo > 2) || (z < -2 && previo < -2)),
      'R-4s': i >= 1 && z * previo < 0 && Math.abs(z - previo) > 4,
      '4-1s': ultimos(zs, i, 4, (x) => x > 1) || ultimos(zs, i, 4, (x) => x < -1),
      '10-x': ultimos(zs, i, 10, (x) => x > 0) || ultimos(zs, i, 10, (x) => x < 0),
    };
    const reglas = activas.filter((id) => dispara[id]);
    const nivel = reglas.some((id) => reglaDe[id].nivel === 'rechazo') ? 'rechazo' : reglas.length ? 'advertencia' : 'ok';
    return { indice: i + 1, valor: valores[i], z, reglas, nivel };
  });
}
