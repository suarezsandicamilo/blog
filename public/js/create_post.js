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

const create_post_form = document.querySelector('#create-post-form');

const createPost = async (title, summary, text, image) => {
    let body = {
        title,
        summary,
        text,
        author_id: parseInt(Cookies.get('user_id'))
    };

    if (image !== null) {
        body.image = image;
    }

    const { result, error } = await fetchPost('/posts', body);

    if (result === null) {
        alert(error);
    } else {
        window.location = '/';
    }
}

create_post_form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const form_data = new FormData(create_post_form);

    const title = form_data.get('title');
    const summary = form_data.get('summary');
    const text = form_data.get('text');

    let image = form_data.get('image');

    if (image.length === '') {
        image = null;
    }

    await createPost(title, summary, text, image);
});
