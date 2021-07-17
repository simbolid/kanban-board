import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { DragDropContext } from 'react-beautiful-dnd';
import NavigationInterface from './components/Navigation';
import Column from './components/Column';
import ButtonToTextField from './components/ButtonToTextField';
import columnService from '../services/columns';

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
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const ProjectBoard = () => {
  const classes = useStyles();

  const [newColumnRequested, setNewColumnRequested] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const [columns, setColumns] = useState([]);

  const [filter, setFilter] = useState('');

  // load columns from server on startup
  useEffect(async () => {
    const initialColumns = await columnService.getAll();
    // console.log(initialColumns);
    setColumns(initialColumns);
  }, []);

  const handleNewColumnSubmit = async (event) => {
    // prevent form submission from reloading page
    event.preventDefault();

    if (newColumnTitle !== '') {
      const newColumn = {
        title: newColumnTitle,
        cards: [],
      };

      const savedColumn = await columnService.create(newColumn);
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
    const columnToUpdate = columns.filter((col) => col.id === id)[0];
    columnToUpdate.cards = columnToUpdate.cards.concat(card);

    // save the column to the backend
    const updatedColumn = await columnService.update(id, columnToUpdate);

    // insert the updated column into the columns array
    setColumns(columns.map((column) => {
      const col = column.id !== updatedColumn.id ? column : updatedColumn;
      return col;
    }));
  };

  const onDragEnd = () => {
    // TODO: save changes to column and card order
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
          <Container maxWidth={false} className={classes.container}>
            <Grid container spacing={2} wrap="nowrap">
              {columns.map((column) => (
                <Column
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  filter={filter}
                  cards={column.cards}
                  addCard={addCardToColumn}
                />
              ))}
              <Grid item xs={12} md={4} lg={3}>
                {/* Initially a button for adding a column to the board. If the button is
                    pressed, turns into a text field that requests a name for the column */}
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
              </Grid>
            </Grid>
          </Container>
        </main>
      </DragDropContext>
    </div>
  );
};

export default ProjectBoard;
