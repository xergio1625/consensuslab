---
titulo: "Inventario y lotes de reactivos"
grupo: insumos
jira: PP-78
estado: disponible
acceso: suscripcion
app_modulo: inventario
etiquetas: []
consensus_qc: "previsto"
que_es: "Stock por lote con mínimo, vencimientos, alertas de quiebre, reactivos en uso con su estabilidad y trazabilidad del lote usado cada día."
problema: "Evita suspender exámenes por falta de reactivo y pérdidas por vencimiento."
recurso_previsto: "Planilla de inventario con stock mínimo y alerta de vencimiento a 30/60 días."
relacionadas: [recepcion-de-insumos, solicitudes-de-compra, recordatorios-automaticos-de-vencimientos]
actualizado: 2026-10-03
---

## Cómo usarla

1. **Crea tus artículos.** Reactivos, controles, calibradores y consumibles, con la unidad en que los cuentas
   (kit, caja, frasco), dónde se guardan, el **stock mínimo** y, para lo que se abre, la **estabilidad en uso**
   en días según el inserto. Si el envase trae código de barras, escanéalo en la ficha del artículo.
2. **Registra el stock actual como ingreso**, lote por lote, con su vencimiento. Cada lote recibe un código
   corto y puedes imprimir **etiquetas con código de barras** (50 × 30 mm u otros tamaños).
3. **Deja en cuarentena lo que hay que verificar.** Un control o calibrador nuevo puede entrar en cuarentena:
   no se puede usar hasta que lo liberes, con el motivo.
4. **Registra cada salida a uso.** Con el lector de código de barras o eligiendo el artículo, la app propone
   el lote que **vence primero (FEFO)** y no deja usar un lote vencido, en cuarentena o bloqueado. El envase
   queda «en uso» en el área o equipo y la app avisa cuando se cumple su estabilidad. Al abrir uno nuevo,
   marca que reemplaza al anterior.
5. **Registra las pérdidas con su causa**: vencimiento, estabilidad vencida, falla de calidad, derrame o
   rotura. Así sabrás cuánto pierdes y por qué.
6. **Cuenta el inventario cada mes.** Imprime la planilla de conteo, cuenta en cada ubicación y registra las
   diferencias como «ajuste por conteo», con su explicación.
7. **Revisa las alertas y el pedido sugerido.** Las alertas también aparecen en el panel del día, y los
   indicadores en el informe mensual.

## Qué te avisa

- **Sin stock** (crítico) y **bajo el mínimo**.
- **Lotes vencidos con stock**, para darlos de baja, y **lotes por vencer** a 30 y 60 días.
- **Envases en uso con la estabilidad vencida** o por vencer.
- **Stock que vencerá antes de usarse**: con tu consumo real, la app proyecta cuánto de cada lote no
  alcanzarás a usar antes de su vencimiento, para que lo muevas o pidas menos.

## Cómo se calcula

- **Stock** de un lote = ingresos − salidas a uso − pérdidas ± ajustes. Nada se sobrescribe: un error se
  corrige anulando el movimiento, con tu nombre y el motivo.
- **Stock utilizable**: solo lotes disponibles y sin vencer.
- **Consumo mensual**: promedio de las salidas a uso de los últimos 90 días.
- **Pedido sugerido** = mínimo + consumo mensual × meses de cobertura − stock utilizable (descontando lo
  que vencerá sin usarse).
- **¿Qué lote estaba en uso?** Eliges un día y ves los lotes de reactivos, controles y calibradores abiertos
  en cada área o equipo: útil para investigar un control fuera de rango o un reclamo.

## Buenas prácticas

- **Registra la salida en el momento**, no al final del día: el stock y la trazabilidad dependen de eso.
- **Usa la estabilidad del inserto**, no la costumbre: un control abierto de más afecta tus resultados.
- **Verifica los lotes nuevos de controles y calibradores** antes de liberarlos.
- **Revisa las pérdidas por vencimiento cada mes**: si se repiten, baja el mínimo o los meses de cobertura.

## Gratis y con suscripción

- **Gratis:** esta guía y la demo en línea con datos ficticios, que se borran al salir.
- **Con suscripción:** tu inventario completo con movimientos trazables, etiquetas, pedido sugerido, alertas
  en el panel del día e indicadores en el informe mensual.
