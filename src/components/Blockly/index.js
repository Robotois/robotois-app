import React from 'react';
import PropTypes from 'prop-types';

const toolbox = [
  '<xml>',
  '  <block type="controls_if"></block>',
  '  <block type="controls_whileUntil"></block>',
  '</xml>',
].join('');

export default class BlocklyEditor extends React.Component {
  componentDidMount() {
    this.initializeBlockly();
  }

  componentWillReceiveProps(newProps) {
    const { active } = this.props;
    const isActive = newProps.active;
    if (isActive !== active && isActive) {
      // give some blockly some time to render
      setTimeout(this.forceLayout, 0);
    }
  }


  onResize = () => {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    const blocklyArea = this.blocklyArea;
    let element = this.blocklyArea;
    const blocklyDiv = this.blocklyDiv;
    let x = 0;
    let y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = `${x}px`;
    blocklyDiv.style.top = `${y}px`;
    blocklyDiv.style.width = `${blocklyArea.offsetWidth}px`;
    blocklyDiv.style.height = `${blocklyArea.offsetHeight}px`;
  };

  initializeBlockly = () => {
    this.blocklyArea = document.getElementById('blocklyArea');
    this.blocklyDiv = document.getElementById('blocklyDiv');
    this.workspacePlayground = window.Blockly.inject(this.blocklyDiv, {
      toolbox,
    });
    window.addEventListener('resize', this.onResize, false);
    window.BlocklyEditor = this;
  };

  forceLayout = () => {
    this.onResize();
    window.Blockly.svgResize(this.workspacePlayground);
  }

  render() {
    const { active } = this.props;
    return (
      <div
        id="blocklyArea"
        style={{
          width: '100%',
          height: '100%',
          display: active ? 'block' : 'none',
        }}
      >
        <div
          id="blocklyDiv"
          style={{
            position: 'absolute',
            border: '1px solid red',
          }}
        />
      </div>
    );
  }
}

BlocklyEditor.propTypes = {
  active: PropTypes.bool.isRequired,
};
