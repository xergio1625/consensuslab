---
titulo: "El N=20 que estrechó las gráficas"
fecha: 2026-10-14
resumen: "Una anécdota de laboratorio: llegó escoba nueva con orden de cambiarlo todo, rehicieron las gráficas con un N=20 a la rápida, la jefatura aplaudió y a las pocas semanas las alarmas saltaban todos los días. Yo miraba con palomitas."
temas: ["Laboratorio clínico", "Control de calidad", "Gestión"]
imagen: "opinion/el-n20-que-estrecho-las-graficas/imagen-2.jpg"
---

Dicen que toda escoba nueva barre bien. ¿O no?

![Una escoba dorada con lazo barre un laboratorio entre aplausos y celulares de colegas jóvenes, mientras tres colegas veteranos miran con un café desde una bodega y el polvo queda bajo una alfombra](/opinion/el-n20-que-estrecho-las-graficas/imagen-1.jpg)

Hace unos años llegó al laboratorio un grupo de colegas con una misión: arreglar lo que estaba mal. La orden venía de la jefatura, así que no los culpo por el entusiasmo. Un laboratorio que nunca se revisa se oxida, eso es cierto.

Lo que vino después fue menos elegante. La estrategia era trabajar solo con una parte del laboratorio, no con todo el equipo: cambios de gente de una unidad a otra, mejoras por acá y por allá, y los más antiguos fuimos a parar a las áreas donde, según la jefatura de ese momento, "ya no había nada más que hacer". Que es una forma muy cariñosa de decir que te mandaron a la bodega de lo que ya está perfecto. Gracias, de verdad.

## Las gráficas "horribles"

En un laboratorio el control de calidad se corre todos los días, a su hora, como un reloj, y esas gráficas llevaban meses acumulando historia. A los recién llegados les bastó mirarlas un par de veces para dar el diagnóstico, rápido y sin dudas: "esto es horrible, esto se cambia mañana, yo lo haré de esta forma". Conversación corta con la jefatura, visto bueno y a trabajar. Meses de datos descartados en una frase.

La solución milagrosa era el **N=20**, sí, ese que todos en el laboratorio conocemos: veinte mediciones del control, media y desviación estándar nuevas, límites nuevos y a otra cosa. Las gráficas quedaron preciosas: todo ordenadito, todo apretadito, todo muy profesional. La jefatura quedó feliz, y es lógico: un cambio visible, con números y con método. Lo que nadie preguntó fue cómo, cuándo y en qué condiciones habían sacado esos veinte datos. Pero bueno, para qué arruinar una buena presentación.

## El show de las alarmas

![Un monitor con una gráfica de control convertida en árbol de Navidad de alarmas rojas, y un colega joven pálido con una taza de café rodeado de fantasmas de alarma](/opinion/el-n20-que-estrecho-las-graficas/imagen-2.jpg)

Pasó un tiempo y las gráficas empezaron a mostrar cosas que nadie esperaba. Una alarma por aquí, otra por allá, y después todos los días: ±2 DE, ±3 DE, tendencias, series, todo el repertorio. Cada mañana las gráficas parecían un árbol de Navidad. Los colegas principiantes miraban esa pantalla roja con una palidez que no se veía desde el último reporte de auditoría, convencidos de que habían roto algo.

Los de la bodega teníamos una sospecha bastante clara. La dijimos. Con cariño y con bastante tacto, además. Resultado: nada. Cuando uno acaba de ganar una batalla frente a la jefatura, lo último que quiere escuchar es que quizás ganó la equivocada.

Y yo, que a esta altura de la vida ya aprendí a elegir mis batallas (no diré que con los años uno se vuelve más sabio, a veces uno solo se pone más mañoso), miré el panorama. Los pacientes no estaban en riesgo, el único afectado era el susto del equipo. Esa batalla no era necesario pelearla. Así que me senté, saqué las palomitas y esperé.

