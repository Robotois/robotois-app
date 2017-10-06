import React from 'react';
import { isSensor, isLogger, isIoLogger } from '../../shared/tois-by-function';
import LedBehavior from '../ToisBehavior/LedBehavior';
import LCDBehavior from '../ToisBehavior/LCDBehavior';
import RGBBehavior from '../ToisBehavior/RGBBehavior';
import RelayBehavior from '../ToisBehavior/relay-behavior';
import ServosBehavior from '../ToisBehavior/servos-behavior';
import ServoBehavior from '../ToisBehavior/servo-behavior';
import MotorBehavior from '../ToisBehavior/motor-behavior';

import SensorEventForm from '../EventConfig/SensorEventForm';

const getInputEventForm = (inputToi) => {
  if (isSensor(inputToi)) {
    return SensorEventForm;
  }
  return null;
};

const behaviorMap = {
  led: LedBehavior,
  lcd: LCDBehavior,
  ledRGB: RGBBehavior,
  relay: RelayBehavior,
  servosConnector: ServosBehavior,
  servo: ServoBehavior,
  motor: MotorBehavior,
};

const InputEventsDropdown = ({ inputEvent, toiType, events, title, handleChangeInputEvent }) => (
  <div className="from-group d-flex">
    <div className="col-3">
      <label className="form-label">Evento de Entrada</label>
    </div>
    <div className="col-9">
      <select
        className="form-select"
        value={inputEvent.eventType}
        onChange={handleChangeInputEvent}
      >
        <option value="none">Selecciona el evento del {title}</option>
        {events.map((ev) => {
          switch (ev.eventType) {
            case 'log':
              if (isLogger(toiType)) {
                return <option key={ev.key} value={ev.eventType}>{ev.menuText}</option>;
              }
              return null;
            case 'ioLog':
              if (isIoLogger(toiType)) {
                return <option key={ev.key} value={ev.eventType}>{ev.menuText}</option>;
              }
              return null;
            default:
          }
          return <option key={ev.key} value={ev.eventType}>{ev.menuText}</option>;
        })}
      </select>
    </div>
  </div>
);

const EventConfigForm = ({
  inputToi,
  inputEvent,
  toiType,
  behavior,
  submodule,
  handleChangeInputEvent,
  handleChangeEventParams,
  handleChangeBehavior,
  handleChangeSubmodule
}) => {
  const BehaviorForm = behaviorMap[toiType];
  // console.log('toiType: ', toiType);
  const InputEventForm = getInputEventForm(inputToi.type);
  return (
    <div className="col-11 centered">
      <form className="form-horizontal">
        <BehaviorForm
          behavior={behavior}
          submodule={submodule}
          inputEvent={inputEvent}
          handleChangeBehavior={handleChangeBehavior}
          handleChangeSubmodule={handleChangeSubmodule}
        />
        <br />
        <div className="divider" />
        <h4>Configurar Eventos</h4>
        <InputEventsDropdown
          inputEvent={inputEvent}
          toiType={toiType}
          events={inputToi.events}
          title={inputToi.title}
          handleChangeInputEvent={handleChangeInputEvent}
        />
        <br />
        {
          InputEventForm && <InputEventForm
            units={inputToi.units}
            range={inputToi.range}
            inputEvent={inputEvent}
            handleChangeEventParams={handleChangeEventParams}
          />
        }
        <br />
        <div className="divider" />
      </form>
    </div>
  );
};

export default EventConfigForm;
