import React from 'react';

import LEDStatusSelect from './led-status';
import { SubmoduleSelect } from '../../shared/DropdownSelect';
import BehaviorOptions from './BehaviorOptions';

const RGBDefaultBehavior = {
  action: 'Encender',
  params: {
    param1: '#a32ce5',
  },
};

const optionList = [
  {
    key: 1,
    submodule: 'todos',
    title: 'Configurar Todos los LEDs',
  },
  {
    key: 2,
    submodule: 'led1',
    title: 'Configurar LED 1',
  },
  {
    key: 3,
    submodule: 'led2',
    title: 'Configurar LED 2',
  },
  {
    key: 4,
    submodule: 'led3',
    title: 'Configurar LED 3',
  },
  {
    key: 5,
    submodule: 'led4',
    title: 'Configurar LED 4',
  },
  {
    key: 6,
    submodule: 'led5',
    title: 'Configurar LED 5',
  },
  {
    key: 7,
    submodule: 'led6',
    title: 'Configurar LED 6',
  },
  {
    key: 8,
    submodule: 'led7',
    title: 'Configurar LED 7',
  },
];

const RGBPicker = ({ value, changeColor }) =>
  (<div className="form-group">
    <div className="col-3">
      <label className="form-label" htmlFor="color-pick">Color</label>
    </div>
    <div className="col-9">
      <input
        className="form-input"
        id="color-pick"
        type="color"
        placeholder="Selecciona el color"
        value={value}
        onChange={changeColor}
      />
    </div>
  </div>);

export default class RGBBehavior extends React.Component {
  constructor(props) {
    super(props);
    this.behaviorChange = this.behaviorChange.bind(this);
    this.changeLedNumber = this.changeLedNumber.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  componentWillMount() {
    this.props.handleChangeBehavior(RGBDefaultBehavior);
    this.props.handleChangeSubmodule('none');
  }

  componentWillReceiveProps({ inputEvent }) {
    this.ioLogAvailable(inputEvent.eventType);
  }

  ioLogAvailable(eventType) {
    const { behavior } = this.props;
    if (eventType === 'ioLog') {
      if (behavior.action !== 'EstadoBinario') {
        behavior.action = 'EstadoBinario';
        this.props.handleChangeBehavior(behavior);
      }
    } else if (behavior.action === 'EstadoBinario') {
      behavior.action = 'Encender';
      this.props.handleChangeBehavior(behavior);
    }
  }

  behaviorChange(event) {
    const { behavior } = this.props;
    behavior.action = event.target.value;
    this.props.handleChangeBehavior(behavior);
  }

  changeLedNumber(event) {
    this.props.handleChangeSubmodule(event.target.value);
  }

  changeColor(event) {
    const { behavior } = this.props;
    behavior.params.param1 = event.target.value;
    this.props.handleChangeBehavior(behavior);
  }

  render() {
    const { behavior, submodule } = this.props;
    const { inputEvent: { eventType } } = this.props;
    const { params } = behavior;
    return (
      <BehaviorOptions title="Comportamiento de los LEDs RGB">
        <SubmoduleSelect
          fieldTitle="Selecciona el LED"
          defaultTitle="Selecciona el LED a configurar"
          optionList={optionList}
          selectedOption={submodule || 'none'}
          handleChange={this.changeLedNumber}
        />
        <br />
        <RGBPicker value={params.param1 || '#a32ce5'} changeColor={this.changeColor} />
        <LEDStatusSelect
          currentAction={behavior.action}
          behaviorChange={this.behaviorChange}
          inputEventType={eventType}
        />
      </BehaviorOptions>
    );
  }
}
