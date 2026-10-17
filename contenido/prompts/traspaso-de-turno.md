---
titulo: "Resumen de traspaso de turno"
categoria: coordinacion
resumen: "Convierte las notas sueltas del turno en un traspaso ordenado: pendientes, incidentes, equipos y acciones para el turno que sigue."
herramientas: [libro-de-novedades-de-turno]
actualizado: 2026-10-17
prompt: |
  Actúa como jefe de turno de un laboratorio clínico que prepara un traspaso claro y breve.

  Turno que termina: [FECHA Y TURNO].
  Notas del turno (sin datos de pacientes):
  [PEGA TUS NOTAS TAL COMO LAS ANOTASTE]

  Entrega un traspaso con estas secciones, y omite las que no tengan contenido:
  1. Urgente para el próximo turno (máximo 3 puntos).
  2. Equipos: fallas, mantenciones pendientes, estado de calibraciones.
  3. Insumos: faltantes, vencimientos próximos, recepciones pendientes.
  4. Incidentes y no conformidades abiertas.
  5. Pendientes con responsable y hora límite.

  Reglas:
  - Una línea por punto, empezando con un verbo.
  - No inventes responsables ni horas: si no están en mis notas, escribe [COMPLETAR].
  - No incluyas nombres ni identificadores de pacientes; si aparecen en mis notas, reemplázalos por «paciente».
---

## Cómo usarlo

1. Pega las notas sin ordenar; ese es el punto de la herramienta.
2. Lee el resultado en voz alta al recibir el turno para confirmar que se entendió.
3. Guárdalo en el libro de novedades.

## Revisa siempre

- Que no se hayan perdido novedades críticas al resumir.
- Que ningún dato de paciente pase al libro de novedades.
