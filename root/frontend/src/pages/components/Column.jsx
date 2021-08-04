import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ButtonToTextField from './ButtonToTextField';
import CardList from './CardList';
import DropdownMenu from './DropdownMenu';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginLeft: theme.spacing(1.5),
    paddingBottom: theme.spacing(1),
    paddingInline: theme.spacing(1),
    backgroundColor: theme.palette.grey[50],
    borderRadius: 0,
    minWidth: '240px',
    width: '280px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    paddingLeft: theme.spacing(2),
    flexGrow: 1,
  },
}));

const Column = ({
  column,
  index,
  filter,
  deleteColumn,
  updateColumn,
}) => {
  const [newCardRequested, setNewCardRequested] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const classes = useStyles();

  const handleNewCardCancel = () => {
    setNewCardRequested(false);
    setNewCardTitle('');
  };

  const handleNewCardSubmit = () => {
    // the new card requires a title
    if (newCardTitle !== '') {
      setNewCardRequested(false);
      setNewCardTitle('');

      const changedColumn = {
        ...column,
        cards: column.cards.concat({ title: newCardTitle }),
      };
      updateColumn(changedColumn);
    }
  };

  const handleDelete = () => {
    deleteColumn(column._id);
  };

  const updateCard = async (updatedCard) => {
    const changedColumn = {
      ...column,
      cards: column.cards
        .map((card) => (card._id !== updatedCard._id ? card : updatedCard)),
    };

    updateColumn(changedColumn);
  };

  return (
    <Draggable draggableId={column._id} index={index}>
      {(provided) => (
        <Paper
          className={classes.paper}
          elevation={0}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Box display="flex" alignItems="center" marginBottom="-8px">
            <Typography className={classes.title} {...provided.dragHandleProps} gutterBottom>
              {column.title}
            </Typography>
            <Box marginRight="-12px">
              <DropdownMenu onDelete={handleDelete} />
            </Box>
          </Box>
          <List>
            <Droppable droppableId={column._id} type="card">
              {/* eslint-disable-next-line no-shadow */}
              {(provided) => (
                // without min height, cannot drag cards into empty columns
                <Box minHeight="2px" ref={provided.innerRef} {...provided.droppableProps}>
                  <CardList
                    cards={column.cards}
                    filter={filter}
                    columnTitle={column.title}
                    updateCard={updateCard}
                  />
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
            <ButtonToTextField
              buttonPressed={newCardRequested}
              onButtonClick={() => setNewCardRequested(true)}
              onCancel={handleNewCardCancel}
              onTextFieldChange={(e) => setNewCardTitle(e.target.value)}
              onTextFieldSubmit={handleNewCardSubmit}
              textFieldLabel="Card title"
              textFieldValue={newCardTitle}
              title="Add Card"
            />
          </List>
        </Paper>
      )}
    </Draggable>
  );
};

Column.propTypes = {
  column: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  deleteColumn: PropTypes.func.isRequired,
  updateColumn: PropTypes.func.isRequired,
};

export default Column;
