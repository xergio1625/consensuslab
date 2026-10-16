// Revisa el sitio compilado (dist/): enlaces internos rotos, imágenes sin alt y páginas sin título, descripción o h1.
// Se ejecuta en la publicación (después de `npm run build`); si encuentra un problema, termina con error.
// Las páginas de redirección y las 404 se omiten.
import fs from 'node:fs';
import path from 'node:path';

const raiz = process.argv[2] ?? 'dist';
const recorrer = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? recorrer(path.join(d, e.name)) : [path.join(d, e.name)]));
const url = (f) => path.relative(raiz, f).split(path.sep).join('/');
const archivos = recorrer(raiz);
const existentes = new Set(archivos.map((f) => '/' + url(f)));
const problemas = [];

for (const f of archivos.filter((x) => x.endsWith('.html'))) {
  const html = fs.readFileSync(f, 'utf8');
  const pagina = '/' + url(f);
  if (/http-equiv="refresh"/.test(html) || pagina === '/404.html') continue;
  if (!/<meta name="description" content="[^"]+"/.test(html)) problemas.push(`${pagina}: sin meta description`);
  if (!/<h1[ >]/.test(html)) problemas.push(`${pagina}: sin h1`);
  if (/<img(?![^>]*\balt=)[^>]*>/.test(html)) problemas.push(`${pagina}: imagen sin alt`);
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const destino = m[1];
    if (destino.startsWith('//')) continue;
    if (!existentes.has(destino.endsWith('/') ? destino + 'index.html' : destino)) problemas.push(`${pagina}: enlace roto → ${destino}`);
  }
}

if (problemas.length) {
  console.error(`Se encontraron ${problemas.length} problemas en ${raiz}/:\n` + [...new Set(problemas)].join('\n'));
  process.exit(1);
}
console.log(`Revisión de enlaces y metadatos: sin problemas (${archivos.filter((x) => x.endsWith('.html')).length} páginas).`);
