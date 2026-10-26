---
titulo: "La sonda que llegó perfecta a ningún lado"
fecha: 2026-10-28
resumen: "Una creatinina que no pasaba de 120, una dilución que quizás nunca existió, una resta de 0,25 que valía 6,25 y una albúmina cuya primera muestra daba baja y todas las demás altas. Cada pieza funcionaba. Lo que fallaba era lo que las unía."
serie: "Casos de calidad analítica"
temas: ["Laboratorio clínico", "Control de calidad", "Gestión"]
imagen: "opinion/la-sonda-que-llego-perfecta/imagen-1.jpg"
---

En 1999, la NASA perdió una sonda que iba rumbo a Marte. Costó cerca de 125 millones de dólares.

No falló el motor. No falló el software. No falló la navegación. Un equipo entregó sus datos en unidades imperiales y el otro los leyó como métricas.

Cada subsistema, por separado, funcionaba perfecto. Lo que falló estaba entre ellos.

Me acordé de la sonda cuando un colega me contó lo que encontró al heredar un módulo de química: un índice que se calculaba con dos técnicas, y ninguna de las dos medía lo que se creía.

![Dos ingenieros con delantal discuten frente a una sonda espacial perfectamente dibujada sobre un mesón; uno sostiene una regla en pulgadas y el otro una en centímetros, y no coinciden](/opinion/la-sonda-que-llego-perfecta/imagen-1.jpg)

## Un número hecho de dos números

El **índice albúmina/creatinina en orina (RAC)** es un cociente: albúmina en mg/L dividida por creatinina en g/L, que da mg/g. Sirve para detectar daño renal temprano en personas con diabetes o hipertensión. Sus categorías (A1, A2, A3) cambian el seguimiento del paciente.

Un cociente tiene una trampa que una medición sola no tiene: **hereda el error de las dos técnicas que lo componen.** Si una anda corrida, el índice entero se corre. Y como el informe muestra un solo número, nadie ve de cuál de las dos viene.

Mi colega empezó por la creatinina. No porque supiera que ahí estaba el problema, sino porque no le gustaba cómo se veía.

## La regla: no se toca nada

Antes de contar qué encontró hay que contar con qué reglas lo hizo, porque son parte de la historia.

La configuración del equipo y de su middleware, el programa que está entre el analizador y el sistema del laboratorio, **no se podía modificar.** Esa era la regla, y la había dicho la jefatura con toda claridad. Una regla razonable, de las que existen para que nadie rompa lo que funciona.

Tenía una consecuencia incómoda: para investigar algo había que hacerlo **por fuera del equipo**. Mi colega empezó a hacer las pruebas a mano y a crear técnicas nuevas en una configuración externa, separada, de prueba, donde se podía mover todo sin afectar a nadie. Una especie de laboratorio dentro del laboratorio, para estudiar al laboratorio.

Todo lo que sigue se descubrió desde afuera, porque desde adentro estaba prohibido mirar.

## La curva que nadie miraba

Lo primero que hizo fue algo que casi nadie hace con un resultado que ya salió: mirar la **curva de reacción**.

Una reacción fotométrica dibuja absorbancia en el tiempo. El analizador no mide cualquier punto de esa curva: mide donde **tiene pendiente**, porque ahí el cambio es proporcional a lo que hay en la muestra. Cuando la curva se aplana contra un techo, se dice que está **saturada**, y ya no hay pendiente que medir. El analizador seguirá entregando un número, porque nadie le enseñó a negarse, pero ese número ya no cuenta la historia completa.

Las absorbancias de la creatinina en orina rozaban 5. Según Lambert-Beer, pasado cierto valor la absorbancia deja de ser proporcional a la concentración; en la literatura suele citarse un límite referencial de entre 2 y 2,5, aunque depende de cada equipo. El analizador, curiosamente, lograba linealidad con absorbancias de 3 o 4, algo que mi colega no había visto antes. Pero a 5 ya no había nada que hacer.

