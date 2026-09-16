# Ridgewell design direction

## Context

Public business website for Ridgewell Management Services, Inc. The audience is Philippine SME owners and growing teams seeking accounting, operations, or focused software support. The page's job is to help visitors recognize their operational problem and begin a useful conversation.

The owner authorized an independent redesign using anti-slop throughout, a React SPA, a public GitHub repository, frequent commits, and a final push. This direction is an authored interpretation of that brief and the existing brand, not a claim of an established brand manual.

## Visual direction

- ENERGY 2 / RHYTHM 3 / MOTION 1.
- Deep forest `#163e35`, paper `#f6f7f2`, white `#ffffff`, ink `#1c302a`, muted ink `#56675f`, citron `#d6eb83`.
- Preserve the real Ridgewell logo. Green develops the existing green brand into a stronger, calmer business identity. Citron highlights one key action against forest.
- Manrope for readable, assured business copy; Newsreader italic only for the human emphasis in the main headline. Both fonts are self-hosted.
- Light paper and white are fixed brand surfaces; dark forest sections provide narrative emphasis. A theme toggle would alter the intended corporate identity and adds no task value here.
- A large typographic introduction beside an operational note becomes the signature: a concrete business problem paired with the support it needs. This visual represents an example, not a customer system or performance claim.
- Service navigation is an editorial index, with a large contextual detail panel. The content needs comparison, not a repeated grid of promotional cards.
- Section compositions vary: split introduction, service index, accounting heritage, process rows, questions, inquiry.
- Hairlines separate comparable content. Small radii belong to controls; the illustrated work note has a softened paper edge. No glow, decorative grid, or floating cards.
- Only a directional icon on the primary action and service navigation; plus/minus indicate disclosure, menu/close control navigation. No decorative feature icon library.
- Whitespace separates subject changes. Dense operational examples stay grouped. Mobile composes each section vertically with its own spacing scale.
- Motion is limited to control feedback and a short service-panel transition. Reduced motion disables it.

## Behavioral contract

- Real in-page destinations: services, approach, about, questions, contact.
- Service selector is keyboard-operable and updates the detail panel; service actions preselect inquiry interest.
- FAQ uses native disclosures.
- Inquiry validates locally and creates an email draft addressed to the published company email. It clearly says it opens the visitor's email application and never claims a message was sent.
- Visitors can copy the draft, with explicit success or fallback instructions on clipboard failure.
- No invented contact details, testimonials, client logos, outcomes, fees, or response-time promises.
- Static content ships with the app, avoiding the original site's dependency on several content API calls to render its main copy.
- Preserve focus, support keyboard navigation, and test 320px through desktop, reduced motion, image failure, and inquiry validation.

## Runtime mapping

All palette, typography, spacing, radius, motion, and scrollbar tokens live in `src/styles.css`. Shared controls use `.button`, `.text-link`, `.field`, and `.section-label`. Source content lives in `src/content.ts`; source URLs are recorded in `docs/source-audit.md`.
