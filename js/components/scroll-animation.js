function entryAnimation(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const ele = entry.target;
      ele.classList.add('visible');
    } else {
      const ele = entry.target;
      ele.classList.remove('visible');
    }
  });
}

// const options = {
//   root: null,
//   rootMargin: '0px',
//   threshold: 0.1,
// };

const observer = new IntersectionObserver(entryAnimation);
let scrollAnimationElements = document.querySelectorAll('.scroll-animation-container > li');

scrollAnimationElements.forEach((scrollAnimationElement) =>
  observer.observe(scrollAnimationElement)
);
