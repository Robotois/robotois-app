Blockly.Blocks.medicion = {
  init() {
    this.appendDummyInput().appendField('Monitorear');
    this.appendValueInput('sensor')
      .setCheck('Sensor')
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('valor')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendStatementInput('NAME').setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip('Monitorear el estado de cualquier sensor');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.medicion = function (block) {
  const valueSensor = Blockly.JavaScript.valueToCode(
    block,
    'sensor',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const valueValor = Blockly.JavaScript.valueToCode(block, 'valor', Blockly.JavaScript.ORDER_ATOMIC);
  const statementsName = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  const code = '...;\n';
  return code;
};
