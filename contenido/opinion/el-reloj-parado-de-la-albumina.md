---
titulo: "El reloj parado de la albúmina"
fecha: 2026-11-04
resumen: "Al resolver el arrastre, las albúminas empezaron a dar negativo: el error arreglado tapaba otro. Después vinieron los meses, una jefatura sin saber a quién creerle y un detalle raro: nadie reclamó nunca. El silencio no es un indicador de calidad."
serie: "Casos de calidad analítica"
temas: ["Laboratorio clínico", "Control de calidad", "Gestión"]
imagen: "opinion/el-reloj-parado-de-la-albumina/imagen-1.jpg"
---

Un reloj parado acierta la hora dos veces al día. Lo usó Bertrand Russell hace casi ocho décadas y lo retomaron los filósofos del conocimiento: si miras un reloj que se detuvo hace doce horas y justo es esa hora, tu creencia es verdadera y está justificada (el reloj siempre fue confiable), pero **acertaste por suerte**. ¿Sabías la hora?

Yo no esperaba encontrar ese reloj en una albúmina en orina. Pero ahí estaba. Y me lo contó el mismo colega de [La sonda que llegó perfecta a ningún lado](/opinion/la-sonda-que-llego-perfecta/), donde un arrastre de picrato inflaba todas las albúminas menos la primera de cada serie.

![Una tecnóloga con un portapapeles mira sonriente un reloj de pared detenido, mientras a su lado se alinea una fila de frascos de orina etiquetados](/opinion/el-reloj-parado-de-la-albumina/imagen-1.jpg)

## El día que los resultados dieron negativo

Resuelto el arrastre con más lavados, mi colega esperaba tranquilidad. Y los resultados cambiaron, pero no como esperaba. Las albúminas en orina **empezaron a dar negativo**. No bajas. Negativas. Una concentración por debajo de cero, que no existe, informada con la solemnidad de un número cualquiera.

Ahí entendió algo incómodo: el arrastre no solo contaminaba. **Estaba tapando algo.** Y al mirar la ecuación de la técnica lo encontró: en el término *b*, el que no depende de la señal, alguien había puesto a mano un valor que **restaba 5 a todas las albúminas** de los pacientes. Un parche. Lo había puesto quien estaba antes, de buena fe, porque veía resultados inflados y no sabía de dónde venían ni cómo arreglarlo de otra forma. Nadie dejó escrito por qué.

Eso explicaba la primera muestra: la única sin arrastre, que además perdía 5 y quedaba por debajo de cero. Y explicaba por qué los resultados «decentes» no lo eran tanto: el parche restaba parejo a todo, el arrastre sumaba de forma irregular, y ninguno de los dos era el error de fondo. El parche **tapó mucho y confundió más**, porque había otras variables que nadie había considerado. Al resolver el arrastre, el parche quedó restando sin nada que compensar. Se había arreglado un error, y el error arreglado dejó al descubierto el que escondía.

Un ejemplo **sintético** (no son datos reales) con un parche que resta 5 mg/L a todo y un arrastre que suma 5 mg/L a todo:

| Valor real | Con parche + arrastre | Solo con el parche |
|---|---|---|
| 3 mg/L | 3 mg/L | **−2 mg/L** |
| 25 mg/L | 25 mg/L | **20 mg/L** |
| 60 mg/L | 60 mg/L | **55 mg/L** |

En la segunda columna todo está perfecto: los dos errores se cancelan. En la tercera, al quitar el arrastre, el parche queda restando solo, y una muestra baja da negativo. (En la realidad el arrastre pesaba más que el parche y las muestras salían altas: el parche no lo cancelaba, solo lo disfrazaba. Pero la lógica es esta.) Lo inquietante es que **la segunda columna es, en esencia, lo que el laboratorio creía estar informando.** Y se veía de maravilla.

Los errores que se compensan son los más traicioneros de la calidad analítica porque producen la apariencia de un método sano. La planilla se ve ordenada, el informe sale a tiempo, a nadie le llama la atención nada. Hasta que alguien arregla uno de los dos.

## La calibración que siempre daba mal

