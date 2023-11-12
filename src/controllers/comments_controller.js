// A Controller that manages the requests related to comments.

const express = require('express');

const { Comment } = require('./../models/models.js');

class CommentsController {
  /**
   * 
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async create(req, res, next) {
    const { post_id } = req.params;
    const { user_id, text } = req.body;

    let result = true;

    try {
      await Comment.create({
        post_id,
        user_id,
        text
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
    const { post_id, comment_id } = req.params;

    let result = null;
    let error = '';

    const comment = await Comment.findOne({
      where: {
        post_id,
        id: comment_id
      }
    })

    if (comment !== null) {
      result = comment.toJSON();
    } else {
      res.statusCode = 404;
      error = `Comment ${post_id}-${comment_id} not found.`;
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
  async getAll(req, res, next) {
    const { post_id } = req.params;

    const comments = await Comment.findAll({
      where: {
        post_id
      }
    });

    res.send({
      comments: comments.map(p => p.toJSON())
    });
  }
}

module.exports = { CommentsController };
