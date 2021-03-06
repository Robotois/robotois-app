// require('./lib/draw2d/dependencies/jquery-2.0.3.min');
// require('./lib/draw2d/dependencies/Class');
// require('./lib/draw2d/dependencies/raphael.min');
// require('./lib/draw2d/dependencies/json2');
// require('./lib/draw2d/dependencies/shifty');
// require('./lib/draw2d/draw2d');
require('./lib/draw2d/dependencies/canvg');
require('./lib/DragConnectionCreatePolicy');
require('./lib/SelectionMenuPolicy');

require('./AbstractComponent');
require('./AnalogConnector');
require('./AnalogInputPort');
require('./AnalogOutputPort');
require('./AnalogSensor');
require('./Button');
require('./DistanceSensor');
require('./Lcd');
require('./Led');
require('./LedRGB');
require('./LightSensor');
require('./Motion');
require('./Motor');
require('./MotorConnector');
require('./MotorInputPort');
require('./MotorOutputPort');
require('./Relay');
require('./RotarySensor');
require('./Servo');
require('./ServoConnector');
require('./Shield');
require('./SoundSensor');
require('./TemperatureSensor');

Robotois = {
  CANVAS: null,
  selectedFigure: null,
  dropCoordinates: {
    x: 100,
    y: 100,
  },
  canvasDOMRef: null,
};

addSelection = null;
currentSelection = null;
