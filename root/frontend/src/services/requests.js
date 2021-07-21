import axios from 'axios';

const boardUrl = 'http://localhost:3001/api/boards';
const columnUrl = 'http://localhost:3001/api/columns';

const getBoard = () => {
  const request = axios.get(boardUrl);
  return request.then((response) => response.data[0]);
};

const createColumn = (newColumn) => {
  const request = axios.post(columnUrl, newColumn);
  return request.then((response) => response.data);
};

const updateColumn = (columnID, column) => {
  const request = axios.put(`${columnUrl}/${columnID}`, column);
  return request.then((response) => response.data);
};

const updateColumnOrder = (boardID, columnIDs) => {
  const request = axios.put(`${boardUrl}/${boardID}`, columnIDs);
  return request.then((response) => response.data);
};

export default {
  getBoard,
  createColumn,
  updateColumn,
  updateColumnOrder,
};
