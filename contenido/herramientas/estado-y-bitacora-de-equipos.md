---
titulo: "Estado y bitácora de equipos"
grupo: continuidad
jira: PP-71
estado: disponible
acceso: suscripcion
app_modulo: equipos
etiquetas: []
consensus_qc: "no"
que_es: "Registro de fallas, tiempo detenido, visitas técnicas, tickets al proveedor y tiempo de respuesta del servicio técnico."
problema: "Permite demostrar con datos cuánto tiempo estuvo detenido un equipo y cómo respondió el proveedor, útil para reclamos y renovación de contratos."
recurso_previsto: "Planilla de bitácora de equipos con cálculo de disponibilidad (%)."
relacionadas: [mantencion-preventiva-y-calibraciones, registro-de-temperaturas, plan-de-contingencia]
actualizado: 2026-10-21
---

## Cómo usarla

1. **Haz el inventario de equipos.** Registra cada analizador, centrífuga, cabina, microscopio y otro equipo cuya
   falla afecte la atención. Anota marca, modelo, número de serie y el contacto del servicio técnico (mesa de
   ayuda, correo o portal de tickets): cuando el equipo falle, estará a mano.
2. **Marca los equipos críticos.** Son los que, si se detienen, afectan exámenes urgentes o la continuidad del
   servicio. Su disponibilidad es el indicador principal del informe mensual.
3. **Define qué controles requiere cada equipo.** En la pestaña «Controles requeridos» marcas, equipo por equipo,
   si necesita registro de temperatura y rutinas de mantención diarias, semanales o mensuales. Los registros se hacen
   después en «Registro de temperaturas» y en «Mantención preventiva y calibraciones». Esta definición no cambia el
   equipo ni su vínculo con Consensus QC.
4. **Sigue el ciclo de vida del equipo.** Todo equipo nuevo parte «instalado», en período de prueba. Cuando empieza a
   usarse en el laboratorio, registra el **inicio de operación** con la fecha real: desde ahí se exigen sus registros.
   Después el estado cambia solo con lo que registras: una falla que lo detiene lo deja «detenido», una mantención
   ejecutada lo pasa por «en mantención» y dar de baja lo deja «retirado». Cada cambio queda con la fecha en que
   ocurrió, la fecha en que se registró, el motivo y quién lo hizo.
5. **Reporta la falla apenas ocurre.** Indica desde cuándo (si empezó antes de reportarla, la hora real), qué pasa y
   cómo quedó el equipo: **detenido** o **funcionando con limitaciones**. Solo el tiempo detenido descuenta
   disponibilidad. Con suscripción, si el equipo queda detenido, se avisa por correo a los administradores.
6. **Registra el seguimiento.** Anota el aviso al proveedor con su número de ticket, la visita técnica y lo que se
   va haciendo (por ejemplo, la activación del plan de contingencia). Cada paso queda con fecha, hora y quién lo
   registró.
7. **Cierra la falla cuando el equipo vuelve a operar.** Indica la hora y qué se hizo para resolverla: cambio de
   pieza, calibración, controles dentro de rango. Esa hora cierra el tiempo detenido.
8. **Si te equivocas, anula; no borres.** Un reporte o un paso erróneo se anula con el motivo y queda visible. Si
   anulas una resolución con la hora equivocada, la falla vuelve a quedar abierta para registrarla bien.
9. **Revisa la bitácora del mes.** Por cada equipo verás las fallas, el tiempo detenido, la disponibilidad y la
   mediana del tiempo de respuesta del proveedor, más el detalle de cada falla. Imprímela o guárdala en PDF.

## Cómo se calcula

- **Disponibilidad (%)** = 1 − tiempo detenido / tiempo controlado. Se cuentan las 24 horas del día, porque el
  laboratorio clínico suele operar todo el día. El control parte cuando se registra el equipo, o antes si se
  anota una falla anterior.
- **Tiempo de respuesta del proveedor**: desde el aviso hasta la primera visita técnica.
- **Tiempo de resolución**: desde el inicio de la falla hasta que el equipo vuelve a operar.

## Buenas prácticas

- **Pide siempre el número de ticket** y anótalo: es la evidencia para reclamar plazos de respuesta.
- **Compara la disponibilidad con lo que exige el contrato** o el comodato. Si el contrato no fija un tiempo de
  respuesta ni una disponibilidad mínima, pídelo en la próxima renovación.
- **Separa las fallas de las mantenciones programadas.** Las mantenciones preventivas se planifican aparte y no
  son fallas.
- **Relaciona cada falla con su impacto**: exámenes derivados, resultados atrasados, repeticiones. Si afectó
  resultados, abre una no conformidad.
- **Nunca escribas datos de pacientes** en las descripciones.

## Qué revisa un auditor

- Que cada equipo tenga su **historial de fallas e intervenciones** con fechas y responsables.
- Que cada equipo tenga su **historia de ciclo de vida** (instalación, inicio de operación, detenciones, mantenciones y
  retiro) y que se vea desde cuándo se le exigen sus registros.
- Que después de una reparación haya **evidencia de verificación** (calibración y controles) antes de volver a
  informar resultados.
- Que las correcciones sean **trazables** (sin registros eliminados).
- Que el laboratorio **evalúe al proveedor** con datos: tiempos de respuesta y disponibilidad.

## Gratis y con suscripción

- **Gratis:** esta guía. La herramienta en línea se prueba 15 días gratis con los datos de tu laboratorio, sin tarjeta.
- **Con suscripción:** la bitácora real de tus equipos, con varios usuarios, el ciclo de vida de cada equipo, la
  definición de controles requeridos, aviso por correo cuando un equipo queda detenido, bitácora mensual para imprimir
  y la disponibilidad en el informe mensual.
