import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, ChevronDown, Sparkles, ShieldCheck, Zap, Bot, CreditCard, Split } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { paidniceCompareSchema, breadcrumbSchema } from "../components/common/seo-schemas";

function HeaderNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#010102]/85 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-decoration-none">
          <img src={jaktraLogo} alt="Jaktra" width={24} height={24} className="h-6 w-6 block" />
          <span className="font-semibold text-white text-lg tracking-tight font-sans">Jaktra</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/pricing" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Pricing
          </Link>
          <Link to="/features/5-stage-escalation" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Tone Escalation
          </Link>
          <Link to="/features/installment-plans" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Installments
          </Link>
          <Link to="/docs" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Docs
          </Link>
          <Link to="/login" className="text-sm text-zinc-300 hover:text-white transition-colors">
            Sign in
          </Link>
          <Link
            to="/register"
            className="text-xs sm:text-sm font-medium bg-white text-zinc-950 px-3.5 py-1.5 rounded-md hover:bg-zinc-200 transition-colors shadow-sm"
          >
            Get started free
          </Link>
        </div>
      </div>
    </header>
  );
}

interface ComparisonRow {
  feature: string;
  category: string;
  paidNice: string;
  jaktra: string;
  highlight?: boolean;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: "Core Recovery Philosophy",
    category: "Philosophy",
    paidNice: "Punitive late fees & interest penalties added to invoice",
    jaktra: "Autonomous generative tone escalation & installment plans",
    highlight: true,
  },
  {
    feature: "Dunning Communication Engine",
    category: "Messaging",
    paidNice: "Static email templates with fee line items",
    jaktra: "Groq LLaMA 3.1 generative tone modulation across 5 stages",
    highlight: true,
  },
  {
    feature: "Dispute Reply Handling",
    category: "Workflow",
    paidNice: "Manual email monitoring; fee continues compounding",
    jaktra: "NLP DisputeAgent auto-classifies replies & halts cadences",
    highlight: true,
  },
  {
    feature: "At-Risk Account Flexibility",
    category: "Flexibility",
    paidNice: "Demands full balance plus accrued late penalties",
    jaktra: "Tokenized debtor portal with self-serve 2x/3x/4x installment splits",
    highlight: true,
  },
  {
    feature: "Regulatory & Compliance Safety",
    category: "Compliance",
    paidNice: "No automated stop; continues charging interest",
    jaktra: "Hardcoded Stage 5 Legal Stop at 31+ days overdue",
    highlight: true,
  },
  {
    feature: "Email Delivery Resilience",
    category: "Infrastructure",
    paidNice: "Basic SMTP / Xero email relay",
    jaktra: "Dead Letter Queue (DLQ) with 3-drop circuit breaker & 20h guard",
    highlight: false,
  },
  {
    feature: "Debtor Payment Experience",
    category: "Payments",
    paidNice: "Standard payment processor redirect",
    jaktra: "Zero-login cryptographic portal (`/i/:token`) with Razorpay webhooks",
    highlight: false,
  },
  {
    feature: "Pricing Model",
    category: "Pricing",
    paidNice: "Paid-only subscription ($49–$199+/mo)",
    jaktra: "100% Free during Early Access (No credit card required)",
    highlight: false,
  },
];

