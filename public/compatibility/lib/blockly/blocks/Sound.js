Blockly.Blocks.sound = {
  init: function() {
    this.appendDummyInput()
      .appendField('Sensor de Sonido')
      .appendField(
        new Blockly.FieldImage(
          'http://robotois.com/static/media/logo.b650e89d.svg',
          15,
          15,
          '*'
        )
      );
    this.setOutput(true, 'Sensor');
    this.setColour(240);
    this.setTooltip('Sensor de Sonido');
    this.setHelpUrl('www.robotois.com');
  },
};
Blockly.JavaScript.sound = function generateCode(block) {
  // TODO: Assemble JavaScript into code variable.
  const code = 'sound[0]';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
