import React from 'react';

import { Modal, ModalHeader, ModalFooter } from './EventConfigModal';
import EventConfigForm from './EventConfigForm';
// import addInstanceEvent from './manage-events';
import { isLogger } from '../../shared/tois-by-function';

const defaultInputEvent = {
  inputEvent: {
    eventType: 'none',
  },
};

const defaultBehavior = {
  behavior: {
    action: '',
    params: {
      param1: null,
    },
  },
};

export default class EventConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...defaultInputEvent,
      ...defaultBehavior,
      submodule: null,
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChangeInputEvent = this.handleChangeInputEvent.bind(this);
    this.handleChangeEventParams = this.handleChangeEventParams.bind(this);
    this.handleChangeSubmodule = this.handleChangeSubmodule.bind(this);
    this.handleChangeBehavior = this.handleChangeBehavior.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.getButtonStatus = this.getButtonStatus.bind(this);
  }

  getButtonStatus() {
    const { inputEvent: { eventType } } = this.state;
    const { behavior: { params: { param1 } } } = this.state;
    const { submodule } = this.state;
    return eventType !== 'none' && param1 !== '' && (submodule ? submodule !== 'none' : true);
  }

  handleChangeInputEvent(event) {
    const { inputToi, currentToi } = this.props;
    const eventType = event.target.value;

    if (eventType === 'none') {
      this.setState({
        ...defaultInputEvent,
      });
    } else {
      const inputEvent = inputToi.events.find(ev => ev.eventType === eventType);
      this.setState({
        inputEvent,
      });
      if ((eventType === 'log' || eventType === 'ioLog') && isLogger(currentToi.type)) {
        const { behavior } = this.state;
        behavior.params.param1 = inputEvent.behavior.params.param1;
        this.setState({ behavior });
      }
    }
  }

  handleChangeEventParams(eventParams) {
    const { inputEvent } = this.state;
    inputEvent.eventParams = eventParams;
    this.setState({ inputEvent });
  }

  handleChangeSubmodule(submodule) {
    this.setState({ submodule });
  }

  handleChangeBehavior(behavior) {
    this.setState({
      behavior,
    });
  }

  handleCloseModal() {
    this.setState({
      ...defaultInputEvent,
    });
    this.props.onCloseModal();
  }

  handleAddEvent() {
    const { inputToi, currentToi, addInstanceEvent } = this.props;
    const { inputEvent, behavior, submodule } = this.state;
    const eventCase = { ...inputEvent, behavior: { action: behavior.action, params: { ...behavior.params } } };
    addInstanceEvent(currentToi, inputToi, eventCase, submodule);
  }

  render() {
    const { inputToi, currentToi, handleResetSelected } = this.props;
    const { inputEvent, behavior, submodule } = this.state;
    const buttonStatus = this.getButtonStatus();
    // console.log(inputToi);
    return (
      <Modal modalStatus={'active'}>
        <ModalHeader
          handleCloseModal={handleResetSelected}
          title={inputToi.title}
          icon={inputToi.image}
        />
        <EventConfigForm
          inputToi={inputToi}
          inputEvent={inputEvent}
          toiType={currentToi.type}
          behavior={behavior}
          submodule={submodule}
          handleChangeBehavior={this.handleChangeBehavior}
          handleChangeInputEvent={this.handleChangeInputEvent}
          handleChangeEventParams={this.handleChangeEventParams}
          handleChangeSubmodule={this.handleChangeSubmodule}
        />
        <ModalFooter>
          <button className="btn btn-link" onClick={handleResetSelected}>Cerrar</button>
          <button
            className={`btn btn-primary ${buttonStatus ? '' : 'disabled'}`}
            onClick={this.handleAddEvent}
          >
            Agregar Evento
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}
