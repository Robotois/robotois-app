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

export const ModalHeader = ({ handleCloseModal, title }) => (
  <div className="modal-header">
    <button
      className="btn btn-clear float-right"
      onClick={handleCloseModal}
    />
    <div className="modal-title">
      <h3>{title}</h3>
    </div>
  </div>
);

export const ModalFooter = props => (
  <div className="modal-footer">
    {props.children}
  </div>
);
