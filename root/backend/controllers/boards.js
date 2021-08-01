const boardRouter = require('express').Router();
const Board = require('../models/board');

boardRouter.get('/', async (request, response) => {
  const boards = await Board.find({});
  response.json(boards);
});

boardRouter.post('/', async (request, response) => {
  if (!request.body.title) {
    request.body.title = 'My Board';
  }

  const newBoard = new Board({
    title: request.body.title,
  });

  const savedBoard = await newBoard.save();
  response.json(savedBoard);
});

boardRouter.put('/:id', async (request, response) => {
  const updatedBoard = await Board
    .findByIdAndUpdate(request.params.id, request.body, { new: true });

  response.json(updatedBoard);
});

boardRouter.delete('/:id', async (request, response) => {
  console.log('delete');

  await Board.findByIdAndRemove(request.params.id);
  response.status(204).end(); // 204 no content
});

module.exports = boardRouter;
