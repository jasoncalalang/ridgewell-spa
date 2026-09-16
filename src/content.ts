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
