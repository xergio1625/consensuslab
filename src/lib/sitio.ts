// Ajustes generales del sitio.

/**
 * Indexación en buscadores (activa desde el 4 de octubre de 2026). Con `false`, cada página lleva
 * <meta name="robots" content="noindex, nofollow"> y Google no la muestra en sus resultados.
 * Las páginas que no deben aparecer (p. ej. fichas en preparación) usan la prop `indexar={false}` de Base.
 */
export const INDEXAR = true;

/** App ConsensusLab (Google Cloud, Santiago; Consensus QC en /qc/). Las fichas con `app_modulo` enlazan aquí. */
export const URL_APP = 'https://app.consensuslab.cl/';
// Página de «Crear cuenta» (prueba gratuita) de la app: los botones «Probar gratis» van aquí; «Ingresar» va a URL_APP.
export const URL_REGISTRO = URL_APP + '?registro=1';

/** Enlace que abre la app directamente en un módulo (tras ingresar con el código). */
export function urlModulo(modulo: string): string {
  return `${URL_APP}?modulo=${encodeURIComponent(modulo)}`;
}

/**
 * Perfil de Medium con los artículos de opinión, por ejemplo 'https://medium.com/@usuario'.
 * Se usa en la sección Opinión y en `npm run medium` (importa los artículos nuevos).
 */
export const MEDIUM_PERFIL = 'https://medium.com/@xergio.1625';

/** Perfil de LinkedIn de la persona autora (se usa como `sameAs` en los datos estructurados). */
export const LINKEDIN_PERFIL = 'https://www.linkedin.com/in/sergio-inostroza-riffo-409964123';

/**
 * ID de medición de Google Analytics 4 (formato 'G-XXXXXXXXXX'; es público, aparece en el código de cada página).
 * Vacío = sin analítica: no se carga nada ni se muestra el aviso de cookies.
 * Con ID: aviso de cookies y Google Analytics solo si la persona acepta (ver src/componentes/Analitica.astro).
 */
export const GA_ID = 'G-PBCF6HZRHZ';

/**
 * Token de Cloudflare Web Analytics (público, aparece en el código de cada página).
 * Mide visitas sin cookies ni identificadores personales, por eso no pide consentimiento.
 * Vacío = no se carga el script. Instalación manual: el sitio va en «solo DNS», sin proxy de Cloudflare.
 */
export const CF_BEACON_TOKEN = '7e9e0f16cb3340449babcf2f2d15304f';

/** Fin de la preventa fundadores (desde este día rige el precio normal). Hasta entonces se ven la franja y la imagen de preventa. */
export const FIN_PREVENTA = '2026-12-01';

/** Correo de contacto para privacidad, términos y soporte (Cloudflare Email Routing lo reenvía a Gmail; la app envía con Brevo desde esta dirección). */
export const CORREO_CONTACTO = 'contacto@consensuslab.cl';

/** Fecha de la versión vigente de los términos de uso. */
export const VIGENCIA_LEGAL = '11 de octubre de 2026';

/** Fecha de la versión vigente de la política de privacidad (Google Analytics con consentimiento, Cloudflare Web Analytics sin cookies, formulario de cotización, suscripción a novedades y avisos por WhatsApp futuros). */
export const VIGENCIA_PRIVACIDAD = '24 de octubre de 2026';
