# Pages

## / (single page)
Entry: src/App.tsx
Dependencies:
- src/hooks/useMotion.ts (GSAP + ScrollTrigger entrances, reduced-motion handling)
- src/components/Header.tsx (logo from public/brand, nav, mobile menu)
  - src/components/Arrow.tsx
- src/components/Arrow.tsx
- src/components/Services.tsx (keyboard tab list + selected service detail + illustration)
  - src/content.ts
  - src/components/VectorArt.tsx
  - src/components/Arrow.tsx
- src/content.ts (services, questions, companyEmail)
- src/components/InquiryForm.tsx
  - src/lib/inquiry.ts (validation + mailto draft)
  - src/components/inquiry.css
  - src/content.ts
- src/components/VectorArt.tsx (OperationsIllustration, FoundationIllustration, InquiryIllustration, service illustrations)
- src/styles.css (global tokens + all section layout)

Context-file budget: every file is under 900 lines; the whole set is ~2300 lines. Pass full files. VectorArt.tsx (285 lines of SVG paths) can be omitted from design calls when the direction replaces illustrations with screenshots.
