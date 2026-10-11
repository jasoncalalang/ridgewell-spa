# Ridgewell design system — "Showroom" (product-forward, light)

## Product context
Ridgewell Management Services, Inc. (ridgewell.com.ph) is a small Philippine studio that started in accounting and now sells two things: website design and bespoke system development. One marketing page. Visitors are SME owners and school or property administrators. Jobs: understand the two services in one screen, see that Ridgewell ships real systems people use every day (seven of them), and start an inquiry.

Page order: Header, Hero, Proof line, Services (two cards), Work: built for a client (five case studies), Work: our products (two products), Approach (3 steps), About (copy + 3 facts), Questions (FAQ), Contact (details + inquiry form), Footer.

## Visual direction
A software company's page, not a brochure and not a ledger. Real product screens carry the page: the hero is a headline over a large browser-frame screenshot; every case study and product is shown as a screenshot card; services carry a small drawn UI inside the card. Hierarchy comes from screenshot size, type size and whitespace. Light, warm, confident. References (Mobbin): Twenty and Sketch heroes, incident.io feature showcase, Bird product cards, Webflow and Intercom customer-story grids, Amplemarket result tiles, Miro service cards, Sketch about facts, Savor contact.

## Colour (HARD CONSTRAINT: no other colours)
- Page canvas: warm off-white #f6f4ef. Panels, cards, header, form fields: white #ffffff with a 1px #e3dfd6 border and 10px radius (cards) / 6px (inputs, buttons).
- Light theme only. No dark bands, no dark footer. One tinted band allowed per page: the "Our products" section may sit on a slightly deeper warm tone #efece5, or the primary CTA block may use red-at-6% #f8e7ea. Not both.
- Ink #171c22 (headings, body). Secondary ink #565f68. Muted meta #8a929a.
- Ridgewell red #b51226: primary buttons, the 6px square before section labels, index numerals, "what changed" lead-ins, focus rings, links on hover. Red is never a background except the primary button.
- Rules and borders on off-white #e3dfd6; inside white panels #e8e5df.
- Screenshot frames: a browser chrome (three 8px dots, a 28px address strip in #f1efe9) above the screenshot, 1px #e3dfd6 border, 12px radius, and a soft shadow 0 24px 60px -24px rgba(23,28,34,0.18). Shadows are allowed ONLY on screenshot frames and phone frames. Cards and panels stay flat (border only).
- No gradients, no blur, no glass, no glow.

## Typography (HARD CONSTRAINT)
- Display: "Barlow Condensed" 600, leading 0.95 to 1.0, letter-spacing -0.01em. h1 centred ~84 to 96px desktop / 48px mobile, two lines max. h2 ~56 to 64px / 36px. Card titles 28 to 32px. Index numerals ("01" to "07") Barlow Condensed 600 red 22 to 26px.
- Body and UI: "Manrope" (variable). Body 17 to 18px, line-height 1.5. Card copy 15 to 16px. Section labels 13px 600 uppercase, letter-spacing 0.08em, with a 6px red square before them. Meta lines 13px #8a929a.
- Buttons: Manrope 600 15px. No serif, no italic display, no decorative fonts.

## Layout
- Max content width 1200px; side gutter 24px mobile, 48px desktop. Section rhythm 112px desktop / 72px mobile.
- Header: 64px, white, bottom rule; logo left (Brand Asset), nav centred (Services, Work, Approach, Contact), red "Start a project" button right.
- Hero: centred label, h1, one-sentence lead (max 60ch), two buttons (primary red "Start a project", secondary white "See our work"). Below, a 1120px-wide browser frame holding the hero screenshot (LeaseTrack units grid or a school records table), the frame's bottom 120px clipped by the next section so it reads as sitting in the page. A 280px phone frame (parent and student portal) overlaps the browser frame's bottom-right corner on desktop; hidden on mobile.
- Proof line (after hero): one sentence "Systems in daily use at a school, a property manager, and our own office." plus three small white chips: "7 systems in daily use", "2 products of our own", "Started in accounting, 2004". No other numbers anywhere.
- Services: two equal cards side by side (stack on mobile). Each: section label, title (h3 32px), two-sentence paragraph, 3 items with red squares, and at the card bottom a drawn mini UI (website card: a browser frame wireframe with a hero and three columns; systems card: a small records table with a status column and an approval button), clipped at the card edge.
- Work, built for a client: label + h2 + one-line intro. Grid: card 01 featured across two columns (screenshot left 7/12, copy right 5/12); cards 02 to 05 in a 2x2 grid, each with a screenshot frame on top (16:10), title, one sentence, a bold red-led "What changed:" line, meta "For: ... · In use since 2026".
- Work, our products: two wide cards (Bird reference). Each: index, title, one-line tagline, paragraph, facts, a text link ("Open the live demo" / "How it works"), and a screenshot frame bleeding off the card's bottom edge.
- Approach: three columns with 01 02 03 numerals, heading, paragraph; a 1px rule above the row.
- About: left: h2 and two paragraphs; right: three facts stacked as label (13px uppercase) + value (Barlow Condensed 36px). Facts are text, not invented metrics.
- Questions: native details/summary, single column, rules between, max 720px.
- Contact (Savor reference): left column: "Tell us about the project" lead, published email, what to include, office hours; right column: the inquiry form (labels above inputs, 1px #e3dfd6 inputs 48px tall, red primary "Prepare your inquiry", helper text). Both on a white panel.
- Footer: logo, two services, Work anchors, back to top, copyright. On off-white with a top rule.

## Components
- Section label: 6px red square + 13px uppercase label.
- Buttons: 48px min height, 6px radius, 14px 24px padding. Primary red/white; secondary white, 1px #d8dde2, ink text; tertiary text link with arrow, ink, red on hover.
- Screenshot frame: see Colour. Phone frame: 280x580, 36px radius, 8px ink border, white screen, same shadow.
- Card: white, 1px #e3dfe6 border, 10px radius, 32px padding (24px mobile), flat.
- Chip: white, 1px border, 999px radius, 13px 600, 8px 14px padding.
- Bullets: a 6px red square drawn with CSS (not a text character).

## Motion
GSAP, subtle: hero screenshot frame rises 24px and fades in once; cards fade/settle 12px when entering the viewport, once; no parallax, no sticky, no scroll hijack. Reduced motion shows final state.

## Imagery rules
Screenshots must look like real product UI: a records table with statuses, a units grid, a cheques worklist with dates and amounts, a report card, an enrollment queue, an approval form. Draw them in CSS/HTML inside the frames (tables, rows, badges, sidebars); never generic dashboards with pie charts, never glossy 3D device renders, never stock photos of people. Use only placeholder people and vendor names that are obviously fictional. Crop to a region; the frame can clip the UI.

## Do not
No shadows except screenshot/phone frames, no gradient slabs, no icon grids with pastel circles, no testimonial carousels, no invented metrics, no logos of other companies, no stock photography.

## Content rule (hard)
Never name a framework, language, database, cloud, cluster, identity provider, automation tool, or module/form code in any visible text or in drawn UI. Case-study copy describes who uses the system and what got easier, nothing about how it is built.
Never name a client; describe them (a K-12 and college school, a condominium property manager).
