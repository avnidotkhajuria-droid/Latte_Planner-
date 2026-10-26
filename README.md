# LattePlanner

A coffee-inspired student planner, hosted as a static site on GitHub Pages.

## Development

Run `npm ci`, then `npm run build`. Run `npm run check` to check the generated JavaScript, and `npm run preview` to open the app at http://127.0.0.1:4173.

`src/app.js` is the readable source recovered from the current production bundle. `src/improvements.jsx` contains the new navigation, budget form and reusable setup messages. `app.js` is generated; rebuild it after editing source. The root `app.jsx` is an older historical version and must not be used to rebuild the current site.

## Publishing

Commit the source and rebuilt `app.js` to the repository's `main` branch to update GitHub Pages. No Firebase configuration change is required. The news workflow is in `.github/workflows/news.yml`; it writes `news.json` in the repository root and requires Actions write permissions. The old root `news.yml` is retained for reference only.

## Improvements

- Four labeled mobile navigation destinations with a keyboard-accessible More dialog.
- Finish setup after the two required questions, or continue customization.
- Helpful subject, exam and timetable empty states.
- Editable budget directly on Finance, with meaningful unset-budget states.
- News edition dates and a clear warning when stories are older than 48 hours.
- Correct logo, install icon and service worker paths.
- Visible keyboard focus and better spacing for small screens.
