// A Controller to manages the requests related to user administration using
// the User model.

const express = require('express');

const { User, Post, Category, Comment } = require('./../models/models.js');

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

  async removePostById(req, res, next) {
    const { post_id } = req.params;

    let result = true;
    let error = '';

    await Post.destroy({
      where: {
        id: parseInt(post_id)
      }
    });

    res.send({
      result,
      error
    });
  }
  async removeAuthorById(req, res, next) {
    const { author_id } = req.params;

    let result = true;
    let error = '';

    await User.destroy({
      where: {
        id: parseInt(author_id)
      }
    });

    res.send({
      result,
      error
    });
  }

  async removeCommentByIds(req, res, next) {
    const { post_id, comment_id } = req.params;

    let result = true;
    let error = '';

    await Comment.destroy({
      where: {
        id: parseInt(comment_id),
        post_id: parseInt(post_id)
      }
    });

    res.send({
      result,
      error
    });
  }

  async removeCategoryById(req, res, next) {
    const { category_id } = req.params;
  
    let result = true;
    let error = '';
  
    await Category.destroy({
      where: {
        id: parseInt(category_id)
      }
    });
  
    res.send({
      result,
      error
    });
  }
}

module.exports = { AdminController };
