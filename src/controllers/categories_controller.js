// A Controller to manages requests related with categories.

const express = require('express');

const { Category } = require('./../models/models.js');

class CategoriesController {
  /**
   * Create a Category using the Category model that makes the connection with
   * Data Base
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async create(req, res, next) {
    // Get category name from request body.
    const { name } = req.body;

    let result = true;

    // Try create category in data base using Category model.
    try {
      await Category.create({
        name
      });
    } catch (e) {
      console.error(e);

      result = false;
    }

    res.send({ result });
  }

  /**
   * Gets a category by its ID.
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async getById(req, res, next) {
    const { category_id } = req.params;

    let result = null;
    let error = '';
    
    // Find the category in data base by ist ID using Category model.
    const category = await Category.findByPk(parseInt(category_id));

    if (category !== null) {
      result = category.toJSON();
    } else {
      res.statusCode = 404;

      error = `Category ${category_id} not found.`;
    }

    res.send({
      result,
      error
    });
  }

  /**
   * Get all categories from Data Base in res body in JSON format.
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async getAll(req, res, next) {
    const categories = await Category.findAll();

    res.send({
      categories: categories.map(c => c.toJSON())
    });
  }
}

module.exports = { CategoriesController };
