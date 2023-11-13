document.querySelectorAll('.delete-category-button').forEach(button => {
  button.addEventListener('click', async (event) => {
    const category_id = event.currentTarget.dataset.categoryId;
    // Aquí puedes utilizar postId para enviar una solicitud para eliminar esa publicación
    console.log(`/admin/${category_id}/delete_category`);

    const response = await fetch(`/admin/${category_id}/delete_category`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert(`Categoría eliminada exitosamente.`);
      window.location = '/admin/admin_categories';
    } else {
      alert(`No se pudo eliminar la categoría.`);
      throw new Error('No se pudo eliminar la Categoria');
    }
  });
});