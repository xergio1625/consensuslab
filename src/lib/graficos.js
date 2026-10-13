// Ayudas para los gráficos SVG de las calculadoras (se usan en el navegador). Reutilizan las clases lj-* del sitio.
import { formato } from './calidad.js';

const NS = 'http://www.w3.org/2000/svg';

/** Crea un elemento SVG con atributos y texto opcional. */
export function svg(nombre, atributos = {}, texto) {
  const el = document.createElementNS(NS, nombre);
  for (const [k, v] of Object.entries(atributos)) el.setAttribute(k, String(v));
  if (texto !== undefined) el.textContent = texto;
  return el;
}

/** Escala «bonita» con marcas redondas que cubre [min, max]. */
export function escala(min, max, pasos = 5) {
  const rango = max - min || 1;
  const bruto = rango / pasos;
  const pot = 10 ** Math.floor(Math.log10(bruto));
  const paso = [1, 2, 5, 10].map((f) => f * pot).find((p) => p >= bruto);
  const ini = Math.floor(min / paso) * paso;
  const fin = Math.ceil(max / paso) * paso;
  const marcas = [];
  for (let v = ini; v <= fin + paso / 2; v += paso) marcas.push(Number(v.toFixed(10)));
  return { ini, fin, marcas };
}

/** Lienzo SVG de 640 × 340 con texto alternativo. */
export function lienzo(titulo) {
  const s = svg('svg', { viewBox: '0 0 640 340', role: 'img' });
  s.setAttribute('aria-label', titulo);
  return s;
}

export const GEOMETRIA = { W: 640, H: 340, ml: 56, mr: 16, mt: 12, mb: 40 };

/** Dibuja grilla, marcas y títulos de ejes; devuelve las funciones X(v) e Y(v) en píxeles. */
export function ejes(s, ex, ey, tituloX, tituloY, g = GEOMETRIA) {
  const X = (v) => g.ml + ((v - ex.ini) / (ex.fin - ex.ini)) * (g.W - g.ml - g.mr);
  const Y = (v) => g.mt + ((ey.fin - v) / (ey.fin - ey.ini)) * (g.H - g.mt - g.mb);
  const dec = (e) => (Math.abs(e.marcas[1] - e.marcas[0]) < 1 ? (Math.abs(e.marcas[1] - e.marcas[0]) < 0.1 ? 2 : 1) : 0);
  for (const v of ey.marcas) {
    s.append(svg('line', { x1: g.ml, x2: g.W - g.mr, y1: Y(v), y2: Y(v), class: 'lj-grilla' }));
    s.append(svg('text', { x: g.ml - 6, y: Y(v) + 4, 'text-anchor': 'end', class: 'lj-texto' }, formato(v, dec(ey))));
  }
  for (const v of ex.marcas) {
    s.append(svg('text', { x: X(v), y: g.H - g.mb + 16, 'text-anchor': 'middle', class: 'lj-texto' }, formato(v, dec(ex))));
  }
  s.append(svg('text', { x: (g.ml + g.W - g.mr) / 2, y: g.H - 6, 'text-anchor': 'middle', class: 'lj-texto' }, tituloX));
  const ym = (g.mt + g.H - g.mb) / 2;
  s.append(svg('text', { x: 14, y: ym, 'text-anchor': 'middle', class: 'lj-texto', transform: `rotate(-90 14 ${ym})` }, tituloY));
  return { X, Y };
}
