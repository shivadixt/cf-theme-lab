# CF Theme Lab Privacy Policy

**Last updated: November 2, 2026**

CF Theme Lab is a browser extension that changes the appearance of Codeforces pages. It is designed to work locally in your browser.

## Information the extension handles

- **Theme preferences:** The extension stores two settings, `enabled` and `theme`, using Chrome's `chrome.storage.sync` API. These settings remember whether styling is enabled and whether Bauhaus or Papercut is selected. Chrome may synchronize these preferences across the user's signed-in browsers when sync is enabled.
- **Active tab URL:** When the popup opens, it reads the active tab URL to show whether the current tab is a Codeforces page. This value is not saved, logged, or transmitted.
- **Codeforces page content:** The content script applies the theme to the page being viewed. It does not collect, copy, or transmit page content, problem submissions, source code, handles, comments, or browsing history.

## Data sharing and sale

The extension does not sell or share user data with the developer or third parties. It does not include analytics, advertising, tracking pixels, or third-party network requests.

## Remote code and external services

The extension does not load remote scripts, remote stylesheets, or other executable code from external servers. Its styling and popup assets are packaged inside the extension.

## Permissions

- **`storage`:** Saves the `enabled` and `theme` preferences through `chrome.storage.sync`.
- **Codeforces host access:** Allows the content script and stylesheet to run on Codeforces domains so the page can be themed.

## Data retention and deletion

The extension retains only the two theme preferences in Chrome Sync storage. Users can remove the extension or clear its stored extension data through Chrome to remove these preferences. Chrome Sync retention and deletion are also subject to the user's Google account and browser sync settings.

## Changes to this policy

If the extension's data practices change, this policy will be updated before or alongside the relevant extension release.

## Contact

For privacy questions or support, use the contact method listed on the CF Theme Lab GitHub repository or Chrome Web Store listing.
