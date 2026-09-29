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

/** Campo a completar en un prompt: texto en mayúsculas entre corchetes, como [NOMBRE DEL EQUIPO]. */
export const CAMPO_PROMPT = /\[[^\]a-záéíóúñ\n]{3,}\]/g;

/** HTML del prompt con los campos a completar resaltados (el resto del texto va escapado). */
export function promptResaltado(texto: string): string {
  const escapar = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return escapar(texto.trimEnd()).replace(CAMPO_PROMPT, (c) => `<mark class="campo-prompt">${c}</mark>`);
}

/** Cantidad de campos a completar distintos en un prompt. */
export function camposPrompt(texto: string): number {
  return new Set(texto.match(CAMPO_PROMPT) ?? []).size;
}

/** Categorías de los prompts de IA (el orden es el de la página de prompts). */
export const CATEGORIAS_PROMPT = {
  documentos: 'Documentos y procedimientos',
  calidad: 'Calidad y mejora',
  'control-de-calidad': 'Control de calidad analítico',
  equipo: 'Equipo y capacitación',
  comunicacion: 'Comunicación',
  coordinacion: 'Coordinación y reuniones',
  planillas: 'Planillas y datos',
} as const;
