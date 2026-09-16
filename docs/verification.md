# Verification and anti-slop delivery gate

Verified 16 September 2026. Anti-slop was applied throughout the redesign. The owner explicitly authorized the visual direction, implementation, public repository, checkpoint commits, and final push.

## Executed checks

- PASS: `npm run test:unit`, 5 inquiry validation and encoding tests.
- PASS: `npm run build`, TypeScript and Vite production build.
- PASS: `npm test`, 25 browser tests passed; 1 intentionally skipped because the mobile-navigation test does not apply to the desktop project.
- PASS: axe WCAG A/AA scans in initial, invalid-form, and prepared-draft states on desktop and mobile; zero reported violations.
- PASS: widths 320, 390, 600, 768, 960, 1024, 1440, and 1920; no horizontal overflow and interactive targets at least 44px tall (fractional measurement tolerance below 1px).
- PASS: 200% text resizing at 640px; reflow without horizontal overflow.
- PASS: reduced-motion browser runs; transitions and smooth scrolling disabled by the preference.
- PASS: production preview smoke test, service-to-inquiry handoff, locally served fonts and images, no runtime errors or third-party requests.

The browser tests use Chromium for desktop and mobile emulation. These results do not claim physical-device or Safari/Firefox certification. The external mail application is not launched and no test messages are sent: tests intercept those clicks and verify the encoded destination and body.

## Recorded interaction review

| Control                                | Observed result                                                                                             |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Header and footer logo links           | Return to the home section.                                                                                 |
| Services, approach, and about links    | Reach the matching section and update the fragment.                                                         |
| Header and hero conversation actions   | Reach the inquiry section.                                                                                  |
| Hero support and starting-point links  | Reach the service selector.                                                                                 |
| All four service tabs                  | Update the associated service detail panel and selected state.                                              |
| Service tab ArrowDown, Home, End       | Move focus and selection to the expected item.                                                              |
| Each service inquiry action            | Reaches contact and preselects the corresponding service.                                                   |
| About approach link                    | Reaches the approach section.                                                                               |
| Approach contact link                  | Reaches the inquiry section.                                                                                |
| Four FAQ disclosures                   | Open with Enter, expose the answer, and close with Space.                                                   |
| Footer questions and back-to-top links | Reach questions and home.                                                                                   |
| Mobile menu                            | Opens and closes; all five links navigate and close it.                                                     |
| Mobile menu Escape                     | Closes the menu and restores focus to its trigger.                                                          |
| Name, email, organization, message     | Accept input; labels and errors are programmatically associated.                                            |
| Service dropdown                       | All seven published inquiry choices can be selected.                                                        |
| Empty inquiry                          | Shows field-specific errors and focuses the first invalid field.                                            |
| Valid inquiry                          | Shows a reviewable draft and focuses its heading; explicitly says nothing has been sent.                    |
| Email-app action                       | Exposes a correctly encoded mailto link to the published company address; test intercepts external handoff. |
| Direct email action                    | Exposes the published recipient; test intercepts external handoff.                                          |
| Copy draft                             | Copies the complete recipient, subject, and body; announces success.                                        |
| Copy pending                           | Shows Copying, aria-busy, and disabled state until completion.                                              |
| Denied clipboard                       | Explains the failure and selects the draft for manual copying.                                              |
| Edit inquiry                           | Restores editable fields without losing their values.                                                       |
| Service selection after draft          | Retains entered values and uses the newly selected service in the next draft.                               |
| Missing logo response                  | Accessible brand text and home link remain; main content still renders.                                     |

## Hard gate

- R-02 PASS: source scan found no em dashes in application copy.
- R-03 PASS: viewport and 200% text-size tests pass; mobile header and stacked content reviewed in screenshots.
- R-17 PASS: the only historical date is accounting experience since 2004, documented in the original homepage source snapshot.
- R-18 PASS: no testimonials, invented client identities, or stock team portraits.
- R-23 PASS: owner granted design authority; original logo reused; examples are labeled; no fictional identity assets.
- R-24 PASS: all navigation destinations exist and browser click-through reaches them.
- R-25 PASS: axe contrast scans and the plugin's contrast checker pass applicable thresholds; key ratios recorded below.
- R-26 PASS: every control has recorded behavior in the interaction table.
- R-27 PASS: core content is bundled and does not fetch remote data; blank/invalid inquiry, prepared draft, clipboard pending/success/failure, and image failure are exercised.
- R-28 PASS: questions are rewritten from Ridgewell's published FAQ, with source snapshot retained.
- R-32 PASS: semantic controls, tab keyboard handling, Escape navigation behavior, visible focus, and associated field errors verified.
- R-33 PASS: features are authored directly in TSX/CSS, with no source-rewriting helper scripts.
- R-34 PASS: one intentional corporate theme; no incomplete theme toggle.
- R-35 PASS: production build, production browser smoke test, and element-by-element interaction record above.
- R-36 PASS: no invented performance, security, compliance, client, price, or response-time claims.
- R-37 PASS: `DESIGN.md` records the authored direction and explicit dials before implementation; final palette reconciled to the real logo.
- R-38 PASS: company facts and services trace to saved public source responses; operational diagrams explicitly identify themselves as examples.

