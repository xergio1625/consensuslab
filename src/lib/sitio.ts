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
export const MEDIUM_PERFIL = 'https://medium.com/@xergio.1625';

/**
 * ID de medición de Google Analytics 4 (formato 'G-XXXXXXXXXX'; es público, aparece en el código de cada página).
 * Vacío = sin analítica: no se carga nada ni se muestra el aviso de cookies.
 * Con ID: aviso de cookies y Google Analytics solo si la persona acepta (ver src/componentes/Analitica.astro).
 */
export const GA_ID = 'G-PBCF6HZRHZ';

/** Fin de la preventa fundadores (desde este día rige el precio normal). Hasta entonces se ven la franja y la imagen de preventa. */
export const FIN_PREVENTA = '2026-12-01';

/** Correo de contacto para privacidad, términos y soporte (el mismo que envía los correos de la app). */
export const CORREO_CONTACTO = 'xergio.1625@gmail.com';

/** Fecha de la versión vigente de los términos de uso. */
export const VIGENCIA_LEGAL = '2 de octubre de 2026';

/** Fecha de la versión vigente de la política de privacidad (Google Analytics con consentimiento y formulario de cotización). */
export const VIGENCIA_PRIVACIDAD = '4 de octubre de 2026';
