import React from 'react';
import { Field, reduxForm } from 'redux-form';

const Option = ({ inputModule }) => (
  <option
    value={`${inputModule.type}${inputModule.instance ? `.i${inputModule.instance}` : ''}`}
  >
    {
      inputModule.hasMultiple ? `${inputModule.title} ${inputModule.instance}` : inputModule.title
    }
  </option>
);

const InputModulesSelect = ({ currentInputModules }) => {
  return (
    <form className="my-2">
      <div className="form-group">
        <Field name="inputEvent" component="select" className="form-select" style={{ fontSize: '16px' }}>
          <option value="none">Selecciona un Módulo de Entrada</option>
          {
            currentInputModules.map(inputModule =>
              <Option key={`${inputModule.type}.i${inputModule.instance}`} inputModule={inputModule} />)
          }
        </Field>
      </div>
    </form>
  );
};

export default reduxForm({ form: 'inputModuleSelect' })(InputModulesSelect);
