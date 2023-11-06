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

    await Category.create({
      name
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
    const { category_id } = req.params;

    const category = await Category.findByPk(parseInt(category_id));

    if (category === null) {
      res.statusCode = 404;
      console.error(`Category ${category_id} not found.`);
      next();
      return;
    }

    res.send(category.toJSON());
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
