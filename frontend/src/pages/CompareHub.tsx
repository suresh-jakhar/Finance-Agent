import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Shield, Layers, ChevronDown, Check, Scale, ExternalLink } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { compareHubSchema, breadcrumbSchema } from "../components/common/seo-schemas";
import { LandingFooter } from "../components/landing/LandingFooter";

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
          <Link to="/use-cases" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Industries
          </Link>
          <Link to="/features/5-stage-escalation" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Tone Escalation
          </Link>
          <Link to="/resources/how-to-reduce-dso" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            DSO Guide
          </Link>
          <Link
            to="/login"
            className="text-xs sm:text-sm text-zinc-300 hover:text-white transition-colors"
          >
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

interface CompetitorCard {
  name: string;
  url: string;
  hasDedicatedPage?: boolean;
  category: "direct" | "portal" | "enterprise";
  bestFor: string;
  jaktraAdvantage: string;
  setupTime: string;
  pricing: string;
}

const COMPETITORS: CompetitorCard[] = [
  // Direct AI & Dunning Agents
  {
    name: "Upflow",
    url: "/compare/upflow-alternative",
    hasDedicatedPage: true,
    category: "direct",
    bestFor: "Mid-market B2B finance teams seeking scheduled email workflow templates.",
    jaktraAdvantage: "Groq LLaMA 3.1 autonomous tone escalation vs static email templates; automated dispute triage.",
    setupTime: "1 to 2 weeks vs 15 minutes",
    pricing: "Custom quote vs 100% Free Early Access",
  },
  {
    name: "Chaser",
    url: "/compare/chaser-alternative",
    hasDedicatedPage: true,
    category: "direct",
    bestFor: "SMEs wanting scheduled invoice reminders and manual phone call tracking.",
    jaktraAdvantage: "Autonomous conversational AI execution agent vs manual call schedule lists.",
    setupTime: "1 to 3 days vs 15 minutes",
    pricing: "Per-invoice volume scaling vs 100% Free Early Access",
  },
  {
    name: "PaidNice",
    url: "/compare/paidnice-alternative",
    hasDedicatedPage: true,
    category: "direct",
    bestFor: "Small businesses using Xero or QuickBooks wanting late fee penalties.",
    jaktraAdvantage: "Generative tone escalation & dispute resolution rather than punitive late fees that hurt client goodwill.",
    setupTime: "1 day vs 15 minutes",
    pricing: "Tiered pricing vs 100% Free Early Access",
  },
  {
    name: "Kolleno",
    url: "/compare/kolleno-alternative",
    hasDedicatedPage: true,
    category: "direct",
    bestFor: "Mid-market teams wanting omnichannel task queues for human credit controllers.",
    jaktraAdvantage: "Fully autonomous execution agent (no manual calling required) with zero-login debtor links.",
    setupTime: "2 to 4 weeks vs 15 minutes",
    pricing: "$6,000 to $15,000+/yr vs 100% Free Early Access",
  },

  // Billing Portals & Cash Forecasting
  {
    name: "Invoiced",
    url: "/register",
    hasDedicatedPage: false,
    category: "portal",
    bestFor: "Companies needing a complete customer billing portal and recurring subscription billing.",
    jaktraAdvantage: "Zero-login payment links (/i/:token) that eliminate buyer password friction and lift portal adoption.",
    setupTime: "3 to 6 weeks vs 15 minutes",
    pricing: "$12,000+/yr contracts vs 100% Free Early Access",
  },
  {
    name: "Gaviti",
    url: "/register",
    hasDedicatedPage: false,
    category: "portal",
    bestFor: "Credit teams wanting centralized collector task management and DSO reporting.",
    jaktraAdvantage: "Eliminates collector task lists entirely by autonomously executing collections communication.",
    setupTime: "3 to 6 weeks vs 15 minutes",
    pricing: "$10,000 to $25,000+/yr vs 100% Free Early Access",
  },
  {
    name: "Tesorio",
    url: "/register",
    hasDedicatedPage: false,
    category: "portal",
    bestFor: "Finance leaders wanting 13-week direct cash flow forecasting linked to NetSuite/Workday.",
    jaktraAdvantage: "Focused on tactical collection execution and debt recovery rather than cash forecasting models.",
    setupTime: "4 to 8 weeks vs 15 minutes",
    pricing: "$20,000+/yr contracts vs 100% Free Early Access",
  },
  {
    name: "Quadient YayPay",
    url: "/register",
    hasDedicatedPage: false,
    category: "portal",
    bestFor: "Mid-market enterprises with legacy ERPs needing credit scoring and buyer portals.",
    jaktraAdvantage: "Cloud-native 15-minute setup with Groq LLaMA 3.1 tone escalation vs heavy legacy middleware.",
    setupTime: "2 to 4 months vs 15 minutes",
    pricing: "$15,000 to $35,000+/yr vs 100% Free Early Access",
  },

  // Enterprise O2C, Networks & Treasury
  {
    name: "HighRadius",
    url: "/compare/highradius-vs-jaktra",
    hasDedicatedPage: true,
    category: "enterprise",
    bestFor: "Global 2000 enterprises needing bank lockbox check OCR and SAP deduction clearing.",
    jaktraAdvantage: "Focused autonomous collections agent with 15-minute setup vs multi-quarter enterprise O2C consulting.",
    setupTime: "6 to 9 months vs 15 minutes",
    pricing: "$50,000 to $150,000+/yr vs 100% Free Early Access",
  },
  {
    name: "Billtrust",
    url: "/register",
    hasDedicatedPage: false,
    category: "enterprise",
    bestFor: "Large distributors processing heavy lockbox checks and supplier payment networks.",
    jaktraAdvantage: "Eliminates network registration friction via tokenized zero-login links with direct Razorpay virtual accounts.",
    setupTime: "4 to 8 months vs 15 minutes",
    pricing: "$30,000 to $80,000+/yr vs 100% Free Early Access",
  },
  {
    name: "Versapay",
    url: "/register",
    hasDedicatedPage: false,
    category: "enterprise",
    bestFor: "B2B suppliers looking for collaborative buyer-seller portal networks.",
    jaktraAdvantage: "Zero-login debtor links prevent low buyer adoption; zero network transaction processing markups.",
    setupTime: "3 to 6 months vs 15 minutes",
    pricing: "$15,000 to $35,000+/yr + transaction fees vs 100% Free Early Access",
  },
  {
    name: "Sidetrade",
    url: "/register",
    hasDedicatedPage: false,
    category: "enterprise",
    bestFor: "Global 2000 enterprise credit departments running cross-entity predictive scoring (Aimie AI).",
    jaktraAdvantage: "Autonomous conversational AI execution without massive data lake warehousing projects.",
    setupTime: "6 to 9 months vs 15 minutes",
    pricing: "$30,000 to $75,000+/yr vs 100% Free Early Access",
  },
  {
    name: "Emagia",
    url: "/register",
    hasDedicatedPage: false,
    category: "enterprise",
    bestFor: "Shared service centers running enterprise SAP/Oracle ERPs needing Gia AI worklists.",
    jaktraAdvantage: "Autonomous Groq LLaMA 3.1 tone escalation (no collector calling) with 15-minute self-serve setup.",
    setupTime: "4 to 8 months vs 15 minutes",
    pricing: "$40,000 to $100,000+/yr vs 100% Free Early Access",
  },
  {
    name: "Serrala",
    url: "/register",
    hasDedicatedPage: false,
    category: "enterprise",
    bestFor: "Multinational corporate treasuries requiring on-premise SAP ABAP cash application.",
    jaktraAdvantage: "Cloud-native conversational AI agent without SAP ABAP transports or systems integrators.",
    setupTime: "6 to 12 months vs 15 minutes",
    pricing: "$50,000 to $150,000+/yr vs 100% Free Early Access",
  },
  {
    name: "BlackLine",
    url: "/register",
    hasDedicatedPage: false,
    category: "enterprise",
    bestFor: "Corporate controllers managing month-end financial close and balance sheet substantiation.",
    jaktraAdvantage: "Focused on debtor collections execution rather than accounting close transformation.",
    setupTime: "4 to 9 months vs 15 minutes",
    pricing: "$35,000 to $90,000+/yr vs 100% Free Early Access",
  },
];

