---
titulo: "Revisión crítica de un procedimiento"
categoria: documentos
resumen: "Pide una revisión de un procedimiento vigente: pasos ambiguos, faltantes y requisitos que un auditor podría observar."
herramientas: [control-documental, auditorias-internas]
actualizado: 2026-09-28
prompt: |
  Actúa como auditor interno de un laboratorio clínico con experiencia en ISO 15189.

  Revisa el siguiente procedimiento de mi laboratorio: [CÓDIGO Y NOMBRE DEL PROCEDIMIENTO].

  [PEGA AQUÍ EL TEXTO DEL PROCEDIMIENTO, SIN DATOS DE PACIENTES NI NOMBRES DE PERSONAS]

  Entrega tu revisión en una tabla con estas columnas: sección, hallazgo, por qué importa, propuesta de redacción.
  Busca en particular:
  - pasos ambiguos (que dos personas podrían hacer de forma distinta);
  - responsables no definidos;
  - registros que se mencionan pero no se identifican, o que faltan;
  - qué hacer cuando algo sale mal (resultados fuera de rango, equipo detenido, insumo vencido);
  - contradicciones internas o términos usados con distinto significado.

  Al final, indica los 3 cambios más importantes en orden de prioridad.
  No reescribas el documento completo y no inventes requisitos normativos: si citas una norma, indica la cláusula y márcala para que yo la verifique.
---

## Cómo usarlo

1. Copia el texto del procedimiento, sin el encabezado con firmas ni nombres de personas.
2. Pega el prompt con el texto y revisa la tabla de hallazgos.
3. Lleva los cambios que aceptes a una nueva versión, con su registro en el control de cambios.

## Revisa siempre

- Las cláusulas normativas que cite la IA: a veces inventa números de cláusula o requisitos.
- Que los cambios propuestos sean factibles con los recursos de tu laboratorio.
