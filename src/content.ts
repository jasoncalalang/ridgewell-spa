import type { ScreenImage, ScreenKey } from "./components/Screen";
export type { ScreenKey } from "./components/Screen";

export const companyEmail = "info@ridgewell.com.ph";

export const serviceOptions = [
  "Website",
  "Bespoke system",
  "Accounting services",
  "Not sure yet",
] as const;
export type ServiceOption = (typeof serviceOptions)[number];

export const hero = {
  label: "Business, in working order.",
  heading: "Websites and bespoke systems, built to be used every day.",
  lead: "Ridgewell designs websites and builds internal systems for Philippine schools, property managers and small businesses. We started in accounting, so the books and the workflow come first.",
  primary: { label: "Start a project", href: "#contact" },
  secondary: { label: "See our work", href: "#work" },
  screen: "units-grid" as ScreenKey,
  screenAlt:
    "Lease management screen: a grid of condominium units coloured by status, with a legend for occupied, vacant and expiring.",
  phone: "parent-portal" as ScreenKey,
  phoneAlt:
    "Parent portal on a phone: a morning greeting and a report card with grades by subject.",
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
    screenAlt:
      "Wireframe of a small business website: a hero block, three columns and a footer line.",
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
    screenAlt:
      "A records table with names, status labels and an Approve button on each row.",
  },
];

export const accounting = {
  id: "accounting",
  label: "Accounting services",
  heading: "Accounting is where Ridgewell started, and it is still core to our work.",
  intro:
    "Ridgewell started in accounting in 2004. Alongside websites and systems, we handle the day-to-day accounting and compliance work for Philippine businesses, from registration to year-end.",
  items: [
    {
      title: "Business registration and permits",
      text: "SEC or DTI registration; BIR registration, including Form 2303 and registration of your books of accounts; LGU business permits and renewals.",
    },
    {
      title: "Bookkeeping and books of accounts",
      text: "Your books kept up to date, whether they are manual or computerized/loose-leaf.",
    },
    {
      title: "BIR tax compliance",
      text: "Monthly and quarterly returns, whether VAT or percentage tax and withholding tax, plus the annual income tax return.",
    },
    {
      title: "Payroll and government contributions",
      text: "SSS, PhilHealth and Pag-IBIG registration and remittances.",
    },
    {
      title: "Financial statements",
      text: "Preparation of your financial statements, plus coordination with your external auditor when audited financial statements are required.",
    },
    {
      title: "Year-end inventory list",
      text: "Prepared and submitted to the BIR for businesses that carry inventory.",
    },
    {
      title: "Retainer packages",
      text: "Ongoing monthly accounting, with the scope agreed for each client.",
    },
  ],
  cta: {
    label: "Ask about accounting services",
    href: "#contact",
    interest: "Accounting services" as ServiceOption,
  },
};

interface OfferCta {
  label: string;
  href: string;
  interest: ServiceOption;
}

interface OfferStep {
  index: string;
  title: string;
  tag: string;
  text: string;
  items?: string[];
  tiers?: { title: string; text: string; items: string[] }[];
  note?: string;
  cta?: OfferCta;
}

const discoveryCta: OfferCta = {
  label: "Request a discovery call",
  href: "#contact",
  interest: "Not sure yet",
};

