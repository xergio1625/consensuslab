// Tabla mensual de aprendizaje de mercado: una fila por herramienta con visita → uso → captura → pago.
// Uso:  node tools/aprendizaje-mercado.mjs [AAAA-MM] [--cloudflare]
// Lee privado/marketing/aprendizaje/datos/AAAA-MM/ (uso_herramientas_*.csv de /admin, paginas_gsc.csv de Search Console,
// visitas.json de Cloudflare) y escribe privado/marketing/aprendizaje/AAAA-MM.md y .csv. Lo que falte queda como «sin dato».
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = path.join(RAIZ, 'privado', 'marketing', 'aprendizaje');

/** Separa un CSV (delimitador , o ; según la primera línea; comillas dobles; BOM). */
export function leerCsv(texto) {
  const t = String(texto).replace(/^﻿/, '');
  const primera = t.split(/\r?\n/, 1)[0];
  const sep = (primera.match(/;/g) || []).length > (primera.match(/,/g) || []).length ? ';' : ',';
  const filas = [];
  let fila = [], celda = '', comillas = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (comillas) {
      if (c === '"' && t[i + 1] === '"') { celda += '"'; i++; } else if (c === '"') comillas = false; else celda += c;
    } else if (c === '"') comillas = true;
    else if (c === sep) { fila.push(celda); celda = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && t[i + 1] === '\n') i++;
      fila.push(celda); celda = '';
      if (fila.some((x) => x !== '')) filas.push(fila);
      fila = [];
    } else celda += c;
  }
  fila.push(celda);
  if (fila.some((x) => x !== '')) filas.push(fila);
  const [cab, ...resto] = filas;
  return (cab ? resto : []).map((f) => Object.fromEntries(cab.map((h, i) => [h.trim(), (f[i] ?? '').trim()])));
}

function frontmatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const o = {};
  if (m) for (const l of m[1].split(/\r?\n/)) { const k = l.match(/^([a-z_]+):\s*(.*)$/); if (k) o[k[1]] = k[2].replace(/^"(.*)"$/, '$1'); }
  return o;
}

