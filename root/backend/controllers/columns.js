const router = require('express').Router();
const Column = require('../models/column');

router.get('/', async (request, response) => {
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

router.put('/:id', async (request, response) => {
  const column = {
    title: request.body.title,
    cards: request.body.cards,
  };

  const updatedColumn = await Column
    .findByIdAndUpdate(request.params.id, column, { new: true });

  response.json(updatedColumn);
});

module.exports = router;
