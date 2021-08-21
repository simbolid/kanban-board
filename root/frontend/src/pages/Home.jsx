import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButton: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Kanban Bonsai
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Kanban Bonsai
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              A minimalist project management solution.
            </Typography>
            <div className={classes.heroButton}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/dashboard"
              >
                Open Dashboard
              </Button>
            </div>
          </Container>
        </div>
      </main>
    </>
  );
};

export default Home;
