---
titulo: "Verificación de métodos en el laboratorio clínico: precisión, sesgo y comparación"
fecha: 2026-11-13
resumen: "Cómo verificar un método antes de usarlo en el laboratorio: precisión 5 × 5, comparación con el valor del fabricante, comparación de métodos con muestras de pacientes y cómo decidir si el sesgo es aceptable frente al error total permitido."
temas: ["Verificación de métodos", "Control de calidad", "Estadística"]
---

Cuando un laboratorio incorpora un método o un equipo nuevo, no basta con creer lo que dice el inserto. Hay que **verificar** que, en sus manos, el método se comporta como el fabricante declara y que sirve para lo que el laboratorio necesita. Esta guía recorre las tres verificaciones centrales (precisión, sesgo y comparación con el método anterior), qué estadística usar en cada una y cómo decidir si el resultado es aceptable.

## 1. Verificación y validación no son lo mismo

- **Validación:** la hace quien desarrolla el método (normalmente el fabricante) y establece su desempeño.
- **Verificación:** la hace tu laboratorio para confirmar que ese desempeño se cumple con tu equipo, tus reactivos, tu personal y tus muestras.

Si el laboratorio modifica el método o lo usa fuera de lo declarado, ya no basta con verificar: hay que validar. En todos los casos, el documento de partida son las especificaciones declaradas y tu **error total permitido** para cada examen. Si aún no lo tienes definido, parte por [Error total permitido: cómo elegirlo para cada examen](/guias/error-total-permitido-como-elegirlo/), porque es la vara contra la que se juzgan los resultados de esta guía.

## 2. Qué se verifica

| Característica | Pregunta | Herramienta |
|---|---|---|
| **Precisión** | ¿Mi dispersión es compatible con la declarada? | [Verificación de precisión (5 × 5)](/calculadoras/verificacion-de-precision/) |
| **Veracidad (sesgo)** | ¿Mi media se acerca al valor verdadero o asignado? | [Comparación con el fabricante](/calculadoras/comparacion-con-el-fabricante/) |
| **Concordancia con otro método** | ¿Mis resultados coinciden con los del método que reemplazo? | [Comparación de métodos](/calculadoras/comparacion-de-metodos/) |

Otros aspectos suelen verificarse según el examen y lo que pida tu normativa (rango de medición, intervalos de referencia, arrastre). Esta guía se concentra en los tres anteriores.

## 3. Precisión: el diseño 5 × 5

El diseño más usado mide **un material estable durante 5 días, con 5 réplicas por día**. Con eso se separan dos fuentes de variación:

- **Repetibilidad:** variación dentro de una misma corrida. Si falla, el problema suele estar dentro de la corrida (pipeteo, burbujas, reactivo).
- **Precisión intralaboratorio:** variación total, que incluye lo que cambia de un día a otro. Si falla solo esta, mira calibración, lotes y ambiente.

El cálculo se hace con un análisis de varianza de un factor (ANOVA). Luego se compara tu CV observado con un **límite de verificación** que parte del CV declarado: tu CV puede superar un poco el declarado solo por azar, y el límite fija cuánto. Si queda bajo el límite, la declaración se verifica; si lo supera, es poco probable que sea azar.

Buenas prácticas:

- Verifica **cada nivel por separado** (por ejemplo, un nivel bajo y uno alto).
- Descarta antes los valores atípicos que tengan una causa conocida y anota el motivo. Para revisarlos, usa [Valores atípicos](/calculadoras/valores-atipicos/).
- El diseño 5 × 5 corresponde al protocolo CLSI EP15-A3. Si tu plan sigue las tablas de factores de ese documento, usa esas tablas; la calculadora del sitio usa un enfoque equivalente con chi cuadrado.

## 4. Sesgo: comparación con un valor asignado

Si dispones de un material con **valor asignado** (un calibrador trazable, un material de referencia o un control con valor declarado), puedes estimar tu sesgo:

**Sesgo % = (media − valor asignado) / valor asignado × 100**

La calculadora de [comparación con el fabricante](/calculadoras/comparacion-con-el-fabricante/) hace dos preguntas distintas que no conviene confundir:

- ¿Mi **media** es compatible con el valor asignado? (prueba t, o intervalo de verificación con la DE declarada).
- ¿Mi **dispersión** es compatible con la declarada? (chi cuadrado).

Un método puede tener la media bien y la dispersión mal, o al revés. Y recuerda que el valor asignado de un control tiene su propia incertidumbre y rangos que dependen del método y del equipo: usa el que corresponde al tuyo.

## 5. Comparación de métodos con muestras de pacientes

Para saber si el método nuevo concuerda con el que reemplazas, se miden **las mismas muestras de pacientes** con ambos métodos, cubriendo todo el rango de interés. La referencia habitual es el protocolo CLSI EP09c. Tres análisis se usan juntos:

