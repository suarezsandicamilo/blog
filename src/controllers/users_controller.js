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

  /**
   * 
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async getByUsername(req, res, next) {
    const { username } = req.params;

    let result = null;
    let error = '';

    const user = await User.findOne({
      where: {
        username
      }
    });

    if (user !== null) {
      result = user.toJSON();
    } else {
      res.statusCode = 404;

      error = `User with username ${username} not found.`;
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
  async setUserIsAuthor(req, res, next) {
    const { user_id, value } = req.params;

    let result = true;
    let error = '';

    try {
      await User.update({
        is_author: value.toLocaleLowerCase() === 'true'
      });
    } catch (e) {
      console.error(e);

      result = false;
    }

    if (!result) {
      res.statusCode = 404;

      error = `Couldn't update the value of is_author in the user ${user_id}.`;
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
  async setUserIsAdmin(req, res, next) {
    const { user_id, value } = req.params;

    let result = true;
    let error = '';

    try {
      await User.update({
        is_administrator: value.toLocaleLowerCase() === 'true'
      });
    } catch (e) {
      console.error(e);

      result = false;
    }

    if (!result) {
      res.statusCode = 404;

      error = `Couldn't update the value of is_administrator in the user ${user_id}.`;
    }

    res.send({
      result,
      error
    });
  }
}

module.exports = { UsersController };
