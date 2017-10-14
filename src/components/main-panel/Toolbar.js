import React from 'react';
// import { openApp } from '../../actions/toolbar';

const workspaceOptions = ['Visual', 'Bloques', 'JavaScript'];
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
    {workspaceOptions.map(workspace =>
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

const AppMenu = ({ changeApp }) =>
  (<div className="dropdown">
    <button className="btn btn-action dropdown-toggle"><i className="icon icon-apps" /></button>
    <AppOptions changeApp={changeApp} />
  </div>);

const Toolbar = ({ workspace, changeWorkspace, changeApp }) =>
  (<div className="toolbar">
    <section className="col-4">
      <AppMenu changeApp={changeApp} />
      <div className="kit-status">
        <span className="online" /> KIT conectado
      </div>
    </section>
    <section className="col-4 view-options">
      <Options currentWorkspace={workspace} changeWorkspace={changeWorkspace} />
    </section>
    <section className="col-4 run-code">
      <button className="btn btn-lg btn-primary">Ejecutar</button>
    </section>
  </div>);

export default Toolbar;
