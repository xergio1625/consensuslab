// Pruebas estadísticas para series de resultados del laboratorio (por ejemplo, 20 datos de un lote de control):
// valores atípicos, normalidad, tendencia y aleatoriedad, homogeneidad, comparación con el fabricante y precisión.
// Funciones puras (se prueban con `npm test`). Los valores p son bilaterales salvo que se indique otra cosa.
import { chi2Acumulada, chi2Cuantil, fAcumulada, tAcumulada, tCuantil } from './metodos.js';
import { compararSeries } from './estadistica.js';
import { numero } from './calidad.js';

// --- Utilidades --------------------------------------------------------------------------------------

const suma = (v) => v.reduce((s, x) => s + x, 0);
export const media = (v) => suma(v) / v.length;
export const de = (v) => {
  const m = media(v);
  return Math.sqrt(v.reduce((s, x) => s + (x - m) ** 2, 0) / (v.length - 1));
};
export const mediana = (v) => {
  const o = [...v].sort((a, b) => a - b);
  const m = Math.floor(o.length / 2);
  return o.length % 2 ? o[m] : (o[m - 1] + o[m]) / 2;
};
const finitos = (v) => v.every(Number.isFinite);

/** Normal estándar acumulada con error ~1e-12 (vía chi² de 1 gl). */
export function fi(z) {
  const p = chi2Acumulada(z * z, 1);
  return z >= 0 ? 0.5 + 0.5 * p : 0.5 - 0.5 * p;
}

/** Cuantil de la normal estándar (bisección sobre `fi`). */
export function zCuantil(p) {
  if (!(p > 0 && p < 1)) return NaN;
  let bajo = -12;
  let alto = 12;
  for (let i = 0; i < 70; i++) {
    const medio = (bajo + alto) / 2;
    if (fi(medio) < p) bajo = medio;
    else alto = medio;
  }
  return (bajo + alto) / 2;
}

/** Cuantil de la F de Snedecor (bisección). */
export function fCuantil(p, gl1, gl2) {
  let bajo = 0;
  let alto = 10;
  while (fAcumulada(alto, gl1, gl2) < p) alto *= 2;
  for (let i = 0; i < 100; i++) {
    const medio = (bajo + alto) / 2;
    if (fAcumulada(medio, gl1, gl2) < p) bajo = medio;
    else alto = medio;
  }
  return (bajo + alto) / 2;
}

const pBilateralZ = (z) => 2 * (1 - fi(Math.abs(z)));
const pBilateralT = (t, gl) => 2 * (1 - tAcumulada(Math.abs(t), gl));

/** Generador pseudoaleatorio con semilla (mulberry32) y normal por Box-Muller: simulaciones reproducibles. */
export function generador(semilla) {
  let a = semilla >>> 0;
  const uniforme = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const normal = () => {
    let u = 0;
    while (u === 0) u = uniforme();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * uniforme());
  };
  return { uniforme, normal };
}

/**
 * Texto con una corrida (o día) por línea y las réplicas separadas por espacios, tabulaciones o «;» → lista de listas.
 * Las líneas vacías se omiten; un valor que no es número queda como NaN.
 */
export function leerGrupos(texto) {
  return String(texto ?? '')
    .split(/\r?\n/)
    .map((linea) => linea.split(/[\t; ]+/).filter(Boolean).map(numero))
    .filter((g) => g.length > 0);
}

// --- 1. Valores atípicos -----------------------------------------------------------------------------

/**
 * Valores críticos bilaterales de la prueba de Dixon [α = 0,10; 0,05; 0,01] según n. Variante de Rorabacher (1991):
 * r10 (n 3-7), r11 (8-10), r21 (11-13), r22 (14-30). Calculados por simulación (10⁶ muestras normales por n,
 * semilla fija) y contrastados con la tabla publicada (por ejemplo, n = 3: 0,941; 0,970; 0,994 y n = 20: 0,489 al 5 %).
 */
export const DIXON_CRITICOS = {
  3: [0.941, 0.97, 0.994], 4: [0.766, 0.83, 0.921], 5: [0.643, 0.71, 0.823], 6: [0.562, 0.628, 0.743],
  7: [0.507, 0.568, 0.681], 8: [0.544, 0.608, 0.719], 9: [0.503, 0.564, 0.672], 10: [0.47, 0.53, 0.635],
  11: [0.572, 0.62, 0.707], 12: [0.542, 0.59, 0.676], 13: [0.519, 0.566, 0.649], 14: [0.539, 0.586, 0.669],
  15: [0.517, 0.564, 0.647], 16: [0.499, 0.545, 0.627], 17: [0.484, 0.529, 0.61], 18: [0.47, 0.514, 0.594],
  19: [0.457, 0.501, 0.58], 20: [0.446, 0.489, 0.567], 21: [0.435, 0.478, 0.555], 22: [0.426, 0.468, 0.544],
  23: [0.418, 0.459, 0.535], 24: [0.41, 0.451, 0.526], 25: [0.402, 0.443, 0.517], 26: [0.395, 0.436, 0.509],
  27: [0.389, 0.429, 0.502], 28: [0.384, 0.423, 0.495], 29: [0.378, 0.417, 0.489], 30: [0.373, 0.412, 0.483],
};

