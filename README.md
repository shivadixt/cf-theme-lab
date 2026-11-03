# CF Theme Lab — Bauhaus & Papercut

A Chrome extension that gives Codeforces two selectable visual themes:

- **Bauhaus** — warm paper surfaces, strong black outlines, geometric hierarchy, and red/blue/yellow accents.
- **Papercut** — soft pastel layers, paper-like surfaces, gentle offset shadows, and rounded edges.

The popup lets you switch themes, turn styling off, and save your preference between browser sessions. Theme preferences are stored with `chrome.storage.sync`.

## Install locally (Chrome, Edge, or Brave)

1. Download this project ZIP and extract it.
2. Open `chrome://extensions` (or `edge://extensions` / `brave://extensions`).
3. Enable **Developer mode**.
4. Select **Load unpacked**.
5. Choose the extracted project folder — the folder that contains `manifest.json` directly.
6. Open or refresh `https://codeforces.com`.
7. Pin **CF Theme Lab** from the extensions menu and select a theme from its popup.

## What is styled

The stylesheet covers Codeforces navigation, page surfaces, problem statements, sample input/output blocks, problem tags, comments, tables, standings/submissions, form controls, buttons, pagination, and common code-editor shells. Existing verdict/rating colour cues are retained where possible. The extension does not alter Codeforces problem-solving functionality.

## Project structure

```text
cf-theme-lab/
├── manifest.json
├── content.js
├── popup.html
├── popup.css
├── popup.js
├── styles/
│   └── themes.css
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── README.md
├── LICENSE
├── PRIVACY_POLICY.md
├── privacy.html
```

## Privacy

CF Theme Lab does not collect analytics, browsing history, source code, handles, or submissions. It does not make independent network requests to analytics, advertising, or developer servers, and it loads no remote assets. Chrome handles synchronization of the two saved preferences through its built-in Sync service when enabled. It stores only two preferences (`enabled` and `theme`) using `chrome.storage.sync`. Chrome may sync those preferences across devices when browser sync is enabled. The popup reads the active tab URL only to display whether the current tab is a Codeforces page; it does not store or transmit that URL. The content script and stylesheet run only on the Codeforces domains declared in `manifest.json`.


