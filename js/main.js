import { init as darkModeInit } from './components/darkMode.js';
import { init as accordionInit } from './components/accordion.js';
import { init as navInit } from './components/nav.js';

// check performance of init()
performance.mark('init-start');
darkModeInit();
accordionInit();
navInit();
performance.mark('init-end');
const performanceEntry = performance.measure('init-duration', 'init-start', 'init-end');
console.log('init duraion: ', performanceEntry.duration); // init duraion:  1.8000000044703484

// detect slow connection and disable animations
const connection = navigator.connection;

const allAnimations = document.getAnimations();
const allAutoplay = document.querySelectorAll('video[autoplay], audio[autoplay]');

if (connection.effectiveType == '2g' || connection.effectiveType == 'slow-2g') {
  allAnimations.forEach((animation) => animation.cancel());
  document.addEventListener('animationstart', (event) => {
    const animations = event.target.getAnimations();
    animations.forEach((ani) => ani.cancel());
  });
  allAutoplay.forEach((autoplay) => {
    autoplay.removeAttribute('autoplay');
  });
}
