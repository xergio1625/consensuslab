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
};
