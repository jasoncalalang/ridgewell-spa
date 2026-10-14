import type { ScreenImage, ScreenKey } from "./components/Screen";
export type { ScreenKey } from "./components/Screen";

export const companyEmail = "ridgewell-management-services-inc@polsia.app";

export const serviceOptions = [
  "Website",
  "Bespoke system",
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
      "A records table with names, status labels, dates and an Approve button on each row.",
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
      "Attendance register for one section: a list of students marked present, absent or late, and a Print school form button.",
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
      "A receipt thumbnail beside the ledger line read from it: vendor, date, category and amount, with an Export to Excel button.",
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
