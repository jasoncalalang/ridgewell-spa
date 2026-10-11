# Layouts (full source)

Single-page app. Shell = index.html + main.tsx + App.tsx. Header is the only shared layout component; footer is inline at the end of App.tsx.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#ffffff" />
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
    <meta
      name="description"
      content="Practical accounting, operations support, and focused custom software for Philippine SMEs. Make the everyday work clearer with Ridgewell."
    />
    <title>Ridgewell | Business, in working order</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

### `src/main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/manrope";
import "@fontsource/barlow-condensed/600.css";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

```

### `src/App.tsx`

```tsx
import { useState } from "react";
import { useSectionMotion } from "./hooks/useMotion";
import Header from "./components/Header";
import Arrow from "./components/Arrow";
import Services from "./components/Services";
import { companyEmail, questions } from "./content";
import InquiryForm from "./components/InquiryForm";
import {
  OperationsIllustration,
  FoundationIllustration,
  InquiryIllustration,
} from "./components/VectorArt";

export default function App() {
  const motion = useSectionMotion();
  const [interest, setInterest] = useState("General operations support");
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" ref={motion}>
        <section id="home" className="hero">
          <div className="wrap hero-layout">
            <div className="hero-copy">
              <p className="section-label">Support for Philippine businesses</p>
              <h1>
                Business,
                <br />
                in working
                <br />
                order.
              </h1>
              <p className="hero-description">
                Accounting, everyday operations, and software that fits. Put the
                right support behind the work your team does.
              </p>
              <a className="button" href="#contact">
                Talk through your needs <Arrow diagonal />
              </a>
            </div>
            <figure className="hero-figure">
              <OperationsIllustration />
              <figcaption>
                <span className="caption-rule" aria-hidden="true" />
                The numbers. The handoffs. The tools. Connected.
              </figcaption>
            </figure>
          </div>
          <div className="hero-foot wrap">
            <p>
              Grounded in accounting experience <strong>since 2004.</strong>
            </p>
            <a href="#services">
              Find your starting point <Arrow />
            </a>
          </div>
        </section>

        <Services onInterest={setInterest} />

        <section id="about" className="about-section section-space">
          <div className="wrap about-layout">
            <figure className="about-figure">
              <FoundationIllustration />
              <figcaption>Clear records are a good place to start.</figcaption>
            </figure>
            <div className="about-copy">
              <p className="section-label">Why Ridgewell</p>
              <h2>
                An accounting
                <br />
                point of view.
              </h2>
              <p>
                The numbers tell you where to look. Understanding the work
                behind them helps you decide what to change.
              </p>
              <p>
                Our accounting experience dates to 2004. We bring that
                perspective to your routines, responsibilities, and systems,
                with support that fits the people and resources you have.
              </p>
              <a href="#approach" className="text-link">
                How we approach the work <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section id="approach" className="approach-section section-space">
          <div className="wrap approach-layout">
            <div className="approach-intro">
              <p className="section-label">From question to next step</p>
              <h2>
                One useful
                <br />
                change at a time.
              </h2>
              <p>
                Bring the task that takes too long, the handoff that keeps
                slipping, or the system your team has outgrown.
              </p>
              <a className="text-link" href="#contact">
                Tell us what needs attention <Arrow />
              </a>
            </div>
            <div className="approach-steps">
              <article>
                <span className="step-number">01</span>
                <div>
                  <h3>Look at the work.</h3>
                  <p>
                    Understand the routine as it is today. Find the repeated
                    task, unclear responsibility, or missing information.
                  </p>
                </div>
              </article>
              <article>
                <span className="step-number">02</span>
                <div>
                  <h3>Choose a practical fix.</h3>
                  <p>
                    Work out what would help: accounting support, a documented
                    process, a better handoff, or a focused tool.
                  </p>
                </div>
              </article>
              <article>
                <span className="step-number">03</span>
                <div>
                  <h3>Make it part of the day.</h3>
                  <p>
                    Put the change into practice, with documentation and
                    follow-through your team can use as the business grows.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="questions" className="questions-section section-space">
          <div className="wrap questions-layout">
            <div>
              <p className="section-label">Before we talk</p>
              <h2>
                A few things
                <br />
                to know.
              </h2>
            </div>
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

        <section id="contact" className="contact-section section-space">
          <div className="wrap contact-layout">
            <div className="contact-intro">
              <p className="section-label">Start a conversation</p>
              <h2>
                What needs
                <br />
                to work better?
              </h2>
              <p>
                A short description of your business and the work that needs
                attention is enough to begin.
              </p>
              <a className="text-link" href={`mailto:${companyEmail}`}>
                Email Ridgewell directly <Arrow diagonal />
              </a>
              <InquiryIllustration />
            </div>
            <InquiryForm interest={interest} onInterest={setInterest} />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-main">
            <a
              className="brand footer-brand"
              href="#home"
              aria-label="Ridgewell home"
            >
              <img
                src="./brand/ridgewell-logo.jpg"
                width="1186"
                height="280"
                alt="Ridgewell Management Services, Inc."
              />
            </a>
            <p>
              Accounting. Operations.
              <br />A business in working order.
            </p>
            <a className="text-link" href="#home">
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Ridgewell Management Services, Inc.
            </span>
            <span>Supporting Philippine businesses.</span>
            <a href="#questions">Common questions</a>
          </div>
        </div>
      </footer>
    </>
  );
}

