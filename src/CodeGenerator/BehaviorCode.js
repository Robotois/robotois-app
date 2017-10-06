const LedCodeMap = {
  Parpadear: 'blink();\n',
  Encender: 'turnOn();\n',
  default: 'turnOff();\n',
  EstadoBinario: 'write(value);\n'
};

const LedBehaviorCode = (outputModule, behavior) => `${outputModule}.${LedCodeMap[behavior.action]}`;

const RelayCodeMap = {
  Parpadear: 'blink();\n',
  Encender: 'turnOn();\n',
  default: 'turnOff();\n',
  EstadoBinario: 'write(value);\n'
};

const RelayBehaviorCode = (outputModule, behavior) => `${outputModule}.${RelayCodeMap[behavior.action]}`;

const LCDBehaviorCode = (outputModule, behavior) => {
  switch (behavior.action) {
    case 'message':
      return `${outputModule}.message(\`${behavior.params.param1}\`);\n`;
    case 'default':
      return `${outputModule}.clear();\n`;
    default:
      return '';
  }
};

const RGBLedMap = {
  led1: 1,
  led2: 2,
  led3: 3,
  led4: 4,
  led5: 5,
  led6: 6,
  led7: 7,
};

const RGBBehaviorCode = (outputModule, behavior, submodule) => {
  switch (behavior.action) {
    case 'Encender':
      return submodule === 'todos' ?
        `${outputModule}.allOn('${behavior.params.param1}');\n`
        :
        `${outputModule}.turnOn(${RGBLedMap[submodule]}, '${behavior.params.param1}');\n`;
    case 'Parpadear':
      return submodule === 'todos' ?
        `${outputModule}.allBlink('${behavior.params.param1}');\n`
        :
        `${outputModule}.blink(${RGBLedMap[submodule]}, '${behavior.params.param1}');\n`;
    case 'EstadoBinario':
      return submodule === 'todos' ?
        `${outputModule}.allWrite('${behavior.params.param1}', value);\n`
        :
        `${outputModule}.write(${RGBLedMap[submodule]}, '${behavior.params.param1}', value);\n`;
    case 'default':
      return submodule === 'todos' ?
        `${outputModule}.allOff();\n`
        :
        `${outputModule}.turnOff(${RGBLedMap[submodule]});\n`;
    default:
      return '';
  }
};

const ServoBehaviorCode = (outputModule, behavior) => {
  switch (behavior.action) {
    case 'setAngle':
      return `${outputModule}.setAngle(${behavior.params.param1});\n`;
    case 'default':
      return '// Mantener posición\n';
    default:
      return '';
  }
};

const MotorBehaviorCode = (outputModule, behavior) => {
  switch (behavior.action) {
    case 'motorPWM':
      return `${outputModule}.motorPWM(${behavior.params.param1});\n`;
    case 'default':
      return `${outputModule}.motorStop();\n`;
    // case 'default':
    //   return '// Mantener posición\n';
    default:
      return '';
  }
};

const behaviorCode = (outputModule, behavior, submodule) => {
  // console.log('includes servo: ', outputModule.includes('servo'));
  switch (true) {
    case outputModule.includes('lcd'):
      return LCDBehaviorCode(outputModule, behavior);
    case outputModule.includes('ledRGB'):
      return RGBBehaviorCode(outputModule, behavior, submodule);
    case outputModule.includes('led'):
      return LedBehaviorCode(outputModule, behavior);
    case outputModule.includes('relay'):
      return RelayBehaviorCode(outputModule, behavior);
    case outputModule.includes('servo'):
      return ServoBehaviorCode(outputModule, behavior);
    case outputModule.includes('motor'):
      return MotorBehaviorCode(outputModule, behavior);
    default:
      return '';
  }
};

export default behaviorCode;
