import behaviorCode from './BehaviorCode';

const valueCase = (eventType) => {
  switch (eventType) {
    case 'whenOn':
      return '    case 1:\n';
    case 'whenOff':
      return '    case 0:\n';
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
        valueCase(ev.eventType),
        behaviorCase(outputModule, ev.behavior, toiEvent.submodule)
    ),
    ''
  );

const switchCaseBody = (outputModule, toiEvent) => {
  const header = '  switch (value) {\n';
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
  if (toiEvent.events[0].eventType === 'ioLog') {
    const loggerEvent = toiEvent.events[0];
    return `  ${behaviorCode(outputModule, loggerEvent.behavior, toiEvent.submodule)}`;
  }
  return switchCaseBody(outputModule, toiEvent);
};

const digitalInputCode = (outputModule, toiEvent) => {
  const listenerHeader = `${toiEvent.inputModule}.on('state', (value, status) => {\n`;
  return listenerHeader.concat(
    toiEventCode(outputModule, toiEvent),
    '});\n'
  );
};

export default digitalInputCode;
