// Estadística y herramientas de mejora para el laboratorio: pruebas t y F entre series, valores atípicos, Pareto,
// gráfico p, disponibilidad y OEE de equipos y AMEF. Funciones puras (se prueban con `npm test`).
import { fAcumulada, tAcumulada, tCuantil } from './metodos.js';
import { percentil } from './formulas.js';

const media = (v) => v.reduce((s, x) => s + x, 0) / v.length;
const de = (v) => {
  const m = media(v);
  return Math.sqrt(v.reduce((s, x) => s + (x - m) ** 2, 0) / (v.length - 1));
};

/** Resumen de una serie: n, media, DE y CV %. */
export function resumenSerie(v) {
  const m = media(v);
  const s = de(v);
  return { n: v.length, media: m, de: s, cv: m !== 0 ? (s / Math.abs(m)) * 100 : NaN };
}

/**
 * Compara dos series (la segunda frente a la primera: por ejemplo, lote nuevo frente a lote anterior).
 * Prueba t de Welch para las medias (varianzas distintas, gl de Welch-Satterthwaite) con intervalo de confianza de la
 * diferencia, y prueba F bilateral para las varianzas. Valores p bilaterales. Necesita al menos 2 valores por serie.
 */
export function compararSeries(primera, segunda, confianza = 0.95) {
  if (primera.length < 2 || segunda.length < 2 || [...primera, ...segunda].some((x) => !Number.isFinite(x))) return null;
  const a = resumenSerie(primera);
  const b = resumenSerie(segunda);
  const va = a.de ** 2 / a.n;
  const vb = b.de ** 2 / b.n;
  const se = Math.sqrt(va + vb);
  const diferencia = b.media - a.media;
  const gl = (va + vb) ** 2 / (va ** 2 / (a.n - 1) + vb ** 2 / (b.n - 1));
  const t = se > 0 ? diferencia / se : 0;
  const p = se > 0 ? 2 * (1 - tAcumulada(Math.abs(t), gl)) : 1;
  const margen = tCuantil(1 - (1 - confianza) / 2, gl) * se;
  const f = a.de > 0 ? b.de ** 2 / a.de ** 2 : NaN;
  const cdf = Number.isFinite(f) ? fAcumulada(f, b.n - 1, a.n - 1) : NaN;
  return {
    primera: a, segunda: b, diferencia,
    diferenciaPct: a.media !== 0 ? (diferencia / Math.abs(a.media)) * 100 : NaN,
    ciDiferencia: [diferencia - margen, diferencia + margen],
    ciDiferenciaPct: a.media !== 0 ? [((diferencia - margen) / Math.abs(a.media)) * 100, ((diferencia + margen) / Math.abs(a.media)) * 100] : [NaN, NaN],
    t, gl, pMedias: p,
    f, pVarianzas: Number.isFinite(cdf) ? 2 * Math.min(cdf, 1 - cdf) : NaN,
  };
}

/**
 * Prueba de Grubbs bilateral para un valor atípico en una serie con distribución aproximadamente normal.
 * G = máx |x − media| / DE; G crítico = (n − 1)/√n · √(t² / (n − 2 + t²)), con t = t(1 − α/(2n), n − 2).
 */
export function grubbs(valores, alfa = 0.05) {
  const n = valores.length;
  if (n < 3 || valores.some((x) => !Number.isFinite(x))) return null;
  const m = media(valores);
  const s = de(valores);
  if (!(s > 0)) return null;
  let indice = 0;
  valores.forEach((x, i) => {
    if (Math.abs(x - m) > Math.abs(valores[indice] - m)) indice = i;
  });
  const g = Math.abs(valores[indice] - m) / s;
  const t = tCuantil(1 - alfa / (2 * n), n - 2);
  const critico = ((n - 1) / Math.sqrt(n)) * Math.sqrt(t ** 2 / (n - 2 + t ** 2));
  return { n, media: m, de: s, indice, valor: valores[indice], lado: valores[indice] > m ? 'alto' : 'bajo', g, critico, atipico: g > critico };
}

/** Valores fuera de las vallas de Tukey: Q1 − 1,5·RIC y Q3 + 1,5·RIC (extremos con 3·RIC). Cuartiles como PERCENTILE.INC. */
export function vallasTukey(valores) {
  if (valores.length < 4 || valores.some((x) => !Number.isFinite(x))) return null;
  const q1 = percentil(valores, 25);
  const q3 = percentil(valores, 75);
  const ric = q3 - q1;
  const vallas = { inferior: q1 - 1.5 * ric, superior: q3 + 1.5 * ric, extremaInferior: q1 - 3 * ric, extremaSuperior: q3 + 3 * ric };
  return {
    q1, q3, ric, ...vallas,
    puntos: valores.map((x, i) => ({
      indice: i + 1, valor: x,
      atipico: x < vallas.inferior || x > vallas.superior,
      extremo: x < vallas.extremaInferior || x > vallas.extremaSuperior,
    })),
  };
}

