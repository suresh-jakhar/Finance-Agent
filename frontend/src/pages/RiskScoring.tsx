import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Brain, TrendingUp, ShieldAlert, Gauge, CheckCircle2 } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { riskScoringSchema, breadcrumbSchema } from "../components/common/seo-schemas";

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
          <Link to="/features/email-deliverability" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Deliverability
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

export function RiskScoring() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Simulator Inputs
  const [invoiceAmount, setInvoiceAmount] = useState<number>(12500);
  const [daysOverdue, setDaysOverdue] = useState<number>(14);
  const [followupCount, setFollowupCount] = useState<number>(2);
  const [historicalPaymentRate, setHistoricalPaymentRate] = useState<number>(75);

  // Risk Score Computation matching ai-service/src/risk/scorer.py logic
  const agingScore = Math.min(daysOverdue / 30, 1) * 35;
  const amountScore = Math.min(invoiceAmount / 50000, 1) * 25;
  const followupScore = Math.min(followupCount / 4, 1) * 20;
  const historyScore = (1 - historicalPaymentRate / 100) * 20;
  const totalRiskScore = Math.round(agingScore + amountScore + followupScore + historyScore);

  let riskTier = "LOW RISK";
  let tierColor = "text-emerald-400";
  let badgeColor = "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
  let recommendation = "Autonomous polite nudges. Debtor shows high historical reliability with low default risk.";

  if (totalRiskScore > 75) {
    riskTier = "CRITICAL RISK";
    tierColor = "text-red-400";
    badgeColor = "bg-red-500/10 text-red-300 border-red-500/20";
    recommendation = "High default probability. Immediate priority review, phone follow-up by account executive, and pre-legal demand prep.";
  } else if (totalRiskScore > 55) {
    riskTier = "HIGH RISK";
    tierColor = "text-orange-400";
    badgeColor = "bg-orange-500/10 text-orange-300 border-orange-500/20";
    recommendation = "Escalate tone to Stage 3 / 4. Require formal remittance confirmation and propose immediate installment milestones.";
  } else if (totalRiskScore > 30) {
    riskTier = "MEDIUM RISK";
    tierColor = "text-amber-400";
    badgeColor = "bg-amber-500/10 text-amber-300 border-amber-500/20";
    recommendation = "Firm administrative follow-up. Inquire regarding accounts payable batch schedule and offer self-serve portal links.";
  }

  const faqs = [
    {
      q: "How does Jaktra calculate predictive delinquency risk scores?",
      a: "Jaktra's AI risk engine (`ai-service/src/risk/scorer.py`) analyzes four key data vectors for every open invoice: temporal days overdue (35% weight), outstanding balance exposure (25% weight), debtor responsiveness / follow-up attempts (20% weight), and the client's historical on-time payment track record (20% weight).",
    },
    {
      q: "Why is risk-based prioritization better than FIFO invoice dunning?",
      a: "Chasing invoices on a simple first-in, first-out (FIFO) schedule forces finance teams to spend identical energy on a $400 bill from an enterprise customer who always pays late as on a $45,000 balance from an unstable startup. Risk scoring directs human and automated attention to high-dollar, high-default accounts before they turn into write-offs.",
    },
    {
      q: "Can the risk score trigger automated collection cadences dynamically?",
      a: "Yes. When an invoice's risk score climbs from Medium to High, Jaktra automatically accelerates the tone escalation velocity—switching from cordial check-ins to firm administrative notices with installment offers—while triggering internal notifications to the finance controller.",
    },
    {
      q: "What happens when a debtor's historical payment rate is 100%?",
      a: "For long-standing clients with flawless payment history, Jaktra softens the escalation progression. The AI model treats the delay as an administrative oversight rather than credit delinquency, preserving executive goodwill and preventing aggressive collection phrasing.",
    },
    {
      q: "Does Jaktra update risk scores in real time as actions occur?",
      a: "Yes. When a debtor opens a tokenized portal link, downloads a statement, proposes an installment schedule, or sends an inquiry, the event stream updates the scoring parameters immediately, adjusting collection urgency in real time.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-rose-500/30 selection:text-white">
      <SEOHead
        title="Predictive ML Accounts Receivable Delinquency Scoring — Jaktra"
        description="Stratify overdue debtors with multi-feature ML risk scoring. Evaluate aging, dollar concentration, follow-up history, and payment velocity to prioritize high-risk collections."
        canonicalPath="/features/risk-scoring"
        jsonLd={[
          riskScoringSchema,
          breadcrumbSchema([
            { name: "Features", path: "/features/5-stage-escalation" },
            { name: "Risk Scoring", path: "/features/risk-scoring" },
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
              <span className="text-zinc-400">Features</span>
            </li>
            <li>/</li>
            <li className="text-zinc-300 font-medium" aria-current="page">
              Predictive Risk Scoring
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-300 text-xs font-medium mb-4">
            <Brain className="w-3.5 h-3.5" />
            <span>Multi-Feature Machine Learning Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            Predictive ML Delinquency Risk Scoring
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Stop treating all overdue receivables equally. Jaktra's predictive ML model stratifies risk across temporal
            aging, dollar exposure, and debtor velocity to focus collection recovery where it matters most.
          </p>
        </div>

        {/* Metrics Banner */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-rose-400 font-mono mb-1">4 Vectors</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Multi-Feature Risk Analysis</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-1">4 Tiers</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Low to Critical Stratification</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono mb-1">Real-Time</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Event-Driven Score Adjustments</div>
          </div>
        </section>

        {/* Interactive Delinquency Risk Simulator */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-10 mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <Gauge className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Live Delinquency Risk Scoring Simulator</h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Adjust the invoice parameters below to observe how Jaktra's algorithm dynamically scores default probability.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Input 1: Invoice Amount */}
            <div>
              <label htmlFor="invoice-amount-range" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                Invoice Amount: <span className="text-white font-mono font-bold">${invoiceAmount.toLocaleString()}</span>
              </label>
              <input
                id="invoice-amount-range"
                type="range"
                min={1000}
                max={50000}
                step={500}
                value={invoiceAmount}
                onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                <span>$1,000</span>
                <span>$25,000</span>
                <span>$50,000+</span>
              </div>
            </div>

            {/* Input 2: Days Past Due */}
            <div>
              <label htmlFor="days-past-due-range" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                Days Overdue: <span className="text-rose-400 font-mono font-bold">{daysOverdue} Days</span>
              </label>
              <input
                id="days-past-due-range"
                type="range"
                min={1}
                max={45}
                step={1}
                value={daysOverdue}
                onChange={(e) => setDaysOverdue(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                <span>1d</span>
                <span>20d</span>
                <span>45d</span>
              </div>
            </div>

            {/* Input 3: Follow-Up Touches */}
            <div>
              <label htmlFor="followup-touches-range" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                Follow-Up Touches Sent: <span className="text-white font-mono font-bold">{followupCount} Contacts</span>
              </label>
              <input
                id="followup-touches-range"
                type="range"
                min={0}
                max={6}
                step={1}
                value={followupCount}
                onChange={(e) => setFollowupCount(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                <span>0</span>
                <span>3</span>
                <span>6+</span>
              </div>
            </div>

            {/* Input 4: Historical Payment Rate */}
            <div>
              <label htmlFor="historical-rate-range" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                Debtor Historical On-Time Rate: <span className="text-emerald-400 font-mono font-bold">{historicalPaymentRate}%</span>
              </label>
              <input
                id="historical-rate-range"
                type="range"
                min={20}
                max={100}
                step={5}
                value={historicalPaymentRate}
                onChange={(e) => setHistoricalPaymentRate(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                <span>20% (Unreliable)</span>
                <span>60%</span>
                <span>100% (Pristine)</span>
              </div>
            </div>
          </div>

          {/* Results Score Card */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-5 mb-5">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${badgeColor}`}>
                  {riskTier}
                </span>
                <div className="text-xs text-zinc-400 mt-1">Calculated Delinquency Probability</div>
              </div>
              <div className="text-right">
                <div className={`text-3xl sm:text-4xl font-extrabold font-mono ${tierColor}`}>
                  {totalRiskScore} <span className="text-xs text-zinc-500 font-sans">/ 100</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Jaktra AI Action Directive:
              </div>
              <p className="text-sm text-zinc-200 leading-relaxed bg-zinc-900/60 p-4 rounded-lg border border-zinc-800">
                {recommendation}
              </p>
            </div>
          </div>
        </section>

        {/* 4 Core Pillars */}
        <section className="space-y-12 mb-20">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5 text-rose-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              1. Temporal Aging Dynamics vs Simple Calendar Counting
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Default risk does not scale linearly; it accelerates after Day 21 and spikes past Day 30. Jaktra's model
              applies exponential aging curves rather than flat daily penalties, ensuring urgent action is taken before
              accounts cross the critical 30-day write-off threshold.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              2. Balance Concentration & Cash Exposure Weighting
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              A $50,000 overdue invoice presents existential cash flow risk, whereas a $250 invoice is trivial. Jaktra
              heavily weights dollar concentration in the risk index, ensuring executive attention and phone escalation
              are reserved for accounts that move the needle on company liquidity.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              3. Debtor Behavioral Velocity & Loyalty Protection
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Long-time customers who routinely pay Net 45 shouldn't be alienated with aggressive legal notices on Day 32.
              By tracking historical payment rates, Jaktra preserves commercial relationships with proven accounts while
              instantly flagging new or erratic buyers who show early delinquency patterns.
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
        <section className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-rose-950/40 to-zinc-900 p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Prioritize AR Recovery with Predictive Machine Learning
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-6">
            Eliminate guesswork and recover high-risk receivables before they default. 100% free during Early Access with zero credit card required.
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
          <Link to="/features/email-deliverability" className="hover:text-zinc-300 transition-colors">
            Deliverability & DLQ
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
