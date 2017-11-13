import React from 'react';

const StatusMessage = ({ message, online }) => (
  <span className={`${online ? 'status-ok' : 'status-error'}`}>
    <i className={`icon ${online ? 'icon-check' : 'icon-cross'}`} /><strong>{message || ''}</strong>
  </span>
);

const StatusBar = ({ online, message }) =>
  (<div className="status-bar">
    <StatusMessage message={message} online={online} />
  </div>);

  // {message
  //   ? <span className="status-ok">
  //     <i className="icon icon-check" />{message || ''}
  //   </span>
  //   : <span className="status-error">
  //     <i className="icon icon-cross" />{message || ''}
  //   </span>}

export default StatusBar;
