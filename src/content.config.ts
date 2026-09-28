// Definición de las colecciones de contenido de ConsensusLab.
// Aquí se describe qué campos lleva cada ficha. Si una ficha tiene un error
// (falta un campo, un grupo no existe o un archivo no está subido), la
// compilación se detiene y muestra el problema.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Carpeta donde viven los archivos descargables (planillas, plantillas, PDF).
const CARPETA_RECURSOS = join(process.cwd(), 'public', 'recursos');

const grupos = defineCollection({
  loader: file('./contenido/grupos.json'),
  schema: z.object({
    numero: z.number().int().positive(),
    nombre: z.string(),
    nombre_corto: z.string(),
    descripcion: z.string(),
    jira: z.string().regex(/^PP-\d+$/).optional(),
  }),
});

const recurso = z
  .object({
    nombre: z.string(),
    tipo: z.enum(['excel', 'sheets', 'word', 'pdf', 'formulario', 'otro']),
    // Ruta dentro de public/recursos/, por ejemplo: registro-de-temperaturas/planilla.xlsx
    archivo: z.string().optional(),
    // Enlace externo, por ejemplo una copia de Google Sheets terminada en /copy
    enlace: z.url().optional(),
  })
  .superRefine((r, ctx) => {
    if (!r.archivo && !r.enlace) {
      ctx.addIssue({ code: 'custom', message: `El recurso «${r.nombre}» necesita «archivo» o «enlace».` });
    }
    if (r.archivo && !existsSync(join(CARPETA_RECURSOS, r.archivo))) {
      ctx.addIssue({
        code: 'custom',
        message: `No se encontró public/recursos/${r.archivo}. Sube el archivo o corrige la ruta.`,
      });
    }
  });

const herramientas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './contenido/herramientas' }),
  schema: z
    .object({
      titulo: z.string(),
      grupo: reference('grupos'),
      jira: z.string().regex(/^PP-\d+$/).optional(),
      estado: z.enum(['disponible', 'en-preparacion']),
      acceso: z.enum(['gratuito', 'suscripcion']).default('gratuito'),
      etiquetas: z.array(z.string()).default([]),
      // Relación con el software Consensus QC
      consensus_qc: z.enum(['existente', 'parcial', 'previsto', 'no']).default('no'),
      que_es: z.string(),
      problema: z.string(),
      // Descripción del recurso que se prepara (útil mientras la ficha está «en preparación»)
      recurso_previsto: z.string().optional(),
      recursos: z.array(recurso).default([]),
      // Módulo de la app ConsensusLab que implementa la herramienta (demo gratis + suscripción).
      app_modulo: z.string().regex(/^[a-z]{3,30}$/).optional(),
      relacionadas: z.array(reference('herramientas')).default([]),
      actualizado: z.coerce.date(),
    })
    .superRefine((h, ctx) => {
      if (h.estado === 'disponible' && h.recursos.length === 0 && !h.app_modulo) {
        ctx.addIssue({
          code: 'custom',
          message: 'Una herramienta «disponible» debe tener un recurso en «recursos» o un «app_modulo».',
        });
      }
    }),
});

export const collections = { grupos, herramientas };
