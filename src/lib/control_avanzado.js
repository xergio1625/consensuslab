// Gráficos de control para desvíos pequeños: CUSUM tabular y EWMA. Funciones puras (se prueban con `npm test`).

/**
 * CUSUM tabular en unidades de DE: C⁺ = máx(0, C⁺ anterior + z − k) y C⁻ = máx(0, C⁻ anterior − z − k), con
 * z = (x − media) / DE. Señala cuando C⁺ o C⁻ superan h. Por defecto k = 0,5 (detecta un desvío de 1 DE) y h = 5.
 * `inicio`: punto desde el cual C venía subiendo (estimación del comienzo del desvío) cuando hay señal.
 */
export function cusum(valores, media, de, k = 0.5, h = 5) {
  let cMas = 0;
  let cMenos = 0;
  let inicioMas = 0;
  let inicioMenos = 0;
  return valores.map((x, i) => {
    const z = (x - media) / de;
    if (cMas === 0) inicioMas = i;
    if (cMenos === 0) inicioMenos = i;
    cMas = Math.max(0, cMas + z - k);
    cMenos = Math.max(0, cMenos - z - k);
    const arriba = cMas > h;
    const abajo = cMenos > h;
    return {
      indice: i + 1, valor: x, z, cMas, cMenos,
      senal: arriba || abajo, sentido: arriba ? 'alza' : abajo ? 'baja' : null,
      inicio: arriba ? inicioMas + 1 : abajo ? inicioMenos + 1 : null,
    };
  });
}

/**
 * EWMA: z_i = λ·x_i + (1 − λ)·z_(i−1), con z_0 = media. Límites exactos de cada punto:
 * media ± L · DE · √(λ/(2 − λ) · (1 − (1 − λ)^(2i))), que se ensanchan hasta el valor estable.
 */
export function ewma(valores, media, de, lambda = 0.2, L = 3) {
  let z = media;
  return valores.map((x, i) => {
    z = lambda * x + (1 - lambda) * z;
    const ancho = L * de * Math.sqrt((lambda / (2 - lambda)) * (1 - (1 - lambda) ** (2 * (i + 1))));
    return { indice: i + 1, valor: x, ewma: z, limiteSup: media + ancho, limiteInf: media - ancho, senal: z > media + ancho || z < media - ancho };
  });
}
