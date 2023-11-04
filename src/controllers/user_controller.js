//

const express = require('express');
const { Sequelize } = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns 
 */
module.exports = (sequelize) => {
  const { User } = require('./../models/user.js')(sequelize);

  class UserController {
    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async create(req, res, next) {
      const { username, email, hashed_password } = req.body;

      await User.create({
        USERNAME: username,
        EMAIL: email,
        HASHED_PASSWORD: hashed_password
      });

      res.redirect('/');
    }
  }

  return { UserController };
};
