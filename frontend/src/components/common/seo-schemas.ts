/**
 * Centralized SEO structured data definitions for Jaktra.
 * All JSON-LD schemas used across the site are defined here
 * so they can be validated in one place and shared across pages.
 */

const SITE_URL = "https://jaktra.site";

/* ─── Organization ────────────────────────────────────────────────── */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: "Jaktra",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  description:
    "AI-native accounts receivable automation platform for B2B finance teams. Replaces manual collection workflows with intelligent, automated multi-channel follow-up.",
};

/* ─── WebSite ─────────────────────────────────────────────────────── */
export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Jaktra",
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#org` },
};

/* ─── SoftwareApplication ─────────────────────────────────────────── */
export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Jaktra",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All modern browsers (Web)",
  browserRequirements: "Requires a modern web browser",
  url: SITE_URL,
  description:
    "Automate B2B accounts receivable with AI-powered 5-stage tone escalation, dispute triage, installment plans, and multi-channel follow-up. 100% free during early access.",
  offers: {
    "@type": "Offer",
    name: "Early Access",
    price: "0",
    priceCurrency: "USD",
    description: "100% Free during Early Access with zero credit card required",
    availability: "https://schema.org/InStock",
  },
  image: `${SITE_URL}/logo.webp`,
  screenshot: `${SITE_URL}/og-image.png`,
  creator: { "@id": `${SITE_URL}/#org` },
  featureList: [
    "5-stage AI tone escalation",
    "Dispute triage and AI reply drafting",
    "Installment payment plans",
    "Dead Letter Queue with automatic retries",
    "Multi-channel communication (email, SMS, WhatsApp)",
    "Debtor self-service portal",
    "SendGrid, Resend, and SMTP integration",
    "Razorpay payment gateway integration",
    "CSV invoice import",
    "Role-based team management",
    "Analytics and reporting dashboard",
  ],
};

import { ALL_FAQS } from "../../data/faqs";

/* ─── FAQPage ─────────────────────────────────────────────────────── */
export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ALL_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

/* ─── BreadcrumbList helper ───────────────────────────────────────── */
export function breadcrumbSchema(
  items: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    ],
  };
}

export const pricingPageSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Jaktra AR Automation",
  description: "AI-powered accounts receivable automation with 5-stage tone escalation, dispute triage, and self-service debtor payment portals.",
  brand: { "@id": `${SITE_URL}/#org` },
  offers: [
    {
      "@type": "Offer",
      name: "Early Access",
      price: "0",
      priceCurrency: "USD",
      description: "100% free during early access with unlimited invoices and all platform features",
      availability: "https://schema.org/InStock",
    },
  ],
};

export const highRadiusCompareSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "HighRadius vs Jaktra: Enterprise O2C Suite vs Focused AI Collections Agent",
  description: "Compare HighRadius and Jaktra. Understand why Jaktra is not a complete O2C suite replacement, but a focused, autonomous AI collections agent built for fast deployment and high recovery.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/compare/highradius-vs-jaktra`,
};

export const saasUseCaseSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Accounts Receivable Automation for B2B SaaS — Protect NRR & Cut Involuntary Churn",
  description: "Eliminate manual collections for B2B SaaS. Recover overdue ARR, resolve billing disputes autonomously, and protect Net Revenue Retention with Jaktra.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/use-cases/saas`,
};

export const upflowCompareSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Upflow Alternative — Autonomous Generative AI Tone Escalation vs Static Dunning",
  description: "Compare Upflow vs Jaktra. Discover why finance teams upgrade from Upflow's static email templates to Jaktra's autonomous Groq LLaMA 3.1 tone escalation, NLP dispute triage, and tokenized payment portals.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/compare/upflow-alternative`,
};

