// Fórmulas de las calculadoras «Fórmulas y resultados». Funciones puras (se prueban con `npm test`).
// Porcentajes en % (CV 2,5 = 2,5 %). Cada fórmula clínica tiene su referencia en la página de la calculadora
// y sus casos de prueba en VECTORES (los mismos que verifica `tests/formulas.test.mjs`).
import { normalAcumulada } from './calidad.js';

/** Inversa de la normal estándar (bisección sobre normalAcumulada; suficiente para sigma). */
export function normalInversa(p) {
  if (!(p > 0 && p < 1)) return NaN;
  let bajo = -10;
  let alto = 10;
  for (let i = 0; i < 80; i++) {
    const medio = (bajo + alto) / 2;
    if (normalAcumulada(medio) < p) bajo = medio;
    else alto = medio;
  }
  return (bajo + alto) / 2;
}

/**
 * Valor de referencia de cambio (RCV, Fraser): √2 · Z · √(CVa² + CVi²), en %.
 * Z = 1,96 (bidireccional 95 %), 2,58 (bidireccional 99 %), 1,65 (unidireccional 95 %), 2,33 (unidireccional 99 %).
 */
export function rcv(cva, cvi, z = 1.96) {
  return Math.SQRT2 * z * Math.sqrt(cva ** 2 + cvi ** 2);
}

/** Cambio % entre dos resultados consecutivos y diferencia absoluta. */
export function delta(previo, actual) {
  return { absoluta: actual - previo, porcentaje: previo !== 0 ? ((actual - previo) / Math.abs(previo)) * 100 : NaN };
}

/**
 * Delta check: marca el resultado si supera el límite porcentual y/o el absoluto indicado (los que se informen).
 * Devuelve { ...delta, superaPorcentaje, superaAbsoluta, revisar }.
 */
export function deltaCheck(previo, actual, limitePct, limiteAbs) {
  const d = delta(previo, actual);
  const superaPorcentaje = Number.isFinite(limitePct) && Math.abs(d.porcentaje) > limitePct;
  const superaAbsoluta = Number.isFinite(limiteAbs) && Math.abs(d.absoluta) > limiteAbs;
  return { ...d, superaPorcentaje, superaAbsoluta, revisar: superaPorcentaje || superaAbsoluta };
}

/**
 * Incertidumbre de medición «de arriba hacia abajo» (Nordtest TR 537 / ISO/TS 20914), todo en %:
 * u_bias = √(RMSsesgo² + u_cal²), u_cal = U_calibrador / k_cal; u_c = √(CV² + u_bias²); U = k · u_c.
 */
export function incertidumbre(cvLargoPlazo, rmsSesgo, uCalibradorExpandida = 0, kCal = 2, k = 2) {
  const uCal = uCalibradorExpandida / kCal;
  const uSesgo = Math.sqrt(rmsSesgo ** 2 + uCal ** 2);
  const uc = Math.sqrt(cvLargoPlazo ** 2 + uSesgo ** 2);
  return { uCal, uSesgo, uc, U: k * uc };
}

/** Tasa de un indicador (eventos / total) con intervalo de Wilson al 95 %, todo en %. */
export function tasa(eventos, total, z = 1.96) {
  const p = eventos / total;
  const z2 = z * z;
  const centro = (p + z2 / (2 * total)) / (1 + z2 / total);
  const mitad = (z * Math.sqrt((p * (1 - p)) / total + z2 / (4 * total * total))) / (1 + z2 / total);
  return { tasa: p * 100, bajo: Math.max(0, centro - mitad) * 100, alto: Math.min(1, centro + mitad) * 100 };
}

/** Métrica sigma de un indicador de calidad desde su tasa de defectos (fracción, no %): z(1 − p) + 1,5. */
export function sigmaDeTasa(fraccionDefectos) {
  if (!(fraccionDefectos > 0 && fraccionDefectos < 1)) return NaN;
  return normalInversa(1 - fraccionDefectos) + 1.5;
}

/** Percentil p (0–100) por interpolación lineal, igual que PERCENTILE.INC de Excel y Sheets. */
export function percentil(lista, p) {
  const orden = [...lista].sort((a, b) => a - b);
  const pos = ((orden.length - 1) * p) / 100;
  const i = Math.floor(pos);
  const resto = pos - i;
  return i + 1 < orden.length ? orden[i] + resto * (orden[i + 1] - orden[i]) : orden[i];
}