export function varianteDixon(n) {
  return n <= 7 ? 'r10' : n <= 10 ? 'r11' : n <= 13 ? 'r21' : 'r22';
}

/** Razones de Dixon del extremo alto y bajo de una muestra ordenada. */
function razonesDixon(x, n) {
  const v = varianteDixon(n);
  if (v === 'r10') return { alto: (x[n - 1] - x[n - 2]) / (x[n - 1] - x[0]), bajo: (x[1] - x[0]) / (x[n - 1] - x[0]) };
  if (v === 'r11') return { alto: (x[n - 1] - x[n - 2]) / (x[n - 1] - x[1]), bajo: (x[1] - x[0]) / (x[n - 2] - x[0]) };
  if (v === 'r21') return { alto: (x[n - 1] - x[n - 3]) / (x[n - 1] - x[1]), bajo: (x[2] - x[0]) / (x[n - 2] - x[0]) };
  return { alto: (x[n - 1] - x[n - 3]) / (x[n - 1] - x[2]), bajo: (x[2] - x[0]) / (x[n - 3] - x[0]) };
}

/**
 * Prueba de Dixon (cociente Q) bilateral para un valor atípico, con la variante según n (r10, r11, r21 o r22).
 * Usa rangos (no la media ni la DE): compara la distancia del extremo a su vecino con el rango de la muestra.
 * `alfa`: 0,10, 0,05 o 0,01. Necesita 3 a 30 datos.
 */
export function dixon(valores, alfa = 0.05) {
  const n = valores.length;
  const col = { 0.1: 0, 0.05: 1, 0.01: 2 }[alfa];
  if (n < 3 || n > 30 || !finitos(valores) || col === undefined) return null;
  const orden = valores.map((valor, i) => ({ valor, i })).sort((a, b) => a.valor - b.valor);
  const x = orden.map((o) => o.valor);
  if (x[n - 1] === x[0]) return null;
  const { alto, bajo } = razonesDixon(x, n);
  const lado = alto >= bajo ? 'alto' : 'bajo';
  const q = Math.max(alto, bajo);
  const critico = DIXON_CRITICOS[n][col];
  const sospechoso = lado === 'alto' ? orden[n - 1] : orden[0];
  return { n, variante: varianteDixon(n), q, qAlto: alto, qBajo: bajo, critico, lado, indice: sospechoso.i, valor: sospechoso.valor, atipico: q > critico };
}

/**
 * Tietjen-Moore para k valores atípicos (con k = 2 es la prueba de Grubbs doble). L_k = Σ(y − ȳ_k)² / Σ(x − x̄)²,
 * donde y son los n − k datos menos alejados de la media. Un L pequeño indica atípicos. El valor crítico y el valor p
 * se obtienen por simulación de muestras normales (semilla fija, resultado reproducible).
 */
export function tietjenMoore(valores, k = 2, alfa = 0.05, simulaciones = 20000, semilla = 1625) {
  const n = valores.length;
  if (!Number.isInteger(k) || k < 1 || n < k + 3 || !finitos(valores)) return null;
  const estadistico = (x) => {
    const m = media(x);
    const ss = x.reduce((s, v) => s + (v - m) ** 2, 0);
    if (!(ss > 0)) return NaN;
    const resto = x.map((v, i) => ({ v, d: Math.abs(v - m), i })).sort((a, b) => a.d - b.d).slice(0, n - k).map((o) => o.v);
    const mr = media(resto);
    return resto.reduce((s, v) => s + (v - mr) ** 2, 0) / ss;
  };
  const l = estadistico(valores);
  if (!Number.isFinite(l)) return null;
  const { normal } = generador(semilla);
  const sim = [];
  for (let s = 0; s < simulaciones; s++) sim.push(estadistico(Array.from({ length: n }, normal)));
  sim.sort((a, b) => a - b);
  const critico = sim[Math.floor(alfa * simulaciones)];
  const p = (sim.filter((v) => v <= l).length + 1) / (simulaciones + 1);
  const m = media(valores);
  const sospechosos = valores
    .map((valor, i) => ({ valor, i, d: Math.abs(valor - m) }))
    .sort((a, b) => b.d - a.d)
    .slice(0, k)
    .map((o) => ({ indice: o.i, valor: o.valor }));
  return { n, k, l, critico, p, atipico: l < critico, sospechosos };
}

/** Criterio de Chauvenet: se rechaza un dato si n · P(|Z| > z) < 0,5, con z = |x − media| / DE. Una sola pasada. */
export function chauvenet(valores) {
  const n = valores.length;
  if (n < 3 || !finitos(valores)) return null;
  const m = media(valores);
  const s = de(valores);
  if (!(s > 0)) return null;
  const puntos = valores.map((valor, i) => {
    const z = Math.abs(valor - m) / s;
    const esperados = n * pBilateralZ(z);
    return { indice: i, valor, z, esperados, atipico: esperados < 0.5 };
  });
  return { n, media: m, de: s, zCritico: zCuantil(1 - 0.25 / n), puntos, atipicos: puntos.filter((p) => p.atipico) };
}

