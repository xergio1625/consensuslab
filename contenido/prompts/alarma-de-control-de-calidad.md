---
titulo: "Interpretar una alarma de control de calidad"
categoria: control-de-calidad
resumen: "Ordena el razonamiento ante un control fuera de regla de Westgard: tipo de error, causas probables y pasos a seguir."
herramientas: [control-de-calidad-interno-y-externo]
actualizado: 2026-09-28
prompt: |
  Actúa como profesional de laboratorio clínico experto en control de calidad analítico (reglas de Westgard, gráficos de Levey-Jennings y métrica sigma).

  Analito: [ANALITO] en [EQUIPO O PLATAFORMA].
  Material de control: [NIVEL 1 Y NIVEL 2, CON MEDIA Y DE ESTABLECIDAS POR MI LABORATORIO].
  Últimos resultados de control (del más antiguo al más reciente), por nivel:
  [PEGA LOS VALORES DE CONTROL, SIN RESULTADOS DE PACIENTES]
  Regla que se activó: [POR EJEMPLO 2-2S O R-4S].
  Cambios recientes: [CALIBRACIÓN, NUEVO LOTE DE REACTIVO O CONTROL, MANTENCIÓN, NINGUNO].

  Responde:
  1. Qué tipo de error sugiere el patrón (aleatorio o sistemático) y por qué.
  2. Causas probables en orden de probabilidad, considerando los cambios recientes.
  3. Pasos de investigación en orden, del más simple al más complejo.
  4. Qué verificar antes de liberar resultados de pacientes de la corrida afectada.

  No me digas que repita el control hasta que caiga dentro de rango. Si con los datos no se puede concluir, dilo y pide lo que falta.
---

## Cómo usarlo

1. Copia los valores de control y la regla activada; nunca pegues resultados de pacientes.
2. Usa la respuesta como lista de verificación, no como decisión: la liberación de resultados es responsabilidad del profesional.
3. Registra la investigación y la acción tomada.

## Revisa siempre

- Que el análisis siga el procedimiento de control de calidad de tu laboratorio.
- La decisión sobre los resultados de pacientes de la corrida afectada. Es tuya, no de la IA.
