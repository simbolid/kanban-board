import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import boardService from '../../services/boards';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.red,
    borderColor: theme.palette.red,
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.red,
    },
  },
  dialog: {
    boxShadow: 'none',
  },
}));

const DeleteButton = ({ urlID }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async () => {
    await boardService.deleteBoard(urlID);
    history.push('/dashboard');
  };

  return (
    <>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={handleClickOpen}
        disableElevation
      >
        Delete this board
      </Button>
      <Dialog
        PaperProps={{
          className: classes.dialog,
        }}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete this board?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="secondary"
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteButton.propTypes = {
  urlID: PropTypes.string.isRequired,
};

export default DeleteButton;
