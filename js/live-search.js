import { debounce } from './utils.js';

export const searchInp = document.getElementById('live-search');

const serviceCards = Array.from(document.querySelectorAll('#services .grid-wrapper > li'));
const originalCardContent = serviceCards.map((card) => card.innerHTML);

const noResult = document.getElementById('no-result');

// let debounceTimer;
const debounceDelay = 300;

function textHighlight(parent, inp, regex) {
  const childNodes = Array.from(parent.childNodes);

  childNodes.forEach((node) => {
    if (node.nodeType == Node.TEXT_NODE) {
      const text = node.textContent;

      if (regex.test(text)) {
        const parts = text.split(regex);
        const newNodes = parts.map((part) => {
          if (part.toLocaleLowerCase() === inp.toLocaleLowerCase()) {
            const mark = document.createElement('span');
            mark.className = 'highlight';
            mark.textContent = part;
            return mark;
          } else {
            return document.createTextNode(part);
          }
        });

        node.replaceWith(...newNodes);
      }
    } else {
      textHighlight(node, inp, regex);
    }
  });
}

export function liveSearch(inp = '', pushHistory = false) {
  noResult.style.display = 'none';

  if (inp == '') {
    serviceCards.forEach((card, index) => {
      card.innerHTML = originalCardContent[index];
      card.style.display = '';
    });
    return;
  }

  serviceCards.forEach((card, index) => {
    card.innerHTML = originalCardContent[index];
    card.style.display = 'none';
  });

  const escapedTerm = inp.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`(${escapedTerm})`, 'gi');

  const matchCards = serviceCards.filter((card) => {
    if (regex.test(card.textContent)) {
      card.style.display = '';
      return true;
    } else {
      return false;
    }
  });
  if (matchCards.length == 0) {
    noResult.style.display = 'block';
  }

  matchCards.forEach((card) => {
    textHighlight(card, inp, regex);
  });

  if (pushHistory) {
    const url = new URL(window.location);
    url.searchParams.set('input', inp);
    history.pushState({ input: inp }, null, url);
  }
}

let debounceLiveSearch = debounce(liveSearch, debounceDelay);

searchInp.addEventListener('input', (event) => {
  const inp = event.target.value.trim().toLowerCase();
  debounceLiveSearch(inp, true);

  // clearTimeout(debounceTimer);
  // debounceTimer = setTimeout(() => {
  //   const inp = event.target.value.trim().toLowerCase();
  //   liveSearch(inp, true);
  // }, debounceDelay);
});

window.addEventListener('popstate', () => {
  // const state = event.state;
  // console.log(state);
  // const query = state?.input ?? '';
  // console.log(query);

  const url = new URL(window.location);
  let input;
  if (url.searchParams.has('input')) {
    input = url.searchParams.get('input');
  } else {
    input = '';
  }
  searchInp.value = input;
  liveSearch(input, false);
});

document.addEventListener('DOMContentLoaded', () => {
  const url = new URL(window.location);
  let input;
  if (url.searchParams.has('input')) {
    input = url.searchParams.get('input');
  } else {
    input = '';
  }
  searchInp.value = input;
  liveSearch(input, false);
});
