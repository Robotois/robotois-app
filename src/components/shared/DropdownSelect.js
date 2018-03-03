import React from "react";

export const SubmoduleSelect = ({
  fieldTitle,
  defaultTitle,
  optionList,
  selectedOption,
  handleChange
}) => (
  <div className="from-group d-flex">
    <div className="col-3">
      <label className="form-label form-label-with-combo">{fieldTitle}</label>
    </div>
    <div className="col-1" />
    <div className="col-8">
      <select
        className="form-select"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="none">{defaultTitle}</option>
        {optionList.map(option => (
          <option key={option.key} value={option.submodule}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  </div>
);
