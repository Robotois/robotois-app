import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { multiModules } from '../shared/items-by-function';

const Option = ({ inputModule }) => (
  <option
    key={`${inputModule.key}.i${inputModule.instance}`}
    value={`${inputModule.type}${inputModule.instance ? `.i${inputModule.instance}` : ''}`}
  >
    {
      `${inputModule.title} ${inputModule.instance}`
    }
  </option>
);

// {
//   multiModules(inputModule.type) ? `${inputModule.title} ${inputModule.instance}` : inputModule.title
// }

const InputModulesSelect = ({ currentInputModules }) => {
  // console.log("Here!!");
  // return false;
  return (
    <form>
      <Field name="inputEvent" component="select">
        <option value="none">Selecciona un Módulo de Entrada</option>
        {
          currentInputModules.map(inputModule => <Option inputModule={inputModule} />)
        }
      </Field>
    </form>
  );
};

export default reduxForm({ form: 'inputModuleSelect' })(InputModulesSelect);
