import React from 'react';

export default class Dialog extends React.Component {
  state = {
    value: this.props.value,
  };

  handleClose = () => {
    const { handleClose, callback } = this.props;
    callback(null);
    handleClose();
  };

  handleCreate = () => {
    const { callback, handleClose } = this.props;
    callback(this.state.value);
    handleClose();
  };

  handleChangeName = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { title } = this.props;
    const { value } = this.state;
    return (
      <div className="modal active">
        <div className="modal-overlay" />
        <div className="modal-container">
          <div className="modal-header">
            <button className="btn btn-clear float-right" onClick={this.handleClose} />
            <div className="modal-title h5">{title || 'Prompt'}</div>
          </div>
          <div className="modal-body">
            <div className="content">
              <input
                className="form-input"
                placeholder="Nombre de la variable"
                onChange={this.handleChangeName}
                value={value}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-link" onClick={this.handleClose}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={this.handleCreate}>
              Crear
            </button>
          </div>
        </div>
      </div>
    );
  }
}
