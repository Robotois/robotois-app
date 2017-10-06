import sensorCode from './SensorCode';
import digitalInputCode from './digital-input-code';
import { isSensor, isDigitalInput } from '../components/shared/tois-by-function';
import { multipleInstances } from '../reducers/used-tois';

const getInstanceName = (usedTois, type, instance, forUser) => {
  if (!forUser) { // If the code goes for the Raspberry Pi
    return `${type}[${instance - 1}]`;
  }
  return multipleInstances(usedTois, type) ? `${type}[${instance}]` : type;
};

export const toiCode = (outputModule, toiEvent) => {
  switch (true) {
    case isSensor(toiEvent.inputModule):
      return sensorCode(outputModule, toiEvent);
    case isDigitalInput(toiEvent.inputModule):
      return digitalInputCode(outputModule, toiEvent);
    default:
      return '';
  }
};

const toiEventsCode = (usedTois, instanceEvents, forUser) => {
  const codeArr = instanceEvents.toiEvents.map(
    toiEvent => toiCode(
      getInstanceName(usedTois, instanceEvents.type, instanceEvents.instance, forUser),
      {
        ...toiEvent,
        inputModule: getInstanceName(
          usedTois,
          toiEvent.inputModule.type,
          toiEvent.inputModule.instance,
          forUser
        )
      }
    )
  );
  return codeArr.join('\n');
};

export const CodeGenerator = (eventList, usedTois, forUser = false) => {
  // const eventList = Session.get('eventList') || [];
  const strCode = eventList.reduce(
    (str, instanceEvents) => str.concat(toiEventsCode(usedTois, instanceEvents, forUser), '\n'),
    '',
  );
  return strCode;
};
