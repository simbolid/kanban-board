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

module.exports = boardRouter;
