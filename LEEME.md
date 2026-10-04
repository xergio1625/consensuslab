# ConsensusLab

Sitio de herramientas de gestión, calidad y coordinación para profesionales de laboratorio clínico.

- **Sitio publicado:** https://consensuslab.cl/
- **Tecnología:** [Astro](https://astro.build) (sitio estático) + GitHub Pages.
- **Catálogo de trabajo:** Jira `sergio-personal`, proyecto PP (flujos PP-63 a PP-69, herramientas PP-70 a PP-111).

---

## Agregar o actualizar una herramienta (sin tocar código)

1. Copia `contenido/_plantilla-ficha.md` a `contenido/herramientas/` con un nombre corto en minúsculas y con guiones
   (por ejemplo `libro-de-novedades-de-turno.md`). Ese nombre será la dirección de la ficha.
2. Completa los campos de arriba (`titulo`, `grupo`, `que_es`, `problema`…) y escribe el paso a paso debajo.
3. Si hay un archivo descargable, déjalo en `public/recursos/<nombre-de-la-herramienta>/` y agrégalo en `recursos:`.
4. Cambia `estado:` a `disponible` y actualiza la fecha en `actualizado:`.
5. Guarda, haz commit y `git push`. El sitio se publica solo en 1 o 2 minutos (pestaña **Actions** en GitHub).

Si algo está mal escrito (un grupo que no existe, un archivo que no se subió, una herramienta «disponible» sin
recurso), la publicación se detiene y GitHub muestra el motivo en la pestaña **Actions**.

> ⚠️ **Todo lo que está en este repositorio es público.** Nunca subas datos de pacientes ni material del área de
> suscripción. Los recursos son plantillas en blanco o con datos de ejemplo.

### Campos de una ficha

| Campo | Valores | Obligatorio |
|---|---|---|
| `titulo` | texto | sí |
| `grupo` | `continuidad`, `insumos`, `personal`, `calidad`, `usuarios`, `administracion`, `bioseguridad` | sí |
| `estado` | `en-preparacion`, `disponible` | sí |
| `que_es`, `problema` | texto | sí |
| `actualizado` | fecha `AAAA-MM-DD` | sí |
| `acceso` | `gratuito` (predeterminado), `suscripcion` | no |
| `etiquetas` | lista, por ejemplo `[prioridad-coordinador]` | no |
| `consensus_qc` | `existente`, `parcial`, `previsto`, `"no"` | no |
| `jira` | clave, por ejemplo `PP-76` | no |
| `recurso_previsto` | texto que se muestra mientras la ficha está en preparación | no |
| `recursos` | lista de `nombre` + `tipo` + `archivo` o `enlace` | sí, si está `disponible` |
| `relacionadas` | nombres de archivo de otras fichas, sin `.md` | no |

Tipos de recurso: `excel`, `sheets`, `word`, `pdf`, `formulario`, `otro`. En enlaces de Google Sheets, usa la
dirección terminada en `/copy` para que cada persona haga su propia copia.

## Agregar un prompt de IA

1. Copia `contenido/_plantilla-prompt.md` en `contenido/prompts/` con un nombre en minúsculas y guiones
   (será la dirección: `/prompts/nombre-del-prompt/`).
2. Escribe el prompt en el campo `prompt`. Lo que la persona debe completar va **[EN MAYÚSCULAS ENTRE CORCHETES]**:
   la página lo resalta y cuenta los campos. Cada prompt debe tener al menos uno.
3. Elige la `categoria`: `documentos`, `calidad`, `control-de-calidad`, `equipo`, `comunicacion`, `coordinacion`
   o `planillas`. En `herramientas` pon las fichas relacionadas: el prompt aparecerá también en esas fichas.
4. Debajo, escribe «Cómo usarlo» y «Revisa siempre». Todo prompt debe pedir que no se ingresen datos de pacientes.

## Calculadoras de calidad

Las fórmulas están en `src/lib/calidad.js` (funciones puras, probadas con `npm test`); cada calculadora tiene su
página en `src/pages/calculadoras/` y su entrada en `src/lib/calculadoras.ts` (título, resumen y fichas donde se
recomienda). El cálculo ocurre en el navegador: no se envía ni se guarda nada.

## Artículos de opinión (Medium)

La sección `/opinion/` solo enlaza a Medium; el texto completo vive allá. «Opinión» aparece en el menú cuando hay al
menos un artículo.

- **Automático:** con `MEDIUM_PERFIL` completo en `src/lib/sitio.ts`, ejecuta `npm run medium`. Crea un archivo en
  `contenido/opinion/` por cada artículo nuevo (Medium entrega los 10 más recientes). Revisa el resumen y publica.
- **A mano:** crea `contenido/opinion/nombre.md` con este contenido:

  ```yaml
  ---
  titulo: "Título del artículo"
  enlace: "https://medium.com/@usuario/titulo-del-articulo-abc123"
  fecha: 2026-09-28
  resumen: "Una o dos frases (máximo 320 caracteres)."
  temas: ["calidad", "gestión"]
  ---
  ```

---

## Trabajar en el computador

Requisitos: Node.js 22.12 o superior.

```bash
npm install        # una vez
npm run dev        # vista previa con recarga automática: http://localhost:4321/
npm run build      # compila y valida todas las fichas (lo mismo que hace GitHub)
```

## Estructura

```
contenido/
  herramientas/        una ficha .md por herramienta
  prompts/             un prompt de IA .md por archivo
  opinion/             un enlace a un artículo de Medium por archivo
  grupos.json          los 7 grupos
  _plantilla-ficha.md  plantilla para copiar
  _plantilla-prompt.md plantilla de prompt para copiar
public/
  recursos/            archivos descargables (se publican tal cual)
src/
  content.config.ts    campos y validaciones de las fichas
  pages/               páginas del sitio (Astro exige este nombre de carpeta)
  plantillas/          estructura común (cabecera, pie, tema)
  componentes/         piezas reutilizables (tarjeta, cabecera, logo)
  estilos/global.css   colores (claro y oscuro) y estilos
  lib/                 utilidades (rutas, textos, lectura del contenido)
tools/importar-medium.mjs  importa artículos nuevos de Medium (npm run medium)
.github/workflows/     publicación automática en GitHub Pages
```

## Indexación en Google (desactivada por ahora)

Mientras el sitio se arma, todas las páginas llevan `noindex` para que Google no las muestre. Para activarla,
cambia `INDEXAR` a `true` en `src/lib/sitio.ts`.

## Dominio propio (más adelante)

En `astro.config.mjs`, cambia `site` por el dominio y `base` por `'/'`. Luego configura el dominio en
GitHub → Settings → Pages.

## Licencia

Ver [LICENCIA.md](LICENCIA.md).
