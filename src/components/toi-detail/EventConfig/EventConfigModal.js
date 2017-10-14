import React from 'react';

export const Modal = (props) => {
  const { modalStatus } = props;
  return (
    <div className={`modal ${modalStatus || ''}`}>
      <div className="modal-overlay" />
      <div className="modal-container">
        {props.children}
      </div>
    </div>
  );
};

export const ModalHeader = ({ handleCloseModal, title, icon }) =>
  (<div className="modal-header">
    <button className="btn btn-clear float-right" onClick={handleCloseModal} />
    <div className="modal-title modal-title-robotois">
      <div className="icon-title">
        <img src={icon} alt="icon" />
      </div>
      <span className="h5">{title}</span>
    </div>
    <div className="divider" />
  </div>);

export const ModalFooter = props =>
  (<div className="modal-footer">
    {props.children}
  </div>);