/** Filtro de Hampel: mediana ± k · 1,4826 · MAD (k = 3). Robusto: la mediana y la MAD casi no se mueven por los atípicos. */
export function hampel(valores, k = 3) {
  const n = valores.length;
  if (n < 3 || !finitos(valores)) return null;
  const med = mediana(valores);
  const mad = mediana(valores.map((x) => Math.abs(x - med)));
  const sigma = 1.4826 * mad;
  if (!(sigma > 0)) return null;
  const puntos = valores.map((valor, i) => ({ indice: i, valor, z: Math.abs(valor - med) / sigma, atipico: Math.abs(valor - med) > k * sigma }));
  return { n, mediana: med, mad, sigma, inferior: med - k * sigma, superior: med + k * sigma, puntos, atipicos: puntos.filter((p) => p.atipico) };
}

// --- 2. Normalidad -----------------------------------------------------------------------------------

const poli = (cc, x) => cc.reduceRight((p, c) => p * x + c, 0);

/**
 * Shapiro-Wilk (Royston 1992, algoritmo AS R94) para 3 ≤ n ≤ 5000. Devuelve W y el valor p
 * (H0: los datos vienen de una distribución normal). Un valor p pequeño indica que no son normales.
 */
export function shapiroWilk(valores) {
  const n = valores.length;
  if (n < 3 || n > 5000 || !finitos(valores)) return null;
  const x = [...valores].sort((a, b) => a - b);
  if (x[n - 1] - x[0] === 0) return null;
  const nn2 = Math.floor(n / 2);
  const a = new Array(nn2).fill(0);
  if (n === 3) {
    a[0] = Math.SQRT1_2;
  } else {
    const m = [];
    let summ2 = 0;
    for (let i = 1; i <= nn2; i++) {
      const q = zCuantil((i - 0.375) / (n + 0.25));
      m.push(q);
      summ2 += q * q;
    }
    summ2 *= 2;
    const ssumm2 = Math.sqrt(summ2);
    const rsn = 1 / Math.sqrt(n);
    const c1 = [0, 0.221157, -0.147981, -2.07119, 4.434685, -2.706056];
    const c2 = [0, 0.042981, -0.293762, -1.752461, 5.682633, -3.582633];
    const a1 = poli(c1, rsn) - m[0] / ssumm2;
    let i1;
    let fac;
    if (n > 5) {
      i1 = 2;
      const a2 = -m[1] / ssumm2 + poli(c2, rsn);
      fac = Math.sqrt((summ2 - 2 * m[0] ** 2 - 2 * m[1] ** 2) / (1 - 2 * a1 ** 2 - 2 * a2 ** 2));
      a[1] = a2;
    } else {
      i1 = 1;
      fac = Math.sqrt((summ2 - 2 * m[0] ** 2) / (1 - 2 * a1 ** 2));
    }
    a[0] = a1;
    for (let i = i1; i < nn2; i++) a[i] = -m[i] / fac;
  }
  const xm = media(x);
  const ss = x.reduce((s, v) => s + (v - xm) ** 2, 0);
  let b = 0;
  for (let i = 0; i < nn2; i++) b += a[i] * (x[n - 1 - i] - x[i]);
  let w = (b * b) / ss;
  if (w > 1) w = 1;
  let p;
  if (n === 3) {
    const pi6 = 6 / Math.PI;
    const stqr = Math.asin(Math.sqrt(0.75));
    p = Math.max(0, pi6 * (Math.asin(Math.sqrt(w)) - stqr));
  } else {
    const y = Math.log(1 - w);
    const xx = Math.log(n);
    let mu;
    let sigma;
    if (n <= 11) {
      const gamma = poli([-2.273, 0.459], n);
      if (y >= gamma) return { n, w, p: 1e-99 };
      const yy = -Math.log(gamma - y);
      mu = poli([0.544, -0.39978, 0.025054, -0.0006714], n);
      sigma = Math.exp(poli([1.3822, -0.77857, 0.062767, -0.0020322], n));
      return { n, w, p: 1 - fi((yy - mu) / sigma) };
    }
    mu = poli([-1.5861, -0.31082, -0.083751, 0.0038915], xx);
    sigma = Math.exp(poli([-0.4803, -0.082676, 0.0030302], xx));
    p = 1 - fi((y - mu) / sigma);
  }
  return { n, w, p };
}

/**
 * Anderson-Darling con media y DE estimadas. A² corregido = A²(1 + 0,75/n + 2,25/n²); valor p por las
 * aproximaciones de D'Agostino y Stephens (1986). Necesita al menos 8 datos.
 */
export function andersonDarling(valores) {
  const n = valores.length;
  if (n < 8 || !finitos(valores)) return null;
  const x = [...valores].sort((a, b) => a - b);
  const m = media(x);
  const s = de(x);
  if (!(s > 0)) return null;
  const f = x.map((v) => Math.min(1 - 1e-15, Math.max(1e-15, fi((v - m) / s))));
  let suma2 = 0;
  for (let i = 0; i < n; i++) suma2 += (2 * i + 1) * (Math.log(f[i]) + Math.log(1 - f[n - 1 - i]));
  const a2 = -n - suma2 / n;
  const a = a2 * (1 + 0.75 / n + 2.25 / (n * n));
  let p;
  if (a >= 0.6) p = Math.exp(1.2937 - 5.709 * a + 0.0186 * a * a);
  else if (a >= 0.34) p = Math.exp(0.9177 - 4.279 * a - 1.38 * a * a);
  else if (a >= 0.2) p = 1 - Math.exp(-8.318 + 42.796 * a - 59.938 * a * a);
  else p = 1 - Math.exp(-13.436 + 101.14 * a - 223.73 * a * a);
  return { n, a2, a, p: Math.min(1, Math.max(0, p)) };
}

