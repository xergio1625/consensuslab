// Puente de cada calculadora a la app: qué hace la app con ese mismo cálculo. Se muestra bajo el resultado,
// no en el lateral, porque es donde la persona termina de usarla. Solo se promete lo que la app ya hace.
// `enlace`: ruta del sitio (con barra final). Sin puente, la calculadora conserva solo el lateral de su familia.
import type { IdCalculadora } from './calculadoras';

export interface Puente {
  titulo: string;
  texto: string;
  boton: string;
  enlace: string;
}

export const PUENTES: Partial<Record<IdCalculadora, Puente>> = {
  'sesgo-y-sdi': {
    titulo: 'Esto lo haces una vez por informe',
    texto:
      'En Consensus QC cargas el resultado de tu control externo y el sesgo de cada analizador se calcula y se compara con tu error total permitido, junto con el de tus controles internos. Sin copiar cifras a una planilla.',
    boton: 'Ver cómo funciona',
    enlace: 'consensus-qc/',
  },
  'error-total-y-sigma': {
    titulo: 'Aquí calculas un analito; la app los calcula todos',
    texto:
      'Consensus QC calcula cada mes el CV, el sesgo, el error total y la sigma de cada analizador con tus controles reales, y los compara con tu plan de calidad. Así ves qué métodos están débiles sin armar la cuenta uno por uno.',
    boton: 'Ver cómo funciona',
    enlace: 'consensus-qc/',
  },
  'homogeneidad-entre-mitades': {
    titulo: 'Tus 20 datos ya deberían estar registrados',
    texto:
      'Si llevas los controles en Consensus QC, la serie de cada analizador y cada nivel ya está guardada, con su media, su DE y su gráfico de Levey-Jennings. No hay que volver a pegarla cada vez que quieres probar una hipótesis.',
    boton: 'Ver cómo funciona',
    enlace: 'consensus-qc/',
  },
  'amef-npr': {
    titulo: 'El NPR ordena; falta lo que se hace después',
    texto:
      'Una vez que sabes qué falla atender primero, hay que dejar registrado quién, cuándo y qué se hizo. Consensus QC registra los desvíos del control como no conformidades con su alcance y su acción correctiva, y quedan para la auditoría.',
    boton: 'Ver cómo funciona',
    enlace: 'consensus-qc/',
  },
  'tiempos-de-respuesta-tat': {
    titulo: 'Esta calculadora mide un lote que pegas',
    texto:
      'La herramienta de TAT lee la exportación del LIS, separa urgencias de rutina, marca por examen y por área el porcentaje dentro de la meta con semáforo, y lo lleva al informe mensual. Tus datos de pacientes no salen del computador.',
    boton: 'Ver la herramienta de TAT',
    enlace: 'herramientas/tiempos-de-respuesta-tat/',
  },
  'temperatura-cinetica-media': {
    titulo: 'Para calcular la MKT, primero hay que registrar',
    texto:
      'El registro de temperaturas guarda cada medición con quién y cuándo, no deja guardar una lectura fuera de rango sin su acción correctiva, avisa por correo y arma la planilla mensual con mínima, máxima y días sin registro, lista para firmar.',
    boton: 'Ver el registro de temperaturas',
    enlace: 'herramientas/registro-de-temperaturas/',
  },
  'centrifuga-g-rpm': {
    titulo: 'La centrífuga también tiene rutina',
    texto:
      'El Plan de mantención lleva las rutinas diarias, semanales y mensuales de cada equipo con su lista de verificación, quién las hizo y el cumplimiento por área, y programa las mantenciones y calibraciones del servicio técnico.',
    boton: 'Ver el plan de mantención',
    enlace: 'herramientas/mantencion-preventiva-y-calibraciones/',
  },
  'levey-jennings': {
    titulo: 'Dibujarlo a mano es el trabajo que sobra',
    texto:
      'Consensus QC arma el gráfico de Levey-Jennings de cada analito y nivel con tus controles reales, aplica las reglas de Westgard y deja registrado qué se hizo cuando una regla se rompe.',
    boton: 'Ver cómo funciona',
    enlace: 'consensus-qc/',
  },
  'estadistica-del-control': {
    titulo: 'La media y la DE no se calculan una vez',
    texto:
      'Cada mes cambian con los controles nuevos. Consensus QC lleva la media, la DE y el CV de cada analizador y nivel actualizados, sin volver a pegar la serie.',
    boton: 'Ver cómo funciona',
    enlace: 'consensus-qc/',
  },
  'valores-atipicos': {
    titulo: 'Antes de excluir un dato, mira toda la serie',
    texto:
      'Con tus controles ya registrados en Consensus QC ves cada punto en su gráfico, junto a las reglas de Westgard, y decides con la serie completa a la vista.',
    boton: 'Ver cómo funciona',
    enlace: 'consensus-qc/',
  },
  'comparacion-de-lotes': {
    titulo: 'El lote nuevo se compara con lo que ya tienes',
    texto:
      'Si llevas los controles en Consensus QC, las series de cada analizador y nivel ya están guardadas. No hay que reunirlas a mano cada vez que cambia el lote.',
    boton: 'Ver cómo funciona',
    enlace: 'consensus-qc/',
  },
  'tendencia-y-aleatoriedad': {
    titulo: 'Una tendencia se ve mejor en el gráfico',
    texto:
      'Consensus QC marca sobre el gráfico de Levey-Jennings las corridas de puntos hacia un mismo lado con las reglas de Westgard, antes de que el control salga de límites.',
    boton: 'Ver cómo funciona',
    enlace: 'consensus-qc/',
  },
  'tea-variabilidad-biologica': {
    titulo: 'El TEa es el punto de partida del plan',
    texto:
      'Consensus QC define el plan de calidad por analito: con tu error total permitido compara cada mes el error total y la sigma de cada analizador.',
    boton: 'Ver cómo funciona',
    enlace: 'consensus-qc/',
  },
  'cambio-critico-rcv': {
    titulo: 'El cambio crítico de cada analizador, en un solo lugar',
    texto:
      'Consensus QC lleva el control de calidad y el cambio crítico de cada analizador, para que lo que defines aquí quede asociado a tus controles reales.',
    boton: 'Ver cómo funciona',
    enlace: 'consensus-qc/',
  },
  'disponibilidad-y-oee-de-equipos': {
    titulo: 'La disponibilidad sale de lo que registras',
    texto:
      'Estado y bitácora de equipos guarda cada falla, el tiempo detenido, las visitas técnicas y los tickets al proveedor: los datos que necesitas para esta cuenta, sin reconstruirlos al final del mes.',
    boton: 'Ver la bitácora de equipos',
    enlace: 'herramientas/estado-y-bitacora-de-equipos/',
  },
  'stock-y-punto-de-pedido': {
    titulo: 'El mínimo solo sirve si el stock está al día',
    texto:
      'Inventario y lotes de reactivos lleva el stock por lote con su mínimo, avisa los vencimientos y las alertas de quiebre.',
    boton: 'Ver el inventario de reactivos',
    enlace: 'herramientas/inventario-y-lotes-de-reactivos/',
  },
  'rendimiento-de-reactivos': {
    titulo: 'El rendimiento de un kit exige saber cuándo se abrió',
    texto:
      'Inventario y lotes de reactivos registra los reactivos en uso con su estabilidad y el lote usado cada día, que es el dato que falta para medir el rendimiento real.',
    boton: 'Ver el inventario de reactivos',
    enlace: 'herramientas/inventario-y-lotes-de-reactivos/',
  },
};
