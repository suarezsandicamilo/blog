document.getElementById('admin_posts_btn').addEventListener('click', () => {
  // Redirigir a la página de usuario
  window.location.href = '/admin/admin_posts'; // Reemplaza '/user' con la ruta de la página del usuario
});

document.getElementById('delete_comments_btn').addEventListener('click', () => {
  // Redirigir a la página de administrador
  window.location.href = '/admin/delete_posts'; // Reemplaza '/admin' con la ruta de la página de administrador
});

document.getElementById('delete_authors_btn').addEventListener('click', () => {
  // Redirigir a la página de administrador
  window.location.href = '/admin/admin_authors'; // Reemplaza '/admin' con la ruta de la página de administrador
});

document.getElementById('admin_categories_btn').addEventListener('click', () => {
  // Redirigir a la página de administrador
  window.location.href = '/admin/admin_categories'; // Reemplaza '/admin' con la ruta de la página de administrador
});