Entonces mi colega entró a mirar la calibración. Y las calibraciones, recordó, **siempre habían dado mal**. Era una de esas molestias con las que se aprende a convivir: un ajuste que se repite, una curva que se rehace «porque es así este método». Se atribuía al analizador, a la curva, a la mala suerte.

Y el parche no ayudaba: cada vez que se calibraba, ese factor puesto a mano quedaba ahí, entre la curva y el resultado, y entorpecía el análisis. No había forma de saber qué era calibración y qué era ajuste manual. Por eso una de las primeras cosas que se hicieron, en la configuración de prueba, fue **eliminar todo factor hecho a mano** para ver la técnica desnuda.

La causa apareció en un lugar inesperado: el **reactivo**.

El reactivo de albúmina contiene anticuerpos. Con el tiempo, y en reposo, esos anticuerpos pueden adherirse a las paredes del frasco o decantar. El analizador aspira desde arriba, donde queda el sobrenadante, y ese sobrenadante puede traer menos anticuerpo del que dice la etiqueta.

Es decir: **el reactivo había que homogenizarlo antes de cargarlo**, mezclándolo con suavidad para no hacer espuma. Esa indicación **no venía destacada** en el inserto, y el procedimiento, por tanto, tampoco la incluía. Las calibraciones se hacían con el frasco recién cargado, justo cuando el sobrenadante estaba más pobre. La curva quedaba calibrada contra un reactivo que ya no era el que se iba a usar dos horas después. Por eso daban mal: no por el analizador ni por la curva, sino por la forma de cargar el frasco.

![Una tecnóloga cansada con una libreta mira un frasco grande de reactivo con sedimento en el fondo y el líquido casi claro arriba, mientras la aguja de un analizador aspira desde la parte superior](/opinion/el-reloj-parado-de-la-albumina/imagen-2.jpg)

## Un control en otro idioma

Quedaba una pieza más, la que explicaba por qué nadie se había dado cuenta. El control interno de albúmina se procesaba **como si fuera suero**, con una calibración y una forma de correr propias. Las muestras de los pacientes se procesaban **como orina**, con otra configuración. Resultado: el control decía una cosa y los pacientes otra, y no concordaban en absoluto.

Y sin embargo los resultados informados de los pacientes salían **bastante decentes**. Por azar del destino, uno nunca sabe. Es la versión de laboratorio del reloj parado: una hora correcta por una razón equivocada.

## ¿Sabías o solo acertaste?

Ese es el centro de esta historia. Un resultado razonable y un resultado verificado no son lo mismo:

- **Razonable** describe cómo se ve: dentro de rangos plausibles, coherente con el cuadro clínico, sin saltos raros.
- **Verificado** describe cómo se comprobó: contra un control que recorre el mismo camino, contra un material de referencia, contra otro método.

Un laboratorio puede informar resultados correctos durante años sin saber que lo son. Y el día que cambia el reactivo, el analizador o la persona que calibra, los errores dejan de apuntar en sentidos opuestos, y el reloj marca otra hora.

## Cómo quedó la técnica

Después de meses de desarmar piezas, la solución fue más simple que el problema, que suele ser la señal de que está bien resuelta. Esto fue lo que cambió:

| | Antes | Después |
|---|---|---|
| Creatinina en orina | Un factor en el middleware que nadie podía corroborar, y la misma ecuación que el suero | Dilución de 25 configurada en el analizador, sin factor ni pendiente ni ecuación entre la calibración y la dilución |
| Controles | Procesados como suero, por otro camino | Procesados igual que las muestras |
| Reactivo de albúmina | Sin homogenizar, calibrado con el frasco recién cargado | Se homogeniza todos los días y se calibra con el reactivo homogenizado |
| Ajustes manuales | Un −5 puesto a mano en la ecuación | Eliminadas todas las pendientes y ecuaciones intermedias |
| Arrastre | La albúmina contaminada por el picrato de la creatinina | Un lavado entre cada albúmina y cada creatinina |
| Resultados | Primera muestra negativa y las demás infladas | Sin negativos, y resultados más bajos |

