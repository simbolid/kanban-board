import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
// import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  textField: {
    paddingInline: '10px',
    paddingBlock: '5px',
  },
}));

const EditableTitle = ({ initialTitle, onSubmit, TypographyProps }) => {
  const [title, setTitle] = useState(initialTitle);
  const [openEdit, setOpenEdit] = useState(false);
  const classes = useStyles();

  const toggleEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpenEdit(false);
    onSubmit(title);
  };

  const text = () => (
    <div
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
        inputProps={{
          className: classes.textField,
        }}
        variant="outlined"
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
  // typographyProps: PropTypes.object,
};

export default EditableTitle;
