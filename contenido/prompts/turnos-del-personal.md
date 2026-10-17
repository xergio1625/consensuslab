---
titulo: "Proponer una programación de turnos"
categoria: equipo
resumen: "Arma una propuesta de turnos que cubra el servicio, respete descansos y distribuya la carga de forma equitativa."
herramientas: [turnos-y-programacion-del-personal]
actualizado: 2026-10-17
prompt: |
  Actúa como coordinador de personal de un laboratorio clínico que debe armar una programación de turnos.

  Periodo a programar: [MES O SEMANAS].
  Personal disponible: [CARGOS Y CANTIDAD, SIN NOMBRES; INDICA RESTRICCIONES COMO «UNA PERSONA SOLO MAÑANA»].
  Cobertura mínima por turno: [CARGOS Y NÚMERO POR TURNO, INCLUIDOS NOCHES, FINES DE SEMANA Y FERIADOS].
  Reglas que debo respetar: [DESCANSO MÍNIMO, MÁXIMO DE TURNOS SEGUIDOS, HORAS SEMANALES, NORMATIVA LABORAL APLICABLE].
  Ausencias ya conocidas: [VACACIONES, LICENCIAS, PERMISOS].

  Entrega:
  1. La programación en una tabla (filas = días, columnas = turnos), usando códigos como P1, P2, P3.
  2. Un resumen de turnos, noches y fines de semana por persona para revisar la equidad.
  3. Los puntos donde no se logra la cobertura mínima o se tensan las reglas, con opciones para resolverlos.

  Reglas:
  - No inventes reglas laborales: usa solo las que te entregué y marca las dudas como «Verificar».
  - No uses nombres: usa códigos de persona.
---

## Cómo usarlo

1. Pide primero el resumen de brechas y luego la tabla, así ves si el problema tiene solución.
2. Cambia los códigos por los nombres en tu planilla, no en la IA.
3. Conversa la propuesta con el equipo antes de oficializarla.

## Revisa siempre

- Que se cumpla la normativa laboral vigente y los acuerdos de tu institución.
- Que cada turno tenga a alguien habilitado para las tareas críticas.
