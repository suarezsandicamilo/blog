// A Controller that manages the requests related to user sessions in the app.

const express = require('express');

const { fetchPost } = require('./../helpers.js');

class SessionsController {
  /**
   * Manages a login of a user.
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async start(req, res, next) {
    const { user_id } = req.params;
    const { hashed_password } = req.body;

    // Fetch the authentication use case.
    const { result, error } = await fetchPost(`http://${req.headers.host}/auth/users/${user_id}`, {
      hashed_password
    });

    if (result) {
      res.cookie('user_id', parseInt(user_id));
    }

    res.send({
      result,
      error
    });
  }
}

module.exports = { SessionsController };
