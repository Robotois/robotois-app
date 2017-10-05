import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import usedTois from './used-tois';
import currentSelection from './toi-selection';
import toiDetail from './toi-detail';
import eventList from './event-list';

const allReducers = combineReducers({
  usedTois,
  currentSelection,
  toiDetail,
  eventList,
  form: formReducer,
});

export default allReducers;
