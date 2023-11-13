// A Controller that manages requests related to publications and its categories
// associated

const express = require('express');

const { Post, Category, PostHasCategory } = require('./../models/models.js');

class PostsController {
  /**
   * 
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async create(req, res, next) {
    const { title, summary, text, image, author_id } = req.body;

    let result = true;

    try {
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
    const { post_id } = req.params;

    let result = null;
    let error = '';

    const post = await Post.findByPk(parseInt(post_id));

    if (post !== null) {
      result = post.toJSON();
    } else {
      res.statusCode = 404;

      error = `Post ${post_id} not found.`;
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
    const posts = await Post.findAll();

    res.send({
      posts: posts.map(p => p.toJSON())
    });
  }

  // '/:count/offset/:offset'
  async getPosts(req, res, next) {
    const { count, offset } = req.params;
    const intCount = parseInt(count)
    const intOffset = parseInt(offset);
    const posts = await Post.findAll({
      limit: intCount,
      offset: intOffset
    });
    res.send({
      posts: posts.map(p => p.toJSON())
    });
  }

  /**
   * Add a category (must already exist, another case the result is false and
   * the status code 404) to a specific publication.
   * @param {*} req Must have 2 params: the post id and the category id
   * @param {*} res 
   * @param {*} next 
   */
  async addCategoryToPost(req, res, next) {
    const { post_id, category_id } = req.params;

    let result = true;
    let error = '';

    const post = await Post.findByPk(parseInt(post_id));
    const category = await Category.findByPk(parseInt(category_id));

    if (post === null || category === null) {
      res.statusCode = 404;

      result = false;

      if (post === null) {
        error = `Post ${post_id} not found.`;
      }

      if (category === null) {
        error = `Category ${category_id} not found.`;
      }
    }

    if (result) {
      try {
        await PostHasCategory.create({
          post_id,
          category_id
        });
      } catch (e) {
        console.error(e);

        result = false;
      }
    }

    res.send({
      result,
      error
    });
  }

  /**
   * Remove a category (must already exist, another case the result is false and
   * the status code 404) from a specific publication.
   * @param {*} req Must have 2 params: the post id and the category id
   * @param {*} res 
   * @param {*} next 
   */
  async removeCategoryFromPost(req, res, next) {
    const { post_id, category_id } = req.params;

    let result = true;
    let error = '';

    const post = await Post.findByPk(parseInt(post_id));
    const category = await Category.findByPk(parseInt(category_id));

    if (post === null || category === null) {
      res.statusCode = 404;

      result = false;

      if (post === null) {
        error = `Post ${post_id} not found.`;
      }

      if (category === null) {
        error = `Category ${category_id} not found.`;
      }
    }

    if (result) {
      const post_has_category = await PostHasCategory.findOne({
        where: {
          post_id,
          category_id
        }
      });

      if (post_has_category !== null) {
        post_has_category.destroy();
      } else {
        result = false;

        error = `Post ${post_id} doesn't have the category ${category_id}.`;
      }
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
  async getAllByCategory(req, res, next) {
    const { category_id } = req.params;

    let post_has_category = await PostHasCategory.findAll({
      where: {
        category_id
      }
    })

    post_has_category = post_has_category
      .map(p => p.toJSON())
      .map(p => p.post_id);

    // Remove repeats
    post_has_category = [...new Set(post_has_category)];

    const posts = await Post.findAll({
      where: {
        id: post_has_category
      }
    });

    res.send({
      posts: posts.map(p => p.toJSON())
    });
  }
}

module.exports = { PostsController }
