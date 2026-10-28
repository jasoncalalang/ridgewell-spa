# Plan: "Ways to work with us" offer ladder section

Repo: jasoncalalang/ridgewell-spa, branch `feat/offer-ladder` off `main`. Never push to or merge into `main`.

## Goal
Add one new section to the single-page site, between "What we do" (`#services`) and "Work" (`#work`), that lays out how a client can work with Ridgewell, step by step, for school platforms, AI-agent setups and business services. All copy is original, plain and direct, at outcome level.

## Rules from the existing site (DESIGN.md) that still apply
- No prices, fees, currency, discounts or savings figures anywhere. No invented case studies, client names, testimonials or metrics.
- No client or school named; no technology names (see `src/lib/forbidden.ts`).
- Match existing components: `.wrap`, `.section-label`, `.card`, `.red-list`, `.text-link` with `<Arrow />`, `data-reveal`, Barlow Condensed index numerals as in `Approach`. No icon grids, gradients, shadows, carousels.
- Every CTA links to the existing contact method: `#contact`, with `onInterest("Not sure yet")` as `Services` does. No new form, no new backend, no new interest option.
- Accessible: real heading order (h2 then h3), an ordered list for the ladder, lists for items, 44px touch targets, 4.5:1 contrast, nothing overflows at 320px, passes the existing axe checks.

## Structure (id `offer`, component `Offer.tsx`, copy in `src/content.ts` as `offer`)
1. Discovery call: free, about 20 minutes. CTA.
2. Assessment: paid written review, three tiers by client size (small school or office; mid-size school or business; multi-campus or multi-branch group), each listing what is included. Fee is set after the discovery call; no number shown.
3. Adoption program: about 90 days. Workshops, internal champions, weekly check-ins, adoption dashboard, closing playbook.
4. Fixed-scope build and deployment with a support window.
5. Parallel Run: the new system or agent runs alongside the current process on the same real work, is measured, and replaces the old process only after a go decision.
Below the ladder, a separate panel (not a numbered step): "Privacy built in at every step", Data Privacy Act of 2012 (Republic Act No. 10173). Closing line says Ridgewell supports the client's compliance work and does not replace their Data Protection Officer or legal counsel.
Header and mobile nav get a link to `#offer` labelled "Ways to work".

## Tests (red first)
- `src/content.test.ts`: `offer` exists; 5 ladder steps with indices 01 to 05; 3 assessment tiers; privacy panel mentions RA 10173; `findForbidden` finds nothing; no price patterns (currency symbols, PHP/USD/peso, digit groups with commas, "per month", "per year", "discount"); every CTA href is `#contact`; discovery step says free and about 20 minutes.
- `tests/offer.spec.ts` (desktop and mobile): section `#offer` renders with an h2 and an ordered list of 5 items; 3 tier cards; privacy panel; CTA click lands on `#contact` with "Not sure yet" selected; section text has no price pattern; axe clean on the section; nav link "Ways to work" reaches `#offer`; no horizontal overflow from 320px.
- Existing tests that count links or iterate nav keep passing; update only where the new nav link requires it.

## Order of work
1. Commit this plan and the failing tests (red).
2. Implement content, component, CSS, nav (green). Commit.
3. `npm run check` under CI conditions, review loop, screenshots, one push, PR.
