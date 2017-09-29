import React from 'react';
// import { Link } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ToisContainer from '../containers/tois-conatiner';
import Layout from './layout';

const MainContent = () => (
  <div className="column">
    <ul className="tab tab-block">
      <li className="tab-item active">
        <a href="#">Editor</a>
      </li>
      <li className="tab-item">
        <a href="#">Código</a>
      </li>
      <li className="tab-item">
        <a href="#">Bloques</a>
      </li>
    </ul>
  </div>
)

const App = props => (
  <Layout>
    <ToisContainer />
    <MainContent />
  </Layout>
);

export default DragDropContext(HTML5Backend)(App);
