/* Shared recipe and attempt data for Pork Floss Roll Cake. */
(function () {
  const baseRecipe = {
    category: 'Cakes & Cupcakes',
    recipeName: 'Pork Floss Roll Cake',
    intro: 'Light and fluffy chiffon cake rolled up with whipped cream and savory-sweet pork floss.',
    yieldLabel: 'slices',
    baseServings: 8,
    time: '4 hr 34',
    level: 'Intermediate',
    source: 'https://teakandthyme.com/coffee-swiss-roll/',
    ingredients: [
      { title: 'Chiffon cake', items: [
        { name: 'Large eggs, room temperature', count: 6, countLabel: 'large' },
        { name: 'Cream of tartar', us: [0.25, 'tsp'], g: 1 },
        { name: 'Granulated sugar, divided into 100g + 50g', us: [0.75, 'cup'], g: 150 },
        { name: 'Milk, dairy or non-dairy', us: [0.25, 'cup'], g: 50, liquid: true },
        { name: 'Oil, e.g. canola oil', us: [0.25, 'cup'], g: 50, liquid: true },
        { name: 'Vanilla extract', us: [1, 'tsp'], g: 5, liquid: true },
        { name: 'Cake flour', us: [0.875, 'cup'], g: 110 },
        { name: 'Baking powder', us: [0.5, 'tsp'], g: 2 },
      ]},
      { title: 'Cream filling', items: [
        { name: 'Whipping cream, cold', us: [1.75, 'cups'], g: 400, liquid: true },
        { name: 'Powdered sugar', us: [0.33, 'cup'], g: 40 },
        { name: 'Vanilla extract', us: [1, 'tsp'], g: 5, liquid: true },
        { name: 'Pork floss', us: [0.75, 'cup'], g: 80 },
      ]},
      { title: 'Exterior coating', items: [
        { name: 'Mayonnaise', us: [2, 'tbsp'], g: 28 },
        { name: 'Pork floss', us: [0.5, 'cup'], g: 60 },
      ]},
    ],
    steps: [
      'Prep: Preheat oven to **350°F**. Line a 12x17" baking tray with parchment paper cut to size on the bottom only and set aside.',
      'Separate eggs: Separate the egg whites and egg yolks into two large mixing bowls, being careful not to get any yolk in the egg whites. Set the bowl of egg yolks aside.',
      'Egg white meringue: Add cream of tartar to the egg whites. Beat on low-medium speed until frothy. Add 100g of sugar one spoonful at a time, mixing between each addition. Increase to medium-high and beat to stiff peaks. Set aside.',
      'Egg yolk mixture: Add the remaining 50g of sugar to the egg yolks and mix until combined. Add the milk, oil, and vanilla extract and mix until smooth.',
      'Sift in dry ingredients: Hold a fine mesh sieve above the bowl and sift in the cake flour and baking powder. Mix on low speed until just combined.',
      'Combine: Add about ⅓ of the meringue into the egg yolk mixture and fold together, scraping the bottom of the bowl. Add the remaining meringue and fold until no streaks remain.',
      'Fill pan: Pour the batter into the lined tray. Use an offset spatula to spread into the corners and smooth into an even layer.',
      'Bake: Bake for **13–14 minutes**, or until the edges are lightly browned and the top is puffed up.',
      'Release cake: Cool on a wire rack for 5 minutes. Run an offset spatula around the edges, place a wire rack on top, grip both sides, and flip the cake. Peel off the parchment. Place a fresh sheet of parchment on top and flip the cake onto it.',
      'Pre-roll: While the cake is still warm, roll it up with the parchment paper starting from a short end. Let cool completely in this rolled-up log shape.',
      'Whip cream: Combine the whipping cream, powdered sugar, and vanilla extract. Whip until stiff peaks form.',
      'Spread filling: Unroll the cooled cake. Spread the whipped cream in a thick, even layer. Scatter the pork floss evenly over the cream. Leave the last 1" at the far end of the cake empty.',
      'Roll cake: Roll the cake up in the same direction as before. When you reach the end, roll the cake onto a sheet of plastic wrap. Remove any excess cream from the seam. Wrap tightly in plastic wrap and refrigerate for **at least 3 hours** or overnight.',
      'Coat exterior: Unwrap the chilled roll. Use a pastry brush or offset spatula to apply a thin, even layer of mayonnaise over the outside of the roll. Roll in pork floss to coat the exterior completely.',
      'Slice: Use a serrated knife to trim about ½" off both ends to reveal the swirl. Cut into 1–1.5" slices and serve.',
    ],
  };

  const attempt1Recipe = {
    ...baseRecipe,
    ingredients: baseRecipe.ingredients.map((section) => ({ ...section, items: [...section.items] })),
    steps: [...baseRecipe.steps],
  };

  window.PorkFlossRollCake = {
    ...baseRecipe,
    crumbs: [
      { label: 'The Baking Adventures', href: '../../../index.html', brand: true },
      { label: 'Cakes & Cupcakes', href: '../../index.html' },
      { label: 'Pork Floss Roll Cake' },
    ],
    attempts: [
      {
        id: 1, badge: '#1', order: 1, rating: null,
        date: 'TBD', dateShort: 'TBD',
        href: 'attempt1/index.html',
        photo: 'attempt1/final.jpeg', caption: 'sliced and ready to serve',
        tagline: 'first attempt',
        cardNote: '',
        note: '',
        recipe: attempt1Recipe,
      },
    ],
  };
})();
