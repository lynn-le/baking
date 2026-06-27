RecipeEngine.init({
  storageKey: 'recipe:cinnamon-rolls',
  legacyStorageKey: 'cr_state',
  baseServings: 12,
  servingStep: 2,
  minServings: 2,
  maxServings: 48,
  yieldLabel: 'rolls',

  ingredients: [
    { title: 'For the dough', items: [
      { name: 'Bread flour', us: [4.5, 'cups'], g: 585 },
      { name: 'Granulated sugar', us: [1 / 3, 'cup'], g: 70 },
      { name: 'Instant yeast', us: [2.25, 'tsp'], g: 7 },
      { name: 'Salt', us: [1, 'tsp'], g: 6 },
      { name: 'Whole milk, warmed', us: [1.5, 'cups'], g: 360, liquid: true },
      { name: 'Unsalted butter', us: [6, 'tbsp'], g: 84 },
      { name: 'Egg, room temp', count: 1, countLabel: 'large' },
    ]},
    { title: 'Cinnamon filling', items: [
      { name: 'Unsalted butter, soft', us: [0.25, 'cup'], g: 66.5 },
      { name: 'Dark brown sugar', us: [2 / 3, 'cup'], g: 142 },
      { name: 'Ground cinnamon', us: [2, 'tbsp'], g: 16 },
      { name: 'Salt', pinch: true },
    ]},
    { title: 'Cream cheese frosting', items: [
      { name: 'Cream cheese, soft', us: [4, 'oz'], g: 113 },
      { name: 'Unsalted butter, soft', us: [0.5, 'cup'], g: 113 },
      { name: 'Powdered sugar', us: [1.5, 'cups'], g: 150 },
      { name: 'Whole milk', us: [2, 'tbsp'], g: 30, liquid: true },
      { name: 'Vanilla extract', us: [1, 'tsp'], g: 5, liquid: true },
      { name: 'Salt', pinch: true },
    ]},
  ],

  steps: [
    'First, make the dough. In a stand mixer fitted with the whisk attachment, mix 2 cups of the flour with the granulated sugar, yeast, and salt on low speed until combined.',
    'In a microwave-safe bowl, microwave the milk and butter until the mixture is **warm** to the touch and the butter is **mostly melted**, about 45 seconds (you don’t want the mixture to be steaming or too hot, as this can kill the yeast).',
    'Pour the milk mixture into the flour mixture. Add in the egg. Beat everything together on low speed until combined. Gradually increase the speed to high and beat for 2 minutes. The dough will look more like batter, but this is correct! This step kicks off the gluten development. ',
    'After 2 minutes, change to the dough hook attachment. Add in an additional 1 ½ cups of flour and knead on low speed until combined. Use a silicone spatula to scrape down the sides of the bowl. Add the remaining 1 cup of flour (totaling 4 ½ cups) and knead on **low speed**, stopping the mixer occasionally to re-disperse dough, until the dough starts to pull away from the sides of the bowl and forms a ball around the dough hook.',
    'Increase to medium-low speed and knead until the dough becomes smooth and supple, about 10 minutes. If the dough gets wrapped around the hook too much, turn off the mixer, pull the dough off, flip it over, and turn on the mixer again. The dough is ready when you can stretch a quarter-sized piece of dough between your fingers and see light through it (without it breaking). This means the gluten has developed enough! If your dough breaks, knead for a few minutes more and try again.',
    'Transfer the dough to a large lightly-oiled bowl and cover the bowl with a dish towel or plastic wrap. Let rise in a warm place until the dough has doubled in size, about 1 hour.',
    'Once the dough has risen, make the filling. In a medium bowl, add the softened butter, brown sugar, cinnamon and salt. Use a silicone spatula to mix together until it makes a paste. Set aside.',
    'Turn the dough onto a well-floured surface. Use a rolling pin to roll it into a 12-inch long by 18-inch-wide rectangle, with the wider side closest to you. Using a silicone spatula, spread the filling all the way to the edges of the dough.',
    'From the 18-inch wide side closest to you, roll the dough into a tight log. Press the dough along the outside seam to seal everything together. Use a very sharp knife (or floss…yes seriously!) to cut the dough into **12 even rolls**. Place the rolls in a 9 x 13-inch inch pan lined with parchment paper on all sides. Cover the pan with a dish towel or plastic wrap and allow to rise in a warm place until doubled in size, about 1 hour.',
    'Preheat the oven to 350°F. Remove the towel or plastic wrap and bake the rolls until they are golden brown all over, about 30 minutes. Place the pan on a wire cooling rack to cool slightly, about 15 minutes.',
    '**While the rolls cool**, make the cream cheese frosting. In a stand mixer fitted with the whisk attachment, combine the cream cheese, butter, powdered sugar, 2 tablespoons of the milk, vanilla, and a pinch of salt. Beat on low speed until combined, then gradually increase the speed to medium-high and beat until light and fluffy, about 1 minute. If the frosting is too thick, add another tablespoon of milk and beat to combine. Spread the icing evenly over the slightly warm rolls. Enjoy warm!',
  ],
});
