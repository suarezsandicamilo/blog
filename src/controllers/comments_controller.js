//

const express = require('express');

module.exports = () => {
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

      await Comment.create({
        post_id,
        user_id,
        text
      });

      res.send();
    }

    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async getById(req, res, next) {
      const { post_id, comment_id } = req.params;

      const comment = await Comment.findOne({
        where: {
          post_id,
          id: comment_id
        }
      })

      if (comment === null) {
        res.statusCode = 404;
        console.error(`Comment ${post_id}-${comment_id} not found.`);
        next();
        return;
      }

      res.send(comment.toJSON());
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
        users: comments.map(p => p.toJSON())
      });
    }
  }

  return { CommentsController };
};
