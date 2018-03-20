export const colors = {
  blue: '#1968FF',
  green: '#00F5A9',
  red: '#E2244C',
  purple: '#5755d9',
  dark: '#3A375C',
  purpleText: '#8A81C3',
  lightText: '#EAE8FF',
  dashboardText: '#8A9CAD',
};

const toisData = [
  // eslint-disable-line
  {
    image: 'img/tois/analogic-connector.svg',
    title: 'Conector de sensores analógicos',
    listIndex: 0,
    type: 'analogConnector',
    description:
      'Este componente se ocupa como puerto y permite obtener mediciones de diferentes tipos de sensores analógicos, tal como los sensores de temperatura, intensidad de luz, sonido y rotatorio.',
  },
  {
    image: 'img/tois/temperature-sensor.svg',
    title: 'Sensor de temperatura',
    listIndex: 1,
    type: 'temperature',
    hasEvents: true,
    description:
      'Este sensor es de tipo analógico, permite convertir la temperatura ambiental en cantidades numéricas. Este sensor se conecta al conector de sensores analógicos.',
    chartColor: colors.red,
    toText: value => (value !== undefined ? `${value} °C` : '-'),
  },
  {
    image: 'img/tois/light-sensor.svg',
    title: 'Sensor de luz',
    listIndex: 2,
    type: 'light',
    hasEvents: true,
    description:
      'Este sensor es de tipo analógico, permite convertir la intensidad de luz a cantidades numéricas. Este sensor se conecta al conector de sensores analógicos.',
    chartColor: colors.blue,
    toText: value => (value !== undefined ? `Intensidad ${value}` : '-'),
  },
  {
    image: 'img/tois/rotary-sensor.svg',
    title: 'Sensor rotatorio',
    listIndex: 3,
    type: 'rotary',
    hasEvents: true,
    description:
      'Este sensor es de tipo analógico, permite convertir la posición en la que se encuentra el eje o perilla en una cantidad numérica. Este sensor se conecta al conector de sensores analógicos.',
    chartColor: colors.purple,
    toText: value => (value !== undefined ? `Posición ${value}` : '-'),
  },
  {
    image: 'img/tois/distance-sensor.svg',
    title: 'Sensor de distancia',
    listIndex: 4,
    type: 'distance',
    hasEvents: true,
    description:
      'Este componente permite detectar la distancia que hay entre el componente y algún objeto sólido que esté enfrente. Un uso común es medir la distancia entre objetos y hacer un robot que evite colisiones.',
    chartColor: colors.green,
    toText: value => (value !== undefined ? `${value} cm` : '-'),
  },
  {
    image: 'img/tois/button.svg',
    title: 'Push button',
    listIndex: 5,
    type: 'button',
    hasEvents: true,
    description:
      'El botón puede tener dos posibles estados, Encendido y Apagado. El estado Encendido se presenta cuando se presiona el botón y el estado Apagado es cuando no está presionado.',
  },
  {
    image: 'img/tois/led.svg',
    title: 'LED',
    listIndex: 6,
    type: 'led',
    description:
      'Un LED es un componente de salida muy simple, el cual puede tener dos posibles estados: Encendido y Apagado. El LED se utiliza para indicar visualmente el estado de algún evento o proceso.',
  },
  {
    image: 'img/tois/led-rgb.svg',
    title: 'LEDs RGB',
    listIndex: 7,
    type: 'ledRGB',
    description:
      'Los LEDs RGB son dispositivos de salida que permiten mostrar de manera visual un color específico. Cada LED tiene dos estados Encendido y Apagado.',
    submodules: 7,
  },
  {
    image: 'img/tois/display.svg',
    title: 'Display LCD',
    listIndex: 8,
    type: 'lcd',
    description:
      'El display LCD es un dispositivo de salida para mostrar información de manera visual, que puede ser un mensaje, un valor numérico o símbolos.',
  },
  {
    image: 'img/tois/motors-connector.svg',
    title: 'Controlador de Motores',
    listIndex: 9,
    type: 'motorsConnector',
    description:
      'El conector  de motores se utiliza para controlar hasta dos motores, las acciones de cada motor como velocidad y dirección se controlan con ayuda de este conector.',
  },
  {
    image: 'img/tois/servos-connector.svg',
    title: 'Controlador de Servo-Motores',
    listIndex: 10,
    type: 'servosConnector',
    description:
      'El conector de servomotores se utiliza para controlar hasta tres servomotores, la posición del eje de un servomotor se controla con la ayuda de este conector.',
  },
  {
    image: 'img/tois/servo-motor.svg',
    title: 'Servo Motor',
    listIndex: 11,
    type: 'servo',
    description:
      'Este componente permite controlar el grado de rotación de sus ejes. Este componente se conecta al conector de servomotores.',
  },
  {
    image: 'img/tois/motor.svg',
    title: 'Motor',
    listIndex: 12,
    type: 'motor',
    description:
      'Este componente cuenta con los siguientes parámetros: iniciar movimiento, detener, velocidad y dirección de giro. Este componente se conecta al conector de motores.',
  },
  {
    image: 'img/tois/relay.svg',
    title: 'Relevador',
    listIndex: 13,
    type: 'relay',
    description:
      'Este componente es un interruptor que permite Activar y Desactivar algun dispositivo analógico, tal como una Lámpara o algun dispositivo que se conecte al toma corriente.',
  },
  {
    image: 'img/tois/motion-sensor.svg',
    title: 'Sensor de Movimiento',
    listIndex: 14,
    type: 'motion',
    hasEvents: true,
    description:
      'Este sensor permite detectar movimiento de personas a una distancia de 3m aproximadamente. El sensor tiene dos posibles estados, Activado y Desactivado.',
  },
  {
    image: 'img/tois/sound-sensor.svg',
    title: 'Sensor de Sonido',
    listIndex: 15,
    type: 'sound',
    hasEvents: true,
    description:
      'El sensor de Sonido es un sensor analógico, el cual permite obtener la intensidad de sonido a la cual esta expuesto.',
    chartColor: colors.dark,
    toText: value => (value !== undefined ? `Intensidad ${value}` : '-'),
  },
];

export default toisData;

export const getChartProps = toiType => {
  const toiItem = toisData.find(toi => toi.type === toiType);
  return !toiItem
    ? {}
    : {
        chartColor: toiItem.chartColor,
        description: toiItem.description,
        toText: toiItem.toText,
      };
};
