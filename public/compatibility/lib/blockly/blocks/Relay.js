Blockly.Blocks.relay = {
  init: function() {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField('Relevador')
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
    this.setTooltip('Relevador');
    this.setHelpUrl('www.robotois.com');
  },
};

Blockly.JavaScript.relay = function(block) {
  const dropdownAction = block.getFieldValue('ACTION');
  const code = `relay[0].${dropdownAction}();\n`;

  return code;
};
