import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  TrendingUp,
  ShieldCheck,
  CreditCard,
  Calculator,
  DollarSign,
  AlertTriangle,
  Users,
  Sparkles,
} from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { saasUseCaseSchema, breadcrumbSchema } from "../components/common/seo-schemas";
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

const DUNNING_STAGES = [
  {
    stage: "Stage 1 (Day -3)",
    title: "Proactive Courtesy Notice",
    tone: "Polite & Administrative",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    description: "Sends a gentle verification reminder 3 days before due date with the itemized invoice and direct payment link to confirm AP received the statement.",
    sample: "Hi Sarah — Just sharing a courtesy copy of invoice #INV-4921 due on Friday. Let us know if you need any PO updates or tax documents from our side!",
  },
  {
    stage: "Stage 2 (Day +3)",
    title: "Friendly Settlement Prompt",
    tone: "Helpful & Collaborative",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    description: "Checks in after due date, providing one-click links for updating expired corporate credit cards, ACH details, or raising a billing question.",
    sample: "Hi Sarah — Following up on invoice #INV-4921. You can update your payment method or complete settlement in one click using your secure portal link below.",
  },
  {
    stage: "Stage 3 (Day +14)",
    title: "Commercial Cadence Escalation",
    tone: "Firm & Professional",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    description: "Escalates to the primary billing controller and copy-notifies the client account owner, highlighting terms and asking for a scheduled remittance date.",
    sample: "Hello Accounting Team — Invoice #INV-4921 is now 14 days overdue. Please confirm whether this is scheduled in this week's payment run or if there is an issue we can resolve.",
  },
  {
    stage: "Stage 4 (Day +30)",
    title: "Executive Finance Notice",
    tone: "Formal & Urgency-Driven",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    description: "Informs executive contacts and internal customer success leads. Offers structured installment plan options to clear the balance without service interruption.",
    sample: "Notice of Overdue Account: Account #AC-281 is 30 days past due. To prevent account suspension and retain unhindered access, please settle the outstanding balance or select a payment plan.",
  },
  {
    stage: "Stage 5 (Day +45)",
    title: "Service Suspension Warning",
    tone: "Definitive & Compliance",
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
    description: "Final formal notice before automated API/workspace access pause. Strict compliance formatting with options for immediate digital cure.",
    sample: "Final Notice: Service access for your workspace is scheduled for suspension in 5 business days unless payment is recorded. Settle immediately to avoid data access interruption.",
  },
];

const FAQS = [
  {
    q: "How does Jaktra prevent involuntary churn for B2B SaaS companies?",
    a: "When subscription invoices go past due due to expired cards or missed AP approval runs, generic dunning emails often land in spam or alienate buyers. Jaktra uses AI tone escalation across 5 stages and provides a secure, tokenized debtor portal where customers can update payment details, pay instantly via ACH/credit card, or select an installment schedule without customer success intervention.",
  },
  {
    q: "How does Jaktra handle usage-based invoice disputes and seat true-ups?",
    a: "If a SaaS debtor replies with a question about overage hours, API call spikes, or seat license discrepancies, Jaktra’s NLP classifier detects the dispute topic, immediately pauses automated dunning to prevent relationship damage, and routes a structured summary with contract references directly to your finance or CS team.",
  },
  {
    q: "Can our sales reps and account managers view collections activity before renewal calls?",
    a: "Yes. Jaktra provides role-based visibility and audit logs. Account executives and Customer Success Managers can check live communication feeds and overdue balances directly before jumping into quarterly business reviews (QBRs) or annual renewal contract negotiations.",
  },
  {
    q: "How fast does Jaktra integrate with existing SaaS billing systems?",
    a: "You can connect QuickBooks Online, Xero, Stripe Invoicing, or Chargebee in under 15 minutes. Jaktra synchronizes open invoices, debtor emails, and payment updates bidirectionally with zero engineering required.",
  },
  {
    q: "Does Jaktra support self-serve payment plans for cash-strapped subscribers?",
    a: "Yes. In Stages 3 and 4, Jaktra can offer customizable installment schedules. Overdue debtors can split large annual contracts into 2 to 4 automated monthly payments via ACH or card, preserving Net Revenue Retention and avoiding contract write-offs.",
  },
  {
    q: "Will autonomous AI collections damage our sensitive corporate client relationships?",
    a: "Never. Jaktra’s Groq LLaMA 3.1 model operates with strict SaaS guardrails: early stages are framed as helpful administrative assistance rather than aggressive debt collection, and a built-in 20-hour contact barrier prevents spamming client executives.",
  },
];

