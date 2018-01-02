Blockly.Blocks.programa = {
  init() {
    this.appendDummyInput().appendField('Inicio');
    this.appendStatementInput('Program').setCheck(null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.programa = function generateCode(block) {
  const statementsName = Blockly.JavaScript.statementToCode(block, 'Program');
  // TODO: Assemble JavaScript into code variable.
  // const code = '...;\n';
  return statementsName;
};
