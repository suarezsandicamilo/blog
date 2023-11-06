//

const express = require('express');

const { AuthController } = require('./../controllers/auth_controller.js');

const router = express.Router();

const auth_controller = new AuthController();

router.post('/:user_id', async (req, res, next) => {
    await auth_controller.authenticate(req, res, next);
});

module.exports = router;
