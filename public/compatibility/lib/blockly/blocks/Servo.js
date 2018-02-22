Blockly.Blocks.servo = {
  init: function() {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField('Servo Motor')
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
      .appendField('Girar:')
      .appendField(new Blockly.FieldAngle(90), 'ANGLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
    this.setTooltip('Servo Motor');
    this.setHelpUrl('www.robotois.com');
  },
};

Blockly.JavaScript.servo = function(block) {
  var angle_angle = block.getFieldValue('ANGLE');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