/**
 * D'Agostino-Pearson (ómnibus K²): combina la prueba de asimetría (D'Agostino 1970) y la de curtosis
 * (Anscombe-Glynn 1983). K² ~ χ² con 2 gl. Necesita al menos 8 datos; con menos de 20 la curtosis es poco confiable.
 */
export function dagostinoPearson(valores) {
  const n = valores.length;
  if (n < 8 || !finitos(valores)) return null;
  const m = media(valores);
  const m2 = valores.reduce((s, v) => s + (v - m) ** 2, 0) / n;
  if (!(m2 > 0)) return null;
  const m3 = valores.reduce((s, v) => s + (v - m) ** 3, 0) / n;
  const m4 = valores.reduce((s, v) => s + (v - m) ** 4, 0) / n;
  const b1 = m3 / m2 ** 1.5;
  const b2 = m4 / m2 ** 2;
  const y = b1 * Math.sqrt(((n + 1) * (n + 3)) / (6 * (n - 2)));
  const beta2 = (3 * (n * n + 27 * n - 70) * (n + 1) * (n + 3)) / ((n - 2) * (n + 5) * (n + 7) * (n + 9));
  const w2 = -1 + Math.sqrt(2 * (beta2 - 1));
  const delta = 1 / Math.sqrt(0.5 * Math.log(w2));
  const alfa = Math.sqrt(2 / (w2 - 1));
  const zSesgo = delta * Math.asinh(y / alfa);
  const esperada = (3 * (n - 1)) / (n + 1);
  const varianza = (24 * n * (n - 2) * (n - 3)) / ((n + 1) ** 2 * (n + 3) * (n + 5));
  const xk = (b2 - esperada) / Math.sqrt(varianza);
  const raizBeta1 = ((6 * (n * n - 5 * n + 2)) / ((n + 7) * (n + 9))) * Math.sqrt((6 * (n + 3) * (n + 5)) / (n * (n - 2) * (n - 3)));
  const aa = 6 + (8 / raizBeta1) * (2 / raizBeta1 + Math.sqrt(1 + 4 / raizBeta1 ** 2));
  const t1 = 1 - 2 / (9 * aa);
  const den = 1 + xk * Math.sqrt(2 / (aa - 4));
  const t2 = Math.sign(den) * Math.cbrt((1 - 2 / aa) / Math.abs(den));
  const zCurtosis = (t1 - t2) / Math.sqrt(2 / (9 * aa));
  const k2 = zSesgo ** 2 + zCurtosis ** 2;
  return {
    n, asimetria: b1, curtosis: b2 - 3, zSesgo, zCurtosis, pSesgo: pBilateralZ(zSesgo), pCurtosis: pBilateralZ(zCurtosis),
    k2, p: Math.exp(-k2 / 2),
  };
}

/**
 * Lilliefors (Kolmogorov-Smirnov con media y DE estimadas). Valor p por la aproximación de Dallal y Wilkinson (1986)
 * con la extensión usada en el paquete nortest de R. Necesita al menos 5 datos.
 */
export function lilliefors(valores) {
  const n = valores.length;
  if (n < 5 || !finitos(valores)) return null;
  const x = [...valores].sort((a, b) => a - b);
  const m = media(x);
  const s = de(x);
  if (!(s > 0)) return null;
  let d = 0;
  for (let i = 0; i < n; i++) {
    const f = fi((x[i] - m) / s);
    d = Math.max(d, (i + 1) / n - f, f - i / n);
  }
  const kd = n > 100 ? d * (n / 100) ** 0.49 : d;
  const nd = Math.min(n, 100);
  let p = Math.exp(-7.01256 * kd ** 2 * (nd + 2.78019) + 2.99587 * kd * Math.sqrt(nd + 2.78019) - 0.122119 + 0.974598 / Math.sqrt(nd) + 1.67997 / nd);
  if (p > 0.1) {
    const kk = (Math.sqrt(n) - 0.01 + 0.85 / Math.sqrt(n)) * d;
    if (kk <= 0.302) p = 1;
    else if (kk <= 0.5) p = 2.76773 - 19.828315 * kk + 80.709644 * kk ** 2 - 138.55152 * kk ** 3 + 81.218052 * kk ** 4;
    else if (kk <= 0.9) p = -4.901232 + 40.662806 * kk - 97.490286 * kk ** 2 + 94.029866 * kk ** 3 - 32.355711 * kk ** 4;
    else if (kk <= 1.31) p = 6.198765 - 19.558097 * kk + 23.186922 * kk ** 2 - 12.234627 * kk ** 3 + 2.423045 * kk ** 4;
    else p = 0;
  }
  return { n, d, p: Math.min(1, Math.max(0, p)) };
}

