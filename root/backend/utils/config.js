require('dotenv').config();

const { PORT } = process.env;

let DB_URI;

switch (process.env.NODE_ENV) {
  case 'production':
    DB_URI = process.env.PROD_DB_URI;
    break;
  case 'development':
    DB_URI = process.env.DEV_DB_URI;
    break;
  case 'testing':
    DB_URI = process.env.TEST_DB_URI;
    break;
  default:
    DB_URI = process.env.DEV_DB_URI;
}

module.exports = {
  PORT, DB_URI,
};