/** Pareto: causas ordenadas de mayor a menor, con % y % acumulado. `vitales` = causas necesarias para llegar al 80 %. */
export function pareto(items) {
  const validos = items.filter((x) => Number.isFinite(x.cantidad) && x.cantidad > 0);
  const total = validos.reduce((s, x) => s + x.cantidad, 0);
  if (!total) return null;
  const orden = validos.map((x, i) => ({ ...x, i })).sort((a, b) => b.cantidad - a.cantidad || a.i - b.i);
  let acumulado = 0;
  const filas = orden.map((x) => {
    acumulado += x.cantidad;
    return { nombre: x.nombre, cantidad: x.cantidad, pct: (x.cantidad / total) * 100, acumulado: (acumulado / total) * 100 };
  });
  const primero = filas.findIndex((f) => f.acumulado >= 80 - 1e-9);
  return { total, filas, vitales: primero + 1 };
}

/**
 * Gráfico p (tasas por período con tamaños distintos): línea central = Σ eventos / Σ total; límites de cada período
 * p̄ ± 3·√(p̄(1 − p̄)/n). Marca los puntos fuera de límites y las rachas de 8 o más puntos seguidos al mismo lado.
 */
export function graficoP(periodos) {
  const validos = periodos.filter((x) => Number.isInteger(x.eventos) && Number.isInteger(x.total) && x.total > 0 && x.eventos >= 0 && x.eventos <= x.total);
  if (validos.length < 2 || validos.length !== periodos.length) return null;
  const pBarra = validos.reduce((s, x) => s + x.eventos, 0) / validos.reduce((s, x) => s + x.total, 0);
  const puntos = validos.map((x, i) => {
    const sigma = Math.sqrt((pBarra * (1 - pBarra)) / x.total);
    const p = x.eventos / x.total;
    const lado = p > pBarra ? 1 : p < pBarra ? -1 : 0;
    return { indice: i + 1, etiqueta: x.etiqueta, eventos: x.eventos, total: x.total, p, limiteSup: Math.min(1, pBarra + 3 * sigma), limiteInf: Math.max(0, pBarra - 3 * sigma), lado, fuera: false, racha: false };
  });
  puntos.forEach((x) => {
    x.fuera = x.p > x.limiteSup + 1e-12 || x.p < x.limiteInf - 1e-12;
  });
  let largo = 0;
  puntos.forEach((x, i) => {
    largo = x.lado !== 0 && i > 0 && x.lado === puntos[i - 1].lado ? largo + 1 : x.lado !== 0 ? 1 : 0;
    if (largo >= 8) for (let k = 0; k < 8; k++) puntos[i - k].racha = true;
  });
  return { pBarra, puntos };
}

/**
 * Disponibilidad y OEE de un equipo en un período. Horas programadas, paradas planificadas (mantención), horas de falla
 * y número de fallas; producción: resultados procesados, capacidad ideal por hora de operación y resultados buenos
 * (reportables sin repetir). MTBF = horas de operación / fallas; MTTR = horas de falla / fallas;
 * disponibilidad = operación / (programadas − planificadas); OEE = disponibilidad × rendimiento × calidad.
 */
export function oeeEquipo({ programadas, planificadas = 0, horasFalla = 0, fallas = 0, procesados, capacidadHora, buenos }) {
  const base = programadas - planificadas;
  const operacion = base - horasFalla;
  if (![programadas, planificadas, horasFalla, fallas].every(Number.isFinite) || !(base > 0) || !(operacion > 0) || horasFalla < 0 || fallas < 0) return null;
  const conProduccion = [procesados, capacidadHora, buenos].every((x) => Number.isFinite(x) && x >= 0) && capacidadHora > 0 && buenos <= procesados;
  const disponibilidad = operacion / base;
  const rendimiento = conProduccion ? procesados / (capacidadHora * operacion) : NaN;
  const calidad = conProduccion && procesados > 0 ? buenos / procesados : NaN;
  return {
    operacion,
    mtbf: fallas > 0 ? operacion / fallas : NaN,
    mttr: fallas > 0 ? horasFalla / fallas : NaN,
    disponibilidad: disponibilidad * 100,
    rendimiento: rendimiento * 100,
    calidad: calidad * 100,
    oee: disponibilidad * rendimiento * calidad * 100,
  };
}

/**
 * AMEF: número de prioridad de riesgo NPR = severidad × ocurrencia × detección (cada una de 1 a 10). Ordena de mayor a
 * menor NPR (a igual NPR, mayor severidad primero). `critico`: severidad ≥ 9; `alto`: NPR ≥ `umbral`.
 */
export function amef(modos, umbral = 100) {
  if (!modos.length) return null;
  const valido = (x) => Number.isInteger(x) && x >= 1 && x <= 10;
  if (modos.some((m) => ![m.s, m.o, m.d].every(valido))) return null;
  return modos
    .map((m, i) => ({ ...m, i, npr: m.s * m.o * m.d, critico: m.s >= 9, alto: m.s * m.o * m.d >= umbral }))
    .sort((a, b) => b.npr - a.npr || b.s - a.s || a.i - b.i);
}