/** Gráfico Q-Q: cuantiles normales teóricos (posiciones de Blom) contra los datos ordenados, y su correlación. */
export function qqNormal(valores) {
  const n = valores.length;
  if (n < 3 || !finitos(valores)) return null;
  const x = [...valores].sort((a, b) => a - b);
  const teoricos = x.map((_, i) => zCuantil((i + 1 - 0.375) / (n + 0.25)));
  const mt = media(teoricos);
  const mx = media(x);
  const sxy = x.reduce((s, v, i) => s + (v - mx) * (teoricos[i] - mt), 0);
  const sxx = x.reduce((s, v) => s + (v - mx) ** 2, 0);
  const syy = teoricos.reduce((s, v) => s + (v - mt) ** 2, 0);
  if (!(sxx > 0)) return null;
  const pendiente = sxy / syy; // x ≈ media + DE · teórico
  return { n, r: sxy / Math.sqrt(sxx * syy), puntos: x.map((valor, i) => ({ valor, teorico: teoricos[i] })), media: mx - pendiente * mt, de: pendiente };
}

// --- 3. Tendencia y aleatoriedad ---------------------------------------------------------------------

/**
 * Prueba de rachas de Wald-Wolfowitz respecto de la mediana: cuenta rachas de valores sobre y bajo la mediana
 * (se omiten los iguales a la mediana). Aproximación normal con corrección de continuidad.
 * Pocas rachas: tendencia o desvío; demasiadas: alternancia.
 */
export function rachas(valores) {
  if (valores.length < 8 || !finitos(valores)) return null;
  const med = mediana(valores);
  const signos = valores.filter((x) => x !== med).map((x) => (x > med ? 1 : -1));
  const n1 = signos.filter((s) => s > 0).length;
  const n2 = signos.length - n1;
  const N = n1 + n2;
  if (n1 < 1 || n2 < 1) return null;
  let r = 1;
  for (let i = 1; i < N; i++) if (signos[i] !== signos[i - 1]) r++;
  const mu = (2 * n1 * n2) / N + 1;
  const varianza = (2 * n1 * n2 * (2 * n1 * n2 - N)) / (N * N * (N - 1));
  const z = varianza > 0 ? (r - mu + (r < mu ? 0.5 : r > mu ? -0.5 : 0)) / Math.sqrt(varianza) : 0;
  return { n: N, mediana: med, sobre: n1, bajo: n2, rachas: r, esperadas: mu, z, p: pBilateralZ(z) };
}

/**
 * Mann-Kendall: tendencia monótona sin suponer normalidad. S = Σ signo(x_j − x_i) para i < j; varianza con
 * corrección por empates; Z con corrección de continuidad. Incluye la pendiente de Sen (mediana de las pendientes).
 */
export function mannKendall(valores) {
  const n = valores.length;
  if (n < 4 || !finitos(valores)) return null;
  let s = 0;
  const pendientes = [];
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      s += Math.sign(valores[j] - valores[i]);
      pendientes.push((valores[j] - valores[i]) / (j - i));
    }
  }
  const conteo = new Map();
  valores.forEach((x) => conteo.set(x, (conteo.get(x) ?? 0) + 1));
  let empates = 0;
  conteo.forEach((t) => {
    if (t > 1) empates += t * (t - 1) * (2 * t + 5);
  });
  const varianza = (n * (n - 1) * (2 * n + 5) - empates) / 18;
  const z = s > 0 ? (s - 1) / Math.sqrt(varianza) : s < 0 ? (s + 1) / Math.sqrt(varianza) : 0;
  return { n, s, varianza, tau: s / ((n * (n - 1)) / 2), z, p: pBilateralZ(z), pendienteSen: mediana(pendientes) };
}

/** P(X ≤ k) de una binomial(m, 1/2). */
function binomialAcumulada(k, m) {
  let termino = 0.5 ** m;
  let total = 0;
  for (let i = 0; i <= k; i++) {
    total += termino;
    termino = (termino * (m - i)) / (i + 1);
  }
  return Math.min(1, total);
}

/**
 * Cox-Stuart: compara cada dato de la primera mitad con su par de la segunda mitad (para n impar se omite el dato
 * central) y cuenta cuántos suben y cuántos bajan: prueba de los signos exacta. Sin empates entre pares.
 */
export function coxStuart(valores) {
  const n = valores.length;
  if (n < 8 || !finitos(valores)) return null;
  const c = Math.ceil(n / 2);
  let suben = 0;
  let bajan = 0;
  for (let i = 0; i + c < n; i++) {
    const d = valores[i + c] - valores[i];
    if (d > 0) suben++;
    else if (d < 0) bajan++;
  }
  const m = suben + bajan;
  if (m < 1) return null;
  const p = Math.min(1, 2 * binomialAcumulada(Math.min(suben, bajan), m));
  return { n, pares: m, suben, bajan, p };
}

/**
 * Razón de von Neumann: η = n · Σ(x_{i+1} − x_i)² / ((n − 1) · Σ(x − x̄)²). Bajo aleatoriedad, media 2 y
 * varianza 4(n − 2)/(n² − 1). Un valor bajo indica tendencia o deriva; uno alto, alternancia.
 */
