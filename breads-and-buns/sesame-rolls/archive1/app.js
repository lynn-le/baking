(function () {
  const attempt = window.SesameRolls.attempts.find((a) => a.id === 'archive-1');

  document.querySelector('#recipe-time').textContent = window.SesameRolls.time;
  document.querySelector('#recipe-level').textContent = window.SesameRolls.level;

  RecipeEngine.init({
    storageKey: 'recipe:sesame-rolls:attempt-' + attempt.id,
    baseServings: window.SesameRolls.baseServings,
    servingStep: 2,
    minServings: 2,
    maxServings: 48,
    yieldLabel: window.SesameRolls.yieldLabel,
    ingredients: attempt.recipe.ingredients,
    steps: attempt.recipe.steps,
  });
})();
