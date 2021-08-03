import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CloseIcon from '@material-ui/icons/Close';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: '10px',
    backgroundColor: 'white',
    borderRadius: '2px',
    boxShadow: ' 0 1.25px 1px 0 rgba(0, 0, 0, 0.15)',
    '&:hover': {
      // otherwise, cursor defaults to grab
      cursor: 'pointer',
    },
  },
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
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
  },
}));

const IssueCard = ({ card, index, columnTitle }) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [description, setDescription] = useState('');
  const [editDescription, setEditDescription] = useState(false);

  const resetDescription = () => {
    setDescription('');
    setEditDescription(false);
  };

  const updateDescription = () => {
    // TODO: save updates to backend
    setEditDescription(false);
  };

  const placeholderText = () => (
    <Typography style={{ color: 'gray' }}>
      Enter a description...
    </Typography>
  );

  const descriptionButton = () => (
    <ButtonBase
      className={`${classes.description} ${classes.descriptionButton}`}
      onClick={() => setEditDescription(true)}
      disableRipple
    >
      <Typography>
        {description === ''
          ? placeholderText()
          : description}
      </Typography>
    </ButtonBase>
  );

  const descriptionInput = () => (
    <form onSubmit={updateDescription}>
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
        style={{ textTransform: 'none' }}
        variant="contained"
        size="small"
        color="primary"
        className={classes.addButton}
        type="submit"
      >
        Save
      </Button>
      <IconButton aria-label="delete" onClick={resetDescription}>
        <CloseIcon />
      </IconButton>
    </form>
  );

  return (
    <>
      <Draggable draggableId={card._id} index={index}>
        {(provided) => (
          <ListItem
            className={classes.card}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            button
            disableRipple
            onClick={() => setOpenDialog(true)}
          >
            <ListItemText>
              {card.title}
            </ListItemText>
          </ListItem>
        )}
      </Draggable>

      <Dialog
        PaperProps={{
          className: classes.dialog,
        }}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        scroll="body"
      >
        <DialogTitle onClose={() => setOpenDialog(false)} disableTypography>
          <Box display="flex" alignItems="flex-end">
            <Box marginRight="10px">
              <AssignmentIcon />
            </Box>
            <Typography variant="h5">
              <Box fontWeight="fontWeightMedium">
                {card.title}
              </Box>
            </Typography>
          </Box>
          <IconButton aria-label="close" className={classes.closeButton} onClick={() => setOpenDialog(false)}>
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
    </>
  );
};

IssueCard.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  columnTitle: PropTypes.string.isRequired,
};

export default IssueCard;
