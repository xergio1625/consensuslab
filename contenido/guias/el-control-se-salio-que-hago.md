---
titulo: "El control se salió: qué hago en los próximos cinco minutos"
fecha: 2026-11-13
resumen: "Guía de decisión ante un control interno fuera de rango: cuatro preguntas para los primeros cinco minutos, qué significa cada regla de Westgard, árbol de decisión, causas, revisión de resultados ya informados y registros listos para copiar."
temas: ["Control de calidad", "Westgard"]
---

> Esta guía es libre. Las **planillas de Excel con manual** se venden aparte; consulta en [Guías y planillas](/guias/#planillas). Para entender cada regla en detalle, mira también [Reglas de Westgard: cuáles usar y cuándo](/guias/reglas-de-westgard-cuales-usar-y-cuando/).

## Para qué sirve
Cuando un control sale mal, lo difícil no es la estadística: es decidir rápido, en el turno, con presión, y dejarlo bien documentado. Esta guía te da un orden fijo de pasos para que **dos personas distintas, en turnos distintos, tomen la misma decisión**.

**Cómo usarla.** Imprime las secciones 1, 3, 4 y 12 y déjalas en el puesto de trabajo: son la hoja de emergencia. El resto es para leer con calma una vez, adaptar a tu laboratorio y dejar como material de inducción. Los formularios de los anexos A, B y C están pensados para copiarse. Si prefieres tenerlos ya armados, la **planilla de Excel de ConsensusLab** (de pago, con manual) trae alarmas, revisión de resultados, resumen mensual, ficha de acción correctiva y traspaso de turno.

**Qué no es.** No es un manual de estadística ni reemplaza tu plan de control interno. Parte del supuesto de que ya tienes definidos el material de control, la media y la desviación estándar de cada nivel y las reglas que aplicas (si aún no, parte por la guía gratuita [Plan de control interno de calidad](https://consensuslab.cl/guias/plan-de-control-interno-de-calidad/)).

## 1. Los cinco minutos: cuatro preguntas antes de tocar nada
1. **¿Qué regla se violó y en qué nivel de control?** (advertencia o rechazo).
2. **¿Es solo un examen o varios?** Si fallan varios a la vez, sospecha de algo común: el equipo, el agua, la temperatura, un reactivo compartido, el material de control.
3. **¿Salieron resultados de pacientes desde el último control aceptable?**
4. **¿Qué cambió hoy?** Reactivo, lote, calibración, mantención, operador, material de control abierto, cambio de turno.

Anota las respuestas. Son el comienzo del registro. Y antes de cualquier otra cosa, **detén la liberación del examen si la regla es de rechazo**: detener cuesta minutos; informar un resultado errado cuesta mucho más.

## 2. Qué te dice cada regla
| Regla | Qué significa | Tipo de error probable | Primera acción |
|---|---|---|---|
| **1-2s** | Un control pasa ±2 DE | Solo advertencia | Revisa las demás reglas; no rechaces por esto solo |
| **1-3s** | Un control pasa ±3 DE | Aleatorio, o sistemático grande | Rechazo: detén la liberación del examen |
| **2-2s** | Dos controles seguidos pasan 2 DE del mismo lado | Sistemático | Rechazo: revisa calibración, reactivo y material |
| **R-4s** | Dos controles de la misma corrida difieren en más de 4 DE | Aleatorio | Rechazo: revisa pipeteo, mezcla, burbujas, temperatura |
| **4-1s** | Cuatro seguidos pasan 1 DE del mismo lado | Sistemático (deriva pequeña) | Revisa tendencia; actúa aunque no haya "rechazo" visible |
| **8-x / 10-x** | Ocho o diez seguidos del mismo lado de la media | Sistemático | Revisa calibración, lote y estabilidad del material |

Las reglas que uses dependen de **tu plan**. No apliques más ni menos que las que definiste (ver sección 8).

### Cómo se ve cada una en la gráfica (z = distancia a la media en DE)
```
1-3s   un punto fuera de ±3        →  un pico aislado
2-2s   dos puntos seguidos > +2    →  dos puntos arriba, juntos
R-4s   un punto > +2 y otro < -2   →  uno arriba y otro abajo en la misma corrida
4-1s   cuatro puntos > +1          →  una "escalera" que se queda arriba
10-x   diez puntos sobre la media  →  una meseta desplazada
```
Con dos niveles, una regla puede cumplirse **dentro de una corrida** (entre niveles) o **entre corridas** (el mismo nivel en el tiempo). Define en tu plan cuál usa cada regla, y úsala igual todos los días.

### Cuánta alarma es normal
Aun con un método perfecto, en un control con distribución normal, cerca de 1 de cada 20 puntos supera ±2 DE y cerca de 1 de cada 370 supera ±3 DE. Por eso **1-2s no se rechaza**: con dos niveles, casi 1 de cada 10 corridas tendría algún punto sobre 2 DE sin que pase nada. Y por eso, si un examen te alarma todos los días, el problema ya no es el azar.

## 3. Árbol de decisión
```
Sale una alarma
│
├─ ¿Es solo advertencia (1-2s) y ninguna otra regla?
│    └─ Sí → Registra, sigue la rutina, vigila los próximos controles.
│
└─ ¿Es regla de rechazo?
     ├─ 1. Detén la liberación de resultados de ese examen.
     ├─ 2. Identifica el tipo de error (tabla anterior).
     ├─ 3. Revisa la lista de causas (sección 4), de la más barata a la más cara.
     ├─ 4. Repite el control con una alícuota nueva, UNA vez.
     │      ├─ Pasa y encontraste una causa clara → corrige, documenta, reanuda.
     │      ├─ Pasa pero no hay causa → llama a la jefatura antes de reanudar.
     │      └─ No pasa → avanza al paso 5.
     ├─ 5. Acción correctiva (recalibrar, cambiar reactivo, mantención) y nuevo control.
     └─ 6. Si no se resuelve: escala a la jefatura y al servicio técnico. No informes resultados.
```
**Repetir el control hasta que "pase" no es una acción correctiva.** Es la conducta que más errores esconde.

**Por qué "una vez".** Si el problema es real, repetir con otra alícuota lo confirma; si repites tres veces y la tercera pasa, no demostraste que el método esté bien: demostraste que con suficientes intentos algo pasa. Define en tu procedimiento cuántas repeticiones permites (lo habitual es una) y qué se hace si no hay causa clara.

## 4. Lista de causas, de la más barata a la más cara
**Si el error parece aleatorio (1-3s, R-4s):**
- [ ] Tipo de muestra, volumen y mezcla del material de control.
- [ ] Burbujas, coágulos, tapa mal cerrada, vial con evaporación.
- [ ] Pipeta o dosificador (mira la mantención y la última verificación).
- [ ] Temperatura del equipo o de la sala fuera de rango.
- [ ] Reactivo recién cambiado o agotándose.
- [ ] Electrodo, lámpara o línea de fluidos con problemas.

**Si el error parece sistemático (2-2s, 4-1s, 8-x/10-x):**
- [ ] Calibración vencida o hecha con un calibrador deteriorado.
- [ ] Cambio de lote de reactivo o de calibrador sin recalibrar.
- [ ] Material de control mal conservado, vencido o con más tiempo abierto del permitido.
- [ ] Deriva de lámpara, de temperatura o de un componente óptico.
- [ ] Cambio de operador o de procedimiento.
- [ ] El material nuevo se está comparando con las medias del material anterior.

**Si fallan varios exámenes a la vez:** agua del equipo, temperatura ambiente, voltaje, un reactivo o diluyente común, error de programación.

### Pistas para distinguir
| Observación | Apunta a |
|---|---|
| Falla un solo nivel, el otro sigue centrado | Material de ese nivel (evaporación, contaminación) o error cerca de su concentración |
| Fallan los dos niveles hacia el mismo lado | Calibración, reactivo, lámpara: algo que afecta a todo el rango |
| Los dos niveles se separan en sentidos opuestos | Precisión (pipeteo, mezcla) más que sesgo |
| Empezó justo después de un cambio (lote, calibración, mantención) | Ese cambio, hasta demostrar lo contrario |
| Empezó sin cambios y avanza de a poco | Deriva: reactivo envejeciendo, lámpara, temperatura, material de control abierto |
| Solo falla en cierto turno u operador | Procedimiento o técnica, no el equipo |

Cambia **una cosa a la vez** y repite el control después de cada una. Si cambias cuatro cosas y el control mejora, no sabrás cuál arregló el problema ni cuál te lo volverá a dar.

## 5. Lo que no debes hacer
1. Repetir hasta que pase y no registrar las repeticiones.
2. Cambiar la media o la desviación estándar del control para que "calce".
3. Ampliar los límites sin una revisión formal del plan.
4. Descartar el valor sin escribir el motivo.
5. Seguir informando resultados "porque el otro nivel está bien" cuando una regla de rechazo dice lo contrario.
6. Resolverlo "de palabra" y no dejar registro.
7. Recalibrar como primera reacción, sin revisar antes las causas baratas: una recalibración puede esconder un problema que seguirá ahí mañana.
8. Pasar el problema al siguiente turno sin decirlo.

## 6. Resultados que ya salieron
Aquí la guía no decide por ti: depende de tu procedimiento y de tu jefatura. Pero estas preguntas ordenan la revisión:

1. **¿Cuándo fue el último control aceptable?** Ese es el punto de partida de la revisión.
2. **¿Qué resultados se informaron desde entonces?** Lista de pacientes y de exámenes.
3. **¿La dirección del error podría cambiar una decisión clínica?** Un sesgo pequeño en un examen con amplio margen no pesa igual que uno en un examen con decisiones críticas.
4. **¿Cuáles repetir, y con qué prioridad?** Un criterio común es priorizar resultados cercanos a un límite de decisión, pacientes críticos y los más recientes.
5. **¿Hay que avisar a un clínico?** Si un resultado informado cambió o puede haber estado errado, defínelo con la jefatura y regístralo.
6. **¿Quién autoriza la liberación y cuándo?**

### Cómo ordenar la revisión (ejemplo)
Un examen tuvo su último control aceptable a las 08:10 y la alarma salió a las 11:40. En ese lapso se informaron 62 resultados. El error probable es sistemático y positivo (+2,4 DE en ambos niveles).

| Grupo | Criterio | Qué hacer (a definir en tu procedimiento) |
|---|---|---|
| A | Cerca de un límite de decisión, o paciente crítico / urgencia | Repetir primero, con el equipo ya corregido |
| B | Resultado informado que, corregido por la dirección del error, cambiaría de categoría (normal ↔ anormal) | Repetir y, si cambia, avisar al clínico |
| C | Resultados muy alejados de cualquier límite | Repetir una muestra de ellos; si coinciden, la revisión puede cerrarse sin repetir todos |
| D | Muestras que ya no están disponibles | Registrar que no se pudieron revisar y la decisión de la jefatura |

Lo que importa no es repetir todo: es que **el criterio esté escrito antes** y que quede registrado cuántos se revisaron, cuántos cambiaron y qué se hizo con los que cambiaron.

### Cuando hay que avisar
Un aviso útil dice lo mínimo necesario y es verificable. Modelo:

> "Le avisamos que el [examen] informado a [paciente / identificador] el [fecha y hora] fue repetido tras detectarse una desviación en el control interno. Valor informado: [x]. Valor corregido: [y]. La diferencia [sí / no] cambia la interpretación. Quedamos a su disposición. Responsable: [nombre y cargo]."

Quién avisa, a quién y por qué medio lo define tu procedimiento. Lo que debes poder mostrar después es que se avisó, quién y cuándo.

## 7. Registro de la acción correctiva (copia y completa)
| Campo | Contenido |
|---|---|
| Fecha y hora | |
| Examen, equipo y lote de reactivo | |
| Material de control y nivel | |
| Regla violada | |
| Resultado del control | |
| Tipo de error probable | |
| Qué cambió hoy | |
| Causas revisadas | |
| Acción realizada | |
| Control posterior (valor y resultado) | |
| ¿Hubo resultados informados? ¿Cuáles? | |
| Revisión y decisión sobre pacientes | |
| Comunicación a clínicos (si aplica) | |
| Responsable / jefatura / fecha de cierre | |

El registro debe poder responder, meses después: **qué pasó, qué decidiste, por qué, y qué pasó con los pacientes**.

### Ejemplo completado (compuesto, no real)
| Campo | Contenido |
|---|---|
| Fecha y hora | 14-09, 11:40 |
| Examen, equipo y lote de reactivo | Creatinina, analizador química 1, lote R-2231 |
| Material de control y nivel | Control multiparamétrico, niveles 1 y 2 |
| Regla violada | 2-2s entre niveles (ambos > +2 DE) |
| Resultado del control | N1: +2,3 DE; N2: +2,5 DE |
| Tipo de error probable | Sistemático |
| Qué cambió hoy | Reactivo cambiado a las 08:30 (frasco nuevo, mismo lote) |
| Causas revisadas | Material de control (alícuota nueva), temperatura del bloque, estado de calibración |
| Acción realizada | Calibración vencida detectada (vigencia 7 días, pasaron 9); recalibración con calibrador nuevo |
| Control posterior (valor y resultado) | N1: +0,2 DE; N2: −0,1 DE; aceptable |
| ¿Hubo resultados informados? ¿Cuáles? | Sí: 62 de creatinina entre 08:10 y 11:40 |
| Revisión y decisión sobre pacientes | Repetidos los 9 del grupo A y los 7 del grupo B; 2 cambiaron de categoría; resto de una muestra de 10: coinciden |
| Comunicación a clínicos (si aplica) | Avisados 2 médicos tratantes, 12:35 y 12:50 |
| Responsable / jefatura / fecha de cierre | [Nombre], jefa de turno / [Nombre], jefatura / 14-09 |

## 8. Ajustar las reglas al desempeño del examen (sigma)
No todos los exámenes necesitan las mismas reglas. Según la métrica sigma de cada uno (calculada con el error total permitido, el sesgo y el CV), la calculadora [Error total y sigma](https://consensuslab.cl/calculadoras/error-total-y-sigma/) sugiere:

| Sigma | Desempeño | Reglas sugeridas | Controles |
|---|---|---|---|
| 6 o más | Clase mundial | 1-3s | N = 2, R = 1 |
| 5 a 6 | Excelente | 1-3s / 2-2s / R-4s | N = 2, R = 1 |
| 4 a 5 | Bueno | 1-3s / 2-2s / R-4s / 4-1s | N = 4, R = 1 (o N = 2, R = 2) |
| 3 a 4 | Marginal | 1-3s / 2-2s / R-4s / 4-1s / 8-x | N = 4, R = 2 (o N = 2, R = 4) |
| Menos de 3 | Pobre o inaceptable | Las mismas, con máximo control; el control estadístico no basta: mejora el método (CV o sesgo) o revisa el requisito | N = 4, R = 2 (o N = 2, R = 4) |

(N = número de controles por corrida; R = número de corridas sobre las que se evalúa.) Un examen con sigma alto y muchas reglas genera falsas alarmas y cansa al equipo; uno con sigma bajo y pocas reglas deja pasar errores. **Revisa el plan cuando cambie el método, el reactivo o el material.**

## 9. Tres casos tipo (compuestos, no corresponden a un laboratorio real)
**Caso 1 · La deriva silenciosa.** Cuatro controles seguidos del mismo lado en el nivel bajo de un examen, todos dentro de ±2 DE. Nadie reacciona porque "están en rango". La regla 4-1s lo detecta. Causa: material de control con más días abiertos de lo permitido. Acción: material nuevo, revisión de los últimos pacientes cercanos al límite y ajuste del plan de vida útil del vial.

**Caso 2 · El control que cambió de lote.** Todo el turno de tarde con 2-2s tras cambiar el lote de control. Causa: se siguió usando la media del lote anterior. Acción: establecer la media propia con un número suficiente de mediciones y dejar un periodo de transición con límites provisorios documentados.

**Caso 3 · Varios exámenes a la vez.** Tres exámenes de química con R-4s el mismo lunes. Causa: temperatura de la sala por una falla de aire acondicionado en la noche. Acción: corregir la sala, recalibrar si corresponde, repetir controles y revisar resultados desde el último control aceptable.

**Caso 4 · El que "siempre falla los lunes".** Un examen de coagulación con 1-3s casi todos los lunes en la mañana. Se repetía el control, pasaba y se seguía. Al registrar las repeticiones se vio el patrón: el material de control se descongelaba el viernes y se dejaba abierto el fin de semana. Acción: alícuotas de un solo uso, hora de apertura anotada en el vial, y registro de cada repetición. Enseñanza: sin el registro de las repeticiones, el patrón no se habría visto nunca.

**Caso 5 · La alarma que nadie escuchó.** En un examen con sigma marginal, el plan tenía solo 1-3s. Los controles pasaron semanas desplazados +1,5 DE sin rechazo. Un resultado de auditoría interna mostró un sesgo real de 4 %. Acción: sumar 2-2s y 4-1s al plan, revisar el requisito de calidad del examen y corregir el sesgo. Enseñanza: un plan con pocas reglas para un examen difícil no es un plan tranquilo, es un plan ciego.

## 10. Por tipo de examen: dónde mirar primero
No reemplaza el manual de tu equipo, pero ordena la primera revisión.

| Tipo | Primeras causas a revisar | Señal típica |
|---|---|---|
| **Química fotométrica** | Calibración, lámpara, temperatura del bloque, reactivo (estabilidad a bordo), agua | Deriva lenta de varios exámenes; saltos tras cambiar reactivo |
| **Electrolitos (ISE)** | Electrodos, solución de referencia, líneas, burbujas, calibración de pendiente | Un electrodo (Na, K o Cl) fuera, los demás bien |
| **Inmunoensayos** | Lote de reactivo y calibración, material de control, estabilidad del calibrador, procedimiento de lavado | Sesgo sistemático tras cambio de lote; controles bajos más afectados |
| **Hematología** | Control y su conservación, aspiración, muestra mal mezclada, limpieza, reactivos | Parámetros ligados (hemoglobina, HCT, VCM) moviéndose juntos |
| **Coagulación** | Conservación y reconstitución del control, temperatura, lote de reactivo, plasma de referencia | Tiempos que se alargan sin explicación; diferencias entre niveles |
| **Orina (tira / sedimento)** | Tiras (humedad, vencimiento), material de control, lectura | Un parámetro fuera, el resto bien |

## 11. Qué dejar escrito en tu laboratorio (para que la guía funcione)
Para que dos personas distintas decidan lo mismo, estos puntos deben estar en **tu** procedimiento, no solo en la cabeza del jefe de turno:
- [ ] Reglas aplicadas por examen, cuáles son de advertencia y cuáles de rechazo.
- [ ] Cuántas repeticiones del control se permiten y con qué material.
- [ ] Quién puede reanudar un examen tras una alarma, y quién autoriza si no se encontró causa.
- [ ] Cómo se determina "el último control aceptable".
- [ ] Criterio de revisión de resultados informados (sección 6) y quién lo aplica.
- [ ] Quién avisa a los clínicos, a quién y por qué medio.
- [ ] Dónde se guarda el registro y por cuánto tiempo.
- [ ] Cómo se traspasa una alarma abierta entre turnos.
- [ ] Cada cuánto se revisa el registro de alarmas del mes (sección 13).

## 12. Lista de verificación del turno
- [ ] Sé qué regla se violó y en qué nivel.
- [ ] Detuve la liberación del examen afectado si es una regla de rechazo.
- [ ] Revisé las causas de la lista, de la más barata a la más cara.
- [ ] Repetí el control **una vez** con material nuevo, y registré el valor.
- [ ] Documenté la causa y la acción.
- [ ] Revisé los resultados informados desde el último control aceptable.
- [ ] Avisé a la jefatura si no se resolvió o si hubo resultados informados erróneos.
- [ ] El registro quedó completo y firmado.
- [ ] Si el problema sigue abierto al terminar el turno, lo dejé escrito y se lo dije al siguiente turno.

## 13. Revisión mensual: aprender de las alarmas
Una alarma resuelta se olvida; un patrón de alarmas enseña. Una vez al mes, con el Anexo A en la mano, responde:
1. **¿Cuántas alarmas de rechazo hubo y en qué exámenes?** Un examen que concentra la mayoría es el que hay que mirar.
2. **¿Qué causas se repiten?** (material, calibración, turno, equipo). Una causa repetida pide un cambio de procedimiento, no más vigilancia.
3. **¿Cuántas veces se repitió el control más de una vez, o se resolvió "sin causa"?** Cada caso sin causa es una pregunta abierta.
4. **¿Cuánto tardó en cerrarse cada alarma?** Y cuántos resultados salieron mientras tanto.
5. **¿Algún examen necesita cambiar de reglas** (sección 8) porque da demasiadas falsas alarmas o porque deja pasar errores?
6. **¿Los registros están completos y firmados?** Revisa una muestra.

Lo que decidas, anótalo con fecha y responsable. Eso es lo que una auditoría busca: que el laboratorio **aprende** de sus propias alarmas.

---

## Anexo A. Registro de alarmas del mes (copia y completa)
| Fecha | Examen | Equipo | Regla | Nivel | Tipo de error | Causa encontrada | Repeticiones | ¿Resultados informados? | Cierre (fecha) | Responsable |
|---|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | | |
| | | | | | | | | | | |
| | | | | | | | | | | |
| | | | | | | | | | | |
| | | | | | | | | | | |
| | | | | | | | | | | |

## Anexo B. Revisión de resultados informados (copia y completa)
Examen: ____________ · Último control aceptable: ____ (fecha y hora) · Alarma: ____ (fecha y hora) · Dirección y magnitud del error probable: ____________

| N.º | Identificador de muestra | Fecha y hora | Valor informado | Grupo (A/B/C/D) | Valor repetido | ¿Cambia la interpretación? | Aviso a clínico (quién y hora) | Revisó |
|---|---|---|---|---|---|---|---|---|
| | | | | | | | | |
| | | | | | | | | |
| | | | | | | | | |
| | | | | | | | | |
| | | | | | | | | |

Resumen: resultados informados en el lapso: ____ · revisados: ____ · cambiaron de categoría: ____ · avisos realizados: ____ · decisión de cierre y firma: ____________

## Anexo C. Traspaso de turno con alarma abierta
| Campo | Contenido |
|---|---|
| Examen y equipo | |
| Regla y hora de la alarma | |
| Estado del examen (detenido / reanudado con condiciones) | |
| Qué se revisó y qué falta | |
| Controles pendientes (hora, material) | |
| Resultados que quedan por revisar | |
| Quién entrega / quién recibe / hora | |

---
*Guía de redacción original de ConsensusLab. Las conductas aquí descritas son una base general: tu laboratorio debe tener su propio procedimiento aprobado, y manda sobre esta guía. Los casos y ejemplos son compuestos, no corresponden a un laboratorio ni a pacientes reales.*
