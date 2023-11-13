document.querySelectorAll('.delete-comment-button').forEach(button => {
  button.addEventListener('click', async (event) => {
    const comment_id = event.currentTarget.dataset.commmentId;
    const post_id = event.currentTarget.dataset.postId;
    // Aquí puedes utilizar postId para enviar una solicitud para eliminar esa publicación

    const response = await fetch(`/admin/${post_id}/post/${comment_id}/comment`, {
      method: 'DELETE',
    });

    if (response.ok) {
      window.location = '/admin/admin_posts';
      alert('Comentario eliminado correctamente');
    } else {
      throw new Error('No se pudo eliminar el comentario');
    }
  });
});