![Un gráfico de absorbancia contra tiempo con dos curvas: una azul que sube y se aplana contra un techo, y otra naranja que sube con pendiente dentro de una banda sombreada; delante, dos personas con delantal se miran desconcertadas](/opinion/la-sonda-que-llego-perfecta/imagen-2.jpg)

*(Esquema ilustrativo, no son datos reales.)*

## Un techo en 120

En la configuración de prueba, mi colega agregó un factor de dilución para llevar la lectura a una zona donde la curva tuviera pendiente. Y el control interno de creatinina en orina, el patológico, el más concentrado, que daba 110 o 120, pasó a dar 170 o 180. Ese era el valor que le correspondía.

Entonces se acordó de otra cosa: **las muestras de los pacientes tampoco pasaban de 120.** Nunca.

Un techo en una distribución es una huella dactilar. Ninguna población real se detiene en un número redondo, a menos que el método se detenga primero. Si uno mira solo los resultados, el techo parece una población sorprendentemente hidratada: ningún paciente con orina concentrada, ni uno, en todo el período. Si uno mira la curva, el techo se explica solo.

## Una dilución en el papel

Y aquí vino lo raro. En teoría, el middleware **diluía la orina de los pacientes 1 en 10**. Con esa dilución, un paciente con la orina concentrada habría superado los 120 sin problema. No los superaba. Y las curvas de reacción tampoco mostraban señal de dilución alguna.

La sospecha creció hasta volverse casi una convicción: **la dilución nunca existió.** Lo más probable era que el middleware solo multiplicara el resultado por 10, un factor que figuraba en la configuración como si fuera una dilución, pero que no diluía nada.

Nunca se supo con certeza. Y como la regla era no tocar la configuración, la pregunta quedó sin respuesta durante todo el estudio: ¿el equipo diluía, o solo decía que diluía? Es el equivalente exacto de una sonda que lleva en pantalla un dato en libras y lo trata como newtons: el número está ahí, la unidad dice lo que dice, y nadie sabe qué significa de verdad.

Había otra pieza. El analizador permitía ingresar un control como si fuera **suero** o como si fuera **orina**, y tomaba la configuración desde el analizador, mientras los pacientes pasaban por el middleware con su factor misterioso. El control seguía un camino y el paciente otro, cada uno coherente consigo mismo, cada uno muy prolijo. Y el control, por más hermoso que se viera en la gráfica, **no recorría el mismo camino que la muestra que importaba**.

El control externo tampoco delataba nada. Las muestras de orina cuantitativa que llegaban traían valores bajos, y hasta unos 120 el método no mostraba ningún problema. Un control que nunca visita los valores altos no puede avisar de lo que pasa ahí.

## La perilla del 0,25

Para entender qué hacía de verdad el equipo con las muestras, mi colega hizo lo que hace un tecnólogo con paciencia: diluyó a mano, procesó las mismas muestras de las dos maneras y comparó los resultados con una **prueba t de Student pareada**, para ver si había error sistemático. (Esa comparación, par a par, se puede hacer con la calculadora gratuita de [comparación de métodos](/calculadoras/comparacion-de-metodos/), y la guía [¿qué prueba uso?](/calculadoras/pruebas-estadisticas/) orienta sobre cuándo corresponde una t de Student.)

Lo había. Y el equipo estaba haciendo cosas que antes no hacía, y no hacía cosas que sí debía hacer con las muestras de los pacientes.

La clave la dio una prueba que parece de aficionado y vale oro: **mover una perilla y mirar cuánto se mueve cada cosa.**

La creatinina por el método de Jaffé tiene, en suero, una corrección: se le resta **0,25 mg/dL** a la ecuación, para compensar sustancias que reaccionan con el picrato y no son creatinina. En orina esa resta no corresponde. Pero la ecuación era la misma para las dos.

En la configuración de prueba, con una dilución de 25, mi colega quitó ese 0,25 de la ecuación y miró qué pasaba:

- El **suero** subió 0,25.
- La **orina** subió **6,25**.

