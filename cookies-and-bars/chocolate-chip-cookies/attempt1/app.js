(function () {
  const recipe = window.ChocolateChipCookies;
  const attempt = recipe.attempts.find((item) => item.id === 1);

  document.querySelector('#recipe-time').textContent = recipe.time;
  document.querySelector('#recipe-level').textContent = recipe.level;

  RecipeEngine.init({
    storageKey: 'recipe:chocolate-chip-cookies:attempt-' + attempt.id,
    baseServings: recipe.baseServings,
    servingStep: 1,
    minServings: 1,
    maxServings: 60,
    yieldLabel: recipe.yieldLabel,
    ingredients: attempt.recipe.ingredients,
    steps: attempt.recipe.steps,
  });
})();
