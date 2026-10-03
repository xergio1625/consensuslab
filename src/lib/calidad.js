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

// --- Funciones de poder: probabilidad de detección de error (Ped) y de falso rechazo (Pfr) ---

/** Distribución normal estándar acumulada (Abramowitz y Stegun 7.1.26, error < 1,5·10⁻⁷). */
export function normalAcumulada(x) {
  const t = 1 / (1 + 0.3275911 * (Math.abs(x) / Math.SQRT2));
  const p = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const erf = 1 - p * Math.exp(-(x * x) / 2);
  return x >= 0 ? (1 + erf) / 2 : (1 - erf) / 2;
}

/**
 * Procedimientos de control candidatos, de más simple a más exigente.
 * N = controles por corrida; R = corridas en que se aplican las reglas.
 */
export const PROCEDIMIENTOS_QC = [
  { id: '13.5s-n2', reglas: ['1-3.5s'], n: 2, r: 1 },
  { id: '13s-n2', reglas: ['1-3s'], n: 2, r: 1 },
  { id: '12.5s-n2', reglas: ['1-2.5s'], n: 2, r: 1 },
  { id: '12s-n2', reglas: ['1-2s'], n: 2, r: 1 },
  { id: 'multi-n2', reglas: ['1-3s', '2-2s', 'R-4s'], n: 2, r: 1 },
  { id: '13s-n4', reglas: ['1-3s'], n: 4, r: 1 },
  { id: '12.5s-n4', reglas: ['1-2.5s'], n: 4, r: 1 },
  { id: 'multi-n4', reglas: ['1-3s', '2-2s', 'R-4s', '4-1s'], n: 4, r: 1 },
  { id: 'multi-n4r2', reglas: ['1-3s', '2-2s', 'R-4s', '4-1s', '8-x'], n: 4, r: 2 },
];

/** Nombre legible: «1-3s / 2-2s / R-4s, N = 2, R = 1» (con coma decimal). */
export function nombreProcedimiento(p) {
  return `${p.reglas.join(' / ').replace(/\./g, ',')} · N = ${p.n}${p.r > 1 ? `, R = ${p.r}` : ''}`;
}

/** Generador pseudoaleatorio con semilla (mulberry32): resultados reproducibles. */
function aleatorio(semilla) {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** ¿Alguna regla rechaza? `corridas`: arreglo de R corridas, cada una con N valores en unidades de DE. */
function rechaza(reglas, corridas) {
  const todos = corridas.flat();
  for (const regla of reglas) {
    if (regla === 'R-4s') {
      if (corridas.some((c) => Math.max(...c) - Math.min(...c) > 4)) return true;
      continue;
    }
    if (regla === '8-x') {
      if (consecutivos(todos, 8, (x) => x > 0) || consecutivos(todos, 8, (x) => x < 0)) return true;
      continue;
    }
    const [m, k] = regla.replace('s', '').split('-').map(Number);
    if (consecutivos(todos, m, (x) => x > k) || consecutivos(todos, m, (x) => x < -k)) return true;
  }
  return false;
}

function consecutivos(lista, cuantos, cumple) {
  let seguidos = 0;
  for (const x of lista) {
    seguidos = cumple(x) ? seguidos + 1 : 0;
    if (seguidos >= cuantos) return true;
  }
  return false;
}

/**
 * Probabilidad de que el procedimiento rechace la corrida cuando hay un error sistemático de `dse`
 * desviaciones estándar en todas las corridas evaluadas. Con dse = 0 es la Pfr; con dse = ΔSEcrit, la Ped.
 * Una sola regla 1-ks se calcula exacta; las multirreglas se simulan (Monte Carlo con semilla fija).
 */
export function probabilidadRechazo(p, dse, simulaciones = 20000, semilla = 1625) {
  if (p.reglas.length === 1 && p.reglas[0].startsWith('1-')) {
    const k = Number(p.reglas[0].slice(2, -1));
    const dentro = normalAcumulada(k - dse) - normalAcumulada(-k - dse);
    return 1 - dentro ** (p.n * p.r);
  }
  const azar = aleatorio(semilla);
  const normal = () => Math.sqrt(-2 * Math.log(1 - azar())) * Math.cos(2 * Math.PI * azar());
  let rechazos = 0;
  for (let i = 0; i < simulaciones; i++) {
    const corridas = Array.from({ length: p.r }, () => Array.from({ length: p.n }, () => normal() + dse));
    if (rechaza(p.reglas, corridas)) rechazos++;
  }
  return rechazos / simulaciones;
}

/**
 * Diseño del control: Ped (a ΔSEcrit) y Pfr de cada procedimiento candidato, si cumple las metas
 * (Ped ≥ pedMin y Pfr ≤ pfrMax, ambas entre 0 y 1) y el recomendado: el primero (más simple) que cumple.
 * Si ninguno cumple, `recomendado` es null y `mejor` es el de mayor Ped entre los que respetan la Pfr.
 */
const pfrCalculadas = new Map();

export function disenoControl(dseCrit, pedMin, pfrMax, simulaciones = 20000) {
  const filas = PROCEDIMIENTOS_QC.map((p) => {
    const ped = probabilidadRechazo(p, dseCrit, simulaciones);
    // La Pfr no depende de los datos del usuario: se calcula una vez (con más simulaciones, porque es pequeña).
    const clave = `${p.id}:${simulaciones}`;
    if (!pfrCalculadas.has(clave)) pfrCalculadas.set(clave, probabilidadRechazo(p, 0, simulaciones * 5));
    const pfr = pfrCalculadas.get(clave);
    return { ...p, nombre: nombreProcedimiento(p), ped, pfr, cumplePed: ped >= pedMin, cumplePfr: pfr <= pfrMax };
  });
  filas.forEach((f) => { f.cumple = f.cumplePed && f.cumplePfr; });
  const recomendado = filas.find((f) => f.cumple) ?? null;
  const conPfr = filas.filter((f) => f.cumplePfr);
  const mejor = recomendado ?? (conPfr.length ? conPfr.reduce((a, b) => (b.ped > a.ped ? b : a)) : null);
  return { filas, recomendado, mejor };
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
