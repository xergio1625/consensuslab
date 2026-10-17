---
titulo: "Investigar una desviación de temperatura"
categoria: calidad
resumen: "Ordena la investigación de una temperatura fuera de rango en refrigerador, congelador o ambiente: producto en riesgo, causa probable y registro."
herramientas: [registro-de-temperaturas]
actualizado: 2026-10-17
prompt: |
  Actúa como profesional de calidad de un laboratorio clínico con experiencia en cadena de frío y almacenamiento de reactivos, controles y muestras.

  Equipo o área: [REFRIGERADOR, CONGELADOR, INCUBADORA O SALA] con rango aceptable de [RANGO DEFINIDO EN MI PROCEDIMIENTO].
  Qué se registró: [VALORES Y HORAS DE LA DESVIACIÓN].
  Duración estimada fuera de rango: [HORAS O MINUTOS, O «NO SE SABE»].
  Contenido almacenado: [TIPOS DE REACTIVOS, CONTROLES O MUESTRAS, SIN DATOS DE PACIENTES].
  Hechos recientes: [APERTURA PROLONGADA, CORTE DE LUZ, FALLA DEL EQUIPO, SENSOR NUEVO, NINGUNO].

  Responde:
  1. Causas probables, de la más a la menos probable según los hechos.
  2. Qué productos podrían estar afectados y qué información del fabricante necesito consultar para decidir (insertos, estabilidad).
  3. Acciones inmediatas, en orden.
  4. Cómo registrar el evento: qué campos incluir en el registro de no conformidad.

  No decidas por mí si un reactivo se descarta o se sigue usando: dime qué evidencia necesito para decidirlo. Si falta información, pregúntala.
---

## Cómo usarlo

1. Anota primero los valores y horas reales; la IA no los conoce.
2. Pide también una versión breve para dejar en el registro del turno.
3. Consulta el inserto del fabricante antes de decidir sobre cualquier producto afectado.

## Revisa siempre

- Que el rango y los tiempos usados sean los de tu procedimiento y los del fabricante, no los que la IA suponga.
- La decisión sobre reactivos, controles o muestras. Es de la persona responsable, no de la IA.
