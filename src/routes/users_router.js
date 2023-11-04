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

  router.post('/', async (req, res, next) => {
    console.log(req.body);

    await new UserController().create(req, res, next);
  });

  return router;
};
