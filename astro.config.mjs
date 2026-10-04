// Configuración de Astro para ConsensusLab.
// El sitio se publica en GitHub Pages con el dominio propio consensuslab.cl (DNS en Cloudflare, sin proxy).
// Las direcciones antiguas xergio1625.github.io/consensuslab/… las redirige GitHub a este dominio.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';

// Fichas en preparación: no se indexan (prop indexar de Base) y no van al sitemap.
const enPreparacion = fs.readdirSync('contenido/herramientas')
  .filter((f) => f.endsWith('.md') && /^estado:\s*en-preparacion\s*$/m.test(fs.readFileSync('contenido/herramientas/' + f, 'utf8')))
  .map((f) => '/herramientas/' + f.replace(/\.md$/, '') + '/');
const fueraDelSitemap = ['/cuenta/', '/404/'].concat(enPreparacion);

export default defineConfig({
  site: 'https://consensuslab.cl',
  base: '/',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (pagina) => !fueraDelSitemap.includes(new URL(pagina).pathname),
    }),
  ],
  build: {
    format: 'directory',
  },
});
