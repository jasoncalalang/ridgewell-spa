# Plan: hero "map" intro (Fruitful Money Map pattern)

Approved design: Superdesign draft `a113712c-ece9-4db8-b3d4-0db3e7ead7ee` ("Money Map intro 1 —
backdrop"), picked by Jason on 2026-11-16. Motion values come from fruitful.com's production bundle
(GSAP + ScrollTrigger, back.out springs); see `.superdesign/tmp/fruitful-motion.md` §8 (gitignored).

## What ships

1. **Backdrop (static, always on desktop ≥ 992px).** Behind the hero sits a soft field of blurred
   white cards: the source card ("Built for" with "Our own office") and one card per offering/system.
   Scale 1.25, opacity 0.4, blur 14px. Pure CSS final state, so it shows without scripts and under
   reduced motion. `aria-hidden`; hidden below 992px.
2. **Intro (once per 2 hours, desktop, motion allowed, no deep link, page at the top).**
   ~4.5s GSAP timeline:
   - 0.05 logo mark pops in at the viewport centre; 0.75 it flies and shrinks onto the header logo
     while the header fades in.
   - 0.75 a big "Your organisation" pill morphs into the source card; its "Built for" ticker
     slides A school → A property manager → Our own office.
   - beats from 1.7s every 0.2s: spine and branch pipes draw, nodes (Website, Bespoke systems,
     Our products) fade in, cards rise in, fill bars grow to full, red check badges pop
     (`back.out(2.5)`).
   - 3.45 pipes, nodes and checks fade; cards fan out to their backdrop positions and the stage
     blurs; 3.6 hero copy, screenshot and proof line rise in.
   - A click, key press, wheel, touch or scroll plays the rest at 5× speed.
   - Under reduced motion, or after switching into motion later, it never plays mid-page.

## Content rules (unchanged)

Card names are the real case-study titles; labels are their real `status` strings; website card
reads "Design, build, upkeep". Fill bars always grow to full width and print no amounts. No new
words that `forbidden.ts` bans. Colours from current tokens only (white surfaces, `--line`,
`--line-inner`, `--meta`, `--red`); no cream.

## Files

- `src/content.ts`: `heroMap` (source, audiences, branches → cards derived from `caseStudies`).
- `src/components/HeroMap.tsx`: backdrop + intro markup and the GSAP timeline.
- `src/components/Hero.tsx`: mount `HeroMap`.
- `src/styles.css`: `.hero-map*` rules, `isolation: isolate` on `.hero`.
- `src/content.test.ts`: content checks for `heroMap`.
- `tests/intro.spec.ts`: Playwright behaviour checks; `tests/motion.spec.ts` marks the intro
  seen so it keeps testing section motion only.

## Tests first (red), then implementation (green)

Unit: every system card matches a case-study title and uses its status; no digits other than the
year in statuses, no `$`/`%`; three branches in order.

Playwright (desktop project unless noted):
1. Fresh visit with motion: intro plays (`html[data-intro="playing"]`), hero copy is hidden at the
   start and fully visible within 6s, the intro marks `localStorage`, no page errors, backdrop
   cards end at opacity 0.4.
2. Second visit within 2 hours: no intro; hero visible immediately.
3. Reduced motion: no intro; backdrop present in its final state.
4. A click skips: intro finishes within ~1.5s of the click.
5. Deep link `/#contact` with motion: no intro.
6. Mobile: backdrop not displayed, no intro.
7. Backdrop is `aria-hidden` and adds nothing to the accessible name of the hero.

Then `npm run check` green (Chromium at
`~/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome` if Playwright's own build is
missing). Local branch only; no push.
