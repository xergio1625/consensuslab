---
titulo: "Incertidumbre de medición en el laboratorio clínico, paso a paso"
fecha: 2026-11-13
resumen: "Qué es la incertidumbre de medición, en qué se diferencia del error, cómo estimarla de arriba hacia abajo con los datos que ya tienes (CV, sesgo y calibrador) y cómo interpretar y reportar el resultado."
temas: ["Incertidumbre de medición", "Control de calidad", "Acreditación"]
---

Todo resultado de laboratorio tiene una duda asociada: no sabemos exactamente qué tan lejos está del valor verdadero. La **incertidumbre de medición** pone un número a esa duda. La norma ISO 15189 pide estimarla, y por eso aparece en casi toda preparación para la acreditación. Pero estimarla no requiere un doctorado: existe un enfoque práctico que usa los datos que tu laboratorio ya genera con el control de calidad.

Esta guía explica qué es, cómo se calcula de forma simplificada y qué hacer con el resultado.

## 1. Qué es y en qué se diferencia del error

- **Error:** la diferencia entre tu resultado y el valor verdadero. Como el valor verdadero no se conoce, el error de un resultado concreto no se puede saber.
- **Incertidumbre:** un intervalo que expresa cuánto puede alejarse tu resultado del valor verdadero, con cierta confianza. Sí se puede estimar.

Dicho de otro modo: la incertidumbre dice «el valor está probablemente entre estos límites». En química clínica domina el enfoque de **error total** (sesgo + imprecisión) frente a un error total permitido; otros campos de la medición usan incertidumbre. Los dos enfoques se consideran hoy complementarios. Una diferencia técnica: el modelo de error total trata el sesgo como una constante, mientras que los métodos de incertidumbre consideran la incertidumbre del propio sesgo. Para elegir la meta de calidad contra la que se compara, mira [Error total permitido: cómo elegirlo](/guias/error-total-permitido-como-elegirlo/).

## 2. El enfoque «de arriba hacia abajo»

Hay dos maneras de estimar la incertidumbre:

- **De abajo hacia arriba:** se listan todas las fuentes de variación (pipeteo, temperatura, calibración…) y se combinan. Es exacta pero laboriosa.
- **De arriba hacia abajo:** se parte de datos globales que el laboratorio ya tiene (control de calidad de largo plazo, sesgo, información del calibrador). Es el enfoque simplificado y más común en laboratorio clínico, y es el que usa la calculadora de [Incertidumbre de medición](/calculadoras/incertidumbre-de-medicion/).

Las guías de referencia son la especificación técnica **ISO/TS 20914:2019** (guía práctica para laboratorios médicos) y el manual Nordtest TR 537. La calculadora usa una forma simplificada y común; la guía completa está en la norma.

## 3. Qué datos necesitas

Para cada examen y **cada nivel de concentración**:

1. **CV de largo plazo (imprecisión).** Sale de tu control de calidad interno acumulado durante meses. Puedes calcularlo con [Estadística del control](/calculadoras/estadistica-del-control/). Un CV de una sola corrida subestima la incertidumbre.
2. **Sesgo.** Su estimación sale del control externo o de una comparación con un valor asignado, como una media RMS de los sesgos observados en varias rondas.
3. **Incertidumbre del calibrador.** La entrega el fabricante, normalmente expandida con k = 2.

## 4. El cálculo

1. **Incertidumbre estándar del calibrador:** u(cal) = incertidumbre expandida del calibrador / k.
2. **Incertidumbre del sesgo:** u(sesgo) = √(RMS del sesgo² + u(cal)²).
3. **Incertidumbre estándar combinada:** uc = √(CV² + u(sesgo)²).
4. **Incertidumbre expandida:** U = k × uc. Con k = 2 se obtiene aproximadamente un 95 % de cobertura.

### Ejemplo

Para un examen con CV de largo plazo de 3 %, RMS del sesgo de 1 % y un calibrador con incertidumbre expandida de 2 % (k = 2):

1. u(cal) = 2 / 2 = 1 %
2. u(sesgo) = √(1² + 1²) = 1,41 %
3. uc = √(3² + 1,41²) = √11 = 3,32 %
4. U = 2 × 3,32 = **6,6 %**

Interpretación: si tu resultado es 100 mg/dL, el valor verdadero está probablemente entre 93,4 y 106,6 mg/dL. Lo mismo, repetido para el nivel bajo y el nivel alto de control.

## 5. Cómo usar el resultado

- **Compáralo con tu especificación de calidad.** Si U es mayor que lo que tu error total permitido admite, el método no cumple para ese uso clínico.
- **Si el sesgo es significativo, corrígelo.** Si no se corrige, se incluye en la incertidumbre, como en el cálculo anterior.
- **Revísala periódicamente.** Cambia con el lote de reactivo, el cambio de calibrador o del equipo.
- **Documenta el procedimiento** de estimación: qué datos usaste, de qué período y quién lo aprobó.
- **Entrégala cuando se solicite.** Quien usa el resultado puede pedirla; el laboratorio debe poder dársela.

## 6. Errores frecuentes

- Usar el CV de una sola corrida en vez del de largo plazo.
- Calcular un único valor para todo el rango, sin distinguir niveles.
- Olvidar la incertidumbre del calibrador.
- Confundir la incertidumbre estándar con la expandida (olvidar multiplicar por k).
- Calcularla una vez y no volver a revisarla.

## 7. Preguntas frecuentes

**¿Qué es la incertidumbre de medición?** Un intervalo que expresa cuánto puede alejarse un resultado del valor verdadero, con cierta confianza.

**¿Es lo mismo que el error total?** No. El error total suma sesgo e imprecisión y se compara con una meta; la incertidumbre combina las fuentes de variación, incluida la del sesgo, y entrega un intervalo.

**¿Qué CV debo usar?** El de largo plazo, calculado con el control de calidad acumulado. Uno de una sola corrida subestima la incertidumbre.

**¿Qué significa k?** El factor de cobertura. Normalmente k = 2, que da cerca de un 95 % de cobertura. La incertidumbre expandida es U = k × uc.

**¿Tengo que calcularla para todos los exámenes?** La norma pide estimarla; qué exámenes cubrir y con qué detalle lo define tu normativa y tu entidad acreditadora.

## Lista de verificación

- [ ] Tengo el CV de largo plazo de cada examen y nivel.
- [ ] Tengo una estimación del sesgo y la incertidumbre del calibrador.
- [ ] Calculé uc y U para cada nivel.
- [ ] Comparé U con mi error total permitido.
- [ ] El procedimiento está documentado y tiene fecha de revisión.

## Referencias

- ISO/TS 20914:2019. *Medical laboratories: Practical guidance for the estimation of measurement uncertainty*.
- Nordtest TR 537. *Handbook for calculation of measurement uncertainty in environmental laboratories*.
- Oosterhuis WP, Theodorsson E. Total error vs. measurement uncertainty: revolution or evolution? *Clin Chem Lab Med*. 2016;54(2):235-239. [doi:10.1515/cclm-2015-0997](https://doi.org/10.1515/cclm-2015-0997)

Esta guía es material educativo y no reemplaza la norma ISO/TS 20914, la normativa vigente ni el criterio de la jefatura del laboratorio.
