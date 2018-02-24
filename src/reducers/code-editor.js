import { CODE_EDITOR_APPEND_CODE, CODE_EDITOR_CHANGE_CODE } from '../actions/action-types';

const initialState = {
  code: '// En este editor puedes modificar tu código',
};

const codeEditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CODE_EDITOR_APPEND_CODE:
      return {
        ...state,
        code: `// En este editor puedes modificar tu código \n ${action.code}`, // state.code.concat('\n', action.code),
      };
    case CODE_EDITOR_CHANGE_CODE:
      return {
        ...state,
        code: action.code,
      };
    default:
      return state;
  }
};

export default codeEditorReducer;