export const fiveStageEscalationSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Autonomous 5-Stage AR Tone Escalation Engine — Jaktra",
  description: "Explore Jaktra's 5-stage generative tone escalation engine. How Groq LLaMA 3.1, predictive ML delinquency risk scoring, the 20-hour idempotency guard, and Stage 5 Legal Stop recover cash without client friction.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/features/5-stage-escalation`,
};

export const disputeTriageSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "AI Invoice Dispute Management & Sentiment Triage — Jaktra",
  description: "Discover how Jaktra's NLP DisputeAgent classifies inbound billing inquiries, automatically freezes collection cadences, and drafts suggested resolutions for finance approval.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/features/dispute-triage`,
};

export const chaserCompareSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Chaser Alternative — Autonomous Generative AI AR Agent vs Static Dunning",
  description: "Compare Chaser vs Jaktra. Learn why finance leaders upgrade from Chaser's static email templates and manual phone call tracking to Jaktra's autonomous AI agent, tokenized debtor portals, and Razorpay settlement.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/compare/chaser-alternative`,
};

export const agencyUseCaseSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Accounts Receivable Automation for Digital Agencies — Jaktra",
  description: "Eliminate awkward client retainer chasing for creative and digital agencies. Protect client relationships, resolve scope disputes autonomously, and accelerate cash flow with Jaktra.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/use-cases/agencies`,
};

export const installmentPlansSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "B2B Payment Plans & Structured AR Installments — Jaktra",
  description: "Learn how Jaktra recovers at-risk overdue invoices by converting large balances into structured installment schedules via tokenized debtor portals with automated webhook tracking.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/features/installment-plans`,
};

export const dsoGuideSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Reduce Days Sales Outstanding (DSO): Countback Math & 5 Operational Levers",
  description: "A comprehensive financial guide for CFOs and Controllers on calculating DSO using the Countback method, benchmarking across B2B industries, and cutting DSO by 15–25 days with autonomous AI collections.",
  totalTime: "P18D",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-09",
  mainEntityOfPage: `${SITE_URL}/resources/how-to-reduce-dso`,
  step: [
    {
      "@type": "HowToStep",
      name: "Calculate True Collection Velocity Using the Countback Method",
      text: "Avoid Simple DSO distortion by exhausting outstanding receivables month-by-month in reverse chronological order against gross monthly sales.",
      url: `${SITE_URL}/resources/how-to-reduce-dso#calculator`,
    },
    {
      "@type": "HowToStep",
      name: "Eliminate Day-0 Invoice Delivery Latency",
      text: "Deploy multi-channel SMTP/SendGrid delivery with Dead Letter Queue (DLQ) retry logic to guarantee invoices reach active AP contacts on Day 1.",
      url: `${SITE_URL}/resources/how-to-reduce-dso#operational-levers`,
    },
    {
      "@type": "HowToStep",
      name: "Automate 5-Stage Non-Alienating Tone Modulation",
      text: "Progress reminders across 5 calibrated stages (Warm Reminder, Firm Prompt, Serious Notice, Stern Warning, Legal Stop) using Groq LLaMA 3.1.",
      url: `${SITE_URL}/resources/how-to-reduce-dso#operational-levers`,
    },
    {
      "@type": "HowToStep",
      name: "Deploy Cryptographic Zero-Login Debtor Portals",
      text: "Embed tokenized /i/:token direct links in communications so buyers can view and settle invoices via UPI, cards, or bank transfer in under 60 seconds.",
      url: `${SITE_URL}/resources/how-to-reduce-dso#operational-levers`,
    },
    {
      "@type": "HowToStep",
      name: "Offer Structured Self-Service Installment Recovery",
      text: "Convert high delinquent balances into automated 2x, 3x, or 4x milestone installment plans directly in the debtor portal to prevent bad debt default.",
      url: `${SITE_URL}/resources/how-to-reduce-dso#operational-levers`,
    },
  ],
};

