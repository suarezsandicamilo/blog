//

const express = require('express');
const { Sequelize } = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns 
 */
module.exports = (sequelize) => {
  const { PostsController } = require('../controllers/posts_controller.js')(sequelize);

  const router = express.Router();

  const controller = new PostsController();

  router.post('/', async (req, res, next) => {
    await controller.create(req, res, next);
  });

  router.get('/:post_id', async (req, res, next) => {
    await controller.getById(req, res, next);
  });

  router.get('/', async (req, res, next) => {
    await controller.getAll(req, res, next);
  });

  return router;
};
