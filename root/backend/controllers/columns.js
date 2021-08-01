const columnRouter = require('express').Router();
const Board = require('../models/board');
const Column = require('../models/column');

// For development use only
columnRouter.get('/', async (request, response) => {
  const columns = await Column.find({});
  response.json(columns);
});

columnRouter.get('/:id', async (request, response) => {
  const column = await Column.findById(request.params.id);
  response.json(column);
});

columnRouter.delete('/:id', async (request, response) => {
  await Column.findByIdAndRemove(request.params.id);

  // 204 no content
  response.status(204).end();
});

columnRouter.post('/', async (request, response) => {
  const column = new Column({
    title: request.body.title,
    cards: request.body.cards,
  });

  const savedColumn = await column.save();

  // for now, assign all columns to one board
  const board = (await Board.find({}))[0];
  board.columns = board.columns.concat(savedColumn._id);
  await board.save();

  response.json(savedColumn);
});

columnRouter.put('/:id', async (request, response) => {
  const column = {
    title: request.body.title,
    cards: request.body.cards,
  };

  const updatedColumn = await Column
    .findByIdAndUpdate(request.params.id, column, { new: true });

  response.json(updatedColumn);
});

module.exports = columnRouter;