/** Resumen de tiempos de respuesta (minutos): n, mediana, percentil 90 y % dentro de la meta. */
export function resumenTat(minutos, meta) {
  const dentro = minutos.filter((m) => m <= meta).length;
  return { n: minutos.length, mediana: percentil(minutos, 50), p90: percentil(minutos, 90), dentroPct: (dentro / minutos.length) * 100 };
}

/** Creatinina µmol/L ↔ mg/dL (factor 88,4). */
export const umolAMgdl = (x) => x / 88.4;

/**
 * CKD-EPI 2021 (creatinina, sin raza; Inker et al., N Engl J Med 2021): mL/min/1,73 m², adultos.
 * scr en mg/dL, edad en años, sexo 'F' o 'M'.
 */
export function ckdEpi2021(scr, edad, sexo) {
  const mujer = sexo === 'F';
  const kappa = mujer ? 0.7 : 0.9;
  const alfa = mujer ? -0.241 : -0.302;
  const r = scr / kappa;
  return 142 * Math.min(r, 1) ** alfa * Math.max(r, 1) ** -1.2 * 0.9938 ** edad * (mujer ? 1.012 : 1);
}

/** LDL-C de Friedewald (mg/dL): CT − HDL − TG/5. Válido con TG < 400 mg/dL. */
export function ldlFriedewald(ct, hdl, tg) {
  return ct - hdl - tg / 5;
}

/** LDL-C de Sampson-NIH (mg/dL; Sampson et al., JAMA Cardiol 2020). Válido con TG ≤ 800 mg/dL. */
export function ldlSampson(ct, hdl, tg) {
  const noHdl = ct - hdl;
  return ct / 0.948 - hdl / 0.971 - (tg / 8.56 + (tg * noHdl) / 2140 - tg ** 2 / 16100) - 9.44;
}

/** Rango de triglicéridos (mg/dL) donde cada ecuación está validada. */
export const RANGO_LDL = { friedewald: 400, sampson: 800 };

/**
 * Compara los métodos de LDL calculado para un mismo resultado. `martin` (Martin-Hopkins) y `directo` son
 * valores opcionales traídos del sistema del laboratorio. Cada fila: { id, valor, fueraDeRango, difDirecto, pctDirecto }.
 * Las diferencias se miden contra el LDL directo si existe.
 */
export function comparacionLdl(ct, hdl, tg, { martin = NaN, directo = NaN } = {}) {
  const fila = (id, valor, fuera) => {
    const hayDirecto = Number.isFinite(directo) && id !== 'directo';
    return {
      id,
      valor,
      fueraDeRango: fuera,
      difDirecto: hayDirecto ? valor - directo : NaN,
      pctDirecto: hayDirecto && directo !== 0 ? ((valor - directo) / directo) * 100 : NaN,
    };
  };
  const filas = [
    fila('friedewald', ldlFriedewald(ct, hdl, tg), tg >= RANGO_LDL.friedewald),
    fila('sampson', ldlSampson(ct, hdl, tg), tg > RANGO_LDL.sampson),
  ];
  if (Number.isFinite(martin)) filas.push(fila('martin', martin, tg >= RANGO_LDL.friedewald));
  if (Number.isFinite(directo)) filas.push(fila('directo', directo, false));
  return filas;
}

/** Friedewald y Sampson-NIH con el mismo CT y HDL para distintos triglicéridos: cómo se separan los métodos. */
export function barridoTg(ct, hdl, tgs) {
  return tgs.map((tg) => {
    const fried = ldlFriedewald(ct, hdl, tg);
    const samp = ldlSampson(ct, hdl, tg);
    return { tg, friedewald: fried, sampson: samp, diferencia: fried - samp };
  });
}

/**
 * Casos de prueba para verificar el cálculo automático de un LIS o un analizador.
 * Valores calculados con las funciones de este archivo y comprobados a mano (ver tests/formulas.test.mjs).
 */
export const VECTORES = {
  ckdEpi2021: [
    { scr: 1.0, edad: 50, sexo: 'M', esperado: 91.7 },
    { scr: 0.6, edad: 30, sexo: 'F', esperado: 123.8 },
    { scr: 1.5, edad: 70, sexo: 'F', esperado: 37.3 },
    { scr: 2.4, edad: 65, sexo: 'M', esperado: 29.2 },
  ],
  ldl: [
    { ct: 200, hdl: 50, tg: 150, friedewald: 120.0, sampson: 123.4 },
    { ct: 180, hdl: 40, tg: 300, friedewald: 80.0, sampson: 90.2 },
    { ct: 150, hdl: 60, tg: 80, friedewald: 74.0, sampson: 74.7 },
  ],
};
