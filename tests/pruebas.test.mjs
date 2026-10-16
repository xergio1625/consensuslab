// Pruebas de las calculadoras de pruebas estadísticas (npm test): atípicos, normalidad, tendencia, homogeneidad,
// comparación con el fabricante y precisión del lote.
import test from 'node:test';
import assert from 'node:assert/strict';
import { chi2Cuantil, precisionAnova } from '../src/lib/metodos.js';
import * as P from '../src/lib/pruebas.js';

const cerca = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) <= tol, `${a} ≠ ${b}`);

// --- Utilidades ----------------------------------------------------------------------------------------

test('normal estándar y cuantiles de F', () => {
  cerca(P.fi(1.959964), 0.975, 1e-6);
  cerca(P.fi(-1), 0.158655, 1e-6);
  cerca(P.zCuantil(0.975), 1.959964, 1e-6);
  cerca(P.fCuantil(0.95, 5, 10), 3.3258, 1e-3);
});

test('leer corridas: una por línea, réplicas separadas, coma decimal', () => {
  assert.deepEqual(P.leerGrupos('1,5 2 3\n\n4;5\r\n6'), [[1.5, 2, 3], [4, 5], [6]]);
  assert.ok(Number.isNaN(P.leerGrupos('1 a')[0][1]));
});

// --- Atípicos --------------------------------------------------------------------------------------------

test('Dixon: variante según n y valores críticos de la tabla', () => {
  assert.equal(P.varianteDixon(5), 'r10');
  assert.equal(P.varianteDixon(8), 'r11');
  assert.equal(P.varianteDixon(12), 'r21');
  assert.equal(P.varianteDixon(20), 'r22');
  cerca(P.DIXON_CRITICOS[3][1], 0.97, 1e-9);
  cerca(P.DIXON_CRITICOS[20][1], 0.489, 1e-9);
  assert.equal(P.dixon([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]), null);
});

test('Dixon r22 con n = 20: un extremo claro y un caso sin atípico', () => {
  const base = [99.2, 100.4, 101.1, 98.7, 100.0, 99.5, 100.8, 101.3, 99.9, 100.2, 98.9, 100.6, 99.6, 100.1, 101.0, 99.3, 100.5, 99.8, 100.3];
  const con = P.dixon([...base, 106.8]);
  assert.equal(con.variante, 'r22');
  assert.equal(con.lado, 'alto');
  assert.equal(con.indice, 19);
  const orden = [...base, 106.8].sort((a, b) => a - b);
  cerca(con.q, (orden[19] - orden[17]) / (orden[19] - orden[2]), 1e-9);
  assert.ok(con.atipico);
  assert.ok(!P.dixon([...base, 101.5]).atipico);
});

test('Dixon r10 con n = 4: extremo bajo', () => {
  const r = P.dixon([1, 10, 11, 12], 0.1);
  assert.equal(r.lado, 'bajo');
  cerca(r.q, 9 / 11, 1e-9);
  assert.ok(r.atipico);
});

test('Tietjen-Moore: dos atípicos en una muestra y reproducibilidad', () => {
  const x = [10.1, 9.8, 10.0, 10.2, 9.9, 10.1, 10.0, 9.7, 10.3, 9.95, 10.05, 14.9, 15.2];
  const a = P.tietjenMoore(x, 2, 0.05, 5000);
  const b = P.tietjenMoore(x, 2, 0.05, 5000);
  assert.equal(a.l, b.l);
  assert.equal(a.critico, b.critico);
  assert.ok(a.atipico);
  assert.deepEqual(a.sospechosos.map((s) => s.indice).sort(), [11, 12]);
  assert.ok(a.p < 0.01);
  assert.equal(P.tietjenMoore([1, 2, 3], 2), null);
});

test('Brown-Forsythe y Levene con grupos grandes: tasa de rechazo no superior a α', () => {
  const { normal } = P.generador(12);
  const N = 600;
  let bf = 0;
  for (let s = 0; s < N; s++) if (P.levene(Array.from({ length: 4 }, () => Array.from({ length: 15 }, normal)), 'mediana').p < 0.05) bf++;
  assert.ok(bf / N < 0.07, `${bf / N}`);
});

