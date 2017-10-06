import React from 'react';
import Slider from 'rc-slider';

export const SingleInputSlider = ({ title, units, range, value, handleChange }) => (
  <div className="form-group">
    <div className="col-4">
      {title}
      <div className="toast toast-primary d-inline col-3">
        {`${value} ${units || ''}`}
      </div>
    </div>
    <div className="col-9">
      <Slider
        value={value}
        min={range.min}
        max={range.max}
        onChange={handleChange}
      />
    </div>
    <br />
  </div>
);
