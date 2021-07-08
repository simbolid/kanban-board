const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./controllers/columns');

const app = express();

// parse requests containing JSON payloads
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// request logging
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// route handling
app.use('/api/columns', router);

module.exports = app;
