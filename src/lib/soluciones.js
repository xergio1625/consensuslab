// Fórmulas de la calculadora de diluciones y preparación de soluciones. Funciones puras (se prueban con `npm test`).
// Concentraciones y volúmenes van en las unidades que use la persona, siempre las mismas en C1 y C2, y en V1 y V2.

/**
 * Dilución simple C1·V1 = C2·V2. Exactamente uno de los cuatro valores debe ser NaN: ese se calcula.
 * Devuelve {c1, v1, c2, v2, diluyente, factor} o {error} si los datos no tienen sentido (no se puede
 * diluir hacia una concentración mayor ni tomar más volumen de stock que el volumen final).
 */
export function resolverDilucion({ c1, v1, c2, v2 }) {
  const faltan = [c1, v1, c2, v2].filter(Number.isNaN).length;
  if (faltan !== 1) return { error: faltan === 0 ? 'vacio-uno' : 'faltan-datos' };
  if ([c1, v1, c2, v2].some((x) => !Number.isNaN(x) && x <= 0)) return { error: 'positivos' };
  if (Number.isNaN(c1)) c1 = (c2 * v2) / v1;
  else if (Number.isNaN(v1)) v1 = (c2 * v2) / c1;
  else if (Number.isNaN(c2)) c2 = (c1 * v1) / v2;
  else v2 = (c1 * v1) / c2;
  if (c2 > c1 * (1 + 1e-12) || v1 > v2 * (1 + 1e-12)) return { error: 'concentrar' };
  return { c1, v1, c2, v2, diluyente: v2 - v1, factor: c1 / c2 };
}

/**
 * Dilución seriada: cada tubo recibe `volFinal` / `factor` del anterior (el primero, del stock) y diluyente
 * hasta completar `volFinal`. Devuelve una fila por tubo con la dilución acumulada y la concentración.
 */
export function dilucionSeriada({ factor, tubos, volFinal, concInicial }) {
  if (!(factor > 1) || !(tubos >= 1) || !Number.isInteger(tubos) || !(volFinal > 0)) return null;
  const traspaso = volFinal / factor;
  return Array.from({ length: tubos }, (_, i) => {
    const acumulado = factor ** (i + 1);
    return {
      tubo: i + 1,
      acumulado,
      concentracion: Number.isFinite(concInicial) ? concInicial / acumulado : NaN,
      traspaso,
      diluyente: volFinal - traspaso,
    };
  });
}

/** Tipos de solución: lo que se pesa o mide para preparar `volMl` mL. */
export const TIPOS_SOLUCION = {
  M: { texto: 'Molar (mol/L)', unidad: 'g', necesitaPm: true },
  mM: { texto: 'Milimolar (mmol/L)', unidad: 'g', necesitaPm: true },
  pv: { texto: '% p/v (g por 100 mL)', unidad: 'g', necesitaPm: false },
  mgml: { texto: 'mg/mL', unidad: 'g', necesitaPm: false },
  pvv: { texto: '% v/v (mL por 100 mL)', unidad: 'mL', necesitaPm: false },
};

/**
 * Cantidad de soluto para preparar `volMl` mL de solución: gramos (M, mM, % p/v, mg/mL) o mL de soluto
 * líquido (% v/v). `pm` en g/mol, solo para M y mM. NaN si faltan datos.
 */
export function cantidadSoluto({ tipo, conc, volMl, pm }) {
  if (!TIPOS_SOLUCION[tipo] || !(conc > 0) || !(volMl > 0)) return NaN;
  if (TIPOS_SOLUCION[tipo].necesitaPm && !(pm > 0)) return NaN;
  switch (tipo) {
    case 'M': return (conc * pm * volMl) / 1000;
    case 'mM': return (conc * pm * volMl) / 1e6;
    case 'pv': return (conc * volMl) / 100;
    case 'mgml': return (conc * volMl) / 1000;
    case 'pvv': return (conc * volMl) / 100;
  }
}