Con los factores manuales fuera, desaparecieron los resultados negativos. Con el lavado entre cada albúmina y cada creatinina, desapareció la contaminación por arrastre, y por eso los resultados bajaron.

También se probó, sin éxito, cambiar la longitud de onda: el equipo permitía leer a 340 o a 600 nanómetros, y se calibró en los dos casos. Ninguno eliminó el arrastre. Peor: confundió aún más, porque sumó una variable más a un problema que ya tenía demasiadas. Fue una de las tantas pruebas que se hicieron para descartar y que, al final, solo dejaron claro cuál no era la causa.

## La jefatura que no sabía a quién creerle

Lo que hizo tan difícil el proceso es que no fue un hallazgo, fue una **sucesión** de hallazgos, y cada uno cambiaba la respuesta del anterior. Primero las muestras estaban bien. Después, mal. Después, de otra manera mal. La jefatura recibía versiones que no se parecían entre sí: la de ayer decía una cosa, la de hoy la contraria, y la de mañana prometía aclarar las dos. Una persona que dice «las muestras estaban mal» seis veces seguidas con matices distintos empieza a sonar a alguien que no sabe lo que dice.

En algún momento mi colega escuchó la palabra **desvinculación**. No la dijo nadie en voz alta; flotaba en las conversaciones como flota el olor a café quemado. Un profesional que descubre que todo lo que se informó estaba corrido es, para cierto tipo de organización, el mensajero que merece ser sancionado. Eso, por supuesto, no pasó. Pero mi colega no lo supo hasta mucho después.

Por eso fue un proceso **de meses**, estresante, solitario, y con una pregunta de fondo que nunca se resolvió del todo: ¿quién decide a quién se le cree cuando todos tienen una explicación y nadie tiene un registro?

## Lo que más llamó la atención

Cuando el ajuste terminó, lo que quedó en el aire no era técnico. Era esto: **nadie había reclamado nunca.** Ni antes de corregir, ni durante, ni después. Ningún clínico devolvió un resultado de microalbuminuria diciendo «esto no me cuadra». El ajuste, aunque delicado, **no pasó a mayores**. Eso tranquilizó, claro. Y también debió preocupar.

![Una tecnóloga de espaldas mira un teléfono de escritorio con el cable desenchufado, en un mesón lleno de frascos de orina; al fondo, una balanza con un plato vacío y otro lleno de frascos](/opinion/el-reloj-parado-de-la-albumina/imagen-3.jpg)

En muchos laboratorios se mide la calidad, sin decirlo, por la ausencia de reclamos. Cero llamadas, cero devoluciones: un laboratorio sano. Suena razonable, y es una trampa.

Un médico **no devuelve un resultado que parece razonable.** Si un RAC de 28 mg/g se informa como 37, el cambio de categoría A1 a A2 no hace ruido: genera una consulta más, un control de seguimiento, quizás una indicación. Nadie vuelve a llamar al laboratorio, porque nada en el informe parecía raro. La paciente con diabetes que recibe una categoría que no era no tiene forma de saberlo, y no existe un buzón donde se acumulen los errores que nadie notó.

Hasta donde se sabe, aquí no hubo daño. Pero «hasta donde se sabe» es la parte difícil de la frase: el silencio no es evidencia de que todo estuvo bien, es ausencia de evidencia. **Un sistema de calidad que depende de que alguien se queje es un sistema que se entera tarde.**

## Lo que le dejaría a quien dirige

