//

const express = require('express');

const router = express.Router();

router.get('/:category_id', async (req, res, next) => {
  const { category_id } = req.params;

  const authors = await (await fetch(`http://${req.headers.host}/admin/users/authors`)).json();
  const categories = await (await fetch(`http://${req.headers.host}/categories`)).json();
  const posts = await (await fetch(`http://${req.headers.host}/posts/categories/${category_id}`)).json();

  for (const post of posts.posts) {
    const user = await (await fetch(`http://${req.headers.host}/users/${post.author_id}`)).json();
    const comments = await (await fetch(`http://${req.headers.host}/posts/${post.id}/comments`)).json();

    post.author = user.result;
    post.comments = comments;
  }

  const header_title = categories.categories
    .filter(c => c.id === parseInt(category_id))[0].name;

  res.render('view_categories', {
    title: 'Blog',
    header_title,
    authors,
    categories,
    posts
  });
});

module.exports = router;
