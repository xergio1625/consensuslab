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
    descripcion: 'Límites del control, error total, sigma, sesgo, incertidumbre, comparación de métodos y detección de desvíos.',
  },
  {
    id: 'estadistica',
    titulo: 'Pruebas estadísticas',
    descripcion:
      'Las pruebas para decidir sobre una serie de resultados (por ejemplo, 20 datos de un lote de control): atípicos, normalidad, tendencia, homogeneidad, comparación con el fabricante y precisión. Cada grupo responde una pregunta distinta.',
  },
  {
    id: 'indicadores',
    titulo: 'Indicadores y mejora',
    descripcion: 'Tasas con intervalo de confianza, tiempos de respuesta, causas principales, disponibilidad de equipos y priorización de riesgos.',
  },
  {
    id: 'resultados',
    titulo: 'Resultados y parámetros calculados',
    descripcion: 'Cambio crítico, delta check, filtrado glomerular, LDL calculado, unidades y rendimiento diagnóstico, con casos de prueba para verificar tu sistema.',
  },
  {
    id: 'banco',
    titulo: 'Trabajo en el banco',
    descripcion: 'Centrífuga, curva de calibración, actividad enzimática y temperatura de almacenamiento.',
  },
] as const;

export type IdFamilia = (typeof FAMILIAS)[number]['id'];

/** Grupos de la familia «Pruebas estadísticas»: cada uno responde una pregunta distinta sobre la serie. */
export const GRUPOS_ESTADISTICA = [
  { id: 'atipicos', titulo: 'Valores atípicos', pregunta: '¿Hay un dato que no pertenece a la serie y se puede excluir?' },
  { id: 'normalidad', titulo: 'Normalidad', pregunta: '¿Son válidas la media y la DE para describir estos datos?' },
  { id: 'tendencia', titulo: 'Tendencia y aleatoriedad', pregunta: '¿La serie se está moviendo con el tiempo?' },
  { id: 'homogeneidad', titulo: 'Homogeneidad', pregunta: '¿La media y la varianza son estables entre mitades, días o corridas?' },
  { id: 'fabricante', titulo: 'Comparación con el fabricante', pregunta: '¿Mi media y mi dispersión son compatibles con lo declarado?' },
  { id: 'precision', titulo: 'Precisión y partida del lote', pregunta: '¿Cuánta imprecisión tiene el lote y alcanza para partir?' },
  { id: 'lotes', titulo: 'Comparar con el lote anterior', pregunta: '¿El lote nuevo se comporta como el anterior?' },
] as const;

