import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import NavigationInterface from './components/Navigation';
import Column from './components/Column';
import ButtonToTextField from './components/ButtonToTextField';
import requestService from '../services/requests';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.grey[200],
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    alignItems: 'flex-start',
  },
}));

/* Note regarding immutability:
 * Because columns is an array of objects, I had to be careful not to unknowingly
 * mutate the array due to the pass-by-reference behavior of objects.
 * I ensured that updates to columns are immutable by logging their state before and
 * after copying and modifying a given column (but before the call to setColumns).
 * State remained unchanged in all cases.
 */
const ProjectBoard = () => {
  const classes = useStyles();
  const [newColumnRequested, setNewColumnRequested] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [columns, setColumns] = useState([]);
  const [filter, setFilter] = useState('');

  // load columns from server on startup
  useEffect(async () => {
    const board = await requestService.getBoard();
    // console.log(board);

    setColumns(board.columns);
  }, []);

  const handleNewColumnSubmit = async (event) => {
    // prevent form submission from reloading page
    event.preventDefault();

    if (newColumnTitle !== '') {
      const newColumn = {
        title: newColumnTitle,
        cards: [],
      };

      const savedColumn = await requestService.createColumn(newColumn);
      setNewColumnRequested(false);
      setNewColumnTitle('');
      setColumns(columns.concat(savedColumn));
    }
  };

  const handleNewColumnCancel = () => {
    setNewColumnRequested(false);
    setNewColumnTitle('');
  };

  const addCardToColumn = async (id, card) => {
    // retrieve and update the column to be modified
    const columnToUpdate = columns.find((col) => col.id === id);

    const changedColumn = {
      ...columnToUpdate,
      cards: columnToUpdate.cards.concat(card),
    };

    // save the column to the backend
    const savedColumn = await requestService.updateColumn(id, changedColumn);

    // insert the updated column into the columns array
    setColumns(columns.map((column) => {
      const col = column.id !== savedColumn.id ? column : savedColumn;
      return col;
    }));
  };

  const onDragEnd = async ({ destination, source, type }) => {
    // make sure that the destination is valid
    if (!destination) return;

    // make sure that user dragged card/column to new location
    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return;
    }

    // Move a column
    if (type === 'column') {
      const newColumns = Array.from(columns);
      const draggedColumn = newColumns.splice(source.index, 1)[0];
      newColumns.splice(destination.index, 0, draggedColumn);
      setColumns(newColumns);
      return;
    }

    const startColumn = columns.find((col) => col.id === source.droppableId);
    const endColumn = columns.find((col) => col.id === destination.droppableId);

    // Move a card within a column
    if (startColumn === endColumn) {
      // preserve immutability by creating a new copy of the card array
      const newCards = Array.from(startColumn.cards);

      // remove the card from the source column
      const draggedCard = newCards.splice(source.index, 1)[0];

      // insert the task at the destination index
      newCards.splice(destination.index, 0, draggedCard);

      const changedColumn = {
        ...startColumn,
        cards: newCards,
      };

      // update the frontend first to prevent lag
      setColumns(columns.map((col) => (col.id !== changedColumn.id ? col : changedColumn)));

      // then save changes to backend
      await requestService.updateColumn(startColumn.id, changedColumn);
      return;
    }

    // Move a card between columns
    const startColumnCards = Array.from(startColumn.cards);
    const draggedCard = startColumnCards.splice(source.index, 1)[0];
    const newStartColumn = {
      ...startColumn,
      cards: startColumnCards,
    };

    const endColumnCards = Array.from(endColumn.cards);
    endColumnCards.splice(destination.index, 0, draggedCard);
    const newEndColumn = {
      ...endColumn,
      cards: endColumnCards,
    };

    setColumns(columns.map((col) => {
      if (col.id === newStartColumn.id) return newStartColumn;
      if (col.id === newEndColumn.id) return newEndColumn;
      return col;
    }));

    await requestService.updateColumn(startColumn.id, newStartColumn);
    await requestService.updateColumn(endColumn.id, newEndColumn);
  };

  return (
    <div className={classes.root}>

      {/* the top bar and side menu */}
      <NavigationInterface
        filter={filter}
        handleFilterChange={(event) => setFilter(event.target.value)}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Droppable droppableId="all-columns" type="column" direction="horizontal">
            {(provided) => (
              <div
                className={classes.container}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {columns.map((column, index) => (
                  <Column
                    key={column.id}
                    id={column.id}
                    index={index}
                    title={column.title}
                    filter={filter}
                    cards={column.cards}
                    addCard={addCardToColumn}
                  />
                ))}
                {provided.placeholder}
                {/* Initially a button for adding a column to the board. If the button is
                    pressed, turns into a text field that requests a name for the column */}
                <Box marginLeft={1.5}>
                  <ButtonToTextField
                    buttonPressed={newColumnRequested}
                    onButtonClick={() => setNewColumnRequested(true)}
                    onCancel={handleNewColumnCancel}
                    onTextFieldChange={(event) => setNewColumnTitle(event.target.value)}
                    onTextFieldSubmit={handleNewColumnSubmit}
                    textFieldLabel="Column title"
                    textFieldValue={newColumnTitle}
                    title="Add Column"
                  />
                </Box>
              </div>
            )}
          </Droppable>
        </main>
      </DragDropContext>
    </div>
  );
};

export default ProjectBoard;
