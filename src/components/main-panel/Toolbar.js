import React from 'react';
import { openApp } from '../../actions/toolbar';

const workspaceOptions = ['Visual', 'Bloques', 'JavaScript'];
// const appsAvailable = ['Configuración del Kit', 'Dashboard'];
const appsAvailable = ['Configuración del Kit'];

const Option = ({ workspace, currentWorkspace, changeWorkspace }) => (
  <button
    className={`btn ${currentWorkspace === workspace ? 'active' : ''}`}
    onClick={changeWorkspace(workspace)}
  >
    {workspace}
  </button>
);

const Options = ({ currentWorkspace, changeWorkspace }) => (
  <div className="btn-group btn-group-block">
    {
      workspaceOptions.map(workspace => (
        <Option
          key={workspace}
          workspace={workspace}
          currentWorkspace={currentWorkspace}
          changeWorkspace={changeWorkspace}
        />
      ))
    }
  </div>
);

const AppOption = ({ option }) => (
  <li className="menu-item">
    <a href={`#${option}`} onClick={openApp}>{option}</a>
  </li>
);

const AppsMenu = () => (
  <div className="dropdown mx-2">
    <a href="#AppsMenu" className="btn dropdown-toggle" tabIndex="0">
      <i className="icon icon-apps" />
    </a>
    <ul className="menu">
      {
        appsAvailable.map(option => <AppOption key={option} option={option} />)
      }
    </ul>
  </div>
);

const Toolbar = ({ workspace, changeWorkspace }) => (
  <div className="toolbar">
    <section className="col-4">
      <AppsMenu />
      <div className="kit-status">
        <span className="online" />
        KIT conectado
      </div>
    </section>
    <section className="col-4 view-options">
      <Options currentWorkspace={workspace} changeWorkspace={changeWorkspace} />
    </section>
    <section className="col-4 run-code">
      <button className="btn btn-lg btn-primary">Ejecutar</button>
    </section>
  </div>
);

export default Toolbar;
