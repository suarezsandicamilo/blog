//

const express = require('express');
const { Sequelize } = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns 
 */
module.exports = (sequelize) => {
  const { Post } = require('./../models/models.js');

  class PostsController {
    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async create(req, res, next) {
      const { title, summary, text, image, author_id } = req.body;

      const date = new Date();

      await Post.create({
        date: date.setHours(0, 0, 0, 0),
        time: date,
        title,
        summary,
        text,
        image,
        author_id
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
      const { post_id } = req.params;

      const post = await Post.findByPk(parseInt(post_id));

      if (post === null) {
        res.statusCode = 404;
        console.error(`Post ${post_id} not found.`);
        next();
        return;
      }

      res.send(post.toJSON());
    }

    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */
    async getAll(req, res, next) {
      const posts = await Post.findAll();

      res.send({
        users: posts.map(p => p.toJSON())
      });
    }
  }

  return { PostsController };
};
