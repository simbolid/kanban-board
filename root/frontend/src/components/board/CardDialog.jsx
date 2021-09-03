import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CloseIcon from '@material-ui/icons/Close';
import EditableTitle from './EditableTitle';

const useStyles = makeStyles((theme) => ({
  dialog: {
    backgroundColor: theme.palette.grey[50],
    boxShadow: 'none',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  descriptionCloseButton: {
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
  description: {
    marginBlock: '10px',
    padding: '4px 10px',
    height: '60px',
    width: '92%',
    fontFamily: 'arial',
  },
  descriptionButton: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F0F0F0',
    '&:hover': {
      backgroundColor: '#E8E8E8',
    },
  },
  descriptionTextArea: {
    resize: 'none',
    fontFamily: 'roboto, sans-serif',
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
  },
}));

const CardDialog = ({
  card,
  columnTitle,
  open,
  handleClose,
  updateTitle,
  updateDescription,
}) => {
  const [editDescription, setEditDescription] = useState(false);
  const [description, setDescription] = useState(card.description ? card.description : '');
  const classes = useStyles();

  const resetDescription = () => {
    setDescription(card.description);
    setEditDescription(false);
  };

  const handleDescriptionSubmit = () => {
    setEditDescription(false);
    updateDescription(description);
  };

  const descriptionButton = () => {
    const placeholderText = () => (
      <Box color="gray">
        <Typography>
          Enter a description...
        </Typography>
      </Box>
    );

    const text = () => (
      <Typography>
        {description}
      </Typography>
    );

    return (
      <ButtonBase
        className={`${classes.description} ${classes.descriptionButton}`}
        onClick={() => setEditDescription(true)}
      >
        {description === ''
          ? placeholderText()
          : text()}
      </ButtonBase>
    );
  };

  const descriptionInput = () => (
    <form onSubmit={handleDescriptionSubmit}>
      <textarea
        className={`${classes.description} ${classes.descriptionTextArea}`}
        type="text"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        placeholder="Enter a description..."
        aria-label={`Enter a description for the task ${card.title}`}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
      <Button
        variant="contained"
        size="small"
        color="secondary"
        className={classes.addButton}
        type="submit"
      >
        Save
      </Button>
      <IconButton
        aria-label="delete"
        onClick={resetDescription}
        className={classes.descriptionCloseButton}
      >
        <CloseIcon />
      </IconButton>
    </form>
  );

  return (
    <Dialog
      PaperProps={{
        className: classes.dialog,
      }}
      open={open}
      onClose={handleClose}
      fullWidth
      scroll="body"
    >
      <DialogTitle onClose={handleClose} disableTypography>
        <Box display="flex">
          <Box marginTop={1} marginRight="10px">
            <AssignmentIcon />
          </Box>
          <Box flexGrow={1} marginRight={4}>
            <EditableTitle
              initialTitle={card.title}
              TypographyProps={{
                variant: 'h6',
              }}
              onSubmit={updateTitle}
              cursor="text"
              size="large"
            />
          </Box>
        </Box>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Box marginLeft="36px" color="#505050">
          <Typography variant="body2">
            {`in list ${columnTitle}`}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box fontWeight="fontWeightBold" fontSize="16px">
          Description
        </Box>
        {editDescription ? descriptionInput() : descriptionButton()}
      </DialogContent>
    </Dialog>
  );
};

CardDialog.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  columnTitle: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateDescription: PropTypes.func.isRequired,
};

export default CardDialog;
