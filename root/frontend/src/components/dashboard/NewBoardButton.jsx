import React from 'react';
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
}));

const NewBoardButton = () => {
  const classes = useStyles();

  const handleClick = () => {
    // open form dialog: see https://material-ui.com/components/dialogs/#form-dialogs
  };

  return (
    <div
      className={classes.container}
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      tabIndex={0}
    >
      <Paper className={classes.paper}>
        Create new board
      </Paper>
    </div>
  );
};

export default NewBoardButton;
