import test from 'node:test';
import assert from 'node:assert/strict';
import { leerCsv, construirTabla, lectura, aCsv, aMarkdown, visitasCloudflare } from '../tools/aprendizaje-mercado.mjs';

const items = [
  { tipo: 'Ficha', nombre: 'Control documental', ruta: '/herramientas/control-documental/', modulo: 'documentos', estado: 'disponible' },
  { tipo: 'Ficha', nombre: 'Registro de temperaturas', ruta: '/herramientas/registro-de-temperaturas/', modulo: 'temperaturas', estado: 'disponible' },
  { tipo: 'Calculadora', nombre: 'Sesgo y SDI', ruta: '/calculadoras/sesgo-y-sdi/', modulo: '', estado: 'disponible' },
  { tipo: 'Ficha', nombre: 'Auditorías internas', ruta: '/herramientas/auditorias-internas/', modulo: '', estado: 'en-preparacion' },
];

test('leerCsv: separador punto y coma, BOM y comillas', () => {
  const f = leerCsv('﻿"Id";"Herramienta";"Personas"\r\n"documentos";"Control ""documental""";"3"\r\n');
  assert.deepEqual(f, [{ Id: 'documentos', Herramienta: 'Control "documental"', Personas: '3' }]);
});

test('leerCsv: separador coma (Search Console)', () => {
  const f = leerCsv('Páginas principales,Clics,Impresiones\nhttps://consensuslab.cl/calculadoras/sesgo-y-sdi/,2,46\n');
  assert.equal(f[0]['Impresiones'], '46');
});

test('construirTabla une visitas, Google y uso de la app por módulo', () => {
  const t = construirTabla({
    items,
    visitas: { '/herramientas/control-documental/': 12, '/calculadoras/sesgo-y-sdi/': 30 },
    gsc: leerCsv('Páginas principales,Clics,Impresiones\nhttps://consensuslab.cl/calculadoras/sesgo-y-sdi/,2,46\n'),
    uso: leerCsv('Id;Herramienta;Personas;Aperturas;Demo;Prueba;Clientes\ndocumentos;Control documental;4;9;2;5;2\n'),
  });
  const doc = t.find((f) => f.ruta === '/herramientas/control-documental/');
  assert.equal(doc.visitas, 12);
  assert.equal(doc.uso, 9);
  assert.equal(doc.captura, 4);
  assert.equal(doc.pago, 2);
  assert.match(doc.lectura, /clientes con plan/);
  const sesgo = t.find((f) => f.ruta === '/calculadoras/sesgo-y-sdi/');
  assert.equal(sesgo.google_clics, 2);
  assert.equal(sesgo.uso, null);
  assert.match(sesgo.lectura, /Gancho de audiencia/);
  assert.equal(t[0].nombre, 'Sesgo y SDI', 'ordena por visitas');
});

test('sin fuentes: todo queda sin dato, no en cero', () => {
  const t = construirTabla({ items });
  assert.equal(t[0].visitas, null);
  assert.equal(t[0].uso, null);
  assert.match(aMarkdown('2026-10', t, []), /sin dato/);
});

test('un módulo de la app sin aperturas cuenta cero cuando hay archivo de uso', () => {
  const t = construirTabla({ items, uso: leerCsv('Id;Herramienta;Personas;Aperturas;Demo;Prueba;Clientes\ndocumentos;Control documental;1;1;1;0;0\n') });
  const temp = t.find((f) => f.modulo === 'temperaturas');
  assert.equal(temp.uso, 0);
  assert.equal(temp.captura, 0);
});

test('lectura: interés sin uso en la app y fichas en preparación', () => {
  assert.match(lectura({ modulo: 'x', visitas: 20, uso: 0, pago: 0, estado: 'disponible' }), /nadie la abre/);
  assert.match(lectura({ modulo: '', visitas: 3, uso: 0, pago: 0, estado: 'en-preparacion' }), /preparación/);
  assert.match(lectura({ modulo: 'x', visitas: 0, uso: 2, pago: 0, estado: 'disponible' }), /sin clientes/);
});

test('aCsv escapa comillas y usa punto y coma', () => {
  const csv = aCsv(construirTabla({ items: [{ tipo: 'Ficha', nombre: 'A "b"', ruta: '/x/', modulo: '', estado: 'disponible' }] }));
  assert.match(csv, /"A ""b"""/);
  assert.ok(csv.includes(';'));
});

test('visitasCloudflare: suma por ruta y falla con claridad sin credenciales', async () => {
  await assert.rejects(() => visitasCloudflare('2026-10', {}), /Faltan CF_API_TOKEN/);
  const falso = async () => ({ json: async () => ({ data: { viewer: { accounts: [{ rumPageloadEventsAdaptiveGroups: [
    { count: 5, dimensions: { requestPath: '/calculadoras/sesgo-y-sdi' } },
    { count: 2, dimensions: { requestPath: '/calculadoras/sesgo-y-sdi/' } },
  ] }] } } }) });
  const v = await visitasCloudflare('2026-10', { CF_API_TOKEN: 't', CF_ACCOUNT_ID: 'a', CF_SITE_TAG: 's' }, falso);
  assert.deepEqual(v, { '/calculadoras/sesgo-y-sdi/': 7 });
});
