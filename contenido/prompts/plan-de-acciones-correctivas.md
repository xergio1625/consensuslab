---
titulo: "Plan de acciones correctivas"
categoria: calidad
resumen: "A partir de la causa raíz, arma un plan con acciones, responsables, plazos y cómo verificar que funcionó."
herramientas: [no-conformidades-y-acciones-correctivas]
actualizado: 2026-09-28
prompt: |
  Actúa como encargado de calidad de un laboratorio clínico.

  No conformidad: [DESCRIPCIÓN BREVE, SIN DATOS DE PACIENTES]
  Causa raíz identificada: [CAUSA RAÍZ]
  Recursos con que cuento: [POR EJEMPLO: SIN PRESUPUESTO ADICIONAL, 1 HORA SEMANAL DE CAPACITACIÓN]

  Propón un plan de acción en una tabla con estas columnas:
  acción, tipo (corrección, acción correctiva o acción preventiva), responsable (cargo, no nombre), plazo sugerido, evidencia que quedará y cómo verificar su eficacia.

  Reglas:
  - Cada acción debe atacar la causa raíz, no solo el síntoma.
  - La verificación de eficacia debe ser medible (un indicador, una auditoría o una revisión de registros) y tener fecha.
  - Prioriza acciones de sistema (cambiar un procedimiento, un formulario, una alerta) por sobre «recapacitar al personal».
  - Máximo 6 acciones. Si propones más, dime cuáles son esenciales.
---

## Cómo usarlo

1. Úsalo después del análisis de causa, con la causa raíz ya validada.
2. Ajusta responsables y plazos a tu realidad y regístralos en tu herramienta de no conformidades.
3. Agenda la verificación de eficacia. Es la parte que más se olvida y la que más revisa un auditor.

## Revisa siempre

- Que los plazos sean realistas: un plan que no se cumple genera una segunda no conformidad.
- Que la verificación de eficacia se pueda hacer con los registros que ya tienes.
