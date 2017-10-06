import { TOOLBAR_CHANGE_WORKSPACE } from '../actions/action-types';

const initialState = {
  kitStatus: false,
  workspace: 'Visual',
};

const toolbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOOLBAR_CHANGE_WORKSPACE:
      return {
        ...state,
        workspace: action.workspace,
      };
    default:
      return state;
  }
};

export default toolbarReducer;
