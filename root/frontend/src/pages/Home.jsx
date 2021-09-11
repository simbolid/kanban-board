import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButton: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="relative" elevation={0}>
        <Toolbar>
          <Box flexGrow={1}>
            <Typography variant="h6" noWrap>
              Kanban Bonsai
            </Typography>
          </Box>
          <Box marginRight="10px">
            <Button color="secondary" size="large">
              Login
            </Button>
          </Box>
          <Button color="secondary" variant="contained">
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Kanban Bonsai
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Basic Kanban boards for individual projects
            </Typography>
            <div className={classes.heroButton}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                component={Link}
                to="/dashboard"
                style={{ borderRadius: '12px' }}
              >
                Get Started
              </Button>
            </div>
          </Container>
        </div>
      </main>
    </>
  );
};

export default Home;
