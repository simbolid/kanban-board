import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  addColumnButton: {
    textTransform: 'none',
    padding: theme.spacing(1),
  },
}));

const NewColumnSection = (props) => {
  const classes = useStyles();

  if (props.buttonPressed) {
    return (
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
    );
  }
  return (
    <Button
      color="primary"
      className={classes.addColumnButton}
      onClick={props.onButtonClick}
    >
      Add Column
    </Button>
  );
};

NewColumnSection.propTypes = {
  buttonPressed: PropTypes.bool.isRequired,
  onTextFieldSubmit: PropTypes.func.isRequired,
  textFieldLabel: PropTypes.string.isRequired,
  textFieldValue: PropTypes.string.isRequired,
  onTextFieldChange: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default NewColumnSection;
