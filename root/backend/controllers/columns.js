const router = require('express').Router();
const data = require('../example-data');

router.get('/', (request, response) => {
  response.json(data);
});

module.exports = router;
