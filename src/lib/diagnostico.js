// Autodiagnóstico del laboratorio: preguntas, puntaje por bloque y plan sugerido. Funciones puras (se prueban con `npm test`).
// Mide si el plan de calidad está definido, si se aplica igual en cada turno, qué lo sostiene y si la dirección lo ve.
// Es una autoevaluación orientativa: no es una auditoría ni una certificación.

/** Respuestas: «si» = 2, «aveces» = 1, «no» = 0. */
export const PUNTOS = { si: 2, aveces: 1, no: 0 };

export const BLOQUES = [
  {
    id: 'a',
    titulo: 'El plan de calidad',
    preguntas: [
      '¿Tienes por escrito, para cada analito principal, el error total permitido y las reglas con que se aceptan o rechazan los controles?',
      '¿Está definido qué hace el tecnólogo ante cada alarma: repetir, recalibrar, avisar, liberar o no liberar resultados?',
      '¿Alguien con autoridad revisa y actualiza ese plan cuando cambia un lote, un equipo o un método?',
    ],
    acciones: [
      { texto: 'Lee la guía para armar un plan de control interno de calidad.', ruta: 'guias/plan-de-control-interno-de-calidad/' },
      { texto: 'Define el error total permitido de un analito con la variabilidad biológica.', ruta: 'calculadoras/tea-variabilidad-biologica/' },
      { texto: 'Calcula el error total y la sigma de uno de tus analitos principales.', ruta: 'calculadoras/error-total-y-sigma/' },
    ],
  },
  {
    id: 'b',
    titulo: 'Aplicación en cada turno',
    preguntas: [
      '¿Dos tecnólogos distintos toman la misma decisión frente al mismo resultado de control?',
      '¿Puedes ver cada día si se procesaron todos los controles que exige el plan?',
      '¿Cada desvío queda con su causa, su acción y quién lo cerró?',
    ],
    acciones: [
      { texto: 'Revisa en un gráfico de Levey-Jennings cómo se ve un control con sus reglas.', ruta: 'calculadoras/levey-jennings/' },
      { texto: 'Compara tu resultado del control externo con el valor asignado.', ruta: 'calculadoras/sesgo-y-sdi/' },
      { texto: 'Calcula la media, la DE y el CV de una serie de controles.', ruta: 'calculadoras/estadistica-del-control/' },
    ],
  },
  {
    id: 'c',
    titulo: 'Lo que sostiene el plan',
    preguntas: [
      '¿Sabes cuánto te durará cada lote de control y de reactivo con tu consumo real?',
      '¿Compras controles y reactivos según tu consumo y tu plan, y no por costumbre?',
      '¿Cada equipo tiene su bitácora de fallas, mantenciones y temperaturas, con una acción cuando algo sale de rango?',
    ],
    acciones: [
      { texto: 'Calcula el punto de pedido y el stock de seguridad de un reactivo clave.', ruta: 'calculadoras/stock-y-punto-de-pedido/' },
      { texto: 'Revisa cómo llevar la bitácora de fallas y el tiempo detenido de tus equipos.', ruta: 'herramientas/estado-y-bitacora-de-equipos/' },
      { texto: 'Mira cómo debería quedar un registro de temperaturas que un auditor acepte.', ruta: 'herramientas/registro-de-temperaturas/' },
    ],
  },
  {
    id: 'd',
    titulo: 'Dirección y evidencia',
    preguntas: [
      '¿La dirección ve, sin pedirlo, si el plan se está cumpliendo (un informe mensual, por ejemplo)?',
      '¿Podrías mostrarle a un auditor, en menos de 10 minutos, los registros y las decisiones de un mes cualquiera?',
      '¿Las correcciones quedan con nombre y motivo, y no se sobrescriben?',
    ],
    acciones: [
      { texto: 'Mira cómo sería un informe mensual que se arma solo.', ruta: 'herramientas/informes-mensuales-automaticos/' },
      { texto: 'Ordena tus documentos con versión, responsable y fecha de revisión.', ruta: 'herramientas/control-documental/' },
    ],
  },
];

export const PLANES = {
  esencial: { nombre: 'Esencial', motivo: 'tu mayor brecha está en los registros del día y en que la dirección tenga evidencia de lo que se hace' },
  gestion: { nombre: 'Gestión', motivo: 'lo que sostiene tu plan (equipos, reactivos y compras) está sin ordenar' },
  qc: { nombre: 'Consensus QC', motivo: 'tu desafío está en definir el plan de calidad y en que se aplique igual en cada turno' },
  gestion_qc: { nombre: 'Gestión + Consensus QC', motivo: 'varias áreas necesitan ordenarse y conviene que usen la misma información' },
  institucional: { nombre: 'Institucional', motivo: 'tienes varias sedes o más de 15 personas registrando' },
};

/** Semáforo de un bloque de 0 a 6 puntos. */
export function semaforo(puntaje) {
  if (puntaje >= 5) return 'verde';
  if (puntaje >= 3) return 'amarillo';
  return 'rojo';
}

/**
 * Los bloques A y B (el plan y su aplicación) los resuelve Consensus QC; el C, Gestión; el D, el plan Esencial.
 * @param {Record<string, number[]>} respuestas puntos (0 a 2) de cada pregunta, por bloque (`a` a `d`).
 * @param {{ usuarios?: string, sedes?: string }} contexto `usuarios`: «hasta5» | «6a15» | «mas15»; `sedes`: «1» | «2omas».
 */
export function evaluar(respuestas, contexto = {}) {
  const bloques = BLOQUES.map((b) => {
    const puntaje = (respuestas[b.id] ?? []).reduce((s, x) => s + x, 0);
    return { id: b.id, titulo: b.titulo, puntaje, semaforo: semaforo(puntaje), debil: puntaje <= 4 };
  });
  const debil = Object.fromEntries(bloques.map((b) => [b.id, b.debil]));
  const cuantos = bloques.filter((b) => b.debil).length;
  const calidadDebil = debil.a || debil.b;
  const masDebil = [...bloques].sort((x, y) => x.puntaje - y.puntaje || x.id.localeCompare(y.id))[0].id;

  let plan;
  if (contexto.sedes === '2omas' || contexto.usuarios === 'mas15') plan = 'institucional';
  else if (cuantos >= 3 || (calidadDebil && (debil.c || debil.d))) plan = 'gestion_qc';
  else if (calidadDebil) plan = 'qc';
  else if (debil.c) plan = 'gestion';
  else if (debil.d) plan = 'esencial';
  else plan = masDebil === 'a' || masDebil === 'b' ? 'qc' : masDebil === 'c' ? 'gestion' : 'esencial';

  // Tres acciones de esta semana: primero las del bloque más débil, luego las del siguiente.
  const orden = [...bloques].sort((x, y) => x.puntaje - y.puntaje || x.id.localeCompare(y.id));
  const acciones = orden.flatMap((o) => BLOQUES.find((b) => b.id === o.id).acciones).slice(0, 3);

  return { bloques, plan, cuantosDebiles: cuantos, acciones, total: bloques.reduce((s, b) => s + b.puntaje, 0) };
}
