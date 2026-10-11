# Routes

No router. One document, anchor navigation only (real `href="#id"` links, no client routing).

| Anchor | Section | Rendered by |
|---|---|---|
| `#home` | Hero | `src/App.tsx` |
| `#services` | Service selector (tabs) | `src/components/Services.tsx` |
| `#about` | About / accounting point of view | `src/App.tsx` |
| `#approach` | Three numbered steps | `src/App.tsx` |
| `#questions` | FAQ (native details) | `src/App.tsx` |
| `#contact` | Inquiry form | `src/components/InquiryForm.tsx` |

Planned new anchor: `#work` (case-study rows) between services and approach.
