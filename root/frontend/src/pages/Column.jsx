import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';

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