- **Pregunta si tu resultado es razonable o verificado.** Si no puedes explicar con qué se comprobó, es un reloj parado.
- **Una calibración que siempre da mal es un dato, no una molestia.** Algo en el reactivo, el procedimiento o el equipo la está empujando.
- **Cuando arreglas un error y aparece otro de signo contrario, no te asustes:** ya estaban los dos. El segundo estaba compensado.
- **Una técnica bien arreglada queda más simple, no más compleja.** Si para que funcione hacen falta factores y ecuaciones entre la calibración y el resultado, sospecha de que algo de fondo sigue sin resolverse.
- **Un factor puesto a mano es un parche.** Haz el inventario: quién lo puso, por qué y cuándo se revisó. Si nadie puede explicarlo, quítalo en una configuración de prueba y mira qué se rompe.
- **Lee el inserto buscando lo que cambia el uso:** homogenizar, tiempos a bordo, temperatura. Lo que no está destacado también es parte del método.
- **Exige que el control recorra el mismo camino que el paciente**, o que se deje constancia de qué parte no está cubierta.
- **Pregunta quién puede explicar, en una frase, cómo está configurada cada técnica y por qué.** Si nadie puede, es una herencia, no un procedimiento.
- **Cuando dos versiones de los hechos se contradicen, no premies ni castigues a quien las trae: pide el registro.** Si no existe, el problema es el registro.
- **No uses el silencio como indicador de calidad.** Busca el error antes de que lo reclame un paciente.
- **Protege a quien trae malas noticias.** El tecnólogo que dice «esto estaba mal» está haciendo exactamente lo que se le paga por hacer.

## Y ahí entra Consensus QC

Esta historia es parte de la razón por la que armé [Consensus QC](/consensus-qc/), el software de control de calidad de ConsensusLab. No encuentra por sí solo una curva saturada ni una dilución dudosa: eso lo sigue encontrando una persona que mira. Lo que hace es dejar **a la vista y con registro** lo que en esta historia vivía en la memoria de alguien:

- **Configuración:** cada analizador con su ciclo de vida, sus analitos, sus materiales de control y sus lotes con las metas del fabricante, para que quede escrito qué se controla con qué.
- **Plan de calidad:** un plan por analito con su requisito de calidad y una táctica de control por analizador, con versiones, aprobación e historial.
- **Controles diarios y Levey-Jennings:** las reglas de Westgard evaluadas al instante y un gráfico por nivel, para ver cuándo empezó a moverse algo.
- **Desempeño:** mes a mes por analizador y analito, el CV, el sesgo, el error total frente al permitido y el sigma.
- **No conformidades:** desde un control rechazado, análisis de causa, impacto en pacientes, acciones con responsable y plazo, y verificación de eficacia.

Lo que se puede hacer sin el software está en las calculadoras gratuitas del sitio: [comparación de métodos](/calculadoras/comparacion-de-metodos/), [diluciones y soluciones](/calculadoras/diluciones-y-soluciones/), [curva de calibración](/calculadoras/curva-de-calibracion/) y [error total y sigma](/calculadoras/error-total-y-sigma/). ConsensusLab es mío; no recibo comisiones de proveedores. Consensus QC tiene una prueba gratuita de 15 días con los datos de tu laboratorio.

Así, cuando alguien diga «esto estaba mal», la primera respuesta no es «¿estás seguro?» sino «muéstrame el historial».

## La sonda, otra vez

En 1999, la sonda que se perdió camino a Marte no tuvo un solo error espectacular. Tuvo un error pequeño, en una interfaz, que ningún subsistema estaba mirando. Lo que la NASA hizo después fue investigar el proceso que no lo detectó, no solo la unidad que falló.

Un laboratorio no se pierde en el espacio. Se pierde en lo que nadie mira entre una pieza y la siguiente. Y la manera más barata de encontrarlo es antes de que alguien lo reclame.

¿Cuándo fue la última vez que comparaste tu control con tus pacientes?

A) este mes
B) este año
C) nunca lo he hecho
D) no sé cómo se hace

---

*Nota de composición: para proteger a las personas involucradas, algunos detalles de esta historia fueron modificados y algunas escenas son una composición. Los hechos técnicos son reales; los números, los ejemplos y ciertos episodios del relato no corresponden a un caso identificable.*

*Segunda y última parte de la serie sobre el RAC. La primera: [La sonda que llegó perfecta a ningún lado](/opinion/la-sonda-que-llego-perfecta/). Otros casos de «Casos de calidad analítica»: [El reactivo de Teseo](/opinion/el-reactivo-de-teseo/) y [El N20 que estrechó las gráficas](/opinion/el-n20-que-estrecho-las-graficas/).*