export const dsoGuideFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Days Sales Outstanding (DSO) and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Days Sales Outstanding (DSO) is a corporate liquidity metric that measures the average number of days required to convert credit sales into liquid cash. A high DSO traps working capital on your balance sheet, forces unnecessary short-term borrowing, and exponentially increases the risk of bad debt write-offs.",
      },
    },
    {
      "@type": "Question",
      name: "Why does the Simple DSO formula fail during revenue growth or seasonal spikes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Simple DSO formula assumes uniform credit sales across the entire period. If a business closes 60% of its quarterly revenue in the final month of the quarter, Simple DSO artificially divides by the flat 90-day daily average, exaggerating collection lag. The Countback Method eliminates this distortion by exhausting receivables month-by-month in reverse chronological order against actual sales generated in each period.",
      },
    },
    {
      "@type": "Question",
      name: "What are realistic B2B DSO benchmarks by industry?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "According to the Credit Research Foundation (CRF) National Summary, median B2B SaaS DSO sits between 42 and 52 days on Net-30 terms. Digital agencies average 54 to 68 days due to creative scope approval delays. Heavy manufacturing and distribution median DSO spans 65 to 82 days due to OEM purchase order verification cycles.",
      },
    },
    {
      "@type": "Question",
      name: "How does autonomous AI reduce DSO by 15–25 days without damaging client relationships?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Human collectors are limited by manual call queues and often delay follow-ups out of fear of irritating clients. Jaktra uses Groq LLaMA 3.1 to automate a 5-Stage Tone Escalation curve (Warm Reminder → Firm Follow-Up → Serious Notice → Stern Warning → Legal Stop). Combined with instant dispute triage that pauses reminders when objections arise and tokenized zero-login payment links, Jaktra eliminates administrative latency without human friction.",
      },
    },
    {
      "@type": "Question",
      name: "How much working capital is released for every day of DSO reduction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The mathematical formula is: Working Capital Released = (Annual Credit Sales / 365) × DSO Reduction. For a $10M company, every single day of DSO compression pulls $27,397 forward from receivables directly into cash. Reducing DSO by 18 days releases $493,150 in liquid working capital while saving roughly $39,452 annually in credit line interest (at 8% WACC).",
      },
    },
  ],
};

export const manufacturingUseCaseSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Accounts Receivable Automation for Manufacturing & Supply Chain — Jaktra",
  description: "Accelerate cash flow in manufacturing. Resolve PO matching disputes, manage Net 60/90 terms, and eliminate receivables drag with autonomous AI dunning.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/use-cases/manufacturing`,
};

export const toneEscalationPlaybookSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The 5-Stage AR Tone Escalation Playbook: Psychology, Prompt Design & Compliance Stops",
  description: "A comprehensive guide on designing 5-stage accounts receivable escalation cadences that recover 85%+ of overdue invoices without destroying commercial customer relationships.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/resources/5-stage-ar-tone-escalation`,
};


export const zeroLoginPortalSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Tokenized Zero-Login Debtor Payment Portal Architecture — Jaktra",
  description: "Explore Jaktra's cryptographic zero-login debtor portal (/i/:token). Eliminate 70%+ customer portal drop-off with one-click statements, instant settlement, and self-service installment plans.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/features/zero-login-portal`,
};

export const emailDeliverabilitySchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Dunning Email Deliverability & Dead Letter Queue (DLQ) Resilience — Jaktra",
  description: "Protect your primary email domain reputation with Jaktra's Dead Letter Queue (DLQ), multi-provider failover (SendGrid, Resend, SMTP), and automated 3-drop circuit breakers.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/features/email-deliverability`,
};

export const riskScoringSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Predictive ML Accounts Receivable Delinquency Scoring — Jaktra",
  description: "Stratify overdue debtors with multi-feature ML risk scoring. Evaluate aging, dollar concentration, follow-up history, and payment velocity to prioritize high-risk collections.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/features/risk-scoring`,
};

