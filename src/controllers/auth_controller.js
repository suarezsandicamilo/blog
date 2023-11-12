// A controller to manages the requests related to authentication user.

const express = require('express');

const { User } = require('./../models/models.js');

/**
 * Controller of requests related to authentication user.
 */
class AuthController {
  /**
   * 
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async authenticate(req, res, next) {
    const { user_id } = req.params;
    const { hashed_password } = req.body;

    let result = true;
    let error = '';

    const user = await User.findByPk(parseInt(user_id));

    if (user === null) {
      res.statusCode = 404;

      result = false;
      error = `User ${user_id} not found.`
    }

    if (result) {
      if (user.hashed_password !== hashed_password) {
        result = false;
        error = `Couldn't authenticate the user ${user_id}.`;
      }
    }

    res.send({
      result,
      error
    });
  }
}

module.exports = { AuthController };