La razón es el **orden de las operaciones**. El factor de dilución tiene que aplicarse *antes* de la ecuación de la recta (y = ax + b): primero se corrige la señal por la dilución y después se le aplica la pendiente. Si se aplica *después*, el factor multiplica la ecuación completa, y con ella el término *b*, que es justamente la parte sistemática. Es la diferencia entre a·(F·x) + b y F·(a·x + b): en la segunda, el *b* sale multiplicado por F. Aquí, 0,25 × 25 = 6,25 mg/dL. Un error constante, amplificado 25 veces.

Y lo más desconcertante: **ese defecto ya estaba ahí desde el comienzo.** La misma ecuación para suero y orina era un error de diseño, no del experimento. El experimento solo le puso un tamaño visible. En el equipo real, con el factor del middleware, el error valía otra cosa, y nadie podía saber cuánto, porque nadie sabía qué hacía ese factor.

Un ejemplo **sintético** de por qué importa, con una dilución de 25:

| | Valor real | Valor informado |
|---|---|---|
| Albúmina | 7 mg/L | 7 mg/L |
| Creatinina | 25 mg/dL (0,25 g/L) | 18,75 mg/dL (0,1875 g/L) |
| RAC | 7 ÷ 0,25 = **28 mg/g** (A1) | 7 ÷ 0,1875 = **37 mg/g** (A2) |

Una resta constante pesa poco en una orina concentrada (100 mg/dL: −6 %) y mucho en una diluida (25 mg/dL: −25 %). Cuanto más agua tomó el paciente, más lo castigaba el método. Y como el RAC es una división, una creatinina que sale baja hace subir el índice: un paciente puede pasar de A1 a A2 sin que nada haya cambiado en sus riñones.

Lo más elegante del error es que **ninguna gráfica de control lo podía ver**: el control, sin diluir, restaba 0,25. El paciente, con su factor, restaba mucho más. La misma fórmula, con dos efectos distintos. Nadie había mentido: cada subsistema hacía su trabajo.

Con la evidencia sobre la mesa, se pidió que sacaran el factor del middleware. No porque se hubiera demostrado qué hacía, sino porque **generaba demasiada confusión**: un factor que nadie entiende es más peligroso que ninguno. La dilución se configuró directamente en el analizador, donde se podía ver, probar y explicar. No fue una solución brillante. Fue una solución **visible**.

## ¿A cuál creerle?

Resuelta la creatinina, mi colega se puso a mirar la otra mitad del cociente: la albúmina. Y vio un patrón repetido. Al comenzar una serie de muestras:

- La **primera** salía baja. A veces tan baja que daba **negativa**.
- Todas las **siguientes** salían altas, entre 20 y 30 mg/L, una cifra que no encajaba con la clínica de los pacientes.

Un resultado negativo de albúmina en orina es una imposibilidad física: no existe una concentración menor que cero. Cuando un analizador la informa, está confesando algo, aunque lo haga en voz baja. Y apareció la pregunta que nadie sabía responder: **¿a cuál creerle?**

La explicación más cómoda fue la de la mayoría. La primera estaba mal, y las demás, que coincidían entre sí, estaban bien. Cinco contra una. Tenía una lógica impecable y una debilidad grave: **que muchos resultados coincidan no prueba que sean correctos, solo que fallan igual.** En el laboratorio la democracia no funciona.

La pista que ayudó a desarmarla fue que el error **no dependía de la muestra, dependía del lugar que ocupaba**. Cuando un error sigue al orden y no a la muestra, el sospechoso casi nunca es el paciente. Es lo que pasó **justo antes**.

En ese módulo la albúmina y la creatinina se procesaban alternadas, y el reactivo de la creatinina es un **picrato alcalino**, fuerte y arrastrador. La hipótesis: cada muestra de albúmina que seguía a una creatinina llevaba un poco de ese picrato a bordo. La primera de la serie no, porque no tenía una creatinina delante. Era la única limpia. Se llama **contaminación por arrastre**, y casi nunca sale en el control de calidad, porque el control suele procesarse con otra secuencia. El control no tenía por qué enterarse.

