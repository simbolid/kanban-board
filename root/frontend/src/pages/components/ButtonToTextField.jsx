import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  addButton: {
    textTransform: 'none',
    // fontFamily: 'Roboto',
    padding: theme.spacing(1),
  },
  box: {
    display: 'flex',
    marginTop: '5px',
    maxHeight: '30px',
  },
}));

const ButtonToTextField = (props) => {
  const classes = useStyles();

  if (props.buttonPressed) {
    return (
      <>
        <form onSubmit={props.onTextFieldSubmit}>
          <TextField
            variant="outlined"
            size="small"
            label={props.textFieldLabel}
            value={props.textFieldValue}
            onChange={props.onTextFieldChange}
            autoFocus
          />
        </form>
        <Box className={classes.box}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            className={classes.addButton}
            onClick={props.onTextFieldSubmit}
          >
            {props.title}
          </Button>
          <IconButton aria-label="delete" onClick={props.onCancel}>
            <CloseIcon />
          </IconButton>
        </Box>
      </>
    );
  }
  return (
    <Button
      color="primary"
      className={classes.addButton}
      onClick={props.onButtonClick}
    >
      {props.title}
    </Button>
  );
};

ButtonToTextField.propTypes = {
  buttonPressed: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onTextFieldSubmit: PropTypes.func.isRequired,
  textFieldLabel: PropTypes.string.isRequired,
  textFieldValue: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onTextFieldChange: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default ButtonToTextField;
