(() => {
  'use strict';

  const DEFAULTS = Object.freeze({ enabled: true, theme: 'bauhaus' });
  const VALID_THEMES = new Set(['bauhaus', 'papercut']);
  let current = { ...DEFAULTS };
  let rootObserver = null;

  function normalize(settings = {}) {
    return {
      enabled: settings.enabled !== false,
      theme: VALID_THEMES.has(settings.theme) ? settings.theme : DEFAULTS.theme
    };
  }

  function paintRoot() {
    const root = document.documentElement;
    if (!root) return false;
    root.dataset.cfTheme = current.theme;
    root.dataset.cfEnabled = current.enabled ? 'true' : 'false';
    return true;
  }

  function apply(settings) {
    current = normalize(settings);
    if (paintRoot()) {
      if (rootObserver) {
        rootObserver.disconnect();
        rootObserver = null;
      }
      return;
    }

    // document_start can run before <html> exists; wait for it rather than failing.
    if (!rootObserver) {
      rootObserver = new MutationObserver(() => {
        if (paintRoot()) {
          rootObserver.disconnect();
          rootObserver = null;
        }
      });
      rootObserver.observe(document, { childList: true, subtree: true });
    }
  }

  // Default styling is applied as soon as the document root becomes available.
  apply(DEFAULTS);

  chrome.storage.sync.get(DEFAULTS)
    .then(apply)
    .catch(() => apply(DEFAULTS));

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'sync') return;
    const next = { ...current };
    if (changes.enabled) next.enabled = changes.enabled.newValue;
    if (changes.theme) next.theme = changes.theme.newValue;
    apply(next);
  });
})();
