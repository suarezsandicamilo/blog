//

const express = require('express');

const router = express.Router();

router.get('/:post_id', async (req, res, next) => {
  const { post_id } = req.params;

  console.log(post_id);

  const authors = await (await fetch(`http://${req.headers.host}/admin/users/authors`)).json();
  const categories = await (await fetch(`http://${req.headers.host}/categories`)).json();

  const post = (await (await fetch(`http://${req.headers.host}/posts/${post_id}`)).json()).result;
  const author = (await (await fetch(`http://${req.headers.host}/users/${post.author_id}`)).json()).result;
  const comments = await (await fetch(`http://${req.headers.host}/posts/${post.id}/comments`)).json();

  for (const comment of comments.comments) {
    const user = await (await fetch(`http://${req.headers.host}/users/${comment.user_id}`)).json();

    comment.author = user.result.username;
  }

  res.render('view_posts', {
    title: 'Blog',
    header_title: post.title,
    authors,
    categories,
    post,
    author,
    comments
  });
});

module.exports = router;
