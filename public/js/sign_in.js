//

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

const sign_in_form = document.querySelector('#sign-in-form');


document.getElementById('sign-up-btn').addEventListener('click', () => {
    window.location.href = '/sign-up';
});
  

const getUser = async (username) => {
    const response = await fetch(`/users/by-username/${username}`);

    const { result, error } = await response.json();

    if (result === null) {
        alert(error);
    }

    return result;
};

const signIn = async (user_id, password) => {
    const { result, error } = await fetchPost(`/sessions/${user_id}`, {
        hashed_password: password
    });

    if (!result) {
        alert(error);
    }

    return result;
}

sign_in_form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const form_data = new FormData(sign_in_form);

    const username = form_data.get('username');

    const user = await getUser(username);

    if (user !== null) {
        const password = form_data.get('password');

        const result = await signIn(user.id, password);

        if (result) {
            if (user.is_administrator) {
                window.location = '/selection';
            } else {
                window.location = '/';
            }
        }
    }
});
