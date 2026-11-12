---
titulo: "Error total permitido: cómo elegirlo para cada examen"
fecha: 2026-11-12
resumen: "Qué es el error total permitido (ETa o TEa), de dónde salen los modelos de Estocolmo y Milán, por qué el mismo examen puede aprobar o reprobar según la fuente y una lista de pasos para elegirlo y documentarlo."
temas: ["Control de calidad", "Error total permitido", "Sigma"]
---

El **error total permitido** (ETa, en inglés TEa o *allowable total error*) es la cantidad de error que un laboratorio acepta en un resultado antes de considerarlo inútil para la decisión clínica. Es el número contra el que se mide casi todo lo demás: el sigma, las reglas de Westgard que conviene usar, la frecuencia del control y si un método nuevo se acepta o no.

El problema es que **no existe un ETa único y oficial para cada examen**. Existen varias maneras de fijarlo, y la elección cambia el resultado de tu evaluación. Esta guía explica qué opciones hay, cuándo corresponde cada una y cómo dejar la decisión documentada.

## 1. Qué mide el ETa y cómo se usa

En el modelo clásico, el error total de un método se estima sumando su error sistemático y su error aleatorio:

**Error total = sesgo + 1,65 × DE** (con 95 % de confianza en un solo sentido)

Si ese error total es menor que el ETa, el método cumple. Con el mismo ETa se calcula el **sigma**: (ETa − sesgo) / CV, todo en porcentaje. Puedes hacerlo con la calculadora [Error total y sigma](/calculadoras/error-total-y-sigma/).

Fíjate en lo que implica: el ETa está en el numerador del sigma. Si cambias el ETa, cambia el sigma, aunque el método sea exactamente el mismo.

## 2. De dónde vienen los criterios: Estocolmo y Milán

Desde los años 60 se propusieron metas basadas en la variación biológica o en la opinión de los clínicos, y el error total como concepto apareció en 1974. Pero cada laboratorio, regulador y programa de control externo terminó usando su propia vara. Dos reuniones intentaron ordenar eso:

**Conferencia de Estocolmo (1999).** Acordó una jerarquía de cinco niveles para fijar especificaciones de calidad:

1. Efecto del desempeño analítico en los resultados clínicos.
2. Efecto en las decisiones clínicas, con datos de variación biológica u opinión de los clínicos.
3. Recomendaciones de grupos profesionales.
4. Metas fijadas por reguladores u organizadores de rondas de control externo.
5. Estado del arte: lo que los métodos logran hoy.

**Conferencia de Milán (2014).** Mantuvo la idea pero la simplificó en **tres modelos**:

- **Modelo 1: efecto sobre el resultado clínico.** Para exámenes con un papel central en una decisión y con puntos de corte definidos (por ejemplo colesterol, glucosa, HbA1c o troponinas). Un estudio directo de resultados en pacientes es muy difícil y costoso, por lo que el camino viable es estimar cuántos pacientes cambiarían de clasificación con cierto error.
- **Modelo 2: variación biológica.** Para exámenes que no definen una enfermedad concreta pero cuya concentración es estable y está bajo control del organismo (electrolitos, creatinina, ácido úrico, proteínas totales).
- **Modelo 3: estado del arte.** Para todo lo que no entre en los otros dos.

Lo que se acordó fue el **orden de preguntas**, no los números. En 2017 se publicó el criterio para decidir a qué modelo corresponde cada examen, pero cada laboratorio tiene que aplicarlo.

## 3. Por qué el mismo examen aprueba o reprueba según la fuente

Dos ejemplos de la literatura muestran lo que pasa cuando se cambia la vara:

- **El sodio.** Se mide con muy buena exactitud y aun así queda lejos de las especificaciones derivadas de variación biológica, porque el organismo lo regula de forma tan estricta que su variación natural es mínima. Un grupo de autores sostiene que las especificaciones del sodio no deberían basarse en la variación biológica. En otro estudio sobre un analizador, los resultados del sodio sugirieron que los ensayos de sodio necesitan mejorar para pacientes de urgencias. Es decir: según el enfoque, el sodio puede parecer «demasiado exigido» o «insuficiente».
- **El sigma.** En un estudio con 21 parámetros de química en un analizador, una forma de evaluar cumplió todas las metas de CLIA, y otra tuvo su peor desempeño frente a las metas de variación biológica deseable. El autor concluyó que el estado del arte era más razonable para la metodología Seis Sigma.

La consecuencia práctica es incómoda: **si evalúas un examen con varias especificaciones y eliges la que sale mejor después de ver el resultado, no estás evaluando nada**. Elige la vara antes y deja constancia del porqué.

## 4. Los límites de pruebas de aptitud no son metas

Los límites que usan los programas de pruebas de aptitud (por ejemplo los de CLIA en EE. UU., que se endurecieron en una revisión reciente) sirven para aprobar o reprobar a un laboratorio en una ronda. Son un **piso regulatorio**, no un objetivo de calidad. Según los resúmenes de la regla, la propia agencia advierte que no deben usarse como metas de desempeño. Usarlos como ETa mezcla lo mínimo exigible con lo que tu laboratorio debería buscar.

## 5. Error total o incertidumbre de medición

El modelo de error total domina la práctica en química clínica, pero otros campos de la metrología usan la **incertidumbre de medición**. La diferencia técnica: el modelo de error total trata el sesgo como una constante sin incertidumbre propia; los métodos de incertidumbre sí la consideran. La norma ISO 15189 pide estimar la incertidumbre de medida, y los dos enfoques se presentan hoy como complementarios, no como rivales. Si tu laboratorio se acredita, conviene tener ambos claros; la calculadora de [Incertidumbre de medición](/calculadoras/incertidumbre-de-medicion/) usa el enfoque de arriba hacia abajo.

