import { fetchJSON } from './utils.js';

async function getPosts() {
  let posts = await fetchJSON('https://jsonplaceholder.typicode.com/posts?_limit=3');
  return posts;
}

async function updateLatestNews() {
  const latestNews = document.querySelector('#latest-news > .grid-wrapper');
  try {
    latestNews.classList.add('loading');

    const posts = await getPosts();
    posts.forEach((post) => {
      const latestNewsli = document.createElement('li');
      latestNewsli.innerHTML = `<h3></h3>
            <p></p>`;
      latestNewsli.querySelector('h3').textContent = post.title;
      latestNewsli.querySelector('p').textContent = post.body;
      latestNews.appendChild(latestNewsli);
    });
  } catch (err) {
    console.log(err);
    retryBtn.style.display = 'block';
  } finally {
    latestNews.classList.remove('loading');
  }
}

updateLatestNews();
const retryBtn = document.querySelector('.retry-btn');
retryBtn.addEventListener('click', () => {
  updateLatestNews();
  retryBtn.style.display = 'none';
});
