# Aravinda Raman Jatavallabha — portfolio

A static, self-contained portfolio for AI engineering, machine learning, research, and professional service. Open `index.html` directly. No framework, build system, API key, or dependency installation is needed. Fonts are self-hosted and original asset licenses are retained.

## Public pages

- `index.html`: recruiter overview; EvalPath, CausEval, SmartProtect, and DRDO case studies; six experience roles; education; all 14 research entries; 11 additional projects; technical capabilities; professional service; recommendations; contact.
- `record.html`: complete, directly addressable professional record with original source links and a browser Print / save PDF action. The print action opens the browser's native print dialog; it is not a pre-generated PDF.
- `assets/`: responsive styles, JavaScript, original portrait and logos, self-hosted fonts, and the supplied resume PDF.

Both pages render their content without JavaScript. JavaScript enables theme selection, navigation, research search/status filters, project filters, and contact handling on the homepage. All research entries are visible initially; publication status remains explicit.

## Deployment

Use `output/portfolio-website.zip`, or upload only `index.html`, `record.html`, and `assets/` to the existing static host. Preserve the existing domain, `https://aravindaj.dev/`. No new hosting account or alternate public domain is required.

Rebuild the ZIP with `node output/build-package.cjs` after any content or asset change; it re-reads the allowlist from disk, so a stale archive is never shipped. Build it with that script rather than PowerShell `Compress-Archive`, which writes backslash entry names that several static hosts extract as literal file names instead of directories.

Do not publish this whole checkout. `EVIDENCE_ROADMAP.md`, `CONTENT_AUDIT.md`, `output/evidence-register.csv`, and working output are private preparation material. The deployment ZIP contains an explicit public allowlist.

The redesign has not been pushed or deployed. The public website can therefore differ from the local files.

## Content and evidence

See `CONTENT_UPDATE.md` for maintenance rules and `CONTENT_AUDIT.md` for the September 18 content reconciliation. Publication status, personal contribution, employer outcomes, invited-reviewer status, and team awards are kept distinct. CausEval's visual metrics describe its bundled fixture, not independent adoption or a live-model benchmark.

The original resume PDF and LaTeX CV are preserved. The printable professional record reflects this redesign; the resume PDF has not been regenerated or independently text-audited during this revision.

## Validation

The September 18 revision passed structural HTML checks, unique-ID and anchor checks, local file-reference checks, research/project inventory and source-link preservation, structured metadata parsing, and JavaScript syntax checks. Current machine-readable results are in `output/verification/`.

Browser checks for this redesign are recorded in `output/playwright/VERIFICATION.md`: 74 automated checks across five viewport widths on both pages, covering overflow, local assets, anchors, inventory, navigation, filtering, theme persistence, intercepted contact states, legacy anchors, keyboard entry, and a JavaScript-disabled pass — all 74 passed, with no uncaught errors. Every rendered text node was measured for contrast in both themes on both pages, with nothing below WCAG AA.

Printed PDF rendering is still unverified: `page.pdf()` hangs in this environment, so no PDF was generated or inspected. Print layout was checked through print-media emulation only, which found no horizontal overflow at A4 width or at A4 less the 16mm page margins; real page breaks and pagination remain unconfirmed. Validate the printed output before distributing a PDF.

The existing Formspree endpoint is preserved. It requires its account configuration and internet access. Direct email is available throughout. No live test message was sent.