export function SaasUseCase() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeStage, setActiveStage] = useState<number>(0);

  // SaaS ROI Simulator State
  const [annualArr, setAnnualArr] = useState<number>(3000000); // $3M ARR
  const [overduePercent, setOverduePercent] = useState<number>(14); // 14% past due
  const [currentDso, setCurrentDso] = useState<number>(52); // 52 days
  const [targetDso, setTargetDso] = useState<number>(34); // 34 days

  // Derived Calculations
  const overdueArr = annualArr * (overduePercent / 100);
  const dsoCompression = Math.max(0, currentDso - targetDso);
  const dailyRevenue = annualArr / 365;
  const cashUnlocked = Math.round(dailyRevenue * dsoCompression);
  const churnPrevented = Math.round(overdueArr * 0.22); // 22% of overdue ARR saved from involuntary churn
  const interestSaved = Math.round(cashUnlocked * 0.08); // 8% cost of capital

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-white">
      <SEOHead
        title="AI Accounts Receivable Automation for B2B SaaS — Jaktra"
        description="Eliminate manual collections for B2B SaaS. Recover overdue ARR, resolve usage and seat disputes autonomously, protect Net Revenue Retention (NRR), and cut DSO with Jaktra."
        canonicalPath="/use-cases/saas"
        jsonLd={[
          saasUseCaseSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industry Solutions", path: "/use-cases" },
            { name: "B2B SaaS AR", path: "/use-cases/saas" },
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
              B2B SaaS
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-medium mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Protect Net Revenue Retention (NRR) & Accelerate ARR Cash Conversion</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl">
            AI Accounts Receivable Automation Built for B2B SaaS & Cloud Software
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed">
            Stop making account executives and CSMs chase overdue subscription invoices. Jaktra acts as an autonomous finance buffer: resolving usage and seat disputes via AI, preserving client goodwill, and accelerating overdue ARR into operating cash.
          </p>
        </header>

        {/* Metrics Banner */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 p-5 rounded-xl bg-white/[0.02] border border-white/10">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">-18 Days</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-1">DSO Compression (52d → 34d)</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">+4.2%</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-1">NRR Protection Rate</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono">99.4%</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-1">Dispute Triage Accuracy</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">15 Mins</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-1">Setup (Stripe, QBO, Xero)</div>
          </div>
        </section>

        {/* Interactive SaaS Working Capital & NRR Calculator */}
        <section className="mb-20 p-8 rounded-2xl bg-gradient-to-br from-blue-950/30 via-black to-zinc-950 border border-blue-500/20 shadow-xl">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-3">
              <Calculator className="w-3.5 h-3.5" />
              SaaS Cashflow & NRR Simulator
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Calculate Cash Unlocked & Involuntary Churn Prevented
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Model how compressing your dunning cycles from 52 days to 34 days accelerates overdue recurring revenue and protects Net Revenue Retention:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                    Annual Recurring Revenue (ARR)
                  </label>
                  <span className="text-sm font-mono font-bold text-white">
                    ${(annualArr / 1000000).toFixed(1)}M USD
                  </span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={25000000}
                  step={250000}
                  value={annualArr}
                  onChange={(e) => setAnnualArr(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                  <span>$500K</span>
                  <span>$12M</span>
                  <span>$25M</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                    Estimated Overdue Invoices
                  </label>
                  <span className="text-sm font-mono font-bold text-amber-400">
                    {overduePercent}% (${Math.round(overdueArr).toLocaleString()})
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={overduePercent}
                  onChange={(e) => setOverduePercent(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                  <span>5% (Best-in-class)</span>
                  <span>15% (Typical SaaS)</span>
                  <span>30% (High risk)</span>
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
                    max={75}
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
                  <DollarSign className="w-4 h-4 text-emerald-400" /> Working Capital Released
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">
                  ${cashUnlocked.toLocaleString()}
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                  Overdue subscription ARR pulled forward onto your balance sheet.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] text-zinc-400 uppercase font-semibold">
                    Involuntary Churn Saved
                  </div>
                  <div className="text-base font-bold text-white mt-0.5 font-mono">
                    ${churnPrevented.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-zinc-500">Preserved ARR</span>
                </div>
                <div>
                  <div className="text-[11px] text-zinc-400 uppercase font-semibold">
                    Capital Cost Saved
                  </div>
                  <div className="text-base font-bold text-white mt-0.5 font-mono">
                    ${interestSaved.toLocaleString()}/yr
                  </div>
                  <span className="text-[10px] text-zinc-500">At 8% rate</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/register"
                  className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  Accelerate Your SaaS Cash Flow <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Core SaaS Dilemmas Solved */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Why Traditional SaaS Dunning Fails High-Value B2B Accounts
            </h2>
            <p className="text-sm text-zinc-400">
              Generic billing tools fire robotic emails that get flagged as spam or damage relationships right before renewals. Here is how Jaktra solves it:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Protecting Renewal Goodwill
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  When account executives or CS leads are pulled into chasing late invoices, buyers become defensive and threaten non-renewal. Jaktra acts as an objective, polite third-party finance buffer, separating commercial relationship management from billing compliance.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-blue-300 font-medium">
                Zero sales friction during QBRs
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Usage & Seat True-up Dispute Triage
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  In usage-based or seat-tiered SaaS, debtors often freeze payments over surprise overage line-items. Jaktra’s NLP DisputeAgent instantly detects the query, halts reminder sequences, and generates a pre-formatted contract usage audit for your team.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-emerald-300 font-medium">
                Halts automated cadences during disputes
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Tokenized Zero-Login Settlement
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Every reminder includes a secure cryptographic debtor link. Clients update expired corporate cards, verify billing contacts, or remit ACH transfers in 30 seconds with zero password or account setup friction.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-purple-300 font-medium">
                One-click ACH, Wire & Card Settlement
              </div>
            </div>
          </div>
        </section>

        {/* The 5-Stage SaaS Dunning Cadence Walkthrough */}
        <section className="mb-20 p-8 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Groq LLaMA 3.1 Tone Escalation
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              The 5-Stage SaaS Dunning Cadence
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Jaktra modulates communication urgency as overdue days accumulate, preserving customer goodwill early and escalating firmly when accounts become delinquent:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Stage Selector */}
            <div className="lg:col-span-5 space-y-2">
              {DUNNING_STAGES.map((s, idx) => (
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
                <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded border ${DUNNING_STAGES[activeStage].badge}`}>
                  {DUNNING_STAGES[activeStage].stage} • {DUNNING_STAGES[activeStage].tone}
                </span>
                <h3 className="text-xl font-bold text-white mt-3">
                  {DUNNING_STAGES[activeStage].title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {DUNNING_STAGES[activeStage].description}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold block mb-1">
                  AI Communication Excerpt
                </span>
                <p className="text-xs font-mono text-zinc-300 italic leading-relaxed">
                  "{DUNNING_STAGES[activeStage].sample}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Protected by 20-hour contact barrier
                </span>
                <Link
                  to="/features/5-stage-escalation"
                  className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
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
              Frequently Asked Questions for B2B SaaS Finance Teams
            </h2>
            <p className="text-sm text-zinc-400">
              Everything you need to know about deploying Jaktra across your SaaS subscriber base:
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
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white hover:text-blue-300 transition-colors"
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
        <section className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-black p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Reclaim Overdue ARR & Protect Net Revenue Retention
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

export default SaasUseCase;
