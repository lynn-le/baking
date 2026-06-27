(function () {
  const badge = document.querySelector('#cinnamon-rolls-attempt-count');
  const attempts = window.CinnamonRolls && window.CinnamonRolls.attempts;
  const count = Array.isArray(attempts) ? attempts.length : 0;

  badge.textContent = `${count} ${count === 1 ? 'attempt' : 'attempts'}`;
})();
