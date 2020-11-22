import React from 'react';
import Modal from 'react-modal';
import PetDisplay from './PetDisplay';


const ConfirmationModal = ({ subscription, handleCloseModal}) => (
  <Modal
    isOpen={!!subscription}
    onRequestClose={handleCloseModal}
    contentLabel="Pet Notification"
    closeTimeoutMS={200}
    className="modal"
  >
    <h2 className="modal__title">You will be notified for:</h2>
    {subscription && <div className="modal__body">
      {subscription.dogs && <PetDisplay type="Dog" animal={subscription.dogs} />}
      {subscription.cats &&  <PetDisplay type="Cat" animal={subscription.cats} />}
    </div>}

    <button className="button" onClick={handleCloseModal}>OK</button>
  </Modal>
);

export default ConfirmationModal;
