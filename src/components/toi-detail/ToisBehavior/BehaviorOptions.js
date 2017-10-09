import React from 'react';

const BehaviorOptions = props => (
  <div className="behavior-options">
    <h6>{props.title}</h6>
    {props.children}
  </div>
);

export default BehaviorOptions;
