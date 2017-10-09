import React from 'react';
import { SingleInputSlider } from '../../shared/Sliders';
import BehaviorOptions from './BehaviorOptions';

const defaultBehavior = {
  action: 'motorPWM',
  params: {
    param1: 0,
  },
};

export default class MotorBehavior extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeSpeed = this.onChangeSpeed.bind(this);
    // this.changeServo = this.changeServo.bind(this);
  }

  componentWillMount() {
    this.props.handleChangeBehavior(defaultBehavior);
    this.props.handleChangeSubmodule(null);
  }

  onChangeSpeed(value) {
    const { behavior } = this.props;
    behavior.params.param1 = value;
    this.props.handleChangeBehavior(behavior);
  }

  render() {
    const { behavior: { params } } = this.props;
    return (
      <BehaviorOptions title="Configura la velocidad del motor">
        <SingleInputSlider
          title={'Velocidad: '}
          units={'%'}
          range={{ min: 0, max: 100 }}
          value={params.param1 && Number.isInteger(params.param1) ? params.param1 : 0}
          handleChange={this.onChangeSpeed}
        />
      </BehaviorOptions>
    );
  }
}
