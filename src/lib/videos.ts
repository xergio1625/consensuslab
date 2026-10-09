// Videos del sitio. Cada clave es un espacio ya reservado en una página (componente EspacioVideo).
// Para activar un video basta con llenar su entrada: no hay que tocar ninguna página.
//
//   youtube: ID del video (lo que va tras «v=» en la URL). Se carga solo al hacer clic (sin cookies hasta entonces).
//   src:     ruta de un archivo en public/ (p. ej. '/videos/portada.mp4'). Para clips cortos; los largos van en YouTube.
//   poster:  imagen de portada en public/ (WebP/JPG), recomendada siempre.
//   bucle:   true = clip corto mudo que se repite al entrar en pantalla (con botón de pausa). Solo con `src`.
//
// Con `null` el espacio se muestra como «Video próximamente» (o no se muestra, según la página).

export interface VideoSitio {
  youtube?: string;
  src?: string;
  poster?: string;
  bucle?: boolean;
}

export const VIDEOS: Record<'portada' | 'consensus-qc' | 'planes', VideoSitio | null> = {
  // Clip corto de Consensus QC (reemplaza a la maqueta ilustrada de la portada).
  portada: null,
  // Demostración larga en la página de Consensus QC.
  'consensus-qc': null,
  // Presentación o tutorial en la página de planes.
  planes: null,
};
