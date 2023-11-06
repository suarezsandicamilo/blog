//

const express = require('express');

const { Category } = require('./../models/models.js');

class CategoriesController {
  /**
   * 
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async create(req, res, next) {
    const { name } = req.body;

    let result = true;

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
   * 
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  async getById(req, res, next) {
    const { category_id } = req.params;

    let result = null;
    let error = '';

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
   * 
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
