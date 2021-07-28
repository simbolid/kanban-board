import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
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
  descriptionTextArea: {
    marginBlock: '10px',
    padding: '4px 10px',
    height: '60px',
    resize: 'none',
    fontFamily: 'arial',
    width: '92%',
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
  },
}));

const IssueCard = (props) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [description, setDescription] = useState('');

  return (
    <>
      <Draggable draggableId={props.cardId} index={props.index}>
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
              {props.title}
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
                {props.title}
              </Box>
            </Typography>
          </Box>
          <IconButton aria-label="close" className={classes.closeButton} onClick={() => setOpenDialog(false)}>
            <CloseIcon />
          </IconButton>
          <Box marginLeft="36px" color="#505050">
            <Typography variant="body2">
              {`in list ${props.columnTitle}`}
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box fontWeight="fontWeightBold" fontSize="16px">
            Description
          </Box>
          <form>
            <textarea
              className={classes.descriptionTextArea}
              type="text"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              placeholder="Enter a description..."
            />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

IssueCard.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  cardId: PropTypes.string.isRequired,
  columnTitle: PropTypes.string.isRequired,
};

export default IssueCard;
