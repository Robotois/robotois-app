import React from 'react';
import AlertContainer from 'react-alert';

const alertOptions = {
  offset: 25,
  position: 'bottom right',
  theme: 'dark',
  time: 5000,
  transition: 'scale',
};
// const alerts = window.alerts

const Alerts = () => (
  <AlertContainer ref={a => window.msg = a} {...alertOptions} />
);

export default Alerts;
