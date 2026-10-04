// Lista pública de artículos de opinión (sin enlaces de amigo). La app ConsensusLab la lee para mostrar los
// artículos a sus usuarios; a los suscriptores les agrega el enlace de amigo guardado en la planilla privada.
import type { APIRoute } from 'astro';
import { obtenerOpinion } from '../../lib/datos';

export const GET: APIRoute = async ({ site }) => {
  const articulos = (await obtenerOpinion()).map((a) => ({
    slug: a.id,
    titulo: a.data.titulo,
    fecha: a.data.fecha.toISOString().slice(0, 10),
    resumen: a.data.resumen,
    temas: a.data.temas,
    enlace: a.data.enlace,
    pagina: new URL(`opinion/${a.id}/`, site).href,
  }));
  return new Response(JSON.stringify({ articulos }), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
