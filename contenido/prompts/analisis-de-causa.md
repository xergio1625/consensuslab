---
titulo: "Análisis de causa de una no conformidad"
categoria: calidad
resumen: "Guía un análisis de causa con 5 porqués e Ishikawa para llegar a la causa raíz y no quedarse en el síntoma."
herramientas: [no-conformidades-y-acciones-correctivas, gestion-de-riesgos]
actualizado: 2026-09-28
prompt: |
  Actúa como facilitador de análisis de causa raíz en un laboratorio clínico.

  Esta es la no conformidad:
  - Qué pasó: [DESCRIPCIÓN DEL HECHO, SIN DATOS DE PACIENTES]
  - Dónde y cuándo: [ÁREA Y FECHA APROXIMADA]
  - Cómo se detectó: [QUIÉN O QUÉ LA DETECTÓ, SIN NOMBRES]
  - Qué se hizo de inmediato: [CORRECCIÓN INMEDIATA]

  Haz el análisis en tres partes:
  1. Diagrama de Ishikawa en texto, con posibles causas en las 6 categorías: métodos, máquinas, materiales, mano de obra, medición y medio ambiente.
  2. Los 5 porqués aplicados a las 2 causas que parezcan más probables. Si te falta información para responder un porqué, hazme la pregunta en vez de suponer.
  3. La causa raíz más probable, explicando por qué es una causa del sistema (proceso, recurso, instrucción) y no un error individual.

  No culpes a personas: si una causa es «error humano», sigue preguntando qué del sistema permitió ese error.
---

## Cómo usarlo

1. Describe el hecho de forma objetiva: qué, dónde, cuándo y cómo se detectó.
2. Responde las preguntas que te haga la IA. El valor del análisis está en esa conversación.
3. Valida la causa raíz con el equipo que participa en el proceso antes de definir acciones.
4. Continúa con el prompt «Plan de acciones correctivas».

## Revisa siempre

- Que la causa raíz se apoye en hechos que puedas demostrar, no solo en lo que la IA dedujo.
- Que el análisis no apunte a una persona. Un auditor buscará causas del sistema.
