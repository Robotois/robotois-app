import React from 'react';
import PropTypes from 'prop-types';
import { toolbox } from './toolbox';
import Dialog from './Dialog';

export default class BlocklyEditor extends React.Component {
  state = {
    showPrompt: false,
    promptValue: '',
    title: '',
    callback: () => {},
  };

  componentDidMount() {
    this.initializeBlockly();
    window.Blockly.prompt = (message, defaultValue, callback) => {
      this.setState({
        showPrompt: true,
        promptValue: defaultValue,
        title: message,
        callback,
      });
    };
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
    const Blockly = window.Blockly;
    const xml = '<xml><block type="programa" deletable="false" movable="false"></block></xml>';
    this.blocklyArea = document.getElementById('blocklyArea');
    this.blocklyDiv = document.getElementById('blocklyDiv');
    this.workspacePlayground = Blockly.inject(this.blocklyDiv, {
      toolbox,
      collapse: true,
      comments: true,
      disable: true,
      maxBlocks: Infinity,
      trashcan: true,
      horizontalLayout: false,
      toolboxPosition: 'start',
      css: true,
      media: 'https://blockly-demo.appspot.com/static/media/',
      rtl: false,
      scrollbars: true,
      sounds: true,
      oneBasedIndex: true,
      grid: {
        spacing: 20,
        length: 1,
        colour: '#888',
        snap: false,
      },
    });
    window.addEventListener('resize', this.onResize, false);
    // inject initial block
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), this.workspacePlayground);
    // disable any block not connected to the root block
    this.workspacePlayground.addChangeListener(Blockly.Events.disableOrphans);
  };

  forceLayout = () => {
    this.onResize();
    window.Blockly.svgResize(this.workspacePlayground);
  };

  handleClosePrompt = () => {
    this.setState(showPrompt => ({ showPrompt: !showPrompt }));
  };

  render() {
    const { active } = this.props;
    const { showPrompt, title, promptValue, callback } = this.state;
    return (
      <div
        id="blocklyArea"
        style={{
          width: '100%',
          height: '100%',
          display: active ? 'block' : 'none',
        }}
      >
        {showPrompt ? (
          <Dialog
            handleClose={this.handleClosePrompt}
            title={title}
            value={promptValue}
            callback={callback}
          />
        ) : null}
        <div
          id="blocklyDiv"
          style={{
            position: 'absolute',
          }}
        />
      </div>
    );
  }
}

BlocklyEditor.propTypes = {
  active: PropTypes.bool.isRequired,
};
