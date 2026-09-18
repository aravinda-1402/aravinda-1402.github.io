document.documentElement.classList.remove('no-js');
document.getElementById('print-record').addEventListener('click', () => window.print());
document.getElementById('year').textContent = new Date().getFullYear();
let previouslyClosed = [];
window.addEventListener('beforeprint', () => {
  previouslyClosed = [...document.querySelectorAll('details:not([open])')];
  previouslyClosed.forEach(detail => { detail.open = true; });
});
window.addEventListener('afterprint', () => previouslyClosed.forEach(detail => { detail.open = false; }));
