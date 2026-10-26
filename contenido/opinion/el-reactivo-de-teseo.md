---
titulo: "El reactivo de Teseo"
fecha: 2026-10-25
resumen: "Un reactivo de proteínas totales que se caía a los pocos días a bordo, otro al que le agregaron aditivos para que no se cayera, y un control interno que dio 5,3 donde siempre daba 4,8. Cada cambio, por separado, era razonable. ¿Seguía siendo el mismo barco?"
serie: "Casos de calidad analítica"
temas: ["Laboratorio clínico", "Control de calidad", "Gestión"]
imagen: "opinion/el-reactivo-de-teseo/imagen-1.jpg"
---

Dicen que Teseo volvió de Creta con su barco y que los atenienses lo conservaron como reliquia. Con los años, cada vez que una tabla se pudría, la cambiaban por una nueva. Tabla a tabla, año a año, hasta que no quedó ni una de las originales.

Y de ahí sale la pregunta que los filósofos llevan veinte siglos masticando: **¿sigue siendo el mismo barco?**

Yo no esperaba encontrarme con esa pregunta en una cubeta de proteínas totales. Pero ahí estaba. Vamos por partes, que el reactivo primero.

![Un barco antiguo atracado en un puerto al atardecer, con parte del casco reemplazado por frascos de reactivo y paneles metálicos nuevos, mientras tres tecnólogos con delantal lo miran con cara de duda](/opinion/el-reactivo-de-teseo/imagen-1.jpg)

## El reactivo que duraba lo que dura un lunes

Las proteínas totales por biuret son una técnica noble, vieja y bien portada. Con una salvedad: el reactivo, a bordo del analizador, se cansa. A los 3 o 4 días empieza a caer, y esa caída es peligrosa porque, si se deja más tiempo del necesario, el error puede pasar el máximo que el laboratorio tolera. Para proteínas totales ese error total permitido ronda el 8 %, y el CV de la técnica no debería pasar del 1 o 1,5 %.

En nuestro laboratorio se procesaban 10 o 20 proteínas al día, no más. Con ese volumen el frasco se quedaba a bordo más tiempo del que le convenía, y al tercer o cuarto día el CV de la serie andaba por el 3 o 4 %.

Pero ojo con ese número, porque miente un poco.

## La campana que se fue estirando

Levey-Jennings y las reglas de Westgard suponen una forma: la campana de Gauss. Un método estable dibuja una media, una dispersión y puntos que caen a ambos lados con la misma facilidad.

Un reactivo que se deteriora a bordo no dibuja una campana. Los primeros días el control cae cerca de la media. Al tercero o cuarto empieza a bajar, y el resultado es una distribución con muchos valores altos al comienzo, una cola larga hacia abajo y una dispersión que crece. Es una campana con cola.

Y esa cola trae una consecuencia incómoda. Si calculas la media y la desviación con todos esos días mezclados, **la DS ya incluye el deterioro**. Los límites quedan más anchos de lo que un método sano justificaría, y la gráfica "aprende" que la caída es normal. Por eso en el N20 todo se veía adentro y, aun así, no cumplíamos el error total máximo permitido.

## ¿Sesgo o imprecisión? La pregunta que ordena todo

Cuando un método incumple el error total permitido hay dos sospechosos, y confundirlos lleva a arreglar lo que no está roto.

- **Imprecisión (CV):** los resultados se dispersan alrededor de su propio centro. Es el error aleatorio. Se ve dentro de una corrida y dentro de un mismo día.
- **Sesgo:** el centro mismo está corrido respecto del valor verdadero. Es el error sistemático. Todos los resultados se desvían hacia el mismo lado.

Se combinan en el error total (**ET ≈ |sesgo| + 1,65 × CV**, una forma habitual de calcularlo) y el margen que le queda al método se mide en sigma: **σ = (ETa − |sesgo|) / CV**.

Ahora, nuestro caso. Ese "CV de 3-4 %" no era la imprecisión del reactivo. Dentro de un mismo día, el reactivo repetía tan bien el día 4 como el día 1. Lo que cambiaba era **dónde se centraban los resultados**: cada día un poco más abajo. Eso es sesgo que deriva en el tiempo, y la DS de la serie mezclada crece porque cada día está centrado en un lugar distinto.

Un ejemplo **sintético**, con error total permitido de 8 % y un CV intradía de 1,2 % que no cambia:

| | Día 1 | Día 4 |
|---|---|---|
| CV intradía | 1,2 % | 1,2 % |
| Sesgo | 0 % | −7 % |
| Error total | 2,0 % | 9,0 % |
| Sigma | 6,7 | 0,8 |

La precisión es idéntica y el método pasó de excelente a inaceptable solo por el sesgo. Si juntas los cuatro días en una serie, sale un CV aparente de alrededor de 3 %, que es justo el número que mirábamos. No describe qué tan bien repite el método: describe cuánto se movió la media.

