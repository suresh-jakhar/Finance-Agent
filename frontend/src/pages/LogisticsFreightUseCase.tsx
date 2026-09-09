import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Truck, ShieldCheck, Clock, FileText, Calculator, AlertTriangle } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { logisticsUseCaseSchema, breadcrumbSchema } from "../components/common/seo-schemas";

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

export default function LogisticsFreightUseCase() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Freight Factoring Calculator State
  const [monthlyFreightBilling, setMonthlyFreightBilling] = useState<number>(650000);
  const [factoringFeeRate, setFactoringFeeRate] = useState<number>(3.0); // 3% typical freight factoring fee
  const [shipperDso, setShipperDso] = useState<number>(58);

  // Calculations
  const monthlyFactoringFeeCost = monthlyFreightBilling * (factoringFeeRate / 100);
  const annualFactoringCost = monthlyFactoringFeeCost * 12;
  const jaktraAnnualCost = 249 * 12; // Scale plan: $2,988/yr
  const annualProfitReclaimed = annualFactoringCost - jaktraAnnualCost;
  const workingCapitalTrapped = (monthlyFreightBilling * 12 / 365) * shipperDso;
  const dsoReduction = Math.min(22, Math.max(12, Math.round(shipperDso * 0.3)));
  const freedCashFlow = (monthlyFreightBilling * 12 / 365) * dsoReduction;

  const faqs = [
    {
      q: "How does Jaktra help freight brokers escape high-cost invoice factoring?",
      a: "Freight factoring companies charge 2.5% to 5.0% of gross invoice volume simply to advance cash because shippers take 50–75 days to pay. On a $500,000 monthly freight book, factoring siphons $15,000/month in fees—often exceeding total net profits. Jaktra shortens shipper collection cycles by 14–22 days through automated tone escalation, instant zero-login digital payment links, and automated dispute triage, enabling brokers to self-fund carrier payouts and eliminate factoring fees.",
    },
    {
      q: "How does Jaktra handle detention, lumper, and accessorial billing disputes?",
      a: "Accessorial charges (detention hours, lumper receipts, layovers) are the #1 cause of shipper invoice payment delays. When a shipper replies stating 'detention not pre-approved' or 'missing signed lumper slip', Jaktra's DisputeAgent (ai-service/src/agents/dispute_agent.py) parses the reply using NLP, immediately freezes automated collection cadences, tags the dispute type, and generates a pre-drafted resolution briefing for your dispatch team.",
    },
    {
      q: "What happens if a shipper is missing a signed Bill of Lading (BOL) or POD?",
      a: "Shipper AP departments routinely sit on invoices for 30+ days before casually notifying you that they lack a signed POD. Jaktra solves this by initiating collaborative Stage 1 check-ins 3 days prior to due date that explicitly confirm receipt of the rate confirmation and delivery paperwork, preventing last-minute payment halts.",
    },
    {
      q: "Can enterprise shippers pay via ACH, NEFT/RTGS, or corporate credit cards?",
      a: "Yes. Jaktra embeds cryptographic, zero-login payment links (/i/:token) in every communication. Shippers can review their full freight invoice statement and remit payment in 30 seconds via Razorpay (supporting corporate credit cards, NetBanking, UPI, and dedicated virtual bank accounts for direct wire reconciliation) with zero account creation required.",
    },
    {
      q: "How does the 20-Hour Idempotency Guard protect shipper relationships?",
      a: "Freight brokerages rely heavily on shipper goodwill to secure tender volume. In Jaktra, idempotency.service.ts enforces a strict 20-hour contact barrier, preventing multiple automated emails from hitting the same shipper in a single day and protecting your sender domain reputation.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-white">
      <SEOHead
        title="AI Accounts Receivable Automation for Logistics, Freight & 3PLs | Jaktra"
        description="Eliminate the freight working capital crunch. Automate shipper collection cadences, triage detention and accessorial disputes, cut freight factoring dependence, and accelerate cash flow with Jaktra."
        canonicalPath="/use-cases/logistics-freight"
        jsonLd={[
          logisticsUseCaseSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Use Cases", path: "/use-cases/saas" },
            { name: "Logistics & Freight AR", path: "/use-cases/logistics-freight" },
          ]),
        ]}
      />

      <HeaderNav />

      <main className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-zinc-300 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/use-cases/saas" className="hover:text-zinc-300 transition-colors">Use Cases</Link>
          <span>/</span>
          <span className="text-zinc-300">Logistics, Freight & 3PLs</span>
        </nav>

        {/* Hero Section */}
        <header className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
            <Truck className="w-3.5 h-3.5" />
            <span>Freight Brokers, 3PLs & Motor Carriers</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Escape the Freight Factoring Trap: Cut 60+ Day Shipper DSO and Triage Accessorial Disputes
          </h1>
          <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed">
            Freight brokerages must pay motor carriers in Net 7–15 days while corporate shippers stretch payment terms to 60+ days. Jaktra automates shipper collection cadences, triages detention and POD disputes with AI, and accelerates cash flow so you can eliminate 3%–5% factoring fees.
          </p>
        </header>

        {/* The Working Capital Dilemma Callout */}
        <section className="mb-16 p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>The Freight Cash Conversion Gap: Paying in 7 Days, Getting Paid in 60</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                When motor carriers demand Quick-Pay and enterprise shippers take 55 to 75 days to pay freight invoices, logistics companies get squeezed into <strong className="text-zinc-200">predatory 3%–5% invoice factoring</strong>. On a 15% gross margin brokerage, factoring consumes up to a third of your profit just to fund the cash float.
              </p>
            </div>
            <Link
              to="/resources/how-to-reduce-dso"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-sm text-white font-medium transition-colors shrink-0"
            >
              <span>Explore DSO Strategy</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 4 Core Pillars for Freight & Logistics AR */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Detention & Accessorial Dispute Triage</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              When a shipper disputes detention hours, lumper receipts, or fuel surcharges, Jaktra’s <code className="text-blue-300">dispute_agent.py</code> classifies the inbound email, freezes automated cadences, and immediately routes the inquiry with an AI draft to your logistics operations team.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Signed BOL & POD Verification Cadences</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Never let an invoice sit unpaid for 45 days because the shipper claims they didn't receive a delivery signature. Jaktra coordinates Stage 1 collaborative check-ins that confirm the rate con and signed POD are in the shipper’s accounts payable queue before the due date.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Zero-Login Shipper Payment Portals</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Shipper AP teams can view freight bills and remit payments in 30 seconds via Razorpay (supporting corporate credit cards, NetBanking, UPI, and dedicated virtual bank accounts) using cryptographic <code className="text-purple-300">/i/:token</code> links without password friction.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Truck className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Shipper Goodwill & Brokerage Volume Protection</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Shippers control lane allocation. Jaktra’s Groq LLaMA 3.1 tone escalation maintains an institutional, collaborative finance tone across early stages, ensuring freight bills get prioritized without alienating high-volume commercial freight customers.
            </p>
          </div>
        </section>

        {/* Interactive Factoring Elimination & ROI Calculator */}
        <section className="mb-20 p-8 rounded-2xl bg-zinc-900/40 border border-white/10">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Freight Factoring vs. Jaktra Simulator</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Calculate Your Freight Factoring Profit Recovery
            </h2>
            <p className="text-sm text-zinc-400">
              See how much gross margin your brokerage or 3PL surrenders to invoice factoring fees, and how shortening DSO with Jaktra restores your net profit.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Inputs */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-2">
                  <span>Monthly Freight Billing Volume:</span>
                  <span className="text-white font-mono font-semibold">${monthlyFreightBilling.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="3000000"
                  step="50000"
                  value={monthlyFreightBilling}
                  onChange={(e) => setMonthlyFreightBilling(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-2">
                  <span>Current Factoring Fee Percentage:</span>
                  <span className="text-white font-mono font-semibold">{factoringFeeRate.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="5.0"
                  step="0.1"
                  value={factoringFeeRate}
                  onChange={(e) => setFactoringFeeRate(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-2">
                  <span>Average Shipper DSO (Days to Pay):</span>
                  <span className="text-white font-mono font-semibold">{shipperDso} days</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="90"
                  step="1"
                  value={shipperDso}
                  onChange={(e) => setShipperDso(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Right Metrics Box */}
            <div className="lg:col-span-6 p-6 rounded-xl bg-black/60 border border-white/10 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-zinc-900/60 border border-white/5">
                  <div className="text-xs text-zinc-500 mb-1">Monthly Factoring Cost</div>
                  <div className="text-2xl font-bold text-red-400 font-mono">
                    ${Math.round(monthlyFactoringFeeCost).toLocaleString()}/mo
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1">Paid to factoring companies</div>
                </div>

                <div className="p-4 rounded-lg bg-zinc-900/60 border border-white/5">
                  <div className="text-xs text-zinc-500 mb-1">Trapped Shipper Capital</div>
                  <div className="text-2xl font-bold text-white font-mono">
                    ${Math.round(workingCapitalTrapped).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1">Waiting on shipper AP runs</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-300">Annual Net Profit Reclaimed with Jaktra:</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    +${Math.round(annualProfitReclaimed).toLocaleString()} / yr
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-emerald-500/15">
                  <span className="text-[11px] text-zinc-400">Cash Flow Accelerated (-{dsoReduction} Days DSO):</span>
                  <span className="text-sm font-semibold text-white font-mono">
                    +${Math.round(freedCashFlow).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Stage Freight Tone Escalation */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Freight & Logistics 5-Stage Escalation Matrix
            </h2>
            <p className="text-sm text-zinc-400">
              How Jaktra secures freight payment without jeopardizing high-volume shipper relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-blue-500/20">
              <div className="text-xs font-bold text-blue-400 mb-1">Stage 1</div>
              <div className="text-sm font-semibold text-white mb-1">POD & Rate Con Verification</div>
              <div className="text-xs text-zinc-500 mb-2">Day -3 to Due Date</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Confirms that signed BOL, lumper slips, and rate confirmation match the shipper's billing requirements.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-emerald-500/20">
              <div className="text-xs font-bold text-emerald-400 mb-1">Stage 2</div>
              <div className="text-sm font-semibold text-white mb-1">AP Batch Status Check</div>
              <div className="text-xs text-zinc-500 mb-2">Days 1–7 Overdue</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Polite administrative check-in asking if the freight bill is queued in the upcoming weekly disbursement run.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-amber-500/20">
              <div className="text-xs font-bold text-amber-400 mb-1">Stage 3</div>
              <div className="text-sm font-semibold text-white mb-1">Accessorial Review & Plans</div>
              <div className="text-xs text-zinc-500 mb-2">Days 8–14 Overdue</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Direct outreach offering to isolate accessorial disputes while releasing undisputed base linehaul funds.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-orange-500/20">
              <div className="text-xs font-bold text-orange-400 mb-1">Stage 4</div>
              <div className="text-sm font-semibold text-white mb-1">Carrier Capacity Hold Warning</div>
              <div className="text-xs text-zinc-500 mb-2">Days 15–30 Overdue</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Urgent notice indicating that future truckload tender acceptance and dedicated lane coverage are at risk.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-red-500/20">
              <div className="text-xs font-bold text-red-400 mb-1">Stage 5</div>
              <div className="text-sm font-semibold text-white mb-1">Legal Stop & Bond Claims</div>
              <div className="text-xs text-zinc-500 mb-2">Day 31+ Overdue</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Automation strictly halts. Escalates file to credit leadership for BMC-84 broker bond or shipper legal recovery.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Frequently Asked Questions: Freight & Logistics AR
            </h2>
            <p className="text-sm text-zinc-400">
              Answers to common operational questions regarding accessorial disputes, factoring alternatives, and payment rails.
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-xl border border-white/10 bg-zinc-900/40 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-zinc-900/60 transition-colors"
                  >
                    <span className="text-sm font-medium text-white">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-white/15 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Accelerate Freight Collections in 15 Minutes
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-8">
            Connect your transportation management or billing system to Jaktra today. 100% free during Early Access with zero credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-colors shadow-lg"
            >
              Get started free
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm transition-colors"
            >
              Explore Free Early Access
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <img src={jaktraLogo} alt="Jaktra" width={18} height={18} className="h-4.5 w-4.5 block" />
            <span>&copy; {new Date().getFullYear()} Jaktra. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/pricing" className="hover:text-zinc-300 transition-colors">Pricing</Link>
            <Link to="/features/5-stage-escalation" className="hover:text-zinc-300 transition-colors">Tone Escalation</Link>
            <Link to="/resources/how-to-reduce-dso" className="hover:text-zinc-300 transition-colors">DSO Guide</Link>
            <Link to="/privacy" className="hover:text-zinc-300 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-zinc-300 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
