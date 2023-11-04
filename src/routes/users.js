//

var express = require('express');

var router = express.Router();

router.get('/', (req, res, next) => {
  res.send('src/routes/users.js');
});

module.exports = router;
