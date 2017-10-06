import {
  EVENT_LIST_ADD_INSTANCE_EVENT,
  // EVENT_LIST_GET_INSTANCE,
  EVENT_LIST_REMOVE_EVENT_CASE,
  EVENT_LIST_UPDATE_INSTANCE,
  EVENT_LIST_DELETE_INSTANCE,
} from './action-types';

export const addInstanceEvent = (currentToi, inputToi, eventCase, subToi) => ({
  type: EVENT_LIST_ADD_INSTANCE_EVENT,
  currentToi,
  inputToi,
  eventCase,
  subToi,
});

export const removeEventCase = (currentToi, index, caseIndex) => ({
  type: EVENT_LIST_REMOVE_EVENT_CASE,
  currentToi,
  index,
  caseIndex,
});

export const updateInstace = (toiType, figureId, instance) => ({
  type: EVENT_LIST_UPDATE_INSTANCE,
  toiType,
  figureId,
  instance,
});

export const deleteInstance = (toiType, instance) => ({
  type: EVENT_LIST_DELETE_INSTANCE,
  toiType,
  instance,
});
