# Ridgewell "Studio ledger" concept — design spec

Date: 2026-10-11. Owner direction: approved in chat ("let us do what you recommend").

## Intent

Ridgewell Management Services, Inc. supports Philippine SMEs with accounting, operations, documentation and focused software. The live site (ridgewell.com.ph, built from this repo) explains services with original isometric vector drawings and deliberately shows no outcomes, because none were publishable. That gap is now closed: Ridgewell has shipped real systems for a K-12 and college school, for a clinic (not shown for now), and for its own operations. The new concept keeps the approved visual language (white canvas, charcoal type, Ridgewell red, Barlow Condensed headlines, Manrope body) and reorganises the page around proof: a Work section of editorial case-study rows with real product screenshots.

Success: a Philippine SME owner lands, understands in one screen that Ridgewell does accounting + operations + software, sees the software is real and in daily use, and starts an inquiry. The owner (Jason) can show the site as a portfolio.

## Decisions taken

- Direction: "Studio ledger" (option 1 of 3). Not the dark newsprint direction, not the append-only option.
- Positioning: services-first, Work prominent. Nav: Services, Work, Approach, Contact. Ridgewell stays an accounting-and-operations firm that also builds software; the portfolio is evidence, not the identity.
- Clients are NOT named (superseded 2026-10-11): the school and the property manager are described generically. Repos stay private; case studies are prose + screenshots, no code links.
- Single page, no router. Each case study is one editorial row with an anchor (`#work-portal`). Detail pages are out of scope.
- Visual language: warm off-white page, white panels, Barlow Condensed + Manrope, red-only accent, no gradients. The isometric vector art is removed; drawn product screens (later real screenshots) carry the page.
- Motion: existing GSAP contract stays (entrances, 12px heading settle, reduced-motion renders final state). Work rows get the same entrance; screenshots do not parallax.
- No fabricated metrics. Facts per case study are things that are true today (scope, stack, where it runs, since when).

## Page structure (Showroom, current as of 2026-10-14)

Supersedes the numbered-rows structure first written on 2026-10-11; the Mobbin references behind each section are listed in the Showroom addendum below.

1. Header: 64px, white, bottom rule. Logo left, nav Services / Work / Approach / Contact, red "Start a project" button right. Mobile: Menu toggle with the existing Escape and focus contract.
2. Hero, centred: section label "Business, in working order.", h1 "Websites and bespoke systems, built to be used every day.", one lead sentence pair, buttons "Start a project" (red) and "See our work" (white). Below: a 1120px browser frame showing the LeaseTrack units grid (sidebar, title "Units, Condominium", 40 unit tiles, "Expiring in 30 days" panel), its bottom clipped by the next section. A phone frame showing the parent portal overlaps the frame's bottom-right corner on desktop; hidden on mobile. The phone must not cover the "Expiring in 30 days" panel.
3. Proof line: "Systems in daily use at a school, a property manager, and our own office." and three chips: "7 systems in daily use", "2 products of our own", "Started in accounting, 2004". No other numbers on the page.
4. Services: label "What we do", h2 "Two things, done properly.", two equal white cards (Website design, Bespoke system development), each with the description, three red-square items, a "Talk about this service" link that preselects the inquiry, and a drawn mini UI clipped at the card bottom (website: browser wireframe; systems: records table with Approve buttons). The old four-tab selector is retired.
5. Work, built for a client: label "Work", h2 "Built for a client", intro "Five systems for a K-12 and college school, in use since 2026." Card 01 featured (screen left 7/12, copy right 5/12); cards 02 to 05 in a 2x2 grid with a 16:10 screen on top. Each card: red index, title, summary, bold red-led "What changed:" line, meta "For ... · In use since 2026". The screen fills its frame; no empty space below the drawn UI.
6. Work, our products: label "Our products", h2 "Two products we run ourselves.", on the deeper warm band #efece5. Two wide cards (06 LeaseTrack, 07 Ridgewell Ledger) with tagline, paragraph, two facts, a text link, and a screen bleeding off the card bottom (cheques worklist; receipt to ledger line).
7. Approach: label "How we work", h2 "Scoped small, shipped in weeks.", three columns 01 02 03 above a 1px rule.
8. About: label "About", h2 "An accounting point of view.", two paragraphs left; three stacked facts right (Practice since / 2004, Clients / Philippine schools, property managers and SMEs, Team / One team from ledger to software).
9. Questions: label "Questions", h2 "Good to know.", the four existing native disclosures, max 720px.
10. Contact: one white panel split: left "Tell us about the project.", the published email, what to include (three items), hours "Mon to Fri, 9am to 6pm Manila"; right the existing inquiry form with the interest select reduced to Website / Bespoke system / Not sure yet.
11. Footer: logo, "Website design · Bespoke system development", links to the Work anchors, Back to top, copyright.

