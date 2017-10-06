import React from 'react';

const RadioButton = ({ action, title, currentAction, behaviorChange, disabled }) => (
  <label className="form-radio">
    <input
      disabled={disabled}
      type="radio"
      value={action}
      name="gender"
      checked={currentAction === action}
      onChange={behaviorChange}
    />
    <i className="form-icon" /> {title}
  </label>
);

const LEDStatusSelect = ({ currentAction, behaviorChange, inputEventType }) => (
  <div className="form-group">
    <div className="col-3">
      <label className="form-label">Acción</label>
    </div>
    <div className="col-9">
      <RadioButton
        disabled={inputEventType === 'ioLog'}
        action="Encender"
        title="Encender"
        currentAction={currentAction}
        behaviorChange={behaviorChange}
      />
      <RadioButton
        disabled={inputEventType === 'ioLog'}
        action="Parpadear"
        title="Parpadear"
        currentAction={currentAction}
        behaviorChange={behaviorChange}
      />
      {
        inputEventType === 'ioLog' && <RadioButton
          disabled={false}
          action="EstadoBinario"
          title="Estado Binario"
          currentAction={currentAction}
          behaviorChange={behaviorChange}
        />
      }
    </div>
  </div>
);

export default LEDStatusSelect;
