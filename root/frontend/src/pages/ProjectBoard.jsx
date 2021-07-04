// TODO: use direct imports rather than destructuring
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import NavigationInterface from './components/Navigation';
import Column from './components/Column';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  addColumnButton: {
    textTransform: 'none',
    padding: theme.spacing(1),
  },
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

  // TODO: extract this component into its own file
  const NewColumnSection = ({ buttonPressed }) => {
    if (buttonPressed) {
      return (
        <form onSubmit={() => setAddColumn(false)}>
          <TextField
            variant="outlined"
            size="small"
            label="Column title"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            autoFocus
          />
        </form>
      );
    }
    return (
      <Button
        color="primary"
        className={classes.addColumnButton}
        onClick={() => setAddColumn(true)}
      >
        Add Column
      </Button>
    );
  };

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
              <NewColumnSection buttonPressed={addColumn} />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default ProjectBoard;
