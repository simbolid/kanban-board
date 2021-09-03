import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Draggable } from 'react-beautiful-dnd';
import CardDialog from './CardDialog';
import DropdownMenu from './DropdownMenu';
import EditableTitle from './EditableTitle';

const useStyles = makeStyles({
  parent: {
    display: 'flex',
    position: 'relative',
    cursor: 'pointer',
    '&:hover $card': {
      backgroundColor: 'rgba(185, 255, 190, 0.4)',
    },
  },
  card: {
    marginTop: '10px',
    paddingBlock: '7px',
    paddingInline: '10px',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: ' 0 1.25px 1px 0 rgba(0, 0, 0, 0.15)',
    '&:hover': {
      // otherwise, cursor defaults to grab
      cursor: 'pointer',
      '& + $dropdown': {
        opacity: 1,
        color: 'darkgrey',
      },
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'white',
    },
  },
  cardFocus: {
    backgroundColor: 'rgba(185, 255, 190, 0.4)',
  },
  dropdown: {
    opacity: 0,
    position: 'absolute',
    top: 4,
    right: -4,
    '&:hover': {
      opacity: 1,
    },
  },
  dropdownFocus: {
    opacity: 1,
  },
});

const IssueCard = ({
  card,
  index,
  columnTitle,
  deleteCard,
  updateCard,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const classes = useStyles();
  const titleRef = useRef();

  const updateDescription = (description) => {
    updateCard({
      ...card,
      description,
    });
  };

  const updateTitle = (title) => {
    updateCard({
      ...card,
      title,
    });
  };

  const handleDelete = () => {
    deleteCard(card._id);
  };

  const handleRename = () => {
    setOpenMenu(false);
    titleRef.current.toggle();
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Draggable draggableId={card._id} index={index}>
        {(provided) => (
          <div className={classes.parent}>
            <ListItem
              className={clsx(classes.card, openMenu && classes.cardFocus)}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              button
              onClick={handleDialogOpen}
            >
              <Box marginRight={2}>
                <EditableTitle
                  ref={titleRef}
                  key={card.title}
                  initialTitle={card.title}
                  TypographyProps={{
                    variant: 'body2',
                  }}
                  onSubmit={updateTitle}
                  size="small"
                  disableClick
                />
              </Box>
            </ListItem>
            <div className={clsx(classes.dropdown, openMenu && classes.dropdownFocus)}>
              <DropdownMenu
                onDelete={handleDelete}
                onClick={() => setOpenMenu(true)}
                onClose={() => setOpenMenu(false)}
                onRename={handleRename}
              />
            </div>
          </div>
        )}
      </Draggable>
      <CardDialog
        card={card}
        open={openDialog}
        columnTitle={columnTitle}
        handleClose={handleDialogClose}
        updateTitle={updateTitle}
        updateDescription={updateDescription}
      />
    </>
  );
};

IssueCard.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  columnTitle: PropTypes.string.isRequired,
  deleteCard: PropTypes.func.isRequired,
  updateCard: PropTypes.func.isRequired,
};

export default IssueCard;
