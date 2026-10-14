# Ridgewell "Showroom" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the single-page ridgewell.com.ph SPA as the approved "Showroom" design: a product-forward light page where drawn product screens carry the hero, two service cards, seven case-study cards and the contact panel.

**Architecture:** Same React 19 + Vite SPA, same single page with anchor navigation, same GSAP motion contract and inquiry flow. The old four-tab selector and the isometric SVG art go away. New: a `Screen` registry that renders one drawn product screen per key (a real cropped screenshot can later replace any screen through the same slot), `BrowserFrame` and `PhoneFrame` primitives, one component per page section, a content module that is the single source of copy, and a forbidden-word guard that runs in unit tests and in the browser.

**Tech Stack:** React 19, TypeScript 6, Vite 8, vanilla CSS with `@layer`, GSAP 3 + `@gsap/react`, Fontsource (Barlow Condensed 600, Manrope Variable), Node test runner, Playwright 1.63 + axe-core.

**Spec:** `docs/superpowers/specs/2026-10-11-studio-ledger-concept-design.md` (read the "Page structure (Showroom)" section, the Services and Case studies sections, the Behavioral contract, and the two latest addenda). Visual tokens: `.superdesign/design-system.md`. Approved draft: https://p.superdesign.dev/draft/ac56c1e0-54cb-4962-8a08-667d1cc3db20 (version 2); a local copy is `.superdesign/tmp/showroom.html` (git-ignored, may be absent).

## Global Constraints

