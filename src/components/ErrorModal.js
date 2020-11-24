import React from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// TODO extract to common styles
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

const ErrorModal = ({ errors, handleCloseModal }) => (
  <Modal
    open={!!errors.length}
    onClose={handleCloseModal}
    closeAfterTransition
    className="error-modal"
  >
    <Fade in={!!errors.length}>
      <div className={useStyles().paper}>
        <h2 className="modal__title">Please fix the following errors:</h2>
        {<p className="modal__body">
          {errors.map(error =>
            <li key={error}>{error}</li>
          )}
        </p>}

        <Button variant={'contained'} onClick={handleCloseModal}>OK</Button>
      </div>
    </Fade>
  </Modal>
);

export default ErrorModal;
