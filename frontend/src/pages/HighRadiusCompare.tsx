import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, ChevronDown, Cpu, ShieldCheck } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { highRadiusCompareSchema, breadcrumbSchema } from "../components/common/seo-schemas";

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

export function HighRadiusCompare() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is Jaktra a complete replacement for HighRadius?",
      a: "No, and we are deliberate about that distinction. HighRadius is a comprehensive enterprise Order-to-Cash (O2C) suite built for Fortune 500 multinationals that need bank lockbox paper check scanning (OCR), EDI 820 feeds, retail deduction clearing, and deep SAP/Oracle integrations. Jaktra is an autonomous AI accounts receivable collections and dunning agent. If your company is evaluating HighRadius primarily to solve overdue invoice chasing, reduce DSO, and automate polite dunning, Jaktra is the focused, right-sized alternative for that specific workflow—deployable in 15 minutes without enterprise consultants.",
    },
    {
      q: "How does Jaktra relate to HighRadius?",
      a: "Jaktra relates to HighRadius in two distinct ways: (1) As a lightweight, accessible alternative for collections: mid-market and SaaS finance teams that don't need a $50,000+ O2C suite can solve the collections bottleneck directly with Jaktra. (2) As an autonomous AI execution layer: while HighRadius Collections generates static worklists for human collectors to make manual calls, Jaktra autonomously generates tone-modulated emails across 5 stages, triages dispute replies via NLP, and collects digital payments via tokenized debtor portals.",
    },
    {
      q: "How does Jaktra's AI differ from HighRadius's machine learning?",
      a: "HighRadius uses predictive machine learning to score account delinquency and rank work queues for human collectors. Jaktra combines predictive ML risk scoring (analyzing historical payment rates, days overdue, and follow-up counts) with generative AI execution: it uses Groq LLaMA 3.1 to dynamically craft context-aware debtor communications across a 5-stage tone escalation matrix, automatically parses incoming dispute sentiment, and halts cadences when disputes arise.",
    },
    {
      q: "When should an organization choose HighRadius over Jaktra?",
      a: "Choose HighRadius if you are a multi-billion-dollar enterprise with on-premise SAP or Oracle ERPs, process physical paper checks sent to bank lockboxes requiring OCR cash application, or manage complex consumer-goods deduction claims from retailers like Walmart or Target.",
    },
    {
      q: "When should an organization choose Jaktra?",
      a: "Choose Jaktra if you run a B2B SaaS, digital agency, or growing mid-market business with 50 to 5,000 open invoices monthly, want an intelligent collections cadence running today without IT implementation fees, and want to get started with 100% Free Early Access.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-white">
      <SEOHead
        title="HighRadius vs Jaktra — Enterprise O2C Suite vs Focused AI Collections Agent"
        description="Comparing HighRadius and Jaktra? Learn why Jaktra is not a complete O2C suite replacement, but a focused, autonomous AI collections agent built for fast deployment and high recovery."
        canonicalPath="/compare/highradius-vs-jaktra"
        jsonLd={[
          highRadiusCompareSchema,
          breadcrumbSchema([
            { name: "Compare", path: "/compare/highradius-vs-jaktra" },
            { name: "HighRadius vs Jaktra", path: "/compare/highradius-vs-jaktra" },
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
              HighRadius vs Jaktra
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-300 text-xs font-medium mb-4">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>Architecture & Scope Analysis</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            HighRadius vs. Jaktra: Enterprise O2C Suite vs. Focused AI Collections Agent
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            HighRadius is a full-scale Order-to-Cash ERP suite built for Fortune 500 back-offices. Jaktra is an
            autonomous AI collections agent built for fast-moving finance teams. Here is how to evaluate the right
            architecture for your exact operational bottleneck.
          </p>
        </div>

        {/* Setting the Record Straight */}
        <section className="mb-16 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            Setting the Record Straight: What Jaktra Is (and Is Not) to HighRadius
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mb-6 leading-relaxed">
            Many financial software comparisons make sweeping claims that one tool replaces another. In financial
            architecture, clarity is essential. Jaktra is <strong>not a complete HighRadius replacement</strong>, and
            understanding why will help you choose the right tool for your company.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-zinc-400 leading-relaxed">
            <div className="border-t border-zinc-800 pt-4">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-500" />
                What HighRadius Is: Full-Scale Enterprise O2C
              </h3>
              <p>
                HighRadius automates the broad Order-to-Cash spectrum: credit risk underwriting, bank lockbox paper check
                scanning (OCR cash matching), deduction clearing for consumer goods vendors (Walmart/Target chargebacks),
                and complex SAP S/4HANA integrations. It requires multi-month IT rollouts and six-figure annual contract
                floors.
              </p>
            </div>
            <div className="border-t border-blue-500/30 pt-4">
              <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                What Jaktra Is: Dedicated Autonomous Collections
              </h3>
              <p>
                Jaktra solves the <strong>overdue invoice collection and dunning bottleneck</strong>. Instead of forcing
                you into an entire back-office suite, Jaktra deploys an autonomous AI agent with 5-stage generative tone
                escalation (Groq LLaMA 3.1), inbound dispute sentiment triage, Dead Letter Queue reliability, and
                tokenized Razorpay settlement—active in 15 minutes.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-4">Functional & Architectural Comparison</h2>
          <p className="text-center text-sm text-zinc-400 mb-8 max-w-2xl mx-auto">
            Compare functional scope, implementation timelines, and operating models objectively.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/80">
                  <th className="py-4 px-6 text-zinc-400 font-semibold">Evaluation Criteria</th>
                  <th className="py-4 px-6 text-blue-400 font-bold bg-blue-950/20">Jaktra</th>
                  <th className="py-4 px-6 text-zinc-400 font-semibold">HighRadius</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Core Functional Scope</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10">
                    Autonomous AR Collections, Dunning, Dispute Triage & Digital Payment Portals
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Full Order-to-Cash Suite (Credit, Lockbox, Invoicing, Deductions, Collections)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Deployment Timeline</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Under 15 minutes (CSV or REST API)</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">3 to 9 months (Requires systems integration partner)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Pricing Model</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10">
                    100% Free during Early Access (No credit card required)
                  </td>
                  <td className="py-4 px-6 text-zinc-400">$50k–$100k+ annual floor + professional consulting fees</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Collections Execution Model</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10">
                    Autonomous Generative AI Agent (Groq LLaMA 3.1 5-stage tone escalation)
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Prioritized call and task lists assigned to manual human collectors</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Inbound Dispute Handling</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10">
                    NLP sentiment triage; auto-pauses cadences; drafts suggested response
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Enterprise deduction coding module for supply chain chargebacks</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Debtor Settlement Flow</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10">
                    Tokenized link (`/i/:token`) with instant digital pay & payment plans
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Enterprise customer portal with username/password logins</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Bank Lockbox Paper Check OCR</td>
                  <td className="py-4 px-6 text-zinc-500 bg-blue-950/10">Not supported (Focuses strictly on digital settlement)</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium">Deep OCR lockbox check scanning & cash application</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Harassment & Compliance Guard</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>20-Hour Idempotency Guard + Stage 5 Legal Stop</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Dependent on human collector compliance with dialer queues</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Objective Decision Guide */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h3 className="text-base font-semibold text-zinc-300 mb-3">When HighRadius is the Necessary Choice</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-zinc-500 font-mono">•</span>
                <span>You are a multi-billion-dollar enterprise running on-premise SAP or Oracle ERPs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-500 font-mono">•</span>
                <span>You receive large volumes of physical paper checks into bank lockboxes that need OCR cash matching.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-500 font-mono">•</span>
                <span>You supply big-box retailers (Walmart, Target) and require deduction resolution for freight and inventory claims.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-500 font-mono">•</span>
                <span>You have a dedicated team of full-time collections agents who need dialer-integrated call queues.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-blue-500/30 bg-blue-950/10 p-6">
            <h3 className="text-base font-semibold text-blue-300 mb-3">When Jaktra is the Right Architectural Fit</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Your specific operational bottleneck is overdue invoice collection and reducing Days Sales Outstanding (DSO).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>You want an autonomous agent that modulates tone across 5 stages without annoying clients or requiring human callers.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>You need an active, working solution today without paying $50,000+ or waiting months for IT systems integrators.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>You want zero-login tokenized payment portals where debtors can pay immediately or select installment plans.</span>
              </li>
            </ul>
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
        <section className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-blue-950/40 to-indigo-950/30 p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Accelerate Cash Flow with Focused AI Automation
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-6">
            Stop waiting months for enterprise rollouts. Start collecting overdue receivables autonomously today with
            Jaktra.
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
