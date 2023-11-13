//

const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const authors = await (await fetch(`http://${req.headers.host}/admin/users/authors`)).json();
  const categories = await (await fetch(`http://${req.headers.host}/categories`)).json();
  const posts = await (await fetch(`http://${req.headers.host}/posts/5/offset/0`)).json();

  for (const post of posts.posts) {
    const user = await (await fetch(`http://${req.headers.host}/users/${post.author_id}`)).json();
    const comments = await (await fetch(`http://${req.headers.host}/posts/${post.id}/comments`)).json();

    post.author = user.result;
    post.comments = comments;
  }

  res.render('index', {
    title: 'Blog',
    header_title: 'Blog',
    authors,
    categories,
    posts
  });
});

router.get('/selection', async (req, res, next) => {
  res.render('admin_selection' , {
    title: 'Blog',
    header_title: 'Seleccion de permisos',
  });
});

router.get('/action_selection', async (req, res, next) => {
  res.render('action_selection' , {
    title: 'Blog',
    header_title: 'Selección de gestión',
  });
});

module.exports = router;
