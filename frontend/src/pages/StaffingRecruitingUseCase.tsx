import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Users, ShieldCheck, Clock, FileCheck, Calculator, AlertCircle } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { staffingUseCaseSchema, breadcrumbSchema } from "../components/common/seo-schemas";

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

export default function StaffingRecruitingUseCase() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Staffing Payroll Calculator State
  const [monthlyPayroll, setMonthlyPayroll] = useState<number>(500000);
  const [factoringRate, setFactoringRate] = useState<number>(2.5); // 2.5% typical staffing payroll factoring
  const [clientDso, setClientDso] = useState<number>(55);

  // Calculations
  const monthlyFactoringCost = monthlyPayroll * (factoringRate / 100);
  const annualFactoringDrain = monthlyFactoringCost * 12;
  const jaktraAnnualCost = 249 * 12; // Scale tier: $2,988/yr
  const annualProfitReclaimed = annualFactoringDrain - jaktraAnnualCost;
  const trappedPayrollCapital = (monthlyPayroll * 12 / 365) * clientDso;
  const dsoReduction = Math.min(20, Math.max(10, Math.round(clientDso * 0.3)));
  const freedCashFlow = (monthlyPayroll * 12 / 365) * dsoReduction;

  const faqs = [
    {
      q: "How does Jaktra help staffing firms eliminate expensive payroll factoring?",
      a: "Staffing agencies must disburse payroll to placed contractors every Friday, but corporate clients often take 50 to 75 days to pay invoices. This forces agencies into payroll factoring facilities that charge 2.0% to 4.0% of gross invoice volume. Jaktra closes this cash conversion gap by cutting client DSO by 15–20 days using automated 5-stage tone escalation, pre-due VMS verification, and zero-login digital payment links, allowing firms to fund payroll from operating cash flow and cancel factoring lines.",
    },
    {
      q: "What happens when a client disputes a timesheet or overtime calculation?",
      a: "A missing timesheet approval or disputed overtime rate is the #1 reason client AP departments delay paying staffing bills. When a client replies stating 'timesheet not approved by manager' or 'overtime rate discrepancy', Jaktra's DisputeAgent (ai-service/src/agents/dispute_agent.py) parses the email, tags the dispute type, freezes all automated follow-ups immediately, and alerts your staffing account manager with an AI-generated briefing.",
    },
    {
      q: "How does Jaktra handle Vendor Management Systems (VMS) like Fieldglass, Beeline, and Coupa?",
      a: "In VMS environments, payment timing hinges on whether timesheets are released into the system before the client's billing cutoff. Jaktra coordinates collaborative Stage 1 check-ins 3 days prior to due date, reminding client hiring managers and AP contacts to verify VMS approval so payments are not pushed to the next bi-weekly cycle.",
    },
    {
      q: "Can enterprise clients settle invoices via ACH, NEFT, or corporate cards?",
      a: "Yes. Jaktra embeds cryptographic, zero-login payment links (/i/:token) in communications. Corporate AP teams can view full invoice statements, backup timesheets, and remit payments via Razorpay (supporting corporate credit cards, NetBanking, UPI, and dedicated virtual bank accounts for direct wire reconciliation) in 30 seconds without creating an account.",
    },
    {
      q: "How does Jaktra preserve client relationships during collection escalation?",
      a: "Enterprise clients are high-value commercial accounts that provide recurring staffing placements. Jaktra's Groq LLaMA 3.1 tone modulation maintains a collaborative, administrative tone in early stages, framing outreach as helpful verification of hours worked rather than aggressive debt collection, while strictly adhering to a 20-hour contact barrier.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-purple-500/30 selection:text-white">
      <SEOHead
        title="AI Accounts Receivable Automation for Staffing & Recruitment Agencies | Jaktra"
        description="Bridge the weekly contractor payroll gap for staffing and recruitment agencies. Automate client collection cadences, triage timesheet disputes via AI, eliminate payroll factoring fees, and accelerate cash flow."
        canonicalPath="/use-cases/staffing-recruiting"
        jsonLd={[
          staffingUseCaseSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Use Cases", path: "/use-cases/saas" },
            { name: "Staffing & Recruiting AR", path: "/use-cases/staffing-recruiting" },
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
          <span className="text-zinc-300">Staffing & Recruiting</span>
        </nav>

        {/* Hero Section */}
        <header className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Staffing Agencies, IT Contracting & Recruitment Firms</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Bridge the Weekly Payroll Gap: Cut 55+ Day Client DSO and Reclaim Factoring Profits
          </h1>
          <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed">
            Staffing agencies must fund contractor payroll every single week, but enterprise clients take 45 to 75+ days to pay invoices. Jaktra automates client collection cadences, triages timesheet approval bottlenecks with AI, and unlocks operating cash flow without expensive payroll factoring.
          </p>
        </header>

        {/* The Payroll Float Callout */}
        <section className="mb-16 p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>The Staffing Payroll Dilemma: Weekly Outflows vs. Net 60 Inflows</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                You cannot delay paying placed software developers, nurses, or temp workers on Friday. When corporate clients stretch payment terms past Day 50, agencies surrender <strong className="text-zinc-200">2.0% to 4.0% of top-line revenue</strong> to payroll factoring facilities, destroying net operating margins.
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

        {/* 4 Core Pillars for Staffing AR */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Timesheet & Overtime Dispute Triage</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              When a client AP contact replies stating that an onsite manager hasn't signed a weekly timesheet or questions an overtime multiplier, Jaktra’s <code className="text-purple-300">dispute_agent.py</code> automatically tags the dispute, halts automated dunning cadences, and alerts your staffing recruiter.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">VMS Pre-Due Verification Cadences</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Never let an invoice sit unapproved in Fieldglass, Beeline, or Coupa. Jaktra coordinates collaborative Stage 1 check-ins 3 days prior to due date, ensuring timesheet releases are validated by hiring managers before the client's bi-weekly AP check run locks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Zero-Login Client Settlement Portals</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Client AP departments can view full invoice details, breakdown hours, and remit payment in 30 seconds via Razorpay (corporate cards, NetBanking, UPI, and dedicated virtual bank accounts) using cryptographic <code className="text-emerald-300">/i/:token</code> links with zero password barriers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Account Manager & Placement Protection</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Client hiring managers control placement renewals. Jaktra acts as an institutional finance desk buffer, using Groq LLaMA 3.1 to modulate tone professionally across early stages, protecting recruiter-client relationships from awkward collection friction.
            </p>
          </div>
        </section>

        {/* Interactive Payroll Factoring vs Jaktra ROI Calculator */}
        <section className="mb-20 p-8 rounded-2xl bg-zinc-900/40 border border-white/10">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Staffing Payroll Factoring Simulator</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Calculate Your Payroll Factoring Profit Reclaim
            </h2>
            <p className="text-sm text-zinc-400">
              See how much net margin your staffing agency loses to payroll factoring fees, and how cutting client DSO with Jaktra lets you self-fund contractor payroll.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Inputs */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-2">
                  <span>Monthly Contractor Payroll Volume:</span>
                  <span className="text-white font-mono font-semibold">${monthlyPayroll.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="2500000"
                  step="50000"
                  value={monthlyPayroll}
                  onChange={(e) => setMonthlyPayroll(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-2">
                  <span>Current Payroll Factoring Fee:</span>
                  <span className="text-white font-mono font-semibold">{factoringRate.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.5"
                  step="0.1"
                  value={factoringRate}
                  onChange={(e) => setFactoringRate(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-2">
                  <span>Average Client Payment DSO:</span>
                  <span className="text-white font-mono font-semibold">{clientDso} days</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="90"
                  step="1"
                  value={clientDso}
                  onChange={(e) => setClientDso(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Right Metrics Box */}
            <div className="lg:col-span-6 p-6 rounded-xl bg-black/60 border border-white/10 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-zinc-900/60 border border-white/5">
                  <div className="text-xs text-zinc-500 mb-1">Monthly Factoring Cost</div>
                  <div className="text-2xl font-bold text-red-400 font-mono">
                    ${Math.round(monthlyFactoringCost).toLocaleString()}/mo
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1">Paid to factoring lender</div>
                </div>

                <div className="p-4 rounded-lg bg-zinc-900/60 border border-white/5">
                  <div className="text-xs text-zinc-500 mb-1">Trapped Payroll Float</div>
                  <div className="text-2xl font-bold text-white font-mono">
                    ${Math.round(trappedPayrollCapital).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1">Locked in outstanding client AP</div>
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

        {/* 5-Stage Staffing Escalation */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Staffing & Recruiting 5-Stage Escalation Workflow
            </h2>
            <p className="text-sm text-zinc-400">
              How Jaktra secures timely invoice payment while protecting recruiter-client relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-blue-500/20">
              <div className="text-xs font-bold text-blue-400 mb-1">Stage 1</div>
              <div className="text-sm font-semibold text-white mb-1">Timesheet Confirmation</div>
              <div className="text-xs text-zinc-500 mb-2">Day -3 to Due Date</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Verifies that contractor hours, bill rates, and manager signoffs are logged in the client's VMS portal.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-emerald-500/20">
              <div className="text-xs font-bold text-emerald-400 mb-1">Stage 2</div>
              <div className="text-sm font-semibold text-white mb-1">AP Disbursement Check</div>
              <div className="text-xs text-zinc-500 mb-2">Days 1–7 Overdue</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Polite administrative inquiry asking if the invoice is approved for the upcoming weekly payment run.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-amber-500/20">
              <div className="text-xs font-bold text-amber-400 mb-1">Stage 3</div>
              <div className="text-sm font-semibold text-white mb-1">Direct Accounting Notice</div>
              <div className="text-xs text-zinc-500 mb-2">Days 8–14 Overdue</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Direct outreach to client controller; offers installment splits if corporate cash release is delayed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-orange-500/20">
              <div className="text-xs font-bold text-orange-400 mb-1">Stage 4</div>
              <div className="text-sm font-semibold text-white mb-1">Placement Pause Warning</div>
              <div className="text-xs text-zinc-500 mb-2">Days 15–30 Overdue</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Authoritative notice stating that active contractor deployment or new candidate submittals are at risk.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-red-500/20">
              <div className="text-xs font-bold text-red-400 mb-1">Stage 5</div>
              <div className="text-sm font-semibold text-white mb-1">Legal Stop & Review</div>
              <div className="text-xs text-zinc-500 mb-2">Day 31+ Overdue</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Automation strictly halts. Escalates file to agency leadership and legal counsel for formal demand.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Frequently Asked Questions: Staffing & Recruiting AR
            </h2>
            <p className="text-sm text-zinc-400">
              Operational guidance on eliminating payroll factoring, managing VMS approvals, and preserving client accounts.
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
            Accelerate Staffing Collections in 15 Minutes
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-8">
            Connect your invoicing or applicant tracking system to Jaktra today. 100% free during Early Access with zero credit card required.
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
