// Fórmulas de trabajo del laboratorio: centrífuga, desinfectantes, actividad enzimática y puntaje de licitación.
// Funciones puras (se prueban con `npm test`).

/** Fuerza centrífuga relativa (× g): 1,118 × 10⁻⁵ × radio (cm) × rpm². */
export function rcf(rpm, radioCm) {
  return 1.118e-5 * radioCm * rpm ** 2;
}

/** rpm necesarias para una fuerza centrífuga relativa (× g) con un radio (cm). */
export function rpmDesdeRcf(g, radioCm) {
  return Math.sqrt(g / (1.118e-5 * radioCm));
}

/**
 * Dilución de hipoclorito (o cualquier desinfectante con concentración conocida) hasta una concentración de uso.
 * `comercial` y `objetivo` en las mismas unidades (por ejemplo, % de cloro activo); `volumenFinal` en la unidad que
 * prefieras. Devuelve el volumen de producto, el de agua y el factor de dilución, o { error }.
 */
export function diluirDesinfectante({ comercial, objetivo, volumenFinal }) {
  if (![comercial, objetivo, volumenFinal].every((x) => Number.isFinite(x) && x > 0)) return { error: 'positivos' };
  if (objetivo > comercial) return { error: 'concentrar' };
  const producto = (volumenFinal * objetivo) / comercial;
  return { producto, agua: volumenFinal - producto, factor: comercial / objetivo };
}

/** Cloro activo: % ↔ ppm (mg/L): 1 % = 10.000 ppm. */
export const porcentajeAPpm = (pct) => pct * 10000;
export const ppmAPorcentaje = (ppm) => ppm / 10000;

/**
 * Actividad enzimática desde la velocidad de cambio de absorbancia:
 * U/L = (ΔA/min − blanco) × V total × 1000 / (ε × paso óptico × V muestra) × factor de dilución,
 * con ε en L·mmol⁻¹·cm⁻¹ (NADH/NADPH a 340 nm: 6,22), volúmenes en la misma unidad y el paso óptico en cm.
 * 1 U = 1 µmol/min = 16,67 nkat.
 */
export function actividadEnzimatica({ deltaAbsMin, blancoAbsMin = 0, volTotal, volMuestra, epsilon, paso = 1, dilucion = 1 }) {
  if (![deltaAbsMin, volTotal, volMuestra, epsilon, paso, dilucion].every(Number.isFinite)) return null;
  if (!(volTotal > 0 && volMuestra > 0 && epsilon > 0 && paso > 0 && dilucion > 0) || volMuestra > volTotal) return null;
  const velocidad = deltaAbsMin - (Number.isFinite(blancoAbsMin) ? blancoAbsMin : 0);
  const ul = (velocidad * volTotal * 1000 * dilucion) / (epsilon * paso * volMuestra);
  return { velocidad, ul, ukatL: ul / 60, nkatL: (ul * 1000) / 60, umL: ul / 1000 };
}

/**
 * Puntaje de una licitación con tres criterios ponderados (en %, deben sumar 100): económico, técnico y otros.
 * Puntaje económico = precio mínimo entre las ofertas admisibles / precio de la oferta × 100 (fórmula habitual
 * de ChileCompra; las bases de cada licitación pueden fijar otra). `minimoTecnico` deja fuera a quien no lo alcance.
 * Devuelve cada oferta con sus puntajes, si es admisible y su lugar; `lugar` 1 para la mejor (empates comparten lugar).
 */
export function puntajeLicitacion({ ponderacion, ofertas, minimoTecnico = 0 }) {
  const { economico = 0, tecnico = 0, otros = 0 } = ponderacion;
  if (Math.abs(economico + tecnico + otros - 100) > 1e-9 || [economico, tecnico, otros].some((x) => !(x >= 0))) return null;
  const validas = ofertas.filter((o) => Number.isFinite(o.precio) && o.precio > 0);
  if (validas.length < 1) return null;
  const admisible = (o) => !(Number.isFinite(minimoTecnico) && minimoTecnico > 0 && (o.tecnico ?? 0) < minimoTecnico);
  const admitidas = validas.filter(admisible);
  const minimo = admitidas.length ? Math.min(...admitidas.map((o) => o.precio)) : NaN;
  const filas = ofertas.map((o) => {
    const ok = Number.isFinite(o.precio) && o.precio > 0;
    const adm = ok && admisible(o);
    const pe = adm ? (minimo / o.precio) * 100 : NaN;
    const total = adm ? (economico * pe + tecnico * (o.tecnico ?? 0) + otros * (o.otros ?? 0)) / 100 : NaN;
    return { ...o, admisible: adm, puntajeEconomico: pe, total, lugar: NaN };
  });
  const ordenadas = filas.filter((f) => f.admisible).sort((a, b) => b.total - a.total);
  ordenadas.forEach((f) => {
    f.lugar = 1 + ordenadas.filter((g) => g.total > f.total + 1e-9).length;
  });
  return { filas, precioMinimo: minimo, ganadora: ordenadas[0] ?? null, empate: ordenadas.length > 1 && Math.abs(ordenadas[0].total - ordenadas[1].total) <= 1e-9 };
}
