# Aravinda Raman Jatavallabha - Portfolio

A static portfolio for AI engineering, research, and professional service. Open `index.html` directly in a browser. No build process, runtime framework, CDN, API key, or dependency installation is required. Fonts and Lucide interface icons are self-hosted; their licenses are included with the assets.

## Files

- `index.html`: public content, metadata, sources, publications, and projects. Content is readable without JavaScript.
- `assets/css/styles.css`: responsive layouts, themes, reduced-motion and print styles.
- `assets/js/script.js`: navigation, persistent theme, research search/status filters, project filters, contact form.
- `assets/docs/Aravinda_Jatavallabha_Resume_Latest_2026.pdf`: existing resume, preserved unchanged.
- `AJ_CV/Aravinda_Jatavallabha_CV.tex`: existing CV source, with the product name corrected to EvalPath.
- `CONTENT_UPDATE.md`: maintenance checklist.
- `EVIDENCE_ROADMAP.md`: private preparation notes; exclude from public deployment.

## Deploy

Deploy only `index.html` and `assets/` to the existing static host. Do not upload the entire repository or the private roadmap. Preserve your existing domain configuration. The canonical URL is inherited from the previous site: https://aravindaj.dev/.

The contact form retains the existing Formspree endpoint and requires an active configuration and internet access. Validation, success, failure, timeout, and duplicate-submission handling are implemented. Intercept requests during browser checks; do not send test messages without approval. Direct email links remain available.

## Verify

Run `node --check assets/js/script.js`. Check desktop/mobile layouts, themes, keyboard navigation, filters, expandable details, downloads, and contact states before publishing. External availability is separate from local link correctness.

The September 2026 revision was checked in Chromium at 320, 390, 768, 1440, and 1920 CSS pixels. Checks covered local images/fonts, anchor targets, mobile navigation, theme persistence, research/project filtering, empty states, expandable details, legacy anchors, and intercepted contact success/failure. A separate JavaScript-disabled check confirmed all 14 research entries, 11 projects, and mobile navigation remained available. No actual contact message was sent. The resume PDF was not regenerated; the CV source received only the EvalPath name correction.
