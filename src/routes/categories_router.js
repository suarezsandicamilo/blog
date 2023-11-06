//

const express = require('express');

const { CategoriesController } = require('./../controllers/categories_controller.js');

const router = express.Router();

const controller = new CategoriesController();

router.post('/', async (req, res, next) => {
    await controller.create(req, res, next);
});

router.get('/:category_id', async (req, res, next) => {
    await controller.getById(req, res, next);
});

router.get('/', async (req, res, next) => {
    await controller.getAll(req, res, next);
});

module.exports = router;
