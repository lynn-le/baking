(function () {
  const badge = document.querySelector('#pork-floss-roll-cake-attempt-count');
  const attempts = window.PorkFlossRollCake && window.PorkFlossRollCake.attempts;
  const count = Array.isArray(attempts) ? attempts.length : 0;

  badge.textContent = `${count} ${count === 1 ? 'attempt' : 'attempts'}`;
})();
