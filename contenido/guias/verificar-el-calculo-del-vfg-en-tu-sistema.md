---
titulo: "Cómo verificar que tu sistema calcula bien el VFG (CKD-EPI 2021)"
fecha: 2026-11-13
resumen: "Casos de prueba con resultado esperado, qué revisar en el LIS o el analizador (ecuación, unidades, sexo, edad y redondeo), cómo saber si sigue usando CKD-EPI 2009 y cómo dejar la verificación documentada para una auditoría."
temas: ["Resultados calculados", "VFG", "Verificación"]
---

Muchos laboratorios informan el **filtrado glomerular estimado (VFG o eGFR)** junto a la creatinina. Pero ese número no lo mide el analizador: lo **calcula el sistema** (el analizador, el LIS o un middleware) con una ecuación que alguien configuró. Si esa configuración está mal, el error se repite en todos los resultados, y ningún control de calidad de la creatinina lo detecta, porque la creatinina medida puede estar perfecta.

Esta guía te muestra cómo verificarlo en una tarde: qué ecuación usa tu sistema, cómo probarlo con casos conocidos y cómo dejar la evidencia lista para una auditoría o acreditación.

## 1. Por qué verificar un resultado calculado

- La ecuación **CKD-EPI 2021** reemplazó a la de 2009 porque ya no incluye un coeficiente de raza. Si tu sistema se configuró antes, puede seguir usando la de 2009.
- Una fórmula puede estar bien escrita pero mal parametrizada: unidades equivocadas, sexo invertido, edad redondeada de otra forma.
- Un cambio de versión del LIS o del analizador puede modificar el cálculo sin que nadie lo note.

Verificar es comprobar que, con los mismos datos de entrada, **tu sistema entrega lo mismo que la ecuación publicada**, salvo diferencias de redondeo.

## 2. La ecuación que debes tener como referencia

CKD-EPI 2021 con creatinina (adultos):

**eGFRcr = 142 × mín(Scr/κ, 1)^α × máx(Scr/κ, 1)^−1,200 × 0,9938^edad × 1,012 [si es mujer]**

- **Scr:** creatinina sérica en **mg/dL** (si tu sistema trabaja en µmol/L, se divide por 88,4).
- **κ** = 0,7 (mujer) o 0,9 (hombre).
- **α** = −0,241 (mujer) o −0,302 (hombre).
- Resultado en mL/min/1,73 m².

Publicada por Inker y colaboradores en 2021 (referencia al final) y recomendada por las guías KDIGO. Puedes comparar tus cifras con la calculadora [Filtrado glomerular CKD-EPI 2021](/calculadoras/filtrado-glomerular-ckd-epi/).

## 3. Casos de prueba

Ingresa estos valores en tu sistema (en un entorno de pruebas si lo tienes, o con datos ficticios) y compara. La diferencia con el esperado debe ser solo de redondeo.

### Casos básicos (verificados con las pruebas automáticas del sitio)

| Creatinina (mg/dL) | Edad | Sexo | eGFR esperado (2021) |
|---|---|---|---|
| 1,0 | 50 | Hombre | 91,7 |
| 0,6 | 30 | Mujer | 123,8 |
| 1,5 | 70 | Mujer | 37,3 |
| 2,4 | 65 | Hombre | 29,2 |

### Casos de borde (calculados con la misma ecuación)

Sirven para detectar errores de parametrización que los casos centrales no muestran:

| Creatinina (mg/dL) | Edad | Sexo | eGFR esperado (2021) | Qué prueba |
|---|---|---|---|---|
| 0,7 | 40 | Mujer | 112,1 | Creatinina exactamente en κ de la mujer |
| 0,9 | 40 | Hombre | 110,7 | Creatinina exactamente en κ del hombre |
| 0,5 | 18 | Mujer | 139,3 | Edad mínima del rango adulto y creatinina baja |
| 5,0 | 80 | Hombre | 11,0 | Creatinina alta y edad avanzada |

Si tu sistema tiene topes de presentación (por ejemplo, informar «>90» en vez del número), verifica también que esos topes no oculten valores en los que el médico decide.

## 4. Cómo saber si tu sistema sigue en CKD-EPI 2009

Compara los mismos casos con la ecuación de 2009 (para personas no clasificadas como raza negra):

| Creatinina (mg/dL) | Edad | Sexo | CKD-EPI 2021 | CKD-EPI 2009 |
|---|---|---|---|---|
| 1,0 | 50 | Hombre | 91,7 | 87,4 |
| 0,6 | 30 | Mujer | 123,8 | 122,3 |
| 1,5 | 70 | Mujer | 37,3 | 34,9 |
| 2,4 | 65 | Hombre | 29,2 | 27,3 |