- Copy is outcome-level only. No visible text, drawn screen, alt text or aria-label may name a framework, language, database, cloud, cluster, identity provider, automation tool, module code or school-form code. The list in `src/lib/forbidden.ts` (Task 2) is the enforcement; add to it, never remove from it.
- Clients are never named. The school is "a K-12 and college school"; the property manager is "a condominium property manager"; the LeaseTrack building is labelled "Condominium".
- Two services only: Website design and Bespoke system development. The clinic system is not shown.
- Seven case studies, exactly the copy in the spec's Case studies section. No invented metrics; the only numbers on the page outside drawn screens are those already in the approved copy and the three proof chips.
- Colours: page `#f6f4ef`, panels `#fff`, products band `#efece5`, ink `#171c22`, secondary `#565f68`, meta `#6b737b` (the design system's `#8a929a` fails 4.5:1 on white for 13px text, so it is darkened), red `#b51226` (hover `#9c0f20`), rules `#e3dfd6` (outside) and `#e8e5df` (inside panels), chrome `#f1efe9`. Shadows only on `.frame` (not `.frame-flat`) and `.phone`. No gradients, blur or glass. Status colours inside drawn screens may additionally use green `#3f7a2f` and amber `#9a6210` (both at least 4.5:1 on white); nowhere else.
- Type: Barlow Condensed 600 for h1, h2, h3, index numerals and fact values; Manrope Variable for everything else. Body copy 16px minimum; captions and meta 13px minimum.
- Every interactive element is at least 44px tall. Focus ring 3px red. `prefers-reduced-motion: reduce` renders the final state with no inline transform or opacity.
- The published contact address `ridgewell-management-services-inc@polsia.app` stays. Do not introduce any other address.
- The LeaseTrack live-demo link is not rendered until the demo is confirmed reachable (Task 11); until then no `href` on the page may contain `leasetrack`.
- Node 24, `npm ci` (never `npm install`), run `npm run check` before every commit from Task 9 onward. Commit messages are plain: no `Co-Authored-By` or session trailers.
- Work on branch `feat/showroom` off `main`. Do not push.

## Review Focus

Five conditions the spec implies but the task tests did not originally cover. Each has a pinning test added to the owning task.

1. **Text zoom 200% on a 320px viewport**: the drawn screens use fixed pixel type and clipped frames, so zooming must not create horizontal page scroll or push card copy under a frame. Pinned in Task 10 (`work.spec.ts`, "drawn screens stay clipped at 200% text").
2. **Keyboard-only visitor at a "Talk about this service" link**: pressing Enter must move the page to the form and the interest select must already show that service; pinned in Task 9 (`site.spec.ts`, service card test uses keyboard activation for the second card).
3. **A forbidden word reaching the page through a drawn screen** (screens are JSX, not content): pinned twice, Task 2 scans the screen source files, Task 10 scans the rendered page text.
4. **Reduced-motion visitor loads the page scrolled to a deep anchor** (`/#contact`): nothing may be stuck at opacity 0 because a reveal never triggered; pinned in Task 9 (`motion.spec.ts`, "deep link under reduced motion").
5. **Phone frame covering the "Expiring in 30 days" panel on desktop** (the draft's known defect): pinned in Task 10 (`work.spec.ts`, "hero phone does not overlap the expiring panel").

---

## File structure

Created:
- `src/components/Frames.tsx` — `BrowserFrame`, `PhoneFrame` (chrome, body, phone bezel). Presentation only.
- `src/components/Screen.tsx` — `Screen` component: maps a `ScreenKey` to a drawn screen, or renders a real image when one is supplied.
- `src/components/screens/*.tsx` — eleven drawn screens, one file each, no props, fictional data only.
- `src/components/screens.css` — styles for frames and drawn screens.
- `src/components/Hero.tsx`, `Work.tsx`, `Approach.tsx`, `About.tsx`, `Questions.tsx`, `Contact.tsx`, `Footer.tsx` — one section each.
- `src/lib/forbidden.ts` — the forbidden-word list and a `findForbidden(text)` helper, used by unit and browser tests.
- `src/content.test.ts` — content and screen-source guards.
- `tests/work.spec.ts` — Work section, hero composition and forbidden-word browser checks.

Modified:
- `src/content.ts` — rewritten: hero, proof, services (2), case studies (7), approach, about, questions, contact, interest options.
- `src/App.tsx` — composition only.
- `src/components/Header.tsx` — new nav and CTA.
- `src/components/Services.tsx` — two cards instead of a tablist.
- `src/components/InquiryForm.tsx` — unchanged API; only the heading copy.
- `src/components/inquiry.css` — tokens for the new panel.
- `src/hooks/useMotion.ts` — `useVectorMotion` removed; `useSectionMotion` also reveals `[data-reveal]` and `.hero-stage`.
- `src/styles.css` — rewritten tokens and section styles.
- `src/lib/inquiry.test.ts` — new interest options.
- `tests/site.spec.ts`, `tests/motion.spec.ts` — updated to the new page.
- `index.html`, `README.md`, `DESIGN.md`, `docs/preview-desktop.jpg`, `docs/preview-mobile.jpg`, `package.json` (test:unit script).

Deleted:
- `src/components/VectorArt.tsx`.

Browser tests are red from Task 2 until Task 9 restores them. Tasks 2 to 8 gate on `npm run test:unit && npm run build` plus the visual check listed in the task. Tasks 9 to 11 gate on `npm run check`.

---

### Task 1: Toolchain, frames and drawn screens

**Files:**
- Create: `src/components/Frames.tsx`
- Create: `src/components/Screen.tsx`
- Create: `src/components/screens/UnitsGrid.tsx`, `ParentPortal.tsx`, `GradesTable.tsx`, `AttendanceRegister.tsx`, `EnrollmentQueue.tsx`, `Approvals.tsx`, `Enlistment.tsx`, `ChequesWorklist.tsx`, `ReceiptLedger.tsx`, `WebsiteWireframe.tsx`, `RecordsTable.tsx`
- Create: `src/components/screens.css`

**Interfaces:**
- Produces: `BrowserFrame({ children, className?, flat?, aspect? })`, `PhoneFrame({ children, className? })`, `Screen({ kind: ScreenKey, alt: string, image?: ScreenImage })`, `type ScreenKey` (also re-exported from `src/content.ts` in Task 2), `type ScreenImage = { src: string; width: number; height: number }`.
- The `.units-expiring` class on the hero screen's panel is relied on by Task 10's overlap test.

- [ ] **Step 1: Install the toolchain and create the branch**

```bash
cd /home/jason/claude-code/ridgewell-spa
git checkout -b feat/showroom
npm ci
npx playwright install chromium
```

If `npx playwright install` is refused for disk reasons, use the Chromium already on this box instead for every Playwright run in this plan:

```bash
export PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=$HOME/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome
```

Expected: `node_modules/` exists, `npx playwright --version` prints 1.63.x.

- [ ] **Step 2: Write the frame primitives**

`src/components/Frames.tsx`:

```tsx
import type { ReactNode } from "react";

export function BrowserFrame({
  children,
  className = "",
  flat = false,
  aspect = false,
}: {
  children: ReactNode;
  className?: string;
  flat?: boolean;
  aspect?: boolean;
}) {
  const classes = ["frame", flat && "frame-flat", className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes}>
      <div className="frame-chrome" aria-hidden="true">
        <span />
        <span />
        <span />
        <i className="frame-address" />
      </div>
      <div className={aspect ? "frame-body frame-body-aspect" : "frame-body"}>
        {children}
      </div>
    </div>
  );
}

export function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={["phone", className].filter(Boolean).join(" ")}>
      <div className="phone-screen">{children}</div>
    </div>
  );
}
```

- [ ] **Step 3: Write the eleven drawn screens**

All text inside screens is fictional. Surnames are common Filipino surnames with initials only; no real vendor, building, school or person. Status words are plain English.

`src/components/screens/UnitsGrid.tsx`:

```tsx
const floors = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const stacks = ["A", "B", "C", "D"];
const units = floors.flatMap((floor) =>
  stacks.map((stack) => `${floor}${stack}`),
);
function status(index: number) {
  const r = index % 7;
  if (r === 0 || r === 5) return "occupied";
  if (r === 3) return "expiring";
  return "vacant";
}
const expiring = [
  ["A. Reyes · 12F", "Mar 04"],
  ["M. Santos · 08C", "Mar 11"],
  ["J. Dela Cruz · 15A", "Mar 18"],
  ["L. Tan · 03D", "Mar 26"],
];

export default function UnitsGrid() {
  return (
    <div className="scr scr-units">
      <aside className="scr-sidebar">
        <div className="scr-brand">
          <span className="scr-mark">LT</span>
          LeaseTrack
        </div>
        <nav>
          <span className="is-active">Dashboard</span>
          <span>Units</span>
          <span>Leases</span>
          <span>Cheques</span>
          <span>Tenants</span>
          <span>Documents</span>
        </nav>
      </aside>
      <div className="scr-main">
        <div className="scr-titlebar">
          <h3>Units, Condominium</h3>
          <div className="scr-legend">
            <span>
              <i className="is-occupied" />
              Occupied
            </span>
            <span>
              <i className="is-vacant" />
              Vacant
            </span>
            <span>
              <i className="is-expiring" />
              Expiring
            </span>
          </div>
        </div>
        <div className="scr-units-body">
          <div className="units-expiring">
            <p className="scr-caption">Expiring in 30 days</p>
            {expiring.map(([tenant, date]) => (
              <div key={tenant} className="scr-row">
                <span>{tenant}</span>
                <span className="is-red">{date}</span>
              </div>
            ))}
          </div>
          <div className="scr-unit-grid">
            {units.map((unit, index) => (
              <span key={unit} className={`scr-unit is-${status(index)}`}>
                {unit}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

`src/components/screens/ParentPortal.tsx`:

```tsx
const grades = [
  ["Mathematics", "92"],
  ["English", "88"],
  ["Science", "90"],
  ["Filipino", "94"],
];

export default function ParentPortal() {
  return (
    <div className="scr scr-phone">
      <p className="scr-caption">Parent portal</p>
      <h3>Good morning, Maria</h3>
      <div className="scr-panel">
        <p className="scr-caption">Report card</p>
        {grades.map(([subject, grade]) => (
          <div key={subject} className="scr-row">
            <span>{subject}</span>
            <strong>{grade}</strong>
          </div>
        ))}
      </div>
      <div className="scr-panel scr-row">
        <span className="is-muted">Attendance</span>
        <strong>Present 42 of 44 days</strong>
      </div>
    </div>
  );
}
```

`src/components/screens/GradesTable.tsx`:

```tsx
const rows = [
  ["Mathematics", "90", "92", "91", "93"],
  ["English", "88", "89", "90", "88"],
  ["Science", "91", "90", "92", "94"],
  ["Filipino", "93", "94", "93", "95"],
  ["Social Studies", "89", "91", "90", "92"],
  ["Values Education", "95", "95", "96", "96"],
];

export default function GradesTable() {
  return (
    <div className="scr scr-pad">
      <p className="scr-caption">Report card · Grade 7</p>
      <table className="scr-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th className="is-center">Q1</th>
            <th className="is-center">Q2</th>
            <th className="is-center">Q3</th>
            <th className="is-center">Q4</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([subject, ...marks]) => (
            <tr key={subject}>
              <td>{subject}</td>
              {marks.map((mark, i) => (
                <td key={i} className="is-center">
                  {mark}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <span className="scr-button">Download report card</span>
    </div>
  );
}
```

`src/components/screens/AttendanceRegister.tsx`:

```tsx
const rows = [
  ["Reyes, A.", "Present"],
  ["Santos, M.", "Present"],
  ["Tan, L.", "Absent"],
  ["Cruz, J.", "Present"],
  ["Garcia, P.", "Present"],
  ["Lim, R.", "Late"],
  ["Diaz, K.", "Present"],
  ["Yu, S.", "Present"],
];

export default function AttendanceRegister() {
  return (
    <div className="scr scr-pad">
      <p className="scr-caption">Attendance · Grade 7, Section A</p>
      <table className="scr-table">
        <tbody>
          {rows.map(([name, state]) => (
            <tr key={name}>
              <td>{name}</td>
              <td
                className={
                  state === "Present"
                    ? "is-green"
                    : state === "Absent"
                      ? "is-red"
                      : "is-amber"
                }
              >
                {state}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <span className="scr-button">Print school form</span>
    </div>
  );
}
```

`src/components/screens/EnrollmentQueue.tsx`:

```tsx
const rows = [
  ["#1042 · M. Garcia", "Registered"],
  ["#1043 · P. Lim", "Assessed"],
  ["#1044 · R. Diaz", "Admitted"],
  ["#1045 · K. Yu", "Registered"],
  ["#1046 · A. Ocampo", "Sectioned"],
  ["#1047 · J. Torres", "Assessed"],
  ["#1048 · L. Mendoza", "Registered"],
  ["#1049 · S. Bautista", "Admitted"],
];
const tone: Record<string, string> = {
  Registered: "is-muted",
  Assessed: "is-amber",
  Admitted: "is-green",
  Sectioned: "is-green",
};

export default function EnrollmentQueue() {
  return (
    <div className="scr scr-pad">
      <p className="scr-caption">Enrollment queue</p>
      <table className="scr-table">
        <tbody>
          {rows.map(([who, state]) => (
            <tr key={who}>
              <td>{who}</td>
              <td className={tone[state]}>{state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

`src/components/screens/Approvals.tsx`:

```tsx
const rows = [
  ["Leave · R. Cruz", "Pending"],
  ["Overtime · M. Yu", "Approved"],
  ["Leave · A. Lim", "Pending"],
  ["Travel · P. Santos", "Approved"],
  ["Leave · K. Reyes", "Approved"],
  ["Overtime · J. Tan", "Pending"],
  ["Travel · L. Garcia", "Approved"],
  ["Leave · S. Diaz", "Pending"],
];

export default function Approvals() {
  return (
    <div className="scr scr-pad scr-split">
      <div>
        <p className="scr-caption">Approvals</p>
        <table className="scr-table">
          <tbody>
            {rows.map(([what, state]) => (
              <tr key={what}>
                <td>{what}</td>
                <td className={state === "Approved" ? "is-green" : "is-amber"}>
                  {state}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="scr-panel scr-stat">
        <p className="scr-caption">Gate scan</p>
        <strong>318</strong>
        <p className="scr-caption">In campus</p>
      </div>
    </div>
  );
}
```

`src/components/screens/Enlistment.tsx`:

```tsx
const rows = [
  ["Data Structures", true],
  ["Web Systems", true],
  ["Ethics", true],
  ["Statistics", true],
  ["Discrete Mathematics", true],
  ["Physical Education", true],
  ["Philippine Literature", true],
  ["Technical Writing", false],
] as const;

export default function Enlistment() {
  return (
    <div className="scr scr-pad">
      <p className="scr-caption">Subject enlistment · 2nd year</p>
      <table className="scr-table">
        <tbody>
          {rows.map(([subject, ok]) => (
            <tr key={subject}>
              <td>{subject}</td>
              <td className={ok ? "is-green" : "is-muted"}>
                {ok ? "Prerequisite met" : "Not yet available"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

`src/components/screens/ChequesWorklist.tsx`:

```tsx
const rows = [
  ["00142", "A. Reyes", "₱45,000", "Mar 04", "Deposited"],
  ["00143", "M. Santos", "₱38,000", "Mar 11", "Due"],
  ["00144", "J. Dela Cruz", "₱52,000", "Mar 18", "Replaced"],
  ["00145", "L. Tan", "₱41,000", "Mar 26", "Due"],
  ["00146", "P. Garcia", "₱36,500", "Apr 02", "Due"],
  ["00147", "R. Lim", "₱47,000", "Apr 09", "Deposited"],
  ["00148", "K. Diaz", "₱39,000", "Apr 16", "Due"],
];
const tone: Record<string, string> = {
  Deposited: "is-green",
  Due: "is-amber",
  Replaced: "is-red",
};

export default function ChequesWorklist() {
  return (
    <div className="scr scr-pad">
      <p className="scr-caption">Cheques worklist</p>
      <table className="scr-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Tenant</th>
            <th>Amount</th>
            <th>Due</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([no, tenant, amount, due, state]) => (
            <tr key={no}>
              <td>{no}</td>
              <td>{tenant}</td>
              <td>{amount}</td>
              <td>{due}</td>
              <td className={tone[state]}>{state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

`src/components/screens/ReceiptLedger.tsx`:

```tsx
const fields = [
  ["Vendor", "Sunrise Office Supply"],
  ["Date", "Feb 18, 2026"],
  ["Category", "Office supplies"],
  ["Amount", "₱1,248.00"],
];

export default function ReceiptLedger() {
  return (
    <div className="scr scr-pad scr-split">
      <div className="scr-receipt" aria-hidden="true">
        <i style={{ width: "75%" }} />
        <i />
        <i style={{ width: "50%" }} />
        <i style={{ width: "66%" }} />
        <i className="is-gap" />
        <i style={{ width: "33%" }} />
      </div>
      <div>
        {fields.map(([label, value]) => (
          <div key={label} className="scr-row">
            <span className="is-muted">{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
        <span className="scr-button">Export to Excel</span>
      </div>
    </div>
  );
}
```

`src/components/screens/WebsiteWireframe.tsx`:

```tsx
export default function WebsiteWireframe() {
  return (
    <div className="scr scr-pad scr-wire">
      <i className="wire-hero" />
      <div className="wire-columns">
        <i />
        <i />
        <i />
      </div>
      <i className="wire-footer" />
    </div>
  );
}
```

`src/components/screens/RecordsTable.tsx`:

```tsx
const rows = [
  ["Reyes, Ana", "Active", "Feb 18"],
  ["Santos, Mark", "Review", "Feb 20"],
  ["Dela Cruz, J.", "Active", "Feb 22"],
  ["Tan, Liza", "Pending", "Feb 25"],
  ["Lim, Paolo", "Active", "Feb 28"],
  ["Garcia, Rina", "Review", "Mar 02"],
];
const tone: Record<string, string> = {
  Active: "is-green",
  Review: "is-amber",
  Pending: "is-muted",
};

export default function RecordsTable() {
  return (
    <div className="scr">
      <table className="scr-table scr-table-flush">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Date</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, state, date]) => (
            <tr key={name}>
              <td>{name}</td>
              <td className={tone[state]}>{state}</td>
              <td className="is-muted">{date}</td>
              <td className="is-right">
                <span className="scr-button scr-button-small">Approve</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 4: Write the Screen registry**

`src/components/Screen.tsx`:

```tsx
import type { ReactElement } from "react";
import UnitsGrid from "./screens/UnitsGrid";
import ParentPortal from "./screens/ParentPortal";
import GradesTable from "./screens/GradesTable";
import AttendanceRegister from "./screens/AttendanceRegister";
import EnrollmentQueue from "./screens/EnrollmentQueue";
import Approvals from "./screens/Approvals";
import Enlistment from "./screens/Enlistment";
import ChequesWorklist from "./screens/ChequesWorklist";
import ReceiptLedger from "./screens/ReceiptLedger";
import WebsiteWireframe from "./screens/WebsiteWireframe";
import RecordsTable from "./screens/RecordsTable";

export type ScreenKey =
  | "units-grid"
  | "parent-portal"
  | "grades-table"
  | "attendance-register"
  | "enrollment-queue"
  | "approvals"
  | "enlistment"
  | "cheques-worklist"
  | "receipt-ledger"
  | "website-wireframe"
  | "records-table";

export interface ScreenImage {
  src: string;
  width: number;
  height: number;
}

const drawn: Record<ScreenKey, () => ReactElement> = {
  "units-grid": UnitsGrid,
  "parent-portal": ParentPortal,
  "grades-table": GradesTable,
  "attendance-register": AttendanceRegister,
  "enrollment-queue": EnrollmentQueue,
  approvals: Approvals,
  enlistment: Enlistment,
  "cheques-worklist": ChequesWorklist,
  "receipt-ledger": ReceiptLedger,
  "website-wireframe": WebsiteWireframe,
  "records-table": RecordsTable,
};

/**
 * One product screen. Drawn in HTML/CSS by default; when a real cropped
 * screenshot exists, pass `image` and the drawing is replaced by an <img>
 * with the same accessible name.
 */
export default function Screen({
  kind,
  alt,
  image,
}: {
  kind: ScreenKey;
  alt: string;
  image?: ScreenImage;
}) {
  if (image) {
    return (
      <img
        className="screen screen-image"
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    );
  }
  const Drawn = drawn[kind];
  return (
    <div className="screen" role="img" aria-label={alt}>
      <div className="screen-inner" aria-hidden="true">
        <Drawn />
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Write the frame and screen styles**

`src/components/screens.css`:

```css
@layer components {
  /* Frames */
  .frame {
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 24px 60px -24px rgba(23, 28, 34, 0.18);
  }
  .frame-flat {
    box-shadow: none;
  }
  .frame-chrome {
    height: 36px;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 14px;
    background: var(--chrome);
    border-bottom: 1px solid var(--line);
  }
  .frame-chrome span {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: #d5d0c6;
  }
  .frame-address {
    flex: 1;
    height: 22px;
    margin-left: 10px;
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: 5px;
  }
  .frame-body {
    position: relative;
  }
  .frame-body-aspect {
    aspect-ratio: 16 / 10;
    overflow: hidden;
  }
  .frame-body-aspect .screen {
    position: absolute;
    inset: 0;
  }
  .phone {
    width: 200px;
    height: 420px;
    padding: 8px;
    background: var(--ink);
    border-radius: 32px;
    box-shadow: 0 24px 60px -24px rgba(23, 28, 34, 0.4);
  }
  .phone-screen {
    height: 100%;
    background: var(--white);
    border-radius: 26px;
    overflow: hidden;
  }

  /* Screen slot */
  .screen {
    display: block;
    width: 100%;
    color: var(--ink);
    font-family: var(--body);
    font-size: 12px;
    line-height: 1.4;
    text-align: left;
  }
  .screen-inner {
    height: 100%;
  }
  .screen-image {
    height: auto;
  }

  /* Drawn screens: shared vocabulary */
  .scr {
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
  .scr-pad {
    padding: 14px 16px;
    gap: 10px;
  }
  .scr-split {
    flex-direction: row;
    gap: 14px;
    align-items: flex-start;
  }
  .scr-split > div:first-child {
    flex: 1;
    min-width: 0;
  }
  .scr h3 {
    font-family: var(--display);
    font-weight: 600;
    font-size: 24px;
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .scr-caption {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--meta);
    margin: 0 0 4px;
  }
  .scr-row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 6px 0;
    border-bottom: 1px solid var(--line-inner);
  }
  .scr-row:last-child {
    border-bottom: 0;
  }
  .scr-panel {
    border: 1px solid var(--line-inner);
    border-radius: 8px;
    padding: 10px 12px;
  }
  .scr-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }
  .scr-table th {
    text-align: left;
    font-weight: 600;
    color: var(--meta);
    padding: 6px 0;
    border-bottom: 1px solid var(--line-inner);
  }
  .scr-table td {
    padding: 7px 0;
    border-bottom: 1px solid var(--line-inner);
    white-space: nowrap;
  }
  .scr-table-flush th,
  .scr-table-flush td {
    padding-inline: 14px;
  }
  .scr-button {
    display: inline-block;
    align-self: flex-start;
    background: var(--red);
    color: var(--white);
    font-size: 11px;
    font-weight: 600;
    padding: 7px 12px;
    border-radius: 4px;
  }
  .scr-button-small {
    padding: 4px 10px;
  }
  .is-center {
    text-align: center;
  }
  .is-right {
    text-align: right;
  }
  .is-muted {
    color: var(--meta);
  }
  .is-red {
    color: var(--red);
  }
  .is-green {
    color: #3f7a2f;
  }
  .is-amber {
    color: #9a6210;
  }
  /* In 16:10 frames rows are taller so eight rows fill the frame at 1440 wide */
  .frame-body-aspect .scr-table td {
    padding: 9px 0;
  }

  /* Units grid (hero) */
  .scr-units {
    flex-direction: row;
    min-height: 420px;
  }
  .scr-sidebar {
    width: 176px;
    flex: 0 0 auto;
    padding: 16px;
    border-right: 1px solid var(--line-inner);
  }
  .scr-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 13px;
    margin-bottom: 18px;
  }
  .scr-mark {
    width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
    background: var(--red);
    color: var(--white);
    font-size: 10px;
    font-weight: 700;
    border-radius: 5px;
  }
  .scr-sidebar nav {
    display: grid;
    gap: 2px;
    font-size: 13px;
    color: var(--muted);
  }
  .scr-sidebar nav span {
    padding: 6px 8px;
    border-radius: 5px;
  }
  .scr-sidebar nav .is-active {
    background: var(--chrome);
    color: var(--ink);
    font-weight: 600;
  }
  .scr-main {
    flex: 1;
    min-width: 0;
    padding: 20px;
  }
  .scr-titlebar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }
  .scr-legend {
    display: flex;
    gap: 12px;
    font-size: 11px;
    color: var(--muted);
  }
  .scr-legend span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .scr-legend i,
  .scr-unit {
    border-radius: 3px;
  }
  .scr-legend i {
    width: 10px;
    height: 10px;
  }
  .is-occupied {
    background: var(--ink);
    color: var(--white);
  }
  .is-vacant {
    background: var(--page);
    border: 1px solid var(--line-inner);
    color: var(--muted);
  }
  .is-expiring {
    border: 1px solid var(--red);
    color: var(--red);
  }
  .scr-units-body {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }
  .units-expiring {
    width: 224px;
    flex: 0 0 auto;
    border: 1px solid var(--line-inner);
    border-radius: 8px;
    padding: 14px 16px;
    font-size: 13px;
  }
  .scr-unit-grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 6px;
  }
  .scr-unit {
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    font-size: 8px;
  }

  /* Phone */
  .scr-phone {
    padding: 22px 16px 16px;
    gap: 12px;
  }
  .scr-phone h3 {
    font-size: 22px;
  }
  .scr-phone .scr-row strong {
    font-weight: 600;
  }

  /* Stat panel (approvals) */
  .scr-stat {
    width: 96px;
    flex: 0 0 auto;
    text-align: center;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .scr-stat strong {
    font-family: var(--display);
    font-weight: 600;
    font-size: 30px;
    line-height: 1;
    display: block;
    margin: 4px 0;
  }

  /* Receipt thumbnail */
  .scr-receipt {
    width: 96px;
    flex: 0 0 auto;
    border: 1px solid var(--line-inner);
    border-radius: 6px;
    padding: 10px;
    display: grid;
    gap: 6px;
  }
  .scr-receipt i {
    display: block;
    height: 6px;
    background: var(--line-inner);
    border-radius: 3px;
  }
  .scr-receipt .is-gap {
    height: 18px;
    background: none;
  }

  /* Website wireframe */
  .scr-wire {
    gap: 12px;
  }
  .scr-wire i {
    display: block;
    background: var(--chrome);
    border-radius: 4px;
  }
  .wire-hero {
    height: 56px;
  }
  .wire-columns {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .wire-columns i {
    height: 64px;
  }
  .wire-footer {
    height: 20px;
    background: var(--line-inner) !important;
  }

  @media (max-width: 1023px) {
    .units-expiring {
      display: none;
    }
  }
  @media (max-width: 639px) {
    .scr-sidebar {
      display: none;
    }
    .scr-units {
      min-height: 0;
    }
  }
}
```

- [ ] **Step 6: Import the stylesheet and type-check**

In `src/styles.css`, directly under the existing `@import "./components/inquiry.css";` line, add:

```css
@import "./components/screens.css";
```

Run: `npx tsc -b`
Expected: no output (exit 0). The new files compile even though nothing renders them yet. The CSS variables `--line-inner`, `--chrome`, `--page`, `--meta` do not exist until Task 3; that is fine for the compiler and for this commit.

- [ ] **Step 7: Commit**

```bash
git add src/components/Frames.tsx src/components/Screen.tsx src/components/screens src/components/screens.css src/styles.css
git commit -m "Add browser and phone frames and eleven drawn product screens"
```

---

### Task 2: Content model and forbidden-word guards

**Files:**
- Modify: `src/content.ts` (rewrite)
- Create: `src/lib/forbidden.ts`
- Create: `src/content.test.ts`
- Modify: `src/lib/inquiry.test.ts`
- Modify: `package.json` (`test:unit`)
- Modify: `src/App.tsx` (temporary skeleton so the build stays green)
- Modify: `src/hooks/useMotion.ts` (remove `useVectorMotion`)
- Delete: `src/components/VectorArt.tsx`, `src/components/Services.tsx` (rewritten in Task 5)

**Interfaces:**
- Produces, from `src/content.ts`: `companyEmail`, `serviceOptions` (`["Website", "Bespoke system", "Not sure yet"]`), `type ServiceOption`, `hero`, `proof`, `services` (2), `type CaseStudy`, `caseStudies` (7), `clientWork`, `productWork`, `approach`, `about`, `questions`, `contact`, re-export `type ScreenKey`.
- Produces, from `src/lib/forbidden.ts`: `forbiddenWords: readonly string[]`, `findForbidden(text: string): string[]`.

- [ ] **Step 1: Write the forbidden-word helper**

`src/lib/forbidden.ts`:

```ts
/**
 * Words that must never appear on the page: technology and infrastructure
 * names (a build recipe for competitors), client identities, building names,
 * and school-form codes. Matched case-insensitively on word boundaries.
 * Add to this list; never remove from it.
 */
export const forbiddenWords: readonly string[] = [
  // technology
  "React",
  "Vite",
  "TypeScript",
  "JavaScript",
  "Tailwind",
  "Quarkus",
  "Java",
  "Kotlin",
  "Spring",
  "Express",
  "Postgres",
  "PostgreSQL",
  "Supabase",
  "MinIO",
  "Keycloak",
  "OIDC",
  "Kubernetes",
  "k8s",
  "minikube",
  "Docker",
  "Cloudflare",
  "n8n",
  "Flyway",
  "GitHub",
  "Playwright",
  // clients, places, buildings
  "CSPB",
  "Colegio",
  "Pascual",
  "Baylon",
  "MyCSPB",
  "Condocenter",
  "Rada",
  "Regency",
  "Legaspi",
  "Makati",
  "Limchoc",
  "APEX",
  "LLI",
  // form and module codes
  "SF1",
  "SF2",
  "SF9",
  "SF10",
  "DepEd",
];

const pattern = new RegExp(
  `\\b(${forbiddenWords.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
  "gi",
);

/** Returns the distinct forbidden words found in `text`, in order of appearance. */
export function findForbidden(text: string): string[] {
  const found: string[] = [];
  for (const match of text.matchAll(pattern)) {
    const word = match[1];
    if (!found.some((f) => f.toLowerCase() === word.toLowerCase()))
      found.push(word);
  }
  return found;
}
```

- [ ] **Step 2: Write the failing content test**

`src/content.test.ts`:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { findForbidden } from "./lib/forbidden.ts";
import {
  about,
  approach,
  caseStudies,
  companyEmail,
  contact,
  hero,
  proof,
  questions,
  serviceOptions,
  services,
} from "./content.ts";

const everything = JSON.stringify({
  hero,
  proof,
  services,
  caseStudies,
  approach,
  about,
  questions,
  contact,
});

test("page copy names no technology, client, building or form code", () => {
  assert.deepEqual(findForbidden(everything), []);
});

test("drawn screens name no technology, client, building or form code", () => {
  const dir = fileURLToPath(new URL("./components/screens/", import.meta.url));
  for (const file of readdirSync(dir)) {
    const source = readFileSync(new URL(file, `file://${dir}`), "utf8");
    assert.deepEqual(findForbidden(source), [], file);
  }
});

test("there are two services and seven case studies with unique anchors", () => {
  assert.equal(services.length, 2);
  assert.equal(caseStudies.length, 7);
  const ids = caseStudies.map((c) => c.id);
  assert.equal(new Set(ids).size, 7);
  assert.deepEqual(
    caseStudies.map((c) => c.index),
    ["01", "02", "03", "04", "05", "06", "07"],
  );
  assert.equal(caseStudies.filter((c) => c.group === "client").length, 5);
  assert.equal(caseStudies.filter((c) => c.group === "product").length, 2);
});

test("every service preselects a real interest option", () => {
  for (const service of services)
    assert.ok(serviceOptions.includes(service.interest), service.id);
  assert.deepEqual([...serviceOptions], ["Website", "Bespoke system", "Not sure yet"]);
});

test("the LeaseTrack live-demo link stays off until verified", () => {
  const leasetrack = caseStudies.find((c) => c.id === "leasetrack");
  assert.ok(leasetrack);
  assert.equal(leasetrack.link, undefined);
});

test("the published contact address is unchanged", () => {
  assert.equal(companyEmail, "ridgewell-management-services-inc@polsia.app");
  assert.equal(hero.lead.length <= 220, true);
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `node --experimental-strip-types --test src/content.test.ts`
Expected: FAIL. The import of `hero`, `proof`, `caseStudies` and friends from `./content.ts` throws because those exports do not exist yet.

- [ ] **Step 4: Rewrite the content module**

`src/content.ts` (replace the whole file):

```ts
import type { ScreenKey } from "./components/Screen";
export type { ScreenKey } from "./components/Screen";

export const companyEmail = "ridgewell-management-services-inc@polsia.app";

export const serviceOptions = ["Website", "Bespoke system", "Not sure yet"] as const;
export type ServiceOption = (typeof serviceOptions)[number];

export const hero = {
  label: "Business, in working order.",
  heading: "Websites and bespoke systems, built to be used every day.",
  lead: "Ridgewell designs websites and builds internal systems for Philippine schools, property managers and small businesses. We started in accounting, so the books and the workflow come first.",
  primary: { label: "Start a project", href: "#contact" },
  secondary: { label: "See our work", href: "#work" },
  screen: "units-grid" as ScreenKey,
  screenAlt:
    "Lease management screen: a grid of condominium units coloured by status, with a list of leases expiring in the next 30 days.",
  phone: "parent-portal" as ScreenKey,
  phoneAlt:
    "Parent portal on a phone: a report card summary with four subjects and an attendance line.",
};

export const proof = {
  line: "Systems in daily use at a school, a property manager, and our own office.",
  chips: [
    "7 systems in daily use",
    "2 products of our own",
    "Started in accounting, 2004",
  ],
};

export interface Service {
  id: string;
  label: string;
  heading: string;
  description: string;
  items: string[];
  interest: ServiceOption;
  screen: ScreenKey;
  screenAlt: string;
}

export const services: Service[] = [
  {
    id: "website",
    label: "Website design",
    heading: "A fast, accessible website.",
    description:
      "A fast, accessible website that explains what you do and gets people to contact you. Design, copy structure, build, hosting and upkeep, with your own domain and email.",
    items: [
      "Brand-faithful design and copy structure",
      "Accessible, mobile-first build",
      "Hosting, domain, analytics and upkeep",
    ],
    interest: "Website",
    screen: "website-wireframe",
    screenAlt: "Wireframe of a small business website: a hero block, three columns and a footer line.",
  },
  {
    id: "systems",
    label: "Bespoke system development",
    heading: "Systems built around your work.",
    description:
      "Internal systems built around how your organisation already works: enrollment, records, portals, approvals, reporting, mobile companions. Scoped small, shipped in weeks, supported after launch.",
    items: [
      "Portals and records systems for staff and the people they serve",
      "Forms, approvals, reporting and integrations",
      "Web and mobile, with ongoing support",
    ],
    interest: "Bespoke system",
    screen: "records-table",
    screenAlt: "A records table with names, status labels, dates and an Approve button on each row.",
  },
];

export interface CaseStudy {
  id: string;
  index: string;
  group: "client" | "product";
  title: string;
  tagline?: string;
  summary: string;
  changed: string;
  audience: string;
  status: string;
  screen: ScreenKey;
  screenAlt: string;
  /** Rendered as a text link when present. LeaseTrack's demo link is added only once the demo is confirmed reachable. */
  link?: { label: string; href: string };
}

export const clientWork = {
  label: "Work",
  heading: "Built for a client",
  intro: "Five systems for a K-12 and college school, in use since 2026.",
};

export const productWork = {
  label: "Our products",
  heading: "Two products we run ourselves.",
};

export const caseStudies: CaseStudy[] = [
  {
    id: "portal",
    index: "01",
    group: "client",
    title: "Parent and student portal",
    summary:
      "Parents and students see grades, attendance and report cards in one place, on the web and on their phones. One sign-in for the whole family.",
    changed: "report cards and attendance without a trip to the registrar",
    audience: "parents and students of a K-12 and college school",
    status: "In use since 2026",
    screen: "grades-table",
    screenAlt: "Report card screen: six subjects with marks for four quarters and a Download report card button.",
  },
  {
    id: "staff",
    index: "02",
    group: "client",
    title: "Teacher and staff portal",
    summary:
      "Teachers record attendance and grades once, and the official school forms come out ready to print. Staff keep medical and guidance records in the same place.",
    changed: "school forms produced from daily records, not re-encoded",
    audience: "teachers and school staff",
    status: "In use since 2026",
    screen: "attendance-register",
    screenAlt: "Attendance register for one section: a list of students marked present, absent or late, and a Print school form button.",
  },
  {
    id: "registrar",
    index: "03",
    group: "client",
    title: "Enrollment and registrar system",
    summary:
      "Families enroll online; the registrar assesses, admits and sections from a single queue. Finance sees the same record, so nobody chases paper between offices.",
    changed: "one enrollment record from application to admission",
    audience: "the registrar and finance offices, enrolling families",
    status: "In use since 2026",
    screen: "enrollment-queue",
    screenAlt: "Enrollment queue: numbered applications with the status Registered, Assessed, Admitted or Sectioned.",
  },
  {
    id: "hr",
    index: "04",
    group: "client",
    title: "HR and campus gate",
    summary:
      "Employee records, requests and approvals in one system, with gate scans at the campus entrance that mark who is in.",
    changed: "approvals and attendance without paper forms",
    audience: "HR and every employee",
    status: "In use since 2026",
    screen: "approvals",
    screenAlt: "Approvals list of leave, overtime and travel requests beside a gate-scan panel showing how many people are on campus.",
  },
  {
    id: "college",
    index: "05",
    group: "client",
    title: "College registrar",
    summary:
      "Enrollment for the college department that follows each programme's curriculum, so students only enlist in subjects they can take.",
    changed: "curriculum checks at enrollment instead of after",
    audience: "the college registrar and its students",
    status: "In use since 2026",
    screen: "enlistment",
    screenAlt: "Subject enlistment: a list of subjects with a prerequisite check beside each one.",
  },
  {
    id: "leasetrack",
    index: "06",
    group: "product",
    title: "LeaseTrack",
    tagline: "Tenant and lease management",
    summary:
      "Leases expiring in 30, 60 and 90 days, this week's post-dated cheques, and every contract a click away. Built for a condominium property manager with about 200 units; every change is logged.",
    changed: "renewals and post-dated cheques tracked in one place",
    audience: "property managers and their admin teams",
    status: "Live demo available on request",
    screen: "cheques-worklist",
    screenAlt: "Cheques worklist: post-dated cheques with tenant, amount, due date and the status Deposited, Due or Replaced.",
  },
  {
    id: "ledger",
    index: "07",
    group: "product",
    title: "Ridgewell Ledger",
    tagline: "Receipts to books",
    summary:
      "Photograph a receipt or service invoice and it becomes a line in a bookkeeper-ready ledger, categorised by vendor and exportable to Excel. Used for Ridgewell's own books first.",
    changed: "receipts become ledger entries without manual encoding",
    audience: "small business owners and their bookkeepers",
    status: "In use at Ridgewell",
    screen: "receipt-ledger",
    screenAlt: "A receipt thumbnail beside the ledger line read from it: vendor, date, category and amount, with an Export to Excel button.",
    link: { label: "How it works", href: "#contact" },
  },
];

export const approach = {
  label: "How we work",
  heading: "Scoped small, shipped in weeks.",
  steps: [
    {
      title: "Start with the problem.",
      text: "Share what your business does and what feels repetitive, unclear, or harder than it should be. We look at the work and the numbers behind it, then agree on the smallest useful improvement.",
    },
    {
      title: "Scope it small.",
      text: "We begin with a focused review or a defined project, not a sprawling brief. A website, an intake form, a tracker, or a small portal, scoped to ship in weeks rather than months.",
    },
    {
      title: "Ship, then support.",
      text: "We put the tool in daily use and stay with it: refinement, adoption, documentation upkeep, and periodic operational or accounting support as your needs change.",
    },
  ],
};

export const about = {
  label: "About",
  heading: "An accounting point of view.",
  paragraphs: [
    "Ridgewell started in accounting in 2004, so we look at a business the way its books do: where the work repeats, where a handoff breaks, and where the same information gets entered twice. That perspective shapes every website and system we build.",
    "Today we design websites and build bespoke internal systems for Philippine schools, property managers and small businesses. One team takes a project from the ledger to the software, so nothing gets lost between the people who understand the numbers and the people who write the code.",
  ],
  facts: [
    { label: "Practice since", value: "2004" },
    { label: "Clients", value: "Philippine schools, property managers and SMEs" },
    { label: "Team", value: "One team from ledger to software" },
  ],
};

export const questions = [
  {
    question: "Do we need to know exactly what support we need?",
    answer:
      "No. Start with what feels repetitive, unclear, or harder than it should be. Share what your business does and what you would like to improve. Existing reports or process notes can help, but you do not need a finished brief.",
  },
  {
    question: "Can we start with one specific problem?",
    answer:
      "Yes. Ridgewell can begin with a focused review, a defined project, or ongoing support. The starting point depends on your situation and the smallest useful improvement your team can make.",
  },
  {
    question: "Can Ridgewell build software for our business?",
    answer:
      "Yes, when a focused internal tool or integration fits the operational need. Examples include an intake form, tracking workflow, lightweight dashboard, or small portal. The focus is a practical tool around your existing operations.",
  },
  {
    question: "Is support available after the initial project?",
    answer:
      "Support can continue through workflow refinement, tool adoption, documentation upkeep, and periodic operational or accounting support. Discuss the scope and cadence with Ridgewell as your needs change.",
  },
];

export const contact = {
  label: "Contact",
  heading: "Tell us about the project.",
  include: [
    "What your business does",
    "What feels repetitive or harder than it should be",
    "Any reports or process notes you already have",
  ],
  hours: "Mon to Fri, 9am to 6pm Manila",
};
```

- [ ] **Step 5: Update the inquiry unit test and the unit script**

In `src/lib/inquiry.test.ts`, change the `valid` fixture's interest:

```ts
  interest: "Website",
```

Search the file for any other literal `"Accounting support"` or `"Customized software development"` and replace with `"Website"` or `"Bespoke system"` respectively. The assertion `validateInquiry({ ...valid, interest: "Invented service" }).interest` stays.

In `package.json`, replace the `test:unit` script:

```json
"test:unit": "node --experimental-strip-types --test src/lib/inquiry.test.ts src/content.test.ts",
```

- [ ] **Step 6: Keep the build green: skeleton App, trimmed motion hook, delete old components**

Delete `src/components/VectorArt.tsx` and `src/components/Services.tsx`:

```bash
git rm src/components/VectorArt.tsx src/components/Services.tsx
```

Replace `src/hooks/useMotion.ts` with the section hook only (Task 9 extends it):

```ts
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useSectionMotion() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        ref.current?.querySelectorAll("h1, h2").forEach((heading) => {
          gsap.from(heading, {
            y: 12,
            duration: 0.55,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: heading,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          });
        });
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return ref;
}
```

Replace `src/App.tsx` with a skeleton that compiles against the new content (sections arrive in Tasks 4 to 8):

```tsx
import { useState } from "react";
import { useSectionMotion } from "./hooks/useMotion";
import Header from "./components/Header";
import InquiryForm from "./components/InquiryForm";
import { hero } from "./content";

export default function App() {
  const motion = useSectionMotion();
  const [interest, setInterest] = useState<string>("Not sure yet");
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" ref={motion}>
        <section id="home" className="hero">
          <div className="wrap hero-copy">
            <p className="section-label">{hero.label}</p>
            <h1>{hero.heading}</h1>
          </div>
        </section>
        <section id="contact" className="contact-section section-space">
          <div className="wrap">
            <InquiryForm interest={interest} onInterest={setInterest} />
          </div>
        </section>
      </main>
    </>
  );
}
```

- [ ] **Step 7: Run unit tests and the build**

Run: `npm run test:unit && npm run build`
Expected: all unit tests PASS (inquiry tests and the six content tests), `tsc -b` clean, Vite build succeeds. Browser tests are expected to be red from here until Task 9; do not run `npm test` yet.

- [ ] **Step 8: Commit**

```bash
git add -A src package.json
git commit -m "Rewrite content for the Showroom page and guard it against forbidden words"
```

---

### Task 3: Tokens, base styles, header and document metadata

**Files:**
- Modify: `src/styles.css` (rewrite; keep both `@import` lines)
- Modify: `src/components/inquiry.css` (border and radius tokens)
- Modify: `src/components/Header.tsx`
- Modify: `index.html`

**Interfaces:**
- Produces the CSS vocabulary every later task uses: `.wrap`, `.section-space`, `.section-label`, `.section-intro`, `.button`, `.button-outline`, `.text-link`, `.card`, `.index`, `.red-list`, `.meta`, `[data-reveal]` (no initial style), tokens listed in Global Constraints.
- Header nav: `Services #services`, `Work #work`, `Approach #approach`, `Contact #contact`; CTA "Start a project" → `#contact`; mobile nav adds `Common questions #questions` and `Start a project #contact`.

- [ ] **Step 1: Rewrite `src/styles.css`**

```css
@layer reset, base, components, responsive;
@import "./components/inquiry.css";
@import "./components/screens.css";

@layer reset {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body,
  h1,
  h2,
  h3,
  p,
  figure,
  dl,
  dd {
    margin: 0;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  button,
  input,
  textarea,
  select {
    font: inherit;
  }
  button,
  a,
  summary {
    -webkit-tap-highlight-color: transparent;
  }
  button {
    color: inherit;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  img,
  svg {
    display: block;
    max-width: 100%;
  }
  button,
  summary,
  select {
    cursor: pointer;
  }
  [hidden] {
    display: none !important;
  }
}

@layer base {
  :root {
    --page: #f6f4ef;
    --white: #fff;
    --band: #efece5;
    --chrome: #f1efe9;
    --ink: #171c22;
    --muted: #565f68;
    --meta: #6b737b;
    --red: #b51226;
    --red-hover: #9c0f20;
    --line: #e3dfd6;
    --line-inner: #e8e5df;
    --control-border: #7c858d;
    --button-border: #cfd4d9;
    --focus: #b51226;
    --display: "Barlow Condensed", "Arial Narrow", sans-serif;
    --body: "Manrope Variable", sans-serif;
    --radius: 6px;
    --radius-card: 10px;
    --motion: 160ms;
    --gutter: clamp(1.5rem, 4vw, 3rem);
    --scroll-thumb: #a39d92;
    --scroll-track: var(--page);
    color-scheme: light;
    font-family: var(--body);
    color: var(--ink);
    background: var(--page);
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 5rem;
    scrollbar-gutter: stable;
  }
  * {
    scrollbar-width: auto;
    scrollbar-color: var(--scroll-thumb) var(--scroll-track);
  }
  body {
    min-width: 320px;
    font-size: 1.0625rem;
    line-height: 1.55;
    overflow-wrap: anywhere;
    background: var(--page);
  }
  ::selection {
    background: var(--red);
    color: white;
  }
  :focus-visible {
    outline: 3px solid var(--focus);
    outline-offset: 4px;
  }
  h1,
  h2,
  h3,
  .index,
  .fact-value {
    font-family: var(--display);
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  h1 {
    font-size: clamp(3rem, 6.4vw, 5.5rem);
    line-height: 0.95;
  }
  h2 {
    font-size: clamp(2.25rem, 4.3vw, 3.75rem);
    line-height: 0.98;
  }
  h3 {
    font-size: clamp(1.625rem, 2.2vw, 2rem);
    line-height: 1.05;
  }
  p {
    text-wrap: pretty;
  }
  .wrap {
    width: min(100% - var(--gutter) * 2, 1200px);
    margin-inline: auto;
  }
  .section-space {
    padding-block: clamp(4.5rem, 7.8vw, 7rem);
  }
  .section-label {
    position: relative;
    display: inline-block;
    padding-left: 16px;
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
  .section-label::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 6px;
    height: 6px;
    transform: translateY(-50%);
    background: var(--red);
  }
  .section-intro {
    color: var(--muted);
    font-size: 1.0625rem;
    margin-top: 0.75rem;
    max-width: 60ch;
  }
  .lead {
    color: var(--muted);
    font-size: clamp(1.0625rem, 1.3vw, 1.125rem);
    line-height: 1.5;
  }
  .meta {
    color: var(--meta);
    font-size: 0.8125rem;
  }
  .index {
    display: block;
    color: var(--red);
    font-size: 1.5rem;
    line-height: 1;
  }
  .red-list {
    display: grid;
    gap: 0.6rem;
    font-size: 0.9375rem;
  }
  .red-list li {
    position: relative;
    padding-left: 16px;
  }
  .red-list li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.6em;
    width: 6px;
    height: 6px;
    background: var(--red);
  }
  .skip-link {
    position: fixed;
    z-index: 100;
    top: -80px;
    left: 1rem;
    background: var(--red);
    color: white;
    padding: 0.8rem 1.2rem;
    border-radius: var(--radius);
  }
  .skip-link:focus {
    top: 1rem;
  }
  .button {
    min-height: 48px;
    padding: 0.8rem 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    max-width: 100%;
    border: 1px solid var(--red);
    border-radius: var(--radius);
    background: var(--red);
    color: var(--white);
    font-size: 0.9375rem;
    font-weight: 600;
    transition:
      background var(--motion),
      border-color var(--motion),
      transform var(--motion);
    cursor: pointer;
  }
  .button:hover {
    background: var(--red-hover);
    border-color: var(--red-hover);
  }
  .button:active {
    transform: translateY(1px);
  }
  .button-small {
    min-height: 44px;
    padding: 0.6rem 1.25rem;
  }
  .button-outline {
    background: var(--white);
    color: var(--ink);
    border-color: var(--button-border);
  }
  .button-outline:hover {
    background: var(--white);
    color: var(--ink);
    border-color: var(--ink);
  }
  .text-link {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    min-height: 44px;
    max-width: 100%;
    font-weight: 600;
    font-size: 0.9375rem;
    color: var(--ink);
  }
  .text-link:hover {
    color: var(--red);
    text-decoration: underline;
    text-underline-offset: 5px;
  }
  .text-link svg {
    flex: 0 0 auto;
  }
  .card {
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: var(--radius-card);
    padding: clamp(1.5rem, 2.6vw, 2rem);
  }
}

@layer components {
  /* Header */
  .site-header {
    position: sticky;
    top: 0;
    z-index: 20;
    background: var(--white);
    border-bottom: 1px solid var(--line);
  }
  .header-inner {
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
  }
  .brand {
    display: flex;
    align-items: center;
    width: 180px;
    min-height: 44px;
    flex: 0 1 auto;
  }
  .brand img {
    height: auto;
    width: 100%;
  }
  .desktop-nav {
    display: none;
    gap: 2rem;
  }
  .desktop-nav a {
    min-height: 44px;
    display: flex;
    align-items: center;
    font-size: 0.9375rem;
    font-weight: 500;
  }
  .desktop-nav a:hover {
    color: var(--red);
  }
  .header-contact {
    display: none;
  }
  .menu-toggle {
    min-height: 44px;
    background: none;
    border: 0;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.5rem 0 0.5rem 0.6rem;
    font-size: 0.9375rem;
    font-weight: 600;
  }
  .menu-icon {
    width: 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .menu-icon i {
    display: block;
    height: 1.5px;
    width: 100%;
    background: var(--ink);
    transition: transform var(--motion);
  }
  .menu-icon.is-open i:first-child {
    transform: translateY(3.75px) rotate(45deg);
  }
  .menu-icon.is-open i:last-child {
    transform: translateY(-3.75px) rotate(-45deg);
  }
  .mobile-nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--white);
    border-bottom: 1px solid var(--line);
    padding: 1rem var(--gutter) 1.5rem;
    max-block-size: calc(100dvh - 66px);
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  .mobile-nav a {
    display: block;
    padding: 0.8rem 0;
    min-height: 48px;
    border-bottom: 1px solid var(--line);
    font-weight: 500;
  }
  .mobile-nav a:hover {
    color: var(--red);
  }

  /* Hero */
  .hero {
    padding-top: clamp(4rem, 7vw, 7rem);
    position: relative;
  }
  .hero-copy {
    text-align: center;
    max-width: 880px;
  }
  .hero-copy .lead {
    max-width: 560px;
    margin: 1.75rem auto 0;
  }
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 2.25rem;
  }
  .hero-stage {
    position: relative;
    width: min(100% - var(--gutter) * 2, 1120px);
    margin: clamp(2.5rem, 4.5vw, 4rem) auto 0;
  }
  .hero-phone {
    display: none;
    position: absolute;
    right: -16px;
    bottom: -40px;
  }
  .proof {
    position: relative;
    z-index: 1;
    background: var(--page);
    margin-top: -60px;
    padding-top: 2.5rem;
    padding-bottom: clamp(3rem, 5vw, 4.5rem);
  }
  .proof .wrap {
    border-top: 1px solid var(--line);
    padding-top: clamp(2.5rem, 4vw, 3.5rem);
    text-align: center;
  }
  .proof p {
    font-size: clamp(1.0625rem, 1.4vw, 1.25rem);
    font-weight: 500;
    color: var(--muted);
    margin-bottom: 1.5rem;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
  }
  .chips li {
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: 999px;
    font-size: 0.8125rem;
    font-weight: 600;
    padding: 0.5rem 0.875rem;
  }

  /* Services */
  .service-grid {
    display: grid;
    gap: 1.5rem;
    margin-top: 3rem;
  }
  .service-card {
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .service-card h3 {
    margin-top: 0.75rem;
  }
  .service-card > p {
    color: var(--muted);
    font-size: 1rem;
    margin-top: 0.75rem;
  }
  .service-card .red-list {
    margin-top: 1.25rem;
  }
  .service-card .text-link {
    margin-top: 0.75rem;
    align-self: flex-start;
  }
  .service-screen {
    margin: 1.5rem -0.5rem -3rem;
  }
  .service-screen .frame-body {
    min-height: 180px;
  }

  /* Work */
  .work-section h2,
  .products-section h2,
  .approach-section h2,
  .about-section h2,
  .questions-section h2 {
    margin-top: 0.25rem;
  }
  .work-featured {
    display: grid;
    gap: 2rem;
    align-items: center;
    margin-top: 3rem;
  }
  .work-grid {
    display: grid;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  .work-card .work-screen {
    margin-bottom: 1.25rem;
  }
  .work-copy h3 {
    margin-top: 0.25rem;
  }
  .work-featured .work-copy h3 {
    font-size: clamp(2rem, 2.8vw, 2.5rem);
  }
  .work-copy > p {
    margin-top: 0.75rem;
  }
  .work-summary {
    color: var(--muted);
    font-size: 1rem;
  }
  .changed {
    font-size: 0.9375rem;
  }
  .changed strong {
    color: var(--red);
    font-weight: 700;
  }
  .products-section {
    background: var(--band);
  }
  .product-grid {
    display: grid;
    gap: 1.5rem;
    margin-top: 3rem;
  }
  .product-card {
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .product-card h3 {
    margin-top: 0.25rem;
  }
  .tagline {
    color: var(--muted);
    font-weight: 600;
    font-size: 0.9375rem;
  }
  .product-card .work-summary {
    margin-top: 0.75rem;
  }
  .product-card .red-list {
    margin-top: 1rem;
  }
  .product-card .meta,
  .product-card .text-link {
    margin-top: 0.75rem;
    align-self: flex-start;
  }
  .product-screen {
    margin: 2rem -0.5rem -5rem;
  }

  /* Approach */
  .approach-steps {
    display: grid;
    gap: 2.5rem;
    margin-top: 3rem;
  }
  .approach-steps article {
    border-top: 1px solid var(--line);
    padding-top: 1.5rem;
  }
  .approach-steps h3 {
    margin-top: 0.25rem;
    font-size: 1.75rem;
  }
  .approach-steps p {
    color: var(--muted);
    font-size: 1rem;
    margin-top: 0.75rem;
  }

  /* About */
  .about-layout {
    display: grid;
    gap: 3rem;
  }
  .about-copy p:not(.section-label) {
    color: var(--muted);
    margin-top: 1.25rem;
    font-size: clamp(1rem, 1.3vw, 1.125rem);
  }
  .about-facts {
    display: grid;
    gap: 2rem;
    align-content: start;
  }
  .about-facts > div {
    border-top: 1px solid var(--line);
    padding-top: 1rem;
  }
  .about-facts dt {
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--meta);
  }
  .fact-value {
    font-size: clamp(1.75rem, 2.5vw, 2.25rem);
    line-height: 1.1;
    margin-top: 0.25rem;
  }

  /* Questions */
  .questions-layout {
    max-width: 720px;
  }
  .questions-list {
    margin-top: 2.5rem;
  }
  .questions-list details {
    border-top: 1px solid var(--line);
  }
  .questions-list details:last-child {
    border-bottom: 1px solid var(--line);
  }
  .questions-list summary {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    font-size: 1.0625rem;
    font-weight: 600;
    padding: 1.25rem 0;
  }
  .questions-list summary::-webkit-details-marker {
    display: none;
  }
  .questions-list summary:hover {
    color: var(--red);
  }
  .disclosure-icon {
    width: 16px;
    height: 16px;
    position: relative;
    flex: 0 0 auto;
  }
  .disclosure-icon::before,
  .disclosure-icon::after {
    content: "";
    background: currentColor;
    position: absolute;
    width: 12px;
    height: 1px;
    top: 8px;
    left: 2px;
  }
  .disclosure-icon::after {
    transform: rotate(90deg);
  }
  details[open] .disclosure-icon::after {
    transform: rotate(0);
  }
  .questions-list details p {
    color: var(--muted);
    font-size: 1rem;
    padding: 0 2rem 1.5rem 0;
  }

  /* Contact */
  .contact-panel {
    display: grid;
    gap: 3rem;
    padding: clamp(1.5rem, 4vw, 3rem);
  }
  .contact-details > div {
    margin-top: 2rem;
  }
  .contact-term {
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--meta);
    margin-bottom: 0.5rem;
  }
  .contact-email {
    font-size: 1.125rem;
    font-weight: 600;
  }

  /* Footer */
  .site-footer {
    border-top: 1px solid var(--line);
    padding-block: 3rem 1.5rem;
  }
  .footer-main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
  }
  .footer-brand {
    width: 180px;
  }
  .footer-main > div > p {
    font-size: 0.9375rem;
    color: var(--muted);
    margin-top: 1rem;
  }
  .footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0 2rem;
    font-size: 0.9375rem;
  }
  .footer-links a {
    min-height: 44px;
    display: flex;
    align-items: center;
    color: var(--muted);
  }
  .footer-links a:hover {
    color: var(--red);
  }
  .footer-bottom {
    border-top: 1px solid var(--line);
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    font-size: 0.875rem;
    color: var(--meta);
  }
}

@layer responsive {
  @media (min-width: 600px) {
    .work-grid,
    .approach-steps {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 768px) {
    .service-grid,
    .product-grid,
    .contact-panel {
      grid-template-columns: 1fr 1fr;
    }
    .work-featured {
      grid-template-columns: 7fr 5fr;
    }
    .about-layout {
      grid-template-columns: 7fr 5fr;
      gap: 4rem;
    }
    .about-facts {
      padding-top: 4rem;
    }
  }
  @media (min-width: 960px) {
    .desktop-nav,
    .header-contact {
      display: flex;
    }
    .header-inner {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
    }
    .desktop-nav {
      justify-content: center;
    }
    .header-contact {
      justify-self: end;
    }
    .menu-toggle,
    .mobile-nav {
      display: none;
    }
    .approach-steps {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 1024px) {
    .hero-phone {
      display: block;
    }
    .proof {
      margin-top: -120px;
      padding-top: 5rem;
    }
  }
  @media (max-width: 399px) {
    .brand {
      width: 150px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
    }
  }
  @media (forced-colors: active) {
    * {
      scrollbar-color: auto;
    }
    .button,
    .card,
    .frame,
    .chips li {
      border: 1px solid ButtonText;
    }
  }
}
```

- [ ] **Step 2: Update `src/components/inquiry.css`**

Replace the first rule and the input rule:

```css
  .inquiry-card {
    background: var(--white);
    min-width: 0;
  }
```

and inside the `.field input, .field textarea, .field select, .draft-preview` rule change `border-radius: 3px;` to `border-radius: var(--radius);`. Everything else in the file stays (inputs keep `--control-border` for a visible boundary; the design's hairline input border fails non-text contrast).

- [ ] **Step 3: Rewrite `src/components/Header.tsx`**

```tsx
import { useEffect, useRef, useState } from "react";

const navigation = [
  ["Services", "#services"],
  ["Work", "#work"],
  ["Approach", "#approach"],
  ["Contact", "#contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function wide() {
      if (window.innerWidth >= 960) setOpen(false);
    }
    window.addEventListener("keydown", escape);
    window.addEventListener("resize", wide);
    return () => {
      window.removeEventListener("keydown", escape);
      window.removeEventListener("resize", wide);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <a
          href="#home"
          className="brand"
          aria-label="Ridgewell home"
          onClick={() => setOpen(false)}
        >
          <img
            src="./brand/ridgewell-logo.jpg"
            alt="Ridgewell Management Services, Inc."
            width="1186"
            height="280"
          />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="button button-small header-contact" href="#contact">
          Start a project
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          <span
            className={open ? "menu-icon is-open" : "menu-icon"}
            aria-hidden="true"
          >
            <i />
            <i />
          </span>
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {navigation.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a href="#questions" onClick={() => setOpen(false)}>
          Common questions
        </a>
        <a href="#contact" onClick={() => setOpen(false)}>
          Start a project
        </a>
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: Update `index.html` metadata**

Replace the `theme-color`, `description` and `title`:

```html
    <meta name="theme-color" content="#f6f4ef" />
    <meta
      name="description"
      content="Ridgewell designs websites and builds bespoke internal systems for Philippine schools, property managers and small businesses. Seven systems in daily use."
    />
    <title>Ridgewell | Websites and bespoke systems</title>
```

- [ ] **Step 5: Build and look**

Run: `npm run test:unit && npm run build`
Expected: green.

Visual check (keep this dev server for later tasks):

```bash
npm run dev -- --host 127.0.0.1 --port 4173 &
sleep 3
npx playwright screenshot --viewport-size=1440,900 http://127.0.0.1:4173 /tmp/claude-1000/showroom-task3.png
```

Open the PNG (Read tool). Expected: warm off-white page, 64px white header with centred nav and a red "Start a project" button, centred h1 in Barlow Condensed, the inquiry form below. If `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` is in use, add `--browser chromium` and run the screenshot through a tiny script instead:

```bash
node -e '
const { chromium } = require("@playwright/test");
(async () => {
  const b = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH, args: ["--no-sandbox"] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://127.0.0.1:4173"); await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: process.argv[1], fullPage: true }); await b.close();
})();' /tmp/claude-1000/showroom-task3.png
```

- [ ] **Step 6: Commit**

```bash
git add src/styles.css src/components/inquiry.css src/components/Header.tsx index.html
git commit -m "Showroom tokens, base styles, header and page metadata"
```

---

### Task 4: Hero and proof line

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `hero`, `proof` from `src/content.ts`; `BrowserFrame`, `PhoneFrame` from `./Frames`; `Screen` from `./Screen`.
- Produces: `<Hero />` rendering `section#home.hero` and `section.proof`. `.hero-stage` carries `data-reveal` and is animated by Task 9. `.hero-phone` is the phone frame; `.units-expiring` is inside the hero screen (Task 10 test).

- [ ] **Step 1: Write the component**

`src/components/Hero.tsx`:

```tsx
import { hero, proof } from "../content";
import { BrowserFrame, PhoneFrame } from "./Frames";
import Screen from "./Screen";

export default function Hero() {
  return (
    <>
      <section id="home" className="hero">
        <div className="wrap hero-copy">
          <p className="section-label">{hero.label}</p>
          <h1>{hero.heading}</h1>
          <p className="lead">{hero.lead}</p>
          <div className="hero-actions">
            <a className="button" href={hero.primary.href}>
              {hero.primary.label}
            </a>
            <a className="button button-outline" href={hero.secondary.href}>
              {hero.secondary.label}
            </a>
          </div>
        </div>
        <div className="hero-stage" data-reveal>
          <BrowserFrame className="hero-frame">
            <Screen kind={hero.screen} alt={hero.screenAlt} />
          </BrowserFrame>
          <PhoneFrame className="hero-phone">
            <Screen kind={hero.phone} alt={hero.phoneAlt} />
          </PhoneFrame>
        </div>
      </section>
      <section className="proof" aria-label="In daily use">
        <div className="wrap">
          <p>{proof.line}</p>
          <ul className="chips">
            {proof.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Wire it into `src/App.tsx`**

Replace the inline `<section id="home" ...>` block with `<Hero />` and add `import Hero from "./components/Hero";`. Remove the now-unused `hero` import.

- [ ] **Step 3: Build and look**

Run: `npm run test:unit && npm run build`
Expected: green.

Screenshot at 1440 and at 390 wide (same commands as Task 3, Step 5, change `--viewport-size`). Expected at 1440: the browser frame below the buttons, its bottom hidden under the proof section's rule, the phone overlapping the frame's bottom-right over the unit tiles and not over the "Expiring in 30 days" panel (the panel is on the left of the grid). At 390: no phone, no sidebar, no horizontal scroll.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx src/App.tsx
git commit -m "Hero with browser and phone frames, proof line with three chips"
```

---

### Task 5: Service cards

**Files:**
- Create: `src/components/Services.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `services` from `src/content.ts`, `Arrow`, `BrowserFrame`, `Screen`.
- Produces: `<Services onInterest={(interest: string) => void} />` rendering `section#services`. Each card has an `a.text-link` named "Talk about this service" with `href="#contact"` that calls `onInterest(service.interest)`.

- [ ] **Step 1: Write the component**

`src/components/Services.tsx`:

```tsx
import { services } from "../content";
import Arrow from "./Arrow";
import { BrowserFrame } from "./Frames";
import Screen from "./Screen";

export default function Services({
  onInterest,
}: {
  onInterest: (interest: string) => void;
}) {
  return (
    <section id="services" className="services-section section-space">
      <div className="wrap">
        <p className="section-label">What we do</p>
        <h2>Two things, done properly.</h2>
        <div className="service-grid">
          {services.map((service) => (
            <article
              key={service.id}
              id={`service-${service.id}`}
              className="card service-card"
              data-reveal
            >
              <p className="section-label">{service.label}</p>
              <h3>{service.heading}</h3>
              <p>{service.description}</p>
              <ul className="red-list">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                className="text-link"
                href="#contact"
                onClick={() => onInterest(service.interest)}
              >
                Talk about this service <Arrow />
              </a>
              <BrowserFrame flat className="service-screen">
                <Screen kind={service.screen} alt={service.screenAlt} />
              </BrowserFrame>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire it**

In `src/App.tsx` add `import Services from "./components/Services";` and render `<Services onInterest={setInterest} />` directly after `<Hero />`.

- [ ] **Step 3: Build and look**

Run: `npm run test:unit && npm run build`
Expected: green. Screenshot at 1440: two equal white cards, red square bullets drawn by CSS, a drawn wireframe at the bottom of the first card and a records table with red Approve buttons at the bottom of the second, both clipped by the card edge.

- [ ] **Step 4: Commit**

```bash
git add src/components/Services.tsx src/App.tsx
git commit -m "Two service cards with drawn mini UI"
```

---

### Task 6: Work section (client grid and products band)

**Files:**
- Create: `src/components/Work.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `caseStudies`, `clientWork`, `productWork` from `src/content.ts`; `Arrow`, `BrowserFrame`, `Screen`.
- Produces: `<Work />` rendering `section#work` (five client cards, ids `work-portal`, `work-staff`, `work-registrar`, `work-hr`, `work-college`) and `section#products` (ids `work-leasetrack`, `work-ledger`). Cards 02 to 05 are `article.work-card` inside `.work-grid`; their frames use `aspect`. Every card carries `data-reveal`.

- [ ] **Step 1: Write the component**

`src/components/Work.tsx`:

```tsx
import { caseStudies, clientWork, productWork } from "../content";
import type { CaseStudy } from "../content";
import Arrow from "./Arrow";
import { BrowserFrame } from "./Frames";
import Screen from "./Screen";

function Copy({ study }: { study: CaseStudy }) {
  return (
    <div className="work-copy">
      <span className="index" aria-hidden="true">
        {study.index}
      </span>
      <h3>{study.title}</h3>
      <p className="work-summary">{study.summary}</p>
      <p className="changed">
        <strong>What changed:</strong> {study.changed}
      </p>
      <p className="meta">
        For {study.audience} · {study.status}
      </p>
    </div>
  );
}

function FeaturedCard({ study }: { study: CaseStudy }) {
  return (
    <article id={`work-${study.id}`} className="card work-featured" data-reveal>
      <BrowserFrame flat className="work-screen">
        <Screen kind={study.screen} alt={study.screenAlt} />
      </BrowserFrame>
      <Copy study={study} />
    </article>
  );
}

function WorkCard({ study }: { study: CaseStudy }) {
  return (
    <article id={`work-${study.id}`} className="card work-card" data-reveal>
      <BrowserFrame flat aspect className="work-screen">
        <Screen kind={study.screen} alt={study.screenAlt} />
      </BrowserFrame>
      <Copy study={study} />
    </article>
  );
}

function ProductCard({ study }: { study: CaseStudy }) {
  return (
    <article id={`work-${study.id}`} className="card product-card" data-reveal>
      <span className="index" aria-hidden="true">
        {study.index}
      </span>
      <h3>{study.title}</h3>
      {study.tagline && <p className="tagline">{study.tagline}</p>}
      <p className="work-summary">{study.summary}</p>
      <ul className="red-list">
        <li>For: {study.audience}</li>
        <li>What changed: {study.changed}</li>
      </ul>
      <p className="meta">{study.status}</p>
      {study.link && (
        <a className="text-link" href={study.link.href}>
          {study.link.label} <Arrow />
        </a>
      )}
      <BrowserFrame flat className="product-screen">
        <Screen kind={study.screen} alt={study.screenAlt} />
      </BrowserFrame>
    </article>
  );
}

export default function Work() {
  const client = caseStudies.filter((study) => study.group === "client");
  const products = caseStudies.filter((study) => study.group === "product");
  const [featured, ...rest] = client;
  return (
    <>
      <section id="work" className="work-section section-space">
        <div className="wrap">
          <p className="section-label">{clientWork.label}</p>
          <h2>{clientWork.heading}</h2>
          <p className="section-intro">{clientWork.intro}</p>
          <FeaturedCard study={featured} />
          <div className="work-grid">
            {rest.map((study) => (
              <WorkCard key={study.id} study={study} />
            ))}
          </div>
        </div>
      </section>
      <section id="products" className="products-section section-space">
        <div className="wrap">
          <p className="section-label">{productWork.label}</p>
          <h2>{productWork.heading}</h2>
          <div className="product-grid">
            {products.map((study) => (
              <ProductCard key={study.id} study={study} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Wire it**

In `src/App.tsx` add `import Work from "./components/Work";` and render `<Work />` after `<Services ... />`.

- [ ] **Step 3: Build and look**

Run: `npm run test:unit && npm run build`
Expected: green. Screenshot at 1440 of the Work area (use the Task 3 script with `fullPage: true`, then crop with `convert in.png -crop 1440x1800+0+1900 out.png` if ImageMagick is present, or just read the full page). Expected: card 01 wide with screen left and copy right; cards 02 to 05 in two rows of two, each drawn screen filling its 16:10 frame with no empty white band under the table; the products band a shade deeper than the page; the two product frames cut off by the card bottom.

- [ ] **Step 4: Commit**

```bash
git add src/components/Work.tsx src/App.tsx
git commit -m "Work section: featured card, 2x2 grid and products band"
```

---

### Task 7: Approach, About and Questions

**Files:**
- Create: `src/components/Approach.tsx`, `src/components/About.tsx`, `src/components/Questions.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `approach`, `about`, `questions` from `src/content.ts`.
- Produces: `section#approach`, `section#about`, `section#questions` (native `details`/`summary`, the existing `.disclosure-icon`).

- [ ] **Step 1: Write the three components**

`src/components/Approach.tsx`:

```tsx
import { approach } from "../content";

export default function Approach() {
  return (
    <section id="approach" className="approach-section section-space">
      <div className="wrap">
        <p className="section-label">{approach.label}</p>
        <h2>{approach.heading}</h2>
        <div className="approach-steps">
          {approach.steps.map((step, i) => (
            <article key={step.title} data-reveal>
              <span className="index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

`src/components/About.tsx`:

```tsx
import { about } from "../content";

export default function About() {
  return (
    <section id="about" className="about-section section-space">
      <div className="wrap about-layout">
        <div className="about-copy">
          <p className="section-label">{about.label}</p>
          <h2>{about.heading}</h2>
          {about.paragraphs.map((text) => (
            <p key={text.slice(0, 24)}>{text}</p>
          ))}
        </div>
        <dl className="about-facts">
          {about.facts.map((fact) => (
            <div key={fact.label} data-reveal>
              <dt>{fact.label}</dt>
              <dd className="fact-value">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
```

`src/components/Questions.tsx`:

```tsx
import { questions } from "../content";

export default function Questions() {
  return (
    <section id="questions" className="questions-section section-space">
      <div className="wrap questions-layout">
        <p className="section-label">Questions</p>
        <h2>Good to know.</h2>
        <div className="questions-list">
          {questions.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <span className="disclosure-icon" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire them**

In `src/App.tsx` import the three and render `<Approach />`, `<About />`, `<Questions />` in that order after `<Work />`.

- [ ] **Step 3: Build and look**

Run: `npm run test:unit && npm run build`
Expected: green. Screenshot: three approach columns above a rule with red numerals; About with copy left and three stacked facts right in Barlow Condensed; Questions in a 720px column.

- [ ] **Step 4: Commit**

```bash
git add src/components/Approach.tsx src/components/About.tsx src/components/Questions.tsx src/App.tsx
git commit -m "Approach, About and Questions sections"
```

---

### Task 8: Contact panel and footer

**Files:**
- Create: `src/components/Contact.tsx`, `src/components/Footer.tsx`
- Modify: `src/components/InquiryForm.tsx` (heading copy only)
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `companyEmail`, `contact`, `caseStudies` from `src/content.ts`; `InquiryForm` with its existing `{ interest, onInterest }` props.
- Produces: `section#contact` containing `.card.contact-panel` (details left, form right) with the link named "Email Ridgewell directly"; `footer.site-footer` with links to `#work-portal`, `#work-leasetrack`, `#work-ledger` and "Back to top" → `#home`.

- [ ] **Step 1: Write Contact**

`src/components/Contact.tsx`:

```tsx
import { companyEmail, contact } from "../content";
import Arrow from "./Arrow";
import InquiryForm from "./InquiryForm";

export default function Contact({
  interest,
  onInterest,
}: {
  interest: string;
  onInterest: (value: string) => void;
}) {
  return (
    <section id="contact" className="contact-section section-space">
      <div className="wrap">
        <div className="card contact-panel">
          <div className="contact-details">
            <p className="section-label">{contact.label}</p>
            <h2>{contact.heading}</h2>
            <div>
              <p className="contact-term">Email</p>
              <a
                className="text-link contact-email"
                href={`mailto:${companyEmail}`}
              >
                Email Ridgewell directly <Arrow diagonal />
              </a>
              <p className="meta">{companyEmail}</p>
            </div>
            <div>
              <p className="contact-term">What to include</p>
              <ul className="red-list">
                {contact.include.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="contact-term">Hours</p>
              <p>{contact.hours}</p>
            </div>
          </div>
          <InquiryForm interest={interest} onInterest={onInterest} />
        </div>
      </div>
    </section>
  );
}
```

The details column is plain `div`/`p` markup on purpose: a `<dl>` with a heading inside it is invalid HTML and axe flags it.

- [ ] **Step 2: Write Footer**

`src/components/Footer.tsx`:

```tsx
import { caseStudies } from "../content";

const footerWork = ["portal", "leasetrack", "ledger"];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-main">
          <div>
            <a className="brand footer-brand" href="#home" aria-label="Ridgewell home">
              <img
                src="./brand/ridgewell-logo.jpg"
                width="1186"
                height="280"
                alt="Ridgewell Management Services, Inc."
              />
            </a>
            <p>Website design · Bespoke system development</p>
          </div>
          <nav className="footer-links" aria-label="Footer">
            {caseStudies
              .filter((study) => footerWork.includes(study.id))
              .map((study) => (
                <a key={study.id} href={`#work-${study.id}`}>
                  {study.title}
                </a>
              ))}
            <a href="#home">
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </nav>
        </div>
        <p className="footer-bottom">
          © {new Date().getFullYear()} Ridgewell Management Services, Inc.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Adjust the inquiry form heading**

In `src/components/InquiryForm.tsx`, the form heading block becomes:

```tsx
          <div className="form-heading">
            <h3>Prepare your inquiry.</h3>
            <span>All fields required unless marked.</span>
          </div>
```

Nothing else in the form changes. Field labels stay ("Your name", "Email address", "Business or organization", "Where could we help?", "What would you like to work better?").

- [ ] **Step 4: Final App composition**

`src/App.tsx` (replace the whole file):

```tsx
import { useState } from "react";
import { useSectionMotion } from "./hooks/useMotion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Work from "./components/Work";
import Approach from "./components/Approach";
import About from "./components/About";
import Questions from "./components/Questions";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const motion = useSectionMotion();
  const [interest, setInterest] = useState<string>("Not sure yet");
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" ref={motion}>
        <Hero />
        <Services onInterest={setInterest} />
        <Work />
        <Approach />
        <About />
        <Questions />
        <Contact interest={interest} onInterest={setInterest} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Build and look**

Run: `npm run test:unit && npm run build`
Expected: green. Screenshot at 1440 and 390: one white contact panel, details left and form right on desktop, stacked on mobile; footer on off-white with the logo, three work links and Back to top.

- [ ] **Step 6: Commit**

```bash
git add src/components/Contact.tsx src/components/Footer.tsx src/components/InquiryForm.tsx src/App.tsx src/styles.css
git commit -m "Contact panel, footer and final page composition"
```

---

### Task 9: Motion and browser tests back to green

**Files:**
- Modify: `src/hooks/useMotion.ts`
- Modify: `tests/motion.spec.ts` (rewrite)
- Modify: `tests/site.spec.ts`

**Interfaces:**
- `useSectionMotion` reveals `h1, h2` (y 12), `[data-reveal]` (y 12, opacity 0 → 1) and `.hero-stage` (y 24) once, under `prefers-reduced-motion: no-preference` only. `clearProps` removes inline styles when done.

- [ ] **Step 1: Write the failing motion tests**

Replace `tests/motion.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("hero stage and cards settle once, with no runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const stage = page.locator(".hero-stage");
  await expect
    .poll(() => stage.evaluate((el) => (el as HTMLElement).style.transform))
    .not.toBe("");
  await expect
    .poll(() => stage.evaluate((el) => (el as HTMLElement).style.transform))
    .toBe("");
  const card = page.locator("#work-registrar");
  await card.scrollIntoViewIfNeeded();
  await expect
    .poll(() => card.evaluate((el) => getComputedStyle(el).opacity))
    .toBe("1");
  await expect
    .poll(() => card.evaluate((el) => (el as HTMLElement).style.transform))
    .toBe("");
  expect(errors).toEqual([]);
});

test("reduced motion renders the final state, including a live preference change", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const states = await page
    .locator("[data-reveal], h1, h2")
    .evaluateAll((elements) =>
      elements.map((el) => [
        (el as HTMLElement).style.transform,
        (el as HTMLElement).style.opacity,
        getComputedStyle(el).opacity,
      ]),
    );
  expect(states.length).toBeGreaterThan(10);
  for (const [transform, inlineOpacity, opacity] of states) {
    expect(transform).toBe("");
    expect(inlineOpacity).toBe("");
    expect(opacity).toBe("1");
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const stage = page.locator(".hero-stage");
  await expect
    .poll(() => stage.evaluate((el) => (el as HTMLElement).style.transform))
    .not.toBe("");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() => stage.evaluate((el) => (el as HTMLElement).style.transform))
    .toBe("");
  await expect
    .poll(() => page.locator("h1").evaluate((el) => (el as HTMLElement).style.transform))
    .toBe("");
});

test("deep link under reduced motion shows every card fully", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#contact");
  await page.evaluate(() => document.fonts.ready);
  const hidden = await page
    .locator("[data-reveal]")
    .evaluateAll((elements) =>
      elements
        .filter((el) => getComputedStyle(el).opacity !== "1")
        .map((el) => el.id || el.className),
    );
  expect(hidden).toEqual([]);
  await expect(page.locator("#contact .contact-panel")).toBeInViewport();
});
```

- [ ] **Step 2: Run the motion spec to verify it fails**

Run: `npx playwright test tests/motion.spec.ts --project=desktop`
Expected: FAIL on the first test (`.hero-stage` never receives an inline transform because the hook does not animate it yet).

- [ ] **Step 3: Extend the hook**

Replace the `media.add` callback body in `src/hooks/useMotion.ts`:

```ts
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const root = ref.current;
        if (!root) return;
        const once = (trigger: Element) => ({
          trigger,
          start: "top 92%",
          toggleActions: "play none none none" as const,
        });
        root.querySelectorAll("h1, h2").forEach((heading) => {
          gsap.from(heading, {
            y: 12,
            duration: 0.55,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: once(heading),
          });
        });
        root.querySelectorAll(".hero-stage").forEach((stage) => {
          gsap.from(stage, {
            y: 24,
            duration: 0.7,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: once(stage),
          });
        });
        root.querySelectorAll("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 12,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: once(element),
          });
        });
      });
```

Keep `return () => media.revert();` and the `useGSAP(..., { scope: ref })` wrapper as they are.

- [ ] **Step 4: Run the motion spec to verify it passes**

Run: `npx playwright test tests/motion.spec.ts`
Expected: 3 tests × 2 projects PASS.

- [ ] **Step 5: Update `tests/site.spec.ts` to the new page**

Apply these edits:

1. In the first test, change the h1 assertion:

```ts
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Websites and bespoke systems",
  );
```

2. Replace the whole test `"each service changes its panel and preselects the corresponding inquiry"` with:

```ts
test("each service card preselects its inquiry interest, by click and by keyboard", async ({
  page,
}) => {
  const links = page.getByRole("link", { name: "Talk about this service" });
  await expect(links).toHaveCount(2);
  await links.nth(0).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByLabel("Where could we help?")).toHaveValue("Website");
  await links.nth(1).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByLabel("Where could we help?")).toHaveValue(
    "Bespoke system",
  );
  await expect(page.locator("#contact")).toBeInViewport();
});
```

3. In `"changing services after preparing a draft preserves inputs and updates the next draft"`, replace the tab click and the two expectations:

```ts
  await page
    .getByRole("link", { name: "Talk about this service" })
    .nth(1)
    .click();
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue(
    "Test Visitor",
  );
  await expect(page.getByLabel("Where could we help?")).toHaveValue(
    "Bespoke system",
  );
  await page.getByRole("button", { name: "Prepare your inquiry" }).click();
  expect(
    await page
      .getByRole("link", { name: "Open email app" })
      .getAttribute("href"),
  ).toContain("Bespoke%20system");
```

4. In the mobile navigation test, the label list becomes:

```ts
  for (const label of [
    "Services",
    "Work",
    "Approach",
    "Contact",
    "Common questions",
    "Start a project",
  ]) {
```

5. In `"all inquiry choices and email handoff are usable without submitting data"`, the subject assertion becomes `toContain("Not sure yet")` (the loop leaves the last option selected).

6. In the landscape test, the final link is `"Start a project"` instead of `"Let’s talk"`.

7. In `prepareInquiry`, nothing changes.

- [ ] **Step 6: Run the whole check**

Run: `npm run check`
Expected: unit tests PASS, build clean, every Playwright test PASS on desktop and mobile, axe reports no violations. Every text colour in the tokens is at least 4.5:1 on white and on the page tint; if axe still reports `color-contrast`, darken the offending token rather than relaxing the axe tags.

- [ ] **Step 7: Commit**

```bash
git add src/hooks/useMotion.ts tests/motion.spec.ts tests/site.spec.ts
git commit -m "Reveal motion for frames and cards; browser tests follow the Showroom page"
```

---

### Task 10: Work-section spec, review-focus tests and documentation

**Files:**
- Create: `tests/work.spec.ts`
- Modify: `README.md`, `DESIGN.md`
- Replace: `docs/preview-desktop.jpg`, `docs/preview-mobile.jpg`

- [ ] **Step 1: Write the Work spec**

`tests/work.spec.ts`:

```ts
import { expect, test } from "@playwright/test";
import { findForbidden } from "../src/lib/forbidden.ts";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
});

test("seven case studies render with anchors, index numerals and accessible screens", async ({
  page,
}) => {
  const ids = [
    "work-portal",
    "work-staff",
    "work-registrar",
    "work-hr",
    "work-college",
    "work-leasetrack",
    "work-ledger",
  ];
  for (const id of ids) {
    const card = page.locator(`#${id}`);
    await expect(card).toHaveCount(1);
    await expect(card.getByRole("heading", { level: 3 })).toBeVisible();
    await expect(card.getByRole("img")).toHaveAttribute("aria-label", /.{20,}/);
  }
  await expect(page.locator(".work-copy .changed strong")).toHaveCount(5);
  const screens = page.getByRole("img");
  const names = await screens.evaluateAll((els) =>
    els.map((el) => el.getAttribute("aria-label") ?? el.getAttribute("alt")),
  );
  expect(names.filter((name) => !name || name.length < 20)).toEqual([]);
});

test("the rendered page contains no technology, client, building or form-code names", async ({
  page,
}) => {
  const text = await page.evaluate(
    () => document.documentElement.innerText + " " + document.title,
  );
  expect(findForbidden(text)).toEqual([]);
  const attributes = await page.evaluate(() =>
    Array.from(document.querySelectorAll("[aria-label], [alt], [title]"))
      .map(
        (el) =>
          `${el.getAttribute("aria-label") ?? ""} ${el.getAttribute("alt") ?? ""} ${el.getAttribute("title") ?? ""}`,
      )
      .join(" "),
  );
  expect(findForbidden(attributes)).toEqual([]);
  await expect(page.locator('a[href*="leasetrack" i]')).toHaveCount(0);
});

test("footer links reach the work anchors", async ({ page }) => {
  for (const id of ["work-portal", "work-leasetrack", "work-ledger"]) {
    const link = page.locator(`.footer-links a[href="#${id}"]`);
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});

test("desktop composition: 2x2 grid, filled frames, phone clear of the expiring panel", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "desktop composition only");
  const boxes = await Promise.all(
    ["work-staff", "work-registrar", "work-hr", "work-college"].map((id) =>
      page.locator(`#${id}`).boundingBox(),
    ),
  );
  expect(boxes[0]!.y).toBeCloseTo(boxes[1]!.y, 0);
  expect(boxes[2]!.y).toBeCloseTo(boxes[3]!.y, 0);
  expect(boxes[2]!.y).toBeGreaterThan(boxes[0]!.y + 200);
  // Each drawn screen must reach (or overflow) the bottom of its 16:10 frame:
  // the distance from the last drawn element to the frame's bottom edge is
  // at most 48px. Overflow is clipped by the frame and is fine.
  const gaps = await page
    .locator(".work-card .frame-body-aspect")
    .evaluateAll((bodies) =>
      bodies.map((body) => {
        const screen = body.querySelector(".scr");
        const last = screen?.lastElementChild;
        if (!last) return Number.POSITIVE_INFINITY;
        return (
          body.getBoundingClientRect().bottom -
          last.getBoundingClientRect().bottom
        );
      }),
    );
  expect(gaps).toHaveLength(4);
  for (const gap of gaps) expect(gap).toBeLessThanOrEqual(48);
  const phone = await page.locator(".hero-phone").boundingBox();
  const panel = await page.locator(".units-expiring").boundingBox();
  expect(phone).not.toBeNull();
  expect(panel).not.toBeNull();
  const overlaps =
    phone!.x < panel!.x + panel!.width &&
    phone!.x + phone!.width > panel!.x &&
    phone!.y < panel!.y + panel!.height &&
    phone!.y + phone!.height > panel!.y;
  expect(overlaps).toBe(false);
});

test("mobile composition hides the phone and keeps the hero screen inside the viewport", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile composition only");
  await expect(page.locator(".hero-phone")).toBeHidden();
  const frame = await page.locator(".hero-frame").boundingBox();
  expect(frame!.x).toBeGreaterThanOrEqual(0);
  expect(frame!.x + frame!.width).toBeLessThanOrEqual(
    (await page.viewportSize())!.width + 1,
  );
});

test("drawn screens stay clipped at 200% text on narrow viewports", async ({
  page,
}) => {
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `no horizontal scroll at ${width}px with 200% text`,
    ).toBe(true);
    const overflowing = await page
      .locator(".frame-body-aspect")
      .evaluateAll((bodies) =>
        bodies.filter((body) => getComputedStyle(body).overflow !== "hidden")
          .length,
      );
    expect(overflowing).toBe(0);
  }
});
```

- [ ] **Step 2: Run the new spec**

Run: `npx playwright test tests/work.spec.ts`
Expected: PASS on both projects. If the "filled frames" assertion fails for a card, add rows to that screen's data array (Task 1 files) until the table fills the 16:10 frame at 1440 wide; the frame clips the excess.

- [ ] **Step 3: Regenerate the preview images**

With the dev server running on 4173:

```bash
node -e '
const { chromium } = require("@playwright/test");
(async () => {
  const b = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH, args: ["--no-sandbox"] } : {});
  for (const [file, width, height] of [["docs/preview-desktop.jpg", 1440, 1000], ["docs/preview-mobile.jpg", 390, 844]]) {
    const p = await b.newPage({ viewport: { width, height } });
    await p.emulateMedia({ reducedMotion: "reduce" });
    await p.goto("http://127.0.0.1:4173"); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: file, type: "jpeg", quality: 82 }); await p.close();
  }
  await b.close();
})();'
```

Expected: two JPEGs under 400 KB each, showing the hero.

- [ ] **Step 4: Update README.md**

Replace the second paragraph and the "Project guide" and "Animation" sections:

```markdown
The original logo and published contact address are retained. The page is the "Showroom" redesign: a warm off-white canvas, Barlow Condensed headlines, Manrope body, Ridgewell red as the only accent, and drawn product screens inside browser and phone frames that show the two services and seven systems in daily use. A keyboard-accessible page, native FAQ disclosures, and a reviewable email-draft inquiry flow support it.
```

```markdown
## Project guide

- `src/content.ts`: all page copy (hero, proof chips, two services, seven case studies, approach, about, questions, contact) and the inquiry interest options.
- `src/lib/forbidden.ts`: words that must never appear on the page; enforced by `src/content.test.ts` and `tests/work.spec.ts`.
- `src/components/`: one component per section (`Hero`, `Services`, `Work`, `Approach`, `About`, `Questions`, `Contact`, `Footer`), the inquiry flow, `Frames.tsx` (browser and phone frames) and `Screen.tsx` with the drawn screens in `screens/`.
- `src/lib/inquiry.ts`: validation and email draft construction.
- `src/styles.css`, `src/components/screens.css`, `src/components/inquiry.css`: tokens and page, screen and form styles.
- `DESIGN.md`: design decisions and interaction contract.
- `docs/superpowers/specs/`: the approved concept spec; `docs/superpowers/plans/`: the implementation plan.

Original logo rights belong to Ridgewell. Font licenses are supplied by the Fontsource packages in `node_modules`. This repository makes no claim to ownership of the original brand assets.

## Replacing a drawn screen with a real screenshot

Every screen is rendered by `Screen` from a key in `src/content.ts`. To use a real, tightly cropped screenshot that contains no personal data, put the file in `public/work/`, add `image: { src: "./work/<file>.png", width, height }` to that case study, and pass it through: `<Screen kind={study.screen} alt={study.screenAlt} image={study.image} />`. The accessible name stays the same.

## Animation

GSAP settles headings by 12px, raises the hero frame by 24px and fades each card in once as it enters the viewport. Animations respect `prefers-reduced-motion`, including preference changes while the page is open. Motion lives in `src/hooks/useMotion.ts`, with React-scoped cleanup and browser regression coverage in `tests/motion.spec.ts`.
```

- [ ] **Step 5: Update DESIGN.md**

Replace the file's "Owner direction", "Visual direction", "Runtime mapping" and "Motion implementation" sections with the Showroom equivalents; keep "Behavioral contract" but change the service-tab bullet to: "Each of the two service cards has a 'Talk about this service' link that preselects the inquiry interest." Source the Visual direction text from `.superdesign/design-system.md` (Colour, Typography, Layout, Components, Imagery rules, Do not, Content rule), reproduced in prose. Runtime mapping becomes:

```markdown
## Runtime mapping

- `src/styles.css`: tokens, type, layout, sections, responsive behaviour.
- `src/components/screens.css`: browser and phone frames, drawn product screens.
- `src/components/inquiry.css`: the inquiry form and draft states.
- `src/content.ts`: every line of copy; `src/lib/forbidden.ts`: what copy may never say.
- `src/components/Screen.tsx` and `src/components/screens/`: the drawn screens and the slot a real screenshot replaces.
```

Delete the "UI UX Pro Max review" section and the references to `docs/verification.md` and `docs/source-audit.md` in this file (those documents describe the retired page; leave the files in place).

- [ ] **Step 6: Full check and commit**

Run: `npm run check`
Expected: all green.

```bash
git add tests/work.spec.ts README.md DESIGN.md docs/preview-desktop.jpg docs/preview-mobile.jpg
git commit -m "Work-section spec, review-focus tests, previews and docs for the Showroom page"
```

---

### Task 11: Real screenshots and the LeaseTrack demo link (run only when the preconditions hold)

**Preconditions (check, do not assume):**
- `https://leasetrack.ridgewell.com.ph` resolves and answers 200 on `/` (on 2026-10-11 it had no DNS record and the compose stack on omada-swc was down). Check with `curl -sI https://leasetrack.ridgewell.com.ph | head -1`.
- A local or demo instance of each system is available with seeded, fictional data only. Captures must contain no real names, photos, ids, amounts or addresses.
- The LeaseTrack seed in `/home/jason/claude/leasetrack/seed/src/generators.ts` names the building `Rada Regency Condominium`. Before capturing, run the demo with the constant changed to `Condominium` (that change is in a different repository and is the owner's call; capturing with the original name is not acceptable).

**Files:**
- Create: `public/work/<id>.png` for each captured screen
- Modify: `src/content.ts` (`image` on the captured case studies; `link` on LeaseTrack), `src/components/Work.tsx`, `src/components/Hero.tsx` (pass `image`), `src/content.test.ts`, `tests/work.spec.ts`

- [ ] **Step 1: Extend the content type**

In `src/content.ts` add to `CaseStudy`:

```ts
  /** A real cropped screenshot; replaces the drawn screen when present. */
  image?: { src: string; width: number; height: number };
```

and in `Work.tsx` and `Hero.tsx` pass `image={study.image}` to every `<Screen>` (for the hero, add `image?` fields to `hero` the same way).

- [ ] **Step 2: Capture**

For each system, in a Chromium at 1440×900 with fictional data loaded, screenshot the region described by that case study's `screenAlt`, crop to a 16:10 region for cards 02 to 05 and to the natural region for 01, 06, 07, export PNG, optimise (`npx -y @squoosh/cli` or `pngquant` if present), save as `public/work/<id>.png`, and record width and height.

- [ ] **Step 3: Guard the captures**

Add to `src/content.test.ts`:

```ts
test("captured screenshots exist at the declared paths", () => {
  for (const study of caseStudies) {
    if (!study.image) continue;
    const file = new URL(`../public/${study.image.src.replace(/^\.\//, "")}`, import.meta.url);
    assert.ok(statSync(file).size > 0, study.id);
    assert.ok(study.image.width > 0 && study.image.height > 0, study.id);
  }
});
```

(import `statSync` from `node:fs`). In `tests/work.spec.ts`, the accessible-name test already covers `<img alt>`; add after it:

```ts
  for (const img of await page.locator("img.screen-image").all())
    await expect(img).toHaveJSProperty("naturalWidth", expect.any(Number));
```

- [ ] **Step 4: Enable the demo link only when live**

When the curl check returns 200, set on the LeaseTrack case study:

```ts
    link: { label: "Open the live demo", href: "https://leasetrack.ridgewell.com.ph" },
    status: "Live demo",
```

and change the content test `"the LeaseTrack live-demo link stays off until verified"` to assert the link's `href` equals that URL, and in `tests/work.spec.ts` change `toHaveCount(0)` to `toHaveCount(1)` with `target` and `rel` checks if the link opens in a new tab (`rel="noopener"`). Add `target="_blank"` and `rel="noopener"` handling in `ProductCard` only if the owner wants a new tab; default is same tab.

- [ ] **Step 5: Check and commit**

Run: `npm run check`
Expected: green.

```bash
git add public/work src/content.ts src/content.test.ts src/components/Work.tsx src/components/Hero.tsx tests/work.spec.ts
git commit -m "Real product screenshots and the LeaseTrack demo link"
```

---

## Self-review notes

- Spec coverage: header, hero (with the "phone must not cover the panel" fix), proof chips, two service cards with preselect, five client cards with featured 01, two product cards on the band with bleed, approach, about facts, FAQ, contact panel with published email and hours, footer with work anchors, drawn screens with real-screenshot slot, forbidden-word rule, anonymised clients, "Condominium" label, no demo link until verified, motion contract, reduced motion, 44px targets, axe, Work spec: all mapped to Tasks 1 to 11.
- Names are consistent: `Screen`, `ScreenKey`, `ScreenImage`, `BrowserFrame({ flat, aspect })`, `PhoneFrame`, `data-reveal`, `.hero-stage`, `.hero-phone`, `.units-expiring`, `.work-card`, `.frame-body-aspect`, `#work-<id>` with ids `portal, staff, registrar, hr, college, leasetrack, ledger`, `findForbidden`, `serviceOptions = ["Website", "Bespoke system", "Not sure yet"]`, select label "Where could we help?".
- Known deviations from the draft, all deliberate: inputs keep a visible `#7c858d` border (contrast); meta text is `#6b737b` and screen status colours are darkened so every visible text passes 4.5:1; browser-chrome dots are neutral; the "Expiring in 30 days" panel sits left of the unit grid so the phone cannot cover it; form field labels keep their current, more descriptive wording; the contact email is the published address, not the draft's placeholder.
