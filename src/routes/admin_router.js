//

const express = require('express');

module.exports = () => {
  const { AdminController } = require('./../controllers/admin_controller.js');

  const router = express.Router();

  const controller = new AdminController();

  router.get('/users', async (req, res, next) => {
    await controller.getAllUsers(req, res, next);
  });

  router.get('/users/authors', async (req, res, next) => {
    await controller.getAllAuthors(req, res, next);
  });

  return router;
};
