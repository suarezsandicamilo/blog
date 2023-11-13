//

const express = require('express');

const { AdminController } = require('./../controllers/admin_controller.js');

const router = express.Router();

const controller = new AdminController();

router.get('/users', async (req, res, next) => {
  await controller.getAllUsers(req, res, next);
});

router.get('/users/authors', async (req, res, next) => {
  await controller.getAllAuthors(req, res, next);
});

router.delete('/:post_id/delete', async (req, res, next) => {
  console.log("Voy a eliminar un post");
  await controller.removePostById(req, res, next);
});

// fetch(`/admin/${user_id}/delete_author
router.delete('/:author_id/delete_author', async (req, res, next) => {
  console.log("Voy a eliminar un autor");
  await controller.removeAuthorById(req, res, next);
});

router.delete('/:post_id/post/:comment_id/comment', async (req, res, next) => {
  console.log("Voy a eliminar un comment");
  await controller.removeCommentByIds(req, res, next);
});

router.delete('/:category_id/delete_category', async (req, res, next) => {
  console.log("Voy a eliminar una categoria");
  await controller.removeCategoryById(req, res, next);
});

router.get('/admin_posts', async (req, res, next) => {
  const authors = await (await fetch(`http://${req.headers.host}/admin/users/authors`)).json();
  const categories = await (await fetch(`http://${req.headers.host}/categories`)).json();
  const posts = await (await fetch(`http://${req.headers.host}/posts/`)).json();

  for (const post of posts.posts) {
    const user = await (await fetch(`http://${req.headers.host}/users/${post.author_id}`)).json();
    const comments = await (await fetch(`http://${req.headers.host}/posts/${post.id}/comments`)).json();

    post.author = user.result;
    post.comments = comments;
  }

  res.render('admin_posts', {
    title: 'Blog',
    header_title: 'Administrar publicaciones',
    authors,
    categories,
    posts
  });
});

router.get('/admin_categories', async (req, res, next) => {
  const authors = await (await fetch(`http://${req.headers.host}/admin/users/authors`)).json();
  const categories = await (await fetch(`http://${req.headers.host}/categories`)).json();
  const posts = await (await fetch(`http://${req.headers.host}/posts/`)).json();

  for (const post of posts.posts) {
    const user = await (await fetch(`http://${req.headers.host}/users/${post.author_id}`)).json();
    const comments = await (await fetch(`http://${req.headers.host}/posts/${post.id}/comments`)).json();

    post.author = user.result;
    post.comments = comments;
  }

  res.render('admin_categories', {
    title: 'Blog',
    header_title: 'Administrar categorías',
    authors,
    categories,
    posts
  });
});

router.get('/admin_authors', async (req, res, next) => {
  const authors = await (await fetch(`http://${req.headers.host}/admin/users/authors`)).json();
  const categories = await (await fetch(`http://${req.headers.host}/categories`)).json();
  const posts = await (await fetch(`http://${req.headers.host}/posts/`)).json();

  for (const post of posts.posts) {
    const user = await (await fetch(`http://${req.headers.host}/users/${post.author_id}`)).json();
    const comments = await (await fetch(`http://${req.headers.host}/posts/${post.id}/comments`)).json();

    post.author = user.result;
    post.comments = comments;
  }

  res.render('admin_authors', {
    title: 'Blog',
    header_title: 'Administrar categorías',
    authors,
    categories,
    posts
  });
});

// "/admin/comments_post/<%= id %>"
router.get('/comments_post/:post_id', async (req, res, next) => {
  const { post_id } = req.params;

  const authors = await (await fetch(`http://${req.headers.host}/admin/users/authors`)).json();
  const categories = await (await fetch(`http://${req.headers.host}/categories`)).json();

  const post = (await (await fetch(`http://${req.headers.host}/posts/${post_id}`)).json()).result;
  const author = (await (await fetch(`http://${req.headers.host}/users/${post.author_id}`)).json()).result;
  const comments = await (await fetch(`http://${req.headers.host}/posts/${post.id}/comments`)).json();
  for (const comment of comments.comments) {
    const user = await (await fetch(`http://${req.headers.host}/users/${comment.user_id}`)).json();

    comment.author = user.result.username;
  }

  res.render('admin_post_comments', {
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
