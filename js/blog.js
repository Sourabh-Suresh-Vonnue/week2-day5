function entryAnimation(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const article = entry.target;
      article.classList.add('visible');
    } else {
      const article = entry.target;
      article.classList.remove('visible');
    }
  });
}

// const options = {
//   root: null,
//   rootMargin: '0px',
//   threshold: 0.1,
// };

const observer = new IntersectionObserver(entryAnimation);
let blogArticles = document.querySelectorAll('#blogs article');
blogArticles.forEach((article) => observer.observe(article));

// reading progress
function readingProgress(event) {
  requestAnimationFrame(readingProgressUpdate);
}
function readingProgressUpdate() {
  const progressBar = document.querySelector('.progress-bar');

  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  const scrollPercent = (scrollY / docHeight) * 100;
  progressBar.style.width = `${scrollPercent}%`;
}

window.addEventListener('scroll', readingProgress);

// back-to-top
const backToTopBtn = document.getElementById('back-to-top');

backToTopBtn.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

function backToTop(event) {
  const scrollY = window.scrollY;

  if (scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = '';
  }
}

window.addEventListener('scroll', backToTop);

// Comments System
let articleComments = {};
blogArticles.forEach((blogArticle) => {
  articleComments[blogArticle.id] = [];
});

// localStorage.clear();
let articleCommentsLocalStorage = JSON.parse(localStorage.getItem('articleComments'));

loadArticleComments();
articleComments = articleCommentsLocalStorage ? articleCommentsLocalStorage : articleComments;
/**
 *
 * @param {Event} event
 */
function commentFormSubmitFn(event) {
  event.preventDefault();
  const name = event.target.querySelector('input').value.trim();
  const content = event.target.querySelector('textarea').value.trim();

  let newCommentElement;
  if (event.target.classList.contains('comment-form')) {
    const parentArticle = event.target.closest('article');
    const noOfComments = parentArticle.querySelector('section.comments ul').childElementCount;
    newCommentElement = createNewComment(name, content, parentArticle.id + '-' + noOfComments);
  } else if (event.target.classList.contains('reply-form')) {
    const parentList = event.target.closest('li');
    const noOfRelpies = event.target.nextElementSibling.childElementCount;
    newCommentElement = createNewComment(name, content, parentList.id + noOfRelpies);
  }

  let commentList = event.target.nextElementSibling;
  commentList.prepend(newCommentElement);
  event.target.reset();
}
let commentForms = Array.from(document.getElementsByClassName('comment-form'));
commentForms.forEach((commentForm) => {
  commentForm.addEventListener('submit', commentFormSubmitFn);
});

let replyForms = Array.from(document.getElementsByClassName('reply-form'));
replyForms.forEach((replyForm) => {
  replyForm.addEventListener('submit', commentFormSubmitFn);
});
let noOfRelpies = replyForms.length;

function createNewComment(name, content, id, upvotes = '', upvoted = false) {
  let newComment = document.createElement('li');
  newComment.id = id;
  newComment.classList.add('reply');
  newComment.innerHTML = `<div class="actual-comment">
                    <span class="commenter"></span>
                    <div class="comment-content"></div>
                    <div class="reaction">
                      <button class="upvotes" aria-pressed="false" type="button"></button>
                    </div>
                  </div>
                  <details>
                    <summary>replies</summary>
                    <form class="reply-form">
                      <input type="text" name="comment-form-commenter" id="" placeholder="name" />
                      <textarea name="comment-form-comment" id="" placeholder="Leave a reply"></textarea>
                      <button type="submit">Reply</button>
                    </form>
                    <ul></ul>
                  </details>`;
  newComment.querySelector('.actual-comment > .commenter').textContent = name;
  newComment.querySelector('.actual-comment > .comment-content').textContent = content;
  newComment.querySelector('.actual-comment > .reaction > .upvotes').textContent = upvotes;
  newComment.querySelector('form').addEventListener('submit', commentFormSubmitFn);

  let upvoteBtn = newComment.querySelector('.upvotes');
  upvoteBtn.addEventListener('click', increaseUpvoteCount);

  upvoteBtn.setAttribute('aria-pressed', upvoted);
  if (upvoted == 'true') {
    upvoteBtn.classList.add('upvoted');
  }

  const commentRelyObject = {
    id: id,
    name: name,
    content: content,
    upvotes: upvotes,
    upvoted: upvoted,
    replies: [],
  };
  const artComm = articleComments[id.slice(0, 2)];
  let temp = artComm;
  for (let index of id.slice(3, -1)) {
    temp = temp[index].replies;
  }
  temp.push(commentRelyObject);

  localStorage.setItem('articleComments', JSON.stringify(articleComments));
  return newComment;
}

function increaseUpvoteCount(event) {
  const upvoteBtn = event.target;

  if (upvoteBtn.getAttribute('aria-pressed') == 'false') {
    upvoteBtn.textContent = Number(upvoteBtn.textContent) + 1;
    upvoteBtn.classList.add('upvoted');
    upvoteBtn.setAttribute('aria-pressed', true);
  } else {
    upvoteBtn.textContent = Number(upvoteBtn.textContent) - 1;
    upvoteBtn.classList.remove('upvoted');
    upvoteBtn.setAttribute('aria-pressed', false);
  }

  const parentList = upvoteBtn.closest('li');
  const parentListId = parentList.id;

  const artComm = articleComments[parentListId.slice(0, 2)];
  let temp = artComm;

  temp = temp[Number(parentListId.at(3))];
  for (index of parentListId.slice(4)) {
    temp = temp.replies[index];
  }
  temp.upvotes = upvoteBtn.textContent;
  temp.upvoted = upvoteBtn.getAttribute('aria-pressed');

  localStorage.setItem('articleComments', JSON.stringify(articleComments));
}

let upvoteBtns = Array.from(document.getElementsByClassName('upvotes'));
upvoteBtns.forEach((upvoteBtn) => {
  upvoteBtn.addEventListener('click', increaseUpvoteCount);
});

function loadArticleComments() {
  for (let article in articleCommentsLocalStorage) {
    let articleEle = document.getElementById(article);
    let articleCommentList = articleEle.querySelector('section.comments > details > ul');

    articleCommentsLocalStorage[article].forEach((comment) => {
      articleCommentList.prepend(loadReplies(comment));
    });
  }
}
function loadReplies(comment) {
  let commetEle = createNewComment(
    comment.name,
    comment.content,
    comment.id,
    comment.upvotes,
    comment.upvoted
  );
  if (comment.replies.length == 0) {
    return commetEle;
  }
  let commetEleReplyList = commetEle.querySelector('details > ul');

  comment.replies.forEach((reply) => {
    commetEleReplyList.prepend(loadReplies(reply));
  });
  return commetEle;
}
