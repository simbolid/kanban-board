import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '200px',
    marginTop: '10px',
  },
  addButton: {
    textTransform: 'none',
    // fontFamily: 'Roboto',
    padding: theme.spacing(1),
  },
  secondRow: {
    display: 'flex',
    marginTop: '5px',
    maxHeight: '30px',
  },
}));

const ButtonToTextField = (props) => {
  const classes = useStyles();

  if (props.buttonPressed) {
    return (
      <div className={classes.root}>
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
        <div className={classes.secondRow}>
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
        </div>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Button
        color="primary"
        className={classes.addButton}
        onClick={props.onButtonClick}
      >
        {props.title}
      </Button>
    </div>
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
