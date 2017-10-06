import { connect } from 'react-redux';
import ToiDetail from '../components/toi-detail/toi-detail';
import { getCurrentToi } from '../reducers/toi-selection';
import { getInputModules, multipleInstances } from '../reducers/used-tois';
import { isEventListener } from '../components/shared/tois-by-function';
import { changeInputToiSelection, changeInputToi } from '../actions';
import { addInstanceEvent, removeEventCase } from '../actions/event-list';
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
  });
};

const mapDispatchToProps = dispatch => ({
  changeSelectedToi: toi => dispatch(changeInputToiSelection(toi)),
  changeInputToi: toi => dispatch(changeInputToi(toi)),
  addInstanceEvent: (currentToi, inputToi, eventCase, subToi) =>
    dispatch(addInstanceEvent(currentToi, inputToi, eventCase, subToi)),
  removeEventCase: (currentToi, index, caseIndex) =>
    dispatch(removeEventCase(currentToi, index, caseIndex)),
});

const ToiDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToiDetail);

export default ToiDetailContainer;
