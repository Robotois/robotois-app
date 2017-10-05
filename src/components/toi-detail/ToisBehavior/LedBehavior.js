import React from 'react';
import LEDStatusSelect from './led-status';

const defaultBehavior = {
  action: 'Encender',
  params: {
    param1: null,
  }
};

const BehaviorOptions = props => (
  <div>
    <h4>{props.title}</h4>
    {props.children}
  </div>
);

export default class LedBehavior extends React.Component {
  constructor(props) {
    super(props);
    this.behaviorChange = this.behaviorChange.bind(this);
    this.ioLogAvailable = this.ioLogAvailable.bind(this);
  }

  componentWillMount() {
    this.props.handleChangeBehavior(defaultBehavior);
    this.props.handleChangeSubmodule(null);
  }

  componentWillReceiveProps({ inputEvent }) {
    // console.log(inputEvent);
    this.ioLogAvailable(inputEvent.eventType);
  }

  behaviorChange(event) {
    const { behavior } = this.props;
    behavior.action = event.target.value;
    this.props.handleChangeBehavior(behavior);
  }

  ioLogAvailable(eventType) {
    const { behavior } = this.props;
    if (eventType === 'ioLog') {
      if (behavior.action !== 'EstadoBinario') {
        behavior.action = 'EstadoBinario';
        this.props.handleChangeBehavior(behavior);
      }
    } else {
      if (behavior.action === 'EstadoBinario') {
        behavior.action = 'Encender';
        this.props.handleChangeBehavior(behavior);
      }
    }
  }

  render() {
    const { behavior } = this.props;
    const { inputEvent: { eventType } } = this.props;
    // this.ioLogAvailable(eventType);

    return (
      <BehaviorOptions title="Selecciona el comportamiento del LED" >
        <LEDStatusSelect
          currentAction={behavior.action}
          behaviorChange={this.behaviorChange}
          inputEventType={eventType}
        />
      </BehaviorOptions>
    );
  }
}
