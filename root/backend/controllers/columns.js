const router = require('express').Router();
const Column = require('../models/column');
// const data = require('../example-data');

router.get('/', async (request, response) => {
  // response.json(data);
  const columns = await Column.find({});
  response.json(columns);
});

router.post('/', async (request, response) => {
  const column = new Column({
    title: request.body.title,
    cards: request.body.cards,
  });

  const savedColumn = await column.save();
  response.json(savedColumn);
});

module.exports = router;
