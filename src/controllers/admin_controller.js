//

const express = require('express');
const { Sequelize, where } = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns 
 */
module.exports = (sequelize) => {
  const { User } = require('./../models/user.js')(sequelize);

  class AdminController {
    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async getAllUsers(req, res, next) {
      // TODO: Check admin permissions

      const users = await User.findAll();

      res.send({
        users: users.map(u => u.toJSON())
      });
    }

    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async getAllAuthors(req, res, next) {
      // TODO: Check admin permissions

      const users = await User.findAll({
        where: {
          is_administrator: true
        }
      });

      res.send({
        users: users.map(u => u.toJSON())
      });
    }
  }

  return { AdminController };
};
