// Conversión de unidades de laboratorio clínico (convencionales ↔ SI). Funciones puras (se prueban con `npm test`).
// Cada analito tiene una unidad base y, por cada otra unidad, el factor por el que se multiplica la base.

export const ANALITOS = [
  { id: 'glucosa', nombre: 'Glucosa', unidades: { 'mg/dL': 1, 'mmol/L': 1 / 18.016 } },
  { id: 'colesterol', nombre: 'Colesterol (total, HDL, LDL)', unidades: { 'mg/dL': 1, 'mmol/L': 1 / 38.67 } },
  { id: 'trigliceridos', nombre: 'Triglicéridos', unidades: { 'mg/dL': 1, 'mmol/L': 1 / 88.57 } },
  { id: 'creatinina', nombre: 'Creatinina', unidades: { 'mg/dL': 1, 'µmol/L': 88.4 } },
  { id: 'urea', nombre: 'Urea', unidades: { 'mg/dL': 1, 'mmol/L': 1 / 6.006, 'BUN mg/dL': 28.014 / 60.06 } },
  { id: 'acido-urico', nombre: 'Ácido úrico', unidades: { 'mg/dL': 1, 'µmol/L': 59.48 } },
  { id: 'calcio', nombre: 'Calcio', unidades: { 'mg/dL': 1, 'mmol/L': 1 / 4.008 } },
  { id: 'magnesio', nombre: 'Magnesio', unidades: { 'mg/dL': 1, 'mmol/L': 1 / 2.431 } },
  { id: 'fosforo', nombre: 'Fósforo (fosfato inorgánico)', unidades: { 'mg/dL': 1, 'mmol/L': 1 / 3.097 } },
  { id: 'bilirrubina', nombre: 'Bilirrubina', unidades: { 'mg/dL': 1, 'µmol/L': 17.104 } },
  { id: 'albumina', nombre: 'Albúmina y proteínas totales', unidades: { 'g/dL': 1, 'g/L': 10 } },
  { id: 'hemoglobina', nombre: 'Hemoglobina', unidades: { 'g/dL': 1, 'g/L': 10, 'mmol/L': 0.6206 } },
  { id: 'hierro', nombre: 'Hierro', unidades: { 'µg/dL': 1, 'µmol/L': 0.1791 } },
];

/** Convierte un valor de un analito entre dos de sus unidades. NaN si la unidad no existe. */
export function convertir(analitoId, valor, desde, hacia) {
  const a = ANALITOS.find((x) => x.id === analitoId);
  if (!a || !(desde in a.unidades) || !(hacia in a.unidades)) return NaN;
  return (valor / a.unidades[desde]) * a.unidades[hacia];
}

/** HbA1c: % (NGSP/DCCT) a mmol/mol (IFCC): (NGSP − 2,15) × 10,929. */
export const hba1cAIfcc = (pct) => (pct - 2.15) * 10.929;

/** HbA1c: mmol/mol (IFCC) a % (NGSP/DCCT). */
export const hba1cANgsp = (mmolMol) => mmolMol / 10.929 + 2.15;

/** Glucosa promedio estimada (mg/dL) desde HbA1c en %: 28,7 × HbA1c − 46,7 (estudio ADAG). */
export const glucosaPromedioEstimada = (pct) => 28.7 * pct - 46.7;
