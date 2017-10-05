import React from 'react';
// import { SubmoduleSelect } from '../Shared/DropdownSelect';
import { SingleInputSlider } from '../../shared/Sliders';

const defaultBehavior = {
  action: 'setAngle',
  params: {
    param1: 0,
  }
};

const BehaviorOptions = props => (
  <div>
    <h4>{props.title}</h4>
    {props.children}
  </div>
);

export default class ServoBehavior extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeAngle = this.onChangeAngle.bind(this);
  }

  componentWillMount() {
    this.props.handleChangeBehavior(defaultBehavior);
    this.props.handleChangeSubmodule(null);
  }

  onChangeAngle(value) {
    const { behavior } = this.props;
    behavior.params.param1 = value;
    this.props.handleChangeBehavior(behavior);
  }

  render() {
    const { behavior: { params } } = this.props;
    // console.log('Value: ', params.param1);
    return (
      <BehaviorOptions title="Configura la posición del Servomotor" >
        {/* <SubmoduleSelect
          fieldTitle="Selecciona el Servo"
          defaultTitle="Selecciona el Servo a configurar"
          optionList={optionList}
          selectedOption={submodule || 'none'}
          handleChange={this.changeServo}
        /> */}
        {/* <br /> */}
        <SingleInputSlider
          title={'Ángulo: '}
          // units={''}
          range={{ min: -90, max: 90 }}
          value={params.param1 && Number.isInteger(params.param1) ? params.param1 : 0}
          handleChange={this.onChangeAngle}
        />
      </BehaviorOptions>
    );
  }
}