export function vonNeumann(valores) {
  const n = valores.length;
  if (n < 8 || !finitos(valores)) return null;
  const m = media(valores);
  const ss = valores.reduce((s, x) => s + (x - m) ** 2, 0);
  if (!(ss > 0)) return null;
  let d2 = 0;
  for (let i = 1; i < n; i++) d2 += (valores[i] - valores[i - 1]) ** 2;
  const eta = (n * d2) / ((n - 1) * ss);
  const z = (eta - 2) / Math.sqrt((4 * (n - 2)) / (n * n - 1));
  return { n, eta, z, p: pBilateralZ(z) };
}

/** Regresión lineal del resultado contra el orden de las mediciones (1, 2, …, n), con la prueba t de la pendiente. */
export function pendienteTiempo(valores, confianza = 0.95) {
  const n = valores.length;
  if (n < 4 || !finitos(valores)) return null;
  const t = valores.map((_, i) => i + 1);
  const mt = media(t);
  const my = media(valores);
  const sxx = t.reduce((s, v) => s + (v - mt) ** 2, 0);
  const sxy = t.reduce((s, v, i) => s + (v - mt) * (valores[i] - my), 0);
  const pendiente = sxy / sxx;
  const b0 = my - pendiente * mt;
  const residuos = valores.map((y, i) => y - (b0 + pendiente * t[i]));
  const sce = residuos.reduce((s, e) => s + e * e, 0);
  const syy = valores.reduce((s, y) => s + (y - my) ** 2, 0);
  const gl = n - 2;
  const se = Math.sqrt(sce / gl / sxx);
  if (!(se > 0)) return null;
  const tt = pendiente / se;
  const margen = tCuantil(1 - (1 - confianza) / 2, gl) * se;
  return {
    n, pendiente, ordenada: b0, se, t: tt, gl, p: pBilateralT(tt, gl), ci: [pendiente - margen, pendiente + margen],
    r2: syy > 0 ? 1 - sce / syy : NaN, cambioTotal: pendiente * (n - 1), cambioTotalPct: my !== 0 ? ((pendiente * (n - 1)) / Math.abs(my)) * 100 : NaN, residuos,
  };
}

/**
 * Autocorrelación de orden 1 (r₁ del resultado respecto de la media, con z ≈ r₁·√n) y estadístico de Durbin-Watson
 * de los residuos de la regresión contra el orden. d ≈ 2(1 − r): cerca de 2 no hay autocorrelación; bajo 1,5
 * (positiva) o sobre 2,5 (negativa) conviene sospechar. El valor p de d es aproximado (normal).
 */
export function autocorrelacion(valores) {
  const n = valores.length;
  if (n < 8 || !finitos(valores)) return null;
  const m = media(valores);
  const ss = valores.reduce((s, x) => s + (x - m) ** 2, 0);
  if (!(ss > 0)) return null;
  let cruz = 0;
  for (let i = 1; i < n; i++) cruz += (valores[i] - m) * (valores[i - 1] - m);
  const r1 = cruz / ss;
  const reg = pendienteTiempo(valores);
  const e = reg ? reg.residuos : valores.map((x) => x - m);
  const sce = e.reduce((s, v) => s + v * v, 0);
  let dd = 0;
  for (let i = 1; i < n; i++) dd += (e[i] - e[i - 1]) ** 2;
  const d = dd / sce;
  const rRes = 1 - d / 2;
  return { n, r1, z: r1 * Math.sqrt(n), p: pBilateralZ(r1 * Math.sqrt(n)), durbinWatson: d, pDurbinWatson: pBilateralZ(rRes * Math.sqrt(n)) };
}

// --- 4. Homogeneidad ---------------------------------------------------------------------------------

/**
 * Compara la primera y la segunda mitad de la serie (en orden de medición; con n impar se omite el dato central):
 * prueba F de varianzas y prueba t de dos muestras (con varianzas iguales, y de Welch si no lo son).
 */
export function mitades(valores, confianza = 0.95) {
  const n = valores.length;
  if (n < 8 || !finitos(valores)) return null;
  const h = Math.floor(n / 2);
  const a = valores.slice(0, h);
  const b = valores.slice(n - h);
  const r = compararSeries(a, b, confianza);
  if (!r) return null;
  const sp2 = ((h - 1) * r.primera.de ** 2 + (h - 1) * r.segunda.de ** 2) / (2 * h - 2);
  const se = Math.sqrt(sp2 * (2 / h));
  const t = se > 0 ? r.diferencia / se : 0;
  return { ...r, h, tStudent: t, glStudent: 2 * h - 2, pStudent: se > 0 ? pBilateralT(t, 2 * h - 2) : 1 };
}

