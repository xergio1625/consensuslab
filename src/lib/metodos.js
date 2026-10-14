// Estadística de verificación y comparación de métodos. Funciones puras (se prueban con `npm test`).
// Cuantiles de chi cuadrado y t de Student calculados numéricamente (sin tablas), precisión de ~1e-9.

// --- Funciones especiales ---------------------------------------------------------------------------

/** ln Γ(x) (aproximación de Lanczos). */
function lnGamma(x) {
  const c = [
    76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2,
    -0.5395239384953e-5,
  ];
  let y = x;
  let tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;
  for (const ci of c) ser += ci / ++y;
  return -tmp + Math.log((2.5066282746310005 * ser) / x);
}

/** Función gamma incompleta regularizada inferior P(a, x). */
function gammaP(a, x) {
  if (x <= 0) return 0;
  if (x < a + 1) {
    let suma = 1 / a;
    let termino = suma;
    for (let n = 1; n < 500; n++) {
      termino *= x / (a + n);
      suma += termino;
      if (Math.abs(termino) < Math.abs(suma) * 1e-15) break;
    }
    return suma * Math.exp(-x + a * Math.log(x) - lnGamma(a));
  }
  let b = x + 1 - a;
  let c = 1 / 1e-300;
  let d = 1 / b;
  let h = d;
  for (let i = 1; i < 500; i++) {
    const an = -i * (i - a);
    b += 2;
    d = an * d + b;
    if (Math.abs(d) < 1e-300) d = 1e-300;
    c = b + an / c;
    if (Math.abs(c) < 1e-300) c = 1e-300;
    d = 1 / d;
    const delta = d * c;
    h *= delta;
    if (Math.abs(delta - 1) < 1e-15) break;
  }
  return 1 - Math.exp(-x + a * Math.log(x) - lnGamma(a)) * h;
}

/** Fracción continua de la beta incompleta. */
function betaCf(a, b, x) {
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 - (qab * x) / qap;
  if (Math.abs(d) < 1e-300) d = 1e-300;
  d = 1 / d;
  let h = d;
  for (let m = 1; m < 500; m++) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < 1e-300) d = 1e-300;
    c = 1 + aa / c;
    if (Math.abs(c) < 1e-300) c = 1e-300;
    d = 1 / d;
    h *= d * c;
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < 1e-300) d = 1e-300;
    c = 1 + aa / c;
    if (Math.abs(c) < 1e-300) c = 1e-300;
    d = 1 / d;
    const delta = d * c;
    h *= delta;
    if (Math.abs(delta - 1) < 1e-15) break;
  }
  return h;
}

/** Beta incompleta regularizada I_x(a, b). */
function betaI(x, a, b) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const bt = Math.exp(lnGamma(a + b) - lnGamma(a) - lnGamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  return x < (a + 1) / (a + b + 2) ? (bt * betaCf(a, b, x)) / a : 1 - (bt * betaCf(b, a, 1 - x)) / b;
}

/** Probabilidad acumulada de chi cuadrado con `gl` grados de libertad. */
export function chi2Acumulada(x, gl) {
  return gammaP(gl / 2, x / 2);
}

/** Cuantil de chi cuadrado: el x tal que P(X ≤ x) = p. */
export function chi2Cuantil(p, gl) {
  let bajo = 0;
  let alto = Math.max(10, gl * 4 + 50);
  while (chi2Acumulada(alto, gl) < p) alto *= 2;
  for (let i = 0; i < 200; i++) {
    const medio = (bajo + alto) / 2;
    if (chi2Acumulada(medio, gl) < p) bajo = medio;
    else alto = medio;
  }
  return (bajo + alto) / 2;
}

/** Probabilidad acumulada de la t de Student. */
export function tAcumulada(t, gl) {
  const cola = 0.5 * betaI(gl / (gl + t * t), gl / 2, 0.5);
  return t >= 0 ? 1 - cola : cola;
}

/** Probabilidad acumulada de la F de Snedecor con gl1 y gl2 grados de libertad. */
export function fAcumulada(f, gl1, gl2) {
  if (!(f > 0)) return 0;
  return betaI((gl1 * f) / (gl1 * f + gl2), gl1 / 2, gl2 / 2);
}

/** Cuantil de la t de Student. */
export function tCuantil(p, gl) {
  let bajo = -1000;
  let alto = 1000;
  for (let i = 0; i < 200; i++) {
    const medio = (bajo + alto) / 2;
    if (tAcumulada(medio, gl) < p) bajo = medio;
    else alto = medio;
  }
  return (bajo + alto) / 2;
}

