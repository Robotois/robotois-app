const eventListenersMap = ['led', 'lcd', 'ledRGB', 'relay', 'servo', 'motor'];
const sensorsMap = ['temperature', 'light', 'rotary', 'distance', 'sound'];
const loggersMap = ['lcd'];
const ioLoggersMap = ['led', 'ledRGB', 'relay', 'lcd'];
const digitalInputsMap = ['button', 'motion'];

export const isEventListener = moduleName =>
  eventListenersMap.findIndex(sens => sens === moduleName) !== -1;

export const isSensor =
  inputModule => sensorsMap.findIndex(sens => inputModule.includes(sens)) !== -1;

export const isDigitalInput = inputModule =>
  digitalInputsMap.findIndex(io => inputModule.includes(io)) !== -1;

export const isLogger = item => loggersMap.findIndex(logger => logger === item) !== -1;

export const isIoLogger = item => ioLoggersMap.findIndex(logger => logger === item) !== -1;

export const isInput = type => isSensor(type) || isDigitalInput(type);
