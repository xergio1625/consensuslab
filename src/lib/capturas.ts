// Capturas de la plataforma para el carrusel (componente Capturas). Las imágenes van en public/capturas/.
// Solo con datos de prueba: nunca nombres de personas, RUT ni datos de pacientes.
// Con la lista vacía el carrusel no se muestra.

export interface Captura {
  archivo: string; // ruta dentro de public/, p. ej. 'capturas/panel-del-dia.webp'
  titulo: string;
  texto: string;
  alt: string;
  ancho: number;
  alto: number;
}

export const CAPTURAS: Captura[] = [
  {
    archivo: 'capturas/levey-jennings.webp',
    titulo: 'Gráfico de Levey-Jennings.',
    texto: 'Cada punto con sus reglas de Westgard; un control rechazado abre una no conformidad desde el mismo gráfico.',
    alt: 'Gráfico de Levey-Jennings de la glucosa con dos niveles de control, un punto rechazado marcado con una cruz y una no conformidad cerrada.',
    ancho: 800,
    alto: 600,
  },
  {
    archivo: 'capturas/panel-analizador.webp',
    titulo: 'Panel del analizador.',
    texto: 'Todos los analitos y niveles de un equipo juntos, con los que tienen rechazos o advertencias primero.',
    alt: 'Panel del analizador con el resumen de analitos, controles rechazados y advertencias, y el gráfico de ALT con dos niveles.',
    ancho: 800,
    alto: 600,
  },
  {
    archivo: 'capturas/no-conformidades.webp',
    titulo: 'No conformidades.',
    texto: 'El caso con su control de origen, su alcance, el responsable y el plazo, para dar seguimiento hasta cerrarlo.',
    alt: 'Bandeja de no conformidades con el detalle de un caso de colesterol total: valor, regla de Westgard rechazada, analizador, lote y alcance.',
    ancho: 800,
    alto: 600,
  },
];
