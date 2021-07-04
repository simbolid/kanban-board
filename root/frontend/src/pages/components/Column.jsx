import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const Column = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      Column
    </Paper>
  );
};

export default Column;
