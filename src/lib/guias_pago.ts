// Guías de pago (todos los derechos reservados). El texto de las guías vive FUERA del repositorio público, en
// privado/guias-de-pago/: aquí solo van las fichas de venta. Venta manual por transferencia (ver GUIAS_A_LA_VENTA en sitio.ts).

export interface GuiaPago {
  id: string;
  titulo: string;
  subtitulo: string;
  paraQuien: string;
  incluye: string[];
  formato: string;
  /** Precio en pesos con IVA incluido. Sin definir = «Valor y datos de transferencia: te los enviamos por correo». */
  precio?: number;
  /** false = en preparación: no se puede pedir todavía, solo avisar. */
  lista: boolean;
}

export const GUIAS_PAGO: GuiaPago[] = [
  {
    id: 'verificar-un-metodo',
    titulo: 'Verifica un método cuantitativo sin perder una semana',
    subtitulo: 'Verificación de precisión y veracidad con diseño 5 × 5, tipo CLSI EP15',
    paraQuien: 'Para quien debe verificar un método o un analizador nuevo y quiere llegar al informe sin improvisar, con una planilla que registra y calcula por ti.',
    incluye: [
      'Cuándo hay que verificar, qué preparar antes y un calendario de los cinco días',
      'El diseño 5 × 5 y una hoja de registro para llenar a mano, lista para imprimir',
      'Una planilla de Excel que calcula la precisión y el sesgo, compara con el fabricante y arma el informe para firmar (macros opcionales)',
      'Dos ejemplos resueltos: uno que cumple y uno donde falla la precisión entre días',
      'Qué hacer si no cumple, cómo documentarlo para una auditoría y preguntas frecuentes',
    ],
    formato: 'PDF de 11 páginas + planilla de Excel',
    precio: 2900,
    lista: true,
  },
  {
    id: 'el-control-se-salio',
    titulo: 'El control se salió: qué hago en los próximos cinco minutos',
    subtitulo: 'Decisión ante un control interno fuera de rango: reglas de Westgard, causas, resultados ya informados y registro',
    paraQuien: 'Para quien está de turno cuando un control falla y necesita decidir rápido, igual que lo decidiría otra persona.',
    incluye: [
      'Cuatro preguntas para los primeros cinco minutos y qué significa cada regla de Westgard',
      'Un árbol de decisión y una lista de causas, de la más barata a la más cara',
      'Lo que no hay que hacer (como repetir hasta que «pase») y cómo revisar los resultados ya informados',
      'El registro de la acción correctiva y una lista de verificación del turno',
      'Tres casos tipo y cómo ajustar las reglas al desempeño de cada examen',
    ],
    formato: 'PDF de 10 páginas + planilla de Excel',
    precio: 2900,
    lista: true,
  },
  {
    id: 'control-cualitativo',
    titulo: 'Control de calidad cualitativo, más allá de «positivo y negativo»',
    subtitulo: 'Cómo analizar los controles de tiras de orina, bacteriología, citología y pruebas rápidas',
    paraQuien: 'Para quien hace controles cualitativos como un registro y quiere analizarlos de verdad.',
    incluye: ['Qué registrar además de «positivo/negativo» y cómo mirar tendencias', 'El orden de procesamiento para detectar arrastre', 'Reglas de decisión y formularios de registro'],
    formato: 'En preparación',
    lista: false,
  },
];
