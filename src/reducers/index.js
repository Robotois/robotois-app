import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import usedTois from './used-tois';
import currentSelection from './toi-selection';

const allReducers = combineReducers({
  usedTois,
  currentSelection,
  form: formReducer,
});

export default allReducers;
