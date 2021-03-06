Blockly.Blocks.led = {
  init: function() {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField('LED')
      .appendField(
        new Blockly.FieldImage(
          'http://robotois.com/static/media/logo.b650e89d.svg',
          15,
          15,
          '*'
        )
      );
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('Acción:')
      .appendField(
        new Blockly.FieldDropdown([
          ['Encender', 'turnOn'],
          ['Parpadear', 'blink'],
          ['Apagar', 'turnOff'],
        ]),
        'ACTION'
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
    this.setTooltip('Led');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.led = function generateCode(block) {
  const dropdownAction = block.getFieldValue('ACTION');
  const code = `led[0].${dropdownAction}();\n`;
  return code;
};
