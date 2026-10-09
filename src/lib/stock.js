// Fórmulas de la calculadora de stock y punto de pedido. Funciones puras (se prueban con `npm test`).
// Las cantidades van en la unidad en que se cuenta el insumo (kits, cajas, unidades) y los plazos, en días.

/**
 * Punto de pedido y stock de seguridad de un insumo.
 * - Stock de seguridad: lo que falta para cubrir un consumo `picoPct` % mayor y `margenDias` de retraso del
 *   proveedor, además del consumo normal durante el plazo.
 * - Punto de pedido: consumo durante el plazo de entrega + stock de seguridad.
 * - Cantidad por pedido: consumo del ciclo de compra, redondeada hacia arriba al múltiplo del envase.
 * - Con `stockActual` y `vidaUtilDias` opcionales indica si pedir ya y si el stock máximo alcanzaría a vencer.
 */
export function puntoDePedido({
  consumoMes,
  diasMes = 30,
  plazoDias,
  margenDias = 0,
  picoPct = 0,
  cicloDias = NaN,
  unidadesEnvase = 1,
  stockActual = NaN,
  vidaUtilDias = NaN,
}) {
  if (!(consumoMes > 0) || !(diasMes > 0) || !(plazoDias >= 0) || !(unidadesEnvase > 0)) return null;
  const consumoDia = consumoMes / diasMes;
  const consumoPlazo = consumoDia * plazoDias;
  const seguridad = consumoDia * (1 + picoPct / 100) * (plazoDias + margenDias) - consumoPlazo;
  const puntoPedido = consumoPlazo + seguridad;
  const conCiclo = cicloDias > 0;
  const envases = conCiclo ? Math.ceil((consumoDia * cicloDias) / unidadesEnvase - 1e-9) : NaN;
  const cantidad = conCiclo ? envases * unidadesEnvase : NaN;
  const stockMaximo = conCiclo ? seguridad + cantidad : NaN;
  const conStock = Number.isFinite(stockActual) && stockActual >= 0;
  let estado = null;
  if (conStock) estado = stockActual < consumoPlazo ? 'urgente' : stockActual <= puntoPedido ? 'pedir' : 'ok';
  return {
    consumoDia,
    consumoPlazo,
    seguridad,
    puntoPedido,
    envases,
    cantidad,
    stockMaximo,
    coberturaMaxDias: conCiclo ? stockMaximo / consumoDia : NaN,
    coberturaDias: conStock ? stockActual / consumoDia : NaN,
    diasHastaPedir: conStock ? (stockActual - puntoPedido) / consumoDia : NaN,
    estado,
    // El stock máximo tardaría más en consumirse que lo que dura el producto.
    riesgoVencimiento: conCiclo && vidaUtilDias > 0 ? stockMaximo / consumoDia > vidaUtilDias : false,
  };
}
