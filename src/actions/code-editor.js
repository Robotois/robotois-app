import { CODE_EDITOR_APPEND_CODE, CODE_EDITOR_CHANGE_CODE } from './action-types';

export const codeEditorAppendCode = code => ({
  type: CODE_EDITOR_APPEND_CODE,
  code,
});

export const codeEditorChangeCode = code => ({
  type: CODE_EDITOR_CHANGE_CODE,
  code,
});
