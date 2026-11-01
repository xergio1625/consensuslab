---
titulo: "Guía para armar un plan de control interno de calidad"
fecha: 2026-10-11
resumen: "Qué debe definir un plan de control interno (materiales, frecuencia, niveles y reglas), cómo calcular sesgo, CV y sigma, qué hacer ante una alarma y cómo revisar el plan. Adaptación en español de una revisión de acceso abierto."
temas: ["Control de calidad"]
fuente:
  titulo: "Internal Quality Controls in the Medical Laboratory: A Narrative Review of the Basic Principles of an Appropriate Quality Control Plan"
  autores: "Lorenz Gruber, Artur Hausch y Thomas Mueller"
  publicacion: "Diagnostics 2024, 14(19), 2223"
  doi: "10.3390/diagnostics14192223"
  enlaces:
    - { texto: "Texto completo en PubMed Central (PMC11475633)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11475633/" }
    - { texto: "Registro en PubMed (PMID 39410627)", url: "https://pubmed.ncbi.nlm.nih.gov/39410627/" }
  licencia: "CC BY 4.0"
  licencia_url: "https://creativecommons.org/licenses/by/4.0/deed.es"
  cambios: "Traducción y adaptación al español, condensación y reorganización de las secciones, redacción propia de los ejemplos y listas, escritura explícita de las fórmulas (que en el original son ecuaciones), tabla de reglas, lista de verificación final y enlaces a las herramientas de este sitio. Se omitieron los detalles de la regulación de cada país y las referencias bibliográficas; para ello consulta el texto original. Si encuentras una diferencia con el original, prevalece este último."
---

Casi todos los laboratorios miden controles todos los días. Mucho menos común es tener un **plan** que diga qué se mide, cuándo, con qué reglas y qué se hace cuando algo falla. Esta guía resume los elementos de ese plan según la literatura, y los aterriza con las calculadoras de ConsensusLab.

## 1. Qué debe definir el plan, para cada examen

Un plan de control interno (CI) responde cuatro preguntas por cada examen que haces:

1. **Qué material de control usas.**
2. **Con qué frecuencia lo mides** y en qué momentos.
3. **En cuántos niveles de concentración.**
4. **Con qué reglas evalúas los resultados** (de rechazo y de advertencia) y qué haces cuando se incumplen, incluyendo cómo avisar al clínico si ya salieron resultados erróneos.

El plan debe poder detectar un cambio en el desempeño del examen que ponga en riesgo al paciente según el uso médico del resultado. La responsabilidad de que exista y funcione es de la jefatura del laboratorio.

Un plan se apoya en **dos pilares**:

- **Control estadístico:** gráficos de Levey-Jennings y reglas de Westgard.
- **Control con relevancia médica:** límites definidos por lo que el clínico necesita (error total permitido, TEa).

Con uno solo no basta: el primero te dice si el método está estable, el segundo si esa estabilidad es suficiente para decidir clínicamente.

## 2. Las cifras que necesitas por cada nivel de control

**Media.** Es el centro de los resultados del control. Debe ser la de *tu* laboratorio, medida con el método estable. Los valores del inserto del fabricante sirven como referencia, no como reemplazo.

**Sesgo (%).** Mide el error sistemático. Cuando no conoces el valor verdadero del control, se compara tu media con la del grupo de pares (laboratorios con el mismo método, equipo, reactivo y lote de control):

> Sesgo % = (media del laboratorio − media del grupo) ÷ media del grupo × 100

**Desviación estándar (DE) y coeficiente de variación (CV).** Miden el error aleatorio (imprecisión):

> CV % = DE ÷ media × 100

La DE además define las líneas del gráfico: ±1 DE, ±2 DE y ±3 DE alrededor de la media.

**Error total permitido (TEa).** Es el error máximo que el examen puede tener sin cambiar una decisión médica. No existe un TEa universal. La literatura propone elegirlo con este orden de preferencia:

1. **Estudios de resultados clínicos** (lo ideal, pero existen para pocos exámenes).
2. **Variabilidad biológica** (el error analítico debe ser pequeño frente a la variación natural del analito).
3. **Estado del arte** (lo que la tecnología actual y los laboratorios pares logran).

Sea cual sea el criterio, conviene consultarlo con los clínicos que usan el examen.

**Sigma.** Resume sesgo, CV y TEa en un solo número:

> Sigma = (TEa % − |sesgo %|) ÷ CV %

