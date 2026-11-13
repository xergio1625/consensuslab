// Guías que se sugieren al final de cada artículo de opinión («Para profundizar»).
// Clave: id del artículo (nombre del .md sin extensión). Valor: ids de guías, en el orden en que se muestran.
// Los artículos que no están aquí no muestran el bloque. Los ids inexistentes se ignoran al compilar.
export const GUIAS_RELACIONADAS: Record<string, string[]> = {
  'consensos-despues-del-escandalo': ['error-total-permitido-como-elegirlo', 'reglas-de-westgard-cuales-usar-y-cuando'],
  'el-costo-de-medir-barato': ['error-total-permitido-como-elegirlo', 'reglas-de-westgard-cuales-usar-y-cuando', 'plan-de-control-interno-de-calidad'],
  'el-florero-roto-del-control-de-calidad': ['reglas-de-westgard-cuales-usar-y-cuando', 'plan-de-control-interno-de-calidad'],
  'el-n20-que-estrecho-las-graficas': ['reglas-de-westgard-cuales-usar-y-cuando', 'plan-de-control-interno-de-calidad', 'verificacion-de-metodos-precision-veracidad-comparacion'],
  'el-reactivo-de-teseo': ['verificacion-de-metodos-precision-veracidad-comparacion', 'error-total-permitido-como-elegirlo'],
  'el-reloj-parado-de-la-albumina': ['verificacion-de-metodos-precision-veracidad-comparacion', 'incertidumbre-de-medicion-paso-a-paso'],
  'la-sonda-que-llego-perfecta': ['verificacion-de-metodos-precision-veracidad-comparacion', 'control-de-calidad-externo-sesgo-y-sdi'],
  'los-tres-hermanos-del-control-de-calidad': ['reglas-de-westgard-cuales-usar-y-cuando', 'plan-de-control-interno-de-calidad'],
  'procalcitonina-ahorra-afuera-se-cobra-adentro': ['verificacion-de-metodos-precision-veracidad-comparacion', 'error-total-permitido-como-elegirlo'],
  'resultado-correcto-mal-comunicado': ['amef-laboratorio-clinico-gestion-de-riesgos'],
  'el-resultado-perfecto-que-llegaba-tarde': ['amef-laboratorio-clinico-gestion-de-riesgos'],
  'acaso-no-sabes-como-se-hace': ['verificacion-de-metodos-precision-veracidad-comparacion'],
  'la-calidad-no-es-un-titulo-lo-que-denken-le-ensena-al-laboratorio-clinico': ['acreditacion-laboratorio-clinico-chile', 'plan-de-control-interno-de-calidad'],
  'calidad-en-salud-el-caso-de-clinica-las-condes': ['acreditacion-laboratorio-clinico-chile'],
};
