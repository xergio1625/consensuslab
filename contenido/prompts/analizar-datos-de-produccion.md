---
titulo: "Analizar datos de producción o consumo"
categoria: planillas
resumen: "Encuentra tendencias, picos y datos anómalos en una tabla resumida de producción, consumo o tiempos de respuesta."
herramientas: [produccion-y-estadistica-de-examenes, tiempos-de-respuesta-tat, costeo-por-examen]
actualizado: 2026-09-28
prompt: |
  Actúa como analista de gestión de un laboratorio clínico.

  Esta es una tabla resumida (sin datos de pacientes) de [PRODUCCIÓN, CONSUMO DE REACTIVOS O TIEMPOS DE RESPUESTA] por [MES, SEMANA O DÍA]:
  [PEGA LA TABLA RESUMIDA, POR EJEMPLO: MES, EXAMEN, CANTIDAD]

  Pregunta que quiero responder: [POR EJEMPLO, SI EL AUMENTO DE CONSUMO DE REACTIVO DE GLUCOSA SE EXPLICA POR LA PRODUCCIÓN].

  Responde:
  1. Las 3 observaciones más relevantes (tendencias, estacionalidad, picos o caídas), con las cifras que las respaldan.
  2. Datos que parezcan anómalos o errores de registro.
  3. Posibles explicaciones, marcando cuáles son hipótesis que debo verificar.
  4. Qué gráfico usarías para presentarlo y por qué.

  Haz los cálculos paso a paso para que pueda revisarlos. Si la tabla no alcanza para responder, dime qué dato falta.
---

## Cómo usarlo

1. Pega solo tablas resumidas (totales por período y examen), nunca listados con datos de pacientes.
2. Revisa los cálculos: la IA puede equivocarse al sumar o sacar porcentajes.
3. Usa las hipótesis como punto de partida para conversar con el equipo.

## Revisa siempre

- Las cifras, recalculándolas en tu planilla.
- Que las conclusiones no confundan coincidencia con causa.
