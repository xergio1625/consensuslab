// Catálogo de calculadoras. Cada una tiene su página en src/pages/calculadoras/<id>.astro y sus fórmulas
// en src/lib/calidad.js y levey.js (calidad), src/lib/costos.js (costos) o src/lib/soluciones.js (soluciones) o src/lib/stock.js (insumos). `familia`: grupo del índice.
// `destacada`: aparece en la portada.
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
  {
    id: 'formulas',
    titulo: 'Fórmulas y resultados',
    descripcion: 'Cambio crítico, delta check, incertidumbre, indicadores y parámetros calculados, con casos de prueba para verificar tu sistema.',
  },
] as const;

export type IdFamilia = (typeof FAMILIAS)[number]['id'];

export const CALCULADORAS = [
  {
    id: 'costo-por-determinacion',
    familia: 'costos',
    destacada: true,
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
    destacada: true,
    titulo: 'Rendimiento de reactivos',
    resumen: 'Cuántos resultados entrega de verdad un kit una vez descontados controles, calibraciones, repeticiones y pérdidas.',
    herramientas: ['costeo-por-examen', 'inventario-y-lotes-de-reactivos'],
  },
  {
    id: 'stock-y-punto-de-pedido',
    familia: 'insumos',
    destacada: true,
    titulo: 'Stock y punto de pedido',
    resumen: 'Con tu consumo y el plazo del proveedor: stock de seguridad, punto de pedido, cantidad a pedir y si te conviene pedir ya.',
    herramientas: ['inventario-y-lotes-de-reactivos', 'solicitudes-de-compra'],
  },
  {
    id: 'diluciones-y-soluciones',
    familia: 'soluciones',
    destacada: true,
    titulo: 'Diluciones y preparación de soluciones',
    resumen: 'C1·V1 = C2·V2, diluciones seriadas y cuánto pesar o medir para preparar una solución (molar, % p/v, % v/v, mg/mL).',
    herramientas: ['limpieza-y-desinfeccion-de-areas-y-equipos'],
  },
  {
    id: 'levey-jennings',
    familia: 'calidad',
    destacada: true,
    titulo: 'Gráfico de Levey-Jennings',
    resumen: 'Pega los resultados de tu control y obtén el gráfico con los límites de ±1, 2 y 3 DE y las violaciones de las reglas de Westgard marcadas.',
    herramientas: ['control-de-calidad-interno-y-externo'],
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
    destacada: true,
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
  {
    id: 'cambio-critico-rcv',
    familia: 'formulas',
    titulo: 'Cambio crítico entre resultados (RCV)',
    resumen: 'Cuánto debe cambiar un resultado seriado para que el cambio sea real y no variación analítica y biológica (valor de referencia de cambio).',
    herramientas: ['control-de-calidad-interno-y-externo'],
  },
  {
    id: 'delta-check',
    familia: 'formulas',
    titulo: 'Delta check',
    resumen: 'Compara un resultado con el anterior de la misma persona y marca si el cambio supera tu límite porcentual o absoluto.',
    herramientas: ['control-de-calidad-interno-y-externo', 'comunicacion-de-valores-criticos'],
  },
  {
    id: 'incertidumbre-de-medicion',
    familia: 'formulas',
    titulo: 'Incertidumbre de medición',
    resumen: 'Incertidumbre combinada y expandida de arriba hacia abajo, con tu CV a largo plazo, el sesgo y la incertidumbre del calibrador.',
    herramientas: ['control-de-calidad-interno-y-externo', 'acreditacion-y-autorizacion-sanitaria'],
  },
  {
    id: 'indicadores-tasa-y-sigma',
    familia: 'formulas',
    titulo: 'Indicador de calidad: tasa, intervalo y sigma',
    resumen: 'Tasa de rechazos, hemólisis o repeticiones con su intervalo de confianza, comparada con tu meta y expresada en sigma.',
    herramientas: ['indicadores-de-calidad', 'informes-mensuales-automaticos'],
  },
  {
    id: 'tiempos-de-respuesta-tat',
    familia: 'formulas',
    titulo: 'Tiempos de respuesta (TAT)',
    resumen: 'Pega los tiempos en minutos y obtén la mediana, el percentil 90 y el porcentaje dentro de tu meta.',
    herramientas: ['tiempos-de-respuesta-tat', 'panel-del-dia-del-laboratorio'],
  },
  {
    id: 'filtrado-glomerular-ckd-epi',
    familia: 'formulas',
    titulo: 'Filtrado glomerular CKD-EPI 2021',
    resumen: 'Ecuación de creatinina sin raza para verificar el cálculo de tu sistema, con casos de prueba y su resultado esperado.',
    herramientas: ['acreditacion-y-autorizacion-sanitaria'],
  },
  {
    id: 'ldl-calculado',
    familia: 'formulas',
    titulo: 'LDL calculado: Friedewald, Martin-Hopkins y Sampson',
    resumen: 'LDL-C desde colesterol total, HDL y triglicéridos con las tres ecuaciones, comparadas entre sí y con el LDL directo, con sus límites de uso y casos de prueba para tu sistema.',
    herramientas: ['acreditacion-y-autorizacion-sanitaria'],
  },
  {
    id: 'comparador-de-ofertas',
    familia: 'costos',
    titulo: 'Comparador de ofertas de proveedores',
    resumen: 'Hasta tres ofertas para la misma producción: costo por resultado reportable, gasto mensual y anual y cuánto ahorras con la más barata.',
    herramientas: ['costeo-por-examen', 'contratos-y-comodatos', 'solicitudes-de-compra', 'evaluacion-de-proveedores'],
  },
  {
    id: 'verificacion-de-precision',
    familia: 'calidad',
    titulo: 'Verificación de precisión (5 × 5)',
    resumen: 'Pega los resultados de 5 días con 5 réplicas: repetibilidad e intralaboratorio por ANOVA, comparados con el CV declarado por el fabricante.',
    herramientas: ['control-de-calidad-interno-y-externo', 'acreditacion-y-autorizacion-sanitaria'],
  },
  {
    id: 'comparacion-de-metodos',
    familia: 'calidad',
    titulo: 'Comparación de métodos',
    resumen: 'Pega los pares de resultados de dos métodos: Bland-Altman, regresión de Deming y de Passing-Bablok, y el sesgo en tus niveles de decisión.',
    herramientas: ['control-de-calidad-interno-y-externo', 'acreditacion-y-autorizacion-sanitaria'],
  },
  {
    id: 'conversor-de-unidades',
    familia: 'formulas',
    titulo: 'Conversor de unidades',
    resumen: 'Glucosa, colesterol, triglicéridos, creatinina, urea, calcio, bilirrubina, hemoglobina y más entre unidades convencionales y SI, y HbA1c entre % y mmol/mol.',
    herramientas: [],
  },
  {
    id: 'rendimiento-diagnostico',
    familia: 'formulas',
    titulo: 'Rendimiento diagnóstico (tabla 2 × 2)',
    resumen: 'Sensibilidad, especificidad, valores predictivos y razones de verosimilitud con intervalo de confianza, y cómo cambian con la prevalencia.',
    herramientas: [],
  },
  {
    id: 'temperatura-cinetica-media',
    familia: 'formulas',
    titulo: 'Temperatura cinética media (MKT)',
    resumen: 'Con el registro de temperaturas de un refrigerador o una bodega, la temperatura única que equivale a todo el período.',
    herramientas: ['registro-de-temperaturas'],
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