## Purpose gate

- R-01 PASS: burgundy/red comes from the original logo; no decorative gradients.
- R-04 PASS: check marks signify checklist items; menu/close and disclosure marks identify real controls; no decorative icon library.
- R-06 PASS: Manrope supports compact business copy; Newsreader italic adds restrained emphasis to human-oriented headings and the workflow note, as documented in `DESIGN.md`.
- R-07 PASS: no decorative background grid or dot pattern; rules separate service items and process rows.
- R-08 PASS: arrows signal section movement or external email handoff; plain navigation and other controls retain text labels.
- R-09 PASS: no fabricated badges or status indicators.
- R-10 PASS: no glassmorphism or backdrop blur.
- R-12 PASS: the operational paper illustration has a shallow offset to separate paper from its burgundy surface; the mobile menu shadow identifies the overlay.
- R-13 PASS: no glow effects.
- R-14 PASS: services use one indexed detail panel, with a labeled example; no repeated feature-card grid.
- R-19 PASS: motion is limited to control feedback and service-content transition; reduced-motion support verified.
- R-22 PASS: the hero is a code-native operational note related to Ridgewell's accounting/workflow offering, not a stock illustration or purported product screenshot.

## Liveliness gate

- PASS: ENERGY 2 / RHYTHM 3 / MOTION 1 recorded in the design direction.
- PASS: desktop and mobile screenshots show the declared restrained energy, varied section compositions, and limited motion.
- PASS: hero headline, service detail, founding year, process heading, FAQ, and inquiry each provide a section focal point.
- PASS: whitespace separates subject changes while examples and controls stay grouped.
- PASS: restrained red accents point to important actions and headline emphasis; burgundy provides the brand field.
- PASS: accounting-paper treatment and the original ridge mark tie the visual identity to the actual business.
- PASS: design read was declared before generation; palette was corrected after viewing the original logo.

## Craftsmanship and quality locks

- C-1 PASS: palette, type, layout, spacing, controls, illustration, and motion have written purpose in `DESIGN.md`.
- C-2 PASS: complete interaction table above; no placeholder controls.
- C-3 PASS: every section explains a published service, company foundation, engagement approach, common question, or contact action.
- C-4 PASS: responsive, resized text, keyboard, validation, copy errors, reduced motion, and missing-image behavior verified.
- C-5 PASS: real-source audit and saved public content; no fabricated proof.
- R-05 PASS: split introduction, indexed services, asymmetric heritage, sequential engagement process, FAQ rows, and split inquiry create varied composition. Process numbering conveys real sequence.
- R-11 PASS: small control radii, flat content regions, and a paper illustration; no pill-based design system.
- R-15 PASS: action labels identify their purpose: prepare inquiry, open email app, copy draft, talk about this service.
- R-16 PASS: copy scan found no prohibited AI marketing buzzwords.
- R-20 PASS: original red ridge logo, accounting-paper visual, operational examples, and founding reference establish business-specific identity.
- R-21 PASS: light corporate surfaces and a burgundy brand section are an intentional fixed presentation.
- R-29 PASS: burgundy/red, paper, white, and neutral ink form a limited palette.
- R-30 PASS: layout and identity were built for Ridgewell; no named product was cloned.
- R-31 PASS: rationale is documented for every major visual choice.

## Measured color pairs

| Pair                                           |  Ratio | Applicable result                         |
| ---------------------------------------------- | -----: | ----------------------------------------- |
| Muted text `#696560` on soft surface `#eee9e3` | 4.79:1 | PASS, normal text                         |
| Red `#a32430` on paper `#f5f4f0`               | 6.69:1 | PASS, normal text                         |
| Light copy `#ebd9d7` on burgundy `#581b27`     | 9.64:1 | PASS, normal text                         |
| Input border `#94867e` on white                | 3.52:1 | PASS, non-text boundary (3:1 requirement) |

## Delivery boundary

This is an independently deployable React SPA. The production domain, original website, and original inquiry API are untouched. The inquiry flow is an explicit email draft handoff, not server-delivered messaging. Public repository publication is authorized; the build artifact can be deployed to a static host.

## Independent review follow-up

The reviewer reproduced two edge cases, both fixed and covered by regression tests: the navigation now scrolls within short landscape viewports, and an earlier clipboard completion cannot mark a revised draft as copied. The reviewer reran both reproductions and confirmed the fixes. The production smoke test also verified the skip link, locally served favicon, and absence of console errors, failed resources, or third-party requests.
