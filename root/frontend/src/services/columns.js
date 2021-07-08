import axios from 'axios';

const url = 'http://localhost:3001/api/columns';

const getAll = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const create = (newColumn) => {
  const request = axios.post(url, newColumn);
  return request.then((response) => response.data);
};

export default { getAll, create };
