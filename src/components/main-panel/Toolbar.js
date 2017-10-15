import React from 'react';
import { generateCode } from '../../actions/kit-config/kit-config';

const workspaceOpts = ['Visual', 'Bloques', 'JavaScript'];
// const appsAvailable = ['Configuración del Kit', 'Dashboard'];
const appsAvailable = [
  {
    title: 'Principal',
    key: 'main',
  },
  {
    title: 'Configuración',
    key: 'kitConfig',
  },
  {
    title: 'Tablero',
    key: 'dashboard',
  },
  /*  {
    title: 'Tienda',
    key: 'store',
  }, */
];

const Option = ({ workspace, currentWorkspace, changeWorkspace }) =>
  (<button
    className={`btn ${currentWorkspace === workspace ? 'active' : ''}`}
    onClick={changeWorkspace(workspace)}
  >
    {workspace}
  </button>);

const Options = ({ currentWorkspace, changeWorkspace }) =>
  (<div className="btn-group btn-group-block">
    {workspaceOpts.map(workspace =>
      (<Option
        key={workspace}
        workspace={workspace}
        currentWorkspace={currentWorkspace}
        changeWorkspace={changeWorkspace}
      />),
    )}
  </div>);

const AppOption = ({ title, changeApp }) =>
  (<li className="menu-item">
    <a href={`#${title}`} onClick={changeApp}>{title}</a>
  </li>);

const AppOptions = ({ changeApp }) =>
  (<ul className="menu">
    {appsAvailable.map(opt =>
      <AppOption key={opt.key} title={opt.title} changeApp={changeApp(opt)} />,
    )}
  </ul>);

const KitStatus = ({ selectedKit }) =>
  (<div className="kit-status">
    <span className={`${selectedKit ? 'online' : 'offline'}`} />
    {selectedKit ? <span><b>{selectedKit.hostname}</b></span> : <span>Desconectado</span>}
  </div>);

const AppMenu = ({ changeApp, selectedKit }) =>
  (<section className="col-4">
    <div className="dropdown">
      <button className="btn btn-action dropdown-toggle"><i className="icon icon-apps" /></button>
      <AppOptions changeApp={changeApp} />
    </div>
    <KitStatus selectedKit={selectedKit} />
  </section>);

const WorkspaceOptions = ({ workspace, changeWorkspace }) =>
  (<section className="col-4 view-options">
    <Options currentWorkspace={workspace} changeWorkspace={changeWorkspace} />
  </section>);

const RunButton = ({ selectedKit, handleRunCode, btnText }) =>
  (<section className="col-4 run-code">
    <button
      className={`btn btn-lg btn-primary ${!selectedKit ? 'disabled' : ''}`}
      onClick={handleRunCode}
    >
      {btnText}
    </button>
  </section>);

const AppTitle = ({ currentApp }) =>
  (<section className="col-4 view-options">
    <h5 className="text-light"><b>{currentApp.title}</b></h5>
  </section>);

class Toolbar extends React.Component {
  constructor() {
    super();
    this.handleRunCode = this.handleRunCode.bind(this);
  }

  handleRunCode() {
    const {
      eventList,
      usedTois,
      response,
      runCode,
      workspace,
      code,
      selectedKit,
      stopCode,
      udpateStatus,
    } = this.props;
    if (response && response.message === 'running') {
      stopCode(selectedKit.ip);
    } else {
      const data = workspace === 'Visual'
        ? generateCode(eventList, usedTois, undefined)
        : generateCode(eventList, usedTois, code);
      if (data.success) {
        runCode(selectedKit.ip, data);
      } else {
        udpateStatus(false, data.message);
      }
    }
  }
  render() {
    const { workspace, selectedKit, changeWorkspace, changeApp, response, currentApp } = this.props;
    const btnText = response && response.message === 'running' ? 'Detener' : 'Ejecutar';
    return (
      <div className="toolbar">
        <AppMenu changeApp={changeApp} selectedKit={selectedKit} />
        {currentApp.key !== 'main' && <AppTitle currentApp={currentApp} />}
        {currentApp.key === 'main' &&
          <WorkspaceOptions workspace={workspace} changeWorkspace={changeWorkspace} />}
        {currentApp.key === 'main' &&
          <RunButton
            selectedKit={selectedKit}
            handleRunCode={this.handleRunCode}
            btnText={btnText}
          />}
      </div>
    );
  }
}

export default Toolbar;
