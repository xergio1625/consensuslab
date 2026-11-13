---
titulo: "AMEF en el laboratorio clínico: cómo hacer un análisis de modos de falla"
fecha: 2026-11-13
resumen: "Cómo hacer un AMEF en el laboratorio clínico: qué es, cómo calificar severidad, ocurrencia y detección, calcular el NPR, priorizar, definir acciones y volver a calificar, con ejemplos y los límites del método."
temas: ["Gestión de riesgos", "AMEF", "Acreditación"]
---

El **AMEF** (análisis de modos y efectos de falla; en inglés FMEA) es un método para anticiparse a los problemas: en vez de esperar a que algo falle, el equipo lista cómo podría fallar cada paso de un proceso, evalúa qué tan grave sería y qué tan probable es que se note a tiempo, y decide qué atender primero. En el laboratorio clínico se usa para gestionar riesgos en procesos como la identificación de muestras, el control de la cadena de frío o la entrega de resultados críticos.

Esta guía explica el método paso a paso, con la calificación del **NPR** (número de prioridad de riesgo) y los errores más comunes.

## 1. Los términos

- **Modo de falla:** la manera concreta en que algo puede salir mal (por ejemplo, «muestra mal identificada» o «falla del refrigerador de reactivos»).
- **Efecto:** la consecuencia si ocurre (un resultado erróneo que llega al paciente, reactivo perdido, retraso).
- **Causa:** por qué podría ocurrir.
- **Control actual:** lo que hoy permite evitarlo o detectarlo.

## 2. Paso a paso

1. **Elige un proceso** y divídelo en etapas (preanalítica, analítica, postanalítica, apoyo).
2. **Arma un equipo** con quienes hacen el proceso. Una persona sola suele calificar distinto que el equipo, y ese es uno de los principales errores del método.
3. **Lista los modos de falla** de cada etapa, con su efecto y su causa.
4. **Define las escalas por escrito** antes de calificar (ver sección 3).
5. **Califica cada modo** en severidad, ocurrencia y detección.
6. **Calcula el NPR** y ordena de mayor a menor.
7. **Define acciones** para los modos prioritarios: qué, quién y para cuándo.
8. **Aplica, vuelve a calificar** y comprueba que el NPR bajó.

## 3. Las tres escalas, de 1 a 10

| Nota | Qué mide | 1 significa | 10 significa |
|---|---|---|---|
| **S: severidad** | Qué tan grave es el efecto | Sin efecto | Daño grave o un resultado erróneo que llega al paciente |
| **O: ocurrencia** | Qué tan frecuente es | Muy improbable | Casi seguro |
| **D: detección** | Qué tan probable es que NO se detecte antes de causar daño | La falla se detecta siempre antes | No se detecta |

Ojo con la detección: la escala está invertida respecto de la intuición. Una nota alta significa que **es difícil** detectarla.

## 4. El NPR

**NPR = S × O × D.** Va de 1 a 1.000, y se atiende primero el más alto. Si hay empate, va primero el de mayor severidad.

### Ejemplo

| Modo de falla | S | O | D | NPR |
|---|---|---|---|---|
| Muestra mal identificada | 9 | 3 | 4 | **108** |
| Falla del refrigerador de reactivos | 7 | 4 | 3 | **84** |

El primer modo tiene mayor NPR y mayor severidad: se atiende primero. Puedes hacer la tabla completa con la calculadora de [AMEF: número de prioridad de riesgo](/calculadoras/amef-npr/).

**¿Desde qué NPR se actúa?** El umbral de 100 es una referencia habitual, no una regla. Lo fija el procedimiento de gestión de riesgos de cada laboratorio.

## 5. Los límites del NPR

El NPR es útil pero imperfecto:

- **Combinaciones distintas dan el mismo número.** S 9 × O 1 × D 2 = 18 y S 2 × O 3 × D 3 = 18, pero el primero puede dañar a un paciente y el segundo es una molestia. Por eso se atienden siempre los modos de **severidad alta (9 o 10)**, aunque el NPR sea bajo.
- **Depende de quién califica.** Define las escalas por escrito, califica en equipo y registra los acuerdos.
- **No mide el costo de la acción.** Un NPR alto con una solución barata se atiende primero.

## 6. Convertirlo en acciones

Para cada modo prioritario define una acción concreta, un **responsable** y una **fecha**. Después de aplicarla, vuelve a calificar y comprueba que el NPR bajó. Si no baja, la acción no sirvió.

Ejemplos de acciones típicas:

- Para prevenir (baja la ocurrencia): doble verificación de identidad, rotulación en el punto de toma.
- Para detectar (baja la detección): alarmas de temperatura, controles adicionales, listas de chequeo.
- Para reducir el daño (baja la severidad): procedimientos de contingencia, respaldo de equipos.

Registra los riesgos y las acciones en una herramienta que deje trazabilidad: la ficha [Gestión de riesgos](/herramientas/gestion-de-riesgos/) lo describe. Si un modo de falla termina en un incidente real, se registra además como [no conformidad](/herramientas/no-conformidades-y-acciones-correctivas/). Para modos de falla de equipos, mira [Disponibilidad y OEE](/calculadoras/disponibilidad-y-oee-de-equipos/), y para ordenar causas por frecuencia, [Diagrama de Pareto](/calculadoras/pareto-de-causas/).

## 7. Errores frecuentes

- Calificar una persona sola, sin las que hacen el proceso.
- Cambiar las escalas durante el ejercicio.
- Listar modos de falla demasiado generales («error humano»). Mientras más concreto, más accionable.
- Hacer el AMEF una vez y archivarlo. Debe revisarse cuando cambia el proceso, el equipo o tras un incidente.
- Ignorar la severidad alta cuando el NPR queda bajo.
- No volver a calificar después de la acción.

## 8. Preguntas frecuentes

**¿Qué es el AMEF?** Un método para listar cómo puede fallar un proceso, evaluar la gravedad, la frecuencia y la dificultad de detectar cada falla, y priorizar acciones.

**¿Cómo se calcula el NPR?** Severidad × ocurrencia × detección, cada una de 1 a 10. Va de 1 a 1.000.

**¿Desde qué NPR hay que actuar?** El umbral de 100 es una referencia habitual, no una regla; lo fija el procedimiento de cada laboratorio.

**¿Qué hago con una severidad alta y un NPR bajo?** Se atiende igualmente. El NPR tiene límites: combinaciones muy distintas pueden dar el mismo número.

**¿Cada cuánto se revisa un AMEF?** Cuando cambia el proceso, el equipo o ante un incidente, y de forma periódica según tu procedimiento de gestión de riesgos.

## Lista de verificación

- [ ] El proceso está dividido en etapas y el equipo incluye a quienes lo hacen.
- [ ] Las escalas de severidad, ocurrencia y detección están escritas.
- [ ] Cada modo de falla es concreto y tiene efecto y causa.
- [ ] Se calculó el NPR y se atienden primero los más altos y los de severidad alta.
- [ ] Cada acción tiene responsable y fecha.
- [ ] Se volvió a calificar después de aplicar las acciones.
- [ ] Hay una fecha de revisión del análisis.

Esta guía es material educativo y no reemplaza el procedimiento de gestión de riesgos de tu laboratorio ni su normativa.
