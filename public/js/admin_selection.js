document.getElementById('user_permissions').addEventListener('click', () => {
  // Redirigir a la página de usuario
  window.location.href = '/'; // Reemplaza '/user' con la ruta de la página del usuario
});

document.getElementById('admin_permissions').addEventListener('click', () => {
  // Redirigir a la página de administrador
  window.location.href = '/action_selection'; // Reemplaza '/admin' con la ruta de la página de administrador
});