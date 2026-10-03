// Catálogo de calculadoras de calidad. Cada una tiene su página en src/pages/calculadoras/<id>.astro
// y sus fórmulas en src/lib/calidad.js. `herramientas`: fichas del catálogo donde se recomienda.

export const CALCULADORAS = [
  {
    id: 'estadistica-del-control',
    titulo: 'Estadística del control',
    resumen: 'Pega los resultados de un material de control y obtén la media, la DE, el CV y los límites de ±1, 2 y 3 DE.',
    herramientas: ['control-de-calidad-interno-y-externo'],
  },
  {
    id: 'error-total-y-sigma',
    titulo: 'Error total y sigma',
    resumen: 'Con el error total permitido, el sesgo y el CV: error total, métrica sigma y las reglas de Westgard sugeridas.',
    herramientas: ['control-de-calidad-interno-y-externo', 'indicadores-de-calidad'],
  },
  {
    id: 'sesgo-y-sdi',
    titulo: 'Sesgo y SDI del control externo',
    resumen: 'Compara tu resultado con el valor asignado del programa: sesgo porcentual e índice de desviación estándar (SDI).',
    herramientas: ['control-de-calidad-interno-y-externo'],
  },
  {
    id: 'tea-variabilidad-biologica',
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
