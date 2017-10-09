import React from 'react';
import InputToisSelect from './input-select';
import ToiEvents from './toi-events';
import EventConfig from './EventConfig/EventConfig';

const ToiImg = ({ isShield, src }) => (
  <div className="centered" style={{ width: isShield ? '90%' : '40%' }}>
    <img src={src} alt="Imagen del Componente" className="img-responsive" />
  </div>
);

const ToiDescription = ({ toi, isShield, hasMultiple }) => (
  <div>
    <div className="tile-title">
      {
        `${toi.title} ${hasMultiple ? toi.instance : ''}`
      }
    </div>
    {
      isShield ?
        <ToiImg isShield={isShield} src="img/tois/shield-robotois.svg" /> :
        <ToiImg isShield={isShield} src={toi.image} />
    }
    <div className="tile-subtitle my-2">
      {toi.description}
    </div>
  </div>
);

class ToiDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeInputToi = this.handleChangeInputToi.bind(this);
    this.handleResetSelected = this.handleResetSelected.bind(this);
    this.fromToiEvent = this.fromToiEvent.bind(this);
  }

  handleChangeInputToi(ev) {
    const { currentInputTois, changeSelectedToi, changeInputToi } = this.props;
    changeSelectedToi(ev.target.value);
    if (ev.target.value !== 'none') {
      const inputToi =
        currentInputTois.find(
          module => `${module.type}.i${module.instance}` === ev.target.value,
        );
      changeInputToi(inputToi);
    }
  }

  handleResetSelected() {
    const { changeSelectedToi } = this.props;
    changeSelectedToi('none');
  }

  fromToiEvent(index) {
    const { currentToi, removeEventCase } = this.props;
    return caseIndex => () => removeEventCase(currentToi, index, caseIndex);
  }

  render() {
    const {
      currentToi,
      hasMultiple,
      currentInputTois,
      selectedToi,
      inputToi,
      addInstanceEvent,
      toiEvents,
    } = this.props;
    // console.log('toiEvents:', toiEvents);
    const instanceStr =
      hasMultiple ? `${currentToi.title} ${currentToi.instance}` : undefined;
    return (
      <div className="toi-detail">
        <div className="tile-content">
          {
            currentToi && <ToiDescription
              toi={currentToi}
              isShield={currentToi.type === 'shield'}
              hasMultiple={hasMultiple}
            />
          }
          {
            currentInputTois && <InputToisSelect
              currentInputTois={currentInputTois}
              selectedToi={selectedToi}
              changeSelectedToi={this.handleChangeInputToi}
            />
          }
          {
            selectedToi !== 'none' && <EventConfig
              inputToi={inputToi}
              currentToi={currentToi}
              handleResetSelected={this.handleResetSelected}
              addInstanceEvent={addInstanceEvent}
            />
          }
          {
            toiEvents && <ToiEvents
              instanceStr={instanceStr}
              toiEvents={toiEvents}
              fromToiEvent={this.fromToiEvent}
            />
          }
        </div>
      </div>
    );
  }
}

export default ToiDetail;
