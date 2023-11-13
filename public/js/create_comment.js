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

const create_comment_form = document.querySelector('#create-comment-form');

const createComment = async (post_id, user_id, text) => {
    const { result, error } = await fetchPost(`/posts/${post_id}/comments`, {
        user_id,
        text
    });

    if (result === null) {
        alert(error);
    } else {
        window.location.reload();
    }
}

create_comment_form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const form_data = new FormData(create_comment_form);

    const text = form_data.get('text');
    const post_id = parseInt(form_data.get('post_id'));

    const user_id = 1; // TODO: Change for the user in session

    await createComment(post_id, user_id, text);
});
