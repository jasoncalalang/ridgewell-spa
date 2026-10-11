# Ridgewell "Studio ledger" concept — design spec

Date: 2026-10-11. Owner direction: approved in chat ("let us do what you recommend").

## Intent

Ridgewell Management Services, Inc. supports Philippine SMEs with accounting, operations, documentation and focused software. The live site (ridgewell.com.ph, built from this repo) explains services with original isometric vector drawings and deliberately shows no outcomes, because none were publishable. That gap is now closed: Ridgewell has shipped real systems for Colegio de San Pascual Baylon (CSPB), for Limchoc Laser Institute (APEX+), and for its own operations. The new concept keeps the approved visual language (white canvas, charcoal type, Ridgewell red, Barlow Condensed headlines, Manrope body) and reorganises the page around proof: a Work section of editorial case-study rows with real product screenshots.

Success: a Philippine SME owner lands, understands in one screen that Ridgewell does accounting + operations + software, sees the software is real and in daily use, and starts an inquiry. The owner (Jason) can show the site as a portfolio.

## Decisions taken

- Direction: "Studio ledger" (option 1 of 3). Not the dark newsprint direction, not the append-only option.
- Positioning: services-first, Work prominent. Nav: Services, Work, Approach, Contact. Ridgewell stays an accounting-and-operations firm that also builds software; the portfolio is evidence, not the identity.
- Clients are named: CSPB and APEX+ by Limchoc Laser Institute. Repos stay private; case studies are prose + screenshots, no code links.
- Single page, no router. Each case study is one editorial row with an anchor (`#work-mycspb`). Detail pages are out of scope.
- Visual language is retained: tokens, fonts, red-only accent, no shaded slabs, no gradients. Isometric vector art is reduced to the hero only (or removed if the screenshot composition carries the hero); service and about illustrations are replaced by real screens.
- Motion: existing GSAP contract stays (entrances, 12px heading settle, reduced-motion renders final state). Work rows get the same entrance; screenshots do not parallax.
- No fabricated metrics. Facts per case study are things that are true today (scope, stack, where it runs, since when).

## Page structure

1. Header: logo, Services / Work / Approach / Contact, red "Let's talk".
2. Hero: label, headline (keep "Business, in working order." unless the owner supplies a new line), one-sentence description, primary CTA, and a single composition of 2 to 3 real product screens in plain 1px frames (MyCSPB mobile + SIS desktop). Reference: Oyster hero (headline + one strong image).
3. Services index: label left, four services as stacked rows with rules, selected service shows a short description + 3 items + a real screenshot where one exists (software and operations rows). Reference: YLLW services rows, Koto index. Keeps the keyboard-accessible selector contract.
4. Work: section label "Work", one-line intro ("Systems in daily use at a school, a clinic, and our own office."), then 6 editorial rows. Each row: index number (01 to 06), client + product name as a Barlow Condensed heading, one paragraph, three facts as a small definition list (Scope / Built with / Runs on), one or two screenshots in a plain frame. Rows alternate screenshot side on desktop; stack on mobile.
5. Approach: three numbered steps with rules (existing content). Reference: Apollo numbered steps.
6. About: "An accounting point of view" copy plus three facts (accounting experience since 2004, Philippine SMEs, one team from ledger to software). Reference: Complex Law.
7. Questions: existing FAQ, single column, native disclosures.
8. Contact: split, left = what to send and the published email, right = the existing draft-an-email inquiry form. Reference: Fiasco.
9. Footer.

## Case studies (content for the Work section)

Facts below are taken from the repos and the architecture doc on 2026-10-11. Screenshots are to be captured from staging or demo builds; none may show real student, employee, or patient data.

