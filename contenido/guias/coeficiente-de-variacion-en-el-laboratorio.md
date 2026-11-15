---
titulo: "El coeficiente de variación en el laboratorio: de dónde viene, cuándo engaña y cuál sirve para el error total"
fecha: 2026-11-14
resumen: "Qué es el CV, de dónde sale, por qué se distorsiona con valores muy bajos o muy altos, qué cambia si controlas 1, 2 o 3 veces al día, cómo un CV mensual puede tapar un sesgo de calibración, de dónde salen el 1,65, el 1,96 y el 2, y qué CV es comparable con el error total aceptable."
temas: ["Control de calidad", "Estadística", "Error total permitido", "Sigma"]
---


El coeficiente de variación (CV) es el número más repetido del control de calidad y uno de los peor entendidos. Se lo mira como si fuera una propiedad del método («este equipo tiene 2 %»), cuando en realidad es una propiedad del método, **a una concentración, durante una ventana de tiempo, bajo ciertas condiciones y con cierta cantidad de datos**. Cambia cualquiera de esas cuatro cosas y el número cambia, sin que el equipo haya cambiado.

Esta guía recorre lo que hay que saber para usarlo bien: de dónde sale, cuándo se distorsiona, qué le pasa cuando controlas más o menos veces al día, cómo un cálculo mensual puede esconder un sesgo, por qué el error total se arma con 1,65 (o 1,96, o 2) y qué CV es el que corresponde comparar con el error total aceptable. Al final hay una lista de usos y una lista de verificación.

## 1. Qué es y de dónde viene

**CV % = desviación estándar ÷ media × 100.**

La desviación estándar (DE) mide la dispersión en las unidades del examen. El CV la divide por la media para expresarla como proporción, y por eso no tiene unidades. Esa es su única gracia: permite comparar dispersión entre niveles, entre exámenes o entre métodos que miden en unidades distintas.

El término aparece ya en un trabajo de Karl Pearson de 1896 sobre regresión, herencia y panmixia (*Philosophical Transactions of the Royal Society A*, 187:253-318), que incluye una sección titulada «The Coefficient of Variation». Su lógica estadística descansa en una observación empírica que ocurre en muchas mediciones: **la dispersión crece en proporción a la magnitud medida**. Si una balanza se equivoca 1 % en cualquier masa, el error en 10 g es 0,1 g y en 1000 g es 10 g. La DE cambia mucho; el CV no. Cuando ocurre eso, el CV es la forma natural de describir la imprecisión: un solo número para todo el rango.

Dos consecuencias que se olvidan:

- **El CV solo tiene sentido en una escala con cero verdadero** (escala de razón). Una dispersión «relativa a la media» no significa nada si el cero es arbitrario. Se ve con la HbA1c (sección 3).
- **El CV supone que DE y media van juntas.** Cuando esa relación se rompe (valores muy bajos, extremos del rango, materiales distintos), el CV deja de describir bien la imprecisión. De eso trata la sección 3.

Un dato útil: si los resultados siguen una distribución log-normal, que es lo que ocurre cuando el error es proporcional, la DE del logaritmo natural es casi igual al CV expresado como fracción (para CV pequeños). Por eso los métodos que trabajan «en logaritmos» y los que trabajan con CV dicen casi lo mismo.

## 2. Qué CV: no todos son el mismo número

Antes de comparar dos CV hay que saber cuál de los dos es. Sobre un mismo método, para un mismo nivel de control:

| Tipo | Qué incluye | Cómo se obtiene | Cuánto suele valer |
|---|---|---|---|
| **Repetibilidad** (dentro de la corrida) | Solo el ruido de medir lo mismo seguido, mismas condiciones | Réplicas en una misma corrida | El más bajo |
| **Precisión intermedia / intralaboratorio** (total) | Ruido dentro de la corrida **más** variación entre corridas, días, calibraciones, lotes de reactivo, operadores | Datos de control interno acumulados en el tiempo | Intermedio |
| **Reproducibilidad** | Lo anterior **más** diferencias entre laboratorios | Datos de rondas o estudios entre laboratorios | El más alto |

Esta es la terminología de las normas ISO 5725 (la parte 3, edición 2023, trata la precisión intermedia) y de los documentos CLSI para verificar precisión: EP15-A3 verifica la repetibilidad y la precisión intralaboratorio contra lo declarado por el fabricante.

En un laboratorio que hace control interno, el CV que sale del gráfico mensual es, en la práctica, un **CV intralaboratorio**: mezcla todo lo que ocurrió en esa ventana. Y el CV de repetibilidad que declara el fabricante es otro número, más bajo, que no representa la rutina. Comparar el segundo con el primero es el error más común, y lo retomamos en la sección 8.

## 3. Cuándo el CV se distorsiona

### 3.1 Valores muy bajos

Casi todos los métodos tienen un piso de ruido que no depende de la concentración: ruido electrónico, ruido del blanco, resolución del lector. Ese componente es constante en unidades absolutas. Una forma habitual de modelarlo es:

**DE² = a² + (b × media)²**

donde *a* es el ruido de piso (en unidades) y *b* es la parte proporcional (como fracción). Un ejemplo con números ilustrativos, *a* = 0,02 unidades y *b* = 2 %:

| Media (unidades) | DE (unidades) | CV |
|---|---|---|
| 0,05 | 0,020 | 40,0 % |
| 0,1 | 0,020 | 20,1 % |
| 0,2 | 0,020 | 10,2 % |
| 0,5 | 0,022 | 4,5 % |
| 1 | 0,028 | 2,8 % |
| 2 | 0,045 | 2,2 % |
| 10 | 0,201 | 2,0 % |
| 100 | 2,000 | 2,0 % |

Es el mismo método, con el mismo desempeño. Lo único que cambió es la concentración. A 0,05 el CV es 40 % y a 100 es 2 %. Decir «el CV de este método es 2 %» es verdad solo en la zona donde domina la parte proporcional.


![Gráfico del CV según la concentración: sube mucho en valores bajos y se aplana cerca de 2 % en valores altos](/guias/coeficiente-de-variacion-en-el-laboratorio/figura-1.svg)

*Figura 1. El mismo método, con la misma imprecisión de fondo, da CV muy distintos según el nivel (ejemplo ilustrativo: ruido de piso de 0,02 unidades y 2 % proporcional).*

Qué implica:

- **Bajo cierta concentración, el CV deja de ser un indicador de calidad y pasa a ser un indicador de cuán cerca del cero estás.** En el ejemplo, el punto de quiebre está donde *a* = *b* × media, es decir en 1 unidad.
- **Se usa la DE en unidades, no el CV, para describir la imprecisión en la zona baja.** Y por eso algunas metas de calidad en esa zona se expresan como «± X unidades o ± Y %, lo que sea mayor». Si tu meta es mixta y tu CV es porcentual, no son comparables sin pensarlo (sección 8).
- **El «límite de cuantificación funcional»** se define precisamente con esta idea: la concentración más baja a la que el CV aún es aceptable, por convención 20 % (la «sensibilidad funcional» se define como la concentración con CV de 20 % u otro porcentaje fijado de antemano, y se usó mucho en inmunoensayos como TSH; para el límite de cuantificación hay quien exige 15 a 20 % o un objetivo de error total).
- **La recomendación práctica:** si trabajas con controles cerca del límite bajo (troponinas, hormonas, marcadores tumorales, PCR ultrasensible), mira el perfil de precisión (DE contra concentración) y no un CV único. Un nivel de control a 0,05 y otro a 50 no tienen por qué tener el mismo CV, y está bien.

