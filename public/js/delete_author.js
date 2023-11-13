document.querySelectorAll('.delete-user-button').forEach(button => {
  button.addEventListener('click', async (event) => {
    const user_id = event.currentTarget.dataset.userId;
    // Aquí puedes utilizar postId para enviar una solicitud para eliminar esa publicación
    console.log(`/admin/${user_id}/delete_category`);

    const response = await fetch(`/admin/${user_id}/delete_author`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert(`Autor eliminado exitosamente.`);
      window.location = '/admin/admin_authors';
    } else {
      alert(`No se pudo eliminar la categoría.`);
      throw new Error('No se pudo eliminar el autor');
    }
  });
});