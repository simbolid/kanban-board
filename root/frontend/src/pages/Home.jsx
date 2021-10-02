import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  heroButton: {
    marginTop: theme.spacing(6),
    minHeight: '60px',
    minWidth: '180px',
    borderRadius: '10px',
    fontSize: '18px',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginBottom={10}
      >
        <Typography variant="h1" align="center" color="textPrimary" gutterBottom>
          Kanban Bonsai
        </Typography>
        <Typography variant="h4" align="center" color="textSecondary" paragraph>
          Basic Kanban boards for individual projects.
        </Typography>
        <Button
          className={classes.heroButton}
          variant="contained"
          size="large"
          color="secondary"
          component={Link}
          to="/dashboard"
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
