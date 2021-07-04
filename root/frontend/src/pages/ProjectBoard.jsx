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
    flexGrow: 1,
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

  /* when the add column button is pressed, set to true
     and request the title of the new column */
  const [addColumn, setAddColumn] = useState(false);

  const [newColumnTitle, setNewColumnTitle] = useState('');

  return (
    <div className={classes.root}>

      {/* Includes the top bar and the side menu */}
      <NavigationInterface />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
              <Column />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Column />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              {/* Initially a button for adding a column to the board. If the button is
                  pressed, turns into a text field that requests a name for the column */}
              <NewColumnSection
                buttonPressed={addColumn}
                onTextFieldSubmit={() => setAddColumn(false)}
                textFieldLabel="Column title"
                textFieldValue={newColumnTitle}
                onTextFieldChange={(e) => setNewColumnTitle(e.target.value)}
                onButtonClick={() => setAddColumn(true)}
              />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default ProjectBoard;
