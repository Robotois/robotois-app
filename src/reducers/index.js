import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import usedTois from './used-tois';

const allReducers = combineReducers({
  usedTois,
  form: formReducer,
});

export default allReducers;
