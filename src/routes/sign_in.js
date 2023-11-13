//

const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('sign_in', {
    title: 'Blog',
    header_title: 'Iniciar sesión'
  });
});

module.exports = router;
