import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    minWidth: '270px',
  },
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
    <Grid item className={classes.gridItem} xs={12} md={4} lg={3}>
      <Paper className={classes.paper}>
        {props.title}
      </Paper>
    </Grid>
  );
};

Column.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Column;
