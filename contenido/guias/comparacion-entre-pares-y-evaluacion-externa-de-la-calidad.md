---
titulo: "Comparación entre pares y evaluación externa de la calidad: no compiten, responden preguntas distintas"
fecha: 2026-11-14
resumen: "Qué es el control interno, la comparación de control interno entre pares y la evaluación externa; qué puedes concluir con los datos de cada una, con qué sesgo calculan el error total que te informan y por qué ninguna decide tu meta: eso lo define tu plan de calidad."
temas: ["Control de calidad externo", "Control de calidad", "Plan de calidad", "Acreditación"]
---

Cuando dos profesionales del laboratorio discuten si es mejor la comparación interlaboratorio o la evaluación externa de la calidad, casi siempre discuten sin notar que **hablan de cosas distintas con el mismo nombre**. Uno tiene en la cabeza un informe mensual armado con sus propios controles de cada día, comparado con un grupo enorme de laboratorios. El otro piensa en una muestra desconocida que llega unas pocas veces al año. Las dos se llaman «control externo» o «interlaboratorio» según quién hable. Las dos aportan información, pero **no responden la misma pregunta**.

Esta guía ordena la discusión: qué es cada herramienta, qué puedes concluir con los datos que entrega, con qué sesgo se calcula el **error total que algunos programas informan** y, sobre todo, qué es lo que **ninguna de las dos puede decirte**: cuál debe ser tu meta.

**En 30 segundos**

- Hay **tres cosas** que se confunden: tu control interno, la comparación de ese control con el de otros laboratorios (pares) y la evaluación externa ciega.
- Los pares te dan **muchos datos**; la evaluación externa te da **independencia**. Ninguna es «la mejor»: miran cosas distintas.
- El **error total que informa un programa** suele calcularse con el sesgo **contra el grupo**, no contra la verdad, y con **la meta del programa**, no la tuya.
- Lo que logran los demás (**alcanzable**) no es lo que tu laboratorio necesita (**requerido**). El requerido sale de tu plan de calidad.

## 1. Tres cosas que se confunden

| | Control interno propio | Comparación entre pares | Evaluación externa |
|---|---|---|---|
| **Qué mides** | Material de control, con tus reglas | El **mismo** material de control de cada día | Una muestra que envía el programa |
| **Sabes el valor antes de medir** | Sí (rango del fabricante o tu media) | Sí: es tu control de siempre | **No** (muestra ciega) |
| **Cuántos datos entrega** | Muchos, todos los días | Muchos: los resultados de control del mes | Pocos: unas muestras por ciclo |
| **Cuándo informa** | Al instante | Mensual (a veces con revisión en línea) | Por ciclo |
| **Contra qué te comparas** | Tu media y tu DE | La media y dispersión de laboratorios con tu método y lote | Un valor asignado (consenso o referencia) |
| **Qué evalúa** | Estabilidad y precisión en el tiempo | Lo anterior, más cómo estás frente a un grupo | El proceso completo con una muestra «desconocida» |

La primera columna es la base. Las otras dos son **evidencia externa** que se suma a ella. En esta guía llamo **comparación entre pares** a la segunda y **evaluación externa** (EQA, o ensayo de aptitud) a la tercera.

![Dos filas de puntos a lo largo de un año: el control interno entrega un punto por día; la comparación entre pares, un informe al mes; la evaluación externa, unas pocas muestras](/guias/comparacion-entre-pares-y-evaluacion-externa-de-la-calidad/figura-1.svg)

*Figura 1. Cuántos datos entrega cada vía en un año. Los informes de pares se construyen con los mismos puntos del control diario; la evaluación externa aporta pocos puntos, pero ciegos. El número de ciclos depende del programa (aquí, un ejemplo).*

Dos aclaraciones que evitan malos entendidos:

- La comparación entre pares **no es una prueba ciega**: sabes qué material mides y cuándo, y puedes, sin mala intención, repetir un control que cayó mal antes de registrarlo (sobre ese hábito, ver la [guía del coeficiente de variación](/guias/coeficiente-de-variacion-en-el-laboratorio/)). La evaluación externa **sí es ciega**.
- Algunos proveedores ofrecen las dos cosas. Eso no las convierte en una sola: se leen con preguntas distintas.

## 2. Qué aporta la comparación entre pares