Un sigma alto (por ejemplo 6) indica pocos errores y permite un control menos exigente. Un sigma bajo (por ejemplo 3) indica que el método deja pasar más errores, y pide reglas más sensibles y controles más frecuentes. Una precisión importante: **endurecer las reglas no mejora el método**. Si el TEa no cambia, el sigma tampoco, sin importar qué reglas apliques; solo cambia cuántos problemas detectas y cuánto trabajo extra generas.

> **Calcúlalo aquí:** [Estadística del control](/calculadoras/estadistica-del-control/) · [Error total y sigma](/calculadoras/error-total-y-sigma/) · [TEa por variabilidad biológica](/calculadoras/tea-variabilidad-biologica/)

## 3. Cómo establecer la media y la DE

- **Control nuevo, sin datos previos:** mide al menos **20 puntos en días distintos**, con el método estable. Mientras acumulas datos, vigila de cerca y actualiza.
- **Cambio de lote de control o de reactivo:** la media suele desplazarse, la DE normalmente no. Alcanzan unas **10 mediciones en días distintos** para una primera media. Esos 10 días recogen la variación diaria del proceso.
- **Si necesitas empezar antes,** usa la media de pocos días, pero trátala como provisoria y actualízala con los datos nuevos (media móvil).

## 4. El material de control

- **Misma matriz que el paciente** (suero, plasma, orina) y, ojalá, que se comporte como la muestra real (conmutable).
- **Compra suficiente de un solo lote** para un año o más. Así recalculas medias con menos frecuencia.
- **Distinto del calibrador.** Si el control se parece al calibrador, puede no detectar errores sistemáticos.
- **Prefiere controles de terceros** (independientes del fabricante del método): permiten una evaluación independiente.
- **Niveles:** como mínimo dos concentraciones. Idealmente, una cerca del **límite de decisión clínica** del examen.
- **Presentación:** el liofilizado es el más estable; el líquido es práctico, no requiere reconstituir y suele necesitar congelación.

## 5. Las reglas de Westgard

Las reglas buscan detectar dos tipos de cambio: **error sistemático** (sesgo) y **error aleatorio** (imprecisión). Una combinación de reglas se llama *multirregla* y rechaza si **cualquiera** de ellas se incumple. Las más usadas:

| Regla | Qué significa | Suele indicar |
|---|---|---|
| 1-2s | Un control fuera de ±2 DE | Advertencia |
| 1-3s | Un control fuera de ±3 DE | Error aleatorio |
| 2-2s | Dos controles seguidos fuera de ±2 DE, del mismo lado | Error sistemático |
| R-4s | Un control sobre +2 DE y otro bajo −2 DE | Error aleatorio |
| 4-1s | Cuatro controles seguidos fuera de ±1 DE, del mismo lado | Error sistemático |
| 10-x | Diez controles seguidos del mismo lado de la media | Error sistemático |

**Reglas de rechazo y de advertencia.** Si se incumple una regla de rechazo, se detiene el examen y se investiga. Una regla de advertencia no detiene nada: avisa temprano para intervenir antes de que el problema crezca. Pueden variar de un examen a otro.

**Por qué 1-2s no debería ser regla de rechazo por defecto.** Su tasa de falsos rechazos es alta: 4,6 % con un nivel, 8,9 % con dos y 13,0 % con tres. Un laboratorio que mide dos niveles en 20 exámenes y rechaza con 1-2s tendría casi siempre al menos una alarma falsa por ciclo. Úsala como advertencia.

Ninguna regla es perfecta: todas dejan pasar algunos errores (falsos negativos) y alarman a veces sin error real (falsos positivos).

> **Practica con tus datos:** [Gráfico de Levey-Jennings con reglas de Westgard](/calculadoras/levey-jennings/)

## 6. Qué hacer cuando hay una alarma

Un procedimiento escrito y seguido; si no, el control pierde su sentido.

1. **No repitas el mismo vial.** Es probable que la segunda lectura caiga dentro de límites y te dé una falsa tranquilidad.
2. **Mide un vial nuevo** del mismo material. Si el resultado es normal, el problema era el vial (evaporación, mala conservación). Si la alarma se repite, es un problema real del método.
3. **Detén la entrega de resultados** y las mediciones de pacientes.
4. **Busca y corrige la causa:** calibración, cambio de reactivo, electrodos, temperatura, niveles de líquido. Algunas causas necesitan una investigación técnica más profunda.
5. **Vuelve a medir el control** para confirmar que el método quedó funcionando.
6. **Revisa los resultados de pacientes ya emitidos** (ver abajo).

### Revisión retrospectiva de resultados

Define para cada examen la diferencia que obliga a corregir un resultado (el TEa sirve de base). Luego:

