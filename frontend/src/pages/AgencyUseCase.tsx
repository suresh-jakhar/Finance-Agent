import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  Palette,
  ShieldCheck,
  Calculator,
  DollarSign,
  AlertTriangle,
  Users,
  Sparkles,
  Layers,
} from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { agencyUseCaseSchema, breadcrumbSchema } from "../components/common/seo-schemas";
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
          <Link to="/compare" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Compare
          </Link>
          <Link to="/features/5-stage-escalation" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Tone Escalation
          </Link>
          <Link to="/resources/how-to-reduce-dso" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            DSO Guide
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

const AGENCY_STAGES = [
  {
    stage: "Stage 1 (Day -3)",
    title: "Retainer Courtesy Check-in",
    tone: "Polite & Administrative",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    description: "Sends a courtesy verification 3 days before the 1st of the month with the itemized retainer invoice and direct payment link to ensure accounts payable schedules it.",
    sample: "Hi Alex — Sending over invoice #AG-8192 for next month's creative retainer due on the 1st. Let us know if your AP team requires any PO signoffs!",
  },
  {
    stage: "Stage 2 (Day +3)",
    title: "Friendly Milestone Prompt",
    tone: "Warm & Collaborative",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    description: "Politely checks in after due date, providing one-click zero-login settlement links for corporate credit cards, ACH, or wire transfers.",
    sample: "Hi Alex — Just a friendly reminder regarding retainer invoice #AG-8192. You can review the deliverables summary and settle instantly via the secure link below.",
  },
  {
    stage: "Stage 3 (Day +14)",
    title: "Commercial AP Escalation",
    tone: "Firm & Professional",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    description: "Escalates to the client's finance controller and accounts payable inbox, referencing contract payment terms and requesting a firm disbursement date.",
    sample: "Attention Accounts Payable — Retainer invoice #AG-8192 is now 14 days overdue. Please confirm whether remittance has been scheduled for this week's payment cycle.",
  },
  {
    stage: "Stage 4 (Day +30)",
    title: "Executive Account Notice",
    tone: "Direct & Formal",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    description: "Informs executive sponsors (CMO/VP Marketing) and agency leadership. Offers structured installment options for project milestone balances.",
    sample: "Notice of Overdue Account: Balance #AG-8192 is 30 days overdue. To prevent workflow bottlenecks and maintain dedicated creative staffing, please settle the outstanding balance.",
  },
  {
    stage: "Stage 5 (Day +45)",
    title: "Deliverable & Media Pause Notice",
    tone: "Definitive & Compliance",
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
    description: "Final formal notice prior to freezing creative deliverables, campaign ad spend, and staging server access. Strict commercial language with one-click payment cure.",
    sample: "Final Notice: Retainer #AG-8192 remains unpaid. In accordance with Section 4 of our Master Services Agreement, creative deliverables and ad management will pause in 48 hours unless payment is received.",
  },
];

const FAQS = [
  {
    q: "How does Jaktra prevent awkward payment conversations for creative and account directors?",
    a: "Agency founders and account leads should never have to chase overdue retainers—it destroys creative collaboration and weakens leverage during contract expansions. Jaktra acts as an autonomous, objective finance department: early communications are polite, administrative, and assume oversight, allowing your client leads to focus 100% on strategy and campaign delivery.",
  },
  {
    q: "What happens when an agency client disputes out-of-scope billable hours or revisions?",
    a: "If a client replies stating that certain hours were out of scope or revisions exceeded the project quote, Jaktra’s NLP DisputeAgent immediately flags the email, halts all automated collection messages, and generates a pre-drafted briefing citing approved SOWs, PO numbers, and milestone deliverables for your operations director to review.",
  },
  {
    q: "How does Jaktra protect agencies from financing client media and ad spend out of pocket?",
    a: "Many performance marketing agencies float Google and Meta ad spend on corporate credit cards. If a client delays paying their media invoice, the agency faces crippling cash crunches. Jaktra prioritizes media pass-through invoices with automated pre-due verification and rapid escalation cadences so you never bankroll client ad budgets.",
  },
  {
    q: "Can agencies offer installment plans for large overdue project balance milestones?",
    a: "Yes. Rather than writing off an unpaid web design or branding milestone, Jaktra enables you to offer structured 2 to 4 part payment plans via the tokenized debtor portal. Debtors authorize automated scheduled debits, preserving the client relationship while guaranteeing cash recovery.",
  },
  {
    q: "How quickly can a digital agency integrate Jaktra with QuickBooks or Xero?",
    a: "In under 15 minutes. Jaktra connects with QuickBooks Online, Xero, Stripe Invoicing, and FreshBooks. It syncs recurring monthly retainers, customer billing emails, and open project invoices automatically with zero manual entry.",
  },
  {
    q: "Can client AP departments pay via ACH, Wire, or Credit Card without creating an account?",
    a: "Yes. Every reminder includes a cryptographic, zero-login link (`/i/:token`). Your client views the itemized statement with all attached SOW receipts and completes payment via corporate card or ACH transfer in 30 seconds.",
  },
];

