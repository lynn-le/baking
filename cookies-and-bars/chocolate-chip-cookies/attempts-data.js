/* Shared recipe and attempt data for Chocolate Chip Cookies. */
(function () {
  const baseRecipe = {
    category: 'Cookies & Bars',
    recipeName: 'Chocolate Chip Cookies',
    intro: 'Browned butter cookies with crisp edges, chewy centers, and generous pockets of semisweet chocolate.',
    yieldLabel: 'cookies',
    baseServings: 15,
    time: '1 hr 31',
    level: 'Intermediate',
    source: 'https://bromabakery.com/best-chocolate-chip-cookies/',
    ingredients: [
      { title: 'Cookie dough', items: [
        { name: 'Unsalted butter', us: [0.75, 'cup'], g: 168 },
        { name: 'Light brown sugar, packed', us: [1, 'cup'], g: 212 },
        { name: 'Granulated sugar', us: [0.25, 'cup'], g: 50 },
        { name: 'Large egg and large egg yolk, room temp', count: 1, countLabel: 'each' },
        { name: 'Pure vanilla extract', us: [1, 'tbsp'], g: 15, liquid: true },
        { name: 'All-purpose flour', us: [1.75, 'cups'], g: 220 },
        { name: 'Baking soda', us: [0.75, 'tsp'], g: 3.5 },
        { name: 'Kosher salt', us: [0.75, 'tsp'], g: 4.5 },
        { name: 'Semisweet or bittersweet chocolate', us: [1.25, 'cups'], g: 210 },
        { name: 'Flaky sea salt, for finishing', pinch: true },
      ]},
    ],
    steps: [
      'Brown the butter in a small saucepan over medium-low heat, stirring and scraping frequently. When it smells nutty and the milk solids are golden brown, about 5 to 7 minutes, remove it from the heat and cool for 5 minutes.',
      'In a large bowl, stir together the brown butter, brown sugar, and granulated sugar. Mix in the egg, egg yolk, and vanilla until smooth.',
      'Fold in the flour, baking soda, and kosher salt just until no flour streaks remain. The dough should feel soft but not sticky; avoid overmixing.',
      'Fold in the chocolate until evenly distributed. Cover and chill the dough for **at least 1 hour**, or up to overnight.',
      'Preheat the oven to **350°F** and line two baking sheets with parchment. Let the chilled dough soften for about 20 minutes, then portion with a 1½-ounce scoop and space the cookies 2 inches apart.',
      'Bake until puffed and lightly golden at the edges but still soft in the center, about **12 to 13 minutes**. Finish with flaky salt and cool briefly on the baking sheets.',
    ],
  };

  const attempt1Recipe = {
    ...baseRecipe,
    ingredients: baseRecipe.ingredients.map((section) => ({
      ...section,
      items: section.items.map((item) =>
        item.name === 'Light brown sugar, packed'
          ? { name: 'Dark brown sugar, packed', us: [1, 'cup'], g: 212 }
          : item.name === 'Granulated sugar'
            ? {...item, us: [2, 'tbsp'], g: 30 }
          : item.name === 'Semisweet or bittersweet chocolate'
            ? { ...item, us: [0.625, 'cup'], g: 105 }
            : { ...item },
      ),
    })),
    steps: [...baseRecipe.steps],
  };

  window.ChocolateChipCookies = {
    ...baseRecipe,
    crumbs: [
      { label: 'The Baking Adventures', href: '../../index.html', brand: true },
      { label: 'Cookies & Bars', href: '../index.html' },
      { label: 'Chocolate Chip Cookies' },
    ],
    attempts: [
      {
        id: 1, badge: '#1', order: 1, rating: 0,
        dateLabel: 'Status', date: 'Not baked yet', dateShort: 'Not baked yet',
        href: 'attempt1/index.html',
        photo: null, caption: null,
        tagline: 'recipe draft',
        cardNote: 'The first batch is ready to bake.',
        note: 'Recipe saved from Broma Bakery. Add the bake date, rating, photos, and notes after the first attempt.',
        recipe: attempt1Recipe,
      },
    ],
  };
})();
