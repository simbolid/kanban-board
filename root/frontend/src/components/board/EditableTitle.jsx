import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  text: {
    cursor: 'pointer',
  },
  textField: {
    paddingInline: '10px',
    paddingBlock: '5px',
  },
  // styles to apply only for the app bar title
  appBarField: {
    // color: 'white',
    backgroundColor: theme.palette.primary.dark,
  },
}));

const EditableTitle = ({ initialTitle, onSubmit, TypographyProps, appBar }) => {
  const [title, setTitle] = useState(initialTitle);
  const [openEdit, setOpenEdit] = useState(false);
  const classes = useStyles();

  const toggleEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title !== '') {
      setOpenEdit(false);
      onSubmit(title);
    }
  };

  const text = () => (
    <div
      className={classes.text}
      onClick={toggleEdit}
      onKeyDown={toggleEdit}
      role="button"
      tabIndex={0}
    >
      <Typography {...TypographyProps}>
        {title}
      </Typography>
    </div>
  );

  const textField = () => (
    <form onSubmit={handleSubmit}>
      <TextField
        className={classes.text}
        InputProps={{
          ...(appBar) && { disableUnderline: true },
          inputProps: {
            className: clsx(classes.textField, appBar && classes.appBarField),
          },
        }}
        variant={appBar ? 'standard' : 'outlined'}
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        onBlur={handleSubmit}
        autoFocus
      />
    </form>
  );

  return (
    openEdit ? textField() : text()
  );
};

EditableTitle.propTypes = {
  initialTitle: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  appBar: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  TypographyProps: PropTypes.object,
};

EditableTitle.defaultProps = {
  appBar: false,
};

export default EditableTitle;
