Blockly.Blocks.button = {
  init: function() {
    this.appendDummyInput()
      .appendField('Boton')
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
    this.setTooltip('Boton');
    this.setHelpUrl('www.robotois.com');
  },
};
Blockly.JavaScript.button = function generateCode(block) {
  // TODO: Assemble JavaScript into code variable.
  const code = 'button[0]';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
