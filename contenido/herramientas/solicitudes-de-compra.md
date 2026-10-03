---
titulo: "Solicitudes de compra"
grupo: insumos
jira: PP-79
estado: disponible
acceso: suscripcion
app_modulo: compras
etiquetas: []
consensus_qc: "no"
que_es: "Solicitudes que parten del pedido sugerido del inventario, con aprobación, orden de compra verificada y recepción que suma al stock."
problema: "Elimina los pedidos de última hora y deja claro en qué estado está cada compra."
recurso_previsto: "Plantilla de solicitud de compra con flujo de estados (solicitada, aprobada, emitida, recibida)."
relacionadas: [inventario-y-lotes-de-reactivos, recepcion-de-insumos, evaluacion-de-proveedores]
actualizado: 2026-10-03
---

## Cómo usarla

1. **Crea la solicitud.** Si usas el inventario, parte del **pedido sugerido**: trae lo que está sin stock,
   bajo el mínimo o bajo el objetivo, con la cantidad calculada según el consumo. Puedes agregar otros
   artículos del inventario o cosas que no llevas en el inventario, escribiéndolas. Marca la prioridad y, si
   es urgente, explica por qué.
2. **Un administrador la aprueba o la rechaza.** Puede ajustar las cantidades (con un comentario) o dejar
   fuera una línea. En modo real, los administradores reciben un correo con cada solicitud nueva y quien la
   pidió recibe la decisión.
3. **Registra la orden de compra.** Número, proveedor, entrega comprometida y monto. La app verifica que la
   OC incluya todo lo aprobado: si falta algo, pide explicarlo.
4. **Registra lo que llega.** Las recepciones pueden ser parciales. Si usas también la recepción de insumos,
   el botón «Recibir con lista de chequeo» lleva a ella con la solicitud cargada. Lo que es del inventario entra
   directamente con su lote y vencimiento, y puedes dejarlo en cuarentena para verificarlo antes de usarlo.
5. **Cierra lo que no llegará.** Si el proveedor no entregará el saldo, cierra la solicitud con el motivo.
6. **Sigue las alertas.** Solicitudes por aprobar hace más de 2 días, aprobadas sin orden de compra hace más
   de 5 días y entregas atrasadas aparecen en el panel del día.

## Qué mejora frente a una planilla

- **Nada se pide dos veces**: lo aprobado y aún no recibido queda «en camino» y el pedido sugerido del
  inventario lo descuenta, igual que lo que está en cuarentena.
- **Trazabilidad completa**: quién pidió, quién aprobó, qué se ordenó y qué llegó, con fechas. Un error se
  corrige anulando el paso, con el motivo; si era una recepción, también se anulan sus ingresos al inventario.
- **Documento imprimible** de cada solicitud con firmas, y registro mensual con los tiempos de aprobación y de
  entrega.

## Indicadores

- **Días hasta aprobar** y **días hasta recibir** (mediana del mes).
- **Compras recibidas a tiempo**: completas en o antes de la entrega comprometida (meta: 90 % o más).
- **Compras con entrega atrasada al cierre** (meta: 0), también en el informe mensual.

## Buenas prácticas

- **Pide con tiempo**: si el pedido sugerido se revisa cada semana, las urgencias pasan a ser la excepción.
- **Registra la entrega comprometida** en cada OC: sin ella no se puede medir el cumplimiento del proveedor.
- **Recibe con la guía en la mano**: cantidades, lotes y vencimientos reales, no los de la OC.

## Gratis y con suscripción

- **Gratis:** esta guía y la demo en línea con datos ficticios, que se borran al salir.
- **Con suscripción:** tus solicitudes con aprobación, órdenes de compra, recepciones conectadas al inventario,
  avisos por correo e indicadores en el informe mensual.
