import React from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const InputLabel = ({ className, text, value, units }) => (
  <label className={`${className}`}>
    {`${text} `}
    <div className="toast toast-primary d-inline col-3">
      {`${value} ${units}`}
    </div>
  </label>
);

const RangeLabels = ({ eventParams, units }) => (
  <div className="columns centered">
    <InputLabel
      className="column"
      text={'Valor Mínimo:'}
      value={eventParams.min}
      units={units}
    />
    <InputLabel
      className="column"
      text={'Valor Máximo'}
      value={eventParams.max}
      units={units}
    />
  </div>
);

const RangeInput = ({ units, range, inputEvent, changeEventParams }) => (
  <div>
    <div className="form-group">
      <RangeLabels eventParams={inputEvent.eventParams} units={units} />
    </div>
    <br />
    <div className="form-group">
      <Range
        value={[inputEvent.eventParams.min, inputEvent.eventParams.max]}
        min={range.min}
        max={range.max}
        onChange={changeEventParams}
      />
    </div>
  </div>
);

const SingleInput = ({ units, range, inputEvent, changeEventParams }) => (
  <div className="form-group">
    <div className="col-3">
      Valor:
      <div className="toast toast-primary d-inline col-3">
        {`${inputEvent.eventParams.valor} ${units}`}
      </div>
      {/* <InputLabel text={'Valor:'} value={inputEvent.eventParams.value} units={units} /> */}
    </div>
    <div className="column col-9">
      <Slider
        value={inputEvent.eventParams.valor}
        min={range.min}
        max={range.max}
        onChange={changeEventParams}
      />
    </div>
    <br />
  </div>
);

const InputFields = ({ units, range, inputEvent, changeEventParams }) => {
  if (inputEvent.eventType === 'none') {
    return null;
  }

  const { inputField } = inputEvent;
  switch (inputField) {
    case 'Number':
      return (<SingleInput
        units={units}
        range={range}
        inputEvent={inputEvent}
        changeEventParams={changeEventParams}
      />);
    case 'NumberRange':
      return (<RangeInput
        units={units}
        range={range}
        inputEvent={inputEvent}
        changeEventParams={changeEventParams}
      />);
    default:
      return null;
  }
};

export default class SensorsEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.changeEventParams = this.changeEventParams.bind(this);
  }

  changeEventParams(value) {
    if (!Array.isArray(value)) {
      this.props.handleChangeEventParams({ valor: value });
    } else {
      this.props.handleChangeEventParams({ min: value[0], max: value[1] });
    }
  }

  render() {
    const { inputEvent } = this.props;
    const { units } = this.props;
    const { range } = this.props;
    // console.log(inputEvent);
    return (
      <InputFields
        units={units}
        range={range}
        inputEvent={inputEvent}
        changeEventParams={this.changeEventParams}
      />
    );
  }
}
