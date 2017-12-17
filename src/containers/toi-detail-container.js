import { connect } from 'react-redux';
import ToiDetail from '../components/toi-detail/toi-detail';
import { getCurrentToi } from '../reducers/toi-selection';
import { getInputModules, multipleInstances, deleteUsedToi } from '../reducers/used-tois';
import { updateUsedTois } from '../actions/used-tois-actions';
import { isEventListener } from '../components/shared/tois-by-function';
import { changeInputToiSelection, changeInputToi } from '../actions';
import { addInstanceEvent, removeEventCase, deleteInstance, updateInstace } from '../actions/event-list';
import { getInstance } from '../reducers/event-list';

const getToiEvents = (usedTois, eventList, toiType, toiInstance) => {
  const toiEventsInstance = getInstance(eventList, toiType, toiInstance);
  return toiEventsInstance ?
    toiEventsInstance.toiEvents.map(toiEvent =>
      ({ ...toiEvent, hasMultiple: multipleInstances(usedTois, toiEvent.inputModule.type) }),
    ) :
    undefined;
};

const mapStateToProps = ({
  currentSelection,
  usedTois,
  toiDetail: { selectedToi, inputToi },
  eventList,
}) => {
  const currentToi = getCurrentToi(currentSelection, usedTois);
  const hasMultiple = currentToi && multipleInstances(usedTois, currentToi.type);
  const currentInputTois = currentToi && isEventListener(currentToi.type) ?
    getInputModules(usedTois) :
    undefined;
  const toiEvents = currentToi ?
    getToiEvents(usedTois, eventList, currentToi.type, currentToi.instance) :
    undefined;

  // const inputToi = selectedToi !== 'none' ? selectedToi : undefined;
  return ({
    currentToi,
    hasMultiple,
    currentInputTois,
    selectedToi,
    inputToi,
    toiEvents,
    usedTois,
  });
};

const mapDispatchToProps = (dispatch) => {
  const updtInstance = (toiType, figureId, instance) =>
    dispatch(updateInstace(toiType, figureId, instance));
  return {
    changeSelectedToi: toi => dispatch(changeInputToiSelection(toi)),
    changeInputToi: toi => dispatch(changeInputToi(toi)),
    addInstanceEvent: (currentToi, inputToi, eventCase, subToi) =>
      dispatch(addInstanceEvent(currentToi, inputToi, eventCase, subToi)),
    removeEventCase: (currentToi, index, caseIndex) =>
      dispatch(removeEventCase(currentToi, index, caseIndex)),
    // updateInstace: updtInstance,
    deleteInstance: (toiType, instance) => dispatch(deleteInstance(toiType, instance)),
    deleteToi: usedTois => (figureId, itemType) =>
      dispatch(updateUsedTois(deleteUsedToi(usedTois, figureId, itemType, updtInstance))),
  };
};

const ToiDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToiDetail);

export default ToiDetailContainer;