export const paidniceCompareSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "PaidNice Alternative — Autonomous AI Tone Escalation vs Static Late Fee Penalties | Jaktra",
  description: "Compare PaidNice vs Jaktra. Learn why finance teams upgrade from PaidNice's punitive static late fees to Jaktra's autonomous Groq LLaMA 3.1 tone escalation, NLP dispute triage, and self-serve installment recovery.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/compare/paidnice-alternative`,
};

export const professionalServicesSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Accounts Receivable Automation for Professional Services & Legal — Jaktra",
  description: "Eliminate partner billing friction for law firms, consultancies, and accounting practices. Triage billable hours scope disputes, automate retainer top-ups, and accelerate cash flow with Jaktra.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/use-cases/professional-services`,
};

export const dunningTemplatesSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "B2B Dunning Email Templates & AI Tone Escalation Playbook — Jaktra",
  description: "10+ battle-tested B2B accounts receivable collection email templates across 5 escalation stages. Explore static templates alongside Groq LLaMA 3.1 generative prompt directives and compliance rules.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/resources/b2b-dunning-email-templates`,
};


export const constructionUseCaseSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Accounts Receivable Automation for Construction & Subcontractors — Jaktra",
  description: "Accelerate cash flow for commercial contractors and subcontractors. Automate progress billing reminders, triage change-order disputes, track retainage releases, and cut construction DSO with Jaktra.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/use-cases/construction`,
};


export const logisticsUseCaseSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Accounts Receivable Automation for Logistics, Freight & 3PLs — Jaktra",
  description: "Eliminate the freight working capital crunch. Automate shipper collection cadences, triage detention and accessorial disputes, cut freight factoring dependence, and accelerate cash flow with Jaktra.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/use-cases/logistics-freight`,
};


export const staffingUseCaseSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Accounts Receivable Automation for Staffing & Recruitment — Jaktra",
  description: "Bridge the weekly contractor payroll gap for staffing and recruitment agencies. Automate client collection cadences, triage timesheet disputes via AI, eliminate payroll factoring fees, and accelerate cash flow.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/use-cases/staffing-recruiting`,
};


export const wholesaleUseCaseSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Accounts Receivable Automation for Wholesale & Distribution — Jaktra",
  description: "Protect thin distributor margins. Automate retail and food service collection cadences, triage short-shipment and damaged pallet claims via AI, and accelerate working capital with Jaktra.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/use-cases/wholesale-distribution`,
};


export const roiCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "B2B Accounts Receivable Automation ROI & Working Capital Calculator — Jaktra",
  description: "Calculate your DSO reduction, working capital released, debt interest saved, and net 3-year ROI from automating accounts receivable collections with Jaktra.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/resources/ar-automation-roi-calculator`,
};

export const kollenoCompareSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Kolleno Alternative — Autonomous Conversational AI vs Manual Collector Task Lists | Jaktra",
  description: "Compare Kolleno vs Jaktra. Learn why finance teams choose Jaktra's autonomous Groq LLaMA 3.1 tone escalation and NLP dispute triage over Kolleno's manual collector task lists and multi-channel queues.",
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  datePublished: "2026-09-08",
  dateModified: "2026-09-08",
  mainEntityOfPage: `${SITE_URL}/compare/kolleno-alternative`,
};


export const compareHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  headline: "B2B Accounts Receivable Software Buyer's Guide & Alternatives Hub | Jaktra",
  description: "Compare the leading B2B accounts receivable automation and dunning software. In-depth architectural comparisons of Jaktra vs HighRadius, Upflow, Chaser, PaidNice, and Kolleno.",
  url: `${SITE_URL}/compare`,
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "HighRadius vs Jaktra", url: `${SITE_URL}/compare/highradius-vs-jaktra` },
      { "@type": "ListItem", position: 2, name: "Upflow Alternative", url: `${SITE_URL}/compare/upflow-alternative` },
      { "@type": "ListItem", position: 3, name: "Chaser Alternative", url: `${SITE_URL}/compare/chaser-alternative` },
      { "@type": "ListItem", position: 4, name: "PaidNice Alternative", url: `${SITE_URL}/compare/paidnice-alternative` },
      { "@type": "ListItem", position: 5, name: "Kolleno Alternative", url: `${SITE_URL}/compare/kolleno-alternative` },
    ],
  },
};

