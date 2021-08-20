import axios from 'axios';

const baseUrl = '/api/boards';

const getBoard = async () => {
  const response = await axios.get(baseUrl);
  return response.data[0];
};

const getBoards = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const updateBoard = async (board) => {
  const response = await axios.put(`${baseUrl}/${board._id}`, board);
  return response.data;
};

export default {
  getBoard,
  getBoards,
  updateBoard,
};
