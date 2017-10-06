import behaviorCode from './BehaviorCode';

const valueCase = (eventType, eventParams) => {
  switch (eventType) {
    case 'equals':
      return `    case (value == ${eventParams.valor}):\n`;
    case 'lessThan':
      return `    case (value < ${eventParams.valor}):\n`;
    case 'moreThan':
      return `    case (value > ${eventParams.valor}):\n`;
    case 'between':
      return `    case (value >= ${eventParams.min} && value <= ${eventParams.max}):\n`;
    case 'log':
      return '    case (value):\n';
    default:
      return '';
  }
};

const behaviorCase = (outputModule, behavior, submodule) => {
  const breakLine = behavior.action !== 'default' ? '      break;\n' : '';
  return `      ${behaviorCode(outputModule, behavior, submodule)}${breakLine}`;
};

const eventCases = (outputModule, toiEvent) =>
  toiEvent.events.reduce((result, ev) =>
    result.concat(
        valueCase(ev.eventType, ev.eventParams),
        behaviorCase(outputModule, ev.behavior, toiEvent.submodule)
    ),
    ''
  );

const switchCaseBody = (outputModule, toiEvent) => {
  const header = '  switch (true) {\n';
  const footer =
  `    default:\n${
    behaviorCase(outputModule, { action: 'default' }, toiEvent.submodule)
  }  }\n`;

  return header.concat(
    eventCases(outputModule, toiEvent),
    footer
  );
};

const toiEventCode = (outputModule, toiEvent) => {
  if (toiEvent.events[0].eventType === 'log') {
    const loggerEvent = toiEvent.events[0];
    return `  ${behaviorCode(outputModule, loggerEvent.behavior)}`;
  }
  return switchCaseBody(outputModule, toiEvent);
};

const sensorCode = (outputModule, toiEvent) => {
  const listenerHeader = `${toiEvent.inputModule}.on('medicion', (value) => {\n`;
  return listenerHeader.concat(
    toiEventCode(outputModule, toiEvent),
    '});\n'
  );
};

export default sensorCode;
