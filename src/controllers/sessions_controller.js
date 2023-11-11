//

const express = require('express');

class SessionsController {
  /**
   * 
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async start(req, res, next) {
    const { user_id } = req.params;
    const { hashed_password } = req.body;

    let response = await fetch(`http://${req.headers.host}/auth/users/${user_id}`, {
      method: 'POST',
      body: JSON.stringify({
        hashed_password
      })
    });

    let { result, error } = await response.json();

    if (result) {
      req.session.user_id = user_id;
    }

    res.send({
      result,
      error
    });
  }

  /**
   * 
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async end(req, res, next) {
    req.session.destroy();

    res.redirect('/view/sign-in');
  }

  /**
   * 
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async getUserId(req, res, next) {
    let user_id = req.session?.user_id ?? 0;

    res.send({
      user_id
    })
  }
}

module.exports = { SessionsController };
