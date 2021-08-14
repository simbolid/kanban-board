const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./utils/config');
const logger = require('./utils/logger');
const boardRouter = require('./controllers/boards');

const app = express();

// connect to MongoDB cluster
logger.info('connecting to MongoDB');
mongoose.connect(config.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) => logger.info('error connecting to MongoDB:', error.message));

// parse requests containing JSON payloads
app.use(express.json());

// allow requests from local frontend for development builds
if (process.env.NODE_ENV === 'development') {
  const corsOptions = {
    origin: 'http://localhost:3000',
  };
  app.use(cors(corsOptions));
}

// serve static files from the frontend build directory
app.use(express.static('build'));

// request logging
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// route handling
app.use('/api/boards', boardRouter);

module.exports = app;