export function PaidNiceCompare() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Why do B2B finance teams look for an alternative to PaidNice?",
      a: "PaidNice's primary mechanism is automatically calculating and adding late payment fees and interest to invoices in Xero or QuickBooks. In business-to-business commerce, slapping late fees on enterprise clients, long-standing partners, or distributor accounts often triggers angry billing disputes, stalls principal recovery, and burns client goodwill. Finance teams switch to Jaktra to replace punitive fees with intelligent tone escalation and constructive installment options.",
    },
    {
      q: "How does Jaktra recover overdue receivables without adding late fees?",
      a: "Rather than creating animosity with late fee penalties, Jaktra uses Groq LLaMA 3.1 to modulate tone dynamically across 5 stages—starting with cordial, collaborative check-ins that assume accidental oversight, and gradually escalating urgency based on aging and risk score. If a client is cash-constrained, Jaktra lets them split the invoice into structured installments via their secure debtor portal.",
    },
    {
      q: "What happens when a customer replies with a billing dispute?",
      a: "With PaidNice, automated fee compounding and dunning rules continue firing unless someone manually removes the invoice from the sequence. In Jaktra, our NLP DisputeAgent analyzes incoming replies in real time: the moment a customer questions a charge, dunning cadences halt immediately and an AI-drafted resolution response is generated for human review.",
    },
    {
      q: "How does Jaktra ensure compliance with debt collection regulations?",
      a: "Continuing to blast automated dunning past 30 days overdue creates severe regulatory harassment risks. Jaktra hardcodes a Stage 5 Legal Stop (`backend/src/modules/agent/agent.service.ts`) that strictly terminates automated messaging after 30 days overdue, mandating human executive authorization.",
    },
    {
      q: "Can I try Jaktra alongside our current accounting software?",
      a: "Yes. You can import your accounts receivable ledger via CSV or connect directly via API/Razorpay in under 15 minutes. Jaktra is 100% free during Early Access with zero credit card required and no invoice limits.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-white">
      <SEOHead
        title="PaidNice Alternative — Autonomous AI Tone Escalation vs Static Late Fees | Jaktra"
        description="Compare PaidNice vs Jaktra. Learn why finance teams upgrade from PaidNice's punitive static late fees to Jaktra's autonomous Groq LLaMA 3.1 tone escalation, NLP dispute triage, and self-serve installment recovery."
        canonicalPath="/compare/paidnice-alternative"
        jsonLd={[
          paidniceCompareSchema,
          breadcrumbSchema([
            { name: "Compare", path: "/compare/upflow-alternative" },
            { name: "PaidNice Alternative", path: "/compare/paidnice-alternative" },
          ]),
        ]}
      />

      <HeaderNav />

      <main className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-zinc-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="hover:text-zinc-300 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <span className="text-zinc-400">Compare</span>
            </li>
            <li>/</li>
            <li className="text-zinc-300 font-medium" aria-current="page">
              PaidNice Alternative
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-300 text-xs font-medium mb-4">
            <Bot className="w-3.5 h-3.5" />
            <span>Autonomous AI Tone Escalation vs. Punitive Late Fee Penalties</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            The Modern Alternative to PaidNice
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            In B2B commerce, slapping automated late fees on key clients destroys goodwill and sparks billing disputes.
            Jaktra replaces punitive penalties with Groq LLaMA 3.1 generative tone escalation, automated dispute triage,
            and self-serve installment recovery.
          </p>
        </div>

        {/* 3 Core Conceptual Differences */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-base font-bold text-white mb-2">Generative Tone vs. Penalty Math</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              PaidNice relies on static late fee percentages and compounding interest. Jaktra uses Groq LLaMA 3.1 to modulate
              tone dynamically across 5 stages, motivating settlement while protecting customer goodwill.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <Split className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-base font-bold text-white mb-2">Installment Plans vs. Full Demands</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              When cash-constrained clients face punitive late fees, they often default or ghost. Jaktra provides self-serve
              installment plans via zero-login portals (`/i/:token`), turning potential bad debt into steady cash flow.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-base font-bold text-white mb-2">Dispute Triage & Legal Stops</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              PaidNice continues compounding interest even if an invoice is disputed. Jaktra automatically freezes cadences
              on customer inquiries and enforces a hardcoded Stage 5 Legal Stop at 31+ days overdue.
            </p>
          </div>
        </section>

        {/* Detailed Feature Comparison Matrix */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Head-to-Head Comparison: PaidNice vs. Jaktra
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto">
              Compare architectural scope, recovery mechanisms, and customer experience side by side.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/60 text-zinc-400">
                    <th className="py-4 px-6 font-semibold">Capability</th>
                    <th className="py-4 px-6 font-semibold w-1/3">PaidNice</th>
                    <th className="py-4 px-6 font-semibold w-1/3 text-white bg-blue-500/5 border-l border-blue-500/20">
                      Jaktra (Autonomous AI)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {COMPARISON_DATA.map((row, idx) => (
                    <tr
                      key={idx}
                      className={row.highlight ? "bg-zinc-900/20 hover:bg-zinc-800/30" : "hover:bg-zinc-900/40"}
                    >
                      <td className="py-4 px-6 font-medium text-white">
                        <div>{row.feature}</div>
                        <div className="text-[11px] text-zinc-500 font-mono mt-0.5">{row.category}</div>
                      </td>
                      <td className="py-4 px-6 text-zinc-400">{row.paidNice}</td>
                      <td className="py-4 px-6 text-zinc-200 bg-blue-500/5 border-l border-blue-500/20">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{row.jaktra}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 3 Core Differentiator Deep Dives */}
        <section className="space-y-12 mb-20">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              1. The Flaw of Automated Late Fees in B2B Commerce
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              In enterprise contracting, buyers have established payment terms (Net 30/60) and strict approval cycles.
              When an automated tool adds a $150 late fee to an overdue invoice, accounts payable systems reject the invoice
              because the total no longer matches their approved Purchase Order (PO). This creates administrative gridlock,
              forcing human account executives to apologize and issue credit notes. Jaktra uses respectful, generative tone
              escalation that inspires urgent payment without breaking PO matching.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <CreditCard className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              2. Zero-Login Tokenized Debtor Portals
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              PaidNice redirects debtors to standard payment links or requests manual bank wire confirmation. Jaktra
              generates secure cryptographic debtor portal links (`/i/:token`). Debtors review itemized statements,
              select installment plans, and pay instantly via Razorpay (UPI, NetBanking, Cards) with immediate webhook
              ledger reconciliation.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              3. Dead Letter Queue & Domain Sender Reputation Protection
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Traditional dunning tools send emails through basic relays without bounce management. Jaktra incorporates
              a real-time Dead Letter Queue (`backend/src/modules/dlq/`) with exponential backoff retries and an automated
              3-drop circuit breaker that halts outreach before invalid addresses can trigger spam blacklist penalties.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden transition-colors hover:border-zinc-700"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-medium text-white focus:outline-none"
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-blue-950/40 to-purple-950/30 p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Upgrade from Punitive Late Fees to Autonomous AI Collections
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-6">
            Get paid faster while preserving client relationships. Set up Jaktra in 15 minutes with our 100% Free Early Access.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-200 transition-colors shadow-lg"
          >
            <span>Get started free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 px-6 text-xs text-zinc-500 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© 2026 Jaktra. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <Link to="/pricing" className="hover:text-zinc-300 transition-colors">
            Pricing
          </Link>
          <Link to="/compare/upflow-alternative" className="hover:text-zinc-300 transition-colors">
            Upflow Alternative
          </Link>
          <Link to="/compare/chaser-alternative" className="hover:text-zinc-300 transition-colors">
            Chaser Alternative
          </Link>
          <Link to="/privacy" className="hover:text-zinc-300 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-zinc-300 transition-colors">
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
}
