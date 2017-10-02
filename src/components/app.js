import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ToisContainer from '../containers/tois-list-conatiner';
import Layout from './layout';
import MainPanel from './main-panel/main-panel';

const App = () => (
  <Layout>
    <ToisContainer />
    <MainPanel />
  </Layout>
);

export default DragDropContext(HTML5Backend)(App);
