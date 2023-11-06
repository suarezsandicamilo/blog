//

const express = require('express');

const { User } = require('./../models/models.js');

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

    const user = await User.findByPk(parseInt(user_id));

    if (user === null) {
      res.statusCode = 404;
      console.error(`User ${user_id} not found.`);
      next();
      return;
    }

    res.send({
      result: user.hashed_password === hashed_password
    });
  }
}

module.exports = { AuthController };
