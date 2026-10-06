// Feed RSS de los artículos publicados en el sitio (los que viven solo en Medium tienen su propio feed allá).
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { enSitio, obtenerOpinion } from '../../lib/datos';

export const GET: APIRoute = async (context) => {
  const articulos = (await obtenerOpinion()).filter(enSitio);
  return rss({
    title: 'Opinión · ConsensusLab',
    description: 'Artículos de Sergio Inostroza sobre gestión del laboratorio clínico, calidad y la profesión.',
    site: context.site!,
    customData: '<language>es-CL</language>',
    items: articulos.map((a) => ({
      title: a.data.titulo,
      pubDate: a.data.fecha,
      description: a.data.resumen,
      link: `/opinion/${a.id}/`,
      categories: a.data.temas,
      author: 'Sergio Inostroza',
    })),
  });
};