Las diferencias son pequeñas en cada caso, pero sistemáticas, y pueden mover a un paciente de una categoría a otra cerca de los puntos de corte. Si los números de tu sistema se parecen más a la columna de 2009, es probable que siga usando esa ecuación.

La ecuación de 2009 incorpora un coeficiente de raza que ya no se recomienda; solo tiene sentido como comparación con informes históricos o con sistemas no actualizados.

## 5. Qué revisar cuando un caso no coincide

1. **Unidades.** ¿El sistema usa mg/dL o µmol/L? Un error de unidades da resultados enormemente distintos.
2. **Sexo.** Que la codificación no esté invertida. Prueba el mismo caso con ambos sexos.
3. **Edad.** ¿Se calcula con años cumplidos? ¿Con decimales? ¿Desde qué fecha?
4. **Ecuación y coeficientes.** Pide al proveedor la documentación de la fórmula implementada: versión, κ, α y exponentes.
5. **Redondeo.** ¿Cuántos decimales usa en los pasos intermedios y en el resultado informado?
6. **Trazabilidad de la creatinina.** La estimación pierde validez si el método de creatinina no tiene trazabilidad IDMS. En el método de Jaffe, además, interfieren cetonas y algunas cefalosporinas.
7. **Condiciones de aplicación.** La ecuación es para adultos (18 años o más) con creatinina en estado estable. En menores de edad se usan ecuaciones pediátricas, y no corresponde en diálisis ni en embarazo. Revisa que el sistema no calcule en esos casos o que el informe lo advierta.

## 6. Dejar la verificación documentada

Para una auditoría o acreditación, vale lo que puedes demostrar. Deja por escrito:

- Fecha de la verificación y quién la hizo.
- Sistema, versión del LIS o analizador y ecuación declarada.
- Casos probados, resultado esperado, resultado obtenido y diferencia.
- Conclusión (conforme o no conforme) y, si no lo es, la acción correctiva y la verificación posterior.
- Cuándo se repetirá (por ejemplo, tras cada actualización del sistema).

Si ese registro vive en un documento controlado, con versión y fecha, es más fácil demostrarlo. La ficha [Control documental](/herramientas/control-documental/) describe cómo ordenarlo, y si encuentras una diferencia, regístrala como [no conformidad](/herramientas/no-conformidades-y-acciones-correctivas/). Lo mismo aplica a otros resultados calculados, como el [LDL calculado](/calculadoras/ldl-calculado/), que también trae casos de prueba para tu sistema.

## 7. Preguntas frecuentes

**¿Qué ecuación se recomienda hoy para informar el VFG en adultos?** CKD-EPI 2021 con creatinina, sin coeficiente de raza, recomendada por las guías KDIGO.

**¿Cuánta diferencia es aceptable al comparar mi sistema con la ecuación?** Solo de redondeo. Si la diferencia es mayor, hay un problema de configuración.

**¿Mi sistema puede seguir usando CKD-EPI 2009?** Puede, si no se actualizó. Esa ecuación incluye un coeficiente de raza que ya no se recomienda y se usa solo para comparar con informes históricos.

**¿Hay que verificar el VFG si el control de la creatinina está bien?** Sí. El control de la creatinina mide el analizador; el VFG es un cálculo posterior que el control no revisa.

**¿Cada cuánto conviene repetir la verificación?** Tras cualquier cambio de versión o configuración del sistema, y de forma periódica según tu procedimiento.

## Lista de verificación

- [ ] Sé qué ecuación y qué versión usa mi sistema, y tengo la documentación del proveedor.
- [ ] Probé los 4 casos básicos y los 4 de borde, y las diferencias son solo de redondeo.
- [ ] Probé ambos sexos y revisé unidades, edad y redondeo.
- [ ] Verifiqué los topes de presentación del resultado.
- [ ] La creatinina tiene trazabilidad IDMS.
- [ ] El sistema no informa VFG en menores de 18 años, ni en diálisis, o lo advierte.
- [ ] La verificación quedó documentada, con fecha y responsable.

## Referencias

- Inker LA, et al. New creatinine- and cystatin C–based equations to estimate GFR without race. *N Engl J Med*. 2021;385:1737-1749.
- Levey AS, et al. A new equation to estimate glomerular filtration rate. *Ann Intern Med*. 2009;150:604-612.
- KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of CKD. *Kidney Int*. 2024;105(4S):S117-S314.

Esta guía es material educativo y no reemplaza la documentación del proveedor de tu sistema, la normativa vigente ni el juicio del médico tratante.
