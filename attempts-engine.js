/*
 * AttemptsEngine — renders a recipe's "attempts" landing page:
 * a breadcrumb, a header with an "open the best-rated recipe" button,
 * a featured most-recent attempt, and a sortable gallery of every attempt.
 *
 * Reuse it for any recipe/category by writing a small data file and calling
 * AttemptsEngine.init(config) — see breads-and-buns/cinnamon-rolls/attempts.js.
 *
 * Photos are coder-controlled: each attempt's `photo` is a path string the
 * author sets, or null to show a static "no photo yet" placeholder. Viewers
 * cannot upload anything.
 */
(function () {
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function stars(rating) {
    const r = Math.max(0, Math.min(5, Math.round(rating)));
    return '\u2605'.repeat(r) + '\u2606'.repeat(5 - r);
  }

  function photoNode(attempt, heightClass) {
    if (attempt.photo) {
      const img = el('img');
      img.src = attempt.photo;
      img.alt = 'Cinnamon rolls — attempt ' + attempt.badge;
      img.loading = 'lazy';
      return img;
    }
    const ph = el('div', 'no-photo' + (heightClass ? ' ' + heightClass : ''));
    ph.append(el('span', 'np-icon', '\u25a2'));
    ph.append(el('span', null, 'No photo yet'));
    return ph;
  }

  function init(config) {
    const {
      crumbs = [],
      category = '',
      recipeName = '',
      recipeHref = 'recipe.html',
      attempts = [],
    } = config;

    if (!Array.isArray(attempts) || attempts.length === 0) {
      throw new Error('AttemptsEngine requires a non-empty attempts array.');
    }

    const sorts = [
      { key: 'latest', label: 'Latest first', cmp: (a, b) => b.order - a.order },
      { key: 'oldest', label: 'Oldest first', cmp: (a, b) => a.order - b.order },
      { key: 'highest', label: 'Highest rated', cmp: (a, b) => b.rating - a.rating || b.order - a.order },
      { key: 'lowest', label: 'Lowest rated', cmp: (a, b) => a.rating - b.rating || a.order - b.order },
    ];

    let sortKey = 'latest';
    let menuOpen = false;

    const latest = attempts.slice().sort((a, b) => b.order - a.order)[0];
    const best = attempts.slice().sort((a, b) => b.rating - a.rating || b.order - a.order)[0];
    const linkFor = (attempt) => attempt.href || recipeHref + '?attempt=' + attempt.id;

    /* ---------- breadcrumb ---------- */
    function renderBreadcrumb() {
      const crumbBox = document.querySelector('#crumb');
      crumbBox.replaceChildren();
      crumbs.forEach((c, i) => {
        if (i > 0) crumbBox.append(el('span', 'crumb-sep', '/'));
        if (c.href) {
          const a = el('a', c.brand ? 'brand' : 'back-link', c.label);
          a.href = c.href;
          crumbBox.append(a);
        } else {
          crumbBox.append(el('span', null, c.label));
        }
      });
      const back = document.querySelector('#back-link');
      const parent = crumbs.length > 1 ? crumbs[crumbs.length - 2] : crumbs[0];
      if (back && parent && parent.href) back.href = parent.href;
    }

    /* ---------- header ---------- */
    function renderHeader() {
      document.querySelector('#att-eyebrow').textContent =
        category + ' \u00b7 ' + attempts.length + ' attempts & counting';
      document.querySelector('#att-title').textContent = recipeName;
      const open = document.querySelector('#open-recipe');
      open.href = linkFor(best);
      open.replaceChildren(
        document.createTextNode('Open the recipe \u2192'),
        el('small', null, 'best-rated attempt'),
      );
    }

    /* ---------- featured (most recent) ---------- */
    function renderFeatured() {
      const a = latest;
      const link = document.querySelector('#featured');
      link.href = linkFor(a);
      link.replaceChildren();

      const photoWrap = el('div', 'featured-photo');
      const figure = el('figure', 'photo-card is-white');
      figure.append(el('span', 'tape'));
      figure.firstChild.setAttribute('aria-hidden', 'true');
      figure.append(photoNode(a));
      photoWrap.append(figure);

      const details = el('div', 'details');

      const stamp = el('div', 'attempt-stamp');
      stamp.append(el('span', 'attempt-badge', a.badge));
      const when = el('div');
      when.append(el('div', 'when-label', 'Baked'));
      when.append(el('div', 'when-date', a.date));
      stamp.append(when);
      details.append(stamp);

      const rating = el('div', 'stars rating-line');
      rating.append(document.createTextNode(stars(a.rating) + ' '));
      rating.append(el('span', 'tag', '\u2014 ' + (a.tagline || 'most recent bake')));
      details.append(rating);

      details.append(el('p', 'featured-note', a.note));
      details.append(el('span', 'open-link', 'Open full recipe & notes \u2192'));

      link.append(photoWrap, details);
    }

    /* ---------- gallery ---------- */
    function renderGallery() {
      const grid = document.querySelector('#attempt-grid');
      const def = sorts.find((s) => s.key === sortKey) || sorts[0];
      const ordered = attempts.slice().sort(def.cmp);
      grid.replaceChildren();

      ordered.forEach((a) => {
        const card = el('a', 'attempt-card');
        card.href = linkFor(a);

        const thumb = el('div', 'thumb');
        thumb.append(photoNode(a));
        if (a.id === latest.id) thumb.append(el('div', 'latest', 'Latest'));
        card.append(thumb);

        const body = el('div', 'body');
        const top = el('div', 'body-top');
        top.append(el('span', null, 'Attempt ' + a.badge));
        top.lastChild.style.fontFamily = '"DM Serif Display", serif';
        top.lastChild.style.fontSize = '22px';
        top.append(el('span', 'stars', stars(a.rating)));
        body.append(top);
        body.append(el('div', 'when', a.dateShort || a.date));
        body.append(el('p', 'note', a.cardNote || a.note));
        card.append(body);

        grid.append(card);
      });
    }

    /* ---------- sort control ---------- */
    function renderSortLabel() {
      const def = sorts.find((s) => s.key === sortKey) || sorts[0];
      document.querySelector('#sort-label').textContent = def.label;
      document.querySelector('#sort-caret').textContent = menuOpen ? '\u25b2' : '\u25bc';
    }

    function renderMenu() {
      const menu = document.querySelector('#sort-menu');
      menu.replaceChildren();
      sorts.forEach((s) => {
        const opt = el('button', 'sort-option' + (s.key === sortKey ? ' is-active' : ''));
        opt.type = 'button';
        opt.append(el('span', null, s.label));
        opt.append(el('span', 'tick', s.key === sortKey ? '\u25cf' : ''));
        opt.addEventListener('click', () => {
          sortKey = s.key;
          menuOpen = false;
          syncMenu();
          renderSortLabel();
          renderGallery();
        });
        menu.append(opt);
      });
    }

    function syncMenu() {
      document.querySelector('#sort-menu').hidden = !menuOpen;
      document.querySelector('#sort-backdrop').hidden = !menuOpen;
    }

    function wireSort() {
      document.querySelector('#sort-button').addEventListener('click', () => {
        menuOpen = !menuOpen;
        syncMenu();
        renderSortLabel();
      });
      document.querySelector('#sort-backdrop').addEventListener('click', () => {
        menuOpen = false;
        syncMenu();
        renderSortLabel();
      });
    }

    renderBreadcrumb();
    renderHeader();
    renderFeatured();
    renderMenu();
    renderGallery();
    renderSortLabel();
    syncMenu();
    wireSort();
  }

  window.AttemptsEngine = { init };
})();
