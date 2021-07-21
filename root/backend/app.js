const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./utils/config');
const boardRouter = require('./controllers/boards');
const columnRouter = require('./controllers/columns');

const app = express();

// connect to MongoDB cluster
console.log('connecting to MongoDB');
mongoose.connect(config.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message));

// parse requests containing JSON payloads
app.use(express.json());

// only allow requests from the local frontend
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// request logging
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// route handling
app.use('/api/boards', boardRouter);
app.use('/api/columns', columnRouter);

module.exports = app;