- **Bland-Altman.** Grafica la diferencia entre métodos para cada muestra. El sesgo es la media de las diferencias, y los límites de concordancia son el sesgo ± 1,96 DE.
- **Passing-Bablok.** Una regresión que no supone distribución normal, no exige que un método esté libre de error y resiste valores atípicos. Entrega pendiente e intercepto con sus intervalos.
- **Deming.** Una regresión que reconoce que ambos métodos tienen error, según la razón de varianzas que indiques.

**Cómo leerlos.** Los métodos concuerdan si el intervalo de la pendiente incluye 1 y el del intercepto incluye 0. Si no los incluye, hay un **error proporcional** (pendiente) o **constante** (intercepto). Con menos de 40 muestras o un rango estrecho, los intervalos son poco confiables.

**Mira siempre el gráfico:** una curvatura, un abanico de dispersión o grupos de puntos separados indican que una sola recta no describe la relación. La regresión por mínimos cuadrados simple subestima la pendiente cuando el método X también tiene error, por eso se usa solo para comparar.

## 6. Decidir si el resultado es aceptable

Lo importante no es si la diferencia es estadísticamente significativa, sino **cuánto sesgo hay en los niveles de decisión clínica y si cabe dentro del error total permitido**. Un sesgo significativo puede ser clínicamente irrelevante, y uno no significativo con pocos datos puede esconder un sesgo importante.

1. Calcula el sesgo en cada nivel de decisión: **(intercepto + pendiente × nivel) − nivel**.
2. Combínalo con tu CV: [Error total y sigma](/calculadoras/error-total-y-sigma/).
3. Compáralo con el error total permitido que fijaste de antemano. Fijarlo **después** de ver los datos invalida la decisión.
4. Documenta la conclusión: aceptado, aceptado con condiciones o rechazado.

## 7. Qué hacer si no se cumple

- Repite la verificación revisando causas: calibración, lote de reactivo, mantención, condiciones de la muestra.
- Consulta al fabricante o al servicio técnico con tus datos en la mano.
- Si el método no cumple y es el único disponible, define con la jefatura y los clínicos qué restricciones se aplican y registra la decisión.
- No uses el método para informar pacientes hasta cerrar la decisión.

## 8. Preguntas frecuentes

**¿Qué es el diseño 5 × 5?** Medir un material estable durante 5 días con 5 réplicas por día, para separar la repetibilidad de la precisión intralaboratorio.

**¿Cuántas muestras necesito para comparar dos métodos?** Con menos de 40 muestras o un rango estrecho, los intervalos son poco confiables. Cubre todo el rango clínico de interés.

**¿Qué diferencia hay entre Bland-Altman y Passing-Bablok?** Bland-Altman muestra la diferencia y el sesgo promedio entre métodos; Passing-Bablok estima una recta (pendiente e intercepto) que distingue error proporcional de error constante.

**¿Debo comparar el sesgo con el error total permitido?** Sí. Lo importante es el tamaño del sesgo en los niveles de decisión frente a tu especificación de calidad, no solo la significancia estadística.

**¿Qué hago si mi CV supera el límite de verificación?** Es poco probable que sea azar: revisa el método, el equipo y el material. Si falla la repetibilidad, mira lo que pasa dentro de la corrida; si falla solo el intralaboratorio, lo que cambia de un día a otro.

## Lista de verificación

- [ ] Tengo el error total permitido de cada examen, fijado antes de verificar.
- [ ] Verifiqué la precisión por nivel, con 5 días × 5 réplicas.
- [ ] Estimé el sesgo con un valor asignado o con un método de referencia.
- [ ] Comparé el método con muestras de pacientes en todo el rango, con al menos 40 muestras.
- [ ] Evalué el sesgo en los niveles de decisión clínica.
- [ ] Documenté la conclusión y las decisiones tomadas.

## Referencias

- CLSI EP15-A3: *User Verification of Precision and Estimation of Bias*.
- CLSI EP09c: *Measurement Procedure Comparison and Bias Estimation Using Patient Samples*.
- Bland JM, Altman DG. Measuring agreement in method comparison studies. *Stat Methods Med Res*. 1999;8:135-160.
- Passing H, Bablok W. A new biometrical procedure for testing the equality of measurements from two different analytical methods. *J Clin Chem Clin Biochem*. 1983;21:709-720.
- Linnet K. Estimation of the linear relationship between the measurements of two methods with proportional errors. *Clin Chem*. 1990;36:1627-1632.

Esta guía es material educativo y no reemplaza los protocolos del CLSI, la normativa vigente ni el criterio de la jefatura del laboratorio.
