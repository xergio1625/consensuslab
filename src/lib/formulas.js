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

/**
 * CKD-EPI 2009 (creatinina; Levey et al., Ann Intern Med 2009): mL/min/1,73 m². Incluye el coeficiente de raza
 * original (`negra`), solo para comparar con sistemas que aún lo usan.
 */
export function ckdEpi2009(scr, edad, sexo, negra = false) {
  const mujer = sexo === 'F';
  const r = scr / (mujer ? 0.7 : 0.9);
  const alfa = mujer ? -0.329 : -0.411;
  return 141 * Math.min(r, 1) ** alfa * Math.max(r, 1) ** -1.209 * 0.993 ** edad * (mujer ? 1.018 : 1) * (negra ? 1.159 : 1);
}

/** MDRD de 4 variables con creatinina trazable a IDMS (Levey et al., 2006): mL/min/1,73 m². */
export function mdrd(scr, edad, sexo, negra = false) {
  return 175 * scr ** -1.154 * edad ** -0.203 * (sexo === 'F' ? 0.742 : 1) * (negra ? 1.212 : 1);
}

/** Cockcroft-Gault (1976): depuración de creatinina en mL/min (no indexada). peso en kg, scr en mg/dL. */
export function cockcroftGault(scr, edad, sexo, peso) {
  return (((140 - edad) * peso) / (72 * scr)) * (sexo === 'F' ? 0.85 : 1);
}

/** CKD-EPI 2012 con cistatina C sola (Inker et al., N Engl J Med 2012): scys en mg/L. mL/min/1,73 m². */
export function ckdEpiCistatina(scys, edad, sexo) {
  const r = scys / 0.8;
  return 133 * Math.min(r, 1) ** -0.499 * Math.max(r, 1) ** -1.328 * 0.996 ** edad * (sexo === 'F' ? 0.932 : 1);
}

/** CKD-EPI 2021 con creatinina y cistatina C, sin raza (Inker et al., N Engl J Med 2021). mL/min/1,73 m². */
export function ckdEpiCrCis2021(scr, scys, edad, sexo) {
  const mujer = sexo === 'F';
  const rCr = scr / (mujer ? 0.7 : 0.9);
  const rCis = scys / 0.8;
  return (
    135 * Math.min(rCr, 1) ** (mujer ? -0.219 : -0.144) * Math.max(rCr, 1) ** -0.544 *
    Math.min(rCis, 1) ** -0.323 * Math.max(rCis, 1) ** -0.778 * 0.9961 ** edad * (mujer ? 0.963 : 1)
  );
}

/** Superficie corporal de Mosteller (m²): talla en cm, peso en kg. */
export const superficieMosteller = (tallaCm, pesoKg) => Math.sqrt((tallaCm * pesoKg) / 3600);

