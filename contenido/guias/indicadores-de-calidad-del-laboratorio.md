---
titulo: "Indicadores de calidad del laboratorio: qué medir, cómo calcularlos y cómo leerlos"
fecha: 2026-11-13
resumen: "Cómo armar la ficha de un indicador, cuáles medir (rechazo de muestras, TAT, repeticiones, resultados críticos, reclamos, control externo), cómo calcular la tasa con su intervalo y su sigma, y cómo distinguir una señal real del azar con el gráfico p."
temas: ["Indicadores", "Gestión de la calidad", "Acreditación"]
---

Un **indicador de calidad** es una medida repetida en el tiempo que te dice si un proceso del laboratorio va bien o mal. Sirve para decidir con datos, para mostrar a la dirección cómo evoluciona el laboratorio y, en Chile, para demostrar en una acreditación que gestionas por resultados: varias características del estándar piden **indicadores con umbral y evaluación periódica**.

Esta guía explica cómo definir cada indicador, cuáles medir primero, cómo calcularlos y, sobre todo, cómo leerlos sin reaccionar al azar.

## 1. La ficha de un indicador

Un indicador sin ficha es una opinión. Para cada uno define por escrito:

| Campo | Ejemplo de qué escribir |
|---|---|
| **Nombre** | «Muestras rechazadas» |
| **Objetivo** | Qué decisión ayuda a tomar |
| **Fórmula** | Numerador y denominador, con unidades |
| **Fuente de los datos** | Dónde sale cada número (LIS, registro, formulario) |
| **Meta o umbral** | Cuánto es aceptable; lo define tu laboratorio |
| **Frecuencia** | Mensual, por turno, etc. |
| **Responsable** | Quién calcula, quién analiza |
| **Qué se hace si no se cumple** | Acción esperada |

Dos reglas que ahorran discusiones: **define el denominador con cuidado** (¿todas las muestras o solo las de urgencia?) y **no cambies la fórmula** a mitad de año sin dejarlo anotado, porque rompes la comparación.

## 2. Qué medir primero

No necesitas veinte indicadores. Parte con los que cubren los riesgos más comunes:

- **Rechazo de muestras** (por causa): muestras rechazadas / muestras recibidas. Mide la calidad de la etapa preanalítica.
- **Tiempo de respuesta (TAT)**: tiempo entre la recepción o la toma y el informe, resumido con la mediana y el percentil 90. Ver [Tiempos de respuesta](/herramientas/tiempos-de-respuesta-tat/).
- **Repeticiones de exámenes**: exámenes repetidos / exámenes hechos. Señala problemas del método o de la muestra.
- **Resultados críticos notificados a tiempo**: ver [Resultados críticos](/guias/resultados-criticos-comunicacion-y-acreditacion/).
- **Reclamos**: reclamos recibidos y tiempo de respuesta. Ver [Reclamos, sugerencias y felicitaciones](/herramientas/reclamos-sugerencias-y-felicitaciones/).
- **Resultados del control externo**: proporción de resultados aceptables y tendencia del sesgo. Ver [Control de calidad externo](/guias/control-de-calidad-externo-sesgo-y-sdi/).

En el estándar chileno de acreditación, varios de estos aparecen como exigencia: un **indicador de problemas de toma de muestra** con umbral (preanalítica), un **indicador de TAT en urgencias** (analítica y postanalítica), uno de **resultados críticos** y otros de seguridad. Revisa qué corresponde a tu laboratorio en [Acreditación de laboratorios clínicos en Chile](/guias/acreditacion-laboratorio-clinico-chile/).

## 3. Calcular la tasa, con su incertidumbre

La mayoría de los indicadores son **tasas**:

**Tasa = eventos / total × 100**

Ejemplo: en un mes se recibieron 600 muestras y se rechazaron 18. La tasa es 18 / 600 × 100 = **3,0 %**.

Pero ese 3,0 % es una estimación. Con 600 muestras, el intervalo de confianza del 95 % (método de Wilson, que funciona bien con pocos eventos) va de **1,9 % a 4,7 %**. Si tu meta fuera 4 %, la tasa observada la cumple, pero con ese volumen no puedes afirmar con certeza que estés por debajo: la meta cae dentro del intervalo.

Dos consecuencias:

- **Un mes con pocos casos dice poco.** Junta períodos o compara tendencias antes de sacar conclusiones.
- Si la meta cae dentro del intervalo, **sigue midiendo** en vez de felicitar o castigar al equipo.

Puedes calcularlo con la calculadora [Indicador de calidad: tasa, intervalo y sigma](/calculadoras/indicadores-tasa-y-sigma/).

## 4. La métrica sigma, para comparar indicadores distintos

Para comparar indicadores muy distintos en una misma escala, la tasa se puede expresar en **sigma**:

**Sigma = z(1 − tasa) + 1,5**

(la convención Six Sigma con desplazamiento de 1,5). En el ejemplo, una tasa de 3,0 % equivale a sigma 3,4. Una tasa de 0,135 % da sigma 4,5. Mientras más alto el sigma, menos defectos. La meta de cada indicador la define tu laboratorio: el sigma permite comparar, no decide por ti.

