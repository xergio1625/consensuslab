---
titulo: "Verifica un método cuantitativo sin perder una semana"
fecha: 2026-11-13
resumen: "Guía práctica de verificación de precisión y veracidad con el diseño 5 × 5 (tipo CLSI EP15): qué preparar, el plan de cinco días, cómo calcular y comparar con el fabricante, ejemplos resueltos, qué hacer si no cumple y cómo documentarlo."
temas: ["Verificación de métodos", "Control de calidad"]
---

> Esta guía es libre. La **planilla de Excel con su manual** (cálculo automático, registro para imprimir e informe para firmar) se vende aparte; consulta en [Guías y planillas](/guias/#planillas).

## Qué vas a lograr
Al terminar tendrás, en cinco días de trabajo, un **informe de verificación** con la precisión y el sesgo de tu método comparados con lo que declara el fabricante y con tu propio requisito de calidad, listo para el archivo del laboratorio y para una auditoría. La guía te da el diseño, el criterio, qué hacer si no cumple y cómo dejarlo documentado.

Puedes hacer el cálculo con la calculadora gratuita [Verificación de precisión (5 × 5)](/calculadoras/verificacion-de-precision/), o con la **planilla de Excel de ConsensusLab** (de pago, con su manual): suma lo que una calculadora no entrega, que es el registro a mano, el control interno de cada día, el sesgo con tu criterio, el error total, el sigma y el informe para firmar. Para el panorama general de la verificación, mira también [Verificación de métodos en el laboratorio clínico](/guias/verificacion-de-metodos-precision-veracidad-comparacion/).

## 1. Cómo hacer el cálculo
Tienes tres caminos, del más simple al más completo:

- **A mano**, con la hoja de registro del Anexo A y las fórmulas de los apartados 8 a 10.
- **Con la calculadora gratuita** [Verificación de precisión (5 × 5)](/calculadoras/verificacion-de-precision/) y, para el sesgo, [Comparación con el fabricante](/calculadoras/comparacion-con-el-fabricante/).
- **Con la planilla de Excel de ConsensusLab** (de pago, con manual): calcula todo con fórmulas, trae el registro para imprimir y arma el informe para firmar. Cuando esta guía dice «hoja Encabezado», «hoja Datos» o «hoja Informe», se refiere a esa planilla; si no la usas, entiéndelo como tu propio registro y tu propio informe.

## 2. ¿Cuándo hay que verificar?
La norma ISO 15189 exige que el laboratorio confirme que puede lograr el desempeño declarado **antes** de usar un método para informar resultados de pacientes. En la práctica, verifica cuando:

- Incorporas un equipo o un método nuevo.
- Cambias de método o de principio de medición para un examen.
- Trasladas un equipo o haces una reparación mayor que pueda afectar el desempeño.
- Cambias algo de fondo (reactivo de otro fabricante, nuevo calibrador, nuevo software de cálculo) y tu criterio de calidad lo exige.

Si tienes dudas sobre un cambio menor, decide con la jefatura y **deja escrita la razón** de verificar o de no hacerlo. Revisa en tu versión de la norma la cláusula exacta que aplica.

## 3. Lo que necesitas antes de partir (lista de 10 minutos)
- [ ] El **inserto del fabricante** con el CV de repetibilidad y el CV intralaboratorio (a veces llamado precisión intermedia o total) para un nivel parecido al que vas a medir.
- [ ] **Dos materiales a concentraciones distintas**: uno cerca de una decisión clínica y otro en una zona alta o baja del rango. Si el fabricante declara por nivel, elige los más cercanos a los suyos.
- [ ] Para el sesgo: al menos un material con **valor asignado** (control de terceros, material de un programa de evaluación externa con valor de consenso, material de referencia certificado). Sin valor asignado puedes estimar el sesgo, pero el criterio es más débil.
- [ ] Equipo calibrado, mantención al día y control interno **dentro de rango** el primer día.
- [ ] Un **requisito de calidad escrito antes de medir**: el error total permitido (TEa) y su fuente. Sin él no hay criterio de aceptación; solo números.
- [ ] El material alcanza para 25 mediciones por nivel, bien conservado y sin descongelar más de lo que indica el fabricante.
- [ ] La hoja **Encabezado** de la planilla completa (esto es lo que fija tus criterios antes de ver los datos).

## 4. El diseño en una línea
**5 días × 5 réplicas × 2 niveles = 50 mediciones.** Cada día mides las 5 réplicas de cada nivel en una misma corrida, junto con la rutina. Los días deben ser distintos. Es el diseño habitual de la guía CLSI de verificación de precisión; confirma en la edición que uses si tu caso pide otra cantidad de días, réplicas o niveles.

**Ojo con la edición.** El diseño de 5 días × 5 réplicas corresponde a la edición EP15-A3 (2014). La edición anterior (EP15-A2) pedía menos réplicas por día, y muchos laboratorios y capacitaciones siguen trabajando con el esquema antiguo. Los cálculos no son intercambiables: con menos réplicas cambian los grados de libertad y los límites. Antes de empezar, revisa qué edición cita **tu procedimiento** y escribe en el informe cuál aplicaste. Si usas el esquema antiguo, la planilla de esta guía no calza tal cual (está fijada en 5 × 5).

Reglas simples que evitan repetir el estudio:
1. **Un solo operador no es obligatorio**, pero anota quién midió cada día.
2. **Las 5 réplicas se miden en la misma corrida.** Si tu equipo lo permite, intercálalas con muestras de rutina en vez de medirlas todas seguidas.
3. **Calibra y usa el mismo lote de reactivo** durante los cinco días. Si algo cambia a mitad (lote, calibración, mantención), anótalo: afecta la interpretación.
4. **Mide el control interno** cada día. Si el control sale fuera de rango, ese día no vale: corrige y repite el día completo.
5. **No descartes datos por «parecer raros».** Si sospechas un error (pipeteo, burbuja, muestra mal mezclada), anótalo y repite ese día completo. Los valores descartados deben quedar registrados con el motivo.

### Cuánto material necesitas
Para cada nivel: 25 mediciones × el volumen de muestra que consume cada determinación, más el volumen muerto de cada vial o copa, más un margen de seguridad (por ejemplo, 20 %). Por ejemplo, con un equipo que usa 5 µL por determinación y un volumen muerto de 50 µL por corrida: 25 × 5 µL = 125 µL, más 5 corridas × 50 µL = 250 µL, más 20 % de margen: unos 450 µL por nivel. Si el material es líquido y estable, alícuótalo el día 0 según lo que diga el fabricante sobre estabilidad, y rotula cada alícuota con el nivel, el lote y el día en que se usará.

## 5. El plan de los cinco días
Un calendario simple para que nada se te olvide.

| Cuándo | Qué haces |
|---|---|
| **Día 0 (preparación)** | Completa el Encabezado de la planilla. Imprime dos hojas de Registro_a_mano (una por nivel). Revisa el inserto, la calibración y la mantención. Prepara y rotula las alícuotas. Define quién mide cada día. |
| **Días 1 al 5** | Calibración y control interno de la rutina. Si el control sale fuera de rango, ese día no vale: corrige y repite. Mide las 5 réplicas de cada nivel en una misma corrida, intercaladas con la rutina. Anota **de inmediato** en la hoja a mano: fecha, operador, lote y las cinco réplicas. Marca si el control interno estuvo dentro de rango. Anota todo lo anormal. |
| **Día 6 (análisis)** | Transcribe los 50 datos a la hoja Datos. Revisa los mensajes de la planilla (ver el manual de la planilla, si la usas). Compara cada conclusión con tu criterio escrito. Imprime el Informe, firma con quien revisa y con la jefatura, y archiva con los datos crudos. |

Idealmente mide en horarios parecidos y con el mismo equipo de trabajo, pero no hace falta que sea el mismo operador: lo importante es dejar escrito quién fue.

## 6. Hoja de registro (cópiala y úsala)
Una hoja por nivel. La planilla trae una lista para imprimir (hoja Registro_a_mano) y al final de esta guía hay otra igual (Anexo A).

| Día | Fecha | Operador | Lote reactivo | Réplica 1 | Réplica 2 | Réplica 3 | Réplica 4 | Réplica 5 | Observaciones |
|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | | |
| 2 | | | | | | | | | |
| 3 | | | | | | | | | |
| 4 | | | | | | | | | |
| 5 | | | | | | | | | |

Encabezado de la hoja: examen y unidad · equipo y n.º de serie · método y reactivo (lote) · material (nombre, lote, nivel) · valor asignado y su incertidumbre (si existe) · requisito de calidad (TEa y fuente).

## 7. Si usas la planilla
El paso a paso de la planilla (colores, borrado de los datos de ejemplo, transcripción, mensajes y cierre con el informe) está en el **manual que viene con ella**. Si trabajas a mano o con la calculadora, sigue con el apartado 8.

## 8. Qué calcular
Para cada nivel, con los 25 resultados:

- **Media general** de las 25 mediciones.
- **Repetibilidad** (s_r): la variación entre réplicas dentro de un mismo día.
- **Precisión intralaboratorio** (s_wl): combina la repetibilidad con la variación entre días.
- Ambas expresadas como **CV %** (desviación estándar ÷ media × 100).

El método estándar es un **análisis de varianza (ANOVA) de un factor**, con el día como factor. Con D días y n réplicas por día:

- Cuadrado medio dentro de los días: CM_dentro. Entonces s_r² = CM_dentro.
- Cuadrado medio entre días: CM_entre. Entonces s_entre² = (CM_entre − CM_dentro) ÷ n (si da negativo, se toma 0).
- s_wl² = s_r² + s_entre².

La planilla lo resuelve en la hoja Cálculo, paso a paso y con cada fórmula explicada al costado. Lo importante es que **entiendas qué te dice cada número**: la repetibilidad es el ruido mínimo del método; la precisión intralaboratorio es lo que realmente vive tu paciente de un día a otro.

## 9. Comparar con el fabricante
**Si tu CV observado es menor o igual al declarado, está verificado.** No hay nada más que calcular.

**Si tu CV es mayor** que el declarado, no significa automáticamente que falle: con solo 25 datos hay azar. Para distinguir el azar de una falla real se usa un **límite superior de verificación**. La planilla y la calculadora de ConsensusLab lo calculan con esta fórmula, basada en la distribución χ²:

> Límite = CV declarado × √( χ²(confianza; gl) ÷ gl )

donde gl son los grados de libertad (20 en repetibilidad con 5 días × 5 réplicas; en la intralaboratorio son menos, porque se estiman con la aproximación de Satterthwaite). Si tu CV está **por debajo del límite**, la declaración del fabricante se considera verificada.

**Importante:** la edición EP15-A3 de CLSI resuelve lo mismo con **factores tabulados**, y los resultados pueden diferir algo de esta fórmula. Si tu acreditación o tu procedimiento exigen seguir la guía CLSI al pie de la letra, usa sus tablas y deja escrito cuál criterio aplicaste.

Un detalle que mucha gente pasa por alto: si verificas **dos niveles**, conviene repartir el riesgo de equivocarte entre ambos. La planilla lo hace con un reparto simple (97,5 % de confianza por nivel en vez de 95 %; 98,3 % para tres niveles). Es una práctica prudente, no una exigencia verificada de la norma: define tu criterio por escrito antes de medir.

## 10. Veracidad (sesgo)
- **Sesgo %** = (media observada − valor asignado) ÷ valor asignado × 100.
- Compáralo con un **criterio escrito antes de medir**. La planilla ofrece dos formas habituales:
  1. **Sesgo permitido**: tú defines una fracción del TEa (por ejemplo la mitad) y la justificas. Es el criterio por defecto.
  2. **Intervalo de verificación**: un intervalo alrededor del valor asignado que combina la incertidumbre del valor asignado con la de tu propia media. La planilla usa una **aproximación propia** (se explica en la hoja Notas); confirma el procedimiento exacto en la **edición vigente** de la guía CLSI que uses, porque los detalles pueden variar entre ediciones.
- Si el valor asignado proviene de un programa de pares y no de un material certificado, el criterio es menos exigente: indícalo en el origen del valor asignado.

La planilla calcula además el **error total estimado** (|sesgo %| + 1,65 × CV intralaboratorio) y la **métrica sigma** ((TEa − |sesgo %|) ÷ CV intralaboratorio).

## 11. Ejemplos resueltos (datos ilustrativos)
### Ejemplo A: todo cumple
Nivel único, concentración alrededor de 100 unidades. Declarado por el fabricante: CV repetibilidad 1,0 %; CV intralaboratorio 1,5 %. Valor asignado del material: 100,0 unidades. TEa del laboratorio: 8 %. Son los datos que trae la planilla de ejemplo (nivel 1).

| Día | R1 | R2 | R3 | R4 | R5 | Media del día |
|---|---|---|---|---|---|---|
| 1 | 100,2 | 99,1 | 101,0 | 100,4 | 99,6 | 100,06 |
| 2 | 101,3 | 100,5 | 100,9 | 101,8 | 100,2 | 100,94 |
| 3 | 99,4 | 100,1 | 99,0 | 99,8 | 100,3 | 99,72 |
| 4 | 100,8 | 101,2 | 100,0 | 100,6 | 101,1 | 100,74 |
| 5 | 99,9 | 100,7 | 100,2 | 99,5 | 100,4 | 100,14 |

Resultado del cálculo (ANOVA):
- Media general: **100,32**.
- Repetibilidad: s_r = 0,576 → **CV 0,57 %** (declarado 1,0 %: cumple).
- Intralaboratorio: s_wl = 0,722 → **CV 0,72 %** (declarado 1,5 %: cumple).
- Sesgo: (100,32 − 100,0) ÷ 100,0 = **+0,32 %** (permitido, con la mitad del TEa: 4 %: cumple).
- Error total estimado: |sesgo| + 1,65 × CV = 0,32 + 1,65 × 0,72 = **1,51 %** (TEa 8 %: cumple).
- Métrica sigma: (8 − 0,32) ÷ 0,72 = **10,7**.

**Decisión:** el método queda verificado para precisión y veracidad. El informe lo firma quien dirige el laboratorio.

### Ejemplo B: la repetibilidad cumple, pero la precisión intralaboratorio no
Nivel único, concentración alrededor de 50 unidades. Declarado: CV repetibilidad 1,0 %; CV intralaboratorio 1,5 %. Valor asignado: 50,0. TEa: 10 %. Sesgo permitido: la mitad del TEa (5 %).

| Día | R1 | R2 | R3 | R4 | R5 | Media del día |
|---|---|---|---|---|---|---|
| 1 | 50,1 | 50,3 | 49,9 | 50,2 | 50,0 | 50,10 |
| 2 | 52,9 | 52,7 | 53,1 | 52,8 | 53,0 | 52,90 |
| 3 | 48,6 | 48,8 | 48,4 | 48,7 | 48,5 | 48,60 |
| 4 | 51,7 | 51,5 | 51,9 | 51,6 | 51,8 | 51,70 |
| 5 | 50,3 | 50,5 | 50,1 | 50,4 | 50,2 | 50,30 |

Resultado del cálculo (con confianza de 95 %, porque es un solo nivel):
- Media general: **50,72**.
- Repetibilidad: s_r = 0,158 → **CV 0,31 %** (declarado 1,0 %, límite 1,25 %: cumple con holgura).
- Intralaboratorio: s_wl = 1,647 → **CV 3,25 %** (declarado 1,5 %, límite 2,30 %: **no cumple**).
- Sesgo: **+1,44 %** (permitido 5 %: cumple).
- Error total estimado: 1,44 + 1,65 × 3,25 = **6,80 %** (TEa 10 %: cumple).
- Métrica sigma: (10 − 1,44) ÷ 3,25 = **2,6**.

**Qué enseña este ejemplo:** dentro de cada día el método es muy estable, pero **entre días** cambia mucho (las medias del día van de 48,6 a 52,9). Eso apunta a algo que varía de un día a otro: calibración, ambiente, preparación del material, reactivo recién abierto. La planilla marca «NO VERIFICADO» frente a lo declarado, aunque el error total todavía cabría en el TEa del laboratorio. Decidir qué hacer es de la jefatura: puede corregir la causa y repetir el estudio, o aceptar el método con restricciones **dejando escrita la justificación** (por ejemplo, reforzar el control interno y calibrar con más frecuencia). Lo que no corresponde es informar «verificado» sin más.

## 12. Si no cumple
| Qué ves | Qué suele ser | Qué hacer |
|---|---|---|
| Repetibilidad alta (CV mayor que el límite) | Pipeteo, mezcla de la muestra, burbujas, temperatura, reactivo recién cambiado | Revisa la técnica y la mantención; repite el día completo |
| Repetibilidad buena, pero intralaboratorio alta | Calibración, lote, ambiente o deriva entre días (ejemplo B) | Revisa si cambió algo entre días; considera calibrar antes de cada día |
| Sesgo mayor que el permitido | Calibración, material de referencia, comparación con otro método | Verifica el calibrador y el material; consulta al fabricante |
| Cumple lo declarado, pero no tu requisito (error total mayor que el TEa) | El requisito del laboratorio es más exigente que el método | Decide con la jefatura: otro método, otro requisito justificado o uso con restricciones |
| Todo alto desde el primer día | Equipo sin mantención o instalación incorrecta | No uses el método para resultados de pacientes hasta resolver |

Si después de corregir **sigue sin cumplir**, el método no puede entrar en uso. Documenta lo hecho y consulta con el fabricante antes de repetir el estudio completo. Si decides usarlo con restricciones, deja escritas las restricciones, quién las aprobó y cuándo se revisan.

## 13. Cómo leer tus resultados
- **CV de repetibilidad:** el ruido mínimo del método en una misma corrida. Si es alto, mira la técnica y el equipo.
- **CV intralaboratorio:** lo que de verdad ve el paciente de un día a otro. Si es mucho mayor que el de repetibilidad, hay algo que cambia entre días.
- **Sesgo:** cuánto se aleja tu media del valor asignado. Un sesgo pequeño no te dice que el método sea bueno: depende también de la precisión y del requisito.
- **Error total estimado:** una forma de resumir sesgo y precisión en un solo número, para compararlo con el TEa.
- **Sigma:** cuántas desviaciones estándar caben entre tu sesgo y el límite del TEa. Como referencia habitual: 6 o más es clase mundial, 5 a 6 excelente, 4 a 5 bueno, 3 a 4 marginal y menos de 3 inaceptable. Un sigma bajo exige más control interno o mejorar el método (ver la guía [«El control se salió»](/guias/el-control-se-salio-que-hago/)).

## 14. Informe tipo (copia y completa)
La hoja Informe de la planilla arma la mayor parte; completa lo que falta.

1. **Identificación:** examen, método, equipo (marca, modelo, n.º de serie), reactivo y lote, fechas, personas.
2. **Motivo de la verificación.**
3. **Requisito de calidad** (TEa y su fuente) y criterios de aceptación definidos *antes* de medir.
4. **Materiales usados** (nombre, lote, niveles, valor asignado y su incertidumbre).
5. **Diseño** (5 × 5 × 2) y desviaciones del protocolo, si las hubo.
6. **Resultados:** tabla de datos, media, s_r, s_wl, CV, sesgo, error total y sigma por nivel.
7. **Comparación** con lo declarado y con el requisito del laboratorio.
8. **Conclusión:** verificado / no verificado / verificado con restricciones.
9. **Acciones** pendientes y fecha.
10. **Firmas:** quien ejecutó, quien revisó y la jefatura.

## 15. Para la auditoría o la acreditación
Una verificación solo sirve si se puede reconstruir. Archiva juntos, con fecha y firma:
- El informe firmado y la planilla con los datos (en papel y en archivo).
- Los registros a mano originales de los cinco días, con las observaciones.
- El inserto del fabricante con el CV declarado y la versión del documento.
- El certificado o la hoja del valor asignado de cada material, y su lote.
- El registro del control interno de los días del estudio.
- La razón escrita de cualquier dato repetido o descartado.
- El requisito de calidad (TEa) con su fuente y la fecha en que lo fijaste.

Quien audita suele buscar tres cosas: que el criterio estuviera escrito **antes** de medir, que los datos crudos existan y que la conclusión tenga una firma responsable. Esto no reemplaza lo que pida tu entidad acreditadora: revisa su estándar vigente.

## 16. Errores frecuentes
1. Definir el criterio de aceptación **después** de ver los datos.
2. Usar control interno como si fuera «valor asignado» sin decirlo.
3. Medir las cinco réplicas seguidas del mismo vial y llamar a eso «cinco días».
4. Cambiar el lote de reactivo en medio del estudio sin anotarlo.
5. Descartar un dato sin dejar registro del motivo.
6. Archivar solo los resultados finales y no los datos crudos.
7. Verificar un nivel solo y decir «verificado» para todo el rango.
8. Dejar los datos de ejemplo en la planilla, o mezclarlos con los tuyos.
9. Escribir los decimales con el separador equivocado y que Excel los tome como texto.
10. Sobrescribir una fórmula de la planilla en lugar de escribir en una celda amarilla.

## 17. Lista final de revisión (para dejarla firmada)
- [ ] TEa y criterios definidos y fechados antes de medir.
- [ ] Equipo calibrado y control interno aceptable cada día.
- [ ] Dos niveles, 5 días, 5 réplicas por día.
- [ ] Datos crudos archivados con el informe.
- [ ] Repetibilidad e intralaboratorio comparadas con el fabricante (con el límite si corresponde).
- [ ] Sesgo evaluado con un criterio escrito.
- [ ] Planilla sin datos de ejemplo y con todas las celdas amarillas necesarias completas.
- [ ] Informe firmado por la jefatura.
- [ ] Método incorporado al plan de control interno (reglas, frecuencia, niveles).

## 18. Preguntas frecuentes
**¿La planilla funciona sin macros?** Sí. Todo el cálculo son fórmulas de Excel. Las macros solo agregan cuatro botones de comodidad.

**¿Qué hago si mi Excel bloquea las macros?** Algunos laboratorios las bloquean por política de seguridad. Usa la planilla .xlsx: hace lo mismo, salvo los botones. Si quieres usar la .xlsm, ver el apartado 19.

**¿Y si tengo 3 niveles?** La planilla evalúa 1 o 2. Para tres, usa una copia por nivel y, en la hoja Encabezado de cada copia, escribe una confianza global de 0,983: así cada nivel se evalúa con 98,3 %, que es el reparto simple para tres niveles.

**¿Y si el fabricante no declara CV?** Sin un CV declarado no hay contra qué comparar la precisión: la planilla te lo avisa. Puedes comparar con tu propio requisito (por ejemplo, una fracción del TEa o la variabilidad biológica), pero define y anota el criterio **antes** de medir.

**¿Sirve para exámenes cualitativos?** No: es para métodos cuantitativos. Para controles cualitativos, el enfoque es otro.

**¿Puedo usar otros días o réplicas, por ejemplo 3 × 5?** La planilla está armada para 5 × 5. Si tu procedimiento pide otro diseño, adapta el estudio y el cálculo, y deja escrito el motivo.

**¿Por qué mi resultado difiere un poco de la guía CLSI?** Porque la guía CLSI usa factores tabulados y la planilla usa la fórmula χ². Si debes seguir CLSI al pie de la letra, usa sus tablas con los datos de la planilla (la hoja Cálculo te da todas las desviaciones y grados de libertad).

**¿Pierdo la validez si modifico la planilla?** Puedes adaptarla a tu laboratorio. Si cambias fórmulas, valídalas con el ejemplo y deja constancia.

## 19. Versión con macros
La planilla viene también en una versión con macros opcionales (cuatro botones de comodidad). Cómo activarlas y qué hacen está en el manual de la planilla.

## 20. Glosario
- **ANOVA:** análisis de varianza; aquí separa la variación dentro de cada día de la variación entre días.
- **CV (coeficiente de variación):** desviación estándar dividida por la media, en %.
- **Repetibilidad (s_r):** variación entre réplicas medidas en las mismas condiciones, en una misma corrida.
- **Precisión intralaboratorio (s_wl):** variación entre días en tu propio laboratorio; incluye la repetibilidad.
- **Veracidad (sesgo):** cercanía entre la media de tus mediciones y el valor asignado.
- **TEa:** error total permitido; el requisito de calidad del laboratorio para ese examen.
- **Valor asignado:** valor de referencia de un material, con su incertidumbre.
- **Límite de verificación:** valor sobre el cual el CV observado ya no se explica por el azar frente a lo declarado.
- **Sigma:** (TEa − |sesgo|) ÷ CV; cuántas desviaciones estándar caben entre tu sesgo y el límite del TEa.

## Anexo A. Hoja de registro para imprimir (un nivel)
Examen y unidad: ________________________  Equipo y n.º de serie: ________________________

Método y reactivo (lote): ________________________  Material (nombre, lote, nivel): ________________________

Valor asignado e incertidumbre: ________________________  TEa y fuente: ________________________

| Día | Fecha | Operador | Lote reactivo | Rép. 1 | Rép. 2 | Rép. 3 | Rép. 4 | Rép. 5 | Control interno OK (Sí/No) | Observaciones |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | | | |
| 2 | | | | | | | | | | |
| 3 | | | | | | | | | | |
| 4 | | | | | | | | | | |
| 5 | | | | | | | | | | |

Ejecutó: ______________________  Revisó: ______________________  Fecha: ______________

---
*Esta guía es de redacción original de ConsensusLab. Las guías CLSI y la norma ISO 15189 son documentos protegidos de sus respectivos titulares y no se reproducen aquí: consúltalos en su edición vigente.*
