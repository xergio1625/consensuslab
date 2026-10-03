// Fórmulas de las calculadoras de calidad. Funciones puras (se prueban con `npm test`).
// Todos los porcentajes van en % (por ejemplo, CV 2,5 = 2,5 %).

/** Número escrito por una persona: acepta coma o punto decimal y espacios. NaN si no es número. */
export function numero(texto) {
  const t = String(texto ?? '').trim().replace(/\s+/g, '').replace(',', '.');
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(t)) return NaN;
  return Number(t);
}

/** Lista de valores pegada: uno por línea (también separados por espacios, tabulaciones o «;»). */
export function valores(texto) {
  return String(texto ?? '')
    .split(/[\n\r\t; ]+/)
    .map((v) => v.trim())
    .filter(Boolean)
    .map(numero);
}

/** Media, DE muestral (n − 1), CV % y límites ±1, 2 y 3 DE. Necesita al menos 2 valores. */
export function estadistica(lista) {
  const n = lista.length;
  const media = lista.reduce((s, x) => s + x, 0) / n;
  const de = Math.sqrt(lista.reduce((s, x) => s + (x - media) ** 2, 0) / (n - 1));
  const limite = (k) => ({ bajo: media - k * de, alto: media + k * de });
  return {
    n,
    media,
    de,
    cv: media !== 0 ? (de / Math.abs(media)) * 100 : NaN,
    min: Math.min(...lista),
    max: Math.max(...lista),
    limites: { 1: limite(1), 2: limite(2), 3: limite(3) },
  };
}

/** Sesgo % respecto de un valor objetivo (valor asignado, media del grupo par o valor de referencia). */
export function sesgo(medido, objetivo) {
  return ((medido - objetivo) / objetivo) * 100;
}

/** Índice de desviación estándar del control externo: (resultado − media del grupo) / DE del grupo. */
export function sdi(resultado, mediaGrupo, deGrupo) {
  return (resultado - mediaGrupo) / deGrupo;
}

/** Interpretación habitual del SDI en programas de control externo. */
export function categoriaSdi(valor) {
  const a = Math.abs(valor);
  if (a <= 2) return { nivel: 'ok', texto: 'Aceptable' };
  if (a <= 3) return { nivel: 'advertencia', texto: 'Advertencia: revisa la tendencia y las causas posibles' };
  return { nivel: 'error', texto: 'Inaceptable: requiere investigación y acción correctiva' };
}

/** Error total (modelo de Westgard): |sesgo| + z · CV, con z = 1,65 (95 % a una cola). */
export function errorTotal(sesgoPct, cv, z = 1.65) {
  return Math.abs(sesgoPct) + z * cv;
}

/** Métrica sigma: (TEa − |sesgo|) / CV. */
export function sigma(tea, sesgoPct, cv) {
  return (tea - Math.abs(sesgoPct)) / cv;
}

/** Error sistemático crítico: sigma − 1,65. Base para elegir reglas y número de controles. */
export function errorSistematicoCritico(tea, sesgoPct, cv) {
  return sigma(tea, sesgoPct, cv) - 1.65;
}

/**
 * Nivel de desempeño y reglas sugeridas según las «Westgard Sigma Rules».
 * N = controles por corrida; R = corridas en que se aplican las reglas.
 */
export function categoriaSigma(s) {
  if (s >= 6) return { nivel: 'ok', texto: 'Clase mundial', reglas: '1-3s', controles: 'N = 2, R = 1' };
  if (s >= 5) return { nivel: 'ok', texto: 'Excelente', reglas: '1-3s / 2-2s / R-4s', controles: 'N = 2, R = 1' };
  if (s >= 4) return { nivel: 'ok', texto: 'Bueno', reglas: '1-3s / 2-2s / R-4s / 4-1s', controles: 'N = 4, R = 1 (o N = 2, R = 2)' };
  if (s >= 3) {
    return { nivel: 'advertencia', texto: 'Marginal', reglas: '1-3s / 2-2s / R-4s / 4-1s / 8-x', controles: 'N = 4, R = 2 (o N = 2, R = 4)' };
  }
  return {
    nivel: 'error',
    texto: s >= 2 ? 'Pobre' : 'Inaceptable',
    reglas: '1-3s / 2-2s / R-4s / 4-1s / 8-x (máximo control)',
    controles: 'N = 4, R = 2 (o N = 2, R = 4)',
    nota: 'El control estadístico no alcanza a asegurar la calidad: conviene mejorar el método (CV o sesgo) o revisar el requisito.',
  };
}

/**
 * Especificaciones desde la variabilidad biológica (modelo de Fraser):
 * CV ≤ k · CVi; sesgo ≤ m · √(CVi² + CVg²); TEa = 1,65 · CV + sesgo.
 * Óptimo k = 0,25 y m = 0,125; deseable 0,50 y 0,250; mínimo 0,75 y 0,375.
 */
export function especificacionesBiologicas(cvi, cvg) {
  const total = Math.sqrt(cvi ** 2 + cvg ** 2);
  const nivel = (k, m) => {
    const cv = k * cvi;
    const sesgoMax = m * total;
    return { cv, sesgo: sesgoMax, tea: 1.65 * cv + sesgoMax };
  };
  return { optimo: nivel(0.25, 0.125), deseable: nivel(0.5, 0.25), minimo: nivel(0.75, 0.375) };
}

/** Número con coma decimal y los decimales indicados (formato chileno). */
export function formato(valor, decimales = 2) {
  if (!Number.isFinite(valor)) return '—';
  return valor.toLocaleString('es-CL', { minimumFractionDigits: decimales, maximumFractionDigits: decimales });
}
