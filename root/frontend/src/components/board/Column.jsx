import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ButtonToTextField from './ButtonToTextField';
import CardList from './CardList';
import DropdownMenu from './DropdownMenu';
import EditableTitle from './EditableTitle';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginLeft: theme.spacing(1.5),
    paddingBottom: theme.spacing(1),
    paddingInline: theme.spacing(1),
    backgroundColor: '#ebebeb',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;',
    minWidth: '240px',
    width: '280px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    paddingLeft: theme.spacing(2),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '-8px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const Column = ({
  column,
  index,
  filter,
  deleteColumn,
  updateColumn,
}) => {
  const classes = useStyles();

  const titleRef = useRef();

  const handleRename = () => {
    titleRef.current.toggle();
  };

  const handleDelete = () => {
    deleteColumn(column._id);
  };

  const editTitle = (newTitle) => {
    updateColumn({
      ...column,
      title: newTitle,
    });
  };

  const addCard = (title) => {
    updateColumn({
      ...column,
      cards: column.cards.concat({ title }),
    }, true);
  };

  const updateCard = async (updatedCard) => {
    updateColumn({
      ...column,
      cards: column.cards
        .map((card) => (card._id !== updatedCard._id ? card : updatedCard)),
    });
  };

  const deleteCard = async (cardId) => {
    const idx = column.cards.findIndex((card) => card._id === cardId);
    const newCards = Array.from(column.cards);
    newCards.splice(idx, 1);

    updateColumn({
      ...column,
      cards: newCards,
    });
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
          <div className={classes.header} {...provided.dragHandleProps}>
            <Box flexGrow={1}>
              <EditableTitle
                initialTitle={column.title}
                onSubmit={editTitle}
                TypographyProps={{
                  className: classes.title,
                  gutterBottom: true,
                }}
                ref={titleRef}
                backgroundColor="#f5f5f5"
              />
            </Box>
            <Box marginRight="-12px">
              <DropdownMenu
                onRename={handleRename}
                onDelete={handleDelete}
              />
            </Box>
          </div>
          <List>
            <Droppable droppableId={column._id} type="card">
              {/* eslint-disable-next-line no-shadow */}
              {(provided) => (
                // without min height, cannot drag cards into empty columns
                <Box
                  minHeight="11px"
                  marginTop="-10px"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <CardList
                    cards={column.cards}
                    filter={filter}
                    columnTitle={column.title}
                    updateCard={updateCard}
                    deleteCard={deleteCard}
                  />
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
            <ButtonToTextField
              onSubmit={addCard}
              title="Add Card"
              label="Card title"
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
