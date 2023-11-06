//

const express = require('express');

module.exports = () => {
  const { UsersController } = require('./../controllers/users_controller.js');

  const router = express.Router();

  const controller = new UsersController();

  router.post('/', async (req, res, next) => {
    await controller.create(req, res, next);
  });

  router.get('/:user_id', async (req, res, next) => {
    await controller.getById(req, res, next);
  });

  return router;
};