export const useCasesHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  headline: "B2B Accounts Receivable Industry Solutions & DSO Benchmarks | Jaktra",
  description: "Explore tailored AI accounts receivable automation solutions across core B2B industries. Learn how SaaS, agencies, manufacturing, construction, logistics, and staffing accelerate cash collections with Jaktra.",
  url: `${SITE_URL}/use-cases`,
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "B2B SaaS AR", url: `${SITE_URL}/use-cases/saas` },
      { "@type": "ListItem", position: 2, name: "Digital Agencies AR", url: `${SITE_URL}/use-cases/agencies` },
      { "@type": "ListItem", position: 3, name: "Manufacturing AR", url: `${SITE_URL}/use-cases/manufacturing` },
      { "@type": "ListItem", position: 4, name: "Professional Services AR", url: `${SITE_URL}/use-cases/professional-services` },
      { "@type": "ListItem", position: 5, name: "Construction AR", url: `${SITE_URL}/use-cases/construction` },
      { "@type": "ListItem", position: 6, name: "Logistics & Freight AR", url: `${SITE_URL}/use-cases/logistics-freight` },
      { "@type": "ListItem", position: 7, name: "Staffing & Recruiting AR", url: `${SITE_URL}/use-cases/staffing-recruiting` },
      { "@type": "ListItem", position: 8, name: "Wholesale & Distribution AR", url: `${SITE_URL}/use-cases/wholesale-distribution` },
    ],
  },
};

export const featuresHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  headline: "Autonomous AI Accounts Receivable Capabilities & Features — Jaktra",
  description: "Explore Jaktra's complete AR execution stack: 5-stage generative tone escalation, automated dispute reply triage, tokenized zero-login debtor portals, Dead Letter Queue resilience, and predictive ML risk scoring.",
  url: `${SITE_URL}/features`,
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "5-Stage Tone Escalation Engine", url: `${SITE_URL}/features/5-stage-escalation` },
      { "@type": "ListItem", position: 2, name: "AI Dispute Triage & Sentiment Analysis", url: `${SITE_URL}/features/dispute-triage` },
      { "@type": "ListItem", position: 3, name: "Structured Installment Plans", url: `${SITE_URL}/features/installment-plans` },
      { "@type": "ListItem", position: 4, name: "Tokenized Zero-Login Debtor Portal", url: `${SITE_URL}/features/zero-login-portal` },
      { "@type": "ListItem", position: 5, name: "Email Deliverability & DLQ Resilience", url: `${SITE_URL}/features/email-deliverability` },
      { "@type": "ListItem", position: 6, name: "Predictive ML Delinquency Risk Scoring", url: `${SITE_URL}/features/risk-scoring` },
    ],
  },
};

export const resourcesHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  headline: "B2B Accounts Receivable Guides, Tools & Research — Jaktra",
  description: "Free, research-backed guides, financial models, and operational playbooks for CFOs, Controllers, and AR teams to accelerate cash flow and reduce DSO.",
  url: `${SITE_URL}/resources`,
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "How to Reduce DSO Guide", url: `${SITE_URL}/resources/how-to-reduce-dso` },
      { "@type": "ListItem", position: 2, name: "5-Stage AR Tone Escalation Playbook", url: `${SITE_URL}/resources/5-stage-ar-tone-escalation` },
      { "@type": "ListItem", position: 3, name: "B2B Dunning Email Templates", url: `${SITE_URL}/resources/b2b-dunning-email-templates` },
      { "@type": "ListItem", position: 4, name: "AR Automation ROI Calculator", url: `${SITE_URL}/resources/ar-automation-roi-calculator` },
    ],
  },
};
