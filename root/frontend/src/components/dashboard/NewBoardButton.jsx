import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(18),
      height: theme.spacing(10),
    },
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // remove underline from link
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
      cursor: 'pointer',
    },
  },
  dialog: {
    boxShadow: 'none',
  },
}));

const NewBoardButton = ({ onSubmit }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const classes = useStyles();

  const handleClick = () => {
    // open form dialog: see https://material-ui.com/components/dialogs/#form-dialogs
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setNewBoardTitle('');
  };

  const handleSubmit = () => {
    if (newBoardTitle !== '') {
      handleClose();
      onSubmit(newBoardTitle);
    } else {
      // TODO: display alert stating that title cannot be blank
    }
  };

  // TODO: prevent pressing enter from highlighting the row

  // allow users to submit by pressing enter
  const detectEnterKey = (event) => {
    if (openDialog && event.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <>
      <div className={classes.container}>
        <Paper
          className={classes.paper}
          onClick={handleClick}
          onKeyDown={handleClick}
          role="button"
          tabIndex={0}
        >
          Create new board
        </Paper>
      </div>
      <Dialog
        PaperProps={{
          className: classes.dialog,
        }}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Board</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name for your board below.
          </DialogContentText>
          <TextField
            value={newBoardTitle}
            color="secondary"
            onChange={({ target }) => setNewBoardTitle(target.value)}
            onKeyDown={detectEnterKey}
            autoFocus
            label="Board title"
            type="title"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

NewBoardButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NewBoardButton;