/** Tabla ANOVA de un factor (por día o por corrida; admite grupos de tamaños distintos) y componentes de varianza. */
export function anovaGrupos(grupos) {
  const k = grupos.length;
  if (k < 2 || grupos.some((g) => g.length < 1 || !finitos(g))) return null;
  const N = grupos.reduce((s, g) => s + g.length, 0);
  const glW = N - k;
  if (glW < 1) return null;
  const todas = grupos.flat();
  const gran = media(todas);
  const medias = grupos.map(media);
  const ssB = grupos.reduce((s, g, i) => s + g.length * (medias[i] - gran) ** 2, 0);
  const ssW = grupos.reduce((s, g, i) => s + g.reduce((t, x) => t + (x - medias[i]) ** 2, 0), 0);
  const glB = k - 1;
  const msB = ssB / glB;
  const msW = ssW / glW;
  const n0 = (N - grupos.reduce((s, g) => s + g.length ** 2, 0) / N) / glB;
  const f = msW > 0 ? msB / msW : Infinity;
  const varEntre = Math.max(0, (msB - msW) / n0);
  const varTotal = msW + varEntre;
  let glWl = glW;
  if (varEntre > 0) {
    const a = msB / n0;
    const b = (1 - 1 / n0) * msW;
    glWl = (a + b) ** 2 / (a ** 2 / glB + b ** 2 / glW);
  }
  return {
    k, N, n0, gran, medias, ssB, ssW, glB, glW, msB, msW, f, p: Number.isFinite(f) ? 1 - fAcumulada(f, glB, glW) : 0,
    sr: Math.sqrt(msW), entre: Math.sqrt(varEntre), swl: Math.sqrt(varTotal), glWl,
    cvR: (Math.sqrt(msW) / gran) * 100, cvEntre: (Math.sqrt(varEntre) / gran) * 100, cvWl: (Math.sqrt(varTotal) / gran) * 100,
    pctEntre: varTotal > 0 ? (varEntre / varTotal) * 100 : 0,
  };
}

/** Bartlett: igualdad de varianzas entre k grupos. Exige normalidad: es sensible a los datos no normales. */
export function bartlett(grupos) {
  const k = grupos.length;
  if (k < 2 || grupos.some((g) => g.length < 2 || !finitos(g))) return null;
  const gls = grupos.map((g) => g.length - 1);
  const vars = grupos.map((g) => de(g) ** 2);
  if (vars.some((v) => !(v > 0))) return null;
  const glT = suma(gls);
  const sp2 = gls.reduce((s, gl, i) => s + gl * vars[i], 0) / glT;
  const num = glT * Math.log(sp2) - gls.reduce((s, gl, i) => s + gl * Math.log(vars[i]), 0);
  const c = 1 + (suma(gls.map((g) => 1 / g)) - 1 / glT) / (3 * (k - 1));
  const chi2 = num / c;
  return { k, gl: k - 1, chi2, p: 1 - chi2Acumulada(chi2, k - 1) };
}

/**
 * Levene (centro = media) o Brown-Forsythe (centro = mediana): ANOVA sobre las desviaciones absolutas respecto del
 * centro de cada grupo. Más robustas que Bartlett cuando los datos no son normales.
 */
export function levene(grupos, centro = 'mediana') {
  if (grupos.length < 2 || grupos.some((g) => g.length < 2 || !finitos(g))) return null;
  const z = grupos.map((g) => {
    const c = centro === 'media' ? media(g) : mediana(g);
    return g.map((x) => Math.abs(x - c));
  });
  const a = anovaGrupos(z);
  if (!a) return null;
  return { k: a.k, gl1: a.glB, gl2: a.glW, f: a.f, p: a.p, centro };
}

/**
 * Cochran: el mayor de los k desvíos, ¿es una varianza anormal? C = máx s² / Σ s². Exige el mismo número de datos
 * en cada grupo. Valor p ≈ k · P(F > (k − 1)C/(1 − C)) con F(ν, (k − 1)ν), ν = n − 1.
 */
export function cochran(grupos, alfa = 0.05) {
  const k = grupos.length;
  const n = grupos[0]?.length;
  if (k < 3 || !(n >= 2) || grupos.some((g) => g.length !== n || !finitos(g))) return null;
  const vars = grupos.map((g) => de(g) ** 2);
  const total = suma(vars);
  if (!(total > 0)) return null;
  const c = Math.max(...vars) / total;
  const nu = n - 1;
  const f = c < 1 ? ((k - 1) * c) / (1 - c) : Infinity;
  const fCrit = fCuantil(1 - alfa / k, nu, (k - 1) * nu);
  return {
    k, n, c, indice: vars.indexOf(Math.max(...vars)), critico: 1 / (1 + (k - 1) / fCrit),
    p: Number.isFinite(f) ? Math.min(1, k * (1 - fAcumulada(f, nu, (k - 1) * nu))) : 0,
  };
}

// --- 5. Comparación con el fabricante ----------------------------------------------------------------

/** Prueba t de una muestra: media propia contra el valor asignado, con el intervalo de confianza de la media. */
export function tUnaMuestra(valores, asignado, confianza = 0.95) {
  const n = valores.length;
  if (n < 3 || !finitos([...valores, asignado])) return null;
  const m = media(valores);
  const s = de(valores);
  if (!(s > 0)) return null;
  const gl = n - 1;
  const se = s / Math.sqrt(n);
  const t = (m - asignado) / se;
  const margen = tCuantil(1 - (1 - confianza) / 2, gl) * se;
  return { n, media: m, de: s, se, t, gl, p: pBilateralT(t, gl), ci: [m - margen, m + margen] };
}

