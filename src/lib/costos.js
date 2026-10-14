// Fórmulas de las calculadoras de costos y rendimiento. Funciones puras (se prueban con `npm test`).
// Los montos van en la moneda que use la persona (no se asume una); los porcentajes, en % (5 = 5 %).

/**
 * Determinaciones que el analizador procesa al mes: las muestras informadas (estadística del laboratorio) más
 * repeticiones, controles y calibraciones. `consumo` es lo que cuenta el equipo; `muestras`, lo que se reporta.
 */
export function consumoMensual({
  muestras,
  repeticionPct = 0,
  corridasControl = 0,
  nivelesControl = 1,
  calibraciones = 0,
  replicadosCalib = 1,
}) {
  const repeticiones = (muestras * repeticionPct) / 100;
  const controles = corridasControl * nivelesControl;
  const calib = calibraciones * replicadosCalib;
  return { repeticiones, controles, calib, consumo: muestras + repeticiones + controles + calib };
}

/**
 * Rendimiento real de un reactivo en un mes.
 * Entradas: `deterKit` (declaradas por el fabricante), `perdidaKit` (cebado, volumen muerto, purgas por kit),
 * `muestras` (resultados reportables al mes), `repeticionPct`, `corridasControl`, `nivelesControl`,
 * `calibraciones` y `replicadosCalib` (por mes).
 * Devuelve el consumo mensual, los kits usados, los resultados reportables por kit, el rendimiento (% de lo
 * declarado que termina en resultados) y el reparto del kit entre resultados, repeticiones, controles,
 * calibraciones y pérdidas.
 */
export function rendimientoReactivo({
  deterKit,
  perdidaKit = 0,
  muestras,
  repeticionPct = 0,
  corridasControl = 0,
  nivelesControl = 1,
  calibraciones = 0,
  replicadosCalib = 1,
}) {
  const { consumo, repeticiones, controles, calib } = consumoMensual({
    muestras, repeticionPct, corridasControl, nivelesControl, calibraciones, replicadosCalib,
  });
  const utiles = deterKit - perdidaKit;
  if (!(utiles > 0) || !(muestras > 0)) return null;
  const kitsMes = consumo / utiles;
  const declaradas = kitsMes * deterKit;
  return {
    consumo,
    utilesPorKit: utiles,
    kitsMes,
    kitsAComprar: Math.ceil(kitsMes - 1e-9),
    reportablesPorKit: muestras / kitsMes,
    rendimiento: (muestras / declaradas) * 100,
    diasPorKit: utiles / (consumo / 30),
    reparto: {
      resultados: (muestras / declaradas) * 100,
      repeticiones: (repeticiones / declaradas) * 100,
      controles: (controles / declaradas) * 100,
      calibraciones: (calib / declaradas) * 100,
      perdidas: ((kitsMes * perdidaKit) / declaradas) * 100,
    },
  };
}

/**
 * Costo por determinación reportable. Suma, por mes: reactivo, material de control, calibrador, insumos por
 * determinación procesada, personal (minutos por muestra × costo por hora) y costo fijo (comodato, mantención,
 * arriendo del equipo). Con `arancel` calcula el margen y el punto de equilibrio.
 *
 * Cómo cobra el proveedor (`cobro`): 'kit' (precio del kit y determinaciones por kit), 'realizado' (precio por test
 * realizado en el analizador: muestras + repeticiones + controles + calibraciones) o 'reportado' (precio por
 * resultado informado, según la estadística del laboratorio). Con cobro por test se usa `precioTest`.
 *
 * Equipo en comodato: `equipoEnPrecioPct` es el % del cargo de reactivo que en realidad paga el analizador
 * (comodato incluido en el precio). Ese monto, junto con el costo fijo, es el «costo del equipo»; `sinEquipo` es el
 * costo por determinación sin él, la cifra para comparar ofertas cuyo equipo se cobra de formas distintas.
 */
