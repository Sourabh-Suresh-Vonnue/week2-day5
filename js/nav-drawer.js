const navDrawer = document.querySelector('.nav-drawer');

function openNavDrawer() {
  navDrawer.classList.toggle('open');

  document.body.classList.toggle('body-scroll');

  let isAriaExpanded = navDrawer.getAttribute('aria-expanded') == 'true';
  navDrawer.setAttribute('aria-expanded', !isAriaExpanded);
}

function closeNavDrawer() {
  navDrawer.classList.remove('open');
  document.body.classList.remove('body-scroll');
  navDrawer.setAttribute('aria-expanded', false);
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeNavDrawer();
  }
});

navDrawer.addEventListener('click', function (event) {
  //   const isNavDrawerOpen = navDrawer.classList.contains('open');
  //   if (isNavDrawerOpen) {
  closeNavDrawer();
  //   }
});

const focusableElements = navDrawer.getElementsByTagName('a');
let firstFocusEle = focusableElements[0];
let lastFocusEle = focusableElements[focusableElements.length - 1];

navDrawer.addEventListener('keydown', function (e) {
  const isTab = e.key === 'Tab';
  if (!isTab) return;

  if (e.shiftKey) {
    if (document.activeElement === firstFocusEle) {
      lastFocusEle.focus();
      e.preventDefault;
    }
  } else {
    if (document.activeElement === lastFocusEle) {
      firstFocusEle.focus();
      e.preventDefault();
    }
  }
});
