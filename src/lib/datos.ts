// Lectura del contenido, ya ordenado, para usar en las páginas.
import { getCollection } from 'astro:content';

export async function obtenerGrupos() {
  const grupos = await getCollection('grupos');
  return grupos.sort((a, b) => a.data.numero - b.data.numero);
}

export async function obtenerHerramientas() {
  const herramientas = await getCollection('herramientas');
  return herramientas.sort((a, b) => a.data.titulo.localeCompare(b.data.titulo, 'es'));
}

/** Herramientas agrupadas en el orden de los grupos. */
export async function obtenerCatalogo() {
  const [grupos, herramientas] = await Promise.all([obtenerGrupos(), obtenerHerramientas()]);
  return grupos.map((grupo) => ({
    grupo,
    herramientas: herramientas.filter((h) => h.data.grupo.id === grupo.id),
  }));
}