### 01 MyCSPB — parent and student portal, web + mobile
Client: Colegio de San Pascual Baylon. Parents and students sign in once (Keycloak SSO, Google sign-in) and see grades laid out exactly as the DepEd SF9 report card, attendance, per-term grade release, and account linking codes. A Flutter companion app (Android and iOS) wraps the same backend.
- Scope: grades, attendance, report cards, parent-student linking, mobile app
- Built with: React, Express BFF, Quarkus, PostgreSQL, Flutter, Keycloak
- Runs on: CSPB's on-prem Kubernetes cluster behind Cloudflare Tunnel

### 02 CSPB SIS — teacher and staff portal
Teachers take attendance that feeds DepEd School Form 2, encode grades on the three-term calendar, and print School Forms 9 and 10 to the official layout. Staff modules cover medical and discipline records. Registrar and admin roles reach every section.
- Scope: attendance, grades, DepEd school forms, medical, discipline
- Built with: React, Express BFF, Quarkus, PostgreSQL
- Runs on: same cluster; proxies attendance and grades to the registrar API

### 03 CSPB Registrar and online enrollment
The enrollment system of record: online registration, assessment, finance admit rules, discounts, section assignment, and the student master. Replaced spreadsheets and a vendor SMS. In production on campus since August 2026.
- Scope: enrollment lifecycle, assessment and finance, student master, reports
- Built with: Quarkus API, React UI, Express BFF, PostgreSQL, Flyway
- Runs on: on-prem kubeadm cluster (Cilium), GitOps via Helm + GitHub Actions

### 04 CSPB HRIS and campus QR gate
HR 201 files, payroll officer workflows, service requests with four-eyes approval, employee photos on MinIO, and an AskHR assistant. Gate scans from the campus QR scanner clock employees in and out and feed student attendance suggestions to SIS.
- Scope: HR 201, payroll support, service requests, gate attendance
- Built with: React, Express BFF, Quarkus, PostgreSQL, MinIO, Redis
- Runs on: same cluster; kiosk + admin apps for the gate

### 05 CSPB College registrar
Unit-aware, curriculum-driven enrollment for the college department, replacing the 1DPH SMS. Per-term fee rates, curriculum checks, Keycloak realm per audience, and a college staging cluster on a developer-hosted minikube.
- Scope: curriculum, enrollment, assessment for the college department
- Built with: Quarkus, React, Keycloak, PostgreSQL
- Runs on: on-prem cluster (prod), minikube staging via self-hosted runner

### 06 APEX+ by Limchoc Laser Institute — site and patient app
A physician-guided performance and longevity programme. Ridgewell built the static marketing site (hero, four pillars, consultation steps, clinic details, FAQ) with a security-gated delivery pipeline, and a Flutter patient companion: dose schedules and logging, care messages, side-effect reports, body measurements, sign-in via Keycloak PKCE.
- Scope: marketing site, patient companion app, clinic API
- Built with: Next.js static export, Flutter, Quarkus, Firestore, Keycloak
- Runs on: Google Cloud Run (site), Android and iOS (app)

### Optional 07 LeaseTrack — Ridgewell's own tenant and lease demo
Tenant and lease management pitch demo for Condocenter Inc., live at leasetrack.ridgewell.com.ph. Include only if the owner wants a Ridgewell-branded example; it is the one case the firm can link to.

### Platform note (one line under the CSPB rows)
All CSPB apps share one Keycloak SSO, one PostgreSQL, n8n automations and a two-node on-prem Kubernetes cluster that Ridgewell designed, bootstrapped (Ansible, kubeadm, Cilium) and operates, fronted by Cloudflare Tunnel with Let's Encrypt certificates.

## Behavioral contract (unchanged unless noted)

- All existing anchors keep working; `#work` and `#work-<id>` are added.
- Service selector keyboard contract stays. Selecting a service may scroll-link to the related Work row ("See it in use").
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

Unit: inquiry tests unchanged. Browser: existing desktop/mobile Playwright + axe; add a Work-section spec (six rows render, anchors resolve, images have alt text, reduced motion shows final state). Visual review on the superdesign canvas before implementation.
