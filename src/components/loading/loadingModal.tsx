import React from 'react';
import './loadingModal.css';

const LoadingModal: React.FC = () => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
