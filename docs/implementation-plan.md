# Ridgewell SPA implementation plan

Goal: ship a distinctive, accessible React SPA grounded in the existing Ridgewell website, with a public repository and verified interaction flows.

Architecture: Vite, React, TypeScript, bundled static content, CSS tokens, self-hosted fonts. In-page navigation avoids server rewrite requirements. The inquiry creates an email draft and never submits test or visitor data to the original site's backend.

1. Establish source audit, visual direction, package configuration, original logo, and public repository. Commit the foundation.
2. Build a responsive introduction, service selector, accounting heritage, approach, and source-backed questions. Build and inspect the page in Chromium. Commit the visual implementation.
3. Add validated inquiry, accessible mobile navigation, and email/copy handoff. Test validation and encoded draft content with unit tests; test flows in Playwright. Commit the interactions.
4. Run build, browser click-through, accessibility scans, viewport/zoom checks, and anti-slop delivery gate. Document actual results, add CI and deployment instructions, commit, and push main.

Verification covers every nav destination, service category, service inquiry action, FAQ disclosure, inquiry error and ready states, copy success/failure, mobile menu Escape/focus, no console errors, 320/390/768/1024/1440 widths, reduced motion, and source/claim integrity.