1. Repite muestras de pacientes en el método ya corregido y compáralas con lo informado.
2. Parte desde el momento en que la regla rechazó y retrocede en el tiempo, en lotes de **10 muestras**.
3. Si en el lote de 10 alguna requiere corrección, evalúa otro lote de 10. Sigue hasta encontrar un lote completo que no necesite cambios: ese punto corresponde, aproximadamente, a cuando empezó el problema.
4. Si no hay muestra disponible o el analito es inestable, emite un informe corregido indicando que el resultado no es válido.

Apoya este paso con tu registro de [no conformidades y acciones correctivas](/herramientas/no-conformidades-y-acciones-correctivas/) y, si quieres ayuda para redactar el análisis, con el prompt de [alarma de control de calidad](/prompts/alarma-de-control-de-calidad/).

## 7. Varios equipos para el mismo examen

Dos equipos idénticos casi nunca tienen la misma media ni la misma DE. Hay pocos estudios y no hay una recomendación única. Un trabajo reciente citado en la revisión usó un solo gráfico de Levey-Jennings para varios equipos, con la media del grupo de pares como objetivo y límites iguales para todos, y logró menos recalibraciones innecesarias sin alterar resultados. Es una opción a evaluar, no una regla.

## 8. Riesgo para el paciente

El plan también debe pensarse según el daño posible de un resultado erróneo. El riesgo combina la **probabilidad** de que ocurra daño y su **gravedad**, y suele evaluarse con una escala de cinco niveles para cada una (enfoque de CLSI EP23). La literatura reciente propone un **índice de gestión de riesgo (RMI)**: probabilidad de daño estimada ÷ probabilidad de daño aceptable. Un RMI ≤ 1 significa que el método junto con tu plan mantiene el riesgo en un nivel aceptable; un RMI de 1,56, por ejemplo, indica un riesgo 56 % sobre el objetivo.

Esto conecta con tu [gestión de riesgos](/herramientas/gestion-de-riesgos/).

## 9. Control con datos de pacientes

Como complemento, existe el **control en tiempo real basado en pacientes** (PBRTQC, o «promedio de normales»): se vigila el promedio móvil de los resultados reales. Evita el problema de que el control comercial no se comporte como una muestra de paciente y permite vigilancia continua. Exige más estadística e informática, por lo que se propone como **complemento** del control clásico, no como reemplazo.

## 10. Revisa el plan, no lo dejes fijo

Un plan no se escribe una vez y se archiva. Reevalúalo periódicamente para detectar más errores reales con menos falsas alarmas. Revisa en cada ciclo:

- ¿El sigma de cada examen sigue siendo el esperado?
- ¿Hay reglas que alarman sin hallar nunca un error (o que nunca alarman)?
- ¿Los materiales, la frecuencia y los niveles siguen siendo adecuados?
- ¿Las acciones ante alarmas se documentaron y se cumplieron?

La revisión también advierte sobre dos críticas conocidas al enfoque clásico: es costoso (hasta un tercio de las mediciones puede ser control, con menos de 1 % de corridas rechazadas) y complejo. Una respuesta práctica es mantener el plan **simple y bien entrenado**, para que todo el equipo lo aplique igual.

## 11. Marco normativo (resumen)

- **ISO 15189:** exige que el CI verifique que el sistema funciona y que los resultados son confiables, y pide considerar los límites de decisión clínica, la independencia del material, la frecuencia, las consecuencias del incumplimiento y la evaluación retrospectiva periódica.
- **CLSI C24 y EP23:** describen estrategias de CI según la calidad requerida, la precisión y el sesgo observados, y el riesgo de daño al paciente.
- Otros países (Alemania, Suiza, Austria) tienen reglas propias, que la revisión describe como ejemplos. Verifica siempre lo que exige tu normativa local y tu entidad acreditadora.

## Resumen en una lista

- [ ] Para cada examen: material, frecuencia, niveles y reglas por escrito.
- [ ] Media y DE propias; al menos 20 puntos al inicio y 10 días tras un cambio de lote.
- [ ] TEa definido con criterio explícito y consultado con clínicos.
- [ ] Sesgo, CV y sigma calculados y revisados.
- [ ] Reglas de rechazo y de advertencia distinguidas; 1-2s como advertencia.
- [ ] Procedimiento de alarma: vial nuevo, detener, corregir, repetir control, revisar retrospectivamente.
- [ ] Revisión periódica del plan.

Esta guía es material educativo y no reemplaza la normativa vigente ni el criterio de la jefatura del laboratorio.
