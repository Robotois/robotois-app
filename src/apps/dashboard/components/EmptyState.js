import React from 'react';

const EmptyState = ({ topic, data }) => {
  return (
    <div className="column col-6 my-1 dashboard-item">
      <div className="card">
        <div className="card-header">
          <div className="card-title h5">
            OOPS!
          </div>
        </div>
        <div className="card-body">
          Intenta conectar algun TOI para visualizar su estado
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
