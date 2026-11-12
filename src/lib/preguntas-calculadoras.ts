// Respuesta corta y preguntas frecuentes de las calculadoras más citadas por las respuestas de IA de Google.
// La respuesta va arriba (lo primero que lee una persona o una IA) y las preguntas al final, con su dato estructurado FAQPage.
// Cada texto repite lo que la calculadora ya explica: no se agrega ninguna afirmación nueva.
import type { IdCalculadora } from './calculadoras';

export interface Pregunta {
  p: string;
  r: string;
}

export interface Respuestas {
  respuesta: string;
  preguntas: Pregunta[];
}

export const RESPUESTAS: Partial<Record<IdCalculadora, Respuestas>> = {
  'amef-npr': {
    respuesta:
      'El NPR (número de prioridad de riesgo) se calcula multiplicando tres notas de 1 a 10: severidad × ocurrencia × detección. Va de 1 a 1.000 y se atiende primero el más alto.',
    preguntas: [
      {
        p: '¿Cómo se calcula el NPR de un AMEF?',
        r: 'NPR = severidad (S) × ocurrencia (O) × detección (D), cada una de 1 a 10. Por ejemplo, severidad 8, ocurrencia 4 y detección 3 dan NPR 8 × 4 × 3 = 96.',
      },
      {
        p: '¿Qué significa cada escala de 1 a 10?',
        r: 'En severidad, 1 es sin efecto y 10 es daño grave o un resultado erróneo que llega al paciente. En ocurrencia, 1 es muy improbable y 10 casi seguro. En detección, 1 es que la falla se detecta siempre antes de causar daño y 10 que no se detecta.',
      },
      {
        p: '¿Desde qué NPR hay que actuar?',
        r: 'El umbral de 100 es una referencia habitual, no una regla: lo fija el procedimiento de gestión de riesgos de cada laboratorio.',
      },
      {
        p: '¿Qué límite tiene el NPR?',
        r: 'Combinaciones muy distintas dan el mismo número (S 9 × O 1 × D 2 = 18 y S 2 × O 3 × D 3 = 18). Por eso se atienden siempre los modos de severidad alta, aunque el NPR sea bajo.',
      },
      {
        p: '¿Qué se hace con los modos de falla prioritarios?',
        r: 'Para cada uno se define una acción, un responsable y una fecha, y se vuelve a calificar después de aplicarla para comprobar que el NPR bajó.',
      },
    ],
  },
  'cambio-critico-rcv': {
    respuesta:
      'El valor de referencia de cambio (RCV) indica cuánto debe cambiar un resultado seriado para que el cambio sea real y no variación analítica y biológica. Se calcula como RCV = √2 · Z · √(CVa² + CVi²), en %.',
    preguntas: [
      {
        p: '¿Cómo se calcula el RCV?',
        r: 'RCV = √2 · Z · √(CVa² + CVi²), en %, donde CVa es el CV analítico y CVi el CV biológico. El √2 aparece porque se comparan dos resultados, cada uno con su propia variación.',
      },
      {
        p: '¿Qué valor de Z se usa?',
        r: 'Para subida o bajada, Z = 1,96 con 95 % y Z = 2,58 con 99 %. Para un solo sentido, Z = 1,65 con 95 % y Z = 2,33 con 99 %.',
      },
      {
        p: '¿Cuándo un cambio entre dos resultados es real?',
        r: 'Si supera el RCV, es poco probable que se deba solo al azar analítico y biológico.',
      },
      {
        p: '¿Mejorar un método preciso cambia mucho el RCV?',
        r: 'Poco: con CVa bajo, el RCV queda dominado por la variación biológica.',
      },
      {
        p: '¿Esta fórmula sirve con CV grandes?',
        r: 'Esta versión simétrica funciona bien con CV pequeños. Con CV grandes, la literatura propone una versión asimétrica (logarítmica) porque la subida y la bajada no son simétricas.',
      },
    ],
  },
  'temperatura-cinetica-media': {
    respuesta:
      'La temperatura cinética media (MKT) es la temperatura constante que produciría la misma degradación que todas las temperaturas de tu registro. Siempre es igual o mayor que el promedio, porque las temperaturas altas degradan más de lo que las bajas compensan.',
    preguntas: [
      {
        p: '¿Qué es la temperatura cinética media (MKT)?',
        r: 'Es la temperatura única que equivale, en degradación, a todas las temperaturas registradas en un período. Se usa para evaluar el almacenamiento y el transporte de reactivos y medicamentos.',
      },
      {
        p: '¿Cuál es la fórmula de la MKT?',
        r: 'MKT = (ΔH/R) / −ln( Σ e^(−ΔH/(R·Ti)) / n ), con las temperaturas en kelvin y ΔH/R = 10.000 K (ΔH = 83,144 kJ/mol, el valor por defecto de la USP).',
      },
      {
        p: '¿En qué se diferencia la MKT del promedio?',
        r: 'La MKT es siempre igual o mayor que el promedio aritmético, porque pondera más las temperaturas altas. Con un registro estable ambas casi coinciden; con picos de calor, la MKT sube más.',
      },
      {
        p: '¿Cada cuánto debo registrar la temperatura para calcularla?',
        r: 'A intervalos iguales, por ejemplo cada hora. Si el registro tiene huecos, el resultado no es válido.',
      },
      {
        p: '¿Puedo usar la MKT para decidir si un reactivo sigue sirviendo tras una excursión de temperatura?',
        r: 'No por sí sola. Ante una excursión, consulta al fabricante: la MKT no reemplaza lo que indica el inserto y no compensa congelación ni períodos fuera de los límites de estabilidad.',
      },
    ],
  },

  'error-total-y-sigma': {
    respuesta:
      'El error total es |sesgo| + 1,65 × CV, y la sigma es (TEa − |sesgo|) / CV. Una sigma de 6 o más es de clase mundial; menos de 3 significa que el control estadístico no alcanza y conviene mejorar el método o revisar el requisito.',
    preguntas: [
      {
        p: '¿Cómo se calcula el error total de un método?',
        r: 'Error total = |sesgo| + 1,65 × CV, según el modelo de Westgard (95 % a una cola).',
      },
      {
        p: '¿Cómo se calcula la sigma de un método de laboratorio?',
        r: 'Sigma = (TEa − |sesgo|) / CV, donde TEa es el error total permitido, con el sesgo y el CV expresados en porcentaje.',
      },
      {
        p: '¿Qué significa cada valor de sigma?',
        r: 'Sigma 6 o más: clase mundial, basta una regla simple con pocos controles. De 4 a 6: bueno a excelente, multirregla con 2 a 4 controles por corrida. De 3 a 4: marginal, multirregla completa y más controles. Menos de 3: el control estadístico no alcanza.',
      },
      {
        p: '¿Qué son la Ped y la Pfr?',
        r: 'La Ped es la probabilidad de que el procedimiento rechace una corrida con un error sistemático igual a ΔSEcrit; lo habitual es pedir 90 % o más. La Pfr es la probabilidad de rechazar una corrida sin error; lo habitual es pedir 5 % o menos.',
      },
      {
        p: '¿Qué es ΔSEcrit?',
        r: 'Es sigma − 1,65: el error sistemático que el procedimiento de control debe detectar.',
      },
    ],
  },

  'actividad-enzimatica': {
    respuesta:
      'La actividad enzimática en U/L es (ΔA/min muestra − ΔA/min blanco) × V total × 1.000 × dilución / (ε × paso óptico × V muestra). Para NADH o NADPH a 340 nm, ε = 6,22 L·mmol⁻¹·cm⁻¹.',
    preguntas: [
      {
        p: '¿Cómo se calcula la actividad enzimática a partir de ΔA/min?',
        r: 'Actividad (U/L) = (ΔA/min muestra − ΔA/min blanco) × V total × 1.000 × dilución / (ε × paso óptico × V muestra), con ε en L·mmol⁻¹·cm⁻¹ y los volúmenes en la misma unidad.',
      },
      {
        p: '¿Cuánto vale el coeficiente de extinción del NADH a 340 nm?',
        r: '6,22 L·mmol⁻¹·cm⁻¹ (6.220 L·mol⁻¹·cm⁻¹). Con paso óptico 1 cm, V total 1 mL y V muestra 0,02 mL, la fórmula se reduce a ΔA/min × 8.039.',
      },
      {
        p: '¿Cómo se pasa de U/L a µkat/L?',
        r: '1 U = 1 µmol de sustrato por minuto = 16,67 nkat, así que 1 U/L = 0,01667 µkat/L.',
      },
      {
        p: '¿En qué parte de la curva debo medir la velocidad?',
        r: 'En la zona lineal, sin consumo apreciable del sustrato. Si la reacción se agota, diluye la muestra y vuelve a medir.',
      },
      {
        p: '¿Influye la temperatura en el resultado?',
        r: 'Sí. La actividad vale a la temperatura en que se midió, y hay que compararla con valores de referencia de esa misma temperatura.',
      },
    ],
  },

  'levey-jennings': {
    respuesta:
      'Un gráfico de Levey-Jennings muestra los resultados de un control en orden, con la media como línea central y los límites de ±1, ±2 y ±3 desviaciones estándar. Las reglas de Westgard marcan cuándo una serie sale de lo esperado.',
    preguntas: [
      {
        p: '¿Qué es un gráfico de Levey-Jennings?',
        r: 'Es un gráfico de control de calidad: la línea central es la media del control, las líneas punteadas son ±1, ±2 y ±3 DE, y cada punto es un resultado del control, en orden.',
      },
      {
        p: '¿Cómo se lee la zona verde, amarilla y roja?',
        r: 'La zona verde llega hasta ±2 DE, la amarilla hasta ±3 DE y la roja está más allá de ±3 DE.',
      },
      {
        p: '¿Qué media y DE debo usar para construirlo?',
        r: 'Los establecidos, por ejemplo de un estudio de 20 resultados o del acumulado de lotes anteriores. Si los calculas con la misma serie, un desvío ya incluido ensancha la DE y se esconde.',
      },
      {
        p: '¿Dónde se marca una violación de regla de Westgard?',
        r: 'En el resultado que completa la regla. Por ejemplo, 2-2s se marca en el segundo de los dos resultados seguidos.',
      },
      {
        p: '¿Qué hago con un resultado de control rechazado?',
        r: 'No se borra: se investiga, se corrige la causa y se deja constancia según el plan de calidad del laboratorio.',
      },
    ],
  },

  'sesgo-y-sdi': {
    respuesta:
      'El sesgo % es (tu resultado − valor asignado) / valor asignado × 100, y el SDI es (tu resultado − media del grupo) / DE del grupo. Un SDI hasta ±2 es aceptable, entre ±2 y ±3 es advertencia, y más de ±3 es inaceptable.',
    preguntas: [
      {
        p: '¿Cómo se calcula el sesgo porcentual?',
        r: 'Sesgo % = (tu resultado − valor asignado) / valor asignado × 100.',
      },
      {
        p: '¿Qué es el SDI y cómo se calcula?',
        r: 'El índice de desviación estándar (SDI) mide a cuántas desviaciones del grupo está tu resultado: SDI = (tu resultado − media del grupo) / DE del grupo.',
      },
      {
        p: '¿Qué valores de SDI son aceptables?',
        r: 'Hasta ±2 es aceptable. Entre ±2 y ±3 es una advertencia: revisa la tendencia de las últimas rondas. Más de ±3 es inaceptable y corresponde investigar y registrar una acción correctiva. Cada programa define sus propios criterios: usa los del informe de tu proveedor.',
      },
      {
        p: '¿Un sesgo aceptable puede ser un problema?',
        r: 'Sí: un sesgo que se repite en varias rondas, aunque sea aceptable, es una señal de error sistemático.',
      },
    ],
  },
};
