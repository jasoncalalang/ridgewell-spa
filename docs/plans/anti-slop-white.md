# Antislop white design audit and plan

Use the installed `antislop@anti-slop` 3.2.30 core, UI, human and responsive-layout skills. Reloaded the core from `/home/box/.codex/plugins/cache/anti-slop/antislop/3.2.30/skills/antislop/SKILL.md` and the adjacent `antislop-ui`, `antislop-human` and `antislop-layoutmobile` skills. This continues the approved audit and fixes for findings 1-4, with all changes left uncommitted on `feat/anti-slop-white`. The coordinator runs browser verification outside the sandbox.

Reading this as: a product showroom for Philippine SME owners and school/property administrators, with confident condensed headings and practical software previews. ENERGY 2 / RHYTHM 2 / MOTION 2. Preserve the existing motion and reduced-motion behavior.

## Findings and intended fixes

1. **Palette override — Surface hierarchy needs to survive the requested white canvas (R-01, R-31, R-37).** The existing warmth is documented brand direction, not an antislop violation by itself. The user now requests white. `--page: #f6f4ef`, `--band: #efece5` and `--chrome: #f1efe9` tint the canvas, proof, products, frames, sample navigation, vacant units and wireframe. Make all surface tokens white, explicitly paint the main sections white, and use neutral dividers around the products section. Replace the warm rules, scrollbar and browser dots with neutral grays. Keep wireframe regions legible with outlines.
2. **MEDIUM — Proof facts look like selectable pill controls (R-09, R-11).** They contain useful existing facts but have no selectable state. Keep their exact text and list semantics; remove capsule borders/radius and use simple separated labels.
3. **MEDIUM — Accounting repeats the surrounding card grid (R-14, R-05).** Its text-only services do not need the same boxes as product previews. Present these entries as ruled rows, with title and description alongside each other when space permits. Keep cards for actual grouped previews, assessment comparisons and the contact form.
4. **HIGH — Secondary control edges are too faint (R-25).** `#cfd4d9` on white is 1.49:1. Reuse the existing `#7c858d` control border (3.75:1) for secondary buttons, the scrollbar and the vacant-unit status outline. Keep text, labels and the red focus ring; verify their contrast and existing axe coverage.

## Plan

- [x] Add `tests/design.spec.ts` first: assert white computed backgrounds on body, all main sections and representative nested surfaces; scan every element and pseudo-element for the old warm colors, including menu/draft states; check affected UI boundary contrast.
- [x] Run the new Playwright tests against the unchanged styles and record the expected failures: red observed by the coordinator, 6 failures (3 tests across desktop and mobile).
- [x] Check existing Playwright selectors before editing Accounting; keep `ul.accounting-items > li`, section IDs/order, headings, paragraphs, animation attributes and CTA behavior.
- [x] Apply the scoped CSS and Accounting class changes; update `DESIGN.md` to describe the white palette, neutral rules and simplified labels/rows.
- [x] Run `npm run test:unit` and `npm run build` after production edits.
- [x] Review the diff, palette contrast and source-level delivery gates; record results here.
- [ ] Browser green: `npx playwright test tests/design.spec.ts`, **to be run by coordinator**.
- [ ] Existing browser suite: `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/google-chrome npx playwright test --reporter=line`, **to be run by coordinator**.
- [ ] Review desktop/mobile rendering, axe, keyboard/click-through behavior, console errors and rendered delivery gates, **to be run by coordinator**.

## Applied changes

1. White `--page`, `--band` and `--chrome` tokens; explicit white main sections and footer; neutral `#dedede` outer rules, `#e8e8e8` inner rules and `#cfcfcf` browser dots. Products now have top/bottom rules. Wireframe regions have outlines and the footer's forced gray fill is removed.
2. Proof facts retain their exact text and list markup. CSS removes capsule styling, including the forced-colors box override. Labels stack with horizontal separators below 600px and sit alongside each other with vertical separators at wider widths, avoiding dividers stranded at the start of wrapped rows.
3. Accounting list items lose only the shared `card` class. Full-width rows use horizontal rules, 1.5rem vertical padding and an adaptive two-column layout; titles and descriptions stack when two 18rem columns plus the gap cannot fit. Existing selectors, `data-reveal`, content and CTA behavior remain intact.
4. Secondary button borders and the scrollbar thumb reuse `--control-border: #7c858d`; vacant-unit outlines use the same token. Existing text colors and the red focus ring remain intact.

## Scope and reasons

- White is the requested canvas; spacing, heading hierarchy and rules separate content without alternating tint bands.
- Keep red `#b51226`, charcoal `#171c22`, Barlow Condensed + Manrope and “Business, in working order.” exactly. The condensed display face and software previews retain Ridgewell's identity.
- Keep product cards and browser/phone frames because each groups a specific software example with its explanation. The hero shadows distinguish overlapping devices, rather than elevating every card.
- Retain the existing section-label square, functional arrows and purposeful preview status colors. No new assets, copy, facts, metrics, dependencies or functionality; do not edit `src/content.ts`.
- Keep all existing interactions, anchors, responsive layouts and reduced-motion support. No commits, pushes or PRs.

