import React, { useState } from 'react';
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
    padding: theme.spacing(1),
  },
  secondRow: {
    display: 'flex',
    marginTop: '5px',
    maxHeight: '30px',
  },
}));

const ButtonToTextField = ({
  onSubmit,
  title,
  label,
}) => {
  const [openTextField, setOpenTextField] = useState(false);
  const [text, setText] = useState('');

  const classes = useStyles();

  const handleOpen = () => {
    setOpenTextField(true);
  };

  const handleCancel = () => {
    setOpenTextField(false);
    setText('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text !== '') {
      setOpenTextField(false);
      onSubmit(text);
      setText('');
    }
  };

  const detectEnterKey = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  const button = () => (
    <div className={classes.root}>
      <Button
        color="primary"
        className={classes.addButton}
        onClick={handleOpen}
      >
        {title}
      </Button>
    </div>
  );

  const textField = () => (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          size="small"
          label={label}
          value={text}
          onKeyDown={detectEnterKey}
          onChange={({ target }) => setText(target.value)}
          autoFocus
          multiline
        />
      </form>
      <div className={classes.secondRow}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          className={classes.addButton}
          onClick={handleSubmit}
        >
          {title}
        </Button>
        <IconButton aria-label="delete" onClick={handleCancel}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );

  return openTextField ? textField() : button();
};

ButtonToTextField.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ButtonToTextField;
