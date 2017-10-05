import React from 'react';
// import { Field, reduxForm } from 'redux-form';

const Option = ({ inputToi }) => (
  <option
    value={`${inputToi.type}${inputToi.instance ? `.i${inputToi.instance}` : ''}`}
  >
    {
      inputToi.hasMultiple ? `${inputToi.title} ${inputToi.instance}` : inputToi.title
    }
  </option>
);

const InputToisSelect = ({ currentInputTois, selectedToi, changeSelectedToi }) => {
  return (
    <div className="from-group my-2">
      <select
        className="form-select"
        id="select-event"
        value={selectedToi}
        onChange={changeSelectedToi}
        style={{ fontSize: '16px' }}
      >
        <option value="none">Selecciona un Módulo de Entrada</option>
        {currentInputTois.map(inputToi => (
          <Option key={`${inputToi.type}.i${inputToi.instance}`} inputToi={inputToi} />)
        )}
      </select>
    </div>
  );
};

export default InputToisSelect;
