import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  text: {
    cursor: 'pointer',
  },
  textField: {
    paddingInline: '10px',
    paddingBlock: '5px',
  },
});

const EditableTitle = ({ initialTitle, onSubmit, TypographyProps }) => {
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
          inputProps: {
            className: classes.textField,
          },
        }}
        variant="outlined"
        color="secondary"
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
  // eslint-disable-next-line react/forbid-prop-types
  TypographyProps: PropTypes.object,
};

export default EditableTitle;
