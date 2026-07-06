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

accordionContainer.addEventListener('click', expandAccordion);
