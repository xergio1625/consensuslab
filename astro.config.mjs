// Configuración de Astro para ConsensusLab.
// El sitio se publica en GitHub Pages bajo /consensuslab/ mientras no haya dominio propio.
// Cuando exista un dominio: cambiar `site` por el dominio y dejar `base` en '/'.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://xergio1625.github.io',
  base: '/consensuslab',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
