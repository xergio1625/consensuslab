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

## Videos

Hay espacios reservados con proporción 16:9 (componente `src/componentes/EspacioVideo.astro`), así que agregar un
video no mueve el contenido. No hace falta tocar páginas:

- **Portada, Consensus QC y Planes:** llena la entrada correspondiente en `src/lib/videos.ts` (`youtube` con el ID del
  video, o `src` con un archivo de `public/`, más `poster`). Mientras estén en `null`, Consensus QC y Planes muestran
  «Video próximamente» y la portada muestra la maqueta ilustrada.
- **Fichas de herramientas:** agrega `video: <ID de YouTube>` en el encabezado de la ficha. Sin ese campo no se muestra nada.
- **Largos (más de ~30 s):** súbelos a YouTube. Se cargan solo al hacer clic (`youtube-nocookie`), sin cookies antes.
- **Clips cortos en bucle (8–15 s, menos de 1,5 MB, WebM o MP4 sin audio):** van en `public/` con `bucle: true`. Se pausan
  solos fuera de pantalla, traen botón de pausa y no se reproducen si la persona pidió menos movimiento o ahorro de datos.

## Animaciones: cómo mantener el estilo

Todo el movimiento está en `src/estilos/global.css` (bloques «Fase 2», «Fase 3» y «Fase 4») y es CSS puro, con
muy poco JavaScript (contadores de la portada, destello de resultados, video). Reglas para sumar más:

- **Usa los tokens:** `--ease-out`, `--ease-in-out`, `--dur-1` (.15 s), `--dur-2` (.3 s), `--dur-3` (.6 s).
- **Revelado al scroll:** una tarjeta o sección nueva dentro de `.rejilla` o `.seccion-cabeza` ya aparece sola.
  Para otro elemento, copia la regla `animation: revelar … backwards` con `animation-timeline: view()` (usa
  `backwards`, no `both`, o el `transform` queda fijo y el hover deja de funcionar).
- **Calculadoras:** cualquier bloque `.calc-cifras > div` destella al cambiar; no hay que tocar el script de la calculadora.
- **Nada puede ser lo único que transmite información:** el movimiento acompaña, el texto manda.
- **Sin parpadeos** (más de 3 destellos por segundo) y sin animaciones infinitas que no se puedan detener.
- **Reducir animaciones:** el sistema (`prefers-reduced-motion`) y el interruptor «Reducir animaciones» del pie anulan
  *todas* las animaciones y transiciones con una sola regla. Si un script anima algo, debe revisar
  `matchMedia('(prefers-reduced-motion: reduce)')` y `document.documentElement.dataset.movimiento === 'reducido'`.
- **Presupuesto:** sin librerías de animación; la portada pesa hoy ~32 KB de HTML con ~7 KB de JavaScript en línea
  y desplazamiento de diseño (CLS) igual a 0. Si una mejora lo empeora, no entra.

## Artículos de opinión

El sitio es el lugar oficial de los artículos: `/opinion/` reúne todo lo escrito. Hay dos tipos de archivo en
`contenido/opinion/`:

- **Artículo del sitio (con texto):** el .md tiene el artículo completo debajo del encabezado. Se publica en
  `consensuslab.cl/opinion/<nombre-del-archivo>/`, entra a Google y al feed RSS (`/opinion/rss.xml`).
- **Artículo solo de Medium (sin texto):** el .md tiene solo el encabezado con `enlace`. La tarjeta lleva a Medium.
  `npm run medium` crea estos archivos a partir del feed de Medium (los 10 más recientes).

### Publicar un artículo nuevo en el sitio y copiarlo a Medium

1. Crea `contenido/opinion/titulo-corto-sin-tildes.md`:

   ```markdown
   ---
   titulo: "Título del artículo"
   fecha: 2026-10-06
   resumen: "Una o dos frases para Google y las redes (máximo 320 caracteres)."
   temas: ["Calidad", "Laboratorio clínico"]
   imagen: "opinion/titulo-corto.jpg"   # opcional: imagen en public/opinion/
   ---

   Texto del artículo en Markdown: párrafos separados por una línea en blanco, ## para subtítulos,
   **negrita**, [enlaces](https://…), > citas y listas con guiones.
   ```

2. Publica (commit y push) y espera a que el sitio se actualice.
3. En Medium, entra a `https://medium.com/p/import`, pega la dirección del artículo en el sitio y revisa el
   borrador (imágenes, subtítulos) antes de publicar. Medium lo marca como «Originally published at
   consensuslab.cl» y apunta a tu sitio como original (enlace canónico).
4. Agrega al .md la línea `enlace: "https://medium.com/@xergio.1625/…"` con la dirección de la copia en Medium.
   El artículo mostrará «También publicado en Medium».

Para un artículo que ya estaba en Medium y pasa al sitio: copia el texto al .md (paso 1) y, en Medium, abre la
historia › Configuración › Configuración avanzada › «Personalizar enlace canónico» y pon la dirección del sitio.

Un artículo que escribes solo para Medium (otro tema) no necesita nada más: `npm run medium` lo agrega a la lista.

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
  opinion/             un artículo por archivo (texto completo, o solo el enlace si vive en Medium)
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

## Indexación en Google

Activa desde el 4 de octubre de 2026 (`INDEXAR` en `src/lib/sitio.ts`). Sitemap en `/sitemap-index.xml`. Las fichas
en preparación llevan `noindex` y quedan fuera del sitemap hasta que tengan su guía.

## Dominio

https://consensuslab.cl/ (NIC Chile → DNS en Cloudflare, sin proxy → GitHub Pages con HTTPS).

## Licencia

Ver [LICENCIA.md](LICENCIA.md).
