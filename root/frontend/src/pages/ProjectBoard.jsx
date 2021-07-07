import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import NavigationInterface from './components/Navigation';
import Column from './components/Column';
import ButtonToTextField from './components/ButtonToTextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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

  const [columns, setColumns] = useState([
    {
      title: 'Column one',
      cards: [
        { title: 'card one' },
        { title: 'card two' },
      ],
    },
    {
      title: 'Column two',
      cards: [
        { title: 'new one' },
        { title: 'new two' },
      ],
    },
  ]);

  const handleNewColumnSubmit = () => {
    setNewColumnRequested(false);
    setNewColumnTitle('');
    setColumns(columns.concat({ title: newColumnTitle, cards: [] }));
  };

  const handleNewColumnCancel = () => {
    setNewColumnRequested(false);
    setNewColumnTitle('');
  };

  const addCardToColumn = (index, card) => {
    // retrieve and update the column to be modified
    const column = columns.slice(index, index + 1)[0];
    column.cards = column.cards.concat(card);

    // insert the updated column into the columns array
    setColumns(columns.slice(0, index).concat(column).concat(columns.slice(index + 1)));
  };

  return (
    <div className={classes.root}>

      {/* Includes the top bar and the side menu */}
      <NavigationInterface />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth={false} className={classes.container}>
          <Grid container spacing={2} wrap="nowrap">
            {columns.map((column, index) => (
              <Column
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                index={index}
                title={column.title}
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
                onTextFieldChange={(e) => setNewColumnTitle(e.target.value)}
                onTextFieldSubmit={handleNewColumnSubmit}
                textFieldLabel="Column title"
                textFieldValue={newColumnTitle}
                title="Add Column"
              />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default ProjectBoard;
