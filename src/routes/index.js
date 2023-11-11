//

const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const authors = await fetch(`http://${req.headers.host}/admin/users/authors`);

  const categories = await fetch(`http://${req.headers.host}/categories`);

  const posts = await fetch(`http://${req.headers.host}/posts`);

  res.render('index', {
    title: 'Blog',
    authors: await authors.json(),
    categories: await categories.json(),
    posts: await posts.json()
  });
});

module.exports = router;
