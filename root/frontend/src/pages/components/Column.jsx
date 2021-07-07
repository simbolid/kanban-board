import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from './Card';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    minWidth: '270px',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
  },
}));

const Column = (props) => {
  const classes = useStyles();
  return (
    <Grid item className={classes.gridItem} xs={12} md={4} lg={3}>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>
          {props.title}
        </Typography>
        {props.cards.map((card) => <Card title={card.title} />)}
      </Paper>
    </Grid>
  );
};

Column.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Column;
