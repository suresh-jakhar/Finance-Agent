import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Factory, ShieldCheck, Clock, FileSpreadsheet, Calculator } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { manufacturingUseCaseSchema, breadcrumbSchema } from "../components/common/seo-schemas";

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
          <Link to="/resources/how-to-reduce-dso" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            DSO Guide
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

export function ManufacturingUseCase() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Calculator State
  const [annualRevenue, setAnnualRevenue] = useState<number>(8000000);
  const [creditTermsDays, setCreditTermsDays] = useState<number>(60);
  const [avgDaysOverdue, setAvgDaysOverdue] = useState<number>(24);
  const interestRate = 0.085; // 8.5% cost of capital

  const currentDso = creditTermsDays + avgDaysOverdue;
  const capitalTrapped = (annualRevenue / 365) * currentDso;
  const annualFinancingCost = capitalTrapped * interestRate;

  // Jaktra conservative 20-day DSO reduction
  const dsoReduction = Math.min(avgDaysOverdue, 20);
  const freedCapital = (annualRevenue / 365) * dsoReduction;
  const interestSaved = freedCapital * interestRate;

  const faqs = [
    {
      q: "How does Jaktra handle extended Net 60 and Net 90 payment terms?",
      a: "In long credit cycles, waiting until Day 61 to contact accounts payable creates massive working capital lag. Jaktra automates proactive, collaborative pre-due milestones (e.g., at Day 45 of a Net 60 term) to confirm invoice receipt, purchase order matching, and scheduled payment runs before the due date passes.",
    },
    {
      q: "What happens when a manufacturing buyer claims a missing PO or dock receiving delay?",
      a: "Over 40% of manufacturing invoice delays are clerical. Jaktra's NLP DisputeAgent classifies incoming emails referencing 'missing PO', 'wrong item description', or 'dock receipt pending' into sentiment categories. It automatically halts collection cadences and notifies your fulfillment team with an AI-drafted resolution response.",
    },
    {
      q: "Can manufacturing suppliers split large batch invoices into milestone installment plans?",
      a: "Yes. For capital machinery or bulk raw material orders, demanding full lump-sum payment when a buyer faces temporary liquidity constraints causes default. Jaktra enables structured installment schedules via zero-login tokenized debtor portals (`/i/:token`), monitoring upcoming installments through ActiveInstallmentContext.",
    },
    {
      q: "Does Jaktra replace enterprise ERPs like SAP, Oracle, or NetSuite?",
      a: "No. Jaktra does not replace back-office ERP ledgers, warehouse inventory EDI, or physical paper check lockboxes. Instead, Jaktra serves as an agile, autonomous execution agent: reading your receivables ledger, running 5-stage generative tone escalation, triaging disputes, and reconciling payments back to your records.",
    },
    {
      q: "How are high-value B2B transactions settled securely?",
      a: "Jaktra generates authenticated, tokenized debtor links where corporate buyers can pay via instant bank transfers (NEFT/RTGS, NetBanking) or corporate cards powered by live Razorpay payment rails, with real-time webhook confirmation.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-amber-500/30 selection:text-white">
      <SEOHead
        title="AI Accounts Receivable Automation for Manufacturing & Supply Chain — Jaktra"
        description="Accelerate cash flow in manufacturing. Resolve PO matching disputes, manage Net 60/90 terms, and eliminate receivables drag with autonomous AI dunning."
        canonicalPath="/use-cases/manufacturing"
        jsonLd={[
          manufacturingUseCaseSchema,
          breadcrumbSchema([
            { name: "Solutions", path: "/use-cases/saas" },
            { name: "Manufacturing", path: "/use-cases/manufacturing" },
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
              <span className="text-zinc-400">Solutions</span>
            </li>
            <li>/</li>
            <li className="text-zinc-300 font-medium" aria-current="page">
              Manufacturing & Industrial
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-300 text-xs font-medium mb-4">
            <Factory className="w-3.5 h-3.5" />
            <span>Industrial Suppliers, Contract Manufacturers & Distributors</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            AI Accounts Receivable Automation for Manufacturing
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Eliminate working capital drag on Net 60/90 terms. Jaktra automates PO verification check-ins,
            triages goods receipt disputes, and accelerates cash recovery without alienating key accounts.
          </p>
        </div>

        {/* Metrics Banner */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-1">-20 Days</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Average DSO Reduction</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono mb-1">100%</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">PO Discrepancy Triage</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono mb-1">$438K+</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Working Capital Freed (per $8M)</div>
          </div>
        </section>

        {/* Interactive Working Capital Drag Calculator */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 sm:p-10 mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Manufacturing Working Capital Drag Calculator</h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Calculate the real financing cost of trapped receivables under extended credit terms.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Input 1: Annual Revenue */}
            <div>
              <label htmlFor="annual-revenue-range" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                Annual B2B Revenue: <span className="text-white font-mono font-bold">${(annualRevenue / 1000000).toFixed(1)}M</span>
              </label>
              <input
                id="annual-revenue-range"
                type="range"
                min={1000000}
                max={25000000}
                step={500000}
                value={annualRevenue}
                onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                <span>$1M</span>
                <span>$12M</span>
                <span>$25M</span>
              </div>
            </div>

            {/* Input 2: Stated Credit Terms */}
            <div>
              <label htmlFor="credit-terms-select" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                Standard Credit Terms
              </label>
              <select
                id="credit-terms-select"
                value={creditTermsDays}
                onChange={(e) => setCreditTermsDays(Number(e.target.value))}
                className="w-full rounded-lg bg-zinc-800/80 border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value={30}>Net 30 Days</option>
                <option value={45}>Net 45 Days</option>
                <option value={60}>Net 60 Days</option>
                <option value={90}>Net 90 Days</option>
              </select>
              <p className="text-[11px] text-zinc-500 mt-1.5">Industry standard term extended to buyers.</p>
            </div>

            {/* Input 3: Days Overdue */}
            <div>
              <label htmlFor="days-overdue-range" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                Average Overdue Lag: <span className="text-amber-400 font-mono font-bold">+{avgDaysOverdue} Days</span>
              </label>
              <input
                id="days-overdue-range"
                type="range"
                min={5}
                max={60}
                step={1}
                value={avgDaysOverdue}
                onChange={(e) => setAvgDaysOverdue(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                <span>5d</span>
                <span>30d</span>
                <span>60d</span>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-xl bg-zinc-950/70 border border-zinc-800">
            <div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Current Effective DSO</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">{currentDso} Days</div>
              <div className="text-xs text-zinc-500 mt-1">{creditTermsDays}d term + {avgDaysOverdue}d overdue</div>
            </div>
            <div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Capital Trapped in AR</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">
                ${Math.round(capitalTrapped).toLocaleString()}
              </div>
              <div className="text-xs text-zinc-500 mt-1">${Math.round(annualFinancingCost).toLocaleString()}/yr financing cost (8.5%)</div>
            </div>
            <div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Working Capital Released by Jaktra</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
                +${Math.round(freedCapital).toLocaleString()}
              </div>
              <div className="text-xs text-zinc-500 mt-1">+${Math.round(interestSaved).toLocaleString()}/yr interest saved</div>
            </div>
          </div>
        </section>

        {/* 3 Core Manufacturing Challenges Solved */}
        <section className="space-y-12 mb-20">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              1. Automated PO & Goods Receipt (GRN) Discrepancy Triage
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Industrial accounts payable teams routinely freeze payments when a line item price differs by pennies or
              when the dock hasn't confirmed receiving. Jaktra's NLP DisputeAgent classifies incoming buyer emails,
              detects PO or delivery inquiries, immediately suspends automated dunning, and drafts a resolution request
              with invoice tokens for your shipping coordinator to upload delivery proofs.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              2. Pre-Due Milestone Check-Ins for Net 60 and Net 90 Terms
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Waiting until an invoice is 1 day past a 60-day term to reach out means losing 2 months before discovering
              the buyer never received the invoice. Jaktra automates cordial, collaborative pre-due milestones at Day 45
              to ensure your invoice is processed in their ERP batch run before the due date passes.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              3. Structured Installment Plans for Large Capital Equipment Orders
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Demanding immediate $50k+ lump sums when an industrial buyer is temporarily cash-constrained often leads
              to legal friction or contract abandonment. Jaktra lets you offer structured installment schedules via
              tokenized debtor portals (`/i/:token`). Once approved, Jaktra's triage engine nudges only for upcoming
              installments, keeping client relationships productive while securing steady cash flow.
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
        <section className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-amber-950/40 to-zinc-900 p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Unlock Trapped Working Capital in Your Supply Chain
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-6">
            Eliminate dunning delays and accelerate Net 60/90 recoveries without damaging buyer relationships. 100% free during Early Access with zero credit card required.
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
          <Link to="/features/installment-plans" className="hover:text-zinc-300 transition-colors">
            Installment Plans
          </Link>
          <Link to="/resources/how-to-reduce-dso" className="hover:text-zinc-300 transition-colors">
            DSO Guide
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