/** Catálogo de herramientas del sitio: fichas, calculadoras, guías y Consensus QC, con el módulo de la app si lo tienen. */
export function catalogo(raiz = RAIZ) {
  const filas = [];
  const dirMd = (carpeta) => { const d = path.join(raiz, carpeta); return fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith('.md') && !f.startsWith('_')) : []; };
  for (const f of dirMd('contenido/herramientas')) {
    const fm = frontmatter(fs.readFileSync(path.join(raiz, 'contenido/herramientas', f), 'utf8'));
    const slug = f.replace(/\.md$/, '');
    filas.push({ tipo: 'Ficha', nombre: fm.titulo || slug, ruta: `/herramientas/${slug}/`, modulo: fm.app_modulo || '', estado: fm.estado || '' });
  }
  const calc = path.join(raiz, 'src/pages/calculadoras');
  if (fs.existsSync(calc)) {
    // Los títulos viven en src/lib/calculadoras.ts (id + titulo de cada entrada).
    const titulos = {};
    const lib = path.join(raiz, 'src/lib/calculadoras.ts');
    if (fs.existsSync(lib)) for (const m of fs.readFileSync(lib, 'utf8').matchAll(/id:\s*'([^']+)'[\s\S]*?titulo:\s*'((?:[^'\\]|\\.)*)'/g)) titulos[m[1]] = m[2].replace(/\\'/g, "'");
    for (const f of fs.readdirSync(calc).filter((x) => x.endsWith('.astro') && x !== 'index.astro' && !x.startsWith('['))) {
      const slug = f.replace(/\.astro$/, '');
      filas.push({ tipo: 'Calculadora', nombre: titulos[slug] || slug.replace(/-/g, ' '), ruta: `/calculadoras/${slug}/`, modulo: '', estado: 'disponible' });
    }
  }
  for (const f of dirMd('contenido/guias')) {
    const fm = frontmatter(fs.readFileSync(path.join(raiz, 'contenido/guias', f), 'utf8'));
    const slug = f.replace(/\.md$/, '');
    filas.push({ tipo: 'Guía', nombre: fm.titulo || slug, ruta: `/guias/${slug}/`, modulo: '', estado: 'disponible' });
  }
  filas.push({ tipo: 'Producto', nombre: 'Consensus QC', ruta: '/consensus-qc/', modulo: 'consensusqc', estado: 'disponible' });
  return filas;
}

const num = (v) => { const n = Number(String(v ?? '').replace(/[^\d.-]/g, '')); return Number.isFinite(n) ? n : 0; };
const rutaDe = (u) => { try { const p = new URL(u, 'https://consensuslab.cl').pathname; return p.endsWith('/') ? p : p + '/'; } catch { return String(u); } };

/** Lectura de la fila según las cuatro etapas. Los umbrales son de partida: ajústalos con la experiencia. */
export function lectura(f) {
  const tieneApp = !!f.modulo;
  if (f.estado === 'en-preparacion') return f.visitas > 0 ? 'En preparación pero con visitas: priorizar.' : 'En preparación, sin señal.';
  if (!tieneApp) {
    if (f.visitas >= 10) return 'Gancho de audiencia (sin medición de uso todavía).';
    return (f.google_impresiones || 0) >= 20 ? 'Aparece en Google; falta ver si la visitan.' : 'Sin señal.';
  }
  if (f.uso > 0 && f.pago > 0) return 'La usan clientes con plan: candidata a producto de pago.';
  if (f.uso > 0) return 'La prueban, sin clientes todavía.';
  if (f.visitas >= 10) return 'Interés en el sitio, nadie la abre en la app: revisar el paso a la app.';
  return 'Sin señal.';
}

/** @param {{items:object[], visitas?:object, gsc?:object[], uso?:object[]}} d */
export function construirTabla(d) {
  const visitas = d.visitas || null;
  const gsc = {};
  (d.gsc || []).forEach((r) => { gsc[rutaDe(r['Páginas principales'] || r['Pagina'] || '')] = r; });
  const uso = {};
  (d.uso || []).forEach((r) => { uso[r['Id']] = r; });
  const filas = d.items.map((it) => {
    const g = gsc[it.ruta];
    const u = it.modulo ? uso[it.modulo] : null;
    const f = {
      tipo: it.tipo, nombre: it.nombre, ruta: it.ruta, modulo: it.modulo, estado: it.estado,
      visitas: visitas ? num(visitas[it.ruta]) : null,
      google_clics: g ? num(g['Clics']) : (d.gsc ? 0 : null),
      google_impresiones: g ? num(g['Impresiones']) : (d.gsc ? 0 : null),
      uso: it.modulo && d.uso ? num(u && u['Aperturas']) : null,
      captura: it.modulo && d.uso ? num(u && u['Personas']) : null,
      pago: it.modulo && d.uso ? num(u && u['Clientes']) : null,
    };
    f.lectura = lectura({ ...f, visitas: f.visitas ?? 0, uso: f.uso ?? 0, pago: f.pago ?? 0, google_impresiones: f.google_impresiones ?? 0 });
    return f;
  });
  const clave = (f) => (f.visitas ?? 0) * 1000 + (f.google_impresiones ?? 0) + (f.uso ?? 0) * 100;
  return filas.sort((a, b) => clave(b) - clave(a) || a.nombre.localeCompare(b.nombre, 'es'));
}

const v = (x) => (x == null ? 'sin dato' : String(x));

export function aMarkdown(mes, filas, fuentes) {
  const total = (k) => filas.reduce((s, f) => s + (f[k] ?? 0), 0);
  const L = [`# Aprendizaje de mercado · ${mes}`, '',
    'Una fila por herramienta con las cuatro etapas: **visita** (la ve en el sitio), **uso** (la abre en la app), **captura** (personas distintas que la abrieron: tienen cuenta o pidieron código) y **pago** (aperturas de clientes con plan: si quien paga la usa).', '',
    `Fuentes: ${fuentes.join(' · ') || 'ninguna'}.`, '',
    `Totales del mes: ${total('visitas')} visitas · ${total('google_clics')} clics de Google (${total('google_impresiones')} impresiones) · ${total('uso')} aperturas en la app · ${total('captura')} capturas · ${total('pago')} aperturas de clientes.`, '',
    '| Herramienta | Tipo | Visitas | Google (clics/impr.) | Uso | Captura | Pago | Lectura |', '|---|---|---:|---:|---:|---:|---:|---|'];
  for (const f of filas) {
    const g = f.google_clics == null ? 'sin dato' : `${f.google_clics}/${f.google_impresiones}`;
    L.push(`| ${f.nombre} | ${f.tipo} | ${v(f.visitas)} | ${g} | ${f.modulo ? v(f.uso) : '—'} | ${f.modulo ? v(f.captura) : '—'} | ${f.modulo ? v(f.pago) : '—'} | ${f.lectura} |`);
  }
  L.push('', '«—» = la herramienta no vive en la app, por eso no hay uso, captura ni pago por herramienta. «sin dato» = falta esa fuente este mes.');
  return L.join('\n') + '\n';
}

export function aCsv(filas) {
  const c = (x) => '"' + String(x ?? '').replace(/"/g, '""') + '"';
  const cab = ['Herramienta', 'Tipo', 'Ruta', 'Módulo app', 'Estado', 'Visitas', 'Google clics', 'Google impresiones', 'Uso', 'Captura', 'Pago', 'Lectura'];
  return '﻿' + [cab, ...filas.map((f) => [f.nombre, f.tipo, f.ruta, f.modulo, f.estado, f.visitas ?? '', f.google_clics ?? '', f.google_impresiones ?? '', f.uso ?? '', f.captura ?? '', f.pago ?? '', f.lectura])].map((r) => r.map(c).join(';')).join('\r\n') + '\r\n';
}

/** Vistas por ruta del mes desde Cloudflare Web Analytics (API GraphQL). Variables: CF_API_TOKEN, CF_ACCOUNT_ID, CF_SITE_TAG. */
export async function visitasCloudflare(mes, env = process.env, fetchFn = fetch) {
  const { CF_API_TOKEN: token, CF_ACCOUNT_ID: cuenta, CF_SITE_TAG: sitio } = env;
  if (!token || !cuenta || !sitio) throw new Error('Faltan CF_API_TOKEN, CF_ACCOUNT_ID o CF_SITE_TAG.');
  const [a, m] = mes.split('-').map(Number);
  const desde = new Date(Date.UTC(a, m - 1, 1)).toISOString();
  const hasta = new Date(Date.UTC(a, m, 1)).toISOString();
  const consulta = `query($acc:String!,$site:String!,$from:Time!,$to:Time!){viewer{accounts(filter:{accountTag:$acc}){rumPageloadEventsAdaptiveGroups(limit:5000,filter:{siteTag:$site,datetime_geq:$from,datetime_lt:$to},orderBy:[count_DESC]){count dimensions{requestPath}}}}}`;
  const r = await fetchFn('https://api.cloudflare.com/client/v4/graphql', {
    method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
    body: JSON.stringify({ query: consulta, variables: { acc: cuenta, site: sitio, from: desde, to: hasta } }),
  });
  const j = await r.json();
  if (j.errors && j.errors.length) throw new Error('Cloudflare: ' + j.errors.map((e) => e.message).join('; '));
  const grupos = j.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups;
  if (!grupos) throw new Error('Cloudflare no devolvió datos de páginas.');
  const out = {};
  for (const g of grupos) { const p = rutaDe(g.dimensions.requestPath); out[p] = (out[p] || 0) + g.count; }
  return out;
}

function mesAnterior(hoy = new Date()) {
  const d = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth() - 1, 1));
  return d.toISOString().slice(0, 7);
}

