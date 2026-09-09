import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Calendar, CheckCircle2, Split, Clock, Zap } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { installmentPlansSchema, breadcrumbSchema } from "../components/common/seo-schemas";

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
          <Link to="/features/dispute-triage" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Dispute Triage
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

export function InstallmentPlans() {
  const [invoiceAmount, setInvoiceAmount] = useState<number>(12000);
  const [installmentsCount, setInstallmentsCount] = useState<number>(3);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const installmentAmount = Math.round(invoiceAmount / installmentsCount);

  const faqs = [
    {
      q: "Why are structured installment plans better than demanding immediate full payment?",
      a: "When B2B debtors encounter temporary cash crunches, rigid demands for immediate 100% settlement often force them to ghost communications, dispute the invoice, or push the balance into severe delinquency. Offering structured installment plans gives debtors a dignified, manageable off-ramp while securing steady cash flow and eliminating default write-offs.",
    },
    {
      q: "How does Jaktra adapt its automated tone when an installment plan is active?",
      a: "In Jaktra's triage engine (`triage.service.ts`), active installment plans shift the context (`ActiveInstallmentContext`). Instead of demanding the full lump sum, our Groq LLaMA 3.1 agent automatically adjusts its copy to reference only the upcoming installment milestone, its due date, and remaining balance.",
    },
    {
      q: "How do debtors request and approve installment plans?",
      a: "Every collection reminder contains a secure tokenized link (`/i/:token`). In their portal, debtors see an option to split the invoice balance across pre-authorized schedules (e.g. 2, 3, or 4 monthly installments). Finance managers can pre-approve these rules or review custom debtor requests with a single click in their Jaktra dashboard.",
    },
    {
      q: "How does payment reconciliation work across installments?",
      a: "As debtors clear each installment milestone via Razorpay (UPI, NetBanking, Cards), Jaktra's verified webhooks reconcile the ledger in real time, mark that installment as PAID, and automatically queue the next installment's tracking schedule.",
    },
    {
      q: "What happens if a debtor misses an installment payment milestone?",
      a: "If an installment becomes past due, Jaktra immediately resumes its 5-stage tone escalation cadence focused specifically on the delinquent installment amount, escalating with polite firmness before legal review.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-white">
      <SEOHead
        title="B2B Payment Plans & Structured AR Installments — Jaktra"
        description="Learn how Jaktra recovers at-risk overdue invoices by converting large balances into structured installment schedules via tokenized debtor portals with automated webhook tracking."
        canonicalPath="/features/installment-plans"
        jsonLd={[
          installmentPlansSchema,
          breadcrumbSchema([
            { name: "Features", path: "/features/5-stage-escalation" },
            { name: "Installment Plans", path: "/features/installment-plans" },
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
              <Link to="/features/5-stage-escalation" className="hover:text-zinc-300 transition-colors">
                Features
              </Link>
            </li>
            <li>/</li>
            <li className="text-zinc-300 font-medium" aria-current="page">
              Installment Plans
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-xs font-medium mb-4">
            <Split className="w-3.5 h-3.5" />
            <span>Turn At-Risk Default Debt into Structured Cash Flow</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            B2B Payment Plans & Structured AR Installments
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Rigid collection demands cause cash-strapped debtors to ghost. Jaktra converts large overdue balances into
            structured, pre-authorized installment schedules managed through zero-login debtor portals.
          </p>
        </div>

        {/* Interactive Installment Simulator */}
        <section className="mb-20 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-10">
          <div className="text-center mb-10 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2">Interactive Installment Schedule Simulator</h2>
            <p className="text-sm text-zinc-400">
              Simulate how Jaktra breaks an overdue invoice into structured milestone payments and adapts automated cadences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center text-sm font-semibold mb-2">
                  <span className="text-zinc-300">Overdue Invoice Balance</span>
                  <span className="text-white font-mono text-base">${invoiceAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={2000}
                  max={50000}
                  step={1000}
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                  className="w-full accent-purple-500 bg-zinc-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-1 font-mono">
                  <span>$2,000</span>
                  <span>$25,000</span>
                  <span>$50,000</span>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-zinc-300 mb-3">Installment Milestone Split</div>
                <div className="grid grid-cols-3 gap-3">
                  {[2, 3, 4].map((count) => (
                    <button
                      key={count}
                      onClick={() => setInstallmentsCount(count)}
                      className={`py-3 px-4 rounded-xl border text-center transition-all ${
                        installmentsCount === count
                          ? "border-purple-500 bg-purple-950/30 text-white shadow-md shadow-purple-500/10 font-bold"
                          : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <div className="text-lg font-mono">{count}x</div>
                      <div className="text-xs font-normal">Installments</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/60">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  AI Agent Nudge Adaptation
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Active status halts full-balance demands. Outreach automatically pivots to tracking Milestone #1
                  (${installmentAmount.toLocaleString()}) due in 30 days.
                </p>
              </div>
            </div>

            {/* Simulated Schedule Output */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-4 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>Structured Debtor Milestone Breakdown</span>
                </div>

                <div className="space-y-3">
                  {Array.from({ length: installmentsCount }).map((_, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg border border-zinc-800/80 bg-zinc-900/50 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold font-mono flex items-center justify-center">
                          {i + 1}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">
                            Installment {i + 1} of {installmentsCount}
                          </div>
                          <div className="text-xs text-zinc-500">
                            Due in {(i + 1) * 30} days • Tokenized Link Ready
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold font-mono text-emerald-400">
                          ${installmentAmount.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-zinc-400">Razorpay Sync</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-4 mt-6 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-400">Total Recovery Probability</div>
                  <div className="text-base font-bold text-emerald-400 font-mono">89% vs 24% (Lump Sum Demand)</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-400">Total Recovered</div>
                  <div className="text-base font-bold text-white font-mono">${invoiceAmount.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Pillars of Jaktra's Installment Engine */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-4">How Jaktra’s Installment Engine Works</h2>
          <p className="text-center text-sm text-zinc-400 mb-10 max-w-2xl mx-auto">
            From debtor self-selection to automatic ledger reconciliation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">1. Tokenized Debtor Selection</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Debtors click their secure portal link (`/i/:token`) and choose an installment schedule pre-authorized
                by your company's credit policy without phone negotiations.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">2. Dynamic Triage Modulation</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Jaktra’s agent updates invoice context (`ActiveInstallmentContext`). Aggressive demand copy stops, and
                reminders politely nudge only for upcoming installment dates.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">3. Real-Time Webhook Reconciliation</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                When debtors clear each milestone via Razorpay, our webhook updates the installment to PAID, adjusts
                remaining ledger balances, and logs audit events automatically.
              </p>
            </div>
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
        <section className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-purple-950/40 to-blue-950/30 p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Recover More Cash with Intelligent Installment Plans
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-6">
            Turn delinquent accounts into structured cash flow today with Jaktra's autonomous AI collections agent.
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
          <Link to="/features/5-stage-escalation" className="hover:text-zinc-300 transition-colors">
            Tone Escalation
          </Link>
          <Link to="/features/dispute-triage" className="hover:text-zinc-300 transition-colors">
            Dispute Triage
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
