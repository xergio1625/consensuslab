---
titulo: "Contratos y comodatos"
grupo: insumos
jira: PP-82
estado: disponible
acceso: suscripcion
app_modulo: contratos
etiquetas: []
consensus_qc: "no"
que_es: "Registro de contratos con vencimientos, condiciones, consumos mínimos comprometidos y fechas de renovación."
problema: "Evita renovaciones automáticas desfavorables y multas por no cumplir consumos mínimos."
recurso_previsto: "Planilla de contratos con alerta de vencimiento y seguimiento del consumo comprometido."
relacionadas: [evaluacion-de-proveedores, recordatorios-automaticos-de-vencimientos, mantencion-preventiva-y-calibraciones]
actualizado: 2026-10-03
---

## Cómo usarla

1. **Registra cada contrato**: suministro de reactivos, comodato de equipos, servicio técnico, arriendo u otros
   servicios. Indica el proveedor, el inicio y el término, y **cómo se renueva**:
   - **automáticamente si no se avisa**: con cuántos meses se renueva y cuántos días antes hay que avisar para no
     renovar;
   - **solo por acuerdo expreso**, o **no se renueva**.
2. **Agrega los consumos mínimos comprometidos**: qué se comprometió (determinaciones, kits, montos), cuánto y por qué
   periodo (mensual, trimestral, semestral, anual o el total del contrato). Los periodos se cuentan desde el inicio
   del contrato. Si usas el inventario, el consumo se cuenta solo con lo recibido o lo usado de un artículo; si no, lo
   registras a mano (por ejemplo, las determinaciones del mes según el sistema del laboratorio).
3. **Asocia los equipos en comodato** y el plazo de respuesta del servicio técnico: la app calcula qué porcentaje de
   las fallas de esos equipos se atendió a tiempo en el último año.
4. **Sigue los avisos.**
   - **Decidir renovación**: 30 días antes del último día para avisar que no renuevas; en rojo los últimos 7 días.
   - **Por vencer**: contratos sin renovación automática que terminan pronto.
   - **Vencido**: pasó el término sin registrar la renovación ni el término (por ejemplo, un equipo en comodato que
     sigue en el laboratorio sin contrato vigente).
   - **Consumo en riesgo**: con el ritmo actual no se alcanzará el mínimo del periodo.
5. **Registra lo que pasa**: la renovación con su nuevo término, el aviso de no renovar, el término (retiro del equipo,
   cambio de proveedor) y notas de lo conversado. Nada se borra: los registros equivocados se anulan con el motivo.
6. **Imprime la planilla** de contratos vigentes y revisa las próximas fechas de los 12 meses siguientes.

## Cómo se calcula

- **Plazo para avisar** = término del periodo vigente − días de aviso del contrato. Si el contrato se renueva solo,
  la app extiende el término por cada periodo ya renovado hasta que registres el aviso de no renovar.
- **Avance del consumo** = consumido en el periodo ÷ mínimo comprometido.
- **Proyección** = consumido ÷ fracción del periodo transcurrida. Hay **riesgo** si, con al menos un 25 % del periodo
  transcurrido, la proyección no llega al 90 % del mínimo.
- Los periodos anteriores al primer registro no se evalúan, porque no tienen datos.

## Buenas prácticas

- **Anota el plazo de aviso real** del contrato: muchas renovaciones automáticas exigen avisar 60 a 90 días antes.
- **Revisa el consumo antes de negociar**: si no alcanzarás el mínimo, conversa con el proveedor antes del cierre del
  periodo y no después de la multa.
- **Usa la evaluación del proveedor al renovar**: la app muestra en cada contrato el resultado de su última
  evaluación.
- **Guarda el enlace al documento firmado** (por ejemplo, en Google Drive) para tener las condiciones a mano.

## Gratis y con suscripción

- **Gratis:** esta guía y la demo en línea con datos ficticios, que se borran al salir.
- **Con suscripción:** tus contratos con avisos de renovación, consumo comprometido medido con el inventario,
  cumplimiento del servicio técnico con la bitácora de equipos, planilla imprimible, plazos en el resumen semanal de
  vencimientos e indicadores en el informe mensual.