export type IdGrupoEstadistica = (typeof GRUPOS_ESTADISTICA)[number]['id'];

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
    familia: 'resultados',
    titulo: 'Cambio crítico entre resultados (RCV)',
    resumen: 'Cuánto debe cambiar un resultado seriado para que el cambio sea real y no variación analítica y biológica (valor de referencia de cambio).',
    herramientas: ['control-de-calidad-interno-y-externo'],
  },
  {
    id: 'delta-check',
    familia: 'resultados',
    titulo: 'Delta check',
    resumen: 'Compara un resultado con el anterior de la misma persona y marca si el cambio supera tu límite porcentual o absoluto.',
    herramientas: ['control-de-calidad-interno-y-externo', 'comunicacion-de-valores-criticos'],
  },
  {
    id: 'incertidumbre-de-medicion',
    familia: 'calidad',
    titulo: 'Incertidumbre de medición',
    resumen: 'Incertidumbre combinada y expandida de arriba hacia abajo, con tu CV a largo plazo, el sesgo y la incertidumbre del calibrador.',
    herramientas: ['control-de-calidad-interno-y-externo', 'acreditacion-y-autorizacion-sanitaria'],
  },
  {
    id: 'indicadores-tasa-y-sigma',
    familia: 'indicadores',
    titulo: 'Indicador de calidad: tasa, intervalo y sigma',
    resumen: 'Tasa de rechazos, hemólisis o repeticiones con su intervalo de confianza, comparada con tu meta y expresada en sigma.',
    herramientas: ['indicadores-de-calidad', 'informes-mensuales-automaticos'],
  },
  {
    id: 'tiempos-de-respuesta-tat',
    familia: 'indicadores',
    titulo: 'Tiempos de respuesta (TAT)',
    resumen: 'Pega los tiempos en minutos y obtén la mediana, el percentil 90 y el porcentaje dentro de tu meta.',
    herramientas: ['tiempos-de-respuesta-tat', 'panel-del-dia-del-laboratorio'],
  },
  {
    id: 'filtrado-glomerular-ckd-epi',
    familia: 'resultados',
    titulo: 'Filtrado glomerular CKD-EPI 2021',
    resumen: 'Ecuación de creatinina sin raza para verificar el cálculo de tu sistema, con casos de prueba y su resultado esperado.',
    herramientas: ['acreditacion-y-autorizacion-sanitaria'],
  },
  {
    id: 'ldl-calculado',
    familia: 'resultados',
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
    familia: 'estadistica',
    grupo: 'precision',
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
    familia: 'resultados',
    titulo: 'Conversor de unidades',
    resumen: 'Glucosa, colesterol, triglicéridos, creatinina, urea, calcio, bilirrubina, hemoglobina y más entre unidades convencionales y SI, y HbA1c entre % y mmol/mol.',
    herramientas: [],
  },
  {
    id: 'rendimiento-diagnostico',
    familia: 'resultados',
    titulo: 'Rendimiento diagnóstico (tabla 2 × 2)',
    resumen: 'Sensibilidad, especificidad, valores predictivos y razones de verosimilitud con intervalo de confianza, y cómo cambian con la prevalencia.',
    herramientas: [],
  },
  {
    id: 'temperatura-cinetica-media',
    familia: 'banco',
    titulo: 'Temperatura cinética media (MKT)',
    resumen: 'Con el registro de temperaturas de un refrigerador o una bodega, la temperatura única que equivale a todo el período.',
    herramientas: ['registro-de-temperaturas'],
  },
  {
    id: 'centrifuga-g-rpm',
    familia: 'banco',
    titulo: 'Centrífuga: g y rpm',
    resumen: 'Convierte la velocidad en rpm a fuerza centrífuga relativa (× g) y al revés, según el radio del rotor, con las rpm para las fuerzas más usadas.',
    herramientas: ['mantencion-preventiva-y-calibraciones'],
  },
  {
    id: 'dilucion-de-hipoclorito',
    familia: 'soluciones',
    titulo: 'Dilución de hipoclorito y desinfectantes',
    resumen: 'Del porcentaje de tu producto a la concentración de uso en ppm: cuánto producto y cuánta agua por cada volumen que quieres preparar.',
    herramientas: ['limpieza-y-desinfeccion-de-areas-y-equipos'],
  },
  {
    id: 'actividad-enzimatica',
    familia: 'banco',
    titulo: 'Actividad enzimática desde ΔA/min',
    resumen: 'Actividad en U/L y µkat/L desde la velocidad de cambio de absorbancia, el coeficiente de extinción, el paso óptico y los volúmenes.',
    herramientas: ['control-de-calidad-interno-y-externo'],
  },
  {
    id: 'curva-de-calibracion',
    familia: 'banco',
    titulo: 'Curva de calibración (lineal y 4PL)',
    resumen: 'Ajusta tus estándares con una recta o una curva logística de 4 parámetros, recupera cada estándar y calcula la concentración de tus muestras.',
    herramientas: ['control-de-calidad-interno-y-externo'],
  },
  {
    id: 'puntaje-de-licitacion',
    familia: 'costos',
    titulo: 'Puntaje de licitación',
    resumen: 'Combina precio, puntaje técnico y otros criterios con las ponderaciones de tus bases, y obtén el ranking de ofertas con un mínimo técnico opcional.',
    herramientas: ['solicitudes-de-compra', 'evaluacion-de-proveedores', 'contratos-y-comodatos'],
  },
  {
    id: 'cusum-y-ewma',
    familia: 'calidad',
    titulo: 'CUSUM y EWMA',
    resumen: 'Gráficos de control que detectan desvíos pequeños y sostenidos del control interno que las reglas de Westgard tardan en ver.',
    herramientas: ['control-de-calidad-interno-y-externo'],
  },
  {
    id: 'comparacion-de-lotes',
    familia: 'estadistica',
    grupo: 'lotes',
    titulo: 'Comparación de dos series (cambio de lote)',
    resumen: 'Prueba t de Welch y prueba F entre el lote anterior y el nuevo de un control o un reactivo: diferencia con intervalo de confianza y cambio en la dispersión.',
    herramientas: ['control-de-calidad-interno-y-externo', 'inventario-y-lotes-de-reactivos'],
  },
  {
    id: 'valores-atipicos',
    familia: 'estadistica',
    grupo: 'atipicos',
    titulo: 'Valores atípicos: Dixon, Grubbs, Tietjen-Moore, Tukey, Chauvenet y Hampel',
    resumen: 'Seis criterios sobre la misma serie para decidir si un dato se puede excluir: con rangos (Dixon), con la media y la DE (Grubbs, Chauvenet), para varios atípicos (Tietjen-Moore) y robustos (Tukey, Hampel).',
    herramientas: ['control-de-calidad-interno-y-externo'],
  },
  {
    id: 'prueba-de-normalidad',
    familia: 'estadistica',
    grupo: 'normalidad',
    titulo: 'Normalidad: Shapiro-Wilk, Anderson-Darling, D’Agostino-Pearson y Lilliefors',
    resumen: 'Cuatro pruebas de normalidad y el gráfico Q-Q para decidir si la media y la DE describen bien tus datos.',
    herramientas: ['control-de-calidad-interno-y-externo'],
  },
  {
    id: 'tendencia-y-aleatoriedad',
    familia: 'estadistica',
    grupo: 'tendencia',
    titulo: 'Tendencia y aleatoriedad: rachas, Mann-Kendall, Cox-Stuart y von Neumann',
    resumen: 'Detecta si la serie se mueve con el tiempo: rachas, Mann-Kendall, Cox-Stuart, razón de von Neumann, pendiente contra el orden y autocorrelación (Durbin-Watson).',
    herramientas: ['control-de-calidad-interno-y-externo'],
  },
  {
    id: 'homogeneidad-entre-mitades',
    familia: 'estadistica',
    grupo: 'homogeneidad',
    titulo: 'Homogeneidad entre mitades: prueba F y prueba t',
    resumen: 'Compara la primera y la segunda mitad de una serie: ¿cambiaron la dispersión (prueba F) o la media (t de Student y de Welch)?',
    herramientas: ['control-de-calidad-interno-y-externo'],
  },
  {
    id: 'homogeneidad-entre-corridas',
    familia: 'estadistica',
    grupo: 'homogeneidad',
    titulo: 'Homogeneidad entre días o corridas: ANOVA, Bartlett, Levene y Cochran',
    resumen: 'Con varias réplicas por día o corrida: ANOVA de un factor con la descomposición intraserial e interserial, y las pruebas de igualdad de varianzas de Bartlett, Levene, Brown-Forsythe y Cochran.',
    herramientas: ['control-de-calidad-interno-y-externo'],
  },
  {
    id: 'comparacion-con-el-fabricante',
    familia: 'estadistica',
    grupo: 'fabricante',
    titulo: 'Comparación con el fabricante: media, DE y sesgo',
    resumen: 'Tu media contra el valor asignado (prueba t e intervalo de verificación), tu DE o CV contra el declarado (chi cuadrado) y el sesgo respecto del valor asignado.',
    herramientas: ['control-de-calidad-interno-y-externo', 'acreditacion-y-autorizacion-sanitaria'],
  },
  {
    id: 'precision-del-lote',
    familia: 'estadistica',
    grupo: 'precision',
    titulo: 'Precisión y partida de un lote de control',
    resumen: 'CV de repetibilidad, interserial e intralaboratorio por ANOVA, comparado con el CV histórico, y la sigma de partida con el error total permitido.',
    herramientas: ['control-de-calidad-interno-y-externo', 'inventario-y-lotes-de-reactivos'],
  },
  {
    id: 'pareto-de-causas',
    familia: 'indicadores',
    titulo: 'Diagrama de Pareto',
    resumen: 'Ordena las causas de rechazo, reclamos o no conformidades por frecuencia, con el porcentaje acumulado y las pocas causas que explican el 80 %.',
    herramientas: ['no-conformidades-y-acciones-correctivas', 'reclamos-sugerencias-y-felicitaciones', 'indicadores-de-calidad'],
  },
  {
    id: 'grafico-p-de-indicadores',
    familia: 'indicadores',
    titulo: 'Gráfico p de indicadores',
    resumen: 'Límites de control para tasas mensuales con tamaños distintos (rechazos, repeticiones, reclamos): cuándo un cambio es señal y no azar.',
    herramientas: ['indicadores-de-calidad', 'informes-mensuales-automaticos'],
  },
  {
    id: 'disponibilidad-y-oee-de-equipos',
    familia: 'indicadores',
    titulo: 'Disponibilidad y OEE de equipos',
    resumen: 'Con las horas programadas, de falla y la producción de un analizador: MTBF, MTTR, disponibilidad, rendimiento, calidad y OEE.',
    herramientas: ['estado-y-bitacora-de-equipos', 'mantencion-preventiva-y-calibraciones', 'plan-de-contingencia'],
  },
  {
    id: 'amef-npr',
    familia: 'indicadores',
    titulo: 'AMEF: número de prioridad de riesgo',
    resumen: 'Califica severidad, ocurrencia y detección de cada modo de falla, calcula el NPR y ordena qué atender primero.',
    herramientas: ['gestion-de-riesgos', 'plan-de-contingencia'],
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
