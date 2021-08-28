import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(18),
      height: theme.spacing(10),
    },
  },
  paper: {
    backgroundColor: theme.palette.secondary.light,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // remove underline from link
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

const BoardButton = ({ urlID, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Paper
        className={classes.paper}
        component={Link}
        to={`/b/${urlID}`}
      >
        <Box color="white" fontWeight="fontWeightMedium">
          {children}
        </Box>
      </Paper>
    </div>
  );
};

BoardButton.propTypes = {
  urlID: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BoardButton;
