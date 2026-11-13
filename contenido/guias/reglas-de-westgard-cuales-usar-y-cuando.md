---
titulo: "Reglas de Westgard: cuáles usar y cuándo, con ejemplos"
fecha: 2026-11-12
resumen: "Qué es la multirregla de Westgard, qué significa cada regla (1-2s, 1-3s, 2-2s, R-4s, 4-1s, 10-x), cuáles rechazan y cuáles advierten, cómo elegirlas según el sigma del método y los errores más comunes al aplicarlas."
temas: ["Control de calidad", "Westgard", "Levey-Jennings"]
---

Las **reglas de Westgard** son un conjunto de criterios para decidir, mirando los resultados de tus controles, si una corrida analítica se acepta o se rechaza. Se usan sobre un gráfico de Levey-Jennings y se aplican en conjunto, como una **multirregla**: se rechaza si cualquiera de las reglas de rechazo se incumple.

Esta guía explica qué significa cada regla con ejemplos, cuáles rechazan y cuáles solo advierten, cómo elegirlas para cada examen y qué errores se repiten al aplicarlas. Si primero quieres practicar, pega tus datos en el [gráfico de Levey-Jennings](/calculadoras/levey-jennings/), que marca cada violación.

## 1. Para qué sirven y qué detectan

Un control medido muchas veces no da siempre el mismo valor: varía alrededor de una media, con una desviación estándar (DE) propia del método. Las reglas separan la variación normal de dos cambios que sí importan:

- **Error aleatorio** (imprecisión): los resultados se dispersan más de lo habitual, sin una dirección clara.
- **Error sistemático** (sesgo): los resultados se desplazan en una dirección, de golpe o poco a poco.

Ninguna regla detecta todo. Algunas detectan mejor el error aleatorio y otras el sistemático, y por eso se combinan.

**Antes de aplicar cualquier regla** necesitas una media y una DE correctas para cada nivel de control. Si las calculas con la misma serie que estás evaluando, un desvío ya incluido ensancha la DE y se esconde. Cómo establecerlas está en la [Guía para armar un plan de control interno de calidad](/guias/plan-de-control-interno-de-calidad/).

## 2. Las reglas, una por una

La notación es «cantidad de resultados – límite». Por ejemplo, **1-3s** significa «1 resultado fuera de ±3 DE».

| Regla | Qué pide | Qué suele indicar | Tipo |
|---|---|---|---|
| **1-2s** | Un control fuera de ±2 DE | Aviso de que algo puede estar cambiando | Advertencia |
| **1-3s** | Un control fuera de ±3 DE | Error aleatorio, o sistemático grande | Rechazo |
| **2-2s** | Dos controles seguidos fuera de 2 DE, del mismo lado | Error sistemático | Rechazo |
| **R-4s** | Dos controles seguidos que difieren en más de 4 DE (uno sobre +2 y otro bajo −2) | Error aleatorio | Rechazo |
| **4-1s** | Cuatro controles seguidos fuera de 1 DE, del mismo lado | Error sistemático | Rechazo |
| **10-x** | Diez controles seguidos del mismo lado de la media | Error sistemático (tendencia o desvío) | Rechazo |

### Cómo se ve cada una

- **1-2s.** Tu control de glucosa tiene media 100 mg/dL y DE 2. Hoy mide 105: está 2,5 DE sobre la media. Es una alerta, no un rechazo.
- **1-3s.** Mismo control, hoy mide 107 (3,5 DE). Un solo punto lejano: algo falló en esta corrida.
- **2-2s.** Ayer 105 y hoy 104,5: ambos sobre +2 DE. Ninguno pasó los 3 DE, pero que dos seguidos caigan del mismo lado casi nunca es azar. Sugiere un desplazamiento.
- **R-4s.** El nivel 1 mide +2,5 DE y el nivel 2 de la misma corrida mide −2 DE. Están separados por más de 4 DE: la dispersión aumentó.
- **4-1s.** Cuatro resultados seguidos sobre +1 DE. Ningún punto es alarmante, pero juntos muestran un cambio gradual.
- **10-x.** Diez resultados seguidos del mismo lado de la media, aunque todos queden muy cerca de ella. Es la señal más sensible de un desvío pequeño y persistente.

Mira la forma del gráfico además de la regla que se dispara: una tendencia sostenida hacia un lado suele tener una causa distinta a un punto aislado.

## 3. Rechazo y advertencia

Una **regla de rechazo** detiene el examen: no se entregan resultados hasta investigar y corregir. Una **regla de advertencia** no detiene nada, pero obliga a mirar con atención, y puede inspeccionarse con otras reglas antes de decidir.

La más discutida es **1-2s**. Si la usas como regla de rechazo, rechazas corridas buenas con demasiada frecuencia: según la revisión en que se basa nuestra guía de control interno, la tasa de falsos rechazos es de 4,6 % con un nivel de control, 8,9 % con dos y 13,0 % con tres. Con dos niveles y varias corridas al día, casi siempre tendrías al menos una alarma falsa. Por eso se recomienda usarla como **advertencia** que activa la revisión con las otras reglas, y no como motivo de rechazo por sí sola.

## 4. Cómo se aplican en la práctica

