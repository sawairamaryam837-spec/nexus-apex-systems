export type Service = {
  slug: string;
  name: string;
  category: "Revenue" | "Automation" | "Platform";
  tagline: string;
  summary: string;
  metric: string;
  metricLabel: string;
  benefits: { title: string; body: string }[];
  features: string[];
  workflow: { step: string; body: string }[];
  caseStudy: { company: string; quote: string; person: string; role: string; results: string[] };
  faq: { q: string; a: string }[];
  pricing: { name: string; price: string; note: string; includes: string[] }[];
};

const baseFaq = (name: string) => [
  {
    q: `How long does a ${name} deployment take?`,
    a: "Most engagements reach production in 4–7 weeks. Discovery and systems mapping take the first two weeks; the remainder covers build, supervised training, and phased rollout against live traffic.",
  },
  {
    q: "Do you replace our existing stack?",
    a: "No. We integrate with the CRM, telephony, data warehouse, and ticketing systems you already run. Nexus operates as an execution layer above them, not a replacement for them.",
  },
  {
    q: "How is performance measured?",
    a: "Every engagement ships with an executive scorecard: pipeline generated, cost per qualified conversation, response latency, and net operating cost displaced. Metrics are reviewed monthly with your team.",
  },
  {
    q: "Who owns the systems you build?",
    a: "You do. Prompts, workflows, evaluation suites, and infrastructure are handed over under your accounts with full documentation at the end of the engagement.",
  },
];

