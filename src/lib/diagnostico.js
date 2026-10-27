// Autodiagnóstico del laboratorio: preguntas, puntaje por bloque y plan sugerido. Funciones puras (se prueban con `npm test`).
// Es una autoevaluación orientativa: no es una auditoría ni una certificación.

/** Respuestas: «si» = 2, «aveces» = 1, «no» = 0. */
export const PUNTOS = { si: 2, aveces: 1, no: 0 };

export const BLOQUES = [
  {
    id: 'a',
    titulo: 'Registros del día',
    preguntas: [
      '¿Sabes al comenzar el turno qué tareas del día están pendientes?',
      '¿Tus registros de temperatura quedan con fecha, hora y quién los hizo, y exigen una acción cuando algo sale de rango?',
      '¿Los documentos y las capacitaciones se avisan antes de vencer?',
    ],
    acciones: [
      { texto: 'Define qué tareas del turno son obligatorias y quién las firma, y empieza a dejarlas en un libro de novedades.', ruta: 'herramientas/libro-de-novedades-de-turno/' },
      { texto: 'Revisa cómo debería quedar un registro de temperaturas que un auditor acepte.', ruta: 'herramientas/registro-de-temperaturas/' },
    ],
  },
  {
    id: 'b',
    titulo: 'Control de calidad analítico',
    preguntas: [
      '¿Evalúas los controles con reglas definidas (por ejemplo Westgard) y no solo a ojo?',
      '¿Conoces el sesgo, el CV y la sigma de tus analitos principales?',
      '¿Cada desvío del control queda con su causa, su acción y quién lo cerró?',
    ],
    acciones: [
      { texto: 'Calcula el error total y la sigma de uno de tus analitos principales.', ruta: 'calculadoras/error-total-y-sigma/' },
      { texto: 'Compara tu resultado del control externo con el valor asignado.', ruta: 'calculadoras/sesgo-y-sdi/' },
      { texto: 'Lee la guía para armar un plan de control interno de calidad.', ruta: 'guias/plan-de-control-interno-de-calidad/' },
    ],
  },
  {
    id: 'c',
    titulo: 'Equipos e insumos',
    preguntas: [
      '¿Cada equipo tiene su bitácora de fallas y mantenciones, con la fecha de la próxima?',
      '¿Sabes qué lote de reactivo se usó cada día y cuándo vence?',
      '¿Pides los reactivos con un mínimo definido y no cuando «se acaba»?',
    ],
    acciones: [
      { texto: 'Calcula el punto de pedido y el stock de seguridad de un reactivo clave.', ruta: 'calculadoras/stock-y-punto-de-pedido/' },
      { texto: 'Revisa cómo llevar la bitácora de fallas y el tiempo detenido de tus equipos.', ruta: 'herramientas/estado-y-bitacora-de-equipos/' },
    ],
  },
  {
    id: 'd',
    titulo: 'Evidencia y auditoría',
    preguntas: [
      '¿Podrías mostrarle a un auditor, en menos de 10 minutos, los registros de un mes cualquiera?',
      '¿Las correcciones quedan con nombre y motivo, y no se sobrescriben?',
      '¿Tu jefatura recibe un informe mensual sin que alguien lo arme a mano?',
    ],
    acciones: [
      { texto: 'Ordena tus documentos con versión, responsable y fecha de revisión.', ruta: 'herramientas/control-documental/' },
      { texto: 'Mira cómo sería un informe mensual que se arma solo.', ruta: 'herramientas/informes-mensuales-automaticos/' },
    ],
  },
];

export const PLANES = {
  esencial: { nombre: 'Esencial', motivo: 'tu desafío está en ordenar los registros del día y la evidencia' },
  gestion: { nombre: 'Gestión', motivo: 'tu desafío está en los equipos, los reactivos y las compras' },
  qc: { nombre: 'Consensus QC', motivo: 'tu desafío está en el control de calidad analítico' },
  gestion_qc: { nombre: 'Gestión + Consensus QC', motivo: 'tienes varias áreas por ordenar y conviene un solo sistema' },
  institucional: { nombre: 'Institucional', motivo: 'tienes varias sedes o más de 15 personas registrando' },
};

/** Semáforo de un bloque de 0 a 6 puntos. */
export function semaforo(puntaje) {
  if (puntaje >= 5) return 'verde';
  if (puntaje >= 3) return 'amarillo';
  return 'rojo';
}

/**
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
  const masDebil = [...bloques].sort((x, y) => x.puntaje - y.puntaje)[0].id;

  let plan;
  if (contexto.sedes === '2omas' || contexto.usuarios === 'mas15') plan = 'institucional';
  else if (cuantos >= 3 || (debil.b && (debil.a || debil.c || debil.d))) plan = 'gestion_qc';
  else if (debil.b) plan = 'qc';
  else if (debil.c) plan = 'gestion';
  else if (debil.a || debil.d) plan = 'esencial';
  else plan = masDebil === 'b' ? 'qc' : masDebil === 'c' ? 'gestion' : 'esencial';

  // Tres acciones de esta semana: primero las del bloque más débil, luego las del siguiente.
  const orden = [...bloques].sort((x, y) => x.puntaje - y.puntaje || x.id.localeCompare(y.id));
  const acciones = orden.flatMap((o) => BLOQUES.find((b) => b.id === o.id).acciones).slice(0, 3);

  return { bloques, plan, cuantosDebiles: cuantos, acciones, total: bloques.reduce((s, b) => s + b.puntaje, 0) };
}
