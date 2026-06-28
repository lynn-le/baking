(function () {
  const badge = document.querySelector('#chocolate-chip-cookies-attempt-count');
  const attempts = window.ChocolateChipCookies && window.ChocolateChipCookies.attempts;
  const count = Array.isArray(attempts) ? attempts.length : 0;

  badge.textContent = `${count} ${count === 1 ? 'attempt' : 'attempts'}`;
})();
