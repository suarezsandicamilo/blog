//

const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('sign_out');
});

module.exports = router;
