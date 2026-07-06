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
