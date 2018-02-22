Blockly.Blocks.motor = {
  init: function() {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField('Motor')
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
      .appendField('Acelerar:')
      .appendField(new Blockly.FieldNumber(0, 0, 100, 1), 'VALUE')
      .appendField('%');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
    this.setTooltip('Motor');
    this.setHelpUrl('www.robotois.com');
  },
};

Blockly.JavaScript.motor = function(block) {
  var number_name = block.getFieldValue('VALUE');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