test('Tietjen-Moore: tasa de falsos positivos cercana al 5 %', () => {
  const { normal } = P.generador(99);
  let falsos = 0;
  const N = 300;
  for (let s = 0; s < N; s++) if (P.tietjenMoore(Array.from({ length: 20 }, normal), 2, 0.05, 2000, s + 1).atipico) falsos++;
  assert.ok(falsos / N > 0.02 && falsos / N < 0.09, `${falsos / N}`);
});

test('Chauvenet y Hampel señalan un dato lejano', () => {
  const x = [10, 10.1, 9.9, 10.2, 9.8, 10.05, 9.95, 10.1, 9.9, 10.0, 16];
  const c = P.chauvenet(x);
  assert.deepEqual(c.atipicos.map((p) => p.indice), [10]);
  const h = P.hampel(x);
  assert.deepEqual(h.atipicos.map((p) => p.indice), [10]);
  cerca(h.mediana, 10.0, 1e-9);
  assert.equal(P.hampel([5, 5, 5, 5]), null);
  assert.deepEqual(P.chauvenet([10, 10.1, 9.9, 10.2, 9.8, 10.05]).atipicos, []);
});

// --- Normalidad ------------------------------------------------------------------------------------------

test('Shapiro-Wilk contra el ejemplo publicado (n = 11) y casos límite', () => {
  const r = P.shapiroWilk([148, 154, 158, 160, 161, 162, 166, 170, 182, 195, 236]);
  cerca(r.w, 0.7888, 5e-4);
  cerca(r.p, 0.0067, 5e-4);
  const n3 = P.shapiroWilk([1, 2, 4]);
  assert.ok(n3.w > 0.75 && n3.w <= 1);
  assert.equal(P.shapiroWilk([1, 2]), null);
  assert.equal(P.shapiroWilk([3, 3, 3, 3]), null);
  const lineal = P.shapiroWilk(Array.from({ length: 20 }, (_, i) => i + 1));
  assert.ok(lineal.w > 0.9 && lineal.w < 1);
});

test('pruebas de normalidad: tasa de rechazo cercana a α con datos normales y alta con datos sesgados', () => {
  const { normal } = P.generador(2026);
  const N = 1500;
  const tasas = { sw: 0, ad: 0, dp: 0, li: 0 };
  let rechazaSesgada = 0;
  for (let s = 0; s < N; s++) {
    const x = Array.from({ length: 20 }, normal);
    if (P.shapiroWilk(x).p < 0.05) tasas.sw++;
    if (P.andersonDarling(x).p < 0.05) tasas.ad++;
    if (P.dagostinoPearson(x).p < 0.05) tasas.dp++;
    if (P.lilliefors(x).p < 0.05) tasas.li++;
    if (P.shapiroWilk(x.map((v) => Math.exp(1.2 * v))).p < 0.05) rechazaSesgada++;
  }
  for (const [k, v] of Object.entries(tasas)) assert.ok(v / N > 0.03 && v / N < 0.08, `${k}: ${v / N}`);
  assert.ok(rechazaSesgada / N > 0.8, `${rechazaSesgada / N}`);
});

test('Anderson-Darling, D’Agostino-Pearson y Lilliefors: entradas inválidas y forma', () => {
  assert.equal(P.andersonDarling([1, 2, 3]), null);
  assert.equal(P.dagostinoPearson([1, 2, 3, 4, 5, 6, 7]), null);
  assert.equal(P.lilliefors([1, 2, 3]), null);
  const sesgada = [98.1, 98.4, 98.6, 98.9, 99.0, 99.2, 99.3, 99.5, 99.7, 99.9, 100.2, 100.4, 100.9, 101.5, 102.4, 103.6, 105.2, 107.5, 110.9, 116.0];
  assert.ok(P.dagostinoPearson(sesgada).asimetria > 1);
  assert.ok(P.shapiroWilk(sesgada).p < 0.01);
  assert.ok(P.andersonDarling(sesgada).p < 0.01);
});

test('gráfico Q-Q: correlación casi 1 con datos normales', () => {
  const { normal } = P.generador(5);
  const q = P.qqNormal(Array.from({ length: 50 }, normal));
  assert.ok(q.r > 0.98);
  assert.equal(q.puntos.length, 50);
  assert.ok(q.puntos[0].teorico < 0 && q.puntos[49].teorico > 0);
});

