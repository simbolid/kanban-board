import axios from 'axios';

const boardUrl = 'http://localhost:3001/api/boards';

const getBoard = async () => {
  const response = await axios.get(boardUrl);
  return response.data[0];
};

const updateBoard = async (board) => {
  const response = await axios.put(`${boardUrl}/${board._id}`, board);
  return response.data;
};

export default {
  getBoard,
  updateBoard,
};
