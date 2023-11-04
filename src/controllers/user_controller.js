//

const express = require('express');
const { Sequelize } = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns 
 */
module.exports = (sequelize) => {
  const { User } = require('./../models/models.js');

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
        username,
        email,
        hashed_password
      });

      res.send();
    }

    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async getById(req, res, next) {
      const { user_id } = req.params;

      const user = await User.findByPk(parseInt(user_id));

      if (user === null) {
        res.statusCode = 404;
        console.error(`User ${user_id} not found.`);
        next();
        return;
      }

      res.send(user.toJSON());
    }
  }

  return { UserController };
};
