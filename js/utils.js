export function debounce(fn, debounceDelay) {
  let debounceTimer;
  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fn.apply(this, args);
    }, debounceDelay);
  };
}

export async function fetchJSON(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('http error');
  }
  return await response.json();
}

export function showToast(type = 'info', message, delay = 3000) {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.classList.add('toast-' + type);
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), delay);
}
