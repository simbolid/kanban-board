import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import NavigationInterface from './components/Navigation';
import Column from './components/Column';
import ButtonToTextField from './components/ButtonToTextField';
import boardService from '../services/boards';

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

const ProjectBoard = () => {
  const [newColumnRequested, setNewColumnRequested] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [filter, setFilter] = useState('');
  const [board, setBoard] = useState({
    title: '',
    columns: [],
  });

  const classes = useStyles();

  // load board data from server on startup
  useEffect(async () => {
    const retrievedBoard = await boardService.getBoard();
    setBoard(retrievedBoard);
  }, []);

  /* Update the frontend before the backend. Use for re-ordering cards and columns
   * with drag-and-drop, as updating the local state first prevents lag. */
  const updateBoardFrontend = async (newBoard) => {
    setBoard(newBoard);
    await boardService.updateBoard(newBoard);
  };

  /* Update the backend before the frontend. Use for adding and updating columns,
   * as the app relies on the backend to set "_id" fields of columns and cards. */
  const updateBoardBackend = async (newBoard) => {
    const savedBoard = await boardService.updateBoard(newBoard);
    setBoard(savedBoard);
  };

  const addColumn = async (event) => {
    // prevent form submission from reloading page
    event.preventDefault();

    if (newColumnTitle !== '') {
      const newColumn = {
        title: newColumnTitle,
        cards: [],
      };

      setNewColumnRequested(false);
      setNewColumnTitle('');

      updateBoardBackend({
        ...board,
        columns: board.columns.concat(newColumn),
      });
    }
  };

  const cancelNewColumn = () => {
    setNewColumnRequested(false);
    setNewColumnTitle('');
  };

  const updateColumn = async (updatedColumn, isDeleteOp) => {
    const newBoard = {
      ...board,
      columns: board.columns
        .map((col) => (col._id !== updatedColumn._id ? col : updatedColumn)),
    };

    // Because delete operations don't require retrieving an id from the server,
    // for such operations we can update the client first.
    if (isDeleteOp) updateBoardFrontend(newBoard);

    else updateBoardBackend(newBoard);
  };

  const deleteColumn = async (columnId) => {
    const index = board.columns.findIndex((col) => col._id === columnId);
    const newColumns = Array.from(board.columns);
    newColumns.splice(index, 1);

    updateBoardFrontend({
      ...board,
      columns: newColumns,
    });
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
      const newColumns = Array.from(board.columns);
      const draggedColumn = newColumns.splice(source.index, 1)[0];
      newColumns.splice(destination.index, 0, draggedColumn);

      updateBoardFrontend({
        ...board,
        columns: newColumns,
      });
      return;
    }

    const startColumn = board.columns.find((col) => col._id === source.droppableId);
    const endColumn = board.columns.find((col) => col._id === destination.droppableId);

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

      updateBoardFrontend({
        ...board,
        columns: board.columns
          .map((col) => (col._id !== changedColumn._id ? col : changedColumn)),
      });
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

    updateBoardFrontend({
      ...board,
      columns: board.columns
        .map((col) => {
          if (col._id === newStartColumn._id) return newStartColumn;
          if (col._id === newEndColumn._id) return newEndColumn;
          return col;
        }),
    });
  };

  return (
    <div className={classes.root}>
      {/* the top bar and side menu */}
      <NavigationInterface
        title={board.title}
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
                {board.columns.map((column, index) => (
                  <Column
                    key={column._id}
                    column={column}
                    index={index}
                    filter={filter}
                    updateColumn={updateColumn}
                    deleteColumn={deleteColumn}
                  />
                ))}
                {provided.placeholder}
                {/* Initially a button for adding a column to the board. If the button is
                    pressed, turns into a text field that requests a name for the column */}
                <Box marginLeft={1.5}>
                  <ButtonToTextField
                    buttonPressed={newColumnRequested}
                    onButtonClick={() => setNewColumnRequested(true)}
                    onCancel={cancelNewColumn}
                    onTextFieldChange={(event) => setNewColumnTitle(event.target.value)}
                    onTextFieldSubmit={addColumn}
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
