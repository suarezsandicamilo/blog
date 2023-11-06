//

const express = require('express');
const comments_controller = require('./../controllers/comments_controller.js');

module.exports = () => {
  const { PostsController } = require('./../controllers/posts_controller.js');
  const { CommentsController } = require('./../controllers/comments_controller.js');

  const router = express.Router();

  const posts_controller = new PostsController();
  const comments_controller = new CommentsController();

  router.post('/', async (req, res, next) => {
    await posts_controller.create(req, res, next);
  });

  router.get('/:post_id', async (req, res, next) => {
    await posts_controller.getById(req, res, next);
  });

  router.get('/', async (req, res, next) => {
    await posts_controller.getAll(req, res, next);
  });

  router.post('/:post_id/comments', async (req, res, next) => {
    await comments_controller.create(req, res, next);
  });

  router.get('/:post_id/comments/:comment_id', async (req, res, next) => {
    await comments_controller.getById(req, res, next);
  });

  router.get('/:post_id/comments', async (req, res, next) => {
    await comments_controller.getAll(req, res, next);
  });

  return router;
};
