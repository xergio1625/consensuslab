// Importa los artículos nuevos de Medium a contenido/opinion/ (uno por archivo).
//
//   npm run medium                      lee el feed del perfil MEDIUM_PERFIL (src/lib/sitio.ts)
//   npm run medium -- --archivo feed.xml  lee un feed guardado (para probar sin conexión)
//
// Medium entrega en su feed solo los 10 artículos más recientes. Los artículos que ya tienen
// archivo (mismo enlace) no se tocan, así que puedes editar el resumen o los temas a mano.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CARPETA = join(process.cwd(), 'contenido', 'opinion');
const LARGO_RESUMEN = 280;

function perfilConfigurado() {
  const sitio = readFileSync(join(process.cwd(), 'src', 'lib', 'sitio.ts'), 'utf8');
  const m = sitio.match(/MEDIUM_PERFIL\s*=\s*'([^']*)'/);
  return m ? m[1].trim() : '';
}

/** 'https://medium.com/@usuario' → 'https://medium.com/feed/@usuario'; 'https://x.medium.com' → '…/feed'. */
function urlFeed(perfil) {
  const u = new URL(perfil);
  const usuario = u.pathname.match(/^\/(@[^/]+)/);
  if (u.hostname === 'medium.com' && usuario) return `https://medium.com/feed/${usuario[1]}`;
  return `${u.origin}/feed`;
}

const sinCdata = (t) => t.replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, '$1').trim();
const decodificar = (t) =>
  t
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
const texto = (html) => decodificar(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const etiqueta = (xml, nombre) => {
  const m = xml.match(new RegExp(`<${nombre}(?:\\s[^>]*)?>([\\s\\S]*?)</${nombre}>`));
  return m ? sinCdata(m[1]) : '';
};
/** Enlace sin los parámetros de seguimiento (?source=rss…). */
const enlaceLimpio = (u) => u.split('?')[0].replace(/\/$/, '');

function resumen(html) {
  const parrafos = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => texto(m[1])).filter((p) => p.length > 40);
  const base = parrafos[0] ?? texto(html);
  if (base.length <= LARGO_RESUMEN) return base;
  return base.slice(0, LARGO_RESUMEN).replace(/\s+\S*$/, '') + '…';
}

function slug(titulo) {
  return (
    titulo
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 70)
      .replace(/-$/, '') || 'articulo'
  );
}

function leerFeed(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const contenido = etiqueta(item, 'content:encoded') || etiqueta(item, 'description');
    return {
      titulo: texto(etiqueta(item, 'title')),
      enlace: enlaceLimpio(etiqueta(item, 'link')),
      fecha: new Date(etiqueta(item, 'pubDate')).toISOString().slice(0, 10),
      resumen: resumen(contenido),
      temas: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map((m) => texto(sinCdata(m[1])).replace(/-/g, ' ')),
    };
  });
}

/** Enlaces que no se importan: los que ya tienen archivo y los de contenido/opinion/_excluidos.txt. */
function enlacesExistentes() {
  if (!existsSync(CARPETA)) return new Set();
  const conArchivo = readdirSync(CARPETA)
    .filter((f) => f.endsWith('.md'))
    .map((f) => readFileSync(join(CARPETA, f), 'utf8').match(/^enlace:\s*"?([^"\n]+)"?/m)?.[1]);
  const archivoExcluidos = join(CARPETA, '_excluidos.txt');
  const excluidos = existsSync(archivoExcluidos)
    ? readFileSync(archivoExcluidos, 'utf8').split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))
    : [];
  return new Set(conArchivo.concat(excluidos).filter(Boolean).map(enlaceLimpio));
}

function ficha(a) {
  const q = (t) => JSON.stringify(t);
  return [
    '---',
    `titulo: ${q(a.titulo)}`,
    `enlace: ${q(a.enlace)}`,
    `fecha: ${a.fecha}`,
    `resumen: ${q(a.resumen)}`,
    `temas: [${a.temas.map(q).join(', ')}]`,
    '---',
    '',
  ].join('\n');
}

async function principal() {
  const i = process.argv.indexOf('--archivo');
  let xml;
  if (i > 0) {
    xml = readFileSync(process.argv[i + 1], 'utf8');
  } else {
    const perfil = perfilConfigurado();
    if (!perfil) {
      console.error('Falta el perfil: completa MEDIUM_PERFIL en src/lib/sitio.ts (por ejemplo https://medium.com/@usuario).');
      process.exit(1);
    }
    const r = await fetch(urlFeed(perfil));
    if (!r.ok) {
      console.error(`Medium respondió ${r.status} al pedir ${urlFeed(perfil)}. Revisa MEDIUM_PERFIL.`);
      process.exit(1);
    }
    xml = await r.text();
  }

  const articulos = leerFeed(xml);
  const existentes = enlacesExistentes();
  let nuevos = 0;
  for (const a of articulos) {
    if (!a.titulo || !a.enlace || existentes.has(a.enlace)) continue;
    let nombre = slug(a.titulo);
    for (let n = 2; existsSync(join(CARPETA, `${nombre}.md`)); n++) nombre = `${slug(a.titulo)}-${n}`;
    writeFileSync(join(CARPETA, `${nombre}.md`), ficha(a), 'utf8');
    console.log(`+ contenido/opinion/${nombre}.md  ${a.titulo}`);
    nuevos++;
  }
  console.log(
    nuevos
      ? `${nuevos} artículo(s) nuevo(s). Revisa el resumen y los temas, y luego publica con git.`
      : `Sin artículos nuevos (${articulos.length} en el feed).`,
  );
}

await principal();
