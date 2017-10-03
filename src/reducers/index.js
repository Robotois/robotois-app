import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import usedTois from './used-tois';
import currentSelection from './toi-selection';
import sidebar from './sidebar';

const allReducers = combineReducers({
  usedTois,
  currentSelection,
  sidebar,
  form: formReducer,
});

export default allReducers;
