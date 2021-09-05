const fallbackRouter = require('express').Router();
const path = require('path');

fallbackRouter.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});
