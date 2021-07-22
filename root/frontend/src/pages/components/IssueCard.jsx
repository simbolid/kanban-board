import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Draggable } from 'react-beautiful-dnd';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  card: {
    marginBottom: '10px',
    backgroundColor: 'white',
    borderRadius: '2px',
    boxShadow: ' 0 1.25px 1px 0 rgba(0, 0, 0, 0.15)',
    '&:hover': {
      // otherwise, cursor defaults to grab
      cursor: 'pointer',
      // backgroundColor: '#eeeeee',
    },
  },
  overlayTitle: {
    // TODO: use semi-bold font weight instead of bold
    fontWeight: 'bold',
  },
}));

const IssueCard = (props) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

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
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>
          {props.title}
        </DialogTitle>
        <DialogContent>
          <Typography>
            Description goes here
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

IssueCard.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  cardId: PropTypes.string.isRequired,
};

export default IssueCard;
