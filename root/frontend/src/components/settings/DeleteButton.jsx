import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.grey[800],
    textTransform: 'none',
    '&:hover': {
      color: 'white',
      backgroundColor: 'red',
    },
  },
  dialog: {
    boxShadow: 'none',
  },
}));

const DeleteButton = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButton;
