const ShapeTypes = {
  analogConnector: draw2d.shape.robotois.AnalogConnector,
  temperature: draw2d.shape.robotois.TemperatureSensor,
  light: draw2d.shape.robotois.LightSensor,
  rotary: draw2d.shape.robotois.RotarySensor,
  // humidity: 'toiItem',
  distance: draw2d.shape.robotois.DistanceSensor,
  button: draw2d.shape.robotois.Button,
  led: draw2d.shape.robotois.Led,
  ledRGB: draw2d.shape.robotois.LedRGB,
  lcd: draw2d.shape.robotois.Lcd,
  motorsConnector: draw2d.shape.robotois.MotorConnector,
  motor: draw2d.shape.robotois.Motor,
  servosConnector: draw2d.shape.robotois.ServoConnector,
  servo: draw2d.shape.robotois.Servo,
  relay: draw2d.shape.robotois.Relay,
  motion: draw2d.shape.robotois.Motion,
  sound: draw2d.shape.robotois.SoundSensor,
};
export default ShapeTypes;
