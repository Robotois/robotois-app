import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import usedTois from './used-tois';
import currentSelection from './toi-selection';
import toiDetail from './toi-detail';
import eventList from './event-list';
import toolbar from './toolbar';
import codeEditor from './code-editor';
import kitConfig from './kit-config';
import status from './status-bar';
// import appMenu from './app-menu';

const allReducers = combineReducers({
  usedTois,
  currentSelection,
  toiDetail,
  eventList,
  toolbar,
  codeEditor,
  kitConfig,
  form: formReducer,
  status,
});

export default allReducers;
