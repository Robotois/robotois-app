import React from 'react';

const workspaceOptions = ['Visual', 'Bloques', 'JavaScript'];

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

const Toolbar = ({ workspace, changeWorkspace }) =>
  (<div className="toolbar">
    <section className="col-4">
      <div className="dropdown">
        <button className="btn btn-action dropdown-toggle"><i className="icon icon-apps" /></button>
        <ul className="menu">
          <li className="menu-item">
            <a href="#menus">Configuración</a>
          </li>
          <li className="menu-item">
            <a href="#menus">Tablero</a>
          </li>
          <li className="menu-item">
            <a href="#menus">Tienda</a>
          </li>
        </ul>
      </div>
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
