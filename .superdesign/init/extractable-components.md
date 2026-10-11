# Extractable components

## Header
- Source: `src/components/Header.tsx`
- Category: layout
- Description: top bar with Ridgewell logo (public/brand), four anchor links, red "Let's talk" button, mobile menu with Escape handling
- Extractable props: activeItem (string, default: "home")
- Hardcoded: logo image, link labels, CSS classes

## Footer
- Source: `src/App.tsx` (inline, end of file)
- Category: layout
- Description: logo, service list, back-to-top link, copyright
- Extractable props: none
- Hardcoded: everything

## Services (tab list)
- Source: `src/components/Services.tsx`
- Category: basic
- Description: vertical keyboard-accessible tab list, selected service detail, before/after example, illustration
- Extractable props: selectedId (string, default: "accounting")
- Hardcoded: service content from content.ts

## InquiryForm
- Source: `src/components/InquiryForm.tsx`
- Category: basic
- Description: validated inquiry form that prepares an email draft (mailto + copy)
- Extractable props: interest (string)
- Hardcoded: field labels, states

Skip extraction for this project: the page is single and small; the draft agent gets full source as context instead.
