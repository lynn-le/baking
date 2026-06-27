(function () {
  const attempt = window.CinnamonRolls.attempts.find((a) => a.id === 1);

  RecipeEngine.init({
    storageKey: 'recipe:cinnamon-rolls:attempt-' + attempt.id,
    legacyStorageKey: 'cr_state',
    baseServings: window.CinnamonRolls.baseServings,
    servingStep: 2,
    minServings: 2,
    maxServings: 48,
    yieldLabel: window.CinnamonRolls.yieldLabel,
    ingredients: attempt.recipe.ingredients,
    steps: attempt.recipe.steps,
  });
})();
