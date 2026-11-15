// Feed RSS de las novedades de ConsensusLab.
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { LINEAS_NOVEDADES, obtenerNovedades } from '../../lib/datos';

export const GET: APIRoute = async (context) => {
  const entradas = await obtenerNovedades();
  return rss({
    title: 'Novedades · ConsensusLab',
    description: 'Cambios de la plataforma, las guías y la empresa.',
    site: context.site!,
    customData: '<language>es-CL</language>',
    items: entradas.map((e) => ({
      title: e.data.titulo,
      pubDate: e.data.fecha,
      description: e.data.resumen,
      link: `/novedades/${e.id}/`,
      categories: [LINEAS_NOVEDADES[e.data.linea]],
      author: 'Sergio Inostroza',
    })),
  });
};
