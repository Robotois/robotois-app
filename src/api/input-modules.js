const sensorInputs = (range, logText) => [
  {
    key: 1,
    eventType: 'log',
    menuText: 'Registrar Estado del Sensor',
    inputField: 'Text',
    behavior: { params: { param1: `${logText} $\{value}` } },
  },
  {
    key: 2,
    eventType: 'equals',
    menuText: 'Igual a:',
    inputField: 'Number',
    eventParams: { valor: 0 },
  },
  {
    key: 3,
    eventType: 'lessThan',
    menuText: 'Menor a:',
    inputField: 'Number',
    eventParams: { valor: 0 },
  },
  {
    key: 4,
    eventType: 'moreThan',
    menuText: 'Mayor a:',
    inputField: 'Number',
    eventParams: { valor: 0 },
  },
  {
    key: 5,
    eventType: 'between',
    menuText: 'Entre:',
    inputField: 'NumberRange',
    eventParams: { min: Math.round(range.max * 0.2), max: Math.round(range.max * 0.8) },
  },
];
const InputModules = [
  {
    key: 1,
    type: 'temperature',
    title: 'Sensor de Temperatura',
    units: '°C',
    range: { min: 0, max: 100 },
    events: sensorInputs({ min: 0, max: 100 }, 'Temp:'),
  },
  {
    key: 2,
    type: 'light',
    title: 'Sensor de Luz',
    units: 'unidades',
    range: { min: 0, max: 10 },
    events: sensorInputs({ min: 0, max: 10 }, 'Luz:'),
  },
  {
    key: 3,
    type: 'rotary',
    title: 'Sensor Rotatorio',
    units: 'unidades',
    range: { min: 0, max: 10 },
    events: sensorInputs({ min: 0, max: 10 }, 'Posición:'),
  },
  {
    key: 6,
    type: 'button',
    title: 'Botón',
    events: [
      {
        key: 1,
        eventType: 'ioLog',
        menuText: 'Registrar Estado del Botón',
        behavior: {
          params: {
            param1: 'Estado: ${status}',
          },
        },
      },
      {
        key: 2,
        eventType: 'whenOn',
        menuText: 'Cuando esta Presionado',
      },
      {
        key: 3,
        eventType: 'whenOff',
        menuText: 'Cuando NO esta Presionado',
      },
    ],
  },
  {
    key: 7,
    type: 'motion',
    title: 'Sensor de Movimiento',
    events: [
      {
        key: 1,
        eventType: 'ioLog',
        menuText: 'Registrar Estado del Sensor de Movimiento',
        behavior: {
          params: {
            param1: 'Estado: ${status}',
          },
        },
      },
      {
        key: 2,
        eventType: 'whenOn',
        menuText: 'Cuando esta Activo',
      },
      {
        key: 3,
        eventType: 'whenOff',
        menuText: 'Cuando NO esta Activo',
      },
    ],
  },
  {
    key: 8,
    type: 'sound',
    title: 'Sensor de Sonido',
    units: 'Unidades',
    range: { min: 0, max: 100 },
    events: sensorInputs({ min: 0, max: 100 }, 'Nivel:'),
  },
  {
    key: 9,
    type: 'distance',
    title: 'Sensor de Distancia',
    units: 'cm',
    range: { min: 0, max: 300 },
    events: sensorInputs({ min: 0, max: 300 }, 'Distancia:'),
  },
];

export default InputModules;
