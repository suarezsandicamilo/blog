//

const express = require('express');

const { SessionsController } = require('./../controllers/sessions_controller');

const router = express.Router();

const controller = new SessionsController();

router.post('/:user_id', async (req, res, next) => {
  await controller.start(req, res, next);
});

module.exports = router;
