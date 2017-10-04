import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-icons.min.css';
import 'spectre.css/dist/spectre-exp.min.css';
import './assets/css/robotois.less';
import reducers from './reducers';
import App from './components/app';
import Draw2dContainer from './containers/draw2d-container';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), //eslint-disable-line
);

ReactDOM.render((
  <Provider store={store}>
    <div>
      <Draw2dContainer />
      <App />
    </div>
  </Provider>
), document.getElementById('app'));
