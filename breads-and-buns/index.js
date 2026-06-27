(function () {
  function setAttemptCount(id, recipe) {
    const badge = document.querySelector(id);
    const attempts = recipe && recipe.attempts;
    const count = Array.isArray(attempts) ? attempts.length : 0;

    badge.textContent = `${count} ${count === 1 ? 'attempt' : 'attempts'}`;
  }

  setAttemptCount('#cinnamon-rolls-attempt-count', window.CinnamonRolls);
  setAttemptCount('#sesame-rolls-attempt-count', window.SesameRolls);
})();