## 5. ¿Es una señal o es azar?: el gráfico p

La tasa de un mes varía por azar aunque nada cambie. Reaccionar a cada subida o bajada es gastar energía en ruido. El **gráfico p** (gráfico de control para proporciones) te dice cuándo un cambio es una señal real:

- **Línea central:** la tasa promedio de todos los períodos.
- **Límites:** la línea central ± 3 errores estándar, que se ensanchan en los meses con menos muestras.
- **Señales:** un mes fuera de los límites, o **8 o más meses seguidos del mismo lado** de la línea central.

En el ejemplo, con una tasa promedio de 3,0 % y 600 muestras al mes, los límites van de 0,9 % a 5,1 %. Un mes con 4,0 % está dentro: es variación normal. Un mes con 5,5 % sale del límite superior: hay una causa especial y conviene buscarla.

Reglas para usarlo bien:

- Calcula los límites con un período en el que el proceso era **estable**. Si hubo un cambio importante, recalcula desde ahí.
- El gráfico muestra si el proceso es **estable**, no si **cumple la meta**: son preguntas distintas.
- Una mejora real aparece como un punto bajo el límite inferior o una racha bajo la línea central, y se mantiene después de la acción.

Herramienta: [Gráfico p de indicadores](/calculadoras/grafico-p-de-indicadores/).

## 6. Encontrar las causas: el diagrama de Pareto

Cuando un indicador sale mal, la pregunta siguiente es **por qué**. El diagrama de Pareto ordena las causas de mayor a menor frecuencia, con su porcentaje acumulado, y muestra las **causas vitales**: las pocas que sumadas explican cerca del 80 % de los casos. Atender primero la principal suele mover el indicador más que mejorar varias menores.

Ojo: la **frecuencia no es la gravedad**. Una causa poco frecuente pero grave puede merecer atención aunque no sea vital; combínalo con una priorización por riesgo ([AMEF en el laboratorio clínico](/guias/amef-laboratorio-clinico-gestion-de-riesgos/)). Y revisa que las categorías sean claras y excluyentes: si «Otros» pesa más que las causas principales, la clasificación necesita ajuste.

Herramienta: [Diagrama de Pareto](/calculadoras/pareto-de-causas/).

## 7. La revisión mensual

Una rutina simple, de 30 minutos al mes:

1. **Calcula** cada indicador con su fórmula y sus datos.
2. **Compara** con la meta, mirando el intervalo, no solo el número.
3. **Revisa la tendencia** en el gráfico p.
4. Si hay una señal, **busca las causas** con Pareto y registra una acción en [no conformidades y acciones correctivas](/herramientas/no-conformidades-y-acciones-correctivas/).
5. **Anota** las decisiones y quién las ejecuta.
6. **Presenta** el resultado a la dirección en la revisión periódica ([Revisión por la dirección](/herramientas/revision-por-la-direccion/)).

## 8. Errores frecuentes

- **Indicadores sin ficha** o con fórmulas que cambian de un mes a otro.
- **Reaccionar a cada variación** sin distinguir señal de azar.
- **Metas copiadas de otro laboratorio** sin considerar tu realidad.
- **Denominadores equivocados** (por ejemplo, rechazo sobre muestras que ni siquiera llegaron).
- **Demasiados indicadores**, que nadie revisa.
- No cerrar el ciclo: medir sin **actuar** ni verificar que la acción funcionó.

## 9. Preguntas frecuentes

**¿Qué es un indicador de calidad?** Una medida repetida en el tiempo que dice si un proceso va bien o mal, con una fórmula, una meta y un responsable.

**¿Cuántos indicadores necesito?** Los suficientes para cubrir tus riesgos principales y que alguien los revise cada mes. Parte con rechazo de muestras, TAT, repeticiones, resultados críticos, reclamos y control externo.

**¿Cómo se calcula una tasa?** Eventos / total × 100. Conviene mostrarla con su intervalo de confianza, sobre todo con pocos casos.

**¿Qué es el gráfico p?** Un gráfico de control para proporciones: muestra si la tasa de un período está dentro de la variación normal o es una señal real, con límites que dependen del tamaño de cada período.

**¿Quién fija la meta de un indicador?** Tu laboratorio, en su plan de calidad. Los gráficos de control muestran estabilidad, no si cumples la meta.

**¿Qué hago cuando un indicador sale mal?** Confirmar que es una señal y no azar, buscar las causas (Pareto), registrar una acción correctiva y verificar después que funcionó.

## Lista de verificación

- [ ] Cada indicador tiene su ficha: fórmula, fuente, meta, frecuencia y responsable.
- [ ] Mido, como mínimo, rechazo de muestras, TAT y resultados críticos.
- [ ] Calculo la tasa con su intervalo y no reacciono a un mes con pocos casos.
- [ ] Uso un gráfico p para distinguir señal de azar.
- [ ] Cuando hay una señal, busco causas y registro una acción.
- [ ] Reviso los indicadores cada mes y los presento en la revisión por la dirección.

Esta guía es material educativo y no reemplaza la normativa vigente ni el criterio de la jefatura del laboratorio.
