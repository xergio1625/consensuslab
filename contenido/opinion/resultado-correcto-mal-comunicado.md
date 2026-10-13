---
titulo: "El resultado correcto, mal comunicado"
serie: "El costo de decidir (o no decidir) en salud pública"
fecha: 2026-10-13
resumen: "Durante años la creatinina salió sin el VFG junto al resultado: cada médico lo calculaba por su cuenta, con la fórmula que tuviera a mano. Informarlo no cuesta una licitación, y aun así quedó pendiente."
temas: ["Salud pública", "Laboratorio clínico", "Gestión", "Control de calidad"]
imagen: "opinion/resultado-correcto-mal-comunicado/imagen-1.jpg"
---

*Serie «El costo de decidir (o no decidir) en salud pública» · episodio 4*

![Un sello de goma con la marca «Aprobado» cae sobre un vaso de precipitados agrietado](/opinion/resultado-correcto-mal-comunicado/imagen-1.jpg)

## La fórmula que cada quien calculaba a su manera

Volvamos al mismo caso de laboratorio clínico que ya revisamos en [el episodio anterior de creatinina](/opinion/el-costo-de-medir-barato/), pero mirando un ángulo distinto. Durante años, los informes de creatininemia de ese laboratorio salieron sin el VFG (la tasa de filtración glomerular estimada) calculado junto al resultado. No faltaba el dato crítico (la creatinina estaba ahí), faltaba su traducción a la cifra que un médico realmente usa para decidir.

¿Qué pasa cuando falta esa traducción? No es que el médico se quede sin VFG: es que cada uno termina calculándolo por su cuenta, con la fórmula que tiene a mano, muchas veces sacada de una búsqueda rápida en internet. Dos médicos, mismo paciente, mismo resultado de creatinina, dos VFG distintos, y dos decisiones clínicas potencialmente distintas, no por un error de medición, sino por un eslabón de comunicación que el laboratorio nunca cerró.

## El número que importó nunca fue la creatinina sola

La creatininemia, como número aislado, le dice relativamente poco a un médico que no sea nefrólogo: su valor normal cambia con la edad, el sexo y la masa muscular del paciente, así que el mismo resultado puede ser normal en una persona y preocupante en otra. El VFG resuelve ese problema: toma la creatinina y la combina con esas variables en una fórmula que entrega un número directamente interpretable, la función renal estimada, en las mismas unidades para cualquier paciente.

Por eso las guías KDOQI del 2002 establecieron el VFG, y no la creatinina cruda, como la herramienta principal para detectar la enfermedad renal crónica de forma precoz: un VFG bajo 60 mL/min/1.73 m² ya es clínicamente relevante y debería activar una respuesta, sin que el médico tenga que hacer ese cálculo mentalmente cada vez. Cuando el laboratorio entrega la creatinina sin el VFG, le está devolviendo al médico un paso de trabajo que el laboratorio está en mejor posición de resolver una sola vez, de forma estandarizada, que cada médico por separado, cada vez.

> **Verifica el cálculo de tu sistema:** [Filtrado glomerular CKD-EPI 2021](/calculadoras/filtrado-glomerular-ckd-epi/), con casos de prueba y su resultado esperado.

## Cuando el dato de entrada ya viene torcido

![Una balanza antigua de bronce con una piedra en un platillo y el otro vacío](/opinion/resultado-correcto-mal-comunicado/imagen-2.jpg)

Todo lo anterior asume que el VFG parte de una creatinina confiable. Pero cuando esa creatinina se mide con Jaffé y sus interferencias conocidas, el error no se queda en el número aislado: se traslada directo al VFG, porque la fórmula toma ese dato y lo procesa dentro de una ecuación que no tiene cómo saber que ya viene sesgado. Una creatinina inflada por una interferencia analítica no solo desvía esa lectura puntual: desvía la estimación completa de función renal que el médico va a usar para decidir.

Hay un segundo mecanismo, independiente del método de medición, que tiene que ver con la fisiología del propio riñón dañado. A medida que el daño renal avanza y la filtración glomerular cae, el riñón compensa aumentando la secreción tubular activa de creatinina: la elimina por una vía distinta a la filtración, justo cuando la filtración empieza a fallar. El resultado es que la creatinina sérica sube menos de lo que subiría si dependiera solo de la filtración, y el VFG calculado a partir de ella termina subestimando la gravedad real del daño, precisamente en las etapas donde más importa detectarlo a tiempo.