Lo que defienden quienes la prefieren es real:

- **Muchos datos.** Con decenas de resultados de control al mes por nivel, la media y la dispersión, tuyas y del grupo, son estables. Un sesgo pequeño o una deriva lenta se ven.
- **Rapidez para dar de alta un lote.** Con un lote nuevo, la media del grupo sirve de **valor provisional** mientras acumulas tus propios datos. Sin eso, cada cambio de lote te deja semanas con una media poco confiable.
- **Una referencia amplia con el mismo método.** Te compara con quienes miden como tú, con el mismo material: la comparación más justa que existe para detectar que el método se desvió.
- **Un gráfico ajustado a tu equipo.** Tus datos sobre tu propio control describen **tu** variación, no la de la hoja de especificaciones.

Y tiene límites que conviene tener presentes:

- **La media de los pares no es el valor verdadero.** Si todos los laboratorios que usan el mismo método comparten un sesgo (por una calibración trazable a un material con problema, o por una interferencia del reactivo), el grupo entero está equivocado a la vez y tú «estás perfecto». Detecta que te saliste del grupo, **no** que el grupo esté en lo correcto.
- **El material de control no es una muestra de paciente.** Su comportamiento con tu método puede diferir (efecto de matriz), aunque el grupo sea enorme.
- **Es evidencia del método y del control, no de todo tu proceso.** No evalúa cómo manejas una muestra desconocida ni la etapa de registro y entrega.
- **La «DE del grupo» puede significar cosas distintas según el programa.** En algunos se arma con la variación *dentro* de cada laboratorio (imprecisión de largo plazo) y en otros con la dispersión *entre* laboratorios, que normalmente es mayor. Un SDI de 1 en uno no equivale a un SDI de 1 en el otro. Es una pregunta para hacerle a tu proveedor (sección 5).

## 3. Qué aporta la evaluación externa

- **Es independiente y ciega.** Nadie sabe el valor antes de medir. Por eso detecta lo que el control interno, que conoce su valor, tiende a perdonar.
- **Prueba el proceso completo.** La muestra llega, se identifica, se procesa, se mide, se informa. Las fallas preanalíticas y posanalíticas (transcripción, unidades, dilución) aparecen aquí y **no** en el control interno.
- **Puede tener un valor asignado de mejor calidad.** Algunos programas usan materiales conmutables con valores fijados por métodos de referencia. Ahí sí te dice algo sobre **veracidad**, no solo sobre cómo estás frente a los demás. Otros usan el consenso del grupo: pregunta cuál es el caso del tuyo.
- **Es lo que exige la acreditación.** ISO 15189 pide participar en programas de comparación interlaboratorio y actuar sobre los resultados desfavorables. Ver la [guía de acreditación en Chile](/guias/acreditacion-laboratorio-clinico-chile/).

Sus límites:

- **Pocos datos.** Es la crítica más repetida y es correcta. Tiene una consecuencia numérica concreta (sección 4).
- **Los materiales pueden no ser conmutables.** Si la muestra se comporta distinto del paciente, el «sesgo» que ves puede ser del material y no tuyo. Por eso los programas agrupan por método, y a veces el grupo queda con pocos participantes.
- **El valor asignado suele ser el consenso del grupo**, con la misma limitación de la sección 2: un grupo puede estar equivocado en bloque.
- **Una muestra por ciclo es un dato ruidoso.** Que un resultado salga con SDI de 1,8 no significa que estés bien; que salga con 2,3 no significa que estés mal.

## 4. La crítica de la frecuencia, con números

Un resultado individual lleva la dispersión de tu método. Si tu CV de largo plazo es de 2 %, **una sola medición** te da un sesgo estimado con una incertidumbre de ±3,9 % (95 %, es decir 1,96 × CV). Con más datos, la incertidumbre baja con la raíz de n:

| Datos usados para estimar tu sesgo | Incertidumbre del sesgo (95 %), con CV = 2 % |
|---|---|
| 1 resultado (una muestra de una ronda) | ± 3,9 % |
| 2 resultados | ± 2,8 % |
| 4 resultados | ± 2,0 % |
| 12 resultados (un año de rondas mensuales) | ± 1,1 % |
| 20 resultados (un mes de control, uno al día) | ± 0,9 % |
| 100 resultados (cinco meses) | ± 0,4 % |

