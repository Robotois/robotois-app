import React from 'react';

const StatusBar = ({ success, text }) =>
  (<div className="status-bar">
    {success
      ? <span className="status-ok">
        <i className="icon icon-check" />{text || ''}
      </span>
      : <span className="status-error">
        <i className="icon icon-cross" />{text}
      </span>}
  </div>);

export default StatusBar;