### 3.2 Valores muy altos

Arriba el CV suele estabilizarse en el valor de *b* (la parte proporcional). No hay una regla general de que suba o baje, y ahí está el problema: **depende del método**. Lo que sí se observa a menudo:

- **Se aplana.** Si el error es puramente proporcional, el CV es constante. Es lo esperable y es el rango donde el CV es más útil.
- **Puede empeorar cerca del techo del rango**: saturación del detector, curva de calibración que se aplana, absorbancia fuera del rango lineal.
- **Puede cambiar de naturaleza si el equipo diluye automáticamente**: el resultado final incluye el error de dilución y el de la medición, y el CV del control alto «diluido» no es el de uno que cae en el rango directo.
- **Puede parecer mejor de lo que es**: con muy pocos puntos o con valores truncados (por ejemplo, un material que se satura en el techo), el CV sale bajo porque se perdió variación.

Una consecuencia práctica: **no extrapoles el CV de un nivel a otro**. Un CV de 2 % en el nivel normal no dice nada del CV en el nivel patológico alto, ni en el bajo. Por eso el control se hace con al menos dos niveles y se evalúa cada uno por separado.

### 3.3 Cuando dos unidades no comparten el cero: el caso de la HbA1c

**La idea en una frase:** si cambias la unidad de un resultado **multiplicando** (de mg/dL a mmol/L, por ejemplo), el CV no cambia. Si la conversión además **suma o resta** una cantidad, el CV cambia, aunque los datos sean exactamente los mismos.

**Por qué.** El CV es DE ÷ media. Al convertir de unidad pasa esto:

- **Si solo multiplicas** (glucosa de mg/dL a mmol/L: se divide por 18), la media y la DE se multiplican por el mismo factor. Se cancela en la división y el CV queda igual.
- **Si además sumas** (HbA1c), la media se corre y la DE no. La DE mide qué tan separados están los datos entre sí, y correr todos los datos lo mismo no cambia esa separación. Pero la media sí cambia, porque se mide desde el cero de la escala. Con otra media en el denominador, el CV es otro.

**La HbA1c tiene dos unidades de uso corriente:** el porcentaje (NGSP, el de Estados Unidos y de muchos laboratorios) y los mmol/mol (IFCC, el método de referencia internacional). Se convierten con la ecuación maestra:

> NGSP (%) = 0,09148 × IFCC (mmol/mol) + 2,152