const media = (v) => v.reduce((s, x) => s + x, 0) / v.length;
const mediana = (v) => {
  const o = [...v].sort((a, b) => a - b);
  const m = Math.floor(o.length / 2);
  return o.length % 2 ? o[m] : (o[m - 1] + o[m]) / 2;
};
const de = (v) => {
  const m = media(v);
  return Math.sqrt(v.reduce((s, x) => s + (x - m) ** 2, 0) / (v.length - 1));
};

// --- Verificación de precisión (diseño D días × n réplicas, ANOVA) ------------------------------------

/**
 * Precisión de un nivel con D días y n réplicas por día (diseño balanceado, ANOVA de un factor aleatorio):
 * repetibilidad s_r² = CM dentro; componente entre días s_B² = (CM entre − CM dentro) / n (0 si es negativo);
 * intralaboratorio s_wl² = s_r² + s_B². Los grados de libertad intralaboratorio son los de Satterthwaite.
 * `dias`: lista de D listas de n números. Devuelve null si el diseño no es válido.
 */
export function precisionAnova(dias) {
  const D = dias.length;
  const n = dias[0]?.length;
  if (D < 2 || !(n >= 2) || dias.some((d) => d.length !== n || d.some((x) => !Number.isFinite(x)))) return null;
  const todas = dias.flat();
  const gran = media(todas);
  const medias = dias.map(media);
  const ssB = n * medias.reduce((s, m) => s + (m - gran) ** 2, 0);
  const ssW = dias.reduce((s, d, i) => s + d.reduce((t, x) => t + (x - medias[i]) ** 2, 0), 0);
  const glB = D - 1;
  const glW = D * (n - 1);
  const msB = ssB / glB;
  const msW = ssW / glW;
  const varEntre = Math.max(0, (msB - msW) / n);
  const sr = Math.sqrt(msW);
  const swl = Math.sqrt(msW + varEntre);
  let glWl = glW;
  if (varEntre > 0) {
    const a = msB / n;
    const b = ((n - 1) / n) * msW;
    glWl = (a + b) ** 2 / (a ** 2 / glB + b ** 2 / glW);
  }
  return {
    D, n, media: gran, sr, swl, entreDias: Math.sqrt(varEntre), glR: glW, glWl,
    cvR: (sr / gran) * 100, cvWl: (swl / gran) * 100,
  };
}

/**
 * Límite superior de verificación para una declaración de CV: CV declarado × √(χ²(confianza, gl) / gl).
 * Un CV observado por debajo del límite no contradice la declaración.
 */
export function limiteVerificacion(cvDeclarado, gl, confianza = 0.95) {
  return cvDeclarado * Math.sqrt(chi2Cuantil(confianza, gl) / gl);
}

// --- Comparación de métodos -----------------------------------------------------------------------

/** Bland-Altman con diferencias absolutas (y − x). Intervalos de confianza de Bland y Altman (1999), t con n − 1 gl. */
export function blandAltman(x, y, confianza = 0.95) {
  const n = x.length;
  const d = y.map((v, i) => v - x[i]);
  const sesgo = media(d);
  const s = de(d);
  const t = tCuantil(1 - (1 - confianza) / 2, n - 1);
  const seLimite = s * Math.sqrt(1 / n + 1.96 ** 2 / (2 * (n - 1)));
  const inf = sesgo - 1.96 * s;
  const sup = sesgo + 1.96 * s;
  return {
    n, sesgo, de: s,
    ciSesgo: [sesgo - (t * s) / Math.sqrt(n), sesgo + (t * s) / Math.sqrt(n)],
    limiteInf: inf, limiteSup: sup,
    ciInf: [inf - t * seLimite, inf + t * seLimite],
    ciSup: [sup - t * seLimite, sup + t * seLimite],
    diferencias: d,
    promedios: x.map((v, i) => (v + y[i]) / 2),
  };
}

/** Mínimos cuadrados ordinarios de y sobre x, con r. */
export function regresionOls(x, y) {
  const mx = media(x);
  const my = media(y);
  let sxx = 0;
  let sxy = 0;
  let syy = 0;
  x.forEach((v, i) => {
    sxx += (v - mx) ** 2;
    sxy += (v - mx) * (y[i] - my);
    syy += (y[i] - my) ** 2;
  });
  const b = sxy / sxx;
  return { pendiente: b, intercepto: my - b * mx, r: sxy / Math.sqrt(sxx * syy) };
}

