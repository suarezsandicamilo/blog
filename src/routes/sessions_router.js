//

const express = require('express');

const { SessionsController } = require('./../controllers/sessions_controller');

const router = express.Router();

const controller = new SessionsController();

router.post('/start/:user_id', async (req, res, next) => {
  await controller.start(req, res, next);
});

router.post('/end', async (req, res, next) => {
  await controller.end(req, res, next);
});

router.get('/', async (req, res, next) => {
  await controller.getUserId(req, res, next);
});

module.exports = router;