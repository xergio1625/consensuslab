# ConsensusLab

Sitio de herramientas de gestión, calidad y coordinación para tecnólogos médicos (TM) de laboratorio clínico.

- **Sitio publicado:** https://xergio1625.github.io/consensuslab/
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

---

## Trabajar en el computador

Requisitos: Node.js 22.12 o superior.

```bash
npm install        # una vez
npm run dev        # vista previa con recarga automática: http://localhost:4321/consensuslab/
npm run build      # compila y valida todas las fichas (lo mismo que hace GitHub)
```

## Estructura

```
contenido/
  herramientas/        una ficha .md por herramienta
  grupos.json          los 7 grupos
  _plantilla-ficha.md  plantilla para copiar
public/
  recursos/            archivos descargables (se publican tal cual)
src/
  content.config.ts    campos y validaciones de las fichas
  pages/               páginas del sitio (Astro exige este nombre de carpeta)
  plantillas/          estructura común (cabecera, pie, tema)
  componentes/         piezas reutilizables (tarjeta, cabecera, logo)
  estilos/global.css   colores (claro y oscuro) y estilos
  lib/                 utilidades (rutas, textos, lectura del contenido)
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
