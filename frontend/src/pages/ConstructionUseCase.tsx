import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, HardHat, ShieldCheck, Clock, Hammer, Calculator, FileCheck2, AlertCircle } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { constructionUseCaseSchema, breadcrumbSchema } from "../components/common/seo-schemas";

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

export default function ConstructionUseCase() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Calculator State
  const [contractVolume, setContractVolume] = useState<number>(6000000);
  const [baselineDso, setBaselineDso] = useState<number>(82);
  const [retainagePercent, setRetainagePercent] = useState<number>(10);
  const interestRate = 0.095; // 9.5% commercial line of credit / payroll factoring rate

  const totalCapitalTrapped = (contractVolume / 365) * baselineDso;
  const retainageTrapped = contractVolume * (retainagePercent / 100);
  const annualFinancingCost = totalCapitalTrapped * interestRate;

  // Realistic Jaktra impact: 21 days DSO reduction
  const dsoReduction = Math.min(baselineDso - 45, 21);
  const freedCapital = (contractVolume / 365) * dsoReduction;
  const annualInterestSaved = freedCapital * interestRate;

  const faqs = [
    {
      q: "How does Jaktra accommodate pay-when-paid clauses and owner billing cycles?",
      a: "Commercial trade contractors often deal with general contractors waiting on project owner disbursements. Rather than blasting aggressive overdue demands that antagonize the GC, Jaktra initiates courteous administrative check-ins (Stage 1 & 2) that verify whether pay application paperwork, lien waivers, and certified payroll records are approved. If the GC indicates the owner hasn't released funds, our NLP agent tags the status, adjusts the follow-up cadence, and alerts your project executive.",
    },
    {
      q: "What happens when a general contractor disputes a change order or punch-list item?",
      a: "In construction, billing disputes over unapproved change orders or disputed punch-list items can freeze an entire monthly application. Jaktra's DisputeAgent (ai-service/src/agents/dispute_agent.py) parses inbound emails from project managers and GCs. If an email mentions disputed change orders, defective work, or retainage withholdings, Jaktra immediately tags the invoice as 'dispute', halts automated dunning cadences, and drafts a resolution briefing for your billing manager.",
    },
    {
      q: "Can Jaktra track and accelerate retainage releases?",
      a: "Yes. Retainage (often 5%–10% withheld until project substantial completion) is one of the biggest drains on subcontractor balance sheets. Jaktra supports distinct retainage milestone tracking, deploying tailored, cordial inquiry sequences once certificates of occupancy or substantial completion are issued to ensure retainage is not forgotten by the GC’s accounting department.",
    },
    {
      q: "How does the Stage 5 Legal Stop protect preliminary notice and mechanics lien rights?",
      a: "Statutory deadlines for mechanics liens and Miller Act bond claims typically range from 60 to 90 days from the last date labor or materials were furnished. Jaktra’s Stage 5 Legal Stop strictly halts automated communications at 31+ days overdue, locking the audit log and escalating the delinquent account to your legal/credit team well in advance of statutory lien notice deadlines.",
    },
    {
      q: "Can GC project managers pay or approve milestone invoices from mobile devices?",
      a: "Yes. General contractors and project executives are frequently on job sites without access to desktop computers. Jaktra sends cryptographic, zero-login payment links (/i/:token) that allow GC personnel to inspect the invoice statement and approve payment directly from their mobile phone via Razorpay rails without logging into an account.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-amber-500/30 selection:text-white">
      <SEOHead
        title="AI Accounts Receivable Automation for Construction & Subcontractors | Jaktra"
        description="Accelerate cash flow for commercial contractors and subcontractors. Automate progress billing reminders, triage change-order disputes, track retainage releases, and cut construction DSO with Jaktra."
        canonicalPath="/use-cases/construction"
        jsonLd={[
          constructionUseCaseSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Use Cases", path: "/use-cases/saas" },
            { name: "Construction AR", path: "/use-cases/construction" },
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
          <span className="text-zinc-300">Construction & Subcontractors</span>
        </nav>

        {/* Hero Section */}
        <header className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
            <HardHat className="w-3.5 h-3.5" />
            <span>Commercial Contractors & Specialty Trades</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Eliminate the Construction Cash Crunch: Cut 80+ Day DSO and Recover Trapped Retainage
          </h1>
          <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed">
            Construction contractors carry weekly payroll and material costs while waiting 60 to 90+ days for progress billings and retainage. Jaktra automates progress billing follow-ups, triages change-order disputes via AI, and accelerates cash flow without damaging GC relationships.
          </p>
        </header>

        {/* The Construction Reality Callout */}
        <section className="mb-16 p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>The Longest Days Sales Outstanding (DSO) in the Economy</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Across commercial construction, the average DSO hovers between <strong className="text-zinc-200">75 and 85 days</strong>. Add 5% to 10% retainage withholdings, pay-when-paid clauses, and unapproved change order bottlenecks, and subcontractors are forced into costly line-of-credit financing just to fund payroll.
              </p>
            </div>
            <Link
              to="/resources/how-to-reduce-dso"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-sm text-white font-medium transition-colors shrink-0"
            >
              <span>Read DSO Playbook</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 4 Core Pillars for Construction AR */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Progress Billing & Pay App Synchronization</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Jaktra coordinates gentle, administrative check-ins aligned with monthly application cutoff dates. Verifies whether AIA G702/G703 applications, conditional lien waivers, and backup documentation have been received by the GC before the billing window closes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Change-Order & Punch-List Dispute Triage</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              When a GC replies stating that a change order was not approved or that a punch-list inspection is pending, Jaktra’s <code className="text-blue-300">dispute_agent.py</code> automatically categorizes the inquiry, freezes automated cadences, and alerts your project executive.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Hammer className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Retainage Release Tracking</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Retainage accounts for the entire contractor profit margin on many jobs. Jaktra features dedicated retainage escalation workflows that trigger when substantial completion is logged, systematically ensuring retainage draws are processed rather than trapped indefinitely.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Zero-Login Mobile Settlement for Job Sites</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Project superintendents and GC finance managers are rarely in front of a desk. Jaktra’s tokenized <code className="text-purple-300">/i/:token</code> portal allows GCs to view payment statements and authorize instant payment via Razorpay (UPI, NetBanking, Cards, NEFT) directly from a mobile device.
            </p>
          </div>
        </section>

        {/* Interactive Construction Working Capital Calculator */}
        <section className="mb-20 p-8 rounded-2xl bg-zinc-900/40 border border-white/10">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Contractor Cash Flow Calculator</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Calculate Trapped Retainage & Working Capital
            </h2>
            <p className="text-sm text-zinc-400">
              See how shortening your collection cycle by 21 days unlocks working capital and slashes payroll line-of-credit financing fees.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Inputs */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-2">
                  <span>Annual Contract / Billing Volume:</span>
                  <span className="text-white font-mono font-semibold">${contractVolume.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="25000000"
                  step="500000"
                  value={contractVolume}
                  onChange={(e) => setContractVolume(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-2">
                  <span>Current Baseline DSO (Days Sales Outstanding):</span>
                  <span className="text-white font-mono font-semibold">{baselineDso} days</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="120"
                  step="1"
                  value={baselineDso}
                  onChange={(e) => setBaselineDso(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-2">
                  <span>Standard Retainage Withholding:</span>
                  <span className="text-white font-mono font-semibold">{retainagePercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={retainagePercent}
                  onChange={(e) => setRetainagePercent(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Right Metrics Box */}
            <div className="lg:col-span-6 p-6 rounded-xl bg-black/60 border border-white/10 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-zinc-900/60 border border-white/5">
                  <div className="text-xs text-zinc-500 mb-1">Total Trapped Working Capital</div>
                  <div className="text-2xl font-bold text-white font-mono">
                    ${Math.round(totalCapitalTrapped).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1">Locked in outstanding pay apps</div>
                </div>

                <div className="p-4 rounded-lg bg-zinc-900/60 border border-white/5">
                  <div className="text-xs text-zinc-500 mb-1">Retainage Trapped on Jobs</div>
                  <div className="text-2xl font-bold text-amber-400 font-mono">
                    ${Math.round(retainageTrapped).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1">Withheld until final signoff</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-300">Capital Freed with Jaktra (-{dsoReduction} Days DSO):</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    +${Math.round(freedCapital).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-emerald-500/15">
                  <span className="text-[11px] text-zinc-400">Current Financing Cost:</span>
                  <span className="text-xs text-zinc-400 font-mono">
                    ${Math.round(annualFinancingCost).toLocaleString()} / yr
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-white/5">
                  <span className="text-[11px] text-emerald-400 font-medium">Annual LOC Interest Saved:</span>
                  <span className="text-sm font-semibold text-white font-mono">
                    ${Math.round(annualInterestSaved).toLocaleString()} / year
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Stage Escalation Matrix for Construction */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Construction 5-Stage Tone Escalation Workflow
            </h2>
            <p className="text-sm text-zinc-400">
              How Jaktra safeguards contractor-GC relationships while securing timely project disbursements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-blue-500/20">
              <div className="text-xs font-bold text-blue-400 mb-1">Stage 1</div>
              <div className="text-sm font-semibold text-white mb-1">Pay App Confirmation</div>
              <div className="text-xs text-zinc-500 mb-2">Day -5 to Due Date</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Verifies receipt of AIA pay application, conditional lien waivers, and certified payroll before cutoff.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-emerald-500/20">
              <div className="text-xs font-bold text-emerald-400 mb-1">Stage 2</div>
              <div className="text-sm font-semibold text-white mb-1">Disbursement Check-in</div>
              <div className="text-xs text-zinc-500 mb-2">Days 1–14 Overdue</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Polite status inquiry regarding owner funding release and scheduled payment run dates.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-amber-500/20">
              <div className="text-xs font-bold text-amber-400 mb-1">Stage 3</div>
              <div className="text-sm font-semibold text-white mb-1">Direct Accounting Notice</div>
              <div className="text-xs text-zinc-500 mb-2">Days 15–25 Overdue</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Direct outreach to GC controller; offers milestone installment splits if project funding is delayed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-orange-500/20">
              <div className="text-xs font-bold text-orange-400 mb-1">Stage 4</div>
              <div className="text-sm font-semibold text-white mb-1">Project Executive Warning</div>
              <div className="text-xs text-zinc-500 mb-2">Days 26–30 Overdue</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Authoritative notice indicating that material supply or active job site staffing may be impacted.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-red-500/20">
              <div className="text-xs font-bold text-red-400 mb-1">Stage 5</div>
              <div className="text-sm font-semibold text-white mb-1">Lien Rights & Legal Stop</div>
              <div className="text-xs text-zinc-500 mb-2">Day 31+ Overdue</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Automation strictly halts. Escalates file to credit counsel for preliminary notice or mechanics lien evaluation.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Frequently Asked Questions: Construction AR
            </h2>
            <p className="text-sm text-zinc-400">
              Common questions about automating progress billings, managing lien deadlines, and preserving contractor relationships.
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
            Accelerate Construction Cash Flow with AI in 15 Minutes
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-8">
            Connect your invoicing software to Jaktra today. 100% free during Early Access with zero credit card required.
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
