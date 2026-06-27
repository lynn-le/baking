(function () {
  const attempt = window.CinnamonRolls.attempts.find((a) => a.id === 'archive');

  RecipeEngine.init({
    storageKey: 'recipe:cinnamon-rolls:attempt-' + attempt.id,
    baseServings: window.CinnamonRolls.baseServings,
    servingStep: 2,
    minServings: 2,
    maxServings: 48,
    yieldLabel: window.CinnamonRolls.yieldLabel,
    ingredients: attempt.recipe.ingredients,
    steps: attempt.recipe.steps,
  });
})();
