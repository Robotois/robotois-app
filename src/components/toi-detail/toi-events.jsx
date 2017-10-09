import React from 'react';
import Enums from '../../utils/Enums';

const paramsString = (eventParams) => {
  if (!eventParams) {
    return '';
  }

  const strVect = Object.keys(eventParams).map(
    key => `"${key}: ${
      eventParams[key] ? eventParams[key] : ''
    }"`,
  );
  return strVect.join(' - ');
};

const paramStr = param => (Number.isInteger(param) ? param : `"${param}"`);

const behaviorParamsStr = (params) => {
  const strVect = Object.keys(params).map(
    key => (params[key] ? paramStr(params[key]) : ''),
  );
  return strVect.join(', ');
};

const BehaviorString = ({ behavior }) => {
  const paramsStr = behaviorParamsStr(behavior.params);
  const hasColor = paramsStr.match(/(#[a-f0-9]{6})/gi);
  return (
    <p>
      {` => ${behavior.action}(`}
      {
        hasColor ?
          <b style={{ color: hasColor[0], fontSize: '20px' }}>
            &#9724;
          </b>
          :
          paramsStr
      }
      {')'}
    </p>
  );
};

const EventCase = ({ eventCase, index, removeEventCase }) => (
  <div>
    <div className="divider" />
    <li className="menu-item columns">
      <div className="col-9">
        <b>
          {`${eventCase.menuText} ${paramsString(eventCase.eventParams)}\n`}
        </b>
        <br />
        <BehaviorString behavior={eventCase.behavior} />
      </div>
      <div className="col-3">
        <button
          className="btn btn-clear float-right tooltip"
          data-tooltip="Eliminar"
          onClick={removeEventCase}
        />
      </div>
    </li>
  </div>
);

const InputEvents = ({ toiEvent, removeEventCase, instance }) => (
  <ul className="menu">
    <li className="menu-item">
      <h6>
        {toiEvent.submodule ? <mark>{`[${toiEvent.submodule}]`}</mark> : ''}
        <strong>{` ${
          toiEvent.hasMultiple ?
            `${Enums[toiEvent.inputModule.type]} ${toiEvent.inputModule.instance}` :
            Enums[toiEvent.inputModule.type]
        }`}</strong>
      </h6>
    </li>
    {
      toiEvent.events.map((eventCase, caseIndex) =>
        <EventCase
          key={`${eventCase.eventType}-${JSON.stringify(eventCase.eventParams)}`}
          eventCase={eventCase}
          removeEventCase={removeEventCase(caseIndex)}
        />)
    }
  </ul>
);

const ToiEvents = ({ toiEvents, fromToiEvent, instance }) => (
  <div>
    <br />
    <h4 className="tile-subtitle">Eventos Configurados</h4>
    {toiEvents.map((toiEvent, evIndex) => (
      <InputEvents
        toiEvent={toiEvent}
        removeEventCase={fromToiEvent(evIndex)}
        instance={instance}
        key={`${toiEvent.submodule ? toiEvent.submodule : ''}-${toiEvent.inputModule.type}`}
      />
    ))}
  </div>
);

export default ToiEvents;
