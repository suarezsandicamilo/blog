//

const express = require('express');

const { UsersController } = require('./../controllers/users_controller.js');

const router = express.Router();

const controller = new UsersController();

router.post('/', async (req, res, next) => {
  await controller.create(req, res, next);
});

router.get('/:user_id', async (req, res, next) => {
  await controller.getById(req, res, next);
});

router.get('/by-username/:username', async (req, res, next) => {
  await controller.getByUsername(req, res, next);
});

router.get('/by-email/:email', async (req, res, next) => {
  await controller.getByEmail(req, res, next);
});

router.get('/:author_id/posts', async (req, res, next) => {
  await controller.getPosts(req, res, next);
})

router.get('/:author_id/show_posts', async (req, res, next) => {
  const user_id = req.params['author_id'];
  const user = await(await fetch(`http://${req.headers.host}/users/${user_id}`)).json();
  const posts = await(await fetch(`http://${req.headers.host}/users/${req.params['author_id']}/posts`)).json();

  for (const post of posts.posts) {
    const comments = await (await fetch(`http://${req.headers.host}/posts/${post.id}/comments`)).json();

    post.author = user.result;
    post.comments = comments;
  }

  res.render('user_posts', {
    title: 'Blog',
    header_title: user.result.username,
    user: user.result,
    posts
  });
})

router.patch('/:user_id/author/:value', async (req, res, next) => {
  await controller.setUserIsAuthor(req, res, next);
})

router.patch('/:user_id/admin/:value', async (req, res, next) => {
  await controller.setUserIsAdmin(req, res, next);
})

module.exports = router;
