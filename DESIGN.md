# Ridgewell design direction

## Owner direction

The owner rejected the earlier white page with isometric vector drawings, and then two text-only layouts (a bento grid and a sticky split), because none of them showed the software Ridgewell actually ships. The approved direction is "Showroom": a product-forward page in which drawn product screens inside browser and phone frames carry the argument. It keeps the warm off-white page, white panels, Barlow Condensed and Manrope, and Ridgewell red as the only accent. The owner also asked that clients stay unnamed, that copy stay at outcome level so competitors cannot read the build recipe, and that the LeaseTrack building be labelled "Condominium". The approved concept spec is in `docs/superpowers/specs/`.

## Context

Ridgewell Management Services, Inc. offers two services: Website design and Bespoke system development. It started in accounting in 2004, so the books and the workflow come first. Visitors are Philippine SME owners and school or property administrators. The page has three jobs: make the two services clear in one screen, show seven systems in daily use (five built for a K-12 and college school, two products Ridgewell runs itself), and start an inquiry. Published company facts, the original logo and the published contact address are the evidence base. No outcomes, metrics or client identities are invented.

## Visual direction

This reads as a software company's page, not a brochure and not a ledger. Hierarchy comes from screen size, type size and whitespace. The mood is light, warm and confident.

**Colour.** The page canvas is a warm off-white, `#f6f4ef`. Cards, panels, the header and form fields are white, `#fff`. The "Our products" section sits on the page's one deeper band, `#efece5`. Ink is `#171c22`, secondary ink `#565f68` and meta text `#636b73`; the design system's lighter meta grey fails 4.5:1 for 13px text, while `#636b73` passes on white, the page tint, the band and the frame chrome. Ridgewell red `#b51226` (hover `#9c0f20`) is the only accent. It marks primary buttons, the 6px square before section labels, list bullets, index numerals, "What changed:" lead-ins, the focus ring and link hover. Apart from those small squares, red is a background only on the primary button, the skip link, selected text, and the buttons and logo mark inside drawn screens. Rules are `#e3dfd6` on the page and `#e8e5df` inside white panels. Browser chrome is `#f1efe9`. Inside drawn screens only, status text may also use green `#3f7a2f` and amber `#9a6210`, both at least 4.5:1 on white. Four functional neutrals are used for non-text UI only: control borders `#7c858d`, the secondary button border `#cfd4d9`, the scrollbar thumb `#a39d92` and the browser-chrome dots `#d5d0c6`. There are no other colours, no dark bands, no gradients, no blur and no glass.

**Typography.** Barlow Condensed 600, letter-spacing -0.01em, sets h1 (48 to 88px, line-height 0.95), h2 (36 to 60px), h3 (26 to 32px), the red index numerals (24px) and the About fact values (28 to 36px). Manrope Variable sets everything else: body copy at 17px with 1.55 line-height, card copy and list items at 16px, section labels at 13px 600 uppercase with 0.08em tracking, and meta lines at 13px. Body copy never drops below 16px and captions never below 13px. There are no serif, italic display or decorative faces.

**Layout.** Content sits in a 1200px wrap with a 24 to 48px gutter, and sections are spaced 72 to 112px apart. The sticky white header carries the logo, centred nav (Services, Work, Approach, Contact) and a red "Start a project" button; below 960px a Menu toggle replaces the nav. The centred hero has a label, h1, lead and two buttons above a 1120px browser frame holding the units grid, with the frame's bottom clipped by the proof line. From 1024px a 200x420 phone frame showing the parent portal overlaps the frame's bottom-right corner. The proof line has one sentence and three white chips. Services are two equal cards, each ending in a drawn mini UI clipped at the card's bottom edge. Work features card 01 across the row (screen 7/12, copy 5/12 from 768px) above a 2x2 grid of cards with 16:10 screens. The two product cards sit on the band, each with a screen bleeding off its bottom edge. Approach has three numbered columns, About sits copy left and facts right, Questions are a single 720px column, Contact is one white panel split into details and form, and the footer sits on the page tint above a top rule.

**Components.** Section labels pair a 6px red square with the 13px uppercase label. Buttons have a 6px radius and a 48px minimum height (about 51px as rendered); the header's "Start a project" button is the compact variant at 44px. Primary is red on white text, secondary is white with a `#cfd4d9` border. Text links carry an arrow and turn red on hover. Cards are white, flat, 1px `#e3dfd6`, with a 10px radius and 24 to 32px padding. The browser frame has a 36px chrome strip with three 8px dots and an address bar, a 1px border, a 12px radius and the soft shadow `0 24px 60px -24px rgba(23, 28, 34, 0.18)`; the flat variant used inside cards has no shadow. The phone frame is 200x420 with a 32px radius and an 8px ink bezel. Chips are white pills with 13px 600 type. Every interactive element is at least 44px tall, and the focus ring is a 3px red outline.

