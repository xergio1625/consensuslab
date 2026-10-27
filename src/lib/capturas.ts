// Capturas de la plataforma para el carrusel (componente Capturas). Las imágenes van en public/capturas/.
// Solo con datos de prueba: nunca nombres de personas, RUT ni datos de pacientes.
// Con la lista vacía el carrusel no se muestra.

export interface Captura {
  grupo: 'gestion' | 'qc'; // la página de Consensus QC muestra solo las de «qc»; Planes muestra todas
  archivo: string; // ruta dentro de public/, p. ej. 'capturas/panel-del-dia.webp'
  titulo: string;
  texto: string;
  alt: string;
  ancho: number;
  alto: number;
}

export const CAPTURAS: Captura[] = [
  {
    grupo: 'gestion',
    archivo: 'capturas/panel-del-dia.webp',
    titulo: 'Panel del día.',
    texto: 'Lo que toca hoy en cada área: temperaturas por registrar, equipos con falla y vencimientos.',
    alt: 'Panel del día del laboratorio con el estado general en atención y la lista de lo que toca hoy por área: bodega, hematología y química clínica.',
    ancho: 799,
    alto: 609,
  },
  {
    grupo: 'gestion',
    archivo: 'capturas/temperaturas.webp',
    titulo: 'Registro de temperaturas.',
    texto: 'Planilla mensual con el rango aceptable, las mediciones fuera de rango en rojo y los días sin registro.',
    alt: 'Planilla mensual de temperaturas de un refrigerador con 13 mediciones, una fuera de rango marcada en rojo y el gráfico dentro de la banda aceptable.',
    ancho: 799,
    alto: 609,
  },
  {
    grupo: 'gestion',
    archivo: 'capturas/equipos.webp',
    titulo: 'Estado y bitácora de equipos.',
    texto: 'Cada equipo con su disponibilidad, el tiempo detenido y las fallas abiertas con su seguimiento.',
    alt: 'Tarjetas de equipos con su estado: un contador hematológico con falla abierta y un analizador de química, una centrífuga y un congelador operativos.',
    ancho: 799,
    alto: 609,
  },
  {
    grupo: 'qc',
    archivo: 'capturas/levey-jennings.webp',
    titulo: 'Gráfico de Levey-Jennings.',
    texto: 'Cada punto con sus reglas de Westgard; un control rechazado abre una no conformidad desde el mismo gráfico.',
    alt: 'Gráfico de Levey-Jennings de la glucosa con dos niveles de control, un punto rechazado marcado con una cruz y una no conformidad cerrada.',
    ancho: 800,
    alto: 600,
  },
  {
    grupo: 'qc',
    archivo: 'capturas/panel-analizador.webp',
    titulo: 'Panel del analizador.',
    texto: 'Todos los analitos y niveles de un equipo juntos, con los que tienen rechazos o advertencias primero.',
    alt: 'Panel del analizador con el resumen de analitos, controles rechazados y advertencias, y el gráfico de ALT con dos niveles.',
    ancho: 800,
    alto: 600,
  },
  {
    grupo: 'qc',
    archivo: 'capturas/no-conformidades.webp',
    titulo: 'No conformidades.',
    texto: 'El caso con su control de origen, su alcance, el responsable y el plazo, para dar seguimiento hasta cerrarlo.',
    alt: 'Bandeja de no conformidades con el detalle de un caso de colesterol total: valor, regla de Westgard rechazada, analizador, lote y alcance.',
    ancho: 800,
    alto: 600,
  },
];