## Verification

- **Red observed by the coordinator:** `npx playwright test tests/design.spec.ts` failed all 6 cases (3 tests across desktop and mobile) before the CSS changes. The white-background assertion failed on `body`, `main > section`, `.site-footer`, `.frame-chrome`, `.scr-sidebar .is-active`, `.is-vacant` and `.scr-wire i`; the cream-surface scan and secondary-edge contrast assertion also failed.
- **Unit PASS:** `npm run test:unit`, 2 test files, 0 failures after production edits.
- **Build PASS:** `npm run build`, TypeScript and Vite production build completed after production edits.
- **Diff/source PASS:** `git diff --check`; no old warm palette values remain in source CSS. All `tests/*.spec.ts` files and `src/content.ts` retain their pre-edit SHA-256 hashes. No dependencies, assets or runtime logic were added.
- **Contrast PASS for the changed edges:** the installed human skill's checker computes `#7c858d` on white at 3.75:1, above the 3:1 non-text boundary threshold. Its normal-text verdict is FAIL at 4.5:1; this token is used only for borders and the scrollbar, never text.
- **Text/focus palette PASS:** the same checker reports ink 17.13:1, secondary ink 6.50:1, meta 5.41:1, red 6.82:1, hover red 8.39:1, green 5.20:1 and amber 5.09:1 on white. Rendered contrast and axe remain coordinator checks.
- **Browser green: to be run by coordinator.** No post-change browser, axe, screenshot, console or click-through pass is claimed. The sandbox's known port-binding and Chrome-launch restrictions were not retried.

## Delivery gate status for the approved scope

This records source evidence for the approved fixes. Full rendered verification is **to be run by coordinator**, as directed by the user; the overall browser delivery gate remains pending.

- **Hard Gate, content and assets PASS (source):** the only TSX change removes one Accounting class; no visible copy, claims, client names, statistics, navigation or assets were created or altered (R-02, R-17, R-18, R-23, R-28, R-36, R-38).
- **Hard Gate, contrast PASS (palette):** computed text/focus ratios and changed non-text boundaries meet their thresholds above (R-25); computed browser styles and axe are pending.
- **Hard Gate, behavior PASS (source preservation):** Accounting anchors, callback, native list/headings and animation hooks remain unchanged. Menu/Escape, native FAQ disclosures, form labels, validation, draft/copy/edit states, focus styling and reduced-motion behavior retain their implementations (R-24, R-26, R-27, R-32, R-39). Browser operation is pending.
- **Hard Gate, implementation PASS (source/build):** CSS was edited directly; the fixed light theme follows the explicit white-canvas direction; no media or loading code changed; TypeScript and Vite build pass (R-33, R-34, R-35, R-37, R-40). No performance metrics are claimed.
- **Hard Gate, rendered checks PENDING:** mobile overflow, enlarged text, keyboard/focus, control states, console and click-through checks are **to be run by coordinator** (R-03, R-25, R-32, R-35, R-39).
- **Purpose-Gate PASS (source):** neutral rules separate white surfaces; proof facts no longer resemble selectable pills; Accounting rows distinguish text-only services from software previews. `DESIGN.md` and the scope above retain the reasons for typography, arrows, section markers, screen illustrations, limited hero shadows and existing motion (R-01, R-04, R-06 through R-10, R-12 through R-14, R-19, R-22).
- **Liveliness PASS (direction/source):** the Design Read and ENERGY 2 / RHYTHM 2 / MOTION 2 are explicit. Condensed headings, product screens, red accents, section spacing and motion remain; ruled Accounting rows add the approved composition variation. Rendered hierarchy and rhythm are **to be run by coordinator**.
- **Craftsmanship and Quality Locks PASS (source/unit/build):** the approved reasons are documented, selectors and functional markup remain intact, content facts are untouched, and the local checks pass. Proof and Accounting styles reflow without fixed-width text columns; cards remain for grouped previews, comparisons and the form (C-1 through C-5; R-05, R-11, R-15, R-16, R-20, R-21, R-29 through R-31). Rendered resilience remains pending.

Coordinator click-through coverage: home/skip/section/footer links reach their targets; Services and Accounting CTAs select the inquiry interest; discovery links select "Not sure yet"; Menu opens/closes and Escape restores focus; FAQ disclosures toggle; empty inquiry validates; valid inquiry prepares a draft; email links open the email app; copy handles pending/success/denied states; edit returns to the form. Exercise desktop/mobile and reduced-motion settings, then record actual results rather than source assumptions.
