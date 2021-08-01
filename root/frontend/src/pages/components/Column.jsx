import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ButtonToTextField from './ButtonToTextField';
import IssueCard from './IssueCard';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginLeft: theme.spacing(1.5),
    padding: theme.spacing(1),
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
  },
}));

/* React.memo prevents dragging a card over a column from
 * re-rendering the tasks in that column. */
const CardList = React.memo(({ cards, filter, columnTitle }) => (
  cards
    .filter((card) => (
      card.title.toLowerCase().includes(filter.toLowerCase())
    ))
    .map((card, index) => (
      <IssueCard
        key={card.id}
        cardId={card.id}
        index={index}
        title={card.title}
        columnTitle={columnTitle}
      />
    ))
));

const Column = ({
  column,
  index,
  filter,
  addCard,
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
      addCard(column.id, { title: newCardTitle });
      setNewCardTitle('');
    }
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Paper
          className={classes.paper}
          elevation={0}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Typography className={classes.title} {...provided.dragHandleProps} gutterBottom>
            {column.title}
          </Typography>
          <List>
            <Droppable droppableId={column.id} type="card">
              {/* eslint-disable-next-line no-shadow */}
              {(provided) => (
                // without min height, cannot drag cards into empty columns
                <Box minHeight="2px" ref={provided.innerRef} {...provided.droppableProps}>
                  <CardList cards={column.cards} filter={filter} columnTitle={column.title} />
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

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      // TODO: add id
    }),
  ).isRequired,
  filter: PropTypes.string.isRequired,
  columnTitle: PropTypes.string.isRequired,
};

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        // TODO: add id?
      }),
    ).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  addCard: PropTypes.func.isRequired,
};

export default Column;