![Un colega veterano en un sillón con un balde de palomitas mira por una ventana cómo los colegas jóvenes corren por el laboratorio con rollos de gráficas llenos de alarmas](/opinion/el-n20-que-estrecho-las-graficas/imagen-3.jpg)

Hasta que un día la humildad les entró al corazón. Entendieron que estaban metidos en una batalla que no sabían cómo ganar, y ahí sí, conversamos como corresponde.

## Qué había pasado

Nada raro, en realidad. Ese N=20 se había hecho a la carrera y en condiciones demasiado ideales, de esas en que no cambia nada entre una medición y la siguiente. Eso sirve para calcular la imprecisión **intraserial**, o sea, cuánto varía el método en su mejor día, con todo cuadrado. Un CV hermoso, sí. Pero el laboratorio no trabaja en su mejor día.

El laboratorio trabaja con otra calibración, otro lote, otras manos y un equipo que hoy amaneció con carácter. Toda esa variación entre días no estaba en esos veinte datos, así que la desviación estándar salió chica, los límites quedaron estrechísimos y el proceso real, que se movía como siempre, empezó a "violar" las reglas todos los días. Un proceso normal, juzgado con una vara de un día perfecto.

Dicho en simple: usaron un N=20 pensado para medir repetibilidad para controlar un proceso que no se parece en nada a esas condiciones.

## La moraleja (que no es tan moraleja)

Si las alarmas saltan todos los días y no hay ningún otro síntoma, sospecha primero de los límites antes de culpar al equipo. Calcúlalos con datos de varios días, con las calibraciones, lotes y manos reales, y revísalos cuando tengas más información. Un N=20 sirve para partir, pero no tomado en una tarde. Y no, 1-2s no es una regla de rechazo: las reglas se eligen según el [sigma del examen](/calculadoras/error-total-y-sigma/).

Si quieres comprobarlo con tus datos, pega los resultados de un control en [Estadística del control](/calculadoras/estadistica-del-control/) y calcula la DE de un solo día y la de un mes entero. La diferencia suele ser bastante elocuente. Después mira ambos en un [gráfico de Levey-Jennings](/calculadoras/levey-jennings/) y cuenta cuántas alarmas aparecen con cada una. Y si lo que quieres es saber cuánto varía tu método de verdad, la [verificación de precisión 5 × 5](/calculadoras/verificacion-de-precision/) separa la variación dentro de la serie de la variación entre días, que es justo la que faltó en esta historia.

Para ordenar el resto, en el sitio hay fichas de [control de calidad interno y externo](/herramientas/control-de-calidad-interno-y-externo/), de [indicadores de calidad](/herramientas/indicadores-de-calidad/) y de [competencias y capacitación](/herramientas/competencias-y-capacitacion/). Esta última no es casual: un colega principiante que mira una gráfica roja y se cree culpable es un problema de formación, no de dedos.

Los colegas de la historia aprendieron rápido, para ser justos, y yo también aprendí algo: tener razón no alcanza, y hay maneras de decirlo que se escuchan mejor. O hay que traer palomitas, que también funciona.

¿Y la escoba nueva? Barre rápido, que no es lo mismo que barrer bien. Lo que quedó bajo la alfombra recién se ve cuando pasa el tiempo.

## Y ahí entra Consensus QC

Esta historia es la razón por la que armé [Consensus QC](/consensus-qc/), el software de control de calidad analítico que forma parte de ConsensusLab. No es una escoba nueva, es un sistema para no depender de ninguna. El N=20 queda registrado por lote, las reglas de Westgard se evalúan al instante en cada corrida, el Levey-Jennings muestra cada nivel con sus límites y cada no conformidad queda con nombre y motivo. Además, el desempeño mes a mes por analizador muestra el CV, el sesgo, el error total frente al permitido y el sigma, o sea, el CV real del laboratorio y no el de su mejor día.

Así, la próxima vez que alguien llegue diciendo "esto es horrible, se cambia mañana", la conversación con la jefatura tiene datos de meses a la vista y no depende de quién tiene más labia. Y uno se ahorra las palomitas.
