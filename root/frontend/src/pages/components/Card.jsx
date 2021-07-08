import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  card: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: '10px',
    borderRadius: '8px',
    minHeight: '60px',
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
  title: {
    paddingTop: '1px',
    paddingLeft: '2px',
    textAlign: 'left',
  },
}));

const Card = (props) => {
  const classes = useStyles();
  return (
    <ButtonBase className={classes.card}>
      <Typography variant="subtitle2" className={classes.title}>
        {props.title}
      </Typography>
    </ButtonBase>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Card;