const basePricing = [
  {
    name: "Pilot",
    price: "$18,000",
    note: "One-time, 6 weeks",
    includes: ["Single workflow in production", "Systems + data audit", "Executive scorecard", "30-day hypercare"],
  },
  {
    name: "Program",
    price: "$12,500",
    note: "per month, 12-month term",
    includes: [
      "Up to 4 workflows in production",
      "Dedicated solutions architect",
      "Continuous evaluation + tuning",
      "Quarterly business review",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "Annual agreement",
    includes: [
      "Multi-region deployment",
      "SOC 2 aligned controls",
      "Private model routing",
      "Named engineering pod",
    ],
  },
];

export const services: Service[] = [
  {
    slug: "ai-sales-agents",
    name: "AI Sales Agents",
    category: "Revenue",
    tagline: "Autonomous representatives that work every lead, every hour.",
    summary:
      "Deploy AI representatives that research accounts, run discovery, handle objections, and advance opportunities inside your CRM without human queueing.",
    metric: "4.1x",
    metricLabel: "more qualified conversations per week",
    benefits: [
      { title: "No coverage gaps", body: "Every inbound lead receives a substantive first response in under sixty seconds, including nights and weekends." },
      { title: "Consistent methodology", body: "Discovery follows your qualification framework on every call — no drift, no untrained reps." },
      { title: "Compounding data", body: "Each conversation is transcribed, scored, and fed back into routing and forecasting models." },
    ],
    features: [
      "Account research from firmographic and intent data",
      "Multi-threaded email, SMS, and voice sequencing",
      "Objection handling tuned to your win/loss library",
      "Native CRM write-back with structured call notes",
      "Human escalation rules by deal value and sentiment",
      "Full transcript audit trail and evaluation suite",
    ],
    workflow: [
      { step: "Ingest", body: "Leads arrive from forms, ads, partners, or your warehouse and are enriched in real time." },
      { step: "Qualify", body: "The agent scores fit and intent against your ICP before spending a single minute of rep time." },
      { step: "Engage", body: "Outreach runs across channels with adaptive cadence based on engagement signals." },
      { step: "Advance", body: "Meetings are booked directly on rep calendars with a written brief attached." },
    ],
    caseStudy: {
      company: "Meridian Logistics",
      quote:
        "We moved from a 14-person SDR floor to a four-person revenue operations team. Pipeline went up, not down.",
      person: "Dana Whitfield",
      role: "Chief Revenue Officer",
      results: ["+312% qualified pipeline", "-68% cost per meeting", "51s median first response"],
    },
    faq: baseFaq("AI sales agent"),
    pricing: basePricing,
  },
  {
    slug: "ai-calling-agents",
    name: "AI Calling Agents",
    category: "Revenue",
    tagline: "Natural voice conversations at the scale of a call centre.",
    summary:
      "Sub-second latency voice agents that qualify inbound calls, run outbound campaigns, and hand warm conversations to your closers.",
    metric: "620ms",
    metricLabel: "median voice response latency",
    benefits: [
      { title: "Human-grade conversation", body: "Interruption handling, backchannelling, and natural turn-taking rather than rigid IVR trees." },
      { title: "Elastic capacity", body: "Run one call or four thousand concurrently with no hiring cycle." },
      { title: "Compliance built in", body: "Consent capture, do-not-call enforcement, and jurisdiction-aware recording notices." },
    ],
    features: [
      "Inbound and outbound campaign orchestration",
      "Warm transfer with live context handoff",
      "Voicemail detection and callback scheduling",
      "Real-time transcription and sentiment scoring",
      "Telephony integration with Twilio, Vonage, or your carrier",
      "Call recording retention policies by region",
    ],
    workflow: [
      { step: "Route", body: "Calls are matched to the right agent persona and language on connect." },
      { step: "Converse", body: "The agent qualifies, answers product questions, and manages objections in real time." },
      { step: "Transfer", body: "High-intent callers are warm-transferred with a summary already in the CRM." },
      { step: "Review", body: "Every call is scored against your QA rubric and surfaced in the dashboard." },
    ],
    caseStudy: {
      company: "Northline Insurance",
      quote: "Abandon rate fell to near zero. Our licensed agents now only take calls that are ready to buy.",
      person: "Marcus Iyer",
      role: "VP Customer Operations",
      results: ["96% call containment", "-41% cost to serve", "+27% bind rate"],
    },
    faq: baseFaq("AI calling agent"),
    pricing: basePricing,
  },
  {
    slug: "ai-appointment-setting",
    name: "AI Appointment Setting",
    category: "Revenue",
    tagline: "Calendars filled with meetings that actually show.",
    summary:
      "Persistent, polite follow-up across channels until a qualified meeting is on the calendar — with confirmation and reminder logic that reduces no-shows.",
    metric: "89%",
    metricLabel: "meeting show rate",
    benefits: [
      { title: "Relentless follow-up", body: "Eleven-touch sequences executed precisely, without a rep deciding to skip touch seven." },
      { title: "Real availability", body: "Direct calendar integration prevents double-booking and timezone errors." },
      { title: "Show-rate engineering", body: "Confirmation, reschedule, and reminder flows tuned per segment." },
    ],
    features: [
      "Round-robin and territory-aware routing",
      "Timezone and working-hours resolution",
      "Automated reschedule and no-show recovery",
      "Pre-meeting brief generation for reps",
      "Calendar integrations for Google and Microsoft 365",
      "Segment-level show-rate reporting",
    ],
    workflow: [
      { step: "Reach", body: "Leads are contacted on their preferred channel within minutes." },
      { step: "Confirm", body: "Fit is verified before a slot is offered so reps see only qualified time." },
      { step: "Book", body: "Meetings are placed directly on the calendar with a written brief." },
      { step: "Protect", body: "Reminders and reschedule flows keep the slot from going cold." },
    ],
    caseStudy: {
      company: "Arclight Health",
      quote: "Our reps stopped chasing calendars entirely. They walk in prepared and the meeting is already qualified.",
      person: "Priya Raman",
      role: "Head of Growth",
      results: ["+186% meetings held", "89% show rate", "9 hrs/week returned per rep"],
    },
    faq: baseFaq("appointment setting"),
    pricing: basePricing,
  },
  {
    slug: "crm-automation",
    name: "CRM Automation",
    category: "Automation",
    tagline: "A CRM that maintains itself.",
    summary:
      "Data hygiene, enrichment, deduplication, stage progression, and forecasting inputs handled automatically so your pipeline reflects reality.",
    metric: "99.2%",
    metricLabel: "record completeness after rollout",
    benefits: [
      { title: "Forecast you can defend", body: "Stage criteria enforced by system rules rather than rep optimism." },
      { title: "Zero manual entry", body: "Calls, emails, and meetings are logged and summarised without rep involvement." },
      { title: "Clean by default", body: "Duplicates merged, records enriched, and dormant deals surfaced continuously." },
    ],
    features: [
      "Salesforce, HubSpot, and Pipedrive integrations",
      "Automated deduplication and merge rules",
      "Firmographic and technographic enrichment",
      "Stage-gate validation and hygiene alerts",
      "Territory and ownership reassignment logic",
      "Warehouse sync for BI and forecasting",
    ],
    workflow: [
      { step: "Audit", body: "We profile your object model, field usage, and data decay rate." },
      { step: "Design", body: "Hygiene rules, enrichment sources, and stage gates are defined with your RevOps team." },
      { step: "Automate", body: "Workflows are deployed with rollback and dry-run modes." },
      { step: "Monitor", body: "Data quality is tracked as a first-class KPI in your dashboard." },
    ],
    caseStudy: {
      company: "Verido Software",
      quote: "Forecast accuracy moved from 62% to 91% in one quarter without changing a single rep.",
      person: "Elena Boschetti",
      role: "SVP Revenue Operations",
      results: ["91% forecast accuracy", "-4,100 manual hours/yr", "99.2% record completeness"],
    },
    faq: baseFaq("CRM automation"),
    pricing: basePricing,
  },
  {
    slug: "workflow-automation",
    name: "Workflow Automation",
    category: "Automation",
    tagline: "Operational processes that run without a queue.",
    summary:
      "We map the manual work between your systems and replace it with monitored, auditable automation that handles exceptions intelligently.",
    metric: "37k",
    metricLabel: "manual hours removed annually",
    benefits: [
      { title: "Exception-aware", body: "Automations escalate edge cases to humans instead of failing silently." },
      { title: "Fully observable", body: "Every run is logged, replayable, and alertable." },
      { title: "Business-owned", body: "Operators can adjust rules without filing engineering tickets." },
    ],
    features: [
      "Process mining and opportunity sizing",
      "Event-driven orchestration with retries",
      "Human-in-the-loop approval steps",
      "Document parsing and structured extraction",
      "SLA monitoring with escalation paths",
      "Full audit log export",
    ],
    workflow: [
      { step: "Map", body: "We shadow the process and quantify time, cost, and error rate." },
      { step: "Model", body: "Steps are decomposed into deterministic logic and model-driven judgement." },
      { step: "Build", body: "Automation ships behind a flag and runs in shadow mode first." },
      { step: "Scale", body: "Coverage expands as accuracy thresholds are met." },
    ],
    caseStudy: {
      company: "Halden Manufacturing",
      quote: "Order intake went from three days to twenty minutes. Nobody on the team lost a job — they moved upstream.",
      person: "Tom Vasquez",
      role: "COO",
      results: ["-94% cycle time", "37k hours removed", "0 SLA breaches in 6 months"],
    },
    faq: baseFaq("workflow automation"),
    pricing: basePricing,
  },
  {
    slug: "marketing-automation",
    name: "Marketing Automation",
    category: "Automation",
    tagline: "Campaign operations at machine speed, brand voice intact.",
    summary:
      "Segment generation, lifecycle messaging, creative variants, and attribution wiring — governed by your brand system and legal review.",
    metric: "+43%",
    metricLabel: "lift in marketing-sourced pipeline",
    benefits: [
      { title: "Brand-safe by construction", body: "Voice guidelines, claims libraries, and approval gates are enforced in the pipeline." },
      { title: "Segment of one", body: "Lifecycle messaging adapts to behaviour without a campaign manager building each branch." },
      { title: "Attribution that closes", body: "Spend, touch, and revenue reconciled in one model." },
    ],
    features: [
      "Lifecycle journey design and deployment",
      "Creative variant generation with approval gates",
      "Intent-based audience construction",
      "Multi-touch attribution modelling",
      "Deliverability and reputation monitoring",
      "Paid and owned channel orchestration",
    ],
    workflow: [
      { step: "Baseline", body: "Current funnel performance and channel economics are established." },
      { step: "Systemise", body: "Brand rules, claims, and approvals are encoded as guardrails." },
      { step: "Launch", body: "Journeys go live with holdout groups for clean measurement." },
      { step: "Compound", body: "Winning variants are promoted automatically each cycle." },
    ],
    caseStudy: {
      company: "Corvus Fintech",
      quote: "We ship in a day what used to take a six-week campaign cycle, and legal is happier about it.",
      person: "Sofia Lindqvist",
      role: "CMO",
      results: ["+43% sourced pipeline", "-58% cost per MQL", "6 weeks → 1 day cycle"],
    },
    faq: baseFaq("marketing automation"),
    pricing: basePricing,
  },
  {
    slug: "ai-chatbots",
    name: "AI Chatbots",
    category: "Revenue",
    tagline: "Conversational surfaces that convert and deflect.",
    summary:
      "Grounded assistants on your site, product, and help centre that answer accurately, capture intent, and route revenue conversations to sales.",
    metric: "74%",
    metricLabel: "self-service resolution rate",
    benefits: [
      { title: "Grounded answers", body: "Responses are retrieved from your documentation with citations, not improvised." },
      { title: "Revenue aware", body: "Buying signals trigger handoff to a live rep or an AI sales agent." },
      { title: "Measurable deflection", body: "Ticket volume, resolution, and CSAT tracked per topic." },
    ],
    features: [
      "Retrieval over docs, tickets, and product data",
      "Citation-backed responses",
      "Live agent handoff with transcript context",
      "Multilingual support out of the box",
      "Containment and CSAT analytics",
      "Design-system-native embeddable widget",
    ],
    workflow: [
      { step: "Index", body: "Knowledge sources are ingested, chunked, and evaluated for coverage." },
      { step: "Ground", body: "Answer quality is tested against a golden question set before launch." },
      { step: "Deploy", body: "The widget ships behind traffic percentages you control." },
      { step: "Improve", body: "Unanswered questions become a content backlog automatically." },
    ],
    caseStudy: {
      company: "Ledgerwise",
      quote: "Support headcount stayed flat through 3x customer growth. The assistant absorbed the delta.",
      person: "Ana Ferreira",
      role: "VP Customer Experience",
      results: ["74% containment", "+11 CSAT points", "3x growth, flat headcount"],
    },
    faq: baseFaq("AI chatbot"),
    pricing: basePricing,
  },
  {
    slug: "saas-development",
    name: "SaaS Development",
    category: "Platform",
    tagline: "Production software, not proofs of concept.",
    summary:
      "Full-stack product engineering for AI-native platforms — architecture, interface, infrastructure, and the operational tooling around them.",
    metric: "11 wks",
    metricLabel: "median time to first revenue release",
    benefits: [
      { title: "Senior-only teams", body: "No staffing pyramid. Every engineer on your engagement has shipped at scale." },
      { title: "Built to hand over", body: "Documentation, tests, and runbooks are deliverables, not afterthoughts." },
      { title: "Cost-aware architecture", body: "Model routing and caching designed around unit economics from day one." },
    ],
    features: [
      "Product architecture and technical discovery",
      "Design system and interface engineering",
      "Multi-tenant data modelling and RLS",
      "Model routing, caching, and cost controls",
      "CI/CD, observability, and incident tooling",
      "Security review and penetration test support",
    ],
    workflow: [
      { step: "Define", body: "Scope, architecture, and success criteria agreed in a two-week discovery." },
      { step: "Build", body: "Two-week increments with working software at the end of each." },
      { step: "Harden", body: "Load, security, and cost testing before general availability." },
      { step: "Transfer", body: "Your team is trained and owns the codebase at completion." },
    ],
    caseStudy: {
      company: "Stratus Compliance",
      quote: "They built the platform we tried and failed to build twice internally, and shipped it in a quarter.",
      person: "David Okonkwo",
      role: "Founder & CEO",
      results: ["11 weeks to launch", "$0 unplanned infra spend", "SOC 2 Type I in month five"],
    },
    faq: baseFaq("SaaS development"),
    pricing: basePricing,
  },
  {
    slug: "custom-ai-systems",
    name: "Custom AI Systems",
    category: "Platform",
    tagline: "Bespoke intelligence for processes nobody has productised.",
    summary:
      "When off-the-shelf fails, we design evaluation-driven systems around your proprietary data, constraints, and regulatory posture.",
    metric: "97.4%",
    metricLabel: "accuracy on client evaluation sets",
    benefits: [
      { title: "Evaluation first", body: "We define what correct means and build the test harness before the system." },
      { title: "Data sovereignty", body: "Private routing, regional processing, and zero-retention configurations." },
      { title: "Defensible advantage", body: "Systems built on your data cannot be bought by a competitor." },
    ],
    features: [
      "Domain evaluation harness design",
      "Retrieval and fine-tuning strategy",
      "Private and on-premise model routing",
      "Guardrails, red-teaming, and refusal policy",
      "Human review interfaces for edge cases",
      "Drift monitoring and retraining cadence",
    ],
    workflow: [
      { step: "Frame", body: "The decision being automated is specified precisely, with failure costs." },
      { step: "Measure", body: "A labelled evaluation set is built with your domain experts." },
      { step: "Engineer", body: "Retrieval, prompting, and tuning are iterated against the benchmark." },
      { step: "Operate", body: "Drift and accuracy are monitored continuously in production." },
    ],
    caseStudy: {
      company: "Kestrel Capital",
      quote: "The evaluation discipline was the difference. We finally trusted the output enough to act on it.",
      person: "Rebecca Hale",
      role: "Managing Director",
      results: ["97.4% eval accuracy", "-82% analyst review time", "Zero retention architecture"],
    },
    faq: baseFaq("custom AI system"),
    pricing: basePricing,
  },
  {
    slug: "lead-qualification-ai",
    name: "Lead Qualification AI",
    category: "Revenue",
    tagline: "Rep time spent only on revenue that is real.",
    summary:
      "Behavioural, firmographic, and conversational signals combined into a live score that routes each lead to the right motion.",
    metric: "3.2x",
    metricLabel: "improvement in lead-to-opportunity rate",
    benefits: [
      { title: "Signal over form fills", body: "Scoring uses conversation content, not just page views and job titles." },
      { title: "Instant routing", body: "Enterprise leads reach a named rep in seconds; the rest are nurtured automatically." },
      { title: "Explainable scores", body: "Every score shows its contributing factors for rep trust." },
    ],
    features: [
      "Live scoring across behavioural and firmographic data",
      "Conversation-derived intent extraction",
      "Territory and named-account routing",
      "Explainability panel in the CRM",
      "Score calibration against closed-won history",
      "Nurture handoff for low-fit leads",
    ],
    workflow: [
      { step: "Calibrate", body: "Historic closed-won data defines what a good lead actually looks like." },
      { step: "Score", body: "Leads are scored continuously as new signals arrive." },
      { step: "Route", body: "Motion is selected per lead: rep, AI agent, or nurture." },
      { step: "Recalibrate", body: "Model weights are retuned quarterly against outcomes." },
    ],
    caseStudy: {
      company: "Orbital Networks",
      quote: "Reps stopped arguing about lead quality because they can see exactly why a lead scored the way it did.",
      person: "Grace Adeyemi",
      role: "VP Sales",
      results: ["3.2x lead-to-opp", "-47% wasted rep hours", "12s routing latency"],
    },
    faq: baseFaq("lead qualification"),
    pricing: basePricing,
  },
  {
    slug: "ai-voice-agents",
    name: "AI Voice Agents",
    category: "Platform",
    tagline: "Branded voice experiences across every telephony surface.",
    summary:
      "Custom voice personas for support, onboarding, collections, and retention — consistent, compliant, and available in any language you sell in.",
    metric: "24/7",
    metricLabel: "coverage across 31 languages",
    benefits: [
      { title: "One voice everywhere", body: "The same persona across IVR, outbound, and in-product voice." },
      { title: "Regulated-industry ready", body: "Disclosure scripts, consent capture, and retention controls." },
      { title: "Latency engineered", body: "Streaming architecture that keeps conversation natural under load." },
    ],
    features: [
      "Custom voice persona design",
      "31-language support with locale tuning",
      "Consent and disclosure automation",
      "Streaming ASR and TTS pipeline",
      "Barge-in and interruption handling",
      "Per-call cost and quality telemetry",
    ],
    workflow: [
      { step: "Persona", body: "Voice, tone, and escalation posture are defined with brand stakeholders." },
      { step: "Script", body: "Conversation policies are written and legally reviewed." },
      { step: "Tune", body: "Latency and accuracy tuned against recorded production traffic." },
      { step: "Expand", body: "Additional languages and use cases roll out on the same foundation." },
    ],
    caseStudy: {
      company: "Altura Travel Group",
      quote: "Guests cannot tell it is not our team, and our team finally sleeps through the night.",
      person: "Nils Berger",
      role: "Group Director of Service",
      results: ["31 languages live", "-63% after-hours cost", "4.7/5 caller rating"],
    },
    faq: baseFaq("AI voice agent"),
    pricing: basePricing,
  },
  {
    slug: "ai-consulting",
    name: "AI Consulting",
    category: "Platform",
    tagline: "A defensible AI strategy before a single line of code.",
    summary:
      "Executive-level assessment of where AI creates measurable margin in your business — and where it does not — with a sequenced roadmap.",
    metric: "$4.2M",
    metricLabel: "median identified annual opportunity",
    benefits: [
      { title: "Opportunity sized in dollars", body: "Every recommendation carries a cost, a return, and a confidence level." },
      { title: "Sequenced, not scattered", body: "A twelve-month roadmap ordered by payback period and dependency." },
      { title: "Board-ready", body: "Deliverables written for the audience that approves the budget." },
    ],
    features: [
      "Executive and operator interview programme",
      "Process and data readiness assessment",
      "Build vs buy evaluation per initiative",
      "Risk, governance, and compliance review",
      "Twelve-month sequenced roadmap",
      "Board-ready business case pack",
    ],
    workflow: [
      { step: "Discover", body: "Two weeks of structured interviews across functions." },
      { step: "Analyse", body: "Opportunities modelled for cost, return, and feasibility." },
      { step: "Sequence", body: "Initiatives ordered by payback and dependency." },
      { step: "Present", body: "Findings delivered to the executive team with an implementation path." },
    ],
    caseStudy: {
      company: "Brightmoor Group",
      quote: "The first thing they told us was which two projects to cancel. That alone paid for the engagement.",
      person: "Julian Marsh",
      role: "Group CEO",
      results: ["$4.2M opportunity identified", "2 projects cancelled", "Roadmap approved in one board cycle"],
    },
    faq: baseFaq("AI consulting"),
    pricing: basePricing,
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const funnelStages = [
  { id: "visitor", label: "Website Visitor", detail: "Anonymous traffic is identified and enriched in real time from firmographic and intent sources.", stat: "12,480 / mo" },
  { id: "captured", label: "Lead Captured", detail: "Forms, chat, and inbound calls resolve to a single deduplicated record instantly.", stat: "3,105 / mo" },
  { id: "qualified", label: "AI Qualification", detail: "Fit and intent scored against your ICP before any human time is spent.", stat: "68% pass rate" },
  { id: "calling", label: "AI Calling Agent", detail: "A voice agent runs discovery, handles objections, and confirms buying authority.", stat: "620ms latency" },
  { id: "crm", label: "CRM Entry", detail: "Structured notes, scores, and next actions written back to Salesforce or HubSpot.", stat: "99.2% complete" },
  { id: "followup", label: "Automated Follow-up", detail: "Multi-channel cadence adapts to engagement without a rep managing the sequence.", stat: "11 touches" },
  { id: "meeting", label: "Meeting Booked", detail: "Qualified time lands directly on a closer's calendar with a written brief.", stat: "89% show rate" },
  { id: "proposal", label: "Proposal Sent", detail: "Pricing and scope assembled from the conversation record and routed for approval.", stat: "2.1 day median" },
  { id: "closed", label: "Client Closed", detail: "Signature, handoff, and onboarding tasks triggered the moment terms are agreed.", stat: "31% win rate" },
  { id: "revenue", label: "Revenue Generated", detail: "Recognised revenue reconciled back to the originating touch for clean attribution.", stat: "$4.8M ARR" },
];

export const processSteps = [
  { n: "01", title: "Discovery", body: "Two weeks embedded with your revenue and operations teams to map systems, data, and the real cost of manual work." },
  { n: "02", title: "Planning", body: "Architecture, evaluation criteria, and a sequenced rollout plan signed off by the stakeholders who own the numbers." },
  { n: "03", title: "Development", body: "Two-week increments with working software at every checkpoint. No dark builds, no surprise demos." },
  { n: "04", title: "Training", body: "Systems are trained on your transcripts, documentation, and win/loss history until they clear your accuracy threshold." },
  { n: "05", title: "Deployment", body: "Phased rollout against live traffic behind percentage flags with instant rollback." },
  { n: "06", title: "Optimisation", body: "Weekly evaluation reviews, prompt and routing tuning, and cost-per-outcome reduction." },
  { n: "07", title: "Scaling", body: "Proven workflows expand across regions, product lines, and adjacent functions on the same foundation." },
];

export const clientLogos = [
  "MERIDIAN", "NORTHLINE", "ARCLIGHT", "VERIDO", "HALDEN", "CORVUS",
  "LEDGERWISE", "STRATUS", "KESTREL", "ORBITAL", "ALTURA", "BRIGHTMOOR",
];
