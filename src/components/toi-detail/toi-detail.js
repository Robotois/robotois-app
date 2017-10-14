import React from 'react';
import InputToisSelect from './input-select';
import ToiEvents from './toi-events';
import EventConfig from './EventConfig/EventConfig';

const ToiImg = ({ isShield, src }) =>
  (<img
    src={src}
    alt="Imagen del Componente"
    className="img-responsive"
    style={{ width: isShield ? '90%' : 64, marginRight: isShield ? 0 : '2em' }}
  />);

const ToiDescription = ({ toi, isShield, hasMultiple, children }) =>
  (<div className="card">
    <div className="card-header">
      <div className="card-title h5">{`${toi.title} ${hasMultiple ? toi.instance : ''}`}</div>
      <div className="card-subtitle text-gray">Componente de tipo actuador</div>
      <div className="card-image">
        {isShield
          ? <ToiImg
            isShield={isShield}
            src="img/tois/shield-robotois.svg"
            className="img-responsive"
          />
          : <ToiImg isShield={isShield} src={toi.image} className="img-responsive" />}
      </div>
    </div>
    <div className="card-body">
      {toi.description}
    </div>
    <div className="card-footer">
      {children}
    </div>
  </div>);

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
      const inputToi = currentInputTois.find(
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
    const instanceStr = hasMultiple ? `${currentToi.title} ${currentToi.instance}` : undefined;
    return (
      <div className="toi-detail">
        <div className="tile-content">
          {currentToi &&
            <ToiDescription
              toi={currentToi}
              isShield={currentToi.type === 'shield'}
              hasMultiple={hasMultiple}
            >
              {currentInputTois &&
                <InputToisSelect
                  currentInputTois={currentInputTois}
                  selectedToi={selectedToi}
                  changeSelectedToi={this.handleChangeInputToi}
                />}
              {toiEvents &&
                <ToiEvents
                  instanceStr={instanceStr}
                  toiEvents={toiEvents}
                  fromToiEvent={this.fromToiEvent}
                />}
            </ToiDescription>}
          {selectedToi !== 'none' &&
            <EventConfig
              inputToi={inputToi}
              currentToi={currentToi}
              handleResetSelected={this.handleResetSelected}
              addInstanceEvent={addInstanceEvent}
            />}
        </div>
      </div>
    );
  }
}

export default ToiDetail;
