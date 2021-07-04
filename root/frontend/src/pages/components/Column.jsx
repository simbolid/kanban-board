import React from 'react';
import PropTypes from 'prop-types';
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

const Column = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      {props.title}
    </Paper>
  );
};

Column.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Column;
