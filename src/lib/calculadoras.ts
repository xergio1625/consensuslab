// Catálogo de calculadoras. Cada una tiene su página en src/pages/calculadoras/<id>.astro y sus fórmulas
// en src/lib/calidad.js (calidad), src/lib/costos.js (costos) o src/lib/soluciones.js (soluciones) o src/lib/stock.js (insumos). `familia`: grupo del índice.
// `herramientas`: fichas del catálogo donde se recomienda.

export const FAMILIAS = [
  {
    id: 'costos',
    titulo: 'Costos y rendimiento',
    descripcion: 'Cuánto cuesta cada examen, cuánto rinde un reactivo y si el arancel alcanza.',
  },
  {
    id: 'insumos',
    titulo: 'Insumos y stock',
    descripcion: 'Cuándo pedir, cuánto pedir y cuánto stock de seguridad conviene tener.',
  },
  {
    id: 'soluciones',
    titulo: 'Preparación de soluciones',
    descripcion: 'Diluciones, diluciones seriadas y soluciones por masa o por concentración.',
  },
  {
    id: 'calidad',
    titulo: 'Control de calidad',
    descripcion: 'Límites del control, error total, sigma, sesgo y especificaciones de calidad.',
  },
] as const;

export type IdFamilia = (typeof FAMILIAS)[number]['id'];

export const CALCULADORAS = [
  {
    id: 'costo-por-determinacion',
    familia: 'costos',
    titulo: 'Costo por determinación',
    resumen: 'Reactivo, control, calibrador, insumos, personal y costo fijo: lo que cuesta cada resultado y cuánto margen deja el arancel.',
    herramientas: ['costeo-por-examen', 'control-de-presupuesto'],
  },
  {
    id: 'comprar-vs-derivar',
    familia: 'costos',
    titulo: 'Comprar vs. derivar',
    resumen: 'Compara hacer un examen en tu laboratorio con enviarlo a un laboratorio externo: costo mensual, ahorro y volumen de equilibrio.',
    herramientas: ['derivaciones-a-laboratorios-externos', 'costeo-por-examen'],
  },
  {
    id: 'rendimiento-de-reactivos',
    familia: 'costos',
    titulo: 'Rendimiento de reactivos',
    resumen: 'Cuántos resultados entrega de verdad un kit una vez descontados controles, calibraciones, repeticiones y pérdidas.',
    herramientas: ['costeo-por-examen', 'inventario-y-lotes-de-reactivos'],
  },
  {
    id: 'stock-y-punto-de-pedido',
    familia: 'insumos',
    titulo: 'Stock y punto de pedido',
    resumen: 'Con tu consumo y el plazo del proveedor: stock de seguridad, punto de pedido, cantidad a pedir y si te conviene pedir ya.',
    herramientas: ['inventario-y-lotes-de-reactivos', 'solicitudes-de-compra'],
  },
  {
    id: 'diluciones-y-soluciones',
    familia: 'soluciones',
    titulo: 'Diluciones y preparación de soluciones',
    resumen: 'C1·V1 = C2·V2, diluciones seriadas y cuánto pesar o medir para preparar una solución (molar, % p/v, % v/v, mg/mL).',
    herramientas: ['limpieza-y-desinfeccion-de-areas-y-equipos'],
  },
  {
    id: 'estadistica-del-control',
    familia: 'calidad',
    titulo: 'Estadística del control',
    resumen: 'Pega los resultados de un material de control y obtén la media, la DE, el CV y los límites de ±1, 2 y 3 DE.',
    herramientas: ['control-de-calidad-interno-y-externo'],
  },
  {
    id: 'error-total-y-sigma',
    familia: 'calidad',
    titulo: 'Error total y sigma',
    resumen: 'Con el error total permitido, el sesgo y el CV: error total, métrica sigma y las reglas de Westgard sugeridas.',
    herramientas: ['control-de-calidad-interno-y-externo', 'indicadores-de-calidad'],
  },
  {
    id: 'sesgo-y-sdi',
    familia: 'calidad',
    titulo: 'Sesgo y SDI del control externo',
    resumen: 'Compara tu resultado con el valor asignado del programa: sesgo porcentual e índice de desviación estándar (SDI).',
    herramientas: ['control-de-calidad-interno-y-externo'],
  },
  {
    id: 'tea-variabilidad-biologica',
    familia: 'calidad',
    titulo: 'Error total permitido por variabilidad biológica',
    resumen: 'Desde el CV intra e interindividual: especificaciones óptima, deseable y mínima de CV, sesgo y error total.',
    herramientas: ['control-de-calidad-interno-y-externo', 'indicadores-de-calidad'],
  },
] as const;

export type IdCalculadora = (typeof CALCULADORAS)[number]['id'];

export function calculadora(id: IdCalculadora) {
  return CALCULADORAS.find((c) => c.id === id)!;
}

/** Calculadoras recomendadas en la ficha de una herramienta. */
export function calculadorasDe(idHerramienta: string) {
  return CALCULADORAS.filter((c) => (c.herramientas as readonly string[]).includes(idHerramienta));
}
