//

let currentPage = 0; // Página actual, comienza con la primera página
const loadMoreButton = document.getElementById('load-more-button');

loadMoreButton.addEventListener('click', async () => {
  currentPage++;
  const posts = await fetch(`/posts/5/offset/${currentPage * 5}`);

  if (posts.ok) {
    const newPosts = await posts.json();

    if (newPosts.posts.length > 0) {
      for (const post of newPosts.posts) {
        const user = await (await fetch(`/users/${post.author_id}`)).json();
        const comments =
          await (await fetch(`/posts/${post.id}/comments`)).json();
    
        post.author = user.result;
        post.comments = comments;
      }

      renderNewPosts(newPosts);
    }

    if (newPosts.posts.length !== 5) {
      loadMoreButton.style.display = 'none';
    }
  } else {
    console.error('Failed to fetch new posts');
  }
});

// Renderiza las nuevas publicaciones en tu página, imita el comportamiento de
// la vista: small_posts.ejs
function renderNewPosts(newPosts) {
  const container = document.getElementById('posts-container');
  let postsDivs = new Map();

  newPosts.posts.forEach((post, index) => {
    const postDiv = createPostCard(post);

    if (index % 2 === 0) {
      const postsDiv = document.createElement('div');
      postsDiv.classList.add('col-lg-6');
      postsDivs.set(index, postsDiv);

      container.appendChild(postsDiv);
      postsDiv.appendChild(postDiv);
    } else {
      postsDivs.get(index - 1).appendChild(postDiv);
    }
  });
}

// imita el comportamiento de la vista: small_post.ejs
function createPostCard(post) {
  const postDiv = document.createElement('div');
  postDiv.classList.add('card', 'mb-4');

  if (post.image !== null) {
    postDiv.innerHTML = `
      <a href="/users/${post.id}/show_posts"><img class="card-img-top" src="${post.image}" alt="${post.title}" /></a>`;
  }
  postDiv.innerHTML += `
      <div class="card-body">
        <div class="small text-muted">${new Date(post.date).toLocaleDateString("es-cr", { dateStyle: "long" })}</div>
        <h2 class="card-title h4"><a href="/users/${post.id}/show_posts">${post.title}</a></h2>
        ${post.summary.length < 300 ? `<p class="card-text">${post.summary}</p>` : `<p class="card-text">${post.summary.substring(0, 300)}...</p><a class="btn btn-primary" href="/users/${post.id}/show_posts">Leer más →</a>`}
      </div>
      <div class="card-footer">
        <span>Autor: <a href="/users/${post.id}/show_posts">${post.author.username}</a></span>
        <span>Comentarios: <a href="/users/${post.id}/show_posts">${post.comments.comments.length}</a></span>
      </div>
    `;

  return postDiv;
}
