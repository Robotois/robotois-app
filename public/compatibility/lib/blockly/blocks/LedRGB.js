Blockly.Blocks.ledrgb = {
  init: function() {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField('LED RGB')
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
      .appendField('LED1')
      .appendField(
        new Blockly.FieldDropdown([
          ['Encender', 'turnOn'],
          ['Parpadear', 'blink'],
          ['Apagar', 'turnOff'],
        ]),
        'ACTION1'
      )
      .appendField(new Blockly.FieldColour('#ff99ff'), 'L1');
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('LED2')
      .appendField(
        new Blockly.FieldDropdown([
          ['Encender', 'turnOn'],
          ['Parpadear', 'blink'],
          ['Apagar', 'turnOff'],
        ]),
        'ACTION2'
      )
      .appendField(new Blockly.FieldColour('#9999ff'), 'L2');
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('LED3')
      .appendField(
        new Blockly.FieldDropdown([
          ['Encender', 'turnOn'],
          ['Parpadear', 'blink'],
          ['Apagar', 'turnOff'],
        ]),
        'ACTION3'
      )
      .appendField(new Blockly.FieldColour('#33ffff'), 'L3');
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('LED4')
      .appendField(
        new Blockly.FieldDropdown([
          ['Encender', 'turnOn'],
          ['Parpadear', 'blink'],
          ['Apagar', 'turnOff'],
        ]),
        'ACTION4'
      )
      .appendField(new Blockly.FieldColour('#ff6666'), 'L4');
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('LED5')
      .appendField(
        new Blockly.FieldDropdown([
          ['Encender', 'turnOn'],
          ['Parpadear', 'blink'],
          ['Apagar', 'turnOff'],
        ]),
        'ACTION5'
      )
      .appendField(new Blockly.FieldColour('#ccffff'), 'L5');
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('LED6')
      .appendField(
        new Blockly.FieldDropdown([
          ['Encender', 'turnOn'],
          ['Parpadear', 'blink'],
          ['Apagar', 'turnOff'],
        ]),
        'ACTION6'
      )
      .appendField(new Blockly.FieldColour('#66ff99'), 'L6');
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('LED7')
      .appendField(
        new Blockly.FieldDropdown([
          ['Encender', 'turnOn'],
          ['Parpadear', 'blink'],
          ['Apagar', 'turnOff'],
        ]),
        'ACTION7'
      )
      .appendField(new Blockly.FieldColour('#ffff66'), 'L7');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
    this.setTooltip('Led RGB');
    this.setHelpUrl('www.robotois.com');
  },
};

Blockly.JavaScript.ledrgb = function(block) {
  const leds = Array.from([1, 2, 3, 4, 5, 6, 7], i => {
    const action = block.getFieldValue(`ACTION${i}`);
    const color = block.getFieldValue(`L${i}`);
    return `ledRGB[0].${action}(${i}${action === 'turnOff' ? '' : `, '${color}'`});`;
  });
  return leds.join('\n');
};
