import { TOOLBAR_CHANGE_WORKSPACE } from './action-types';

export const toolbarChangeWorkspace = (workspace) => ({
  type: TOOLBAR_CHANGE_WORKSPACE,
  workspace,
});