Screens: every screen is drawn UI in HTML/CSS with fictional names (a React component per screen). A real, tightly cropped screenshot may replace any drawn screen later through the same component slot. No screen names a client, a building, a technology, or a real person; the LeaseTrack building is labelled "Condominium".

## Services (content for the Services section)

Two offers only (owner decision 2026-10-11). Accounting, operations and documentation are no longer sold on the page; the accounting background stays as a credibility line in About.

### Website design
A fast, accessible website that explains what you do and gets people to contact you. Design, copy structure, build, hosting and upkeep, with your own domain and email.
- Items: brand-faithful design and copy structure; accessible, mobile-first build; hosting, domain, analytics and upkeep

### Bespoke system development
Internal systems built around how your organisation already works: enrollment, records, portals, approvals, reporting, mobile companions. Scoped small, shipped in weeks, supported after launch.
- Items: portals and records systems for staff and the people they serve; forms, approvals, reporting and integrations; web and mobile, with ongoing support

## Case studies (content for the Work section)

Owner constraints (2026-10-11): no stack names, no infrastructure, no module inventories, nothing a competitor could use as a build recipe, and NO client names anywhere (the school and the property manager are described, not named). Each row is two sentences about who uses it and what got easier, plus three facts. Screenshots are tightly cropped regions, never full screens, never real personal data. APEX+ / LLI is not shown for now.

Work is split into two groups. Intro line: "Systems in daily use at a school, a property manager, and our own office."

### Group A, "Built for a client": five systems for a K-12 and college school

#### 01 Parent and student portal
Parents and students see grades, attendance and report cards in one place, on the web and on their phones. One sign-in for the whole family.
- For: parents and students of a K-12 and college school
- What changed: report cards and attendance without a trip to the registrar
- In use since: 2026

#### 02 Teacher and staff portal
Teachers record attendance and grades once, and the official school forms come out ready to print. Staff keep medical and guidance records in the same place.
- For: teachers and school staff
- What changed: school forms produced from daily records, not re-encoded
- In use since: 2026

#### 03 Enrollment and registrar system
Families enroll online; the registrar assesses, admits and sections from a single queue. Finance sees the same record, so nobody chases paper between offices.
- For: the registrar and finance offices, enrolling families
- What changed: one enrollment record from application to admission
- In use since: 2026

#### 04 HR and campus gate
Employee records, requests and approvals in one system, with gate scans at the campus entrance that mark who is in.
- For: HR and every employee
- What changed: approvals and attendance without paper forms
- In use since: 2026

#### 05 College registrar
Enrollment for the college department that follows each programme's curriculum, so students only enlist in subjects they can take.
- For: the college registrar and its students
- What changed: curriculum checks at enrollment instead of after
- In use since: 2026

### Group B, "Our products": Ridgewell-owned systems

#### 06 LeaseTrack, tenant and lease management
Leases expiring in 30, 60 and 90 days, this week's post-dated cheques, and every contract a click away. Built for a condominium property manager with about 200 units; every change is logged.
- For: property managers and their admin teams
- What changed: renewals and post-dated cheques tracked in one place
- Status: live demo at leasetrack.ridgewell.com.ph

#### 07 Ridgewell Ledger, receipts to books
Photograph a receipt or service invoice and it becomes a line in a bookkeeper-ready ledger, categorised by vendor and exportable to Excel. Used for Ridgewell's own books first.
- For: small business owners and their bookkeepers
- What changed: receipts become ledger entries without manual encoding
- Status: in use at Ridgewell

## Behavioral contract (unchanged unless noted)

- All existing anchors keep working; `#work` and `#work-<id>` are added.
- The four-tab service selector is retired (Showroom). Each of the two service cards has a "Talk about this service" link that preselects the inquiry interest and scrolls to the form.
- FAQ native disclosures, inquiry validation and email-draft handoff stay as they are.
- Screenshots are static images in `public/work/`, with meaningful alt text, lazy-loaded, sized to avoid layout shift, and never containing personal data.
- Body copy 16px minimum, 44px touch targets, axe checks in Playwright stay green.

## Research inputs

