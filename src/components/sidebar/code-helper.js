import React from 'react';

const CodeHelper = ({ eventList, usedTois, generateCode, resetCodeEditor }) => (
  <div
    className="panel mx-2"
    style={{
      backgroundColor: 'white',
      marginTop: '4rem',
    }}
  >
    <div className="panel-header">
      <div className="panel-title h4">Generar código JavaScript</div>
    </div>
    <div className="panel-body h6">
      En esta sección se puede generar el código que corresponde a los eventos configurados
      en el editor visual.
    </div>
    <div className="panel-footer text-right">
      <button className="btn btn-link" onClick={resetCodeEditor}>RESET</button>
      <button className="btn btn-primary" onClick={generateCode(eventList, usedTois)}>Generar Código</button>
    </div>
  </div>
);

export default CodeHelper;
