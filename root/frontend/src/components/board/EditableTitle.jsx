import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  text: {
    cursor: (props) => props.cursor,
  },
  textField: {
    paddingInline: '10px',
    paddingBlock: '5px',
  },
  smallTextField: {
    height: '14px',
    fontSize: '0.875rem',
  },
  largeTextField: {
    height: '22px',
    fontSize: '1.25rem',
    fontWeight: '500',
  },
});

const EditableTitle = React.forwardRef(({
  initialTitle,
  onSubmit,
  TypographyProps,
  size,
  disableClick,
  ...props
}, ref) => {
  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);

  const classes = useStyles(props);
  const inputRef = useRef(false);

  const toggle = () => {
    setIsEditing(!isEditing);
  };

  /* We have to manually focus input because autofocus does not work
     when the input field is opened from the drop-down menu. */
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title !== '') {
      setIsEditing(false);
      onSubmit(title);
    }
  };

  const clickableText = () => (
    <div
      className={classes.text}
      onClick={toggle}
      onKeyDown={toggle}
      role="button"
      tabIndex={0}
    >
      <Typography {...TypographyProps}>
        {title}
      </Typography>
    </div>
  );

  const disabledText = () => (
    <div className={classes.text}>
      <Typography {...TypographyProps}>
        {title}
      </Typography>
    </div>
  );

  const text = disableClick ? disabledText() : clickableText();

  /* ClickAwayListener's mouse event must be mouse down so that preventDefault()
     prevent the blur event. (Event order is mousedown -> blur -> mouseup -> click) */
  const textField = () => (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={handleSubmit}>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.text}
          InputProps={{
            inputProps: {
              className: clsx(
                classes.textField,
                (size === 'small') && classes.smallTextField,
                (size === 'large') && classes.largeTextField,
              ),
            },
          }}
          variant="outlined"
          color="secondary"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          inputRef={inputRef}
          fullWidth
        />
      </form>
    </ClickAwayListener>
  );

  useImperativeHandle(ref, () => ({
    toggle,
  }));

  return (
    isEditing ? textField() : text
  );
});

EditableTitle.propTypes = {
  initialTitle: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  TypographyProps: PropTypes.object,
  disableClick: PropTypes.bool,
  size: PropTypes.string,
  cursor: PropTypes.string,
};

EditableTitle.defaultProps = {
  TypographyProps: { },
  disableClick: false,
  size: 'medium',
  cursor: 'pointer',
};

export default EditableTitle;
