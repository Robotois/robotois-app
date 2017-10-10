import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import App from './components/app';
import Draw2dContainer from './containers/draw2d-container';

ReactDOM.render((
  <Provider store={store}>
    <div id="provider">
      <Draw2dContainer />
      <App />
    </div>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
