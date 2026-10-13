// Curvas de calibración: regresión lineal (con ponderación opcional) y logística de 4 parámetros (4PL, Levenberg-Marquardt).
// Funciones puras (se prueban con `npm test`).

/** Pesos para la regresión: 'ninguno', '1/x', '1/x2' (lineal) o '1/y2' (4PL). */
function pesos(x, y, peso) {
  return x.map((xi, i) => {
    if (peso === '1/x') return xi > 0 ? 1 / xi : 1;
    if (peso === '1/x2') return xi > 0 ? 1 / xi ** 2 : 1;
    if (peso === '1/y2') return y[i] !== 0 ? 1 / y[i] ** 2 : 1;
    return 1;
  });
}

/** Mínimos cuadrados ponderados: y = a + b·x. Devuelve pendiente, intercepto y r². */
export function ajusteLineal(x, y, peso = 'ninguno') {
  const w = pesos(x, y, peso);
  const sw = w.reduce((s, v) => s + v, 0);
  const mx = w.reduce((s, v, i) => s + v * x[i], 0) / sw;
  const my = w.reduce((s, v, i) => s + v * y[i], 0) / sw;
  let sxx = 0;
  let sxy = 0;
  let syy = 0;
  x.forEach((xi, i) => {
    sxx += w[i] * (xi - mx) ** 2;
    sxy += w[i] * (xi - mx) * (y[i] - my);
    syy += w[i] * (y[i] - my) ** 2;
  });
  const b = sxy / sxx;
  const a = my - b * mx;
  return { modelo: 'lineal', a, b, r2: (sxy * sxy) / (sxx * syy), predecir: (xi) => a + b * xi, invertir: (yi) => (yi - a) / b };
}

const f4 = (x, p) => {
  const [a, b, c, d] = p;
  return d + (a - d) / (1 + (x <= 0 ? 0 : (x / c) ** b));
};

function jacobiana4(x, p) {
  const [a, b, c, d] = p;
  const u = x <= 0 ? 0 : (x / c) ** b;
  const D = 1 + u;
  return [1 / D, x <= 0 ? 0 : (-(a - d) * u * Math.log(x / c)) / D ** 2, x <= 0 ? 0 : ((a - d) * u * b) / (c * D ** 2), u / D];
}

function resolver(A, v) {
  // Eliminación gaussiana con pivoteo parcial para un sistema 4×4.
  const n = v.length;
  const M = A.map((fila, i) => [...fila, v[i]]);
  for (let i = 0; i < n; i++) {
    let p = i;
    for (let r = i + 1; r < n; r++) if (Math.abs(M[r][i]) > Math.abs(M[p][i])) p = r;
    if (Math.abs(M[p][i]) < 1e-300) return null;
    [M[i], M[p]] = [M[p], M[i]];
    for (let r = i + 1; r < n; r++) {
      const f = M[r][i] / M[i][i];
      for (let c = i; c <= n; c++) M[r][c] -= f * M[i][c];
    }
  }
  const sol = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = M[i][n];
    for (let c = i + 1; c < n; c++) s -= M[i][c] * sol[c];
    sol[i] = s / M[i][i];
  }
  return sol;
}

/**
 * Curva 4PL: y = d + (a − d) / (1 + (x/c)^b). `a` es la respuesta con concentración 0 y `d` con concentración infinita;
 * `c` es la concentración del punto medio y `b` la pendiente. Ajuste por Levenberg-Marquardt, con ponderación opcional.
 * Necesita al menos 5 estándares distintos. Devuelve null si el ajuste no converge o los parámetros no son válidos.
 */
