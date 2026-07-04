const searchInp = document.getElementById('live-search');

const serviceCards = Array.from(document.querySelectorAll('#services .grid-wrapper > li'));
const originalCardContent = serviceCards.map((card) => card.innerHTML);

const noResult = document.getElementById('no-result');

let debounceTimer;
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

function liveSearch(event) {
  const inp = event.target.value.trim().toLowerCase();
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

  const escapedTerm = inp.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
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
}

searchInp.addEventListener('input', (event) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    liveSearch(event);
  }, debounceDelay);
});