¿Y el paciente? Con −7 %, quien de verdad tiene 6,5 g/dL recibe 6,0. Si el límite inferior de referencia ronda los 6,4, queda catalogado como hipoproteinémico por culpa del reactivo, no de su suero.

Para deducir cuál de los dos sospechosos tienes, en este orden:

1. **¿La serie se corre hacia un lado o se abre en abanico?** Hacia un lado, sesgo. En abanico, imprecisión.
2. **¿Qué pasa dentro de un mismo día?** Si el CV intradía se mantiene, la imprecisión no es el problema.
3. **¿Cambia con los días a bordo?** Una deriva atada al tiempo apunta al reactivo, no al analizador ni a las manos.
4. **¿Qué reglas saltan?** Las de error sistemático (2 de 2s, 4 de 1s, 10x, tendencia) hablan de sesgo. Las de error aleatorio (1 de 3s, R4s) hablan de dispersión.

Importa porque el remedio cambia. Recalibrar no cura la imprecisión. Un sesgo que depende de los días a bordo se trata con calibración a tiempo, rotación del reactivo o menos tiempo a bordo. La calculadora de [error total y sigma](/calculadoras/error-total-y-sigma/) hace justo esta separación: sesgo y CV por separado, y qué parte del presupuesto se come cada uno.

## La solución que nadie pone en un cartel

Con el diagnóstico claro, la medida fue sencilla y poco glamorosa: **acortar el tiempo a bordo**. El reactivo se sacaba antes, se descartaba lo que sobraba y se abría un frasco nuevo más seguido. El rendimiento quedó entre el 50 y el 60 %: se pagaba el frasco entero y se usaba la mitad.

Y funcionó. El CV de la serie bajó a menos del 2 % y volvimos a cumplir los estándares de calidad del laboratorio. Era caro, pero era honesto, y es una decisión de gestión con su costo a la vista: el reactivo seguía siendo el mismo, solo lo usábamos menos tiempo. (Con la [calculadora de rendimiento de reactivos](/calculadoras/rendimiento-de-reactivos/) se puede ver cuánto cuesta esa honestidad.)

Había además una precaución de bancada: este reactivo no se lleva bien con el frío. Si se queda en el refrigerador del analizador, precipita. Así que al terminar la jornada se sacaba, se dejaba a temperatura ambiente y al día siguiente volvía a bordo. Un ritual, como todo lo que hace uno cuando conoce el carácter de su reactivo.

## El día 1 no demuestra nada del día 4

Hay una trampa más fina que el reactivo mismo: **verificar la calidad el primer día de un reactivo nuevo solo demuestra la calidad del primer día**.

El reactivo recién abierto, recién calibrado, con el control en la media, es el reactivo en su mejor momento. Pero el paciente que importa es el del día 4, que recibe su resultado con el mismo frasco ya cansado. Una verificación seria tiene que mirar el final de la estabilidad en uso, no el comienzo.

Y ahí aparece una tentación que nadie confiesa en las auditorías. El tecnólogo sabe que el día 4 la alarma va a saltar. No lo piensa con maldad: lo sabe como se sabe que el lunes hay taco. Entonces tiene dos caminos.

El camino largo es dejar constancia, repetir el control, avisar a la jefatura, justificar una vez más que el reactivo se cae al cuarto día y esperar que alguien decida. Mientras tanto, la cola de exámenes crece.

El camino corto es **cargar un reactivo nuevo, pasar el control, y la alarma desaparece**. La gráfica queda impecable, la planilla muestra un laboratorio que "siempre cumple" y nadie falsificó nada: se cambió un frasco, que además es lo que corresponde. Pero el problema real, que el reactivo se deteriora y que los pacientes de los días 3 y 4 recibieron resultados corridos hacia abajo, quedó fuera del registro. La alarma no se fue porque el método mejoró. Se fue porque dejó de mirarse el reactivo que estaba en uso.

Y como el CV intradía no cambia, ninguna regla de dispersión iba a avisar. Solo el sesgo lo habría delatado, y el sesgo es justo lo que el frasco nuevo esconde.

Esto no es una acusación a los tecnólogos. Cuando la alarma es esperable y esquivarla es fácil, el camino corto no es una falla moral: es la respuesta racional de alguien que está solo frente al analizador a las siete de la mañana. Un sistema que depende de que cada persona resista esa tentación todos los días no es un sistema de calidad, es un acto de fe.

Para quien dirige: el costo del atajo no se ve en la planilla, pero existe. Es el resultado del día 4 que nadie midió, el sesgo que aparecerá recién en el control externo y la conversación incómoda cuando alguien pregunte por qué las gráficas eran tan perfectas.

