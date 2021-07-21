const boardRouter = require('express').Router();
const Board = require('../models/board');

boardRouter.get('/', async (request, response) => {
  const boards = await Board
    .find({})
    .populate('columns');

  response.json(boards);
});

boardRouter.post('/', async (request, response) => {
  const newBoard = new Board({
    title: request.body.title,
  });

  const savedBoard = await newBoard.save();
  response.json(savedBoard);
});

boardRouter.put('/:id', async (request, response) => {
  console.log(request.body);

  const updatedBoard = await Board
    .findByIdAndUpdate(request.params.id, {
      columns: request.body,
    }, { new: true });

  response.json(updatedBoard);
});

module.exports = boardRouter;
