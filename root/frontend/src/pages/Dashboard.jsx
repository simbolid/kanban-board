import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import NavigationInterface from './components/Navigation';
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
    padding: theme.spacing(2),
  },
  container: {
    paddingBlock: theme.spacing(3),
    display: 'flex',
    alignItems: 'flex-start',
  },
}));

const Dashboard = () => {
  const [boards, setBoards] = useState([]);

  const classes = useStyles();

  useEffect(async () => {
    const retrievedBoards = await boardService.getBoards();
    setBoards(retrievedBoards);
  }, []);

  return (
    <div className={classes.root}>
      <NavigationInterface title="Dashboard" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Typography variant="h5">
          <Box fontWeight="fontWeightMedium">
            Boards
          </Box>
        </Typography>
        <div className={classes.container}>
          {boards.map((board) => (
            <Box marginLeft="10px">
              <Button
                key={board._id}
                variant="contained"
                color="primary"
                component={Link}
                to={`/board/${board._id}`}
              >
                {board.title}
              </Button>
            </Box>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
