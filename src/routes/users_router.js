//

const express = require('express');

const { UsersController } = require('./../controllers/users_controller.js');

const router = express.Router();

const controller = new UsersController();

router.post('/', async (req, res, next) => {
  await controller.create(req, res, next);
});

router.get('/:user_id', async (req, res, next) => {
  await controller.getById(req, res, next);
});

router.get('/by-username/:username', async (req, res, next) => {
  await controller.getByUsername(req, res, next);
});

router.get('/:user_id/posts', async (req, res, next) => {
  await controller.getPosts(req, res, next);
})

router.patch('/:user_id/author/:value', async (req, res, next) => {
  await controller.setUserIsAuthor(req, res, next);
})

router.patch('/:user_id/admin/:value', async (req, res, next) => {
  await controller.setUserIsAdmin(req, res, next);
})

module.exports = router;
