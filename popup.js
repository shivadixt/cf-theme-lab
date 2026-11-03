(() => {
  'use strict';

  const DEFAULTS = { enabled: true, theme: 'bauhaus' };
  const VALID_THEMES = new Set(['bauhaus', 'papercut']);
  const enabledToggle = document.getElementById('enabledToggle');
  const statusDot = document.getElementById('statusDot');
  const statusTitle = document.getElementById('statusTitle');
  const statusDescription = document.getElementById('statusDescription');
  const siteMessage = document.getElementById('siteMessage');
  const paletteCaption = document.getElementById('paletteCaption');
  const themeCards = [...document.querySelectorAll('[data-theme]')];

  let settings = { ...DEFAULTS };
  let isCodeforcesTab = false;

  function normalize(raw = {}) {
    return {
      enabled: raw.enabled !== false,
      theme: VALID_THEMES.has(raw.theme) ? raw.theme : DEFAULTS.theme
    };
  }

  function render() {
    enabledToggle.checked = settings.enabled;
    statusDot.classList.toggle('off', !settings.enabled);
    statusTitle.textContent = settings.enabled ? 'Theme enabled' : 'Original look';
    statusDescription.textContent = settings.enabled
      ? (settings.theme === 'bauhaus' ? 'Bold shapes. Clear hierarchy.' : 'Soft layers. A little playful.')
      : 'Codeforces is back to its default style.';

    document.body.classList.toggle('papercut-mode', settings.theme === 'papercut');
    themeCards.forEach((card) => {
      const selected = card.dataset.theme === settings.theme;
      card.classList.toggle('selected', selected);
      card.setAttribute('aria-pressed', String(selected));
    });

    paletteCaption.textContent = settings.theme === 'bauhaus'
      ? 'PRIMARY COLOURS / NO NOISE'
      : 'SOFT LAYERS / WARM DETAILS';

    siteMessage.textContent = isCodeforcesTab
      ? 'Active on this Codeforces tab'
      : 'Saved — ready on Codeforces';
  }

  async function save(patch) {
    settings = normalize({ ...settings, ...patch });
    render();
    try {
      await chrome.storage.sync.set(settings);
    } catch (error) {
      statusDescription.textContent = 'Could not save settings. Check extension storage.';
      console.error('CF Theme Lab: unable to save preferences', error);
    }
  }

  enabledToggle.addEventListener('change', () => save({ enabled: enabledToggle.checked }));

  themeCards.forEach((card) => {
    card.addEventListener('click', () => save({ theme: card.dataset.theme }));
  });

  async function init() {
    try {
      const [stored, tabs] = await Promise.all([
        chrome.storage.sync.get(DEFAULTS),
        chrome.tabs.query({ active: true, currentWindow: true })
      ]);
      settings = normalize(stored);
      const url = tabs[0]?.url || '';
      isCodeforcesTab = /^https:\/\/(?:[^/]+\.)?codeforces\.(?:com|org)(?:\/|$)/i.test(url);
    } catch (error) {
      console.warn('CF Theme Lab: using default preferences', error);
      settings = { ...DEFAULTS };
    }
    render();
  }

  init();
})();
