import axios from 'axios';

const boardUrl = 'http://localhost:3001/api/boards';
const columnUrl = 'http://localhost:3001/api/columns';

const getBoard = () => {
  const request = axios.get(boardUrl);
  return request.then((response) => response.data[0]);
};

const getColumns = () => {
  const request = axios.get(columnUrl);
  return request.then((response) => response.data);
};

const createColumn = (newColumn) => {
  const request = axios.post(columnUrl, newColumn);
  return request.then((response) => response.data);
};

const updateColumn = (id, column) => {
  const request = axios.put(`${columnUrl}/${id}`, column);
  return request.then((response) => response.data);
};

export default {
  getColumns,
  getBoard,
  createColumn,
  updateColumn,
};
