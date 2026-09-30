// Ajustes generales del sitio.

/**
 * Indexación en buscadores. Mientras sea `false`, cada página lleva
 * <meta name="robots" content="noindex, nofollow"> y Google no la muestra en sus resultados.
 * Cambiar a `true` cuando el sitio esté listo para publicarse en Google.
 */
export const INDEXAR = false;

/** App ConsensusLab (Google Apps Script). Las fichas con `app_modulo` enlazan aquí. */
export const URL_APP =
  'https://script.google.com/macros/s/AKfycbwWAred69irGUQa6kaso6sMGK32cmnKMraR-MMscJ3_moX3XG3nv5RvYU_cKgU7dss5iQ/exec';

/** Enlace que abre la app directamente en un módulo (tras ingresar con el código). */
export function urlModulo(modulo: string): string {
  return `${URL_APP}?modulo=${encodeURIComponent(modulo)}`;
}

/**
 * Perfil de Medium con los artículos de opinión, por ejemplo 'https://medium.com/@usuario'.
 * Se usa en la sección Opinión y en `npm run medium` (importa los artículos nuevos).
 */
export const MEDIUM_PERFIL = '';

/** Correo de contacto para privacidad, términos y soporte (el mismo que envía los correos de la app). */
export const CORREO_CONTACTO = 'xergio.1625@gmail.com';

/** Fecha de la versión vigente de la política de privacidad y los términos de uso. */
export const VIGENCIA_LEGAL = '30 de septiembre de 2026';