![Una tecnóloga a las siete de la mañana, con una alarma roja en el monitor del analizador y un tubo en la mano, mirando hacia atrás con una sonrisa nerviosa mientras se acumulan las muestras](/opinion/el-reactivo-de-teseo/imagen-2.jpg)

## Llega el reactivo "mejorado"

Cambiamos de proveedor. Y el nuevo ofrecía lo mismo, biuret, pero con aditivos y conservantes que le daban mucha más estabilidad a bordo. Eso no venía en ninguna carta de presentación; lo fuimos descubriendo con el tiempo, mirando las gráficas, donde el reactivo se mantenía mucho más estable y ya no se caía al tercer día. Menos desperdicio, menos recambios, menos ritual.

Y aquí vuelve el barco.

Un conservante para que no se degrade. Un aditivo para que no precipite. Otro para que el color se mantenga. Cada mejora, vista sola, es razonable y defendible, y ninguna convierte al biuret en otra cosa. El fabricante nunca "cambió el reactivo": le fue cambiando piezas. Y mientras tanto, el nombre en la caja, el código del producto y el inserto seguían diciendo lo mismo.

## La señal que sí estaba

Esta es la parte de la historia que me cuesta contar con la cara seria.

Durante meses, el control interno patológico de proteínas totales, mismo lote, mismo nivel, nos daba entre **4,7 y 4,8 g/dL**. Llegó el reactivo nuevo y ese mismo control, del mismo lote, empezó a dar **5,2 y 5,3**.

Medio gramo por decilitro: un 10 % de diferencia con exactamente el mismo material. Más que todo el error total permitido, y apareció el primer día, antes de que pasara un solo paciente.

![Dos monitores con la gráfica de control del mismo analito, uno con los puntos en un nivel y el otro con un salto hacia arriba, y tres colegas que se encogen de hombros frente a un analizador nuevo con un lazo rojo](/opinion/el-reactivo-de-teseo/imagen-3.jpg)

Lo vimos. Nos llamó la atención. Y lo archivamos con la explicación más cómoda del mundo: *reactivo nuevo, analizador nuevo, es esperable que cambie*, y de todos modos el control externo iba a terminar de aclararlo. La explicación era razonable, y ahí está el problema: **una explicación razonable es la forma más eficiente de no investigar nada**. Habían cambiado dos cosas a la vez, el reactivo y el analizador, y con dos sospechosos y ninguna cámara de seguridad no se puede decir quién fue.

Hay otra trampa más fina. Para el reactivo nuevo se hizo lo habitual: un nuevo N20, en una gráfica distinta. Cada reactivo quedó con su propia media y sus propios límites, y comparar una con otra dejó de ser cosa de mirar una misma gráfica. Cada gráfica, por separado, estaba perfecta. El control respondía la pregunta que se le hacía, "¿estás estable respecto de ti mismo?", y no la que importaba: "¿sigues midiendo lo mismo que antes?".

Igual comparamos las medias de los controles de ambos periodos, y ahí se vieron las diferencias. No solo en proteínas totales: en otros analitos también, que quizás cuente en otro artículo. Lo que no hicimos, y lo digo sin ánimo de autoflagelarme, fue comparar muestras de pacientes en ese periodo. La evidencia estaba en los controles, no en los pacientes, y la respuesta definitiva la dio el control externo.

## El control externo, que no sabe de diplomacia

Cuando llegaron los resultados del control externo, el cuadro fue claro: en las muestras de valores normales, bien. En las patológicas, mal. El sesgo no era parejo; dependía del nivel, y estaba por encima de lo que informaban los demás.

Nuestro reactivo estaba calibrado. Estaba dentro de las instrucciones del fabricante. El control interno se veía hermoso. Y aun así el externo decía que no. Recalibrar no ayudaba: el método estaba bien calibrado respecto de sí mismo. El problema no era el ajuste, era la identidad.

Mi sospecha, y lo digo como sospecha porque no conozco la fórmula, es que los cambios que le dieron estabilidad al reactivo también le cambiaron el comportamiento ante ciertas muestras. En la práctica era un **biuret modificado** que se informaba como biuret.

## Entonces, ¿es el mismo barco?

La paradoja tiene varias respuestas, y todas son defendibles.

**La del nombre.** Para el inserto es biuret, para el analizador es biuret, para el informe que le llega al médico es biuret. Si el barco se define por lo que dice el casco, no hay nada que discutir.

**La de la materia.** Es la de Plutarco: si no queda ninguna tabla original, no es el mismo barco. Si la formulación cambió, no es el mismo reactivo. Respuesta tramposa en un laboratorio, donde un reactivo cambia de lote cada tanto y nadie lo toma por otro método.