/** Categoría de filtrado glomerular de KDIGO (G1 a G5) para un valor en mL/min/1,73 m². */
export function categoriaGfr(v) {
  if (v >= 90) return 'G1';
  if (v >= 60) return 'G2';
  if (v >= 45) return 'G3a';
  if (v >= 30) return 'G3b';
  if (v >= 15) return 'G4';
  return 'G5';
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

/**
 * Factor ajustable de Martin-Hopkins (Martin et al., JAMA 2013): mediana de TG/VLDL-C por estrato de triglicéridos
 * (30 filas, `desde` en mg/dL) y de colesterol no HDL (6 columnas: <100, 100-129, 130-159, 160-189, 190-219, ≥220).
 * La última fila (400-13.975) es una sola para todos los TG altos.
 */
export const TABLA_MARTIN = [
  [7, [3.5, 3.4, 3.3, 3.3, 3.2, 3.1]],
  [50, [4.0, 3.9, 3.7, 3.6, 3.6, 3.4]],
  [57, [4.3, 4.1, 4.0, 3.9, 3.8, 3.6]],
  [62, [4.5, 4.3, 4.1, 4.0, 3.9, 3.9]],
  [67, [4.7, 4.4, 4.3, 4.2, 4.1, 3.9]],
  [72, [4.8, 4.6, 4.4, 4.2, 4.2, 4.1]],
  [76, [4.9, 4.6, 4.5, 4.3, 4.3, 4.2]],
  [80, [5.0, 4.8, 4.6, 4.4, 4.3, 4.2]],
  [84, [5.1, 4.8, 4.6, 4.5, 4.4, 4.3]],
  [88, [5.2, 4.9, 4.7, 4.6, 4.4, 4.3]],
  [93, [5.3, 5.0, 4.8, 4.7, 4.5, 4.4]],
  [97, [5.4, 5.1, 4.8, 4.7, 4.5, 4.3]],
  [101, [5.5, 5.2, 5.0, 4.7, 4.6, 4.5]],
  [106, [5.6, 5.3, 5.0, 4.8, 4.6, 4.5]],
  [111, [5.7, 5.4, 5.1, 4.9, 4.7, 4.5]],
  [116, [5.8, 5.5, 5.2, 5.0, 4.8, 4.6]],
  [121, [6.0, 5.5, 5.3, 5.0, 4.8, 4.6]],
  [127, [6.1, 5.7, 5.3, 5.1, 4.9, 4.7]],
  [133, [6.2, 5.8, 5.4, 5.2, 5.0, 4.7]],
  [139, [6.3, 5.9, 5.6, 5.3, 5.0, 4.8]],
  [147, [6.5, 6.0, 5.7, 5.4, 5.1, 4.8]],
  [155, [6.7, 6.2, 5.8, 5.4, 5.2, 4.9]],
  [164, [6.8, 6.3, 5.9, 5.5, 5.3, 5.0]],
  [174, [7.0, 6.5, 6.0, 5.7, 5.4, 5.1]],
  [186, [7.3, 6.7, 6.2, 5.8, 5.5, 5.2]],
  [202, [7.6, 6.9, 6.4, 6.0, 5.6, 5.3]],
  [221, [8.0, 7.2, 6.6, 6.2, 5.9, 5.4]],
  [248, [8.5, 7.6, 7.0, 6.5, 6.1, 5.6]],
  [293, [9.5, 8.3, 7.5, 7.0, 6.5, 5.9]],
  [400, [11.9, 10.0, 8.8, 8.1, 7.5, 6.7]],
];

/** Factor de Martin-Hopkins para TG y colesterol no HDL (mg/dL). NaN con TG bajo 7 mg/dL (fuera de la tabla). */
export function factorMartin(tg, noHdl) {
  if (!(tg >= TABLA_MARTIN[0][0])) return NaN;
  let fila = TABLA_MARTIN[0][1];
  for (const [desde, factores] of TABLA_MARTIN) {
    if (tg >= desde) fila = factores;
    else break;
  }
  const columna = noHdl < 100 ? 0 : noHdl < 130 ? 1 : noHdl < 160 ? 2 : noHdl < 190 ? 3 : noHdl < 220 ? 4 : 5;
  return fila[columna];
}

/** LDL-C de Martin-Hopkins (mg/dL): no HDL - TG / factor. Con TG de 400 o más la tabla tiene una sola fila y pierde exactitud. */
export function ldlMartin(ct, hdl, tg) {
  const noHdl = ct - hdl;
  return noHdl - tg / factorMartin(tg, noHdl);
}

/** Intervalo de Wilson para una proporción (en %). */
function wilson(x, n, z = 1.96) {
  if (!(n > 0)) return [NaN, NaN];
  const t = tasa(x, n, z);
  return [t.bajo, t.alto];
}

/**
 * Rendimiento diagnóstico desde una tabla 2×2 (vp, fp, fn, vn). Sensibilidad, especificidad, exactitud, valores
 * predictivos y razones de verosimilitud con intervalo de confianza al 95 % (Wilson para proporciones; logarítmico
 * de Simel para las razones). Con `prevalencia` (%) los valores predictivos se calculan por Bayes; sin ella, con la
 * prevalencia de la muestra. Todo en %, salvo las razones.
 */
export function rendimientoDiagnostico({ vp, fp, fn, vn, prevalencia = NaN }) {
  const enfermos = vp + fn;
  const sanos = fp + vn;
  const total = enfermos + sanos;
  if (![vp, fp, fn, vn].every((x) => Number.isInteger(x) && x >= 0) || enfermos === 0 || sanos === 0) return null;
  const sens = vp / enfermos;
  const esp = vn / sanos;
  const prev = Number.isFinite(prevalencia) ? prevalencia / 100 : enfermos / total;
  const vpp = (sens * prev) / (sens * prev + (1 - esp) * (1 - prev));
  const vpn = (esp * (1 - prev)) / (esp * (1 - prev) + (1 - sens) * prev);
  const lrPos = sens / (1 - esp);
  const lrNeg = (1 - sens) / esp;
  const ciLr = (lr, ee) => (Number.isFinite(lr) && lr > 0 && Number.isFinite(ee) ? [Math.exp(Math.log(lr) - 1.96 * ee), Math.exp(Math.log(lr) + 1.96 * ee)] : [NaN, NaN]);
  const eePos = Math.sqrt(1 / vp - 1 / enfermos + 1 / fp - 1 / sanos);
  const eeNeg = Math.sqrt(1 / fn - 1 / enfermos + 1 / vn - 1 / sanos);
  // Con valores predictivos por Bayes (prevalencia externa) no hay intervalo de Wilson: se informa solo con la muestra.
  const conPrevalenciaPropia = !Number.isFinite(prevalencia);
  return {
    total, prevalenciaUsada: prev * 100,
    sensibilidad: sens * 100, ciSensibilidad: wilson(vp, enfermos),
    especificidad: esp * 100, ciEspecificidad: wilson(vn, sanos),
    exactitud: ((vp + vn) / total) * 100, ciExactitud: wilson(vp + vn, total),
    vpp: vpp * 100, ciVpp: conPrevalenciaPropia ? wilson(vp, vp + fp) : [NaN, NaN],
    vpn: vpn * 100, ciVpn: conPrevalenciaPropia ? wilson(vn, vn + fn) : [NaN, NaN],
    lrPositiva: lrPos, ciLrPositiva: ciLr(lrPos, eePos),
    lrNegativa: lrNeg, ciLrNegativa: ciLr(lrNeg, eeNeg),
    youden: (sens + esp - 1) * 100,
  };
}

/**
 * Temperatura cinética media (MKT, USP): Tk = (ΔH/R) / −ln(Σ e^(−ΔH/(R·Ti)) / n), con ΔH/R = 10.000 K
 * (ΔH = 83,144 kJ/mol por defecto), temperaturas medidas a intervalos iguales. Entra y sale en °C.
 */
export function temperaturaCineticaMedia(temperaturasC, deltaHsobreR = 10000) {
  if (!temperaturasC.length || temperaturasC.some((t) => !Number.isFinite(t) || t <= -273.15)) return NaN;
  const suma = temperaturasC.reduce((s, t) => s + Math.exp(-deltaHsobreR / (t + 273.15)), 0);
  return deltaHsobreR / -Math.log(suma / temperaturasC.length) - 273.15;
}

/** Rango de triglicéridos (mg/dL) donde cada ecuación está validada. */
export const RANGO_LDL = { friedewald: 400, sampson: 800, martin: 400 };

/**
 * Compara Friedewald, Martin-Hopkins y Sampson-NIH para un mismo resultado, más el LDL `directo` opcional que
 * mide el laboratorio. Cada fila: { id, valor, fueraDeRango, difDirecto, pctDirecto }. Las diferencias se miden
 * contra el LDL directo si existe. Con TG de 400 o más, Friedewald queda fuera de rango y Martin-Hopkins con exactitud limitada.
 */
export function comparacionLdl(ct, hdl, tg, { directo = NaN } = {}) {
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
  const martin = ldlMartin(ct, hdl, tg);
  if (Number.isFinite(martin)) filas.splice(1, 0, fila('martin', martin, tg >= RANGO_LDL.martin));
  if (Number.isFinite(directo)) filas.push(fila('directo', directo, false));
  return filas;
}

/** Friedewald, Martin-Hopkins y Sampson-NIH con el mismo CT y HDL para distintos triglicéridos: cómo se separan los métodos. */
export function barridoTg(ct, hdl, tgs) {
  return tgs.map((tg) => {
    const fried = ldlFriedewald(ct, hdl, tg);
    const samp = ldlSampson(ct, hdl, tg);
    return { tg, friedewald: fried, martin: ldlMartin(ct, hdl, tg), sampson: samp, diferencia: fried - samp };
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
    { ct: 200, hdl: 50, tg: 150, friedewald: 120.0, martin: 123.7, sampson: 123.4 },
    { ct: 180, hdl: 40, tg: 300, friedewald: 80.0, martin: 100.0, sampson: 90.2 },
    { ct: 150, hdl: 60, tg: 80, friedewald: 74.0, martin: 74.0, sampson: 74.7 },
  ],
};
