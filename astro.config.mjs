// Configuración de Astro para ConsensusLab.
// El sitio se publica en GitHub Pages con el dominio propio consensuslab.cl (DNS en Cloudflare, sin proxy).
// Las direcciones antiguas xergio1625.github.io/consensuslab/… las redirige GitHub a este dominio.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://consensuslab.cl',
  base: '/',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
