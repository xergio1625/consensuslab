// Ayudas de interfaz comunes a las calculadoras de pruebas estadísticas (se usan en el navegador).
import { formato } from './calidad.js';

export type Nivel = 'ok' | 'advertencia' | 'error';

export interface FilaPrueba {
  /** Nombre de la prueba. */
  prueba: string;
  /** Qué mide, en pocas palabras. */
  que: string;
  /** Estadístico y, si corresponde, su valor crítico. */
  estadistico: string;
  /** Valor p (NaN o undefined si la prueba no lo entrega). */
  p?: number;
  /** Lectura corta de la decisión. */
  lectura: string;
  nivel: Nivel;
}

/** Valor p con tres decimales, o «< 0,001». */
export function pTexto(p: number | undefined): string {
  if (p === undefined || !Number.isFinite(p)) return '—';
  return p < 0.001 ? '< 0,001' : formato(p, 3);
}

/** Número con coma y decimales; «—» si no es finito. */
export const n = formato;

/** Dibuja las filas en el cuerpo de una tabla de pruebas (prueba · estadístico · valor p · lectura). */
export function pintarPruebas(cuerpo: HTMLElement, filas: FilaPrueba[]) {
  cuerpo.replaceChildren(
    ...filas.map((f) => {
      const tr = document.createElement('tr');
      const nombre = document.createElement('td');
      const fuerte = document.createElement('strong');
      fuerte.textContent = f.prueba;
      const que = document.createElement('small');
      que.textContent = f.que;
      que.className = 'calc-que';
      nombre.append(fuerte, que);
      const est = document.createElement('td');
      est.textContent = f.estadistico;
      const p = document.createElement('td');
      p.textContent = pTexto(f.p);
      const lectura = document.createElement('td');
      const tag = document.createElement('span');
      tag.className = 'calc-veredicto';
      tag.dataset.nivel = f.nivel;
      tag.textContent = f.lectura;
      lectura.append(tag);
      tr.append(nombre, est, p, lectura);
      return tr;
    }),
  );
}

/** Fila simple de una tabla de datos con celdas de texto. */
export function filaTexto(celdas: string[]): HTMLTableRowElement {
  const tr = document.createElement('tr');
  celdas.forEach((c) => {
    const td = document.createElement('td');
    td.textContent = c;
    tr.appendChild(td);
  });
  return tr;
}

/** Texto de ayuda: «n.º 3, n.º 7». Los índices vienen desde 0. */
export function listaPuntos(indices: number[]): string {
  return indices.map((i) => `n.º ${i + 1}`).join(', ');
}

/** Rellena con una serie de ejemplo una caja de texto, una cifra por línea (con coma decimal). */
export function textoSerie(valores: number[], decimales = 2): string {
  return valores.map((v) => formato(v, decimales).replace(/\./g, '')).join('\n');
}
