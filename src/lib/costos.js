// Fórmulas de las calculadoras de costos y rendimiento. Funciones puras (se prueban con `npm test`).
// Los montos van en la moneda que use la persona (no se asume una); los porcentajes, en % (5 = 5 %).

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
  const repeticiones = (muestras * repeticionPct) / 100;
  const controles = corridasControl * nivelesControl;
  const calib = calibraciones * replicadosCalib;
  const consumo = muestras + repeticiones + controles + calib;
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
 * Costo por determinación reportable. Suma, por mes: reactivo (kits usados × precio), material de control,
 * calibrador, insumos por determinación procesada, personal (minutos por muestra × costo por hora) y costo
 * fijo (comodato, mantención, arriendo del equipo). Con `arancel` calcula el margen y el punto de equilibrio.
 */
export function costoDeterminacion({
  precioKit,
  costoControlMes = 0,
  costoCalibradorMes = 0,
  insumoPorDeterminacion = 0,
  minutosPorMuestra = 0,
  costoHora = 0,
  costoFijoMes = 0,
  arancel = NaN,
  ...rendimiento
}) {
  const r = rendimientoReactivo(rendimiento);
  if (!r) return null;
  const { muestras } = rendimiento;
  const mensual = {
    reactivo: r.kitsMes * precioKit,
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
  const conArancel = Number.isFinite(arancel) && arancel > 0;
  const margen = conArancel ? arancel - costo : NaN;
  return {
    rendimiento: r,
    mensual,
    porDeterminacion,
    total,
    costo,
    variable,
    arancel: conArancel ? arancel : NaN,
    margen,
    margenPct: conArancel ? (margen / arancel) * 100 : NaN,
    resultadoMes: conArancel ? margen * muestras : NaN,
    // Determinaciones al mes que cubren el costo fijo con el margen sobre el costo variable.
    equilibrio: conArancel && arancel > variable ? mensual.fijo / (arancel - variable) : NaN,
  };
}
