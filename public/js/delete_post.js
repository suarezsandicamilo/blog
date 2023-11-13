document.querySelectorAll('.delete-post-button').forEach(button => {
  button.addEventListener('click', async (event) => {
    const post_id = event.currentTarget.dataset.postId;
    // Aquí puedes utilizar postId para enviar una solicitud para eliminar esa publicación
    console.log(`/posts/${post_id}/delete`);

    const response = await fetch(`/admin/${post_id}/delete`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Publicación eliminada correctamente');
      window.location = '/admin/admin_posts';
    } else {
      throw new Error('No se pudo eliminar la publicación');
    }
  });
});
