import React from 'react';
import { Field, reduxForm } from 'redux-form';

const SearchForm = () => (
  <form >
    <div className="has-icon-left mt-2">
      <Field
        className="form-input input-lg search-input"
        name="task"
        component="input"
        type="text"
        placeholder="Buscar Componente"
      />
      <i className="form-icon icon icon-search" />
    </div>
  </form>
);

export default reduxForm({ form: 'task' })(SearchForm);
