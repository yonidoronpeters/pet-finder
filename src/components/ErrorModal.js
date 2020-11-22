import React from 'react';
import Modal from 'react-modal';

const ErrorModal = ({ errors, handleCloseModal }) => (
  <Modal
    isOpen={!!errors.length}
    onRequestClose={handleCloseModal}
    contentLabel="Error"
    closeTimeoutMS={200}
    className="error-modal"
  >
    <h2 className="modal__title">Please fix the following errors:</h2>
    {errors.length && <p className="modal__body">
      {errors.map(error =>
        <li key={error}>{error}</li>
      )}
    </p>}

    <button className="button" onClick={handleCloseModal}>OK</button>
  </Modal>
);

export default ErrorModal;
