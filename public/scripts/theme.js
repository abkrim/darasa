/* ==========================================================
   darasa — theme toggle (light/dark)
   Persists to localStorage. Respects prefers-color-scheme on first load.
   Hardens: a11y (aria-pressed + dynamic label), CSP (no inline onclick).
   ========================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'atlas-theme';
  var root = document.documentElement;

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    syncToggleButtons(theme);
    // Notify listeners (timeline redraws colors)
    document.dispatchEvent(new CustomEvent('atlas:theme-change', { detail: { theme: theme } }));
  }

  function syncToggleButtons(theme) {
    var btns = document.querySelectorAll('.theme-toggle');
    var isDark = theme === 'dark';
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', isDark ? 'true' : 'false');
      btns[i].setAttribute(
        'aria-label',
        isDark ? 'Desactivar modo oscuro (actualmente activo)' : 'Activar modo oscuro (actualmente en claro)'
      );
    }
  }

  function getCurrent() {
    return root.getAttribute('data-theme') || 'light';
  }

  function init() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage disabled */ }

    if (stored === 'dark' || stored === 'light') {
      apply(stored);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      apply('dark');
    } else {
      apply('light');
    }

    // Re-sync aria labels once DOM is ready (buttons may not exist yet during init)
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { syncToggleButtons(getCurrent()); bindToggleButtons(); });
    } else {
      syncToggleButtons(getCurrent());
      bindToggleButtons();
    }

    // React to OS-level changes if user hasn't explicitly chosen
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var handler = function (e) {
        var hasStored = false;
        try { hasStored = !!localStorage.getItem(STORAGE_KEY); } catch (err) {}
        if (!hasStored) apply(e.matches ? 'dark' : 'light');
      };
      if (mq.addEventListener) mq.addEventListener('change', handler);
      else if (mq.addListener) mq.addListener(handler);
    }
  }

  function bindToggleButtons() {
    var btns = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < btns.length; i++) {
      if (btns[i].dataset.atlasBound === '1') continue;
      btns[i].dataset.atlasBound = '1';
      btns[i].addEventListener('click', toggle);
    }
  }

  function toggle() {
    var next = getCurrent() === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* storage disabled */ }
  }

  // Expose API globally (back-compat, tests)
  window.AtlasTheme = {
    init: init,
    toggle: toggle,
    current: getCurrent
  };

  // Kick off immediately so there's no FOUC (flash of wrong theme)
  init();
})();
