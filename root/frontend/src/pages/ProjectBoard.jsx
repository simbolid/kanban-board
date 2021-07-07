import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import NavigationInterface from './components/Navigation';
import Column from './components/Column';
import NewColumnSection from './components/NewColumnSection';

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

  const [requestNewColumnTitle, setRequestNewColumnTitle] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const [columns, setColumns] = useState([
    {
      title: 'Column one',
    },
    {
      title: 'Column two',
    },
  ]);

  const handleNewColumnSubmit = () => {
    setRequestNewColumnTitle(false);
    setNewColumnTitle('');
    setColumns(columns.concat({ title: newColumnTitle }));
  };

  return (
    <div className={classes.root}>

      {/* Includes the top bar and the side menu */}
      <NavigationInterface />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="false" className={classes.container}>
          <Grid container spacing={2} wrap="nowrap">
            {columns.map((column) => (
              <Column title={column.title} />
            ))}
            <Grid item xs={12} md={4} lg={3}>
              {/* Initially a button for adding a column to the board. If the button is
                  pressed, turns into a text field that requests a name for the column */}
              <NewColumnSection
                buttonPressed={requestNewColumnTitle}
                onTextFieldSubmit={handleNewColumnSubmit}
                textFieldLabel="Column title"
                textFieldValue={newColumnTitle}
                onTextFieldChange={(e) => setNewColumnTitle(e.target.value)}
                onButtonClick={() => setRequestNewColumnTitle(true)}
              />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default ProjectBoard;
