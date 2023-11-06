//

const express = require('express');

const { Post, Category } = require('./../models/models.js');

class PostsController {
  /**
   * 
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async create(req, res, next) {
    const { title, summary, text, image, author_id } = req.body;

    const date = new Date().toISOString();

    await Post.create({
      date,
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
      posts: posts.map(p => p.toJSON())
    });
  }

  async addCategoryToPost(req, res, next) {
    const { post_id, category_id } = req.params;

    const post = await Post.findByPk(parseInt(post_id));
    const category = await Category.findByPk(parseInt(category_id));

    if (post === null || category === null) {
      res.statusCode = 404;

      if (post === null) {
        console.error(`Post ${post_id} not found.`);
      }

      if (category === null) {
        console.error(`Category ${category_id} not found.`);
      }

      next();
      return;
    }

    post.addCategory(category, {
      through: 'PostHasCategory'
    });
    post.removeHook()

    res.send();
  }

  async removeCategoryFromPost(req, res, next) {
    const { post_id, category_id } = req.params;

    const post = await Post.findByPk(parseInt(post_id));
    const category = await Category.findByPk(parseInt(category_id));

    if (post === null || category === null) {
      res.statusCode = 404;

      if (post === null) {
        console.error(`Post ${post_id} not found.`);
      }

      if (category === null) {
        console.error(`Category ${category_id} not found.`);
      }

      next();
      return;
    }

    post.removeCategory(category, {
      through: 'PostHasCategory'
    });

    res.send();
  }
}

module.exports = { PostsController }