export default function CompareHub() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "direct" | "portal" | "enterprise">("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredCompetitors = selectedCategory === "all"
    ? COMPETITORS
    : COMPETITORS.filter((c) => c.category === selectedCategory);

  const faqs = [
    {
      q: "How does Jaktra differ fundamentally from legacy accounts receivable software?",
      a: "Legacy AR software operates either as a scheduled template runner (sending identical, robotic dunning emails at fixed intervals) or as a task list generator (telling human collectors who to phone each day). Jaktra is an autonomous AI collections execution agent. Powered by Groq LLaMA 3.1, Jaktra personalizes and modulates tone across 5 stages, automatically triages inbound dispute replies, and provides tokenized zero-login settlement links (/i/:token) that allow 30-second payment without account friction.",
    },
    {
      q: "When should a company choose an enterprise suite (like HighRadius or Serrala) over Jaktra?",
      a: "If your organization is a Fortune 500 conglomerate with thousands of daily physical check lockboxes requiring optical character recognition (OCR), complex SAP deduction clearing workflows, or multi-bank SWIFT/EBICS treasury management, an enterprise suite like HighRadius or Serrala is designed for your needs. If your primary bottleneck is collecting overdue invoices from B2B customers without hiring an agency or embarking on a 6-month IT project, Jaktra delivers faster ROI.",
    },
    {
      q: "Why do debtor payment links perform better than customer portals?",
      a: "Customer portals (used by platforms like Versapay, Invoiced, and YayPay) require your clients' accounts payable clerks to register accounts, remember passwords, and navigate unfamiliar dashboards. Consequently, buyer portal adoption is notoriously low (often under 25%). Jaktra uses cryptographically tokenized links (/i/:token) embedded directly in emails. Debtors can review invoices and pay via Razorpay virtual accounts in 30 seconds with zero login friction.",
    },
    {
      q: "Can Jaktra integrate with existing accounting and email systems?",
      a: "Yes. Jaktra integrates with your transactional email provider (SendGrid, Resend, or custom SMTP) with credentials encrypted via AES-256-GCM. Invoices can be imported via CSV or REST API, and payments are auto-reconciled via Razorpay webhooks.",
    },
    {
      q: "What is Jaktra's pricing model compared to competitor annual contracts?",
      a: "Most B2B AR platforms require annual contracts ranging from $10,000 to $100,000+/year plus mandatory setup fees. Jaktra is completely free during our public Early Access program with zero setup fees, no artificial invoice limits, and no credit card required.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-purple-500/30 selection:text-white">
      <SEOHead
        title="B2B Accounts Receivable Software Buyer's Guide & Alternatives Hub | Jaktra"
        description="Compare the leading B2B accounts receivable automation and dunning software. In-depth architectural comparisons of Jaktra vs HighRadius, Upflow, Chaser, Invoiced, Kolleno, Billtrust, and more."
        canonicalPath="/compare"
        jsonLd={[
          compareHubSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Software Comparisons", path: "/compare" },
          ]),
        ]}
      />

      <HeaderNav />

      <main className="pt-24 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="max-w-6xl mx-auto px-6 mb-6">
          <nav className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <Link to="/" className="hover:text-zinc-200 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-purple-400">Software Comparisons & Alternatives</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 pt-6 pb-12 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-6">
            <Scale className="w-3.5 h-3.5" />
            B2B Accounts Receivable Software Buyer's Guide
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Find the right AR platform. <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              Without the vendor marketing spin.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-400 max-w-3xl mb-8 leading-relaxed">
            Every accounts receivable vendor claims to use "AI" and "automate collections." Here is an objective, architectural breakdown of the 15 leading platforms—evaluating implementation complexity, debtor payment friction, and true autonomous execution.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-white text-zinc-950 font-semibold"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              All Platforms ({COMPETITORS.length})
            </button>
            <button
              onClick={() => setSelectedCategory("direct")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === "direct"
                  ? "bg-purple-600 text-white font-semibold"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              Modern Dunning & AI Agents (4)
            </button>
            <button
              onClick={() => setSelectedCategory("portal")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === "portal"
                  ? "bg-purple-600 text-white font-semibold"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              Portals & Task Queues (4)
            </button>
            <button
              onClick={() => setSelectedCategory("enterprise")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === "enterprise"
                  ? "bg-purple-600 text-white font-semibold"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              Enterprise O2C & Treasury Suites (7)
            </button>
          </div>
        </section>

        {/* Competitor Grid Section */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompetitors.map((comp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between hover:border-purple-500/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 uppercase tracking-wider">
                      {comp.category === "direct" ? "AI Dunning Agent" : comp.category === "portal" ? "Portal & Tasks" : "Enterprise Suite"}
                    </span>
                    {comp.hasDedicatedPage ? (
                      <span className="text-xs font-mono text-purple-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Read comparison <ArrowRight className="w-3 h-3" />
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Direct Alternative <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {comp.name} vs. Jaktra
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider">When to choose {comp.name}:</p>
                      <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{comp.bestFor}</p>
                    </div>

                    <div>
                      <p className="text-[11px] font-mono uppercase text-purple-400 tracking-wider">Why choose Jaktra:</p>
                      <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">{comp.jaktraAdvantage}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mt-auto">
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-4 text-zinc-400">
                    <div>
                      <span className="text-zinc-500 block">Setup Time:</span>
                      <span className="text-white">{comp.setupTime}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">Pricing Model:</span>
                      <span className="text-emerald-400">{comp.pricing}</span>
                    </div>
                  </div>

                  {comp.hasDedicatedPage ? (
                    <Link
                      to={comp.url}
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-purple-600 hover:text-white text-xs font-medium text-zinc-300 transition-all border border-white/10 hover:border-purple-500"
                    >
                      View in-depth analysis
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <Link
                      to="/register"
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-emerald-600 hover:text-white text-xs font-medium text-zinc-300 transition-all border border-white/10 hover:border-emerald-500"
                    >
                      Get started free
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3 Core Architectures Comparison Section */}
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Understanding the 3 Architectural Categories
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Before evaluating software features, identify which architectural model matches your operational bottleneck.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-purple-950/20 border border-purple-500/30">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Autonomous AI Execution</h3>
              <p className="text-xs font-mono text-purple-300 mb-3">Jaktra Model</p>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                AI acts as an autonomous agent that modulates email tone across 5 stages, triages inbound disputes, and executes collections end-to-end. Built for companies that want overdue cash collected without hiring human collectors.
              </p>
              <ul className="space-y-1.5 text-xs text-zinc-400 border-t border-white/10 pt-3">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> 15-minute cloud setup</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Zero debtor login friction</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> 100% Free during Early Access</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Customer Portals & Task Lists</h3>
              <p className="text-xs font-mono text-blue-300 mb-3">Invoiced, Gaviti, YayPay Model</p>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Focuses on self-service customer billing portals and task queues that tell human collectors who to call each day. Good for companies with established credit departments that want central task logs.
              </p>
              <ul className="space-y-1.5 text-xs text-zinc-400 border-t border-white/10 pt-3">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-400" /> 2 to 6 week setup</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-400" /> Comprehensive portal dashboards</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-400" /> $10k–$25k/yr contracts</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Enterprise O2C & Treasury</h3>
              <p className="text-xs font-mono text-amber-300 mb-3">HighRadius, Serrala, BlackLine Model</p>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Deeply integrated suites for Fortune 500 multinationals running SAP or Oracle. Handles physical check lockbox OCR, multi-bank SWIFT/EBICS treasury, and complex balance sheet substantiation.
              </p>
              <ul className="space-y-1.5 text-xs text-zinc-400 border-t border-white/10 pt-3">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400" /> 6 to 12 month implementation</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400" /> Heavy ERP cash application</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400" /> $50k–$150k+/yr licensing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-white/10">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Frequently Asked Questions: Choosing an AR Platform
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Key considerations for CFOs, Controllers, and Credit Managers evaluating software alternatives.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-white/10 rounded-lg overflow-hidden bg-zinc-900/30"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between text-sm font-medium text-white hover:bg-white/5 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      openFaq === idx ? "rotate-180 text-purple-400" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-purple-900/20 via-zinc-900 to-black border border-purple-500/20 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
              Try autonomous AI collections free today.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto mb-8">
              Skip the multi-month sales demo and systems integration cycle. Connect your transactional email in 15 minutes and start recovering overdue receivables today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-zinc-950 px-8 py-3.5 rounded-lg font-medium text-sm hover:bg-zinc-200 transition-colors shadow-lg"
              >
                Start collecting free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/10 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-8 py-3.5 rounded-lg font-medium text-sm transition-colors"
              >
                View transparent pricing
              </Link>
            </div>
            <p className="text-xs text-zinc-500 mt-4">
              100% Free Early Access • Deploy in 15 minutes • No credit card required
            </p>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
