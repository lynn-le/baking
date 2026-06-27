(function () {
  function init(config) {
    const {
      storageKey,
      legacyStorageKey,
      baseServings = 12,
      servingStep = 2,
      minServings = 2,
      maxServings = 48,
      yieldLabel = 'servings',
      ingredients,
      steps,
    } = config;

    if (!storageKey || !Array.isArray(ingredients) || !Array.isArray(steps)) {
      throw new Error('RecipeEngine requires storageKey, ingredients, and steps.');
    }

    const state = loadState();

    function loadState() {
      const defaults = {
        units: 'us',
        servings: baseServings,
        checked: {},
        ingredientUnits: {},
      };

      try {
        const current = localStorage.getItem(storageKey);
        const legacy = !current && legacyStorageKey
          ? localStorage.getItem(legacyStorageKey)
          : null;
        const saved = JSON.parse(current || legacy || '{}');
        if (!saved || typeof saved !== 'object') return defaults;

        const loaded = {
          units: saved.units === 'metric' ? 'metric' : 'us',
          servings: Number.isFinite(saved.servings) ? saved.servings : baseServings,
          checked: saved.checked && typeof saved.checked === 'object' ? saved.checked : {},
          ingredientUnits: saved.ingredientUnits && typeof saved.ingredientUnits === 'object'
            ? saved.ingredientUnits
            : {},
        };

        if (legacy && !current) localStorage.setItem(storageKey, JSON.stringify(loaded));
        return loaded;
      } catch {
        return defaults;
      }
    }

    function updateState(changes) {
      Object.assign(state, changes);
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
      } catch (error) {
        console.warn('Recipe settings could not be saved.', error);
      }
      render();
    }

    function fraction(value) {
      if (value === 0) return '0';
      const whole = Math.floor(value + 1e-6);
      const remainder = value - whole;
      const thirds = Math.round(remainder * 3);

      if (thirds > 0 && thirds < 3 && Math.abs(remainder - thirds / 3) < 1e-6) {
        const thirdGlyph = thirds === 1 ? '⅓' : '⅔';
        return `${whole || ''}${thirdGlyph}`;
      }

      let eighths = Math.round(remainder * 8);
      let adjustedWhole = whole;
      if (eighths === 8) {
        adjustedWhole += 1;
        eighths = 0;
      }
      const glyph = ['', '⅛', '¼', '⅜', '½', '⅝', '¾', '⅞'][eighths];
      return `${adjustedWhole || ''}${glyph}` || '0';
    }

    function grams(value) {
      if (value >= 100) return `${Math.round(value / 5) * 5} g`;
      if (value >= 20) return `${Math.round(value)} g`;
      return `${Math.round(value * 10) / 10} g`;
    }

    function milliliters(value) {
      if (value >= 100) return `${Math.round(value / 5) * 5} ml`;
      return `${Math.round(value)} ml`;
    }

    function formatAmount(item, factor, units) {
      if (item.pinch) return factor >= 2 ? `${fraction(factor)} pinches` : 'pinch';
      if (item.count != null) {
        const count = Math.round(item.count * factor * 100) / 100;
        return `${fraction(count)}${item.countLabel ? ` ${item.countLabel}` : ''}`;
      }
      if (units === 'metric') {
        return item.liquid ? milliliters(item.g * factor) : grams(item.g * factor);
      }
      return `${fraction(item.us[0] * factor)} ${item.us[1]}`;
    }

    function renderIngredients() {
      const list = document.querySelector('#ingredient-list');
      const fragment = document.createDocumentFragment();
      const factor = state.servings / baseServings;

      ingredients.forEach((section, sectionIndex) => {
        const group = document.createElement('div');
        group.className = 'ingredient-group';

        const heading = document.createElement('h3');
        heading.textContent = section.title;
        group.append(heading);

        section.items.forEach((item, itemIndex) => {
          const key = `${sectionIndex}-${itemIndex}`;
          const units = state.ingredientUnits[key] || state.units;
          const canToggle = Boolean(item.us && item.g != null);
          const row = document.createElement(canToggle ? 'button' : 'div');
          row.className = 'ingredient-row';

          if (canToggle) {
            const nextUnits = units === 'us' ? 'metric' : 'US';
            row.type = 'button';
            row.classList.add('is-toggleable');
            row.dataset.ingredient = key;
            row.title = `Show this ingredient in ${nextUnits} units`;
            row.setAttribute(
              'aria-label',
              `${item.name}: ${formatAmount(item, factor, units)}. Click to show ${nextUnits} units.`,
            );
          }

          const name = document.createElement('span');
          name.textContent = item.name;
          const amount = document.createElement('span');
          amount.className = 'ingredient-amount';
          amount.textContent = formatAmount(item, factor, units);

          row.append(name, amount);
          group.append(row);
        });

        fragment.append(group);
      });

      list.replaceChildren(fragment);
    }

    function renderFormattedText(element, text) {
      const boldPattern = /\*\*(.+?)\*\*/g;
      let cursor = 0;
      let match;

      while ((match = boldPattern.exec(text)) !== null) {
        element.append(document.createTextNode(text.slice(cursor, match.index)));
        const strong = document.createElement('strong');
        strong.textContent = match[1];
        element.append(strong);
        cursor = match.index + match[0].length;
      }

      element.append(document.createTextNode(text.slice(cursor)));
    }

    function renderSteps() {
      const container = document.querySelector('#method-steps');
      const fragment = document.createDocumentFragment();

      steps.forEach((text, index) => {
        const complete = Boolean(state.checked[index]);
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `method-step${complete ? ' is-complete' : ''}`;
        button.dataset.step = index;
        button.setAttribute('aria-pressed', String(complete));

        const badge = document.createElement('span');
        badge.className = 'step-badge';
        badge.textContent = complete ? '✓' : String(index + 1);
        const copy = document.createElement('span');
        copy.className = 'step-text';
        renderFormattedText(copy, text);

        button.append(badge, copy);
        fragment.append(button);
      });

      container.replaceChildren(fragment);
      const done = Object.values(state.checked).filter(Boolean).length;
      document.querySelector('#progress-label').textContent = `${done} / ${steps.length} done`;
    }

    function render() {
      document.querySelector('#serving-count').textContent = state.servings;
      document.querySelector('#yield-label').textContent = `${state.servings} ${yieldLabel}`;
      document.querySelector('#unit-us').classList.toggle('is-active', state.units === 'us');
      document.querySelector('#unit-metric').classList.toggle('is-active', state.units === 'metric');
      renderIngredients();
      renderSteps();
    }

    document.querySelector('#decrease-servings').addEventListener('click', () => {
      updateState({ servings: Math.max(minServings, state.servings - servingStep) });
    });

    document.querySelector('#increase-servings').addEventListener('click', () => {
      updateState({ servings: Math.min(maxServings, state.servings + servingStep) });
    });

    document.querySelector('#reset-servings').addEventListener('click', () => {
      updateState({ servings: baseServings });
    });

    document.querySelector('#unit-us').addEventListener('click', () => {
      updateState({ units: 'us', ingredientUnits: {} });
    });

    document.querySelector('#unit-metric').addEventListener('click', () => {
      updateState({ units: 'metric', ingredientUnits: {} });
    });

    document.querySelector('#ingredient-list').addEventListener('click', (event) => {
      const row = event.target.closest('[data-ingredient]');
      if (!row) return;
      const key = row.dataset.ingredient;
      const currentUnits = state.ingredientUnits[key] || state.units;
      updateState({
        ingredientUnits: {
          ...state.ingredientUnits,
          [key]: currentUnits === 'us' ? 'metric' : 'us',
        },
      });
    });

    document.querySelector('#method-steps').addEventListener('click', (event) => {
      const button = event.target.closest('[data-step]');
      if (!button) return;
      const index = button.dataset.step;
      updateState({ checked: { ...state.checked, [index]: !state.checked[index] } });
    });

    render();
  }

  window.RecipeEngine = { init };
})();
