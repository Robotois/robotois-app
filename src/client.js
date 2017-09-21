import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
// import createHistory from 'history/createHashHistory';
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-icons.min.css';
import 'spectre.css/dist/spectre-exp.min.css';
import Routes from './routes';

// const history = createHistory();

ReactDOM.render((
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
), document.getElementById('app'));

// ReactDOM.render(<AppContainer />, document.getElementById('app'));
