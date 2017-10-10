import React from 'react';
import { SubmoduleSelect } from '../../shared/DropdownSelect';
import { SingleInputSlider } from '../../shared/Sliders';
import BehaviorOptions from './BehaviorOptions';

const defaultBehavior = {
  action: 'setAngle',
  params: {
    param1: 0,
  },
};

const optionList = [
  {
    key: 2,
    submodule: 'servo1',
    title: 'Configurar Servo 1',
  },
  {
    key: 3,
    submodule: 'servo2',
    title: 'Configurar Servo 2',
  },
  {
    key: 4,
    submodule: 'servo3',
    title: 'Configurar Servo 3',
  },
];

export default class ServoBehavior extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeAngle = this.onChangeAngle.bind(this);
    this.changeServo = this.changeServo.bind(this);
  }

  componentWillMount() {
    this.props.handleChangeBehavior(defaultBehavior);
    this.props.handleChangeSubmodule('none');
  }

  onChangeAngle(value) {
    const { behavior } = this.props;
    behavior.params.param1 = value;
    this.props.handleChangeBehavior(behavior);
  }

  changeServo(event) {
    this.props.handleChangeSubmodule(event.target.value);
  }

  render() {
    const { behavior, submodule } = this.props;

    return (
      <BehaviorOptions title="Configura la posición del Servomotor">
        <SubmoduleSelect
          fieldTitle="Selecciona el Servo"
          defaultTitle="Selecciona el Servo a configurar"
          optionList={optionList}
          selectedOption={submodule || 'none'}
          handleChange={this.changeServo}
        />
        <br />
        <SingleInputSlider
          units={'°'}
          range={{ min: 0, max: 180 }}
          value={behavior.params.param1}
          handleChange={this.onChangeAngle}
        />
      </BehaviorOptions>
    );
  }
}
