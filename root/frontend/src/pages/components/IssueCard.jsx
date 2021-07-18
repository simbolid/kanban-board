import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Draggable } from 'react-beautiful-dnd';
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks';

const useStyles = makeStyles(() => ({
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
  overlay: {
    padding: '14px',
    minHeight: '91vh',
    minWidth: '50vw',
  },
  overlayTitle: {
    // TODO: use semi-bold font weight instead of bold
    fontWeight: 'bold',
  },
}));

const IssueCard = (props) => {
  const classes = useStyles();

  const popupState = usePopupState({
    variant: 'popover',
    popupId: props.cardId,
  });

  return (
    <>
      <Draggable draggableId={props.cardId} index={props.index}>
        {(provided) => (
          <ListItem
            className={classes.card}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            {...bindTrigger(popupState)}
            selected={popupState.isOpen}
            button
          >
            <ListItemText>
              {props.title}
            </ListItemText>
          </ListItem>
        )}
      </Draggable>
      <Popover
        {...bindPopover(popupState)}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 75, left: 1200 }}
        marginThreshold={0}
      >
        <div className={classes.overlay}>
          <Typography className={classes.overlayTitle}>
            {props.title}
          </Typography>
        </div>
      </Popover>
    </>
  );
};

IssueCard.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  cardId: PropTypes.string.isRequired,
};

export default IssueCard;