Las fórmulas que estiman el VFG (MDRD, CKD-EPI) incorporan edad y sexo justamente para compensar parte de esta variabilidad, y por la misma lógica logran compensar razonablemente bien el efecto de la secreción tubular: es un fenómeno que, a nivel poblacional, se comporta de forma bastante predecible según el grado de daño renal, y eso es justo lo que una fórmula puede ajustar. El clearance de creatinina, la alternativa más directa, que mide la depuración real en orina de 24 horas, tiene el problema inverso: al medir la eliminación total de creatinina sin distinguir cuánta viene de la filtración y cuánta de la secreción tubular compensatoria, entrega un VFG más alto del real, precisamente porque no compensa ese fenómeno como sí lo hacen las fórmulas. Y además es poco práctico para el paciente: implica cargar un bidón recolectando toda la orina durante todo el día.

Lo que ninguna fórmula puede hacer es asegurar que la creatinina de entrada esté bien medida. Una fórmula ajusta lo que es predecible a nivel poblacional, pero no tiene cómo saber si esa creatinina viene de un método enzimático confiable o de un Jaffé con una interferencia analítica puntual: eso depende enteramente de cómo mide el laboratorio, no de qué fórmula se use después. Existen otras formas de esquivar esa dependencia del método de medición (la cistatina C, por ejemplo) que merecen su propio espacio más adelante; por ahora basta con tener claro que el VFG hereda los errores de la creatinina que no son predecibles, aunque compense bastante bien los que sí lo son.

> **Mide cuánto error entra al cálculo:** [Error total y sigma](/calculadoras/error-total-y-sigma/) · [Sesgo y SDI](/calculadoras/sesgo-y-sdi/) · [Estadística del control](/calculadoras/estadistica-del-control/)

## Una recomendación que suena obvia y por eso mismo se salta

El trabajo conjunto de 2023 entre la Sociedad Latinoamericana de Nefrología e Hipertensión (SLANH) y la Confederación Latinoamericana de Bioquímica Clínica (COLABIOCLI) es explícito en este punto: recomienda a los laboratorios clínicos informar el VFG por ecuaciones junto a la creatininemia, incluso cuando el médico no lo solicitó explícitamente. No es una sugerencia decorativa: reconoce que dejar ese cálculo en manos de cada profesional, por separado, introduce una fuente de error que no tiene nada que ver con la calidad analítica del laboratorio.

Esta es una recomendación fácil de posponer, precisamente porque no cuesta un peso agregarla: no requiere nuevo equipamiento, ni un reactivo distinto, ni una licitación. Es una línea más en el informe, una fórmula más en el sistema de gestión del laboratorio. Y sin embargo, en el caso que hemos venido revisando, tomó años quedar pendiente, no por falta de presupuesto, sino porque nadie la priorizaba frente a decisiones que sí comprometen gasto, como el método de medición o el cambio de equipo.

## La letra chica que nadie fuera del laboratorio debería tener que conocer

![Dos carpetas idénticas con el mismo número, una con tinta negra y otra con tinta azul](/opinion/resultado-correcto-mal-comunicado/imagen-3.jpg)

Aquí el problema se pone más técnico, y por eso mismo más fácil de errar fuera del laboratorio. La fórmula de MDRD tiene dos versiones: una para cuando la medición de creatinina es trazable al estándar IDMS (MDRD4-IDMS) y otra para cuando no lo es (MDRD-4). Son fórmulas distintas que requieren saber algo que normalmente solo el laboratorio sabe: si su propio método de medición está o no estandarizado a ese nivel. Las recomendaciones SLANH/COLABIOCLI van en esa misma línea: usar CKD-EPI cuando el método está bien estandarizado y es trazable a la jerarquía analítica más alta, y MDRD-4 cuando no lo está, nunca Cockcroft-Gault.

Un médico que calcula el VFG por su cuenta, sin saber cuál es la trazabilidad real del método que usó su laboratorio, no tiene cómo elegir correctamente entre estas opciones: en el mejor de los casos usa la que tiene más a mano, en el peor usa la que le resultó familiar en otra institución con un método distinto. El resultado no es un error aleatorio: es un error sistemático, silencioso, que se repite cada vez que ese mismo médico pide el mismo examen. Es exactamente el tipo de decisión que le corresponde al laboratorio tomar una sola vez, con la información que solo él tiene, y no delegar, sin saberlo, en quien menos herramientas tiene para tomarla bien.

## Lo que viene

La primera de las [tres preguntas de esta serie](/opinion/el-eclipse-de-voluntad-como-se-decide-o-no-innovar-en-un-laboratorio-publico/) es si el cambio resuelve un problema real en la población a cargo, y no uno que solo existe en la literatura. Informar el VFG junto a la creatininemia pasa esa prueba con holgura: resuelve un problema real, medible, y no exige presupuesto ni licitación. Es, quizás, el cambio más barato de toda esta serie, y por eso mismo el más difícil de explicar: cómo quedó pendiente tanto tiempo.

En el próximo episodio salimos de este laboratorio para mirar el problema a escala nacional: qué dicen los datos del control de calidad externo sobre cómo se mide la creatinina en Chile, y por qué esto deja de ser la historia de un laboratorio aislado para convertirse en una pregunta de política pública.
