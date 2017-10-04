import React from 'react';

export const SubmoduleSelect = ({
  fieldTitle,
  defaultTitle,
  optionList,
  selectedOption,
  handleChange
}) => (
  <div className="from-group flex">
    <div className="col-3">
      <label className="form-label">{fieldTitle}</label>
    </div>
    <div className="col-9">
      <select
        className="form-input"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="none">{defaultTitle}</option>
        {optionList.map(option =>
          <option key={option.key} value={option.submodule}>{option.title}</option>
        )}
      </select>
    </div>
  </div>
);