/**
 * Intervalo de verificación de la media (sin prueba de hipótesis): el valor asignado ± z · DE del fabricante / √n.
 * Si tu media cae dentro, es coherente con el valor asignado. `deFabricante` es la DE declarada (no la tuya).
 */
export function intervaloVerificacion(valores, asignado, deFabricante, confianza = 0.95) {
  const n = valores.length;
  if (n < 2 || !finitos([...valores, asignado, deFabricante]) || !(deFabricante > 0)) return null;
  const m = media(valores);
  const z = zCuantil(1 - (1 - confianza) / 2);
  const margen = (z * deFabricante) / Math.sqrt(n);
  return { n, media: m, z, bajo: asignado - margen, alto: asignado + margen, dentro: Math.abs(m - asignado) <= margen };
}

/**
 * Chi cuadrado para la DE (o el CV) propia contra la declarada: χ² = (n − 1) s² / σ₀². Valor p unilateral
 * (¿eres más imprecisa que lo declarado?) y bilateral, con el intervalo de confianza de la DE.
 */
export function chiDesviacion(valores, deDeclarada, confianza = 0.95) {
  const n = valores.length;
  if (n < 3 || !finitos([...valores, deDeclarada]) || !(deDeclarada > 0)) return null;
  const s = de(valores);
  const gl = n - 1;
  const chi2 = (gl * s * s) / (deDeclarada * deDeclarada);
  const cdf = chi2Acumulada(chi2, gl);
  const a = (1 - confianza) / 2;
  return {
    n, de: s, gl, chi2, pMayor: 1 - cdf, pBilateral: Math.min(1, 2 * Math.min(cdf, 1 - cdf)),
    ciDe: [s * Math.sqrt(gl / chi2Cuantil(1 - a, gl)), s * Math.sqrt(gl / chi2Cuantil(a, gl))],
    limite: deDeclarada * Math.sqrt(chi2Cuantil(confianza, gl) / gl),
  };
}

/**
 * Sesgo respecto del valor asignado: absoluto, relativo (%) y su intervalo de confianza; y, si se entregan, el sesgo
 * permitido (%) y la DE asignada (para el índice de desviación estándar, SDI).
 */
export function sesgoAsignado(valores, asignado, { sesgoPermitidoPct = NaN, deAsignada = NaN, confianza = 0.95 } = {}) {
  const t = tUnaMuestra(valores, asignado, confianza);
  if (!t || asignado === 0) return null;
  const sesgo = t.media - asignado;
  const pct = (v) => (v / Math.abs(asignado)) * 100;
  return {
    sesgo, sesgoPct: pct(sesgo), ciPct: [pct(t.ci[0] - asignado), pct(t.ci[1] - asignado)],
    sdi: deAsignada > 0 ? sesgo / deAsignada : NaN,
    dentroDePermitido: Number.isFinite(sesgoPermitidoPct) ? Math.abs(pct(sesgo)) <= sesgoPermitidoPct : null,
    ciDentroDePermitido: Number.isFinite(sesgoPermitidoPct) ? Math.max(Math.abs(pct(t.ci[0] - asignado)), Math.abs(pct(t.ci[1] - asignado))) <= sesgoPermitidoPct : null,
  };
}

// --- 6. Precisión y partida del lote -----------------------------------------------------------------

/**
 * Precisión de un lote de control por ANOVA con una corrida (o día) por grupo: repetibilidad, componente entre
 * corridas (interserial) e intralaboratorio, como CV %. Si cada corrida tiene un solo dato, el CV interserial es el CV
 * de toda la serie y no hay repetibilidad. `cvHistorico`: CV de lotes anteriores (%) para comparar; `tea`: error total
 * permitido (%) y `sesgoPct` para la sigma de partida.
 */
export function precisionLote(grupos, { cvHistorico = NaN, tea = NaN, sesgoPct = 0, confianza = 0.95 } = {}) {
  if (grupos.length < 3 || grupos.some((g) => g.length < 1 || !finitos(g))) return null;
  const unico = grupos.every((g) => g.length === 1);
  let base;
  if (unico) {
    const x = grupos.map((g) => g[0]);
    const m = media(x);
    const s = de(x);
    if (!(m !== 0 && s > 0)) return null;
    base = { k: x.length, N: x.length, gran: m, cvWl: (s / Math.abs(m)) * 100, glWl: x.length - 1, soloSerie: true };
  } else {
    const a = anovaGrupos(grupos);
    if (!a || !(a.gran !== 0)) return null;
    base = { ...a, soloSerie: false };
  }
  const cv = base.cvWl;
  const limite = Number.isFinite(cvHistorico) && cvHistorico > 0 ? cvHistorico * Math.sqrt(chi2Cuantil(confianza, base.glWl) / base.glWl) : NaN;
  const sigmaPartida = Number.isFinite(tea) && cv > 0 ? (tea - Math.abs(sesgoPct)) / cv : NaN;
  return { ...base, cv, limiteHistorico: limite, razonHistorico: Number.isFinite(cvHistorico) ? cv / cvHistorico : NaN, dentroHistorico: Number.isFinite(limite) ? cv <= limite : null, sigmaPartida };
}