![Barras horizontales: la incertidumbre del sesgo baja de ±3,9 % con un resultado a ±0,4 % con cien, y solo con cuatro o más resultados cae bajo el 2 %](/guias/comparacion-entre-pares-y-evaluacion-externa-de-la-calidad/figura-2.svg)

*Figura 2. Incertidumbre (95 %) del sesgo estimado según cuántos resultados usas, con un CV de 2 %. La línea punteada marca un sesgo aceptable de 2 % como ejemplo. Cálculo directo (1,96 × CV / √n); no incluye la incertidumbre del valor de referencia ni el efecto de matriz.*

Lo que muestra:

- **Tienen razón quienes dicen que una ronda aislada no permite decidir.** Con un CV de 2 % y un sesgo aceptable de 2 %, una sola muestra no distingue a un laboratorio sin sesgo de uno con sesgo de 2 %.
- **Pero no es una crítica a la herramienta, sino a leerla de a una.** Doce resultados de un año de rondas tienen una precisión parecida a un mes de control diario. Por eso la guía de [sesgo y SDI](/guias/control-de-calidad-externo-sesgo-y-sdi/) insiste en mirar la **tendencia** de varias rondas.
- **Y hay una trampa en el sentido contrario.** Con muchos datos, la comparación entre pares estima con mucha precisión **la distancia al grupo**. Esa precisión no la convierte en veracidad: sigues midiendo contra un grupo, no contra la verdad.

## 5. El error total que informa el programa: ¿con qué sesgo se calcula?

Varios programas entregan, además del sesgo y el SDI, un **error total** ya calculado, y a veces una métrica sigma. Eso genera confusión, porque el número parece «el error total de tu laboratorio» y no lo es del todo. Para leerlo hay que saber qué entra en la cuenta.

La fórmula habitual es la de Westgard:

**ET % = |sesgo %| + z × CV %**

con z = 1,65 (una cola) o 2 (aproximación original). Los dos ingredientes cambian de significado según quién los entregue. Lo que sigue es lo habitual; los programas varían, y la documentación de cada uno es la que manda:

| | Comparación entre pares | Evaluación externa | Tu plan |
|---|---|---|---|
| **Sesgo** | Tu media del mes **menos la media del grupo** (mismo método y lote) | Tu resultado **menos el valor asignado** de la muestra | Tu media **menos un valor trazable** (material de referencia, verificación) |
| **CV** | El de tus datos del mes (en algunos, el del grupo) | No lo calcula: no tiene datos repetidos tuyos | Tu CV de largo plazo, del período que elijas |
| **Meta con la que se evalúa** | La que fija el programa | La que fija el programa | La de tu plan de calidad |

De ahí salen cuatro advertencias.

**1. Es error total contra el grupo, no contra la verdad.** El sesgo de la comparación entre pares es la distancia a la media de los pares. Si el grupo completo tiene un sesgo respecto de un valor de referencia, ese sesgo **no aparece** en tu error total. Un ejemplo con números inventados:

| | Con el sesgo del programa | Con el sesgo real |
|---|---|---|
| Sesgo contra el grupo | +1,5 % | +1,5 % |
| Sesgo del grupo contra la referencia | no se ve | +3,0 % |
| Sesgo usado en la cuenta | 1,5 % | 4,5 % |
| CV de tus datos | 2,0 % | 2,0 % |
| **ET = sesgo + 1,65 × CV** | **4,8 %** | **7,8 %** |
| Meta de ejemplo | 6,0 % | 6,0 % |
| Resultado | Cumple | **No cumple** |

![Recta numérica con tres puntos: la referencia en 0 %, la media del grupo en +3 % y el laboratorio en +4,5 %; el programa solo ve la distancia de 1,5 % entre el grupo y el laboratorio](/guias/comparacion-entre-pares-y-evaluacion-externa-de-la-calidad/figura-3.svg)

*Figura 3. El programa mide tu distancia al grupo (+1,5 %). La distancia del grupo a la referencia (+3 %) queda fuera de su cuenta. Ejemplo con números inventados.*

![Dos barras apiladas de error total con la misma meta de 6 %: la del programa suma 1,5 % de sesgo y 3,3 % de imprecisión, 4,8 %, y cumple; la real suma 4,5 % y 3,3 %, 7,8 %, y no cumple](/guias/comparacion-entre-pares-y-evaluacion-externa-de-la-calidad/figura-4.svg)

