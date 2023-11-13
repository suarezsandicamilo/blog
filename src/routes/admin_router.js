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

router.delete('/:category_id/delete_category', async (req, res, next) => {
  console.log("Voy a eliminar una categoria");
  await controller.removeCategoryById(req, res, next);
});

router.get('/delete_posts', async (req, res, next) => {
  const authors = await (await fetch(`http://${req.headers.host}/admin/users/authors`)).json();
  const categories = await (await fetch(`http://${req.headers.host}/categories`)).json();
  const posts = await (await fetch(`http://${req.headers.host}/posts/`)).json();

  for (const post of posts.posts) {
    const user = await (await fetch(`http://${req.headers.host}/users/${post.author_id}`)).json();
    const comments = await (await fetch(`http://${req.headers.host}/posts/${post.id}/comments`)).json();

    post.author = user.result;
    post.comments = comments;
  }

  res.render('delete_posts_index', {
    title: 'Blog',
    header_title: 'Eliminar publicaciones',
    authors,
    categories,
    posts
  });
});

router.get('/delete_categories', async (req, res, next) => {
  const authors = await (await fetch(`http://${req.headers.host}/admin/users/authors`)).json();
  const categories = await (await fetch(`http://${req.headers.host}/categories`)).json();
  const posts = await (await fetch(`http://${req.headers.host}/posts/`)).json();

  for (const post of posts.posts) {
    const user = await (await fetch(`http://${req.headers.host}/users/${post.author_id}`)).json();
    const comments = await (await fetch(`http://${req.headers.host}/posts/${post.id}/comments`)).json();

    post.author = user.result;
    post.comments = comments;
  }

  res.render('delete_categories_index', {
    title: 'Blog',
    header_title: 'Eliminar categorías',
    authors,
    categories,
    posts
  });
});

// router.get('/selection', async (req, res, next) => {
//   res.render('admin_selection' , {
//     title: 'Admin selection',
//     header_title: 'Admin selection',
//   });
// });

module.exports = router;