export function ajuste4pl(x, y, peso = 'ninguno') {
  const n = x.length;
  if (n < 5 || new Set(x).size < 5) return null;
  const w = pesos(x, y, peso);
  const orden = x.map((_, i) => i).sort((i, j) => x[i] - x[j]);
  const ymin = y[orden[0]];
  const ymax = y[orden[n - 1]];
  const positivos = x.filter((v) => v > 0).sort((p, q) => p - q);
  if (positivos.length < 4 || ymin === ymax) return null;
  const cInicial = Math.exp(positivos.reduce((s, v) => s + Math.log(v), 0) / positivos.length);
  const margen = Math.abs(ymax - ymin) * 0.05;
  let p = [ymin - Math.sign(ymax - ymin) * margen, 1, cInicial, ymax + Math.sign(ymax - ymin) * margen];
  const sse = (q) => x.reduce((s, xi, i) => s + w[i] * (y[i] - f4(xi, q)) ** 2, 0);
  let error = sse(p);
  let lambda = 1e-2;
  for (let it = 0; it < 500; it++) {
    const JtJ = Array.from({ length: 4 }, () => Array(4).fill(0));
    const Jtr = Array(4).fill(0);
    x.forEach((xi, i) => {
      const j = jacobiana4(xi, p);
      const r = y[i] - f4(xi, p);
      for (let a = 0; a < 4; a++) {
        Jtr[a] += w[i] * j[a] * r;
        for (let b = 0; b < 4; b++) JtJ[a][b] += w[i] * j[a] * j[b];
      }
    });
    let mejoro = false;
    for (let intento = 0; intento < 30; intento++) {
      const A = JtJ.map((fila, a) => fila.map((v, b) => (a === b ? v * (1 + lambda) + 1e-300 : v)));
      const paso = resolver(A, Jtr);
      if (!paso) {
        lambda *= 10;
        continue;
      }
      const q = p.map((v, k) => v + paso[k]);
      if (q[1] > 0 && q[2] > 0) {
        const e = sse(q);
        if (e < error) {
          const mejora = (error - e) / (error + 1e-300);
          p = q;
          error = e;
          lambda = Math.max(lambda / 10, 1e-12);
          mejoro = true;
          if (mejora < 1e-14) it = 1e9;
          break;
        }
      }
      lambda *= 10;
    }
    if (!mejoro) break;
  }
  const [a, b, c, d] = p;
  if (!(b > 0 && c > 0) || p.some((v) => !Number.isFinite(v))) return null;
  const sw = w.reduce((s, v) => s + v, 0);
  const media = w.reduce((s, v, i) => s + v * y[i], 0) / sw;
  const total = x.reduce((s, _, i) => s + w[i] * (y[i] - media) ** 2, 0);
  return {
    modelo: '4pl', a, b, c, d, r2: total > 0 ? 1 - error / total : NaN,
    predecir: (xi) => f4(xi, p),
    invertir: (yi) => {
      const razon = (a - d) / (yi - d) - 1;
      return razon > 0 && Number.isFinite(razon) ? c * razon ** (1 / b) : NaN;
    },
  };
}

/**
 * Calibra con pares (concentración, señal), recupera cada estándar y estima las muestras desconocidas (señales).
 * `modelo`: 'lineal' o '4pl'. Cada desconocida lleva `fueraDeRango` si su señal queda fuera de las señales de los estándares.
 */
export function calibrar({ x, y, modelo = 'lineal', peso = 'ninguno', desconocidas = [] }) {
  if (x.length !== y.length || x.length < 3 || [...x, ...y].some((v) => !Number.isFinite(v))) return null;
  const ajuste = modelo === '4pl' ? ajuste4pl(x, y, peso) : ajusteLineal(x, y, peso);
  if (!ajuste) return null;
  const sMin = Math.min(...y);
  const sMax = Math.max(...y);
  return {
    ajuste,
    estandares: x.map((xi, i) => {
      const calculada = ajuste.invertir(y[i]);
      return { nominal: xi, senal: y[i], calculada, recuperacion: xi > 0 ? (calculada / xi) * 100 : NaN };
    }),
    desconocidas: desconocidas.map((s) => ({
      senal: s,
      concentracion: ajuste.invertir(s),
      fueraDeRango: s < sMin || s > sMax,
    })),
  };
}