export function costoDeterminacion({
  precioKit,
  cobro = 'kit',
  precioTest = NaN,
  equipoEnPrecioPct = 0,
  costoControlMes = 0,
  costoCalibradorMes = 0,
  insumoPorDeterminacion = 0,
  minutosPorMuestra = 0,
  costoHora = 0,
  costoFijoMes = 0,
  arancel = NaN,
  ...rendimiento
}) {
  if (!['kit', 'realizado', 'reportado'].includes(cobro)) return null;
  if (!(equipoEnPrecioPct >= 0 && equipoEnPrecioPct <= 100)) return null;
  const porKit = cobro === 'kit';
  let r = null;
  if (porKit) r = rendimientoReactivo(rendimiento);
  else if (rendimiento.muestras > 0 && precioTest >= 0) r = { ...consumoMensual(rendimiento), kitsMes: NaN, rendimiento: NaN };
  if (!r) return null;
  const { muestras } = rendimiento;
  const cargoReactivo = porKit ? r.kitsMes * precioKit : precioTest * (cobro === 'realizado' ? r.consumo : muestras);
  const equipoIncluido = (cargoReactivo * equipoEnPrecioPct) / 100;
  const mensual = {
    reactivo: cargoReactivo - equipoIncluido,
    equipoIncluido,
    control: costoControlMes,
    calibrador: costoCalibradorMes,
    insumos: r.consumo * insumoPorDeterminacion,
    personal: (muestras * minutosPorMuestra * costoHora) / 60,
    fijo: costoFijoMes,
  };
  const total = Object.values(mensual).reduce((s, x) => s + x, 0);
  const porDeterminacion = Object.fromEntries(Object.entries(mensual).map(([k, v]) => [k, v / muestras]));
  const costo = total / muestras;
  const variable = (total - mensual.fijo) / muestras;
  const equipoMes = mensual.fijo + mensual.equipoIncluido;
  const conArancel = Number.isFinite(arancel) && arancel > 0;
  const margen = conArancel ? arancel - costo : NaN;
  return {
    rendimiento: r,
    mensual,
    porDeterminacion,
    total,
    costo,
    variable,
    // Costo del equipo y costo sin él, por determinación reportada y por determinación realizada en el analizador.
    equipoMes,
    sinEquipo: (total - equipoMes) / muestras,
    realizadas: r.consumo,
    factorRealizadas: r.consumo / muestras,
    porRealizada: total / r.consumo,
    sinEquipoPorRealizada: (total - equipoMes) / r.consumo,
    arancel: conArancel ? arancel : NaN,
    margen,
    margenPct: conArancel ? (margen / arancel) * 100 : NaN,
    resultadoMes: conArancel ? margen * muestras : NaN,
    // Determinaciones al mes que cubren el costo fijo con el margen sobre el costo variable.
    equilibrio: conArancel && arancel > variable ? mensual.fijo / (arancel - variable) : NaN,
  };
}

/**
 * Pasa un precio por test de una base de conteo a la otra. Con 'realizado' (test del analizador) el precio por
 * resultado reportado es mayor, porque hay que pagar también repeticiones, controles y calibraciones; con
 * 'reportado' (estadística del laboratorio) pasa al revés. Devuelve ambos precios y el factor realizadas/reportadas.
 */
export function convertirPrecioPorTest({ precio, base, ...produccion }) {
  if (!(precio >= 0) || !(produccion.muestras > 0) || !['realizado', 'reportado'].includes(base)) return null;
  const factor = consumoMensual(produccion).consumo / produccion.muestras;
  return base === 'realizado'
    ? { porRealizado: precio, porReportado: precio * factor, factor }
    : { porRealizado: precio / factor, porReportado: precio, factor };
}

/**
 * Comprar vs. derivar: costo mensual de hacer un examen en el laboratorio frente a enviarlo a un laboratorio externo.
 * Interno = costo fijo + costo variable × volumen. Externo = (tarifa + logística) × volumen + costo fijo del envío.
 * `equilibrio` es el volumen mensual donde ambos cuestan lo mismo (NaN si no existe o no es positivo); con
 * `sentido` 'sobre' el laboratorio propio conviene por encima de ese volumen y con 'bajo', por debajo.
 */