const offerSteps: OfferStep[] = [
  {
    index: "01",
    title: "Discovery call",
    tag: "Free, about 20 minutes",
    text: "A short call to understand what you run, where work gets repeated or stuck, and what you have already tried. You leave knowing whether we can help and what the next step would be.",
    cta: discoveryCta,
  },
  {
    index: "02",
    title: "Assessment",
    tag: "Written report, short turnaround",
    text: "A paid review of how work actually moves through your office: enrollment, billing, records, reporting, and where AI agents can take on routine tasks and where they should not. You get a written report with findings ranked by effort and benefit, a recommended order of work, and a review call to go through it. We agree the delivery date before we start.",
    tiers: [
      {
        title: "Small school or office",
        text: "One campus and a small admin team.",
        items: [
          "One working session with the people who run the office",
          "Written report with a recommended first project",
          "Review call",
        ],
      },
      {
        title: "Mid-size school or business",
        text: "Several departments or a larger admin team.",
        items: [
          "Sessions with each department, such as registrar, finance and HR",
          "Written report that maps how work passes between offices",
          "Review call with the leadership team",
        ],
      },
      {
        title: "Multi-campus school or multi-branch group",
        text: "Several campuses, or a business with more than one branch.",
        items: [
          "Sessions at each site",
          "Written report that compares sites and flags what to standardise",
          "Rollout plan that covers every site, and a review call",
        ],
      },
    ],
    note: "The fee for each tier is set after the discovery call.",
  },
  {
    index: "03",
    title: "Adoption program",
    tag: "About 90 days",
    text: "A system only helps if people use it. We run workshops for your staff, help you choose internal champions in each office, hold weekly check-ins, and track usage on an adoption dashboard you can open at any time.",
    items: [
      "Staff workshops",
      "Internal champions in each office",
      "Weekly check-ins",
      "Adoption dashboard",
      "Closing report and a written playbook for your team",
    ],
  },
  {
    index: "04",
    title: "Fixed-scope build and deployment",
    tag: "Support window after launch",
    text: "Portals, records systems, forms and approvals, integrations, websites, or an AI agent set up for one defined task with a person reviewing its output. Scope, deliverables and timeline are written down before we start.",
    items: [
      "Written scope and deliverables",
      "Documentation and a handover walkthrough for your team",
      "A support window after go-live",
      "Anything outside the scope is quoted separately",
    ],
  },
  {
    index: "05",
    title: "Parallel Run",
    tag: "Pilot before you switch",
    text: "The new system or agent works alongside your current process, on the same real work. We compare time taken, errors, cost and what your staff think. You switch over only when the results justify it, and the old process stays in place until then.",
    items: [
      "The same work done both ways",
      "Measured against a baseline agreed up front",
      "A clear go or no-go decision before full switch-over",
    ],
  },
];

export const offer = {
  label: "Ways to work",
  heading: "From a first call to a working system.",
  intro:
    "Every engagement starts with a conversation and is scoped before anything is built. Each step is scoped on its own, so you decide after each one whether to continue.",
  steps: offerSteps,
  privacy: {
    label: "Across every step",
    heading: "Privacy and security are built in.",
    text: "Schools and businesses hold personal data about students, parents, staff and customers. We treat the Data Privacy Act of 2012 (Republic Act No. 10173) as a design requirement from the first assessment, not a review at the end.",
    items: [
      "Collect only the data a task needs",
      "Access by role, with a record of who changed what",
      "Retention, consent and data-subject requests worked out in the scope",
      "Privacy notes handed to your Data Protection Officer",
    ],
    note: "We support your compliance work. We do not replace your Data Protection Officer or legal counsel.",
  },
  cta: discoveryCta,
};

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
  /** A real cropped screenshot; replaces the drawn screen when present. */
  image?: ScreenImage;
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
    screenAlt:
      "Report card screen: six subjects with marks for four quarters and a Download report card button.",
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
    screenAlt:
      "Attendance register for one section: a list of students, each with an attendance mark.",
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
    screenAlt:
      "Enrollment queue: numbered applications with the status Registered, Assessed, Admitted or Sectioned.",
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
    screenAlt:
      "Approvals list of leave, overtime and travel requests beside a gate-scan panel showing how many people are on campus.",
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
    screenAlt:
      "Subject enlistment: a list of subjects with a prerequisite check beside each one.",
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
    screenAlt:
      "Cheques worklist: post-dated cheques with tenant, amount, due date and the status Deposited, Due or Replaced.",
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
    screenAlt:
      "A receipt thumbnail beside the ledger line read from it: vendor, date, category and amount.",
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
    {
      label: "Clients",
      value: "Philippine schools, property managers and SMEs",
    },
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
