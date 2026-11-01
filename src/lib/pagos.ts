// Cobro automático: un solo lugar con los enlaces de pago de cada producto.
//
// Cómo se usa: se crea el producto en la pasarela (Flow, según el plan en privado/professional/plan-v0.1.md) y se pega
// aquí su enlace. Mientras un enlace esté vacío, el botón de ese producto no cambia: sigue mostrando el aviso de
// «disponible pronto» o la compra por correo. Cuando se pega el enlace y se publica, el botón pasa a «Pagar» solo.
// Nada de esto contiene claves secretas: los enlaces de pago son públicos por diseño.
//
// Lo que NO vive aquí (va en la app, porque necesita claves y base de datos): confirmar el pago (webhook), emitir
// la boleta, entregar la guía y activar el derecho anual de Professional. Ver privado/sitio/plan-pagos.md.

export type ProductoPago = 'professional-anual' | 'guia-verificar-un-metodo' | 'guia-el-control-se-salio';

export interface DatosPago {
  /** Nombre que verá quien paga (el mismo que se escribe al crear el enlace en la pasarela). */
  nombre: string;
  /** Pesos chilenos con IVA incluido; debe coincidir con el monto del enlace. */
  precio: number;
  /** Enlace de pago de la pasarela. Vacío = todavía no creado. */
  enlace: string;
}

export const PAGOS: Record<ProductoPago, DatosPago> = {
  'professional-anual': { nombre: 'ConsensusLab Professional · anualidad', precio: 23900, enlace: '' },
  'guia-verificar-un-metodo': { nombre: 'Guía: verifica un método cuantitativo', precio: 2900, enlace: '' },
  'guia-el-control-se-salio': { nombre: 'Guía: el control se salió', precio: 2900, enlace: '' },
};

/** Enlace de pago del producto, o undefined si aún no está creado (o no es una dirección https). */
export function enlacePago(id: ProductoPago): string | undefined {
  const e = PAGOS[id].enlace.trim();
  return /^https:\/\//.test(e) ? e : undefined;
}

/** Enlace de pago de una guía por su id de GUIAS_PAGO (src/lib/guias_pago.ts). */
export function enlacePagoGuia(idGuia: string): string | undefined {
  const id = `guia-${idGuia}` as ProductoPago;
  return id in PAGOS ? enlacePago(id) : undefined;
}