Y no había a quién preguntar. El soporte técnico del proveedor tampoco había visto algo así: casi nadie procesaba el RAC de continuo y con muchos pacientes como se procesaba ahí. Algunos laboratorios medían la albúmina en un analizador de hormonas; otros usaban tira reactiva, que no da un RAC sino un resultado semicuantitativo bastante débil. Cuando nadie hace lo que tú haces, **no hay con quién compararte.**

## La vieja que se tragó una mosca

La solución fue lógica: **más lavados**. Un lavado adicional de la aguja entre una muestra y otra. Funcionó. Y el lavado extra gastó **agua**.

Las bombas de agua del analizador no daban abasto, y el equipo empezó a **quedarse sin agua**. Hubo que reforzar las bombas. Después hubo que intervenir la arquitectura del analizador, es decir, la tubería que lleva el agua hasta donde se necesita. Cada arreglo tenía un costo en otra parte del sistema. Es la canción de la vieja que se tragó una mosca, versión laboratorio:

> Se tragó un lavado para atrapar el arrastre.
> Se tragó una bomba para atrapar el lavado.
> Se tragó una reforma para atrapar la bomba.

![Una anciana con delantal bebe de un frasco; en su vientre se ven, anidadas como muñecas rusas, una bomba de agua y una cañería, mientras detrás dos analizadores de laboratorio gotean](/opinion/la-sonda-que-llego-perfecta/imagen-3.jpg)

Hay una pregunta que casi nadie hace cuando un cambio funciona: **¿quién decide que es seguro?** Agregar un lavado parece una mejora inocente, pero tiene un costo en agua, en tiempo, en capacidad del equipo, y ese costo aparece donde nadie lo estaba mirando. Cada modificación necesita responder antes de implementarse: **¿qué más mueve esto?** Y quedar registrada: qué se cambió, cuándo, por qué, quién lo aprobó y qué se midió después.

## Lo que me dejó

- **Mira la curva de reacción de vez en cuando, no solo el número.** Una curva saturada se ve a simple vista y no sale en ninguna gráfica de control.
- **Si tus resultados tienen un techo, sospecha del método antes que de la población.**
- **Una dilución que no puedes corroborar es una dilución que no tienes.** Si la configuración dice que el equipo diluye, comprueba en la curva que diluye.
- **Una configuración intocable es una configuración que nadie entiende.** La regla de no tocar protege lo que funciona, pero también esconde lo que no. Que exista una forma documentada y autorizada de investigarla.
- **El orden de las operaciones importa.** Una dilución aplicada antes o después de la ecuación de la recta da resultados distintos. Pregunta en qué punto del cálculo entra cada factor.
- **Procesa el control como procesas al paciente**: misma matriz, mismo camino, misma dilución.
- **No le creas a la mayoría solo por serlo.** Si el error sigue al orden y no a la muestra, mira lo que pasó justo antes.
- **Antes de cambiar, pregunta qué más mueve el cambio, y deja el registro.**

Para llevar estas ideas a tus datos hay calculadoras gratuitas en el sitio: la [curva de calibración](/calculadoras/curva-de-calibracion/) para ver cómo una recta recupera cada estándar, las [diluciones y soluciones](/calculadoras/diluciones-y-soluciones/) para comprobar un factor, la [comparación con el fabricante](/calculadoras/comparacion-con-el-fabricante/) para tu media contra el valor asignado con prueba t, y la [homogeneidad entre mitades](/calculadoras/homogeneidad-entre-mitades/) para ver si la media cambió entre dos períodos.

Y el lavado extra dejó algo más a la vista. La primera muestra, la que salía baja, tenía razón en una cosa: no estaba contaminada. En otra, no tanto. Salía baja, a veces negativa, y eso era la pista de otro error escondido detrás del primero. Cuando el arrastre se resolvió, los resultados de albúmina empezaron a dar negativo.

Esa es la segunda parte: [El reloj parado de la albúmina](/opinion/el-reloj-parado-de-la-albumina/).

---

*Primera parte de la serie sobre el RAC. Otros casos de «Casos de calidad analítica»: [El reactivo de Teseo](/opinion/el-reactivo-de-teseo/) y [El N20 que estrechó las gráficas](/opinion/el-n20-que-estrecho-las-graficas/).*