1. **Mide los controles** (idealmente dos niveles) y calcula en cuántas DE de la media cae cada uno.
2. **Si ninguno pasa los ±2 DE**, acepta la corrida.
3. **Si uno pasa 2 DE**, es una advertencia: revisa con las otras reglas.
4. **Revisa las reglas de rechazo** (1-3s, 2-2s, R-4s, 4-1s, 10-x). Si cualquiera se incumple, rechaza.
5. **Si rechazas**, no repitas el mismo vial: mide un vial nuevo, busca la causa, corrige, vuelve a medir y revisa los resultados de pacientes ya emitidos. El procedimiento completo está en la sección 6 de la guía de control interno.

Algunas reglas miran **dentro de la corrida** (por ejemplo R-4s, que compara niveles medidos juntos) y otras **entre corridas** (2-2s, 4-1s, 10-x, que miran la serie en el tiempo). Define cuál usa tu laboratorio y aplícala siempre igual.

## 5. Cuáles usar en cada examen

No hay una combinación válida para todos los exámenes. La que conviene depende de qué tan bueno es el método frente a la calidad que necesitas, y eso lo resume el **sigma**:

**Sigma = (ETa − sesgo) / CV**, todo en porcentaje.

- Con **sigma alto**, el método tiene mucho margen: bastan reglas simples y pocos controles, y agregar reglas solo genera falsas alarmas.
- Con **sigma bajo**, el margen es estrecho: necesitas más reglas, más controles o corridas más frecuentes para detectar errores pequeños. Y conviene preguntarse si el método se puede mejorar.

La calculadora de [Error total y sigma](/calculadoras/error-total-y-sigma/) calcula tu sigma y sugiere reglas según el resultado. Ten presente que el sigma depende del error total permitido que uses; si el ETa cambia, el sigma cambia. Antes de apoyarte en él, lee [Error total permitido: cómo elegirlo para cada examen](/guias/error-total-permitido-como-elegirlo/).

## 6. Errores que se repiten

- **Usar 1-2s como regla de rechazo.** Es la causa número uno de falsos rechazos y de que el equipo termine ignorando las alarmas.
- **Repetir el control hasta que «pase».** Un segundo intento dentro de límites no borra la primera señal.
- **Aplicar las mismas reglas a todos los exámenes sin mirar el sigma.** Algunos exámenes necesitan más, otros menos.
- **Usar una media o una DE equivocadas.** Si la DE es demasiado grande, las reglas se vuelven ciegas; si es demasiado pequeña, todo parece alarma.
- **No registrar qué se hizo.** Una alarma sin causa, acción y verificación anotadas no sirve para la auditoría ni para aprender. Usa un registro de [no conformidades y acciones correctivas](/herramientas/no-conformidades-y-acciones-correctivas/).
- **Mezclar lotes.** Al cambiar el lote del control, la media y la DE se vuelven a establecer.
- **Mirar solo la regla que se disparó.** Revisa la forma del gráfico completo, no solo el último punto.

## 7. Preguntas frecuentes

**¿Qué significa 1-3s?** Un control fuera de ±3 desviaciones estándar de la media. Es una regla de rechazo.

**¿Qué diferencia hay entre 2-2s y R-4s?** 2-2s son dos controles seguidos fuera de 2 DE del mismo lado y sugiere error sistemático. R-4s son dos controles que difieren en más de 4 DE, uno a cada lado, y sugiere error aleatorio.

**¿Cuántos controles necesito para usar la multirregla?** Mientras más niveles midas, más reglas puedes aplicar y mejor detectas los errores; la multirregla clásica se describe para dos niveles. Define en tu plan cuántos mides y cuándo.

**¿Qué hago si se incumple una regla?** Detener el examen, medir un vial nuevo, buscar y corregir la causa, repetir el control y revisar los resultados de pacientes ya informados.

**¿Todas las reglas son obligatorias?** No. Las reglas las define cada laboratorio en su plan de control, según el método y la calidad requerida, y su normativa o entidad acreditadora puede pedir algo específico.

Para interpretar el control externo, lee [Control de calidad externo: cómo interpretar el sesgo y el SDI](/guias/control-de-calidad-externo-sesgo-y-sdi/).

## Lista de verificación

- [ ] Cada examen tiene media y DE establecidas por nivel de control.
- [ ] Las reglas de cada examen están escritas en el plan, separando rechazo y advertencia.
- [ ] 1-2s está como advertencia, no como rechazo.
- [ ] Elegí las reglas considerando el sigma de cada examen.
- [ ] Existe un procedimiento escrito para cuando una regla se incumple.
- [ ] Cada alarma queda registrada con causa, acción y verificación.
- [ ] Al cambiar de lote del control se restablecen la media y la DE.

## Referencias

- Gruber L, Hausch A, Mueller T. Internal Quality Controls in the Medical Laboratory: A Narrative Review of the Basic Principles of an Appropriate Quality Control Plan. *Diagnostics*. 2024;14(19):2223. [doi:10.3390/diagnostics14192223](https://doi.org/10.3390/diagnostics14192223) (CC BY 4.0)

Esta guía es material educativo y no reemplaza la normativa vigente, las instrucciones del fabricante ni el criterio de la jefatura del laboratorio.