```

### `src/components/Header.tsx`

```tsx
import { useEffect, useRef, useState } from "react";
const navigation = [
  ["Services", "#services"],
  ["Our approach", "#approach"],
  ["About Ridgewell", "#about"],
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
          Let’s talk
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
          Let’s talk
        </a>
      </nav>
    </header>
  );
}

```

### `src/content.ts`

```ts
export const companyEmail = "ridgewell-management-services-inc@polsia.app";
export const serviceOptions = [
  "Accounting support",
  "Workflow and administrative improvement",
  "Documentation",
  "Scheduling and coordination",
  "Practical AI consulting",
  "General operations support",
  "Customized software development",
] as const;
export const services = [
  {
    id: "accounting",
    title: "Accounting & financial clarity",
    short: "Know where your business stands.",
    heading: "A clearer picture of the numbers.",
    description:
      "Dependable accounting support connects your day-to-day financial work to the decisions you need to make. Start with the numbers, then look at the work behind them.",
    items: [
      "Day-to-day accounting support",
      "Clearer financial records and routines",
      "An accounting perspective on operations",
    ],
    fit: "For owners who need a firmer handle on the financial side of the business.",
    interest: serviceOptions[0],
    example: {
      label: "Financial work",
      before: "Records in different places",
      after: "A clearer accounting routine",
      note: "Bring the numbers into focus.",
    },
  },
  {
    id: "operations",
    title: "Workflows & daily operations",
    short: "Give the work a clear way forward.",
    heading: "Less chasing. Clearer handoffs.",
    description:
      "Look closely at recurring tasks, administrative work, and the places a handoff breaks down. Give people a process they can follow and a clear view of what comes next.",
    items: [
      "Workflow and administrative review",
      "Scheduling and coordination",
      "Clear task ownership and follow-ups",
    ],
    fit: "For growing teams where too much still depends on one person remembering.",
    interest: serviceOptions[1],
    example: {
      label: "A recurring request",
      before: "Who is following this up?",
      after: "An owner and a clear next step",
      note: "Keep the handoff moving.",
    },
  },
  {
    id: "documentation",
    title: "Documentation & team support",
    short: "Make good work easier to repeat.",
    heading: "Get the know-how out of someone’s head.",
    description:
      "Turn the way your team actually works into useful process notes, checklists, and SOPs. Keep essential information close to the people who need it.",
    items: [
      "Standard operating procedures",
      "Practical checklists and reference notes",
      "Documentation upkeep and team handoffs",
    ],
    fit: "For businesses that need more consistency as responsibilities change.",
    interest: serviceOptions[2],
    example: {
      label: "A familiar process",
      before: "Ask the person who knows",
      after: "A checklist the team can use",
      note: "Make the next handoff easier.",
    },
  },
  {
    id: "software",
    title: "Tools & custom software",
    short: "Choose technology that fits the work.",
    heading: "The right tool for a specific problem.",
    description:
      "Get practical guidance on existing tools and AI, or build a focused internal tool when the work calls for it. Start with an operational need and keep the scope useful.",
    items: [
      "Practical tool selection and AI guidance",
      "Intake forms, trackers, and small portals",
      "Focused dashboards and integrations",
    ],
    fit: "For teams with a specific operational gap that a tailored digital tool could address.",
    interest: serviceOptions[6],
    example: {
      label: "An operational gap",
      before: "The same information entered twice",
      after: "A focused tool or integration",
      note: "Fit the tool to the task.",
    },
  },
];
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

```
