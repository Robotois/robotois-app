const eventListenersMap = ['led', 'lcd', 'ledRGB', 'relay', 'servo', 'motor'];
const sensorsMap = ['temperature', 'light', 'rotary', 'distance', 'sound'];
const loggersMap = ['lcd'];
const ioLoggersMap = ['led', 'ledRGB', 'relay', 'lcd'];
const digitalOutputMap = ['led', 'relay'];
const digitalInputsMap = ['button', 'motion'];

export const isEventListener = moduleName =>
  eventListenersMap.findIndex(sens => sens === moduleName) !== -1;

export const isSensor =
  inputModule => sensorsMap.findIndex(sens => inputModule.includes(sens)) !== -1;

export const isDigitalInput = inputModule =>
  digitalInputsMap.findIndex(io => inputModule.includes(io)) !== -1;

export const isLogger = toi => loggersMap.findIndex(logger => logger === toi) !== -1;

export const isIoLogger = toi => ioLoggersMap.findIndex(logger => logger === toi) !== -1;

export const isInput = type => isSensor(type) || isDigitalInput(type);

export const isDigitalOutput = toi => digitalOutputMap.findIndex(io => io === toi) !== -1;

export const isIo = toi => isDigitalOutput(toi) || isDigitalInput(toi);