export function AgencyUseCase() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeStage, setActiveStage] = useState<number>(0);

  // Agency Cashflow Simulator State
  const [monthlyRetainers, setMonthlyRetainers] = useState<number>(250000); // $250k/mo
  const [passThroughMedia, setPassThroughMedia] = useState<number>(75000); // $75k/mo ad spend
  const [currentDso, setCurrentDso] = useState<number>(62); // 62 days
  const [targetDso, setTargetDso] = useState<number>(38); // 38 days

  // Calculations
  const annualBillings = (monthlyRetainers + passThroughMedia) * 12;
  const dsoReduction = Math.max(0, currentDso - targetDso);
  const dailyCash = annualBillings / 365;
  const capitalUnlocked = Math.round(dailyCash * dsoReduction);
  const mediaFloatProtected = Math.round((passThroughMedia / 30) * dsoReduction);
  const interestSaved = Math.round(capitalUnlocked * 0.08); // 8% cost of capital

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-purple-500/30 selection:text-white">
      <SEOHead
        title="AI Accounts Receivable Automation for Digital & Creative Agencies — Jaktra"
        description="Eliminate awkward client retainer chasing for creative and digital agencies. Protect client relationships, resolve scope disputes autonomously, protect out-of-pocket ad spend, and cut DSO with Jaktra."
        canonicalPath="/use-cases/agencies"
        jsonLd={[
          agencyUseCaseSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industry Solutions", path: "/use-cases" },
            { name: "Digital Agencies AR", path: "/use-cases/agencies" },
          ]),
        ]}
      />

      <HeaderNav />

      <main className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
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
              <Link to="/use-cases" className="hover:text-zinc-300 transition-colors">
                Industry Solutions
              </Link>
            </li>
            <li>/</li>
            <li className="text-zinc-300 font-medium" aria-current="page">
              Digital Agencies
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-xs font-medium mb-4">
            <Palette className="w-3.5 h-3.5" />
            <span>Built for Creative Agencies, Consultancies & Dev Boutiques</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl">
            AI Accounts Receivable Automation for Digital & Creative Agencies
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed">
            Stop making creative directors and account managers chase overdue retainers before pitch presentations. Jaktra acts as an objective institutional finance buffer, resolves scope disputes via AI, and recovers cash without damaging client goodwill.
          </p>
        </header>

        {/* Metrics Banner */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 p-5 rounded-xl bg-white/[0.02] border border-white/10">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">-24 Days</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-1">DSO Compression (62d → 38d)</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">100%</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-1">Media Pass-Through Protected</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">99.1%</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-1">Scope Dispute Accuracy</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">15 Mins</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-1">Setup (QBO, Xero, Stripe)</div>
          </div>
        </section>

        {/* Interactive Agency Cashflow & Media Float Simulator */}
        <section className="mb-20 p-8 rounded-2xl bg-gradient-to-br from-purple-950/30 via-black to-zinc-950 border border-purple-500/20 shadow-xl">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-3">
              <Calculator className="w-3.5 h-3.5" />
              Agency Retainer & Media Float Simulator
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Calculate Cash Unlocked & Media Out-of-Pocket Risk Eliminated
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Model how compressing your client collections cycle from 62 days to 38 days releases locked retainer capital and shields your agency from floating pass-through ad budgets:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                    Monthly Retainer Billings
                  </label>
                  <span className="text-sm font-mono font-bold text-white">
                    ${(monthlyRetainers / 1000).toFixed(0)}K / mo
                  </span>
                </div>
                <input
                  type="range"
                  min={25000}
                  max={1000000}
                  step={25000}
                  value={monthlyRetainers}
                  onChange={(e) => setMonthlyRetainers(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                  <span>$25K/mo</span>
                  <span>$500K/mo</span>
                  <span>$1M/mo</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                    Monthly Pass-Through Ad / Media Spend
                  </label>
                  <span className="text-sm font-mono font-bold text-amber-400">
                    ${(passThroughMedia / 1000).toFixed(0)}K / mo
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={500000}
                  step={10000}
                  value={passThroughMedia}
                  onChange={(e) => setPassThroughMedia(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                  <span>$0 (Pure retainer)</span>
                  <span>$250K/mo</span>
                  <span>$500K/mo (Heavy media float)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Current DSO
                    </label>
                    <span className="text-sm font-mono font-bold text-zinc-200">{currentDso} days</span>
                  </div>
                  <input
                    type="range"
                    min={35}
                    max={90}
                    step={1}
                    value={currentDso}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCurrentDso(val);
                      if (val <= targetDso) setTargetDso(Math.max(20, val - 10));
                    }}
                    className="w-full accent-zinc-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Target Jaktra DSO
                    </label>
                    <span className="text-sm font-mono font-bold text-emerald-400">{targetDso} days</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={Math.max(25, currentDso - 5)}
                    step={1}
                    value={targetDso}
                    onChange={(e) => setTargetDso(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Results Box */}
            <div className="lg:col-span-5 bg-black/60 rounded-xl p-6 border border-white/10 space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-1">
                  <DollarSign className="w-4 h-4 text-emerald-400" /> Working Capital Reclaimed
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">
                  ${capitalUnlocked.toLocaleString()}
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                  Cash pulled forward from unpaid client retainers and project billings.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] text-zinc-400 uppercase font-semibold">
                    Media Float Protected
                  </div>
                  <div className="text-base font-bold text-white mt-0.5 font-mono">
                    ${mediaFloatProtected.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-zinc-500">Unfunded ad spend eliminated</span>
                </div>
                <div>
                  <div className="text-[11px] text-zinc-400 uppercase font-semibold">
                    Interest Costs Saved
                  </div>
                  <div className="text-base font-bold text-white mt-0.5 font-mono">
                    ${interestSaved.toLocaleString()}/yr
                  </div>
                  <span className="text-[10px] text-zinc-500">At 8% working capital rate</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/register"
                  className="w-full py-2.5 px-4 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  Accelerate Agency Cash Flow Free <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Core Agency AR Dilemmas Solved */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Why Agency Client Collections Break Down
            </h2>
            <p className="text-sm text-zinc-400">
              Creative partnerships are fragile. Chasing money creates tension right before pitch presentations or contract renewals. Here is how Jaktra fixes it:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Preserving Creative & Account Goodwill
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  When account leads chase unpaid invoices, clients become defensive during creative reviews. Jaktra acts as an objective, polite third-party finance department, keeping your account team positioned entirely on strategy and delivery.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-purple-300 font-medium">
                Zero awkward debt conversations for creative directors
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Scope-Creep & Revision Dispute Triage
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Clients often delay an entire invoice over a dispute regarding 3 hours of out-of-scope work. Jaktra’s NLP DisputeAgent detects the issue, pauses automated reminders, and briefs your ops director with signed SOW clauses to resolve it immediately.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-emerald-300 font-medium">
                Automated dispute quarantine protects client trust
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Stopping Media Budget Float
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Agencies cannot afford to fund hundreds of thousands in Google, Meta, or TikTok media spend on internal credit lines. Jaktra runs dedicated pre-due verification cadences for media pass-throughs, ensuring prompt client reimbursement.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-blue-300 font-medium">
                Shields agency operating lines from media defaults
              </div>
            </div>
          </div>
        </section>

        {/* The 5-Stage Agency Cadence Walkthrough */}
        <section className="mb-20 p-8 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Groq LLaMA 3.1 Tone Escalation
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              The 5-Stage Agency Retainer Cadence
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Jaktra modulates communication urgency as overdue days accumulate, preserving customer goodwill early and escalating firmly when accounts become delinquent:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Stage Selector */}
            <div className="lg:col-span-5 space-y-2">
              {AGENCY_STAGES.map((s, idx) => (
                <button
                  key={s.stage}
                  onClick={() => setActiveStage(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    activeStage === idx
                      ? "bg-white/10 border-white/30 shadow-sm"
                      : "bg-white/[0.01] border-white/5 hover:border-white/15 text-zinc-400"
                  }`}
                >
                  <div>
                    <div className="text-xs font-mono font-semibold text-zinc-400">{s.stage}</div>
                    <div className="text-sm font-bold text-white mt-0.5">{s.title}</div>
                  </div>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${s.badge}`}>
                    {s.tone}
                  </span>
                </button>
              ))}
            </div>

            {/* Stage Detail Card */}
            <div className="lg:col-span-7 p-6 rounded-xl bg-black/60 border border-white/10 space-y-4">
              <div>
                <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded border ${AGENCY_STAGES[activeStage].badge}`}>
                  {AGENCY_STAGES[activeStage].stage} • {AGENCY_STAGES[activeStage].tone}
                </span>
                <h3 className="text-xl font-bold text-white mt-3">
                  {AGENCY_STAGES[activeStage].title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {AGENCY_STAGES[activeStage].description}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold block mb-1">
                  AI Communication Excerpt
                </span>
                <p className="text-xs font-mono text-zinc-300 italic leading-relaxed">
                  "{AGENCY_STAGES[activeStage].sample}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Protected by 20-hour contact barrier
                </span>
                <Link
                  to="/features/5-stage-escalation"
                  className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-1"
                >
                  Full Escalation Spec <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Frequently Asked Questions for Agency Leaders
            </h2>
            <p className="text-sm text-zinc-400">
              Common questions about deploying automated AR across your client roster:
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white hover:text-purple-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
                      openFaq === i ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-xs text-zinc-400 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-black p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Accelerate Retainer Cash Flow & Protect Client Trust
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-6">
            Connect QuickBooks, Xero, or Stripe in 15 minutes. 100% free during Early Access with zero credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-200 transition-colors shadow-lg"
            >
              <span>Get started free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/use-cases"
              className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Explore All 14 Industry Solutions
            </Link>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

export default AgencyUseCase;
