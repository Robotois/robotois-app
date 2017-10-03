import React from 'react';

const Toolbar = () => (
  <div className="toolbar">
    <section className="col-4">
      <button className="btn btn-action"><i className="icon icon-apps" /></button>
      <div className="kit-status">
        <span className="online" />
        KIT conectado
      </div>
    </section>
    <section className="col-4 view-options">
      <div className="btn-group btn-group-block">
        <button className="btn">Visual</button>
        <button className="btn">Bloques</button>
        <button className="btn">JavaScript</button>
      </div>
    </section>
    <section className="col-4 run-code">
      <button className="btn btn-lg btn-primary">Ejecutar</button>
    </section>
  </div>
);

export default Toolbar;
