import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import BounceLoader from 'react-spinners/BounceLoader';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import NavigationInterface from '../components/Navigation';
import Column from '../components/board/Column';
import ButtonToTextField from '../components/board/ButtonToTextField';
import boardService from '../services/boards';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
  },
});

const Board = ({ match }) => {
  const [filter, setFilter] = useState('');
  const [board, setBoard] = useState({
    title: '',
    columns: [],
  });

  const classes = useStyles();

  // load board data from server on startup
  useEffect(async () => {
    const retrievedBoard = await boardService.getBoard(match.params.id);
    setBoard(retrievedBoard);
  }, []);

  /* Update the frontend before the backend. Use for re-ordering cards and columns
   * with drag-and-drop, as updating the local state first prevents lag. */
  const updateBoardFrontend = async (newBoard) => {
    setBoard(newBoard);
    await boardService.updateBoard(newBoard);
  };

  /* Update the backend before the frontend. Use for adding and updating columns and cards,
   * as the app relies on the server to set the "_id" fields of these objects. */
  const updateBoardBackend = async (newBoard) => {
    const savedBoard = await boardService.updateBoard(newBoard);
    setBoard(savedBoard);
  };

  const addColumn = async (title) => {
    const newColumn = {
      cards: [],
      title,
    };

    updateBoardBackend({
      ...board,
      columns: board.columns.concat(newColumn),
    });
  };

  const updateColumn = async (updatedColumn, newCardAdded) => {
    const newBoard = {
      ...board,
      columns: board.columns
        .map((col) => (col._id !== updatedColumn._id ? col : updatedColumn)),
    };

    // adding a card requires the backend to generate an id for the card
    if (newCardAdded) updateBoardBackend(newBoard);

    else updateBoardFrontend(newBoard);
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

  const editBoardTitle = (title) => {
    updateBoardFrontend({
      ...board,
      title,
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

  const loader = () => (
    <Box
      position="fixed"
      top="45%"
      left="50%"
    >
      <BounceLoader size={80} color="#009150" />
    </Box>
  );

  // eslint-disable-next-line no-unused-vars
  const boardInterface = () => (
    <DragDropContext onDragEnd={onDragEnd}>
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
                onSubmit={addColumn}
                title="Add Column"
                label="Column title"
              />
            </Box>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );

  return (
    <NavigationInterface
      title={board.title}
      filter={filter}
      handleFilterChange={(event) => setFilter(event.target.value)}
      handleTitleChange={editBoardTitle}
      urlID={board.url_id}
      boardFeatures
    >
      {board.title ? boardInterface() : loader()}
    </NavigationInterface>
  );
};

Board.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Board;
