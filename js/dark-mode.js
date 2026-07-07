const savedTheme = localStorage.getItem('theme');

if (savedTheme == 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  document.getElementById('dark-mode-btn').setAttribute('aria-pressed', true);
} else {
  document.documentElement.setAttribute('data-theme', 'light');
  document.getElementById('dark-mode-btn').setAttribute('aria-pressed', false);
}

function darkMode() {
  let newTheme = 'dark';
  let newText = 'Light Mode';
  const currTheme = document.documentElement.getAttribute('data-theme');
  let toggleBtn = document.getElementById('dark-mode-btn');
  let ariaPressed = true;

  if (currTheme == 'dark') {
    newTheme = 'light';
    newText = 'Dark Mode';
    ariaPressed = false;
  }
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  toggleBtn.innerText = newText;
  toggleBtn.setAttribute('aria-pressed', ariaPressed);
}
