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
    "Automate B2B accounts receivable with AI-powered 5-stage tone escalation, dispute triage, installment plans, and multi-channel follow-up. Free tier available.",
  offers: {
    "@type": "Offer",
    name: "Free",
    price: "0",
    priceCurrency: "USD",
    description: "Up to 10 invoices, 1 user — forever free",
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
