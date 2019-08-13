import React from 'react';
import CodeEditorContainer from '../../containers/code-editor-container';
import VisualEditor from './VisualEditor';
import KitConfigContainer from '../../containers/kit-config/kit-config-container';
import DashboardContainer from '../../containers/dashboard/dashboard-container';
import BlocklyEditorContainer from '../../containers/Blockly';

const AppsWorkspace = ({ currentApp }) => {
  switch (currentApp) {
    case 'kitConfig':
      return <KitConfigContainer />;
    case 'dashboard':
      return <DashboardContainer />;
    default:
      return false;
  }
};

class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
    };
    this.handleRedimension = this.handleRedimension.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleRedimension);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleRedimension);
  }

  handleRedimension() {
    const { clientHeight, clientWidth } = this.myElement;
    this.setState({
      height: clientHeight,
      width: clientWidth,
    });
  }

  render() {
    const { workspace, currentApp } = this.props;
    const { width, height } = this.state;
    return (
      <div
        className={`workspace ${currentApp === 'dashboard' ? 'workspace-dark' : ''}`}
        ref={(el) => { this.myElement = el; }}
        style={{
          overflow: 'scroll',
          width: '100%',
          height: '100%',
        }}
      >
        <AppsWorkspace currentApp={currentApp} />
        <CodeEditorContainer />
        <VisualEditor
          visible={workspace === 'Visual' && currentApp === 'main'}
          width={width}
          height={height}
        />
        <BlocklyEditorContainer />
      </div>
    );
  }
}

export default Workspace;