async function main() {
  const args = process.argv.slice(2);
  const mes = args.find((a) => /^\d{4}-\d{2}$/.test(a)) || mesAnterior();
  const datos = path.join(BASE, 'datos', mes);
  fs.mkdirSync(datos, { recursive: true });
  const fuentes = [];
  if (args.includes('--cloudflare')) {
    const vis = await visitasCloudflare(mes);
    fs.writeFileSync(path.join(datos, 'visitas.json'), JSON.stringify(vis, null, 1));
  }
  const leer = (f) => fs.readFileSync(path.join(datos, f), 'utf8');
  const existe = (f) => fs.existsSync(path.join(datos, f));
  const visitas = existe('visitas.json') ? JSON.parse(leer('visitas.json')) : null;
  if (visitas) fuentes.push('Cloudflare (visitas)');
  const gsc = existe('paginas_gsc.csv') ? leerCsv(leer('paginas_gsc.csv')) : null;
  if (gsc) fuentes.push('Search Console (clics e impresiones)');
  const archivoUso = fs.readdirSync(datos).filter((f) => /^uso_herramientas_.*\.csv$/.test(f)).sort().pop();
  const uso = archivoUso ? leerCsv(leer(archivoUso)) : null;
  if (uso) fuentes.push(`/admin Uso (${archivoUso})`);
  const filas = construirTabla({ items: catalogo(), visitas, gsc, uso });
  fs.writeFileSync(path.join(BASE, `${mes}.md`), aMarkdown(mes, filas, fuentes));
  fs.writeFileSync(path.join(BASE, `${mes}.csv`), aCsv(filas));
  const faltan = [!visitas && 'visitas.json (Cloudflare)', !gsc && 'paginas_gsc.csv (Search Console)', !uso && 'uso_herramientas_*.csv (/admin → Uso → Descargar CSV)'].filter(Boolean);
  console.log(`Listo: privado/marketing/aprendizaje/${mes}.md y .csv` + (faltan.length ? `\nFaltan en datos/${mes}/: ${faltan.join(', ')}` : ''));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main().catch((e) => { console.error(e.message); process.exit(1); });
