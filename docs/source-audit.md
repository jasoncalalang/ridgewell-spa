# Original website review

Inspected 16 September 2026. The public site is a Next.js application. Its server response contains navigation and metadata while the homepage, services, and contact copy arrive through client API calls. The direct connection worked when the web reader could not load the site.

## Public source material

- https://ridgewell.com.ph/
- https://ridgewell.com.ph/api/homepage
- https://ridgewell.com.ph/api/services
- https://ridgewell.com.ph/api/contact-page
- https://ridgewell.com.ph/api/faq
- https://ridgewell.com.ph/assets/brand/ridgewell-management-services-logo.jpg

The homepage describes operations support for Philippine SMEs and accounting experience since 2004. Services include accounting, workflow improvement, administrative process support, documentation, scheduling, coordination, practical tool/AI guidance, and focused custom software. The contact API publishes `ridgewell-management-services-inc@polsia.app`.

## Redesign decisions

1. Replace repeated, abstract operational copy with a clear service index and concrete examples grounded in the existing offerings.
2. Bundle verified content with the SPA so the core message appears without waiting for multiple content endpoints.
3. Keep the real identity and founding reference, without inventing performance statistics or client proof.
4. Group related services into four understandable starting points while retaining every published service area in the inquiry options.
5. Use an email draft handoff because no cross-origin submission contract or backend credentials were provided. The interface must describe this truthfully.
6. Preserve the live production site. This repository is the independently deployable redesign.

Original public response snapshots are retained under `docs/source-snapshots/`. Copy has been rewritten for clarity; example workflow items illustrate the service and are explicitly labeled as examples.
