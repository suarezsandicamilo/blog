//

const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('sign_up', {
    title: 'Blog',
    header_title: 'Registrarse'
  });
});

module.exports = router;
