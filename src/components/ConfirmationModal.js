import React from 'react';
import Modal from 'react-modal';
import PetDisplay from './PetDisplay';


const ConfirmationModal = (props) => (
  <Modal
    isOpen={!!props.subscription}
    onRequestClose={props.handleCloseModal}
    contentLabel="Pet Notification"
    closeTimeoutMS={200}
    className="modal"
  >
    <h2 className="modal__title">You will be notified for:</h2>
    {props.subscription && <div className="modal__body">
      {props.subscription.dogs && <PetDisplay type="Dog" animal={props.subscription.dogs} />}
      {props.subscription.cats &&  <PetDisplay type="Cat" animal={props.subscription.cats} />}
    </div>}

    <button className="button" onClick={props.handleCloseModal}>OK</button>
  </Modal>
);

export default ConfirmationModal;
