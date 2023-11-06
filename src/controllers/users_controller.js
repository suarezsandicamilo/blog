//

const express = require('express');

const { User } = require('./../models/models.js');

class UsersController {
  /**
   * 
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async create(req, res, next) {
    const { username, email, hashed_password } = req.body;

    let result = true;

    try {
      await User.create({
        username,
        email,
        hashed_password
      });
    } catch (e) {
      console.error(e);

      result = false;
    }

    res.send({ result });
  }

  /**
   * 
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async getById(req, res, next) {
    const { user_id } = req.params;

    let result = null;
    let error = '';

    const user = await User.findByPk(parseInt(user_id));

    if (user !== null) {
      result = user.toJSON();
    } else {
      res.statusCode = 404;

      error = `User ${user_id} not found.`;
    }

    res.send({
      result,
      error
    });
  }
}

module.exports = { UsersController };
