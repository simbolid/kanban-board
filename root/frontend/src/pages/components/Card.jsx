import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles(() => ({
  card: {
    justifyContent: 'flex-start',
    marginTop: '10px',
  },
}));

const Card = (props) => {
  const classes = useStyles();
  return (
    <ButtonBase className={classes.card}>
      {props.title}
    </ButtonBase>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Card;
