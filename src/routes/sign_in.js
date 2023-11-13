//

const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const sessions = await fetch(`http://${req.headers.host}/sessions`);

  res.render('sign_in', {
    title: 'Blog',
    header_title: 'Iniciar sesión',
    sessions: await sessions.json()
  });
});

module.exports = router;
