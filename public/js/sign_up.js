document.getElementById('sign-up-form').addEventListener('submit', handleSubmit);

function checkPassword() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return false;
  }

  return true;
}

const getUser = async (path) => {
  const response = await fetch(path);

  const { result, error } = await response.json();

  return result;
};

const createUser = async (username, password, email) => {
  const data = {
    username,
    email,
    hashed_password: password  // Aquí debes hacer el hash del password, si es requerido
  }
  const response = await fetch(`/users`, {
    method: 'POST',
    mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });

  const { result } = await response.json();

  return result;
};

async function handleSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('sign-up-form');

  const form_data = new FormData(form);

  const username = form_data.get('username');
  const email = form_data.get('email');

  // Simular la verificación del usuario
  const userByUsername = await getUser(`/users/by-username/${username}`);

  const userByEmail = await getUser(`/users/by-email/${email}`);

  if (userByUsername !== null) {
    alert('El nombre de usuario ya existe!');
    // Aquí se puede enviar el formulario al servidor para el registro
  } else {
    if (userByEmail !== null) {
      alert('El correo ya tiene una cuenta');
    } else {
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
      } else {
        if (createUser(username, password, email)) {
          alert('¡Usuario registrado exitosamente!');
          window.location = '/sign-in';
        } else {
          alert('No se pudo registrar al usuario');
        }
      }
    }
  }
}