export function comprarVsDerivar({
  volumen,
  varInterno,
  fijoInterno = 0,
  tarifaExterna,
  logisticaPorMuestra = 0,
  fijoExterno = 0,
}) {
  if (![volumen, varInterno, tarifaExterna].every(Number.isFinite) || !(volumen > 0)) return null;
  if ([varInterno, fijoInterno, tarifaExterna, logisticaPorMuestra, fijoExterno].some((x) => !(x >= 0))) return null;
  const unitarioExterno = tarifaExterna + logisticaPorMuestra;
  const costos = (v) => {
    const interno = fijoInterno + varInterno * v;
    const externo = fijoExterno + unitarioExterno * v;
    return { volumen: v, interno, externo, internoPorDet: interno / v, externoPorDet: externo / v, diferencia: externo - interno };
  };
  const actual = costos(volumen);
  const d = unitarioExterno - varInterno; // lo que ahorra cada determinación propia sobre la externa
  const deltaFijo = fijoInterno - fijoExterno;
  const equilibrio = d !== 0 && deltaFijo / d > 0 ? deltaFijo / d : NaN;
  return {
    ...actual,
    mejor: Math.abs(actual.diferencia) < 1e-9 ? 'igual' : actual.diferencia > 0 ? 'interno' : 'externo',
    ahorroMes: Math.abs(actual.diferencia),
    equilibrio,
    sentido: Number.isNaN(equilibrio) ? null : d > 0 ? 'sobre' : 'bajo',
    escenarios: [0.5, 1, 1.5, 2].map((k) => costos(volumen * k)),
  };
}

/**
 * Comparador de ofertas de proveedores para una misma producción: costo por resultado reportable de cada oferta
 * (reactivo, control, calibrador, insumos y costo fijo/arriendo del equipo, con las mismas reglas que
 * `costoDeterminacion`). `produccion`: muestras, repeticionPct, corridasControl, nivelesControl, calibraciones,
 * replicadosCalib, minutosPorMuestra y costoHora (comunes a todas). `ofertas`: lista con `nombre`, `precioKit`,
 * `deterKit` y, opcionales, perdidaKit, costoControlMes, costoCalibradorMes, insumoPorDeterminacion, costoFijoMes,
 * cobro, precioTest y equipoEnPrecioPct (ver `costoDeterminacion`).
 * Con `sinEquipo` se compara el costo sin el analizador (comodato incluido en el precio y costo fijo); si no, el
 * costo total. `metrica` es el valor comparado y las diferencias se miden contra la más barata en esa métrica.
 * Devuelve cada oferta con su costo y su diferencia contra la más barata, e `indiceMejor` (-1 si ninguna es válida).
 */
export function compararOfertas(produccion, ofertas, { sinEquipo = false } = {}) {
  const filas = ofertas.map((o) => {
    const { nombre, ...datos } = o;
    const r = costoDeterminacion({ ...produccion, ...datos });
    const costo = r ? r.costo : NaN;
    return {
      nombre,
      resultado: r,
      costo,
      metrica: r ? (sinEquipo ? r.sinEquipo : costo) : NaN,
      totalMes: r ? r.total : NaN,
      totalAnio: r ? r.total * 12 : NaN,
    };
  });
  const validos = filas.filter((f) => f.resultado);
  const mejor = validos.length ? validos.reduce((a, b) => (b.metrica < a.metrica ? b : a)) : null;
  const { muestras } = produccion;
  return {
    filas: filas.map((f) => ({
      ...f,
      difUnitaria: mejor && f.resultado ? f.metrica - mejor.metrica : NaN,
      difPct: mejor && f.resultado ? ((f.metrica - mejor.metrica) / mejor.metrica) * 100 : NaN,
      difAnio: mejor && f.resultado ? (f.metrica - mejor.metrica) * muestras * 12 : NaN,
    })),
    indiceMejor: mejor ? filas.indexOf(mejor) : -1,
  };
}
