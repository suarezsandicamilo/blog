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
      req.session.user_id = parseInt(user_id);
    }

    res.send({
      result,
      error
    });
  }

  /**
   * Manages the user session end.
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async end(req, res, next) {
    req.session.destroy();

    res.redirect('/sign-in');
  }

  /**
   * Get the user ID of current session.
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async getUserId(req, res, next) {
    const user_id = req.session?.user_id ?? 0;

    res.send({
      user_id
    })
  }
}

module.exports = { SessionsController };
