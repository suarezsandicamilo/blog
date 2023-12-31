//

const express = require('express');

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

// Get count posts beginning in offset
router.get('/:count/offset/:offset', async (req, res, next) => {
  await posts_controller.getPosts(req, res, next);
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

router.post('/:post_id/categories/:category_id', async (req, res, next) => {
  await posts_controller.addCategoryToPost(req, res, next);
});

router.delete('/:post_id/categories/:category_id', async (req, res, next) => {
  await posts_controller.removeCategoryFromPost(req, res, next);
});

router.get('/categories/:category_id', async (req, res, next) => {
  await posts_controller.getAllByCategory(req, res, next);
});

module.exports = router;