**La de Hobbes.** El filósofo le subió la apuesta: ¿y si alguien junta las tablas viejas que se descartaron y arma otro barco? En nuestro caso ese segundo barco existe y tiene flota: es el **biuret sin aditivos** que usan los demás laboratorios y que forma el grupo de comparación del control externo. Nosotros éramos el barco de tablas nuevas, navegando con el nombre antiguo pintado en el casco, rodeado de gente con las tablas originales.

**La de la función.** La única que a un laboratorio le sirve: un método es el mismo si mide lo mismo y entrega el mismo resultado sobre el mismo paciente. En los normales llegaba al mismo puerto. En los patológicos, no. Y ese es el punto en que la paradoja deja de ser una sobremesa: **cada cambio, por separado, pasa la inspección, y la suma cambia la identidad sin que nadie cometa un error.** Nadie mintió. Simplemente nadie tuvo que declarar el momento exacto en que el barco dejó de ser el barco.

## Cómo terminó

![Un barco solitario amarrado al final de un muelle al atardecer, con el casco mezclado de maderas viejas y paneles nuevos, mientras una flota de barcos tradicionales navega a lo lejos y un tecnólogo lo mira desde una caja](/opinion/el-reactivo-de-teseo/imagen-4.jpg)

Comparado con el analizador y el reactivo, nuestro desempeño era correcto. Comparado con el método, es decir, con todos los laboratorios que procesan biuret a nivel nacional y mundial, ese analizador con ese reactivo se alejaba mucho de la distribución del resto.

Se optó por una evaluación exclusiva: tratarlo como lo que era, un biuret modificado, con el analizador y el reactivo específicos, comparado solo con quienes usaban la misma combinación. En criollo: el barco quedó solo en el muelle, evaluándose contra sí mismo.

¿Es lo más correcto? No lo sé. Es una decisión de criterio, de cada evaluador y de cada laboratorio, y la única manera sensata de tomarla es en conjunto, dejando registro y respaldo de por qué se tomó. Lo que sí sé es lo que no habría que hacer: tomarla en silencio, o no tomarla y dejar que el nombre de la caja la tome por uno.

## Lo que me dejó

- **Pregunta por escrito si cambió la formulación**, no solo el código del producto. Un reactivo puede mejorar su estabilidad y cambiar su comportamiento, y las dos cosas rara vez vienen en la misma frase del folleto.
- **Cuando cambies de reactivo, compara el mismo lote de control contra el periodo anterior antes de recalcular nada.** Si se mueve una fracción importante de tu error permitido, no es "lo normal del cambio": es un hallazgo. La [estadística del control](/calculadoras/estadistica-del-control/) y el [gráfico de Levey-Jennings](/calculadoras/levey-jennings/) sirven para eso.
- **Compara también muestras de pacientes**, con valores bajos y altos, no solo normales. El sesgo de un método modificado se separa del original en los extremos. La [verificación de precisión 5 × 5](/calculadoras/verificacion-de-precision/) ayuda a separar lo que repite el método de lo que se mueve entre días.
- **Define y documenta el tiempo máximo a bordo** con tus propios datos, y verifica el desempeño al final de ese plazo, no al comienzo. Si el cambio de frasco es una política escrita, no hay nada que esconder.
- **Registra cada cambio de reactivo, de lote y de calibración** junto al control de ese momento. Así puedes separar un reactivo nuevo de uno que se salvó de la alarma.
- **Pregúntate siempre si es sesgo o imprecisión.** El remedio de uno no sirve para el otro.

Para ordenar el resto hay fichas de [control de calidad interno y externo](/herramientas/control-de-calidad-interno-y-externo/) y de [inventario y lotes de reactivos](/herramientas/inventario-y-lotes-de-reactivos/).

## Y ahí entra Consensus QC

Esta historia es parte de la razón por la que armé [Consensus QC](/consensus-qc/), el software de control de calidad analítico de ConsensusLab. Un cambio de reactivo o de lote tiene que quedar a la vista, con su fecha, sus controles y su comparación, no en la memoria de quien estaba esa semana. Y el desempeño mes a mes por analizador, con su sesgo, su CV, su error total frente al permitido y su sigma, muestra qué parte del presupuesto de error se está comiendo cada cosa.

Así la próxima vez que un control dé 5,3 donde siempre daba 4,8, la conversación empieza con datos a la vista y no con "es esperable, es un reactivo nuevo".

¿Y el barco de Teseo? Sigue en el muelle. Lo importante no es resolver la paradoja: es saber en qué momento dejó de ser el mismo barco, antes de que lo diga el control externo.

---

*Primer artículo de la serie «Casos de calidad analítica». Un tema parecido, visto desde la cultura del laboratorio, en [El N20 que estrechó las gráficas](/opinion/el-n20-que-estrecho-las-graficas/).*
