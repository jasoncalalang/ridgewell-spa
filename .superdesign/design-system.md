# Ridgewell design system — "Studio ledger"

## Product context
Ridgewell Management Services, Inc. (ridgewell.com.ph) is a Philippine business-support firm: accounting, everyday operations, documentation, and focused custom software for SMEs. One marketing page. Visitors are SME owners and school or clinic administrators. Jobs: understand the four services in one screen, see proof that Ridgewell ships real systems (Work section), start an inquiry (email draft).

Page order: Header, Hero, Services (keyboard tab list), Work (6 editorial case-study rows), Approach (3 numbered steps), About (copy + 3 facts), Questions (FAQ), Contact (split: details + inquiry form), Footer.

## Visual direction
White, editorial, precise. Think a well-set ledger or technical drawing title block, not a SaaS landing page. Hierarchy comes from type size, rules and whitespace. One accent colour. Real product screenshots in plain frames are the main imagery; the isometric vector drawings from the current site may remain only in the hero, if at all.

## Colour (HARD CONSTRAINT: no other colours)
- Canvas: #ffffff everywhere, including forms, nav, footer. No tinted or cream sections, no gradients, no blur.
- Ink: #171c22 (headings, body). Secondary ink: #565f68.
- Ridgewell red: #b51226. Only for: primary buttons, the small square section-label bullet, index numbers in Work rows, focus rings, one accent line in illustrations.
- Rules and borders: #d8dde2. Construction grey (illustration depth, disabled): #dfe5e9.
- Screenshot frames: 1px #d8dde2 border, 4px radius, no shadow.

## Typography (HARD CONSTRAINT)
- Display: "Barlow Condensed" 600, tight leading (0.95 to 1.02), letter-spacing -0.01em to -0.02em. h1 ~96 to 120px desktop / 48px mobile; h2 ~64 to 72px / 40px; Work row titles ~40 to 48px.
- Body and UI: "Manrope" (variable). Body 16 to 18px, line-height 1.4 to 1.55. Section labels 14px 600 with a 6px red square before them. Fact lists 15 to 16px with a 12px uppercase 600 label in secondary ink.
- Index numerals ("01" to "06") in Barlow Condensed 600, red, ~28px.
- No serif, no italic display, no decorative fonts.

## Spacing and layout
- Max content width 1280px, 24px side gutter mobile, 48 to 64px desktop.
- Section vertical rhythm: 104px desktop / 64px mobile. Rows inside sections separated by 1px rules, 32px padding.
- Two-column sections split roughly 5/7 (copy/image). Work rows alternate image side on desktop; stack copy then image on mobile.
- Buttons: 44px min height, 3px radius, 12px 26px padding, Manrope 600 14 to 15px. Primary red/white; secondary white with #d8dde2 border and ink text; tertiary = text link with arrow.

## Components
- Section label: red 6px square + label text.
- Services tab list: vertical list of 4 items, each a button with title + one-line short; selected item shows a red left rule and ink title; detail panel on the right with heading, paragraph, 3 bullet items, and a screenshot or illustration.
- Work row: index numeral, client + product heading, paragraph, 3-item fact list (Scope / Built with / Runs on), 1 to 2 screenshot frames. Anchor id per row.
- Numbered steps: 01, 02, 03 in red, heading, paragraph, rules between.
- FAQ: native details/summary, single column, rules between.
- Inquiry form: labels above inputs, 1px #d8dde2 inputs, 44px tall, red primary action "Prepare your inquiry", helper text 16px.
- Footer: logo, service list, back to top, copyright. White.

## Motion
GSAP, subtle: sections and rows fade/settle 12px on entering viewport, once. Illustration routes draw once. No parallax, no sticky, no scroll hijack. Reduced motion shows final state.

## Imagery rules
Screenshots must look like real product UI (tables, forms, report layouts), shown in plain frames, cropped to a region, never floating 3D mockups or glossy device renders. A phone-sized frame may sit beside a desktop frame in the hero. Placeholder screenshots in drafts should read as "school information system", "report card", "enrollment form", "HR 201 record", "clinic patient app" rather than generic dashboards.

## Do not
No cards with shadows, no gradient slabs, no icon grids with pastel circles, no testimonial carousels, no stats with invented numbers, no stock photos of people.