// --- Tendencia -------------------------------------------------------------------------------------------

test('Mann-Kendall en una serie creciente y con empates', () => {
  const m = P.mannKendall([1, 2, 3, 4, 5, 6, 7, 8]);
  assert.equal(m.s, 28);
  cerca(m.z, 27 / Math.sqrt((8 * 7 * 21) / 18), 1e-9);
  cerca(m.p, 0.00084, 2e-4);
  cerca(m.pendienteSen, 1, 1e-9);
  cerca(m.tau, 1, 1e-9);
  const e = P.mannKendall([1, 1, 1, 2, 2, 2]);
  assert.ok(e.s > 0 && e.varianza < (6 * 5 * 17) / 18);
});

test('Cox-Stuart y rachas con valores calculados a mano', () => {
  const c = P.coxStuart([1, 2, 3, 4, 5, 6, 7, 8]);
  assert.equal(c.suben, 4);
  assert.equal(c.bajan, 0);
  cerca(c.p, 0.125, 1e-12);
  const impar = P.coxStuart([1, 2, 3, 4, 100, 5, 6, 7, 8]);
  assert.equal(impar.pares, 4);
  const r = P.rachas([1, 10, 1, 10, 1, 10, 1, 10]);
  assert.equal(r.rachas, 8);
  cerca(r.esperadas, 5, 1e-12);
  cerca(r.p, 0.056, 2e-3);
  const sube = P.rachas([1, 2, 3, 4, 5, 6, 7, 8]);
  assert.equal(sube.rachas, 2);
  assert.ok(sube.p < 0.1);
});

