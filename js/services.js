import { fetchJSON } from './utils.js';

async function getPosts() {
  let posts = await fetchJSON('https://jsonplaceholder.typicode.com/posts?_limit=10');
  return posts;
}

async function updateServices() {
  const services = document.querySelector('#services > .grid-wrapper');
  try {
    services.classList.add('loading');

    const posts = await getPosts();
    posts.forEach((post) => {
      const serviceli = document.createElement('li');
      serviceli.innerHTML = `<article>
                <h2></h2>
                <p></p>
              </article>`;
      serviceli.querySelector('h2').textContent = post.title;
      serviceli.querySelector('p').textContent = post.body;
      services.appendChild(serviceli);
    });
  } catch (err) {
    console.log(err);
    retryBtn.style.display = 'block';
  } finally {
    services.classList.remove('loading');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await updateServices();
  let m = await import('./live-search.js');
  const url = new URL(window.location);
  let input;
  if (url.searchParams.has('input')) {
    input = url.searchParams.get('input');
  } else {
    input = '';
  }
  m.searchInp.value = input;
  m.liveSearch(input, false);
});

const retryBtn = document.querySelector('.retry-btn');
retryBtn.addEventListener('click', (event) => {
  updateServices();
  retryBtn.style.display = 'none';
});
