Blockly.Blocks.programa = {
  init() {
    this.appendDummyInput().appendField('Inicio');
    this.appendStatementInput('NAME').setCheck(null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.programa = function (block) {
  const statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  const code = '...;\n';
  return code;
};
