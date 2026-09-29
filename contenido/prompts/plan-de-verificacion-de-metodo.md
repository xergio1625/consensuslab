---
titulo: "Plan de verificación de un método"
categoria: control-de-calidad
resumen: "Arma el plan para verificar un método o equipo nuevo antes de usarlo con pacientes: precisión, veracidad y criterios de aceptación."
herramientas: [control-de-calidad-interno-y-externo, mantencion-preventiva-y-calibraciones]
actualizado: 2026-09-28
prompt: |
  Actúa como tecnólogo médico experto en verificación y validación de métodos analíticos (documentos CLSI como EP15 y EP09, e ISO 15189).

  Voy a implementar: [ANALITO Y MÉTODO] en [EQUIPO NUEVO O EXISTENTE].
  Motivo: [EQUIPO NUEVO, CAMBIO DE MÉTODO, CAMBIO DE REACTIVO, TRASLADO DEL EQUIPO].
  Tengo disponible: [MATERIALES DE CONTROL, CALIBRADORES, MATERIAL DE REFERENCIA, EQUIPO ANTERIOR PARA COMPARAR].
  Requisito de calidad que uso: [ERROR TOTAL PERMITIDO Y SU FUENTE, POR EJEMPLO VARIABILIDAD BIOLÓGICA O CLIA].

  Propón un plan de verificación con:
  1. Qué parámetros verificar (precisión, veracidad o sesgo, comparación de métodos, linealidad o rango reportable, intervalo de referencia) y por qué aplica cada uno a mi caso.
  2. Para cada parámetro: diseño del experimento (número de niveles, réplicas y días), cálculos y criterio de aceptación.
  3. Qué hacer si un parámetro no cumple.
  4. Qué registros deben quedar como evidencia.

  Si un diseño depende de la versión de una guía CLSI, indícalo para que lo verifique. No inventes especificaciones del fabricante: márcalas como «dato del inserto».
---

## Cómo usarlo

1. Ten a mano el inserto del fabricante con sus declaraciones de precisión y veracidad.
2. Define antes tu requisito de calidad (error total permitido); sin él no hay criterio de aceptación.
3. Usa la respuesta como borrador del protocolo y apruébalo antes de empezar las mediciones.

## Revisa siempre

- Los diseños y cálculos contra la guía CLSI vigente.
- Que los criterios de aceptación sean los que exige tu acreditación.
