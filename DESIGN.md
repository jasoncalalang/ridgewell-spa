# Ridgewell design direction

## Owner direction

The owner rejected the first cream-and-serif design as generic and requested a white website built around vector graphics. This revision follows that explicit direction. White means `#ffffff` across the page, including forms, navigation, service details, and footer. Cream, warm neutrals, tilted paper compositions, italic serif display type, and large burgundy panels are retired.

## Context

Ridgewell Management Services, Inc. supports Philippine SMEs with accounting, operations, documentation, coordination, and focused software. The page helps a visitor identify the support they need and start an inquiry. Published company facts and the original logo remain the evidence base. The owner previously authorized a public repository, frequent commits, and pushes; that workflow continues for this revision.

## Visual direction

Reading this as: a white business-services website for Philippine SME owners, using precise vector drawings and direct typography. ENERGY 2 / RHYTHM 3 / MOTION 1.

- Canvas `#ffffff`; charcoal `#171c22`; secondary ink `#565f68`; Ridgewell red `#b51226`; construction gray `#dfe5e9`; rules `#d8dde2`.
- Red is grounded in the original Ridgewell mark. It identifies the primary action and connects objects in the illustrations. Gray appears only as object depth, borders, and functional disabled states.
- Barlow Condensed, weight 600, gives the headlines the compact character of a technical drawing title. Manrope remains the readable body face. No serif or italic headings.
- Original, editable SVG artwork is the main visual material: an open ledger, organized files, handoff routes, a monitor showing a small process diagram, and an inquiry inbox. These are conceptual illustrations of published services, not product screenshots or results.
- One large connected-work illustration anchors the opening. Smaller related drawings explain the selected service, accounting foundation, and inquiry. All use the same perspective, line weight, and red accents.
- The original full logo is retained as supplied, including its raster source. New supporting graphics are vectors; the logo is not redrawn or substituted.
- The hero illustration sits directly on white. A shaped connection route echoes the direction of the ridge mark and physically connects accounting, operations, and software objects.
- Sections use different useful compositions: split introduction with generous artwork, service index plus contextual drawing, accounting drawing beside the business foundation, process rows, question disclosures, and an inquiry form.
- Service selection remains one comparison surface rather than a grid of promotional cards. Its illustration changes with the selected area.
- Page-level backgrounds remain white. Separation comes from typography, spacing, and structural rules. No shaded marketing slabs, gradients, blur, decorative grids, or floating mockups.
- Primary actions are red, secondary actions use text or an outline. Control corners are slightly softened; SVG edges follow the illustrated object, not UI-card conventions.
- Main service descriptions, lists, process explanations, FAQ answers, and input values use at least 16px. Small captions supplement rather than carry essential information. All controls retain 44px minimum touch areas.
- Motion is limited to selection and control feedback. Reduced motion disables transitions. SVGs do not animate merely to decorate the page.

## Behavioral contract

- Existing services, approach, about, questions, and contact anchors remain functional.
- Service tabs support arrows, Home, End, and standard focus navigation. Each service can preselect the inquiry interest.
- FAQ uses native disclosures.
- Inquiry validates locally and creates a draft for the visitor's email app. It never claims that a message has already been sent.
- Copy supports pending, success, and permission-denied states; stale completions cannot affect revised drafts.
- Mobile navigation fits short landscape viewports and scrolls internally. Escape closes it and restores focus.
- Core copy is bundled locally. No fabricated outcomes, fees, client identities, team portraits, or performance statistics.
- The historical reference is accounting experience since 2004, as published by Ridgewell. It is not described as the company's founding date.

## Runtime mapping

- `src/styles.css`: palette, type, layout, spacing, controls, scrollbars, responsive behavior.
- `src/components/VectorArt.tsx`: original reusable SVG objects and conceptual compositions.
- `src/components/inquiry.css`: the inquiry form and draft states, using shared tokens.
- `src/content.ts`: verified service areas and questions.
- `docs/source-audit.md`: public source provenance.
- `docs/verification.md`: current behavior, accessibility, and anti-slop checks. Passing those checks is a technical result, not a substitute for the owner's visual judgment.