*Figura 4. El mismo laboratorio, con el mismo CV, cumple o no según el sesgo que entre en la cuenta. El informe dice «cumples» y es verdad dentro de su definición, que mide contra el grupo.*

**2. El CV es el de una ventana corta.** El CV de un mes se calcula con los datos de ese mes, y un cambio de calibración a mitad de mes puede dejar un sesgo mensual cercano a cero con un CV más ancho (ver la [guía del coeficiente de variación](/guias/coeficiente-de-variacion-en-el-laboratorio/)). Un error total armado con el sesgo y el CV de un mes **no describe el comportamiento de todo el año**.

**3. En una evaluación externa, la imprecisión puede contarse dos veces.** Con una sola muestra, la diferencia contra el valor asignado ya contiene el error aleatorio de esa medición. Si además se suma z × CV, la imprecisión entra por duplicado. Por eso un error total calculado desde una ronda es un dato de apoyo, no una conclusión.

**4. La meta la pone el programa, no tu plan.** Cuando el informe dice «cumple» o «no cumple», lo hace contra **su** especificación, que puede ser más laxa o más estricta que la que tu laboratorio necesita (sección 6). Una métrica sigma calculada con esa meta hereda el mismo problema: cambia la meta y cambia el sigma sin que cambie el método.

**Qué hacer con eso.** No lo descartes: es información. Pero úsalo como **contraste**, no como tu error total oficial. Para tu plan, calcula el error total con tus propios datos y con un sesgo que puedas respaldar (de una verificación, de un material trazable o de una evaluación externa con valor asignado por referencia), y compáralo con **tu** meta. Si el error total del programa y el tuyo difieren, la diferencia casi siempre se explica por una de las cuatro causas de arriba. Puedes hacer la cuenta con la calculadora [Error total y sigma](/calculadoras/error-total-y-sigma/).

**Preguntas para hacerle a tu programa**

1. ¿El sesgo es contra la media del grupo o contra un valor asignado? ¿Cómo se fija ese valor?
2. ¿Qué grupo de pares uso (método, lote, instrumento) y cuántos participantes tiene?
3. ¿Qué *z* multiplica al CV?
4. ¿El CV es el mío o el del grupo? ¿De qué ventana de tiempo?
5. ¿De dónde sale la meta con que se evalúa el error total y puedo reemplazarla por la mía?

## 6. Lo que ninguna de las dos te dice: la meta

Esta es la idea central de la guía.

Tanto la comparación entre pares como la evaluación externa **te comparan con otros**: con la media de un grupo, con el CV del grupo, con un valor asignado. Eso te dice **qué es alcanzable hoy** con el método que usas. No te dice **qué necesitas tú**.

Conviene separar tres cantidades:

| Cantidad | Qué es | De dónde sale |
|---|---|---|
| **Requerido** | Qué error total puedes aceptar para que el resultado sirva a la decisión clínica | Tu plan de calidad: uso clínico, variación biológica, modelos de Milán, normativa. Ver [Error total permitido](/guias/error-total-permitido-como-elegirlo/) |
| **Alcanzable** | Qué logran hoy los laboratorios con este método | Comparación entre pares, evaluación externa, fabricante |
| **Real** | Qué logras tú | Tus datos de control interno |

Cada herramienta aporta a una fila distinta. La comparación entre pares te da **alcanzable** y ayuda a ubicar tu **real**. La evaluación externa te da **real**, medido por otro y a ciegas. **Solo tu plan de calidad puede dar el requerido.**

El error frecuente es dejar que lo alcanzable haga de requerido: «el grupo tiene CV de 1,5 %, entonces esa es mi meta». Así el estado del arte fija tu exigencia por defecto, y el estado del arte no sabe a quién le informas.

## 7. Cuatro laboratorios (casos hipotéticos)

Para ver cómo cambia el uso de los mismos datos, cuatro ejemplos inventados:

