const sections = Array.from(document.getElementsByTagName('section'));

const fullscreenOverlay = document.querySelector('.fullscreen-overlay');
const fullscreenContent = fullscreenOverlay.querySelector('.fullscreen-content');

const navBtnLeft = document.getElementById('nav-btn-left');
const navBtnRight = document.getElementById('nav-btn-right');

const closeBtn = fullscreenOverlay.querySelector('.close-btn');

const fullscreenImage = fullscreenContent.querySelector('.fullscreen-image');
fullscreenImage.style.width = '100%';

let imageNavFn;
let leftNavFn;
let rightNavFn;

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
const swipeThreshold = 50;

function imageFullscreen(section) {
  const image = event.target.closest('img');
  if (!image) return;

  fullscreenOverlay.style.display = 'flex';
  document.body.classList.add('body-scroll');
  for (const attr of image.attributes) {
    fullscreenImage.setAttribute(attr.name, attr.value);
  }

  const images = sectionImage.get(section);
  let currImageIndex = images.indexOf(image);

  // image nav functions
  leftNavFn = function () {
    let prevIndex = (currImageIndex - 1 + images.length) % images.length;
    for (const attr of images[prevIndex].attributes) {
      fullscreenImage.setAttribute(attr.name, attr.value);
    }
    currImageIndex = prevIndex;
  };
  rightNavFn = function () {
    let nextIndex = (currImageIndex + 1) % images.length;
    for (const attr of images[nextIndex].attributes) {
      fullscreenImage.setAttribute(attr.name, attr.value);
    }
    currImageIndex = nextIndex;
  };

  imageNavFn = function (event) {
    if ((event.type == 'click' && event.target === navBtnLeft) || event.key === 'ArrowLeft') {
      leftNavFn();
      return;
    } else if (
      (event.type == 'click' && event.target === navBtnRight) ||
      event.key === 'ArrowRight'
    ) {
      rightNavFn();
      return;
    }
  };

  fullscreenOverlay.addEventListener('click', imageNavFn);
  document.addEventListener('keydown', imageNavFn);
}

let sectionImage = new Map();

sections.forEach((section) => {
  section.addEventListener('click', imageFullscreen.bind(null, section));
  const images = Array.from(section.querySelectorAll('.grid-container img'));
  sectionImage.set(section, images);
});

fullscreenOverlay.addEventListener('click', (event) => {
  if (event.target != fullscreenOverlay) return;
  fullscreenOverlay.style.display = 'none';
  document.body.classList.remove('body-scroll');
  fullscreenOverlay.removeEventListener('click', imageNavFn);
  document.removeEventListener('keydown', imageNavFn);
});

fullscreenOverlay.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    fullscreenOverlay.style.display = 'none';
    document.body.classList.remove('body-scroll');
    fullscreenOverlay.removeEventListener('click', imageNavFn);
    document.removeEventListener('keydown', imageNavFn);
    return;
  }
  const isTab = event.key === 'Tab';
  if (!isTab) return;
  if (event.shiftKey) {
    if (document.activeElement === navBtnLeft) {
      closeBtn.focus();
      event.preventDefault();
    }
  } else {
    if (document.activeElement === closeBtn) {
      navBtnLeft.focus();
      event.preventDefault();
    }
  }
});

closeBtn.addEventListener('click', (event) => {
  fullscreenOverlay.style.display = 'none';
  document.body.classList.remove('body-scroll');
  fullscreenOverlay.removeEventListener('click', imageNavFn);
  document.removeEventListener('keydown', imageNavFn);
});

// touch swipe
fullscreenOverlay.addEventListener(
  'touchstart',
  (event) => {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
  },
  { passive: true }
);
fullscreenOverlay.addEventListener(
  'touchend',
  (event) => {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;

    swipeImageNav();
  },
  { passive: true }
);

function swipeImageNav() {
  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (Math.abs(diffX) > swipeThreshold) {
      if (diffX > 0) {
        leftNavFn();
      } else {
        rightNavFn();
      }
    }
  }
}
