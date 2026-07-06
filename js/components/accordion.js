const accordionContainer = document.querySelector('.accordion-container');

function expandAccordion(event) {
  const accordionBtn = event.target.closest('.accordion-button');
  if (accordionBtn == null) return;
  const accordionPanel = accordionBtn.nextElementSibling;
  const ariaExpanded = accordionBtn.getAttribute('aria-expanded') == 'true';
  if (ariaExpanded) {
    accordionBtn.setAttribute('aria-expanded', false);
    accordionPanel.style.display = 'none';
    accordionBtn.querySelector('.accordion-icon').textContent = '+';
    sessionStorage.removeItem('openAccordion');
  } else {
    accordionBtn.setAttribute('aria-expanded', true);
    accordionPanel.style.display = 'block';
    accordionBtn.querySelector('.accordion-icon').textContent = '-';
    sessionStorage.setItem('openAccordion', accordionBtn.id);
  }
  const accordions = Array.from(accordionContainer.getElementsByClassName('accordion-button'));

  accordions.forEach((accordion) => {
    if (accordion != accordionBtn) {
      accordion.setAttribute('aria-expanded', false);
      accordion.nextElementSibling.style.display = 'none';
      accordion.querySelector('.accordion-icon').textContent = '+';
    }
  });
}

const accordionBtns = Array.from(accordionContainer.getElementsByClassName('accordion-button'));
accordionBtns.forEach((accordion, index) => {
  accordion.addEventListener('keydown', (event) => {
    let nextIndex;
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        nextIndex = (index - 1 + accordionBtns.length) % accordionBtns.length;
        accordionBtns[nextIndex].focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        nextIndex = (index + 1) % accordionBtns.length;
        accordionBtns[nextIndex].focus();
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        accordionBtns[nextIndex].focus();
        break;
      case 'End':
        event.preventDefault();
        nextIndex = accordionBtns.length - 1;
        accordionBtns[nextIndex].focus();
        break;
    }
  });
});

accordionContainer.addEventListener('click', expandAccordion);
