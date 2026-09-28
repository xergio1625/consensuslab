// Utilidades para construir enlaces internos y textos comunes.
// Todas las rutas pasan por `url()` para respetar la base del sitio
// (/consensuslab/ en GitHub Pages, / cuando haya dominio propio).

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');

/** Construye una ruta interna: url('herramientas/') → /consensuslab/herramientas/ */
export function url(ruta = ''): string {
  return BASE + ruta.replace(/^\//, '');
}

/** Ruta pública de un archivo dentro de public/recursos/ */
export function urlRecurso(archivo: string): string {
  return url('recursos/' + archivo.split('/').map(encodeURIComponent).join('/'));
}

export const ESTADOS = {
  disponible: 'Disponible',
  'en-preparacion': 'En preparación',
} as const;

export const TIPOS_RECURSO = {
  excel: 'Planilla Excel',
  sheets: 'Google Sheets',
  word: 'Plantilla Word',
  pdf: 'Documento PDF',
  formulario: 'Formulario',
  otro: 'Recurso',
} as const;

export const RELACION_CONSENSUS_QC = {
  existente: 'Ya incluida en Consensus QC',
  parcial: 'Consensus QC cubre una parte',
  previsto: 'Prevista en Consensus QC',
  no: 'No depende de Consensus QC',
} as const;

/** Nombre legible de una etiqueta: «prioridad-coordinador» → «Prioridad coordinador» */
export function nombreEtiqueta(etiqueta: string): string {
  const texto = etiqueta.replace(/-/g, ' ');
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/** Fecha en formato chileno: 28-09-2026 */
export function formatoFecha(fecha: Date): string {
  return fecha.toLocaleDateString('es-CL', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: 'numeric' });
}

/** Texto sin tildes y en minúsculas, para buscar sin importar acentos */
export function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}
