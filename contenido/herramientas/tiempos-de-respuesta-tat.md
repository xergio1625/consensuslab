---
titulo: "Tiempos de respuesta (TAT)"
grupo: continuidad
jira: PP-75
estado: disponible
acceso: suscripcion
app_modulo: tat
etiquetas: []
consensus_qc: "no"
que_es: "Medición del tiempo desde la toma o recepción de la muestra hasta el informe, por examen, área y urgencia, con el porcentaje que cumple la meta."
problema: "El TAT es el indicador que más perciben médicos y pacientes; medirlo permite detectar cuellos de botella."
recurso_previsto: "Planilla de cálculo de TAT (mediana y percentil 90) a partir de una exportación del LIS."
relacionadas: [indicadores-de-calidad, derivaciones-a-laboratorios-externos, panel-del-dia-del-laboratorio]
actualizado: 2026-10-03
---

## Cómo usarla

1. **Define tus metas.** Una general para urgencias y otra para rutina (si no las defines, se usan 60 minutos y
   4 horas) y metas propias para los exámenes que lo necesiten: un hemocultivo no se puede medir con la meta de una
   glucosa. Acuérdalas con los servicios clínicos.
2. **Exporta los datos del LIS.** Un archivo CSV con una fila por examen y, al menos, el nombre del examen y las
   fechas y horas de recepción (o toma) y de informe. Si tiene la prioridad (urgente o rutina) y el área, mejor.
   Lo habitual es exportar un mes completo.
3. **Cárgalo en la app.** Elige el archivo o pega los datos. La app detecta las columnas y te muestra las primeras
   filas para que confirmes que cada dato está en su lugar. Si la fecha y la hora vienen en columnas separadas,
   también puedes indicarlo.
4. **Tus datos de pacientes no salen del computador.** Solo se envían el examen, el área, la prioridad y las dos
   horas de cada fila; columnas como nombre, RUT o folio se quedan en tu navegador. ConsensusLab guarda solo el
   resumen, no las filas.
5. **Lee los resultados.** Por prioridad, por área y por examen verás la **mediana**, el **percentil 90**, el máximo
   y el **porcentaje dentro de la meta**, con semáforo: verde 90 % o más, amarillo 75 % o más, rojo bajo eso.
6. **Busca los cuellos de botella.** Un percentil 90 muy lejos de la mediana indica que hay muestras que se quedan
   atrás: revisa turnos, corridas, validación y equipos detenidos en esas horas.
7. **Repítelo cada mes.** El porcentaje de urgencias y de rutina dentro de la meta aparece en el informe mensual.

## Cómo se calcula

- **TAT** = hora del informe − hora de inicio (recepción en el laboratorio o toma de muestra, según elijas).
- **Mediana**: la mitad de los exámenes se informó en ese tiempo o menos.
- **Percentil 90**: el 90 % se informó en ese tiempo o menos. Es el que mejor muestra los atrasos.
- Se descartan las filas con fechas ilegibles, con informe anterior al inicio, con más de 30 días o con textos que
  parecen datos de pacientes; la app muestra cuántas y por qué.

## Buenas prácticas

- **Mide siempre desde el mismo punto** (recepción o toma) para poder comparar meses.
- **Separa urgencias y rutina**: mezclarlas esconde los atrasos de las urgencias.
- **Mira el percentil 90, no solo la mediana**: los reclamos vienen de los exámenes que se atrasan.
- **Cruza el TAT con lo que pasó en el mes**: equipos detenidos, contingencias y derivaciones lo explican a menudo.

## Gratis y con suscripción

- **Gratis:** esta guía y la demo en línea con datos ficticios, que se borran al salir.
- **Con suscripción:** tus cargas mensuales del LIS con sus resultados guardados, metas por examen y el TAT en el
  informe mensual.
