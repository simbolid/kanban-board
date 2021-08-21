import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BoardButton from '../components/dashboard/BoardButton';
import NewBoardButton from '../components/dashboard/NewBoardButton';
import NavigationInterface from '../components/Navigation';
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
  newBoardButton: {
    width: theme.spacing(16),
    height: theme.spacing(10),
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
            <Box
              key={board._id}
              marginRight="10px"
            >
              <BoardButton boardID={board._id}>
                {board.title}
              </BoardButton>
            </Box>
          ))}
        </div>
        <NewBoardButton />
      </main>
    </div>
  );
};

export default Dashboard;
