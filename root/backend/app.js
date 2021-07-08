const express = require('express');
const morgan = require('morgan');
const router = require('./controllers/columns');

const app = express();

// parse requests containing JSON payloads
app.use(express.json());

// request logging
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// route handling
app.use('/api/columns', router);

module.exports = app;
