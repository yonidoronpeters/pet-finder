import React from 'react';
import PetDisplay from './PetDisplay';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ConfirmationModal = ({ subscription, handleCloseModal }) => (
  <Modal
    open={!!subscription}
    onClose={handleCloseModal}
    contentLabel="Pet Notification"
    closeAfterTransition
    className="modal"
  >
    <Fade in={!!subscription}>
      <div className={useStyles().paper}>
        <h2 className="modal__title">You will be notified for:</h2>
        {subscription && <div className="modal__body">
          {subscription.dogs && <PetDisplay type="Dog" animal={subscription.dogs}/>}
          {subscription.cats && <PetDisplay type="Cat" animal={subscription.cats}/>}
        </div>}

        <Button variant={'contained'} onClick={handleCloseModal}>OK</Button>
      </div>
    </Fade>
  </Modal>
);

export default ConfirmationModal;
