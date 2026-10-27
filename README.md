# Mama Tablet Guide

A static, mobile-friendly Arabic RTL and German LTR migration guide from Samsung to HONOR Pad 20. Includes a language switch, a locally saved checklist, accessible native controls, and print styles. Adapted from the supplied guide, with links to official transfer help.

## Preview

Run `python3 -m http.server 8765` in this directory and open http://localhost:8765.

Only `index.html`, `style.css`, `content.js`, `app.js`, and `.nojekyll` are needed for hosting. No build, dependencies, analytics, credentials, or backend. Browser storage saves only language preference and checklist item numbers, under `mama-tablet-guide-v2`. Progress is specific to the browser and origin and does not synchronize across devices. Clearing browser storage removes it.

## GitHub Pages

Publish this directory as the root of the public `mama-tablet-guide` repository. Configure GitHub Pages to deploy from the `main` branch and `/ (root)`. The original ZIP must not be committed.
