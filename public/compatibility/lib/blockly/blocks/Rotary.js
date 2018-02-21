Blockly.Blocks.rotary = {
  init: function() {
    this.appendDummyInput()
      .appendField('Sensor Rotatorio')
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
    this.setTooltip('Sensor de Rotatorio');
    this.setHelpUrl('www.robotois.com');
  },
};

Blockly.JavaScript.rotary = function generateCode(block) {
  // TODO: Assemble JavaScript into code variable.
  const code = 'rotary[0]';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