## 6. Cómo elegir el ETa de un examen, paso a paso

1. **¿Para qué se usa el resultado?** Diagnóstico con punto de corte, seguimiento, tamizaje. Un mismo examen puede tener más de un uso, y la asignación a un modelo es por uso, no por examen.
2. **¿Hay puntos de decisión definidos en guías clínicas?** Si los hay, el examen es candidato al modelo 1: pregunta cuántos pacientes cambiarían de clasificación con cierto error.
3. **¿Está en estado estable y bajo control del organismo?** Si es así (electrolitos, creatinina), el modelo 2 es razonable, con una advertencia: en los muy regulados, como el sodio, la variación biológica puede ser inalcanzable. Usa la calculadora [ETa desde variabilidad biológica](/calculadoras/tea-variabilidad-biologica/) solo con datos de calidad conocida.
4. **¿La fuente de los datos es confiable?** Para variación biológica, existe una lista de verificación (BIVAC) que evalúa la calidad de cada estudio. En una revisión de 128 publicaciones, el 9 % recibió la peor nota («no aplicar en la práctica»). Revisa de dónde viene tu dato.
5. **¿Es alcanzable con los métodos disponibles hoy?** Si ningún sistema lo cumple, es una meta de investigación, no un requisito de rutina.
6. **¿Qué exige tu acreditador o tu programa de control externo?** Considéralo un piso, no un objetivo.
7. **Documenta la elección:** modelo, fuente, año, valor, motivo y fecha de revisión.
8. **Mira la sensibilidad.** Si el examen aprueba con una fuente y reprueba con otra, esa información importa para decidir.
9. **Trata el ETa como el peor caso permitido, no como el error habitual.** Cerca de un punto de corte, un método que «cumple» puede igual clasificar mal a un paciente.

## 7. Lista de verificación

- [ ] Cada examen tiene un solo ETa, elegido antes de evaluar el resultado.
- [ ] Está anotado de qué modelo viene (clínico, variación biológica, estado del arte) y la fuente exacta.
- [ ] Los límites de pruebas de aptitud no se usan como metas.
- [ ] Para los exámenes muy regulados se revisó si la variación biológica es alcanzable.
- [ ] Hay una fecha de revisión del ETa.
- [ ] El ETa se usa de forma coherente en sigma, reglas de control y verificación de métodos.

Si buscas cómo ese número entra en el plan de control de cada examen, lee la [Guía para armar un plan de control interno de calidad](/guias/plan-de-control-interno-de-calidad/). Y para ver por qué el laboratorio terminó con tantas varas distintas, mira [Nos ponemos de acuerdo después del escándalo](/opinion/consensos-despues-del-escandalo/).

## Referencias

- Fraser CG. The 1999 Stockholm Consensus Conference on quality specifications in laboratory medicine. *Clin Chem Lab Med*. 2015;53(6):837-840. [doi:10.1515/cclm-2014-0914](https://doi.org/10.1515/cclm-2014-0914)
- Sandberg S, Fraser CG, Horvath AR, et al. Defining analytical performance specifications: Consensus Statement from the 1st Strategic Conference of the EFLM. *Clin Chem Lab Med*. 2015;53(6):833-835. [doi:10.1515/cclm-2015-0067](https://doi.org/10.1515/cclm-2015-0067)
- Ceriotti F, Fernandez-Calle P, Klee GG, et al. Criteria for assigning laboratory measurands to models for analytical performance specifications defined in the 1st EFLM Strategic Conference. *Clin Chem Lab Med*. 2017;55(2):189-194. [doi:10.1515/cclm-2016-0091](https://doi.org/10.1515/cclm-2016-0091)
- Aarsand AK, Røraas T, Fernandez-Calle P, et al. The Biological Variation Data Critical Appraisal Checklist: a standard for evaluating studies on biological variation. *Clin Chem*. 2018;64(3):501-514. [doi:10.1373/clinchem.2017.281808](https://doi.org/10.1373/clinchem.2017.281808)
- Oosterhuis WP, Theodorsson E. Total error vs. measurement uncertainty: revolution or evolution? *Clin Chem Lab Med*. 2016;54(2):235-239. [doi:10.1515/cclm-2015-0997](https://doi.org/10.1515/cclm-2015-0997)
- Oosterhuis WP, Coskun A, Sandberg S, Theodorsson E. Performance specifications for sodium should not be based on biological variation. *Clin Chim Acta*. 2023;540:117221. [doi:10.1016/j.cca.2023.117221](https://doi.org/10.1016/j.cca.2023.117221)
- Rotgers E, Lamberg T, Pihlajamaa T, et al. Verifying measurements on Siemens Atellica instruments using clinically acceptable analytical performance specifications. *Scand J Clin Lab Invest*. 2023;83(6):408-416. [doi:10.1080/00365513.2023.2253422](https://doi.org/10.1080/00365513.2023.2253422)
- Keleş M. Evaluation of the clinical chemistry tests analytical performance with Sigma Metric by using different quality specifications. *Biochem Med*. 2022;32(1):010703. [doi:10.11613/BM.2022.010703](https://doi.org/10.11613/BM.2022.010703)

Esta guía es material educativo y no reemplaza la normativa vigente, las instrucciones de tu entidad acreditadora ni el criterio de la jefatura del laboratorio.
