import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import { Redirect } from 'react-router';
// import { BrowserRouter } from 'react-router-dom';
// import createHistory from 'history/createHashHistory';
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-icons.min.css';
import 'spectre.css/dist/spectre-exp.min.css';
import './assets/css/robotois.css';
// import '../dist/compatibility/index';
import reducers from './reducers';
import App from './components/app';

// ReactDOM.render((
//   <BrowserRouter>
//     <Routes />
//   </BrowserRouter>
// ), document.getElementById('app'));

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'));
// ReactDOM.render(<AppContainer />, document.getElementById('app'));