**A. Laboratorio de atención primaria con presión de costos.** Su plan acepta, para un analito estable, un error total más amplio que el del estado del arte, porque la decisión clínica que apoya no necesita más (por ejemplo, tamizaje). Un CV del grupo de 1,5 % no es su meta. Un CV propio de 3 % puede estar **bien** si cumple su requerido. La comparación entre pares sirve para comprobar que el método no se desvió. Lo que importa es que su requisito esté **escrito y justificado**: «sale más barato» explica la elección del método, pero no es un requisito clínico.

**B. Laboratorio de un centro de trasplantes o de pabellón.** Para ciertos analitos su requerido puede ser **más estricto** de lo que logra el grupo. Un CV del grupo de 2 % puede ser insuficiente. Ahí la comparación entre pares le dice que **el método disponible no alcanza**, y eso obliga a decidir: otro método, más frecuencia de control, reglas más estrictas o derivar. Sin plan propio, nadie notaría el hueco: «estoy dentro del grupo» parecería suficiente.

![Dos laboratorios sobre una escala de error total: en el A el requerido (8 %) está sobre lo alcanzable (5 %) y lo real (6,5 %) cumple; en el B el requerido (3 %) está bajo lo alcanzable (5 %) y lo real (5,5 %) no cumple](/guias/comparacion-entre-pares-y-evaluacion-externa-de-la-calidad/figura-5.svg)

*Figura 5. Los mismos tres números (requerido, alcanzable y real) se leen distinto según dónde caiga el requerido. Valores ilustrativos.*

**C. Hospital general con acreditación.** Su plan define requeridos por analito con un criterio razonado. Usa la comparación entre pares para el día a día (lotes nuevos, deriva) y la evaluación externa como prueba ciega y evidencia para el evaluador.

**D. Laboratorio nuevo o con un método recién incorporado.** Aún no tiene historia propia. La comparación entre pares le da una media y una DE provisionales para empezar, y la evaluación externa le da una primera mirada independiente. Su plan debe reemplazar esos valores por los propios cuando junte datos suficientes.

El mismo informe, cuatro lecturas. La herramienta no cambió; cambió **la pregunta que cada laboratorio le hace**.

## 8. Cómo se combinan

No se trata de elegir una. Una arquitectura sencilla:

![Cuatro bloques en cascada: plan de calidad (define el requerido), control interno propio (vigila el día a día), comparación entre pares (contraste y lotes nuevos) y evaluación externa (prueba ciega del proceso completo)](/guias/comparacion-entre-pares-y-evaluacion-externa-de-la-calidad/figura-6.svg)

*Figura 6. El plan de calidad va primero y fija la meta. Las dos comparaciones externas son evidencia que se contrasta con esa meta.*

Y una regla de lectura: **cuando las dos vías discrepan, investiga.**

- Control interno y pares bien, evaluación externa mal: apunta a algo del proceso o del material que el control no ve (preanalítica, matriz, transcripción).
- Evaluación externa bien, pares con deriva: apunta a un cambio lento que una muestra suelta no capta.

## 9. Lo que esta postura no resuelve

Hay una objeción seria a poner la meta en el plan propio, y conviene enfrentarla:

- **Una meta propia puede ser autocomplaciente.** Si cada laboratorio fija su requisito, es tentador fijarlo donde ya se cumple. El requisito necesita una **justificación externa** (qué decisión apoya el resultado, qué dice la variación biológica, qué dice la normativa), documentada y revisable por un tercero.
- **La comparación con otros protege.** Un laboratorio que se compara solo con su propia meta pierde la alarma de «estás peor que todos los demás». Las comparaciones externas no deben desaparecer; deben cambiar de función: **de juez a contraste**.
- **Que el estado del arte no te sirva de meta no significa que puedas ignorarlo.** Si tu real es mucho peor que el alcanzable y tu requisito está cumplido, igual conviene saber por qué estás lejos del grupo: suele haber una causa corregible.

## Preguntas frecuentes

**¿Es mejor la comparación entre pares o la evaluación externa?** No compiten: responden preguntas distintas. La primera da muchos datos y contraste continuo con un grupo; la segunda da una prueba ciega e independiente del proceso completo. La acreditación exige participar en evaluación externa.

**¿La evaluación externa de una vez al mes no es muy poco?** Una muestra aislada dice poco sobre tu sesgo; doce de un año ya tienen una precisión parecida a la de un mes de control diario. Lo que importa es leer la tendencia, no el resultado suelto.

