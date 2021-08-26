const boardRouter = require('express').Router();
const { nanoid } = require('nanoid');
const Board = require('../models/board');

boardRouter.get('/', async (request, response) => {
  const boards = await Board.find({});
  response.json(boards);
});

boardRouter.get('/:urlid', async (request, response) => {
  const boards = await Board.find({});
  const board = boards.find((b) => b.url_id === request.params.urlid);
  response.json(board);
});

boardRouter.post('/', async (request, response) => {
  if (!request.body.title) {
    request.body.title = 'My Board';
  }

  const newBoard = new Board({
    title: request.body.title,
    url_id: nanoid(8),
  });

  const savedBoard = await newBoard.save();
  response.json(savedBoard);
});

boardRouter.put('/:id', async (request, response) => {
  const updatedBoard = await Board
    .findByIdAndUpdate(request.params.id, request.body, { new: true });

  response.json(updatedBoard);
});

boardRouter.delete('/:urlid', async (request, response) => {
  const boards = await Board.find({});
  const board = boards.find((b) => b.url_id === request.params.urlid);
  await Board.findByIdAndRemove(board._id);
  response.status(204).end(); // 204 no content
});

module.exports = boardRouter;
