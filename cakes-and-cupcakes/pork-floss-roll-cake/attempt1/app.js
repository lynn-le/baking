(function () {
  const recipe = window.PorkFlossRollCake;
  const attempt = recipe.attempts.find((item) => item.id === 1);

  document.querySelector('#recipe-time').textContent = recipe.time;
  document.querySelector('#recipe-level').textContent = recipe.level;

  RecipeEngine.init({
    storageKey: 'recipe:pork-floss-roll-cake:attempt-' + attempt.id,
    baseServings: recipe.baseServings,
    servingStep: 1,
    minServings: 1,
    maxServings: 32,
    yieldLabel: recipe.yieldLabel,
    ingredients: attempt.recipe.ingredients,
    steps: attempt.recipe.steps,
  });
})();