**¿El error total que me informa el programa es el de mi laboratorio?** Es el error total **contra el grupo y con la meta del programa**. Sirve como contraste, pero no reemplaza al que calculas con tus datos y tu meta.

**¿Debo usar el CV del grupo como mi meta?** No. El CV del grupo muestra lo alcanzable, no lo requerido. Tu meta sale del uso clínico del resultado y se justifica en tu plan de calidad.

**¿Puede un laboratorio tener una meta más laxa que el estado del arte?** Puede, si está justificada por la decisión clínica que apoya y queda escrita. «Es más barato» explica la elección del método, pero no justifica un requisito.

## Lista de verificación

- [ ] Tengo escrito, por analito, **qué error total acepto y por qué**.
- [ ] Sé con qué sesgo, qué CV y qué meta calcula mi programa el error total que me informa.
- [ ] Uso el CV de los pares como **contraste**, no como meta.
- [ ] Sé si la DE de mi programa es dentro del laboratorio o entre laboratorios, y lo tengo en cuenta al leer el SDI.
- [ ] Identifiqué los analitos con requerido **más estricto** que lo alcanzable, y qué hago con ellos.
- [ ] En los analitos con requerido **más laxo** que lo alcanzable, el requisito está justificado clínicamente.
- [ ] Leo las rondas **en tendencia**, no de a una.
- [ ] Tengo un procedimiento para cuando el control interno, los pares y la evaluación externa discrepan.
- [ ] Puedo mostrar a un evaluador **por qué** mi requisito es el que declaro.

## Dónde seguir

Con las calculadoras gratuitas de ConsensusLab puedes hacer lo de esta guía sin instalar nada: [Error total y sigma](/calculadoras/error-total-y-sigma/), [Sesgo y SDI](/calculadoras/sesgo-y-sdi/), [ETa desde variabilidad biológica](/calculadoras/tea-variabilidad-biologica/) y [Estadística del control](/calculadoras/estadistica-del-control/) (media, DE y CV). Para ordenar la decisión de la meta, está la guía [Error total permitido: cómo elegirlo](/guias/error-total-permitido-como-elegirlo/), y para entender el CV que entra en la cuenta, la guía [El coeficiente de variación en el laboratorio](/guias/coeficiente-de-variacion-en-el-laboratorio/), que tiene una planilla de Excel con manual en preparación.

ConsensusLab es mío; no recibo comisiones de proveedores. ConsensusLab QC define el plan de calidad por analito y compara cada mes el error total con tu meta, y esa es la postura que defiendo en esta guía, así que descuenta ese interés al leerla. Tiene una prueba gratuita de 15 días con los datos de tu laboratorio.

---

## Sobre las cifras de esta guía

Las cifras de las secciones 4, 5 y 7 son ilustrativas. La tabla de la sección 4 es un cálculo directo (1,96 × CV / √n, con un CV de 2 %) y no una simulación ni datos de un laboratorio. El ejemplo de la sección 5 y los cuatro laboratorios de la sección 7 usan números inventados, para mostrar el mecanismo. Cómo calcula cada programa su sesgo, su CV y su meta varía: revisa la documentación del tuyo.

## Referencias

- Westgard JO, Carey RN, Wold S. Criteria for judging precision and accuracy in method development and evaluation. Clin Chem. 1974;20(7):825-833.
- Clinical Laboratory News (ADLM). Total analytic error (septiembre de 2013). [myadlm.org](https://myadlm.org/cln/articles/2013/september/total-analytic-error)
- Sandberg S, Fraser CG, Horvath AR, et al. Defining analytical performance specifications: consensus statement from the 1st Strategic Conference of the EFLM. Clin Chem Lab Med. 2015;53(6):833-835. [doi:10.1515/cclm-2015-0067](https://doi.org/10.1515/cclm-2015-0067)
- Jones GRD, Albarede S, Kesseler D, et al. Analytical performance specifications for external quality assessment - definitions and descriptions. Clin Chem Lab Med. 2017;55(7):949-955. [doi:10.1515/cclm-2017-0151](https://doi.org/10.1515/cclm-2017-0151)
- ISO 15189 (laboratorios clínicos: requisitos de calidad y competencia) e ISO/IEC 17043 (requisitos para proveedores de ensayos de aptitud). Consulta la edición vigente de cada documento.