**Imagery.** Screens look like real product UI: a units grid, a parent portal, a grades table, an attendance register, an enrollment queue, an approval form, a subject enlistment, a cheques worklist, a receipt-to-ledger line, a website wireframe and a records table. They are drawn in HTML and CSS with obviously fictional names, cropped to a region and clipped by their frame, and exposed to assistive technology as one image with a descriptive accessible name. A real, tightly cropped screenshot with no personal data can replace any of the seven case-study screens through `CaseStudy.image` in `src/content.ts`. The hero's units grid and phone, and the two service screens, are always drawn: `Hero` and `Services` pass no image, so swapping them would need an `image` field added to `hero` and `services`.

**Deliberate deviations from the approved draft.** Inputs keep a visible `#7c858d` border for contrast. Meta text is `#636b73` and screen status colours are darkened so that every visible text passes 4.5:1. Browser-chrome dots are neutral rather than coloured. The phone frame is 200x420 rather than 280x580. The "Expiring in 30 days" panel sits left of the unit grid so that the phone cannot cover it. Form field labels keep their more descriptive wording, and the contact address is the published one, not the draft's placeholder.

**Do not.** No shadows except on the hero browser frame and the phone, no gradient slabs, no icon grids, no testimonial carousels, no invented metrics, no logos of other companies and no stock photography.

**Content rule.** No visible text, drawn screen, alt text or accessible name names a framework, language, database, cloud, cluster, identity provider, automation tool, module code or school-form code. Clients are described, never named: "a K-12 and college school" and "a condominium property manager". Case-study copy says who uses each system and what got easier, never how it is built. `src/lib/forbidden.ts` holds the enforced word list.

## Behavioral contract

- Existing services, approach, about, questions, and contact anchors remain functional.
- Each of the two service cards has a 'Talk about this service' link that preselects the inquiry interest.
- Ways to work presents five ordered steps and a separate privacy panel; discovery-call links reach Contact with "Not sure yet" selected.
- FAQ uses native disclosures.
- Inquiry validates locally and creates a draft for the visitor's email app. It never claims that a message has already been sent.
- Copy supports pending, success, and permission-denied states; stale completions cannot affect revised drafts.
- Mobile navigation fits short landscape viewports and scrolls internally. Escape closes it and restores focus.
- Core copy is bundled locally. No fabricated outcomes, fees, client identities, team portraits, or performance statistics.
- The historical reference is accounting experience since 2004, as published by Ridgewell. It is not described as the company's founding date.

## Runtime mapping

- `src/styles.css`: tokens, type, layout, sections, responsive behaviour.
- `src/components/screens.css`: browser and phone frames, drawn product screens.
- `src/components/inquiry.css`: the inquiry form and draft states.
- `src/content.ts`: the page copy (hero, proof, services, case studies, approach, about, questions, contact details) and the inquiry options. Some copy lives in components: the Services and Questions section labels and headings, the Contact terms and the "What changed:" lead-in, the header and footer, and the form's labels, states and messages (`InquiryForm.tsx`, with validation messages in `src/lib/inquiry.ts`). `src/lib/forbidden.ts`: what copy may never say; the unit scan reads `content.ts` and the drawn screens, and the rendered-page scan in `tests/work.spec.ts` reads everything.
- `src/components/Screen.tsx` and `src/components/screens/`: the drawn screens and the slot a real screenshot replaces.

## Motion implementation

`src/hooks/useMotion.ts` owns all motion through one GSAP `matchMedia` context scoped by React's `useGSAP` and reverted on unmount. Motion runs only under `prefers-reduced-motion: no-preference`. h1 and h2 headings settle 12px when they enter the viewport. The hero stage rises 24px on load, as a transform only and with no scroll trigger, so it also settles on short phone viewports where its top starts below the trigger line. Every other `[data-reveal]` card fades in and settles 12px once as it enters the viewport. Each tween clears its inline transform and opacity when it finishes. There is no parallax, no pinning and no scroll hijacking, and drawn screens never move on their own. Under reduced motion, or when the preference changes while the page is open, the context reverts and the page shows its final state with no inline transform or opacity. Sources: [GSAP React lifecycle guidance](https://gsap.com/resources/React/) and [ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).
