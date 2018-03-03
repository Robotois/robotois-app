import React from 'react';

export const defaultBehavior = {
  action: 'message',
  params: {
    param1: 'Hola Mundo',
  },
};

const HelpPopOver = () =>
  (<div className="popover popover-right">
    <span className="badge popover popover-right" data-badge="?">{' '}</span>
    <div className="popover-container">
      <div className="card">
        <div className="card-header">
          <div className="card-title">Ayuda del LCD</div>
        </div>
        <div className="card-body">
          <dl>
            <dt>Sensores</dt>
            <dd>
              Para mostrar la medición de un sensor
              se debe incluir el código <code>{'${value}'}</code>
            </dd>
            <dt>Estados Digitales</dt>
            <dd>
              Para mostrar el estado binario <mark>(ON|OFF)</mark> de una entrada
              digital se debe incluir el código <code>{'${status}'}</code>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>);

const BehaviorForm = props =>
  (<div>
    <div className="flex">
      <h4>{props.title}</h4>
      <br/>
    </div>
    {props.children}
  </div>);

const TextField = ({ value, changeText }) =>
  (<div className="form-group">
    <div className="col-3 with-help-pop-over">
      <label className="form-label">Texto a mostrar</label>
      <HelpPopOver />
    </div>
    <div className="col-1" />
    <div className="col-8">
      <textarea
        className="form-input"
        style={{ fontFamily: 'consolas', fontSize: '18px' }}
        placeholder="Edita el Texto"
        rows={2}
        cols={16}
        value={value}
        onChange={changeText}
      />
    </div>
  </div>);

export default class LCDBehavior extends React.Component {
  constructor(props) {
    super(props);
    this.changeText = this.changeText.bind(this);
  }

  componentWillMount() {
    this.props.handleChangeBehavior(defaultBehavior);
    this.props.handleChangeSubmodule(null);
  }

  changeText(event) {
    const { behavior } = this.props;
    behavior.params.param1 = event.target.value;
    this.props.handleChangeBehavior(behavior);
  }

  render() {
    const { behavior: { params: { param1 } } } = this.props;
    // console.log(param1);
    return (
      <BehaviorForm title="Configurar Display LCD">
        <TextField value={param1 || ''} changeText={this.changeText} />
      </BehaviorForm>
    );
  }
}
