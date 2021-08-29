import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BoardButton from '../components/dashboard/BoardButton';
import NewBoardButton from '../components/dashboard/NewBoardButton';
import NavigationInterface from '../components/Navigation';
import boardService from '../services/boards';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBlock: theme.spacing(2),
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

  const addBoard = async (title) => {
    const newBoard = {
      title,
    };
    const returnedBoard = await boardService.addBoard(newBoard);
    setBoards(boards.concat(returnedBoard));
  };

  return (
    <NavigationInterface title="Dashboard">
      <Box marginLeft={4} marginTop={1}>
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
              <BoardButton urlID={board.url_id}>
                {board.title}
              </BoardButton>
            </Box>
          ))}
        </div>
        <NewBoardButton onSubmit={addBoard} />
      </Box>
    </NavigationInterface>
  );
};

export default Dashboard;
