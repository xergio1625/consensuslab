// Planillas de Excel con manual (todos los derechos reservados). Desde el 13-11-2026 las guías son libres (contenido/guias/)
// y lo que se vende son las planillas con su manual. Los archivos viven FUERA del repositorio público, en privado/guias-de-pago/:
// aquí solo van las fichas de venta. Los ids se mantienen porque la app (guias_pago_servicio.gs) los usa en el catálogo de entrega.
// Entrega a mano por transferencia (ver GUIAS_A_LA_VENTA y PEDIDO_AUTOMATICO en sitio.ts).

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
  /** Guía o ficha libre donde está el conocimiento: la planilla solo lo hace más rápido. */
  libre?: { texto: string; ruta: string };
}

export const GUIAS_PAGO: GuiaPago[] = [
  {
    id: 'verificar-un-metodo',
    titulo: 'Planilla de verificación de un método (5 × 5)',
    subtitulo: 'Excel con manual: calcula la precisión y el sesgo de un método y arma el informe para firmar',
    paraQuien: 'Para quien debe verificar un método o un analizador nuevo y quiere llegar al informe sin improvisar, con una planilla que registra y calcula por ti.',
    incluye: [
      'Una planilla de Excel que calcula la precisión (repetibilidad e intralaboratorio) y el sesgo, compara con el fabricante y arma el informe para firmar',
      'La hoja de registro para imprimir y llenar a mano durante los cinco días',
      'Versión con macros opcional (cuatro botones: revisar, limpiar, exportar el informe a PDF y vista previa del registro)',
      'Datos de ejemplo para ver cómo funciona y un manual en PDF con el paso a paso',
    ],
    formato: 'Planilla de Excel (.xlsx y .xlsm) + manual en PDF',
    precio: 2900,
    lista: true,
    libre: { texto: 'Leer la guía libre', ruta: 'guias/verifica-un-metodo-sin-perder-una-semana/' },
  },
  {
    id: 'el-control-se-salio',
    titulo: 'Planilla de alarmas del control y revisión de resultados',
    subtitulo: 'Excel con manual: registro de alarmas, revisión de resultados informados, resumen mensual y ficha de acción correctiva',
    paraQuien: 'Para quien está de turno cuando un control falla y necesita dejar el registro completo, igual que lo dejaría otra persona.',
    incluye: [
      'Registro de alarmas del control interno (hasta 200) con su estado: abierta, falta causa, falta revisar pacientes o cerrada',
      'Revisión de resultados ya informados (hasta 500 muestras) enlazada a cada alarma',
      'Resumen mensual por regla, causa y examen, con el tiempo promedio abierto',
      'Ficha de acción correctiva lista para firmar y hoja de traspaso de turno, más un manual en PDF',
    ],
    formato: 'Planilla de Excel (.xlsx) + manual en PDF',
    precio: 2900,
    lista: true,
    libre: { texto: 'Leer la guía libre', ruta: 'guias/el-control-se-salio-que-hago/' },
  },
  {
    id: 'planilla-temperaturas',
    titulo: 'Planilla mensual de temperaturas',
    subtitulo: 'Excel con manual: registro diario, alertas, calendario del mes, MKT y hoja de cierre para firmar',
    paraQuien: 'Para quien lleva el control de refrigeradores, congeladores, estufas y salas y quiere llegar a la auditoría con el mes ordenado.',
    incluye: [
      'Inventario de hasta 20 equipos con su rango aceptable y el vencimiento del certificado del termómetro',
      'Registro diario con temperatura actual, mínima y máxima, y estado automático (conforme, cerca del límite, fuera de rango)',
      'Calendario del mes que muestra qué día falta registrar, y resumen por equipo con la temperatura cinética media (MKT)',
      'Gráfico por equipo, hoja de cierre para imprimir y firmar, y un manual en PDF',
    ],
    formato: 'Planilla de Excel (.xlsx) + manual en PDF',
    precio: 2900,
    lista: false,
    libre: { texto: 'Leer la ficha libre', ruta: 'herramientas/registro-de-temperaturas/' },
  },
];
