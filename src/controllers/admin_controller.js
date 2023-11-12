// A Controller to manages the requests related to user administration using
// the User model.

const express = require('express');

const { User } = require('./../models/models.js');

/**
 * Controller of request related to user administration.
 */
class AdminController {
  /**
   * Get all users of Data Base and build the response body in JSON format.
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
   * Get all authors of Data Base and build the response body in JSON format.
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async getAllAuthors(req, res, next) {
    // TODO: Check admin permissions

    const users = await User.findAll({
      where: {
        is_author: true
      }
    });

    res.send({
      users: users.map(u => u.toJSON())
    });
  }
}

module.exports = { AdminController };
