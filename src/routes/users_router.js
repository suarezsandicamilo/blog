//

const express = require('express');
const { Sequelize } = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns 
 */
module.exports = (sequelize) => {
  const { UserController } = require('../controllers/user_controller.js')(sequelize);

  const router = express.Router();

  const controller = new UserController();

  router.post('/', async (req, res, next) => {
    await controller.create(req, res, next);
  });

  router.get('/:user_id', async (req, res, next) => {
    await controller.getById(req, res, next);
  });

  return router;
};