test('von Neumann, pendiente y autocorrelación', () => {
  const v = P.vonNeumann([1, 2, 3, 4, 5, 6, 7, 8]);
  cerca(v.eta, 8 / 42, 1e-12);
  assert.ok(v.p < 0.01);
  const reg = P.pendienteTiempo([1.1, 1.9, 3.2, 3.9, 5.1, 6.0, 6.8, 8.1]);
  cerca(reg.pendiente, 41.55 / 42, 1e-9);
  assert.ok(reg.p < 1e-6);
  assert.ok(reg.ci[0] < reg.pendiente && reg.ci[1] > reg.pendiente);
  const ac = P.autocorrelacion([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.ok(ac.r1 > 0.6);
  const alterna = P.autocorrelacion([1, 3, 1, 3, 1, 3, 1, 3, 1, 3.2]);
  assert.ok(alterna.r1 < -0.7 && alterna.durbinWatson > 2.5);
});

test('pruebas de tendencia: tasa de falsas alarmas razonable con datos aleatorios', () => {
  const { normal } = P.generador(31);
  const N = 1500;
  const t = { rachas: 0, mk: 0, cs: 0, vn: 0, reg: 0 };
  for (let s = 0; s < N; s++) {
    const x = Array.from({ length: 20 }, normal);
    if (P.rachas(x).p < 0.05) t.rachas++;
    if (P.mannKendall(x).p < 0.05) t.mk++;
    if (P.coxStuart(x).p < 0.05) t.cs++;
    if (P.vonNeumann(x).p < 0.05) t.vn++;
    if (P.pendienteTiempo(x).p < 0.05) t.reg++;
  }
  for (const [k, v] of Object.entries(t)) assert.ok(v / N < 0.09, `${k}: ${v / N}`);
});

// --- Homogeneidad ----------------------------------------------------------------------------------------

const ANOVA3 = [[6, 8, 4, 5, 3, 4], [8, 12, 9, 11, 6, 8], [13, 9, 11, 8, 7, 12]];

test('ANOVA de un factor contra un ejemplo de libro (SCE 84, SCD 68, F = 9,265)', () => {
  const a = P.anovaGrupos(ANOVA3);
  cerca(a.ssB, 84, 1e-9);
  cerca(a.ssW, 68, 1e-9);
  cerca(a.f, 9.2647, 1e-3);
  cerca(a.p, 0.0024, 3e-4);
  cerca(a.sr, Math.sqrt(68 / 15), 1e-9);
  cerca(a.entre, Math.sqrt((42 - 68 / 15) / 6), 1e-9);
  cerca(a.swl ** 2, a.sr ** 2 + a.entre ** 2, 1e-9);
});

test('ANOVA balanceada coincide con la verificación 5 × 5 y admite grupos desiguales', () => {
  const dias = [[100.2, 99.8, 101, 100.5, 99.9], [99.6, 100.9, 100.1, 99.9, 100.4], [101.2, 100.4, 99.7, 100.8, 100.1], [100, 99.5, 100.6, 100.3, 99.7], [99.4, 100.7, 100.2, 99.9, 100.6]];
  const a = P.anovaGrupos(dias);
  const b = precisionAnova(dias);
  cerca(a.sr, b.sr, 1e-9);
  cerca(a.swl, b.swl, 1e-9);
  cerca(a.entre, b.entreDias, 1e-9);
  cerca(a.glWl, b.glWl, 1e-9);
  const desigual = P.anovaGrupos([[1, 2, 3], [2, 3, 4, 5], [3, 4]]);
  assert.ok(desigual.n0 > 2 && desigual.n0 < 4);
});

test('Bartlett contra un cálculo a mano', () => {
  const b = P.bartlett([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]]);
  cerca(b.chi2, (8 * Math.log(6.25) - 4 * Math.log(2.5) - 4 * Math.log(10)) / 1.125, 1e-9);
  cerca(b.p, 0.2077, 2e-3);
  assert.equal(b.gl, 1);
  assert.equal(P.bartlett([[1, 2], [3]]), null);
});

test('Levene y Brown-Forsythe: detectan varianzas distintas y coinciden con ANOVA de las desviaciones', () => {
  const g = [[10, 10.1, 9.9, 10.05, 9.95], [10, 12, 8, 13, 7], [10.1, 9.9, 10, 10.2, 9.8]];
  const bf = P.levene(g, 'mediana');
  const le = P.levene(g, 'media');
  assert.ok(bf.p < 0.05);
  assert.ok(le.p < 0.05);
  const manual = P.anovaGrupos(g.map((x) => { const m = P.media(x); return x.map((v) => Math.abs(v - m)); }));
  cerca(le.f, manual.f, 1e-12);
  const iguales = P.levene([[1, 2, 3, 4, 5], [2, 3, 4, 5, 6], [0, 1, 2, 3, 4]], 'mediana');
  assert.ok(iguales.p > 0.9);
});

test('Cochran: valor crítico de tabla (k = 5, n = 5, 5 %: 0,5441) y detección del día anormal', () => {
  const g = [[10, 10.1, 9.9, 10.05, 9.95], [10, 10.2, 9.8, 10.1, 9.9], [10, 13, 7, 12, 8], [10.1, 9.9, 10, 10.2, 9.8], [10, 10.1, 9.9, 10.1, 9.9]];
  const c = P.cochran(g);
  cerca(c.critico, 0.5441, 2e-3);
  assert.equal(c.indice, 2);
  assert.ok(c.c > c.critico);
  assert.ok(c.p < 0.01);
  assert.equal(P.cochran([[1, 2, 3], [1, 2], [1, 2, 3]]), null);
  assert.equal(P.cochran([[1, 2, 3], [1, 2, 4]]), null);
});

test('mitades: F y t entre la primera y la segunda mitad', () => {
  const m = P.mitades([10, 10.2, 9.8, 10.1, 9.9, 10.0, 12, 14, 11, 13, 12.5, 12]);
  assert.equal(m.h, 6);
  assert.ok(m.pStudent < 0.001);
  assert.ok(m.pMedias < 0.01);
  assert.ok(m.diferencia > 2);
  const impar = P.mitades([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assert.equal(impar.h, 4);
  assert.equal(P.mitades([1, 2, 3]), null);
});

test('pruebas de homogeneidad: tasa de rechazo cercana a α con datos homogéneos', () => {
  const { normal } = P.generador(808);
  const N = 1500;
  const t = { anova: 0, bartlett: 0, cochran: 0, f: 0, t: 0 };
  for (let s = 0; s < N; s++) {
    const g = Array.from({ length: 5 }, () => Array.from({ length: 5 }, normal));
    if (P.anovaGrupos(g).p < 0.05) t.anova++;
    if (P.bartlett(g).p < 0.05) t.bartlett++;
    if (P.cochran(g).c > P.cochran(g).critico) t.cochran++;
    const m = P.mitades(g.flat());
    if (m.pVarianzas < 0.05) t.f++;
    if (m.pStudent < 0.05) t.t++;
  }
  for (const [k, v] of Object.entries(t)) assert.ok(v / N > 0.025 && v / N < 0.085, `${k}: ${v / N}`);
});

// --- Comparación con el fabricante ----------------------------------------------------------------------

test('t de una muestra, intervalo de verificación y sesgo', () => {
  const t = P.tUnaMuestra([1, 2, 3, 4, 5], 2);
  cerca(t.media, 3, 1e-12);
  cerca(t.t, 1 / (Math.sqrt(2.5) / Math.sqrt(5)), 1e-9);
  cerca(t.p, 0.2302, 2e-3);
  cerca(t.ci[0], 3 - 2.776445 * Math.sqrt(0.5), 1e-4);
  const iv = P.intervaloVerificacion([100.8, 101.3, 99.9, 100.6], 100, 2);
  cerca(iv.bajo, 100 - (1.959964 * 2) / 2, 1e-5);
  assert.ok(iv.dentro);
  assert.ok(!P.intervaloVerificacion([103, 104, 103.5, 104.5], 100, 2).dentro);
  const s = P.sesgoAsignado([101, 102, 103, 102, 101, 103], 100, { sesgoPermitidoPct: 1.5, deAsignada: 1 });
  cerca(s.sesgoPct, 2, 1e-9);
  cerca(s.sdi, 2, 1e-9);
  assert.equal(s.dentroDePermitido, false);
  assert.equal(P.sesgoAsignado([1, 2, 3], 0), null);
});

test('chi cuadrado para la DE: valor p y límite de verificación', () => {
  const x = [97, 103, 98, 102, 100, 99, 101, 100, 96, 104, 100, 98, 102, 99, 101, 100, 97, 103, 100, 100, 100];
  const c = P.chiDesviacion(x, 1);
  assert.equal(c.gl, 20);
  cerca(c.chi2, (20 * c.de ** 2) / 1, 1e-9);
  assert.ok(c.de > 2 && c.de < 3);
  assert.ok(c.pMayor < 0.001);
  assert.ok(P.chiDesviacion(x, 6).pMayor > 0.99);
  cerca(P.chiDesviacion([1, 2, 3, 4, 5, 6], 1).limite, Math.sqrt(11.0705 / 5), 1e-3);
  assert.ok(c.ciDe[0] < c.de && c.ciDe[1] > c.de);
});

// --- Precisión del lote ----------------------------------------------------------------------------------

test('precisión del lote: con réplicas por día y con un resultado por día', () => {
  const dias = [[100.2, 99.8, 101, 100.5], [99.6, 100.9, 100.1, 99.9], [101.2, 100.4, 99.7, 100.8], [100, 99.5, 100.6, 100.3], [99.4, 100.7, 100.2, 99.9]];
  const r = P.precisionLote(dias, { cvHistorico: 1, tea: 6, sesgoPct: 1 });
  const b = precisionAnova(dias);
  cerca(r.cv, b.cvWl, 1e-9);
  cerca(r.cvR, b.cvR, 1e-9);
  cerca(r.sigmaPartida, (6 - 1) / b.cvWl, 1e-9);
  cerca(r.limiteHistorico, Math.sqrt(chi2Cuantil(0.95, r.glWl) / r.glWl), 1e-12);
  assert.ok(r.limiteHistorico > 1);
  assert.equal(r.soloSerie, false);
  const serie = P.precisionLote([[99.2], [100.4], [101.1], [98.7], [100.0], [99.5]], { cvHistorico: 1.2 });
  assert.equal(serie.soloSerie, true);
  assert.equal(serie.glWl, 5);
  assert.ok(serie.cv > 0 && Number.isNaN(serie.sigmaPartida));
  assert.equal(P.precisionLote([[1, 2], [2, 3]]), null);
});
