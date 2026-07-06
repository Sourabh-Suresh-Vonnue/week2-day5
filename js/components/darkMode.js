const savedTheme = localStorage.getItem('theme');

if (savedTheme == 'dark') {
  document.body.setAttribute('data-theme', 'dark');
  document.getElementById('dark-mode-btn').setAttribute('aria-pressed', true);
} else {
  document.body.setAttribute('data-theme', 'light');
  document.getElementById('dark-mode-btn').setAttribute('aria-pressed', false);
}

function darkMode() {
  let newTheme = 'dark';
  let newText = 'Light Mode';
  const currTheme = document.body.getAttribute('data-theme');
  let toggleBtn = document.getElementById('dark-mode-btn');
  let ariaPressed = true;

  if (currTheme == 'dark') {
    newTheme = 'light';
    newText = 'Dark Mode';
    ariaPressed = false;
  }
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  toggleBtn.innerText = newText;
  toggleBtn.setAttribute('aria-pressed', ariaPressed);
}