function demingUna(x, y, lambda) {
  const mx = media(x);
  const my = media(y);
  let sxx = 0;
  let sxy = 0;
  let syy = 0;
  x.forEach((v, i) => {
    sxx += (v - mx) ** 2;
    sxy += (v - mx) * (y[i] - my);
    syy += (y[i] - my) ** 2;
  });
  const u = syy - lambda * sxx;
  const b = (u + Math.sqrt(u * u + 4 * lambda * sxy * sxy)) / (2 * sxy);
  return { pendiente: b, intercepto: my - b * mx };
}

/**
 * Regresión de Deming. `lambda` = razón de varianzas del error (error de y / error de x); 1 = errores iguales.
 * Intervalos de confianza por jackknife (se omite un par a la vez) con t de n − 1 gl.
 */
export function regresionDeming(x, y, lambda = 1, confianza = 0.95) {
  const n = x.length;
  const base = demingUna(x, y, lambda);
  const quitando = x.map((_, i) => demingUna(x.filter((__, j) => j !== i), y.filter((__, j) => j !== i), lambda));
  const pseudo = (clave) => quitando.map((q) => n * base[clave] - (n - 1) * q[clave]);
  const intervalo = (clave) => {
    const p = pseudo(clave);
    const centro = media(p);
    const margen = tCuantil(1 - (1 - confianza) / 2, n - 1) * (de(p) / Math.sqrt(n));
    return [centro - margen, centro + margen];
  };
  return { ...base, ciPendiente: intervalo('pendiente'), ciIntercepto: intervalo('intercepto') };
}

/**
 * Regresión de Passing-Bablok (mediana desplazada de las pendientes entre pares), según el algoritmo
 * publicado: se excluyen los pares idénticos y las pendientes iguales a −1; k = pendientes menores que −1;
 * intercepto = mediana de y − b·x; intervalo con C = z · √(n(n − 1)(2n + 5)/18).
 */
export function passingBablok(x, y, confianza = 0.95) {
  const n = x.length;
  const L = 1e9;
  const pend = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dx = x[j] - x[i];
      const dy = y[j] - y[i];
      if (dx === 0 && dy === 0) continue;
      const s = dx === 0 ? (dy > 0 ? L : -L) : dy / dx;
      if (s === -1) continue;
      pend.push(s);
    }
  }
  pend.sort((a, b) => a - b);
  const N = pend.length;
  if (N < 3) return null;
  const k = pend.filter((s) => s < -1).length;
  const en = (pos) => pend[Math.min(N - 1, Math.max(0, pos - 1))];
  const m = Math.floor(N / 2);
  const b = N % 2 ? en(m + 1 + k) : (en(m + k) + en(m + 1 + k)) / 2;
  const a = mediana(y.map((v, i) => v - b * x[i]));
  const z = tCuantil(1 - (1 - confianza) / 2, 1e6); // z de la normal
  const c = z * Math.sqrt((n * (n - 1) * (2 * n + 5)) / 18);
  const m1 = Math.round((N - c) / 2);
  const m2 = N - m1 + 1;
  const inf = en(m1 + k);
  const sup = en(m2 + k);
  return {
    pendiente: b,
    intercepto: a,
    ciPendiente: [inf, sup],
    ciIntercepto: [mediana(y.map((v, i) => v - sup * x[i])), mediana(y.map((v, i) => v - inf * x[i]))],
    pares: N,
    k,
  };
}

/**
 * Comparación completa de dos métodos (x = comparativo, y = candidato): Bland-Altman, mínimos cuadrados,
 * Deming y Passing-Bablok, y el sesgo en niveles de decisión según cada regresión (y_c = a + b · x_c).
 */
export function compararMetodos(x, y, { lambda = 1, niveles = [], confianza = 0.95 } = {}) {
  const n = x.length;
  if (n < 3 || y.length !== n || [...x, ...y].some((v) => !Number.isFinite(v))) return null;
  const ba = blandAltman(x, y, confianza);
  const mx = media(x);
  const relativas = x.map((v, i) => (v !== 0 ? ((y[i] - v) / v) * 100 : NaN)).filter(Number.isFinite);
  const ols = regresionOls(x, y);
  const deming = regresionDeming(x, y, lambda, confianza);
  const pb = passingBablok(x, y, confianza);
  const sesgoEn = (r) =>
    niveles.map((xc) => {
      const yc = r.intercepto + r.pendiente * xc;
      return { nivel: xc, estimado: yc, sesgo: yc - xc, sesgoPct: xc !== 0 ? ((yc - xc) / xc) * 100 : NaN };
    });
  return {
    n, mediaX: mx, mediaY: media(y),
    ba, sesgoPctMedio: relativas.length ? media(relativas) : NaN,
    ols, deming, pb,
    nivelesDeming: sesgoEn(deming),
    nivelesPb: pb ? sesgoEn(pb) : [],
  };
}
