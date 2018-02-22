Blockly.Blocks.lcd = {
  init: function() {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField('LCD')
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
      .appendField('Texto:')
      .appendField(new Blockly.FieldTextInput('Texto a mostrar...'), 'TEXT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
    this.setTooltip('LCD');
    this.setHelpUrl('www.robotois.com');
  },
};

Blockly.JavaScript.lcd = function generateCode(block) {
  const value = block.getFieldValue('ACTION');
  // TODO: Assemble JavaScript into code variable.
  const code = `lcd[0].message(${value});\n`;
  return code;
};