- Mobbin: YLLW services rows, Koto service index, Apollo numbered steps, Fiasco split contact, Complex Law about facts, Oyster hero. Reference images are uploaded to the superdesign canvas, not committed.
- context.dev: ridgewell.com.ph style extraction (confirms deployed tokens), pilot.com (accent discipline, 20px body, generous spacing), Awwwards accounting nominees (Cecca, Henry+Horne, Moss Adams, Balancing Act).
- superdesign: project "Ridgewell Studio ledger", baseline reproduction then branch variants of the hero and Work section.

## Out of scope

Router or detail pages, CMS, server-backed inquiry form, new logo, dark mode, testimonials, metrics.

## Testing

Unit: inquiry tests updated for the three interest options; a content test guards the forbidden-word rule (no technology, client, building or form-code names). Browser: existing desktop/mobile Playwright + axe; add a Work-section spec (seven cards render, anchors resolve, screens have accessible names, no forbidden words in the rendered page, reduced motion shows final state). Visual review on the superdesign canvas before implementation.

## Addendum 2026-10-11 (after canvas review)

Owner feedback on variants A and B: both inherited the current page's structure; a completely new layout is wanted, light themed. Decisions: page canvas becomes warm off-white #f6f4ef with white panels and 1px #e3dfd6 borders (no shadows, no gradients); two from-scratch layouts are explored on the canvas: a bento grid and a sticky split. Fonts, red accent, case studies, behavioral contract and motion rules are unchanged. The "white everywhere" rule in the Visual direction above is superseded by this addendum.

## Addendum 2026-10-11, later (content trimmed)

Owner feedback: the case studies gave away too much; competitors could read the stack and architecture. Decisions: the page offers two services only (Website design, Bespoke system development); APEX+ / LLI is not shown for now; the five CSPB case studies are rewritten at outcome level with For / What changed / In use since facts and no technology or infrastructure words; the platform note is removed. The Services and Case studies sections above are the current content.

## Addendum 2026-10-11, latest (products added, clients anonymised)

Owner: add LeaseTrack and the receipt-to-ledger system (named "Ridgewell Ledger" on the page) as Ridgewell products; remove customer names. Decisions: Work has two groups, five school systems (client unnamed, described as "a K-12 and college school") and two Ridgewell products (LeaseTrack's client described as "a condominium property manager"); headings drop the school's acronym; the Work intro becomes "Systems in daily use at a school, a property manager, and our own office."

## Addendum 2026-10-11, direction change ("Showroom")

Owner feedback on the bento grid and sticky split drafts: neither resonates (bento only slightly). Both were text-only layouts with no imagery, built from editorial and agency references. A second Mobbin pass (software-company pages: Twenty, Sketch, Mintlify, Riverside heroes; incident.io, Bird, Webflow, Intercom, Amplemarket, Miro, Savor sections) points to a product-forward page: a centred headline over a large browser-frame screenshot, screenshot cards for every case study and product, drawn mini UI inside the service cards, three plain proof chips, and a split contact panel. Decisions: the "Studio ledger" visual direction (numbered rows, index tables) is dropped; the warm off-white page, white panels, Barlow Condensed + Manrope, red-only accent, trimmed outcome-level content, two services, seven anonymised rows, behavioral contract and motion rules stay. Soft shadows are now allowed on screenshot and phone frames only. `.superdesign/design-system.md` is rewritten for this direction. Screenshot regions in drafts are drawn UI; real cropped screenshots replace them at implementation. The LeaseTrack live-demo claim must be re-verified before launch: on 2026-10-11 the hostname did not resolve and the compose stack on omada-swc was not running.

## Addendum 2026-10-14 (Showroom approved, plan started)

Owner approved the Showroom draft ("i'm agreeable on the showroom draft") and asked that the LeaseTrack building be labelled "Condominium" instead of the draft's "Rada Tower". Decisions for implementation: the Page structure section above is rewritten to the Showroom layout; the four-tab service selector is replaced by two service cards whose "Talk about this service" links preselect the inquiry interest; the interest options become Website / Bespoke system / Not sure yet; drawn screens ship first as React components (no personal data, no stack words) and real cropped screenshots replace them through the same slot when captured; the published contact address in `src/content.ts` stays (the draft's hello@ address was a placeholder and is not used); the inquiry form keeps its current, more descriptive field labels. The LeaseTrack "live demo" link is rendered only when the demo is confirmed reachable at launch (see the 2026-10-11 Showroom addendum).
