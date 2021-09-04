import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import boardService from '../../services/boards';

const useStyles = makeStyles((theme) => ({
  container: {
    '& > *': {
      width: theme.spacing(18),
      height: theme.spacing(10),
    },
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none', // remove underline from link
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
      cursor: 'pointer',
    },
  },
  dialog: {
    boxShadow: 'none',
  },
}));

const NewBoardButton = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setNewBoardTitle('');
  };

  const handleSubmit = async () => {
    if (newBoardTitle !== '') {
      const board = await boardService.addBoard({
        title: newBoardTitle,
      });
      history.push(`/b/${board.url_id}`);
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
          <Typography variant="body2" component="div">
            <Box fontWeight="fontWeightMedium" textAlign="center">
              Create new
              <br />
              board
            </Box>
          </Typography>
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

export default NewBoardButton;
