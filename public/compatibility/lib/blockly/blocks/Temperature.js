Blockly.Blocks.temperature = {
  init() {
    this.appendDummyInput()
      .appendField('Sensor de Temperatura')
      .appendField(
        new Blockly.FieldImage('http://robotois.com/static/media/logo.b650e89d.svg', 15, 15, '*'),
      );
    this.setOutput(true, 'Sensor');
    this.setColour(240);
    this.setTooltip('Sensor de temperatura');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.temperature = function (block) {
  // TODO: Assemble JavaScript into code variable.
  const code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