(la publica el NGSP en su documentación sobre la estandarización IFCC, [ngsp.org](https://ngsp.org/ifccngsp.asp); algunas fuentes la redondean a 0,0915 y 2,15). Tiene una parte que multiplica (0,09148) y una que **suma** (2,152). Esa suma significa que el cero de una escala no coincide con el cero de la otra: 0 mmol/mol equivale a 2,152 %, no a 0 %.

**Un ejemplo con un mismo control, medido en un laboratorio.** Supón que el control, expresado en porcentaje, da media 6,5 % y DE 0,15 %. Se pasa a mmol/mol así:

**Tabla 3.3. Los mismos datos de HbA1c, expresados en dos unidades, dan dos CV distintos.** Los datos no cambiaron y el método tampoco; solo cambió la unidad.

| Paso | En porcentaje (NGSP) | En mmol/mol (IFCC) | Cómo se obtiene |
|---|---|---|---|
| Media | 6,5 % | 47,5 mmol/mol | (6,5 − 2,152) ÷ 0,09148 |
| DE | 0,15 % | 1,64 mmol/mol | 0,15 ÷ 0,09148 (la suma de 2,152 no entra, porque la DE no depende de dónde esté el cero) |
| **CV = DE ÷ media** | **2,3 %** | **3,5 %** | 0,15 ÷ 6,5 contra 1,64 ÷ 47,5 |


![Dos reglas de HbA1c con ceros distintos: la misma DE da un CV de 2,3 % en NGSP y de 3,5 % en IFCC](/guias/coeficiente-de-variacion-en-el-laboratorio/figura-2.svg)

*Figura 2. Las dos escalas de HbA1c dibujadas una sobre otra. El cero de IFCC cae en 2,152 % de la escala NGSP, de modo que la distancia hasta la media es distinta y, con ella, el CV.*

**Cuál es el «correcto».** Ninguno es un error: cada uno es el CV de su escala. El problema aparece cuando se comparan sin saberlo (el de tu laboratorio en porcentaje contra el de un programa de pares o un inserto en mmol/mol), o cuando se aplica un error total aceptable expresado en una unidad al CV de la otra.

**Qué hacer:** anota siempre en qué unidad está el CV, compara CV solo en la misma unidad, y para la HbA1c da también la DE en unidades (0,15 % o 1,64 mmol/mol), que es la que se puede convertir sin ambigüedad.

**Lo mismo ocurre con otras escalas.** La temperatura en °C es el ejemplo clásico: 20 °C no es «la mitad» de 40 °C, porque el cero de los °C es una convención. Un CV de temperatura en °C da un número, y en kelvin da otro. El pH es una escala logarítmica, y tampoco admite un CV con sentido. Regla: **el CV solo es una buena medida cuando la escala tiene un cero que significa «nada de lo que se mide».**

### 3.4 Cuando la media se acerca a cero

**Una aclaración antes de empezar: esto es un caso poco frecuente.** En el laboratorio casi todos los resultados son siempre positivos y están lejos de cero (una glucosa, una creatinina, una enzima), así que esta situación casi no aparece al evaluar un método. Se incluye porque explica **por qué** el CV tiene un límite, y porque aparece en algunos cálculos, como las diferencias entre dos métodos. El ejemplo de abajo es **hipotético**: se armó para ver el efecto, no viene de datos reales. Su finalidad es **académica**: entender cómo se comporta el coeficiente de variación y en qué escenarios corresponde (o no) usarlo.

**El problema.** El CV divide por la media. Si la media es muy pequeña, o es el resultado de valores positivos y negativos que se compensan, el denominador se acerca a cero y el CV se dispara, aunque la dispersión de los datos sea normal. Pasa con magnitudes que cruzan el cero: la diferencia entre dos métodos (resultado del método A menos el del método B), el cambio de un paciente entre dos controles, un balance.

**Un ejemplo hipotético.** Supón que compararon dos métodos con 5 muestras y calcularon la diferencia entre ambos en cada una (en unidades del examen):

| Muestra | 1 | 2 | 3 | 4 | 5 | Media | DE | CV |
|---|---|---|---|---|---|---|---|---|
| Diferencias (caso 1) | +2 | −1 | +3 | −2 | 0 | 0,4 | 2,07 | **518 %** |
| Diferencias (caso 2) | +2 | −1 | +3 | −2 | +1 | 0,6 | 2,07 | **346 %** |

**Tabla 3.4. Dos conjuntos de diferencias con la misma dispersión, y CV muy distintos.** Los dos casos tienen exactamente la misma DE (2,07). El único cambio es una muestra (de 0 a +1), que movió la media de 0,4 a 0,6. Como la media es pequeña, cualquier cambio mínimo en ella cambia mucho el CV.


![Dos conjuntos de diferencias con la misma dispersión, cuya media pequeña produce CV de 518 % y 346 %](/guias/coeficiente-de-variacion-en-el-laboratorio/figura-3.svg)

*Figura 3. Los mismos 5 puntos, salvo uno. La dispersión no cambia; la media, que es el denominador del CV, sí.*

Un CV de 518 % significa que la DE es 5,18 veces la media. Escrito en números: «518 por ciento» (quinientos dieciocho por ciento), no «5,18 %».

**Qué enseña.** El CV de 518 % y el de 346 % parecen decir que los dos casos son muy distintos, y no lo son: la dispersión es idéntica. El CV dejó de medir dispersión y pasó a medir qué tan cerca de cero cayó la media por casualidad. Por eso con medias cercanas a cero (o con signo) **el CV no sirve, y se usa la DE en las unidades del examen.**

**Otro ejemplo, más extremo.** Si la media es 0,1 y la DE es 1, el CV es 1000 % (mil por ciento): la DE es diez veces la media. Ese número no aporta nada; lo útil es decir «DE de 1 unidad».

**Regla práctica.** Si lo que analizas puede ser positivo o negativo, o su media es pequeña frente a su DE, reporta la DE. El CV se reserva para magnitudes siempre positivas y lejos de cero, que son la gran mayoría de los resultados del laboratorio.

### 3.5 Resumen: cuándo sirve y cuándo no

| Sirve cuando | No sirve (o hay que cuidarlo) cuando |
|---|---|
| La unidad tiene un cero que significa «nada» | El cero de la escala es una convención o se desplaza al convertir (°C, pH, HbA1c en %) |
| La DE es proporcional a la media | La concentración está cerca del límite inferior |
| Comparas niveles, métodos o exámenes de rango parecido | La media cruza el cero o es muy pequeña |
| Tu meta está en % | Tu meta es mixta (unidades o %), o está en unidades |
| Tienes suficientes datos (sección 4) | Tienes pocos datos o están truncados |

### 3.6 Un caso: el control nuevo que prometía menos CV

Un proveedor nos ofreció un control de calidad nuevo. Lo primero que se revisa de un control es la **matriz** (de qué está hecho, de qué especie y cómo se presenta) y la **tabla de medias**, para ver en qué rango cae cada nivel.

Lo que me llamó la atención de inmediato fue que, en las transaminasas, **las medias del control «normal» estaban por encima del intervalo de referencia** de una persona sana. Y, además, el proveedor informaba para ellas un **CV mucho menor** que el que yo manejaba con los controles que ya teníamos. Los nuestros, en cambio, tenían la media del nivel «normal» **dentro** del intervalo de referencia.

Podría haberse leído como «el control nuevo es más preciso». Al indagar, la explicación era otra: **no es que el control fuera mejor, es que estaba en otro nivel.** A esas actividades, más altas, las transaminasas se estabilizan mucho. Los dos CV no eran comparables, porque no medían lo mismo: uno era el CV de un nivel cerca del piso del ensayo y el otro, el de un nivel donde el método trabaja con holgura.

La explicación está en la reacción. Estos ensayos siguen el consumo de NADH en el tiempo, y el resultado sale de la **pendiente** de esa curva. Con actividades bajas, el NADH se consume muy despacio, la pendiente es casi plana y el ruido del fotómetro pesa mucho sobre ella. Con actividades más altas, la reacción es más rápida, la curva es más estable y la pendiente se mide bien. Es el mismo piso de ruido de la sección 3.1: **cerca del límite bajo del ensayo, el CV deja de hablar de la calidad del método y habla de qué tan cerca del cero estás.** Es la explicación que encontramos en el laboratorio, coherente con la cinética del ensayo; no proviene de un estudio publicado.

**La decisión.** Mantuvimos los controles que teníamos, sin cambiar al nuevo, y fijamos como política del laboratorio que, para evaluar el desempeño, **se usaría el CV mayor y no el menor.** Era la elección conservadora: no podía decirse que el método cumplía el error total aceptable usando el nivel más favorable. Y tuvo un costo, que fue el esperable: con el CV del nivel bajo, cumplir la meta de error total era más difícil.

**Donde la política no funcionó.** Con la **TSH** el control venía con tres niveles, que nadie había elegido: se medían los tres porque el material los traía. Con la regla del CV mayor, el nivel bajo daba un CV de 9 a 11 %. Cambiamos el criterio y pasamos a evaluar con el **nivel 2**, más alto, que además caía dentro del intervalo de referencia de una persona sana. El CV bajó a 3 a 4 %. Una decisión pequeña movió el CV a casi un tercio, sin que el método hubiera cambiado.

**Lo que enseña, y lo que hay que cuidar:**

1. **El CV depende del nivel, y el nivel se elige.** Es el punto de esta sección y de la 8. Entre 9 % y 3 % no hubo mejora técnica: hubo un cambio de dónde se mide.
2. **Si un proveedor ofrece un control con menos CV, mira primero en qué nivel está.** Dos CV solo se comparan si se midieron en niveles parecidos; uno cerca del piso del ensayo y otro bien arriba no hablan de lo mismo.
3. **«Control normal» es una etiqueta del fabricante, no una afirmación sobre el intervalo de referencia.** Antes de usarlo, conviene comparar la media de cada nivel con los puntos de decisión del examen.
4. **Elegir el nivel por su CV es peligroso; elegirlo por razones escritas antes de mirar el CV, no.** Aquí había una razón técnica sólida: el nivel bajo estaba cerca del piso del ensayo, donde el CV no mide la calidad del método. Pero si el criterio se escribe después de ver el número, es la misma vara escogida a conveniencia de la que habla la [guía del error total](/guias/error-total-permitido-como-elegirlo/). Un criterio defendible: evaluar en los niveles cercanos a los puntos de decisión clínica y fuera del piso del ensayo.
5. **«Usar el CV mayor» tiene un límite.** Si un nivel está en el piso del ensayo, su CV mayor lo fija el ruido de piso y no el método, y el sigma sale bajo sin que el equipo haya empeorado. Dos salidas: elegir los niveles con un criterio (como en el punto anterior) o usar para ese nivel una meta absoluta en unidades (sección 3.1).
6. **Que el nivel no entre en el cálculo del error total no significa que se saque del control.** El nivel bajo sigue sirviendo para detectar desplazamientos a actividades bajas, con su DE en unidades.
7. **Tres niveles porque «el kit trae tres» no es un plan.** El plan dice qué niveles se miden, para qué decisión y por qué.

## 4. ¿Cuántos datos hay detrás del CV?

El CV es una estimación. Con pocos datos, es una estimación ruidosa. Un CV real de 2,0 %, calculado con n puntos independientes, cae en estos rangos el 95 % de las veces (cálculo con la distribución χ²):

| n | Rango del CV observado | Error relativo aprox. |
|---|---|---|
| 20 | 1,5 % a 2,9 % | 16 % |
| 30 | 1,6 % a 2,7 % | 13 % |
| 60 | 1,7 % a 2,4 % | 9 % |
| 90 | 1,7 % a 2,3 % | 7 % |

Con 20 puntos, un método con CV real de 2,0 % puede mostrar un 1,5 % o un 2,9 % sin que nada haya cambiado. Si compras o rechazas un equipo por esa diferencia, estás decidiendo con ruido.

![Rango del CV observado según n: con 20 datos va de 1,5 a 2,9 % cuando el CV real es 2,0 %](/guias/coeficiente-de-variacion-en-el-laboratorio/figura-4.svg)

*Figura 4. Un CV real de 2,0 % medido con distinta cantidad de datos independientes: con 20 puntos el CV observado puede caer entre 1,5 % y 2,9 %.*

Dos detalles más:

- **Con n muy pequeño el CV muestral tiende a quedar levemente bajo el real.** En una simulación con CV real de 2 %, con n = 5 el promedio de lo observado fue 1,88 %, y con n = 20, 1,97 %. No es un problema con 20 o más datos.
- **Un intervalo de confianza del CV es más informativo que el CV.** El CV acompañado de su intervalo dice cuánto se puede confiar en él. En la [calculadora de estadística del control](/calculadoras/estadistica-del-control/) puedes calcular media, DE y CV de tus datos.

### 4.1 Si controlas una vez al día por nivel: cómo trabajar con un CV impreciso

Un laboratorio pequeño con un control por nivel al día tiene unos 20 a 30 datos al mes. Eso deja un error relativo de 13 a 16 % en el CV, y ese error se traslada al error total: con un sesgo de 1 % y un CV real de 2 %, un mes de 20 datos puede mostrar un CV de 1,5 a 2,9 %, es decir, un error total de 3,5 a 5,8 %. Aumentar el número de datos ayuda, pero no es la única palanca, y a veces no es la mejor (sección 5: más corridas el mismo día aportan menos de lo que parece). Estas son las alternativas, de más a menos útil. Las cifras salen de la distribución χ² y de una simulación mía; son ilustraciones.

**1. Cambiar la pregunta: no «cuánto vale el CV del mes», sino «¿este mes empeoró respecto de mi CV establecido?».** Con un CV histórico de 2,0 %, un mes de 20 datos solo aporta evidencia de empeoramiento (al 95 %) si su CV pasa de unos 2,5 %; con 30 datos, de unos 2,4 %. Todo lo que quede por debajo de esos umbrales es ruido. Es el mismo razonamiento del límite superior de verificación de la [guía de verificación de métodos](/guias/verifica-un-metodo-sin-perder-una-semana/): comparar con un valor de referencia usando un límite que descuenta el azar. Evita reaccionar a un mes «malo» que no lo es.

**2. Decidir con el límite de confianza y no con el valor puntual.** Con 20 datos y un CV observado de 2,0 %, el límite superior (95 %, una cola) es de 2,7 %. La regla queda en tres zonas, respecto del CV máximo que tolera tu error total aceptable:

- si el **límite superior** ya cumple, el método cumple con margen y no hace falta más;
- si hasta el **límite inferior** queda por sobre la meta, el método incumple y hay que actuar;
- si la meta cae **dentro del intervalo**, la información es insuficiente: se junta más.

Con esto, el laboratorio solo necesita más datos cuando de verdad están cerca del límite.

**3. Evaluar cada mes con una ventana móvil de tres meses (o el lote completo del control).** El informe sigue siendo mensual, pero el CV se calcula con los últimos 60 a 90 datos. Combinando por varianzas (sección 6.2), con tres meses de 20 datos el error relativo baja de 16 % a 9 %, y con seis meses a 7 %. Condiciones: el mismo lote de control y que no haya habido eventos entre medio. Si los hubo (calibración, cambio de lote de reactivo), la ventana debe respetar los segmentos de la sección 6, y el cambio entre ellos es información, no ruido.

**4. Combinar niveles, solo si se comportan igual.** Si el CV de los dos niveles es parecido (se puede comprobar con una prueba F de varianzas) y el error es proporcional, juntar los grados de libertad de ambos baja el error relativo de 16 % a unos 11 %. **No sirve si un nivel está cerca del piso del ensayo**, como en el caso de las transaminasas de la sección 3.6: ahí el CV de los niveles es distinto por razones del método. Es una propuesta práctica, no un procedimiento estandarizado.

**5. Usar datos de afuera como referencia, no como reemplazo.** El CV del grupo de pares de un programa de comparación entre laboratorios se calcula con miles de datos y es una referencia mucho más estable que el tuyo. Sirve para preguntar: ¿mi CV es coherente con el de laboratorios con el mismo equipo y lote? (la relación entre tu CV y el del grupo, sección 6). No reemplaza tu CV, porque el tuyo es el de tus condiciones, pero acota qué valores son plausibles.

**6. Para detectar cambios, apoyarse en los datos de pacientes.** Un promedio móvil de resultados de pacientes tiene cientos o miles de datos al mes y avisa de un desplazamiento sostenido mucho antes que un control diario. No mide la imprecisión del método, pero libera al control de la tarea de detectar todo.

**7. Separar «vigilar» de «decidir».** Con un control diario, el CV mensual sirve para **vigilar** (con los umbrales del punto 1). El CV para **decidir**, el del error total, el sigma y la incertidumbre, se calcula con el acumulado de tres a seis meses (o con el lote completo), y se combina con el último sesgo contra el grupo de pares. Los laboratorios que evalúan una vez al mes pueden mantener la evaluación mensual si la regla está escrita así.

Lo que **no** conviene hacer: repetir el control varias veces el mismo día para «tener más datos» (sección 5), ni bajar la vara de cumplimiento para que el mes salga bien, ni promediar CV mensuales (sección 6.3).

**Resumen para un laboratorio pequeño (cuadro 4.1):**

| Pregunta | Qué se usa | Datos que lo respaldan |
|---|---|---|
| ¿Empeoró este mes? | CV del mes contra el CV establecido, con su umbral | 20 a 30 datos |
| ¿Cumple el error total aceptable? | CV acumulado de 3 a 6 meses (mismo lote) más el último sesgo, con intervalo de confianza | 60 a 120 datos |
| ¿Cambió el método de forma sostenida? | Reglas de Westgard, CUSUM/EWMA y promedios móviles | todos los datos |
| ¿Estoy en línea con otros? | CV del grupo de pares | grupo de pares |

## 5. Controlar 1, 2 o 3 veces al día: qué pasa con el CV mensual

La intuición dice: si controlo tres veces al día, tengo tres veces más datos, así que mi CV es más confiable (o más bajo). La realidad es más matizada, y tiene una razón estadística: **los puntos de un mismo día no son independientes**. Comparten la calibración del día, el lote de reactivo abierto, la temperatura del lugar.

Para ver cuánto importa, se simuló un mes de 30 días con una imprecisión «real» de CV 1,80 %, repartida así: variación de un día a otro de 1,5 % y variación dentro del día de 1,0 % (parámetros ilustrativos; el total es √(1,5² + 1,0²) = 1,80 %). Se simularon 40 mil meses por cada frecuencia:

| Corridas por día (n al mes) | CV mensual esperado | Rango que cubre el 95 % de los meses |
|---|---|---|
| 1 (30) | 1,79 % | 1,34 a 2,27 |
| 2 (60) | 1,78 % | 1,40 a 2,19 |
| 3 (90) | 1,78 % | 1,43 a 2,17 |
| *Si los puntos fueran independientes:* n = 60 | | 1,48 a 2,13 |
| *Si los puntos fueran independientes:* n = 90 | | 1,54 a 2,07 |


![Rango del CV mensual con 1, 2 o 3 corridas al día: se estrecha menos de lo que ocurriría con datos independientes](/guias/coeficiente-de-variacion-en-el-laboratorio/figura-5.svg)

*Figura 5. Triplicar las corridas diarias reduce el rango del CV mensual mucho menos que si los 90 datos fueran independientes (franja gris).*

Lo que muestra:

1. **El CV esperado no cambia con la frecuencia.** Controlar más veces no lo baja ni lo sube, siempre que cada día se muestree de forma representativa. Un laboratorio que controla 3 veces al día y otro que lo hace una vez, con el mismo método, deberían tener el mismo CV mensual, en promedio.
2. **Lo que cambia es la incertidumbre del CV, y menos de lo que se espera.** Con el triple de datos, el rango de un mes pasó de 0,93 puntos de ancho a 0,74. Si los puntos hubieran sido independientes, habría bajado a 0,53. La diferencia es la parte «entre días» de la variación, que no se reduce con más corridas el mismo día.
3. **Si casi toda la variación es de un día a otro, repetir en el mismo día casi no ayuda.** En otra simulación, con 0,3 % dentro del día y 1,5 % entre días, tres corridas diarias dieron un rango (1,14 a 1,89) parecido al de 30 puntos independientes. Para estimar el CV total, importan los **días distintos**, no las corridas.

Lo que sí cambia cuando controlas con más frecuencia:

- **Qué puedes aprender.** Con dos o más corridas por día puedes separar la variación dentro del día de la variación entre días (un análisis de varianza). Eso te dice si el problema está en la repetibilidad (reactivo, pipetas, mezcla) o en el día a día (calibración, lote). Con una sola corrida diaria, no.
- **La ventana de tiempo.** Una corrida diaria a las 8:00 mide el equipo recién preparado. Tres corridas repartidas en el turno miden también la deriva dentro del día. Los CV no son comparables si las horas de muestreo son distintas.
- **El efecto de repetir hasta que «entre».** Es el hábito de repetir el control cuando sale fuera de límites y quedarse con el que cae dentro. Si en la simulación se repite todo valor que supera ±2 DE hasta obtener uno dentro, el CV observado cae a 1,58 % cuando el real es 1,80 % (88 % del real). **El CV se «mejora» por censura, no porque el método sea mejor.** La corrección es registrar todas las corridas, incluidas las repetidas y las rechazadas, y analizar la causa.
- **La detección de errores.** Más corridas aumentan la probabilidad de detectar un cambio antes de que afecte pacientes, y también la de falsas alarmas. Es otra decisión, ligada al plan de control, no al CV ([guía del plan de control interno](/guias/plan-de-control-interno-de-calidad/)).

### 5.1 Separar el CV por horario: ¿sirve calcular uno para la mañana, otro para el mediodía y otro para la tarde?

Si controlas tres veces al día, siempre a la misma hora, puedes calcular tres CV, uno por horario, con los datos de las mañanas, los mediodías y las tardes. La pregunta es qué se puede aprender de eso. Para responderla se simularon tres situaciones (parámetros ilustrativos: variación entre días de 1,5 %, variación dentro del día de 1,0 %, CV total de 1,80 %; 20 mil meses por situación). Es una ilustración, no datos de un laboratorio.

**Situación A: el horario no importa.** Los tres CV deberían ser iguales. No lo son, por azar:

| Datos por horario | Razón entre el CV mayor y el menor: mediana | Meses en que la razón pasa de 1,3 | En el 5 % de los meses pasa de |
|---|---|---|---|
| 30 días (un mes) | 1,17 | 14 % | 1,39 |
| 90 días (tres meses) | 1,09 | menos de 1 % | 1,20 |

**Tabla 5.1. Cuánto difieren los CV por horario solo por azar.** En un mes, un CV de la tarde 30 % mayor que el de la mañana ocurre en 1 de cada 7 meses aunque no pase nada. No se debe leer como una diferencia real.

**Situación B: hay un desplazamiento sistemático según la hora** (por ejemplo, la tarde da 0,4 % más y la mañana 0,4 % menos, una diferencia de 0,8 % entre ambas). Resultado:

- El CV de cada horario **no se ve afectado** (1,79 % en promedio, igual que sin desplazamiento), porque cada horario se mide alrededor de su propia media.
- El CV de todos los datos juntos casi no cambia (1,81 %).
- **Se detecta con la diferencia de medias entre horarios, comparando cada tarde con la mañana del mismo día.** Así se elimina la variación entre días, y con 30 días la prueba lo detecta el 85 % de las veces (con una diferencia de 1,6 %, el 100 %).

La lección es la más importante de esta sección: **un desplazamiento sistemático por horario es invisible para el CV, y se ve en las medias.** Si solo miras tres CV, te pierdes el problema más frecuente.


![Tres horarios con CV iguales y medias desplazadas: el CV por horario no detecta el desplazamiento](/guias/coeficiente-de-variacion-en-el-laboratorio/figura-6.svg)

*Figura 6. Situación B: el CV de cada horario no cambia, y la diferencia solo se ve en las medias (valores ilustrativos).*

**Situación C: la variación es mayor en un horario** (por ejemplo, la tarde con una variación dentro del día de 2,0 % contra 1,0 % en la mañana). Las DE reales pasan de 1,80 % a 2,50 % (razón de 1,4). Con una prueba F entre horarios:

| Datos por horario | Cuántas veces se detecta (potencia) |
|---|---|
| 30 días | 39 % |
| 90 días | 90 % |

Un horario 40 % peor se pasa por alto en 6 de cada 10 meses. Hacen falta unos tres meses de datos para verlo con confianza.

**Qué decisión se toma según lo que encuentres**

| Lo que ves | Lo que significa | Qué hacer |
|---|---|---|
| Medias y CV parecidos entre horarios (con 90 días o más) | El método se comporta igual todo el día; un control a cualquier hora representa el día | Nada. Puedes calcular un CV con todos los datos. Si más adelante necesitas bajar la frecuencia, sabes que no pierdes información |
| Las medias difieren según el horario | Hay una deriva a lo largo del día | Primero descarta el material de control (vial abierto en la mañana que se evapora o se degrada, tiempo fuera del refrigerador). Después, el método: estabilidad del reactivo a bordo, temperatura del equipo o de la sala, calibración y su hora, arrastre en los picos de trabajo |
| Un horario tiene más variación (CV mayor) | Hay una fuente de ruido que aparece en ese horario | Mismas causas: carga de trabajo, cambio de turno u operador, reactivo a bordo, ambiente |
| Todo parece igual, pero con pocos días | No hay información suficiente | Seguir juntando datos; no concluir con un mes |

Una consecuencia de fondo: **si hay deriva en el día, el control de la mañana no protege los resultados de la tarde.** Con un solo control diario, esto no se puede ver. Con tres, sí.

**¿Es útil?** Moderadamente, y para una cosa concreta. No sirve como indicador mensual: con 30 días por horario, el azar domina (tabla 5.1). Sirve como **diagnóstico periódico**, cada 3 a 6 meses, al cambiar de lote de reactivo, después de una mantención o cuando hay quejas por resultados de cierto horario. Su valor es responder dos preguntas: si un control a cualquier hora representa el día, y a qué hora conviene hacerlo cuando se quiera bajar la frecuencia. Para eso, conviene usar un análisis de varianza con efecto del día y del horario, o la prueba de medias pareadas, y no tres CV sueltos. Es una síntesis a partir de la simulación de esta sección, no un procedimiento publicado.

## 6. El mes que tapa el sesgo

Muchos laboratorios revisan el CV cada mes, y lo comparan con el informe mensual de un programa de comparación entre laboratorios, que entrega el sesgo contra el grupo de pares (como un índice en desviaciones estándar, el SDI) y una comparación de la imprecisión (la relación entre el CV de tu laboratorio y el CV promedio del grupo). Es un buen hábito, pero tiene una trampa: **un mes es un promedio de todo lo que pasó en ese mes**, incluidas las calibraciones, los cambios de lote y los ajustes.

### 6.1 Qué pasa con un sesgo que cambia dentro del mes

Dos casos simulados, con un CV propio de 1,8 % en cada período (parámetros ilustrativos):

**Caso A: una recalibración a mitad de mes cambia el sesgo de +2 % a −2 %.**

| | Primera mitad | Segunda mitad | **El mes completo** |
|---|---|---|---|
| Sesgo | +2,0 % | −2,0 % | **0,0 %** |
| CV | 1,8 % | 1,8 % | **2,7 %** |
| Error total (sesgo + 1,65 × CV) | 5,0 % | 5,0 % | **4,4 %** |


![Un control con una recalibración a mitad de mes: el promedio del mes es 0 % aunque cada mitad está a 2 % del objetivo](/guias/coeficiente-de-variacion-en-el-laboratorio/figura-7.svg)

*Figura 7. Caso A en un gráfico: un control diario con una recalibración a mitad de mes. El promedio mensual (0 %) esconde dos tramos que están a 2 % del objetivo, uno hacia arriba y otro hacia abajo.*

**Caso B: un solo desplazamiento de +2 % en la segunda mitad.**

| | Primera mitad | Segunda mitad | **El mes completo** |
|---|---|---|---|
| Sesgo | 0,0 % | +2,0 % | **+1,0 %** |
| CV | 1,8 % | 1,8 % | **2,1 %** |
| Error total | 3,0 % | 5,0 % | **4,4 %** |

Con un error total aceptable de 4,5 %, **el mes aprueba (4,4 %) en ambos casos, y el período afectado no (5,0 %)**. El informe mensual dice «sesgo 0,0 %» en el caso A, mientras que todos los resultados del mes estuvieron a 2 % del valor correcto, unos hacia arriba y otros hacia abajo.

Hay dos cosas que se mezclan:

- **El sesgo se cancela** al promediarse (caso A) o se diluye (caso B).
- **El CV absorbe lo que el sesgo pierde.** El CV mensual sube (de 1,8 % a 2,7 %), y el laboratorio lo interpreta como «más imprecisión», cuando en realidad es **inestabilidad entre calibraciones**. Se arregla distinto: la imprecisión se arregla con mantención o reactivos; la inestabilidad, con el proceso de calibración y su verificación.

### 6.2 Lo que conviene hacer

No hay una norma que obligue a una u otra forma de analizarlo (revísalo en tu estándar de acreditación). Lo que propongo, como síntesis a partir de lo anterior:

1. **Marca los eventos en el gráfico**: calibraciones, cambios de lote de reactivo, de calibrador y de control, mantenciones, cambios de operador, ajustes de factor. Sin eso, nadie sabe por qué se movió.
2. **Evalúa por segmento estable**, que es el tramo entre dos eventos. Para cada segmento calcula: n, media, sesgo contra el valor objetivo y CV. Un segmento con menos de 20 puntos no entrega un CV confiable (sección 4); en ese caso, úsalo para el sesgo y toma el CV del acumulado.
3. **Calcula tres cifras, no una:**
   - **CV dentro de los segmentos (combinado):** CV²_dentro = Σ(gl_i × CV_i²) ÷ Σ gl_i, donde gl_i = n_i − 1. Es la imprecisión «de rutina» cuando el equipo está estable.
   - **CV total del acumulado** (de 6 meses a un año, mismo lote de control cuando se pueda): es el que se usa para el error total, el sigma y la incertidumbre.
   - **La razón entre ambos (total ÷ dentro).** Si es cercana a 1, los eventos no mueven mucho el resultado. Si es mucho mayor, hay inestabilidad entre calibraciones o lotes. No conozco un umbral publicado; define uno por examen con tu historia.
4. **Usa el mensual para lo que sí sirve:** comparar con los pares. Pero lee el sesgo **por segmento** cuando haya eventos en el mes, y no solo el promedio.
5. **Complementa con herramientas que detectan cambios** (reglas 4_1s y 10x de Westgard, CUSUM, EWMA), que ven un desplazamiento sostenido antes de que el promedio del mes lo diluya: [CUSUM y EWMA](/calculadoras/cusum-y-ewma/), [reglas de Westgard](/guias/reglas-de-westgard-cuales-usar-y-cuando/).

### 6.3 No promedies CV mensuales

Es un atajo frecuente: «el CV del semestre es el promedio de los seis CV mensuales». Falla por dos razones. Primero, los CV no se promedian, se combinan por varianzas (con los grados de libertad como pesos). Segundo, y más importante, **cada mes se calcula alrededor de su propia media**: si la media cambió entre meses, ese cambio queda fuera del CV mensual y no aparece en el promedio.

En una simulación con seis meses de 30 puntos, variación dentro del mes de 1,5 % y una media que cambia de un mes a otro con una DE de 1,2 % (parámetros ilustrativos), la imprecisión real es √(1,5² + 1,2²) = 1,92 %. El promedio de los seis CV mensuales dio 1,49 % (22 % menos), mientras que el CV de los 180 datos juntos dio 1,85 %. Para el error total, se debe usar el segundo.

## 7. ¿Por qué 1,65? ¿Y el 1,96? ¿Y el 2?

En el modelo de error total, **ET = |sesgo| + z × CV**. El número *z* viene de la distribución normal: es cuántas desviaciones estándar hay que alejarse de la media para dejar fuera una proporción dada de resultados.

| z | Proporción fuera, una cola | Proporción fuera, dos colas | De dónde viene |
|---|---|---|---|
| 1,645 (≈ 1,65) | 5,0 % | 10,0 % | 95 % «a una cola» |
| 1,96 | 2,5 % | 5,0 % | 95 % «a dos colas» |
| 2 | 2,3 % | 4,6 % | Redondeo del 1,96 (95,45 % a dos colas) |
| 3 | 0,13 % | 0,27 % | 99,73 % a dos colas |

Con un sesgo de 1 % y un CV de 2 %, el error total sale 4,3 % con 1,65, 4,9 % con 1,96 y 5,0 % con 2. No es una diferencia trivial: puede ser la que decida si el método aprueba.

**Por qué Westgard usa 1,65.** La razón que se da es que, si hay un sesgo, los errores grandes se concentran en **un solo lado** (el del sesgo), y el otro lado queda muy lejos del límite. Entonces se acepta que el 5 % de los resultados caiga fuera del límite, pero solo en esa cola. Un 5 % a una cola corresponde a z = 1,645. En un artículo de 2013 de *Clinical Laboratory News* (ADLM) sobre el error analítico total, la propuesta original se presenta como sesgo + 2 DE y el 1,65 como la versión a una cola de 95 % que se impuso después; la propia Westgard usa 1,65 para fijar una tasa máxima de defectos de 5 %.

Tres matices para no usarlo mal:

1. **Si el sesgo es cero, el 1,65 cubre el 90 %, no el 95 %.** Con sesgo nulo, hay una cola a cada lado, y fuera de ±1,65 DE queda el 10 % de los resultados. El «95 %» del modelo vale solo cuando hay sesgo. Es una buena razón para no decir «el 95 % de mis resultados está dentro del error total» sin aclarar el supuesto.


![Curvas normales: con sesgo, 1,65 DE deja fuera 5 % en una cola; sin sesgo, deja fuera 10 % entre las dos colas](/guias/coeficiente-de-variacion-en-el-laboratorio/figura-8.svg)

*Figura 8. Qué deja fuera el 1,65: con un sesgo que empuja los errores hacia un lado, el 5 % en una cola; sin sesgo, el 10 % repartido en dos.*
2. **Supone una distribución normal, sesgo constante y CV de largo plazo.** Los datos reales tienen colas más pesadas que la normal y el sesgo no es constante (sección 6). La proporción real fuera del límite puede ser mayor que la del modelo.
3. **El 2 de la incertidumbre es otra cosa.** En la incertidumbre de medida, el factor de cobertura *k* = 2 da un intervalo **simétrico** alrededor del resultado con una probabilidad de cerca de 95 % (dos colas). El error total, en cambio, es un peor caso con sesgo incluido. Ambos usan un «número entre 1,65 y 2» y por eso se confunden, pero responden preguntas distintas ([incertidumbre de medición paso a paso](/guias/incertidumbre-de-medicion-paso-a-paso/)).

**Qué número usar es una decisión que se documenta**, y no hay que mezclar fuentes: si tu ETa se calculó con un criterio, la comparación debe usar el mismo. Dos precisiones útiles:

- **El sigma no depende del *z*.** Sigma = (ETa − |sesgo|) ÷ CV, sin multiplicador. El *z* aparece en el error total y en el error sistemático crítico (sigma − 1,65), que usa la calculadora de [error total y sigma](/calculadoras/error-total-y-sigma/).
- **La fórmula convencional basada en la variación biológica usa 1,65** (ETa = 0,25 × (CVI² + CVG²)^0,5 + 1,65 × (0,5 × CVI), de Fraser, Hyltoft Petersen y colaboradores). Si tu ETa viene de ahí, el 1,65 es parte del número, y cambiarlo a 2 en el error total sin tocar el ETa es comparar peras con manzanas.

## 8. ¿Qué CV es comparable con el error total aceptable?

Esta es la pregunta de fondo, y se responde con una regla: **el CV que pongas en la fórmula del error total debe medir lo mismo que supuso quien fijó la meta.** Un CV bajo con un ETa exigente da sigma alto en el papel y mal desempeño en la realidad. Siete condiciones para revisarlo:

1. **Precisión intermedia, no repetibilidad.** Un resultado de paciente sufre todo lo que ocurre entre corridas. El CV de las réplicas de una corrida, o el del inserto, **subestima** el error real. El adecuado es el CV intralaboratorio de largo plazo (sección 2).
2. **El mismo nivel.** El CV debe corresponder al nivel donde se toman las decisiones (cerca del punto de corte), no al más cómodo.
3. **El mismo tipo de resultado.** Los límites de las pruebas de aptitud (como los de CLIA) comparan **un resultado individual** del laboratorio con el valor asignado. Si en tu laboratorio informas el promedio de duplicados, el CV de lo que informas es menor (por √n) y no es el de un resultado individual. Compara como corresponde a cómo se obtiene el resultado.
4. **El mismo período y condiciones.** El CV y el sesgo deben salir del mismo período, del mismo lote de reactivo y del mismo material. Un sesgo de la ronda externa de abril con un CV de todo el año mezcla situaciones distintas.
5. **El material de control.** El CV del control puede ser distinto del CV de las muestras de pacientes (matriz, conmutabilidad, estabilidad del material, variación entre viales). Un control liofilizado, por ejemplo, agrega la variación de la reconstitución. Si un control muestra más variación que los pacientes, el error total sale sobreestimado, y al revés.
6. **La unidad y el tipo de meta.** Si la meta es relativa (±X %), usa CV %; si es absoluta (±Y unidades) o mixta, a concentraciones bajas hay que comparar DE en unidades (sección 3). Y si la escala tiene cero arbitrario, no hay CV (sección 3.3).
7. **El *z* y el modelo.** Que el ETa y el error total se calculen con el mismo criterio (sección 7).

Para saber qué CV corresponde, mira **de dónde salió el ETa**:

| Origen de la meta | Qué mide en realidad | CV que le corresponde |
|---|---|---|
| Variación biológica (Fraser, Ricos y otros) | Imprecisión **total** del método frente a la variación del paciente | CV intralaboratorio de largo plazo |
| Pruebas de aptitud / reguladores (CLIA, rondas) | Desviación de **un resultado** del laboratorio respecto del valor asignado | CV de largo plazo de un resultado individual, más sesgo contra el valor asignado de la ronda |
| Estado del arte (resultados de rondas o de pares) | Lo que logran los laboratorios hoy | El CV de tu laboratorio comparado con el de los pares, **calculado igual** |
| Resultado clínico (modelo 1) | Cuánto error cambia una decisión | CV de largo plazo en el nivel de la decisión, con su incertidumbre |

La tabla es una guía de lectura, no una norma: los supuestos de cada fuente conviene confirmarlos en su documento.

Un detalle práctico sobre la comparación con los pares: **el CV del grupo se calcula con sus propias reglas** (por ejemplo, después de excluir valores atípicos o con un número distinto de datos). Antes de decir «mi CV es mejor que el del grupo», confirma cómo calcula el programa el suyo y con qué período.

## 9. Para qué sirve el CV en el laboratorio

El CV es una herramienta de uso amplio. Estos son los usos, de los más a los menos frecuentes:

1. **Sigma y error total** (secciones 7 y 8): [calculadora](/calculadoras/error-total-y-sigma/).
2. **Fijar los límites del control interno** al abrir un lote nuevo, cuando aún no hay historia: se parte de un CV acumulado del método y de la media del nuevo lote, y se corrige cuando se junten los datos.
3. **Verificar un método contra lo que declara el fabricante**: el CV observado se compara con el declarado y, para absorber el azar, con un límite superior basado en χ² ([guía de verificación](/guias/verifica-un-metodo-sin-perder-una-semana/), [calculadora](/calculadoras/verificacion-de-precision/)).
4. **Comparar lotes** de reactivo o de control: la razón entre dos CV y la prueba F de comparación de varianzas ([comparación de lotes](/calculadoras/comparacion-de-lotes/)).
5. **Comparar equipos o métodos** para decidir una compra o una derivación, siempre en un nivel comparable y con el intervalo de confianza.
6. **Estimar la incertidumbre de medición**: el CV de largo plazo es su componente principal ([guía](/guias/incertidumbre-de-medicion-paso-a-paso/)).
7. **Calcular el cambio crítico entre dos resultados seguidos de un paciente** (valor de cambio de referencia), que combina el CV analítico con la variación biológica individual ([cambio crítico](/calculadoras/cambio-critico-rcv/)).
8. **Vigilar la imprecisión a lo largo del tiempo**: un CV que sube por lote o por trimestre avisa de desgaste (lámpara, bomba, sellos) antes de que haya rechazos.
9. **Describir el perfil de precisión y el límite de cuantificación** de un ensayo en la zona baja (sección 3.1).
10. **Planificar el tamaño de las muestras** de un estudio: cuántos datos hacen falta para estimar un CV con un error dado (sección 4).
11. **Comparar con el programa de pares** y con las rondas externas ([guía de sesgo y SDI](/guias/control-de-calidad-externo-sesgo-y-sdi/)).

Y lo que **no** hace: no detecta sesgo, no dice si el método es exacto, no reemplaza al error total ni a la incertidumbre, y no sirve para decidir si un resultado de un paciente es aceptable. Es una medida de **imprecisión**, nada más.

## 10. Errores frecuentes

1. **Comparar el CV del gráfico con el del inserto** sin saber que el del inserto es de repetibilidad.
2. **Decidir con un CV de pocos datos**, sin intervalo de confianza.
3. **Aplicar un solo CV a todos los niveles** (o a los niveles bajos, donde domina el piso de ruido).
4. **Promediar CV** de meses, equipos o niveles en vez de combinarlos por varianzas.
5. **Leer el CV y el sesgo solo en el mensual**, sin marcar calibraciones ni cambios de lote.
6. **Repetir hasta que entre** y dejar solo la corrida buena.
7. **Usar CV con escalas de cero arbitrario** (°C, pH, índices con desplazamiento).
8. **Usar el 1,65 «para el 95 %»** sin aclarar que es una cola y que supone un sesgo.
9. **Calcular el error total con un CV de largo plazo y un sesgo de una sola ronda** (o al revés), sin que coincidan período, lote ni material.

## Preguntas frecuentes

**¿Qué CV es «bueno»?** No hay un valor bueno en abstracto. Depende del examen, del nivel y del ETa: lo que importa es si, junto con el sesgo, el error total queda dentro del ETa y qué sigma resulta.

**¿Cuántos datos necesito para calcular un CV confiable?** Como mínimo 20 puntos de días distintos, y 30 o más es mejor. Con 20 puntos, el error relativo del CV es cercano a 16 %. Más corridas el mismo día aportan menos de lo que parece.

**¿Controlar 3 veces al día baja mi CV?** No. Lo que hace es darte más información: puedes separar la variación dentro del día de la de un día a otro, y detectar antes los cambios. Si el CV baja porque repites hasta que entre, no mejoró el método.

**¿Debo usar el CV mensual o el acumulado?** Ambos, para cosas distintas: el mensual (y por segmento) sirve para vigilar y comparar con pares; el acumulado de largo plazo sirve para el error total, el sigma y la incertidumbre. Y no promedies los mensuales.

**¿Por qué mi CV de rutina es mayor que el del fabricante?** Casi seguro porque el del fabricante es de repetibilidad (una corrida) y el tuyo es intralaboratorio. Para comparar de verdad, usa el procedimiento de verificación con el límite superior ([guía](/guias/verifica-un-metodo-sin-perder-una-semana/)).

**¿Uso 1,65, 1,96 o 2?** El que corresponda al criterio con que se fijó tu ETa, y déjalo escrito. Si usas el 1,65, di que es una cola y que supone sesgo.

## Lista de verificación

- [ ] Sé qué tipo de CV tengo (repetibilidad, intralaboratorio, reproducibilidad) y de qué período sale.
- [ ] Lo calculé por nivel, y no extrapolé de un nivel a otro.
- [ ] En niveles bajos revisé la DE en unidades y el perfil de precisión.
- [ ] Mi escala tiene cero verdadero (si no, no uso CV).
- [ ] Tengo al menos 20 puntos de días distintos y conozco el intervalo de confianza.
- [ ] Marqué en el gráfico las calibraciones, los cambios de lote y las mantenciones.
- [ ] Evalúo el sesgo y el CV por segmento estable, además del mes.
- [ ] Calculé el CV dentro de los segmentos, el total y la razón entre ambos.
- [ ] No promedié CV: los combiné por varianzas.
- [ ] Registro todas las corridas, también las repetidas y las rechazadas.
- [ ] El CV y el sesgo del error total vienen del mismo período, lote y material.
- [ ] El CV que uso corresponde al supuesto del ETa (sección 8) y al mismo *z*.
- [ ] Dejé escrito el *z*, el período y el criterio.

## Dónde seguir

Con las calculadoras gratuitas de ConsensusLab puedes hacer lo de esta guía sin instalar nada: [Estadística del control](/calculadoras/estadistica-del-control/) (media, DE y CV), [Precisión del lote](/calculadoras/precision-del-lote/), [Error total y sigma](/calculadoras/error-total-y-sigma/) y [Levey-Jennings](/calculadoras/levey-jennings/). Si quieres ordenar la decisión del ETa, está la guía [Error total permitido: cómo elegirlo](/guias/error-total-permitido-como-elegirlo/).

ConsensusLab es mío; no recibo comisiones de proveedores. ConsensusLab QC tiene una prueba gratuita de 15 días con los datos de tu laboratorio.

---

## Sobre las cifras de esta guía

Las tablas y figuras que hablan de simulaciones (secciones 3.1, 3.4, 4, 5, 5.1 y 6) usan parámetros ilustrativos, no datos de un laboratorio. Se calcularon con la distribución normal y la distribución χ², y con simulaciones de 20 mil meses por situación (semilla fija, reproducibles). Sirven para entender cómo se comporta el CV, no para fijar valores propios: eso se hace con los datos de tu laboratorio. Los casos de la sección 3.6 vienen de la experiencia del autor en un laboratorio clínico.

## Referencias

- Pearson K. Mathematical contributions to the theory of evolution. III. Regression, heredity, and panmixia. Philos Trans R Soc Lond A. 1896;187:253-318. [doi:10.1098/rsta.1896.0007](https://doi.org/10.1098/rsta.1896.0007)
- Westgard JO, Carey RN, Wold S. Criteria for judging precision and accuracy in method development and evaluation. Clin Chem. 1974;20(7):825-833.
- National Glycohemoglobin Standardization Program. IFCC standardization of HbA1c (ecuación maestra NGSP-IFCC). [ngsp.org](https://ngsp.org/ifccngsp.asp)
- Clinical Laboratory News (ADLM). Total analytic error (septiembre de 2013). [myadlm.org](https://myadlm.org/cln/articles/2013/september/total-analytic-error)
- Aarsand AK, Røraas T, Fernandez-Calle P, et al. The Biological Variation Data Critical Appraisal Checklist. Clin Chem. 2018;64(3):501-514. [doi:10.1373/clinchem.2017.281808](https://doi.org/10.1373/clinchem.2017.281808)
- Sandberg S, Fraser CG, Horvath AR, et al. Defining analytical performance specifications: consensus statement from the 1st Strategic Conference of the EFLM. Clin Chem Lab Med. 2015;53(6):833-835. [doi:10.1515/cclm-2015-0067](https://doi.org/10.1515/cclm-2015-0067)
- Jones GRD, Albarede S, Kesseler D, et al. Analytical performance specifications for external quality assessment - definitions and descriptions. Clin Chem Lab Med. 2017;55(7):949-955. [doi:10.1515/cclm-2017-0151](https://doi.org/10.1515/cclm-2017-0151)
- Oosterhuis WP, Theodorsson E. Total error vs. measurement uncertainty: revolution or evolution? Clin Chem Lab Med. 2016;54(2):235-239. [doi:10.1515/cclm-2015-0997](https://doi.org/10.1515/cclm-2015-0997)
- CLSI EP15-A3 (User verification of precision and estimation of bias), CLSI EP17 (detección y cuantificación), ISO 5725-3:2023 y JCGM 100 (GUM). Consulta la edición vigente de cada documento.
- Consensus statement on the worldwide standardization of the hemoglobin A1C measurement (ADA, EASD, IFCC, IDF). Diabetes Care. 2007;30(9):2399-2400. [doi:10.2337/dc07-9925](https://doi.org/10.2337/dc07-9925)
