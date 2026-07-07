const navDrawer = document.querySelector('.nav-drawer');
const hamburgerMenuBtn = document.getElementById('hamburger-menu');

function openNavDrawer() {
  navDrawer.classList.toggle('open');
  document.body.classList.toggle('body-scroll');
  let isAriaExpanded = hamburgerMenuBtn.getAttribute('aria-expanded') == 'true';
  hamburgerMenuBtn.setAttribute('aria-expanded', !isAriaExpanded);
  navDrawer.addEventListener('keydown', navDrawerFocusTrap);
}

hamburgerMenuBtn.addEventListener('click', openNavDrawer);

function closeNavDrawer() {
  navDrawer.classList.remove('open');
  document.body.classList.remove('body-scroll');
  hamburgerMenuBtn.setAttribute('aria-expanded', false);
  hamburgerMenuBtn.setAttribute('aria-expanded', false);
  navDrawer.removeEventListener('keydown', navDrawerFocusTrap);
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeNavDrawer();
  }
});

navDrawer.addEventListener('click', function () {
  //   const isNavDrawerOpen = navDrawer.classList.contains('open');
  //   if (isNavDrawerOpen) {
  closeNavDrawer();
  //   }
});

const focusableElements = navDrawer.getElementsByTagName('a');
let firstFocusEle = focusableElements[0];
let lastFocusEle = focusableElements[focusableElements.length - 1];

function navDrawerFocusTrap(e) {
  const isTab = e.key === 'Tab';
  if (!isTab) return;

  if (e.shiftKey) {
    if (document.activeElement === firstFocusEle) {
      lastFocusEle.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === lastFocusEle) {
      firstFocusEle.focus();
      e.preventDefault();
    }
  }
}
