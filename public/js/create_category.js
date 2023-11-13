const fetchPost = async (url = '', data = {}) => {
  const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
  });

  return await response.json();
}

const create_post_form = document.querySelector('#create-category-form');

const createCategory = async (name) => {
  let body = {
      name
  };

  const { result } = await fetchPost('/categories', body);

  if (result) {
      alert("Categoría creada exitosamente");
      window.location = '/admin/admin_categories';
  } else {
      alert("No se pudo crear la categoría");
  }
}

create_post_form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const form_data = new FormData(create_post_form);

  const name = form_data.get('name');

  await createCategory(name);
});
