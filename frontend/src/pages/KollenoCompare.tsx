import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, ChevronDown, Sparkles, ShieldCheck, Zap, Bot, Scale, Layers, PhoneCall } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { kollenoCompareSchema, breadcrumbSchema } from "../components/common/seo-schemas";
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
          <Link to="/features/5-stage-escalation" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Tone Escalation
          </Link>
          <Link to="/features/installment-plans" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Installments
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

interface ComparisonRow {
  feature: string;
  category: string;
  kolleno: string;
  jaktra: string;
  highlight?: boolean;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: "Core Architecture & Operating Model",
    category: "Architecture",
    kolleno: "Omnichannel collector task queues (call logs, SMS, manual tasks)",
    jaktra: "Lightweight autonomous AI collections execution agent (zero call queues)",
    highlight: true,
  },
  {
    feature: "Outbound Communication Engine",
    category: "Messaging",
    kolleno: "Static email templates and multi-channel scheduled tasks",
    jaktra: "Groq LLaMA 3.1 generative tone modulation across 5 stages",
    highlight: true,
  },
  {
    feature: "Inbound Debtor Reply Triage",
    category: "Workflow",
    kolleno: "Manual collector review in shared inbox; manual dispute tagging",
    jaktra: "NLP DisputeAgent auto-classifies replies & halts cadences instantly",
    highlight: true,
  },
  {
    feature: "Debtor Payment Portal Access",
    category: "Debtor Experience",
    kolleno: "Multi-step customer portal requiring account setup or sign-in",
    jaktra: "Cryptographic zero-login portal (/i/:token) with instant 30s Razorpay settlement",
    highlight: true,
  },
  {
    feature: "Delinquency Recovery Rails",
    category: "Flexibility",
    kolleno: "Collector manually negotiates terms and logs custom installment notes",
    jaktra: "Debtor self-serves structured 2x/3x/4x automated installment plans",
    highlight: true,
  },
  {
    feature: "Deliverability & Reputation Guardrails",
    category: "Deliverability",
    kolleno: "Standard mailer relay; manual bounce handling",
    jaktra: "Dead Letter Queue (DLQ), 3-drop circuit breaker, 20-hr idempotency guard",
    highlight: true,
  },
  {
    feature: "Contract Terms & Annual Pricing",
    category: "Commercial",
    kolleno: "$8,000 to $18,000+/yr annual contracts with sales demo gates",
    jaktra: "100% Free during Early Access (No credit card required)",
    highlight: true,
  },
];

export default function KollenoCompare() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // TCO Savings Calculator State
  const [kollenoAnnualFee, setKollenoAnnualFee] = useState<number>(12500);
  const [collectorCount, setCollectorCount] = useState<number>(2);

  // Calculations
  const jaktraAnnualCost = 0; // 100% Free during Early Access
  const directSoftwareSavings = kollenoAnnualFee - jaktraAnnualCost;
  const hoursSavedPerMonth = collectorCount * 36; // ~36 hrs/mo per collector automated
  const annualHoursSaved = hoursSavedPerMonth * 12;
  const laborValueReclaimed = annualHoursSaved * 45; // $45/hr blended finance labor cost
  const totalAnnualBenefit = directSoftwareSavings + laborValueReclaimed;

  const faqs = [
    {
      q: "What is the primary architectural difference between Kolleno and Jaktra?",
      a: "Kolleno is an omnichannel AR management workspace designed to organize human collectors with task queues, manual call logging, and multi-channel message scheduling. Jaktra is an Autonomous Conversational AI Collections Agent designed to eliminate manual collector task lists altogether. Jaktra dynamically writes and modulates email tone using Groq LLaMA 3.1, automatically classifies inbound replies via NLP, and provides tokenized zero-login payment links.",
    },
    {
      q: "Why do finance teams switch from Kolleno to Jaktra?",
      a: "Finance leaders frequently switch because Kolleno still requires significant human collector hours to manage queues and respond to incoming emails. Jaktra automates the entire follow-up and sentiment classification lifecycle autonomously, reducing collector labor by 70%+ while costing a fraction of Kolleno's $8,000–$18,000+/year contracts.",
    },
    {
      q: "How does Jaktra handle debtor dispute emails compared to Kolleno?",
      a: "In Kolleno, incoming debtor replies land in a shared communications inbox where a collector must manually read, tag, and assign the dispute. Jaktra uses an NLP DisputeAgent (ai-service/src/agents/dispute_agent.py) that instantly classifies replies into disputes, promises, or queries upon receipt, automatically pauses the collection cadence, and generates a context-aware drafted response for one-click human approval.",
    },
    {
      q: "Does Jaktra require multi-step debtor portal logins?",
      a: "No. Requiring customer AP contacts to create a password or log into a portal introduces friction that delays payments by days. Jaktra generates cryptographic, tokenized links (/i/:token) that allow debtors to view invoices, inspect statements, and remit payment in 30 seconds via Razorpay (corporate cards, NetBanking, UPI, and dedicated virtual bank accounts).",
    },
    {
      q: "Can debtors select installment payment plans autonomously?",
      a: "Yes. In Jaktra, debtors who cannot pay in full can self-select 2x, 3x, or 4x milestone installment plans directly inside the tokenized portal. Jaktra automatically schedules the payment milestones and coordinates follow-ups without requiring a collector to manually draft payment agreements.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-purple-500/30 selection:text-white">
      <SEOHead
        title="Kolleno Alternative — Autonomous Conversational AI vs Manual Collector Task Lists | Jaktra"
        description="Compare Kolleno vs Jaktra. Learn why finance teams choose Jaktra's autonomous Groq LLaMA 3.1 tone escalation and NLP dispute triage over Kolleno's manual collector task lists and multi-channel queues."
        canonicalPath="/compare/kolleno-alternative"
        jsonLd={[
          kollenoCompareSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Comparisons", path: "/#compare" },
            { name: "Kolleno Alternative", path: "/compare/kolleno-alternative" },
          ]),
        ]}
      />

      <HeaderNav />

      <main className="pt-24 pb-20">
        {/* HERO SECTION */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-6">
            <Scale className="w-3.5 h-3.5" />
            COMPETITOR COMPARISON &amp; ARCHITECTURAL FIT
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight font-display">
            Kolleno vs. Jaktra: Manual Collector Task Queues vs. Autonomous Conversational AI
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Kolleno organizes human collectors with multi-channel calling lists and manual task queues. Jaktra eliminates collector calling lists entirely with an autonomous conversational AI agent that modulates tone across 5 stages in 15 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-all shadow-md"
            >
              Get started free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all"
            >
              Explore Free Early Access
            </Link>
          </div>
        </section>

        {/* ARCHITECTURAL STANCE */}
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Two Distinct Operating Models for Accounts Receivable
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
              Do you want to equip human collectors with a daily call list, or do you want an autonomous AI agent that executes collection cadences for you?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">When You Need Kolleno</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  Kolleno is built for finance teams that want to maintain a hands-on credit control staff and need a centralized hub for:
                </p>
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Orchestrating phone call scripts, manual phone logs, and SMS cadences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Assigning manual daily task checklists to junior credit controllers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Handling multi-channel inbound messaging inside a unified shared inbox</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>$10k–$18k/year software budget with multi-week onboarding</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs text-blue-400 font-medium">
                Best for: Teams with dedicated credit controllers who execute outbound calls daily
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">When You Need Jaktra</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  Jaktra is built for high-velocity finance teams that want autonomous execution without paying for human calling queues:
                </p>
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Autonomous Groq LLaMA 3.1 tone escalation across 5 stages (no human queues needed)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Automated NLP dispute triage (<code className="text-[11px] text-emerald-300">dispute_agent.py</code>) with cadence auto-freeze</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Cryptographic zero-login debtor links (<code className="text-[11px] text-emerald-300">/i/:token</code>) with 30s Razorpay settlement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>15-minute setup with 100% Free Early Access (No credit card required)</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-500/20 text-xs text-emerald-400 font-medium">
                Best for: Modern B2B teams wanting autonomous AI recovery without collector queues
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON MATRIX */}
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Comprehensive Head-to-Head Comparison Matrix
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
              Detailed technical evaluation between Kolleno’s task-list workflow and Jaktra’s autonomous execution engine.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs text-zinc-400">
                  <th className="py-3 px-4 font-semibold">Capability</th>
                  <th className="py-3 px-4 font-semibold text-zinc-400">Kolleno Management Suite</th>
                  <th className="py-3 px-4 font-semibold text-white">Jaktra AI Collections Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-zinc-300">
                {COMPARISON_DATA.map((row, idx) => (
                  <tr key={idx} className={row.highlight ? "bg-white/[0.015]" : ""}>
                    <td className="py-3.5 px-4 font-medium text-white">
                      {row.feature}
                      <span className="block text-[10px] text-zinc-500 font-normal">{row.category}</span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 leading-relaxed">{row.kolleno}</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-medium leading-relaxed">{row.jaktra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* TCO SAVINGS CALCULATOR */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-white/5">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Software TCO &amp; Collector Savings Calculator</h3>
                <p className="text-xs text-zinc-400">Estimate your annual financial savings by switching from Kolleno to Jaktra.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">
                  Estimated Kolleno Annual Contract: ${kollenoAnnualFee.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={7000}
                  max={25000}
                  step={1000}
                  value={kollenoAnnualFee}
                  onChange={(e) => setKollenoAnnualFee(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <span className="text-[11px] text-zinc-500 mt-1 block">Typical Kolleno contract: $8k to $18k/year</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">
                  Credit Controllers on Team: {collectorCount} FTEs
                </label>
                <input
                  type="range"
                  min={1}
                  max={6}
                  step={1}
                  value={collectorCount}
                  onChange={(e) => setCollectorCount(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <span className="text-[11px] text-zinc-500 mt-1 block">Reclaims ~36 hours/month per collector</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs text-zinc-400 block mb-1">Direct Software Savings</span>
                <span className="text-xl sm:text-2xl font-bold text-emerald-400">
                  ${directSoftwareSavings.toLocaleString()}/yr
                </span>
                <span className="text-[10px] text-zinc-500 block mt-1">vs. Jaktra $0 Early Access</span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs text-zinc-400 block mb-1">Collector Hours Reclaimed</span>
                <span className="text-xl sm:text-2xl font-bold text-blue-400">
                  {annualHoursSaved.toLocaleString()} hrs/yr
                </span>
                <span className="text-[10px] text-zinc-500 block mt-1">{hoursSavedPerMonth} hrs/month reallocated</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <span className="text-xs text-emerald-400 font-medium block mb-1">Total Economic Benefit</span>
                <span className="text-xl sm:text-2xl font-bold text-emerald-300">
                  ${Math.round(totalAnnualBenefit).toLocaleString()}/yr
                </span>
                <span className="text-[10px] text-zinc-400 block mt-1">Direct savings + finance labor value</span>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE JAKTRA */}
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Why Fast-Moving Finance Teams Choose Jaktra
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
              Autonomous execution that preserves client goodwill without manual work queues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Groq LLaMA 3.1 AI Generation</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Replaces rigid template emails with relationship-aware conversational copy that dynamically modulates across 5 distinct stages.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Automated Dispute Triage</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Inbound replies are analyzed instantly. If a dispute or query is detected, cadences freeze immediately to protect client goodwill.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Self-Serve Installment Plans</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Debtors can split overdue invoices into 2x, 3x, or 4x milestone payment schedules directly inside their tokenized payment portal.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Frequently Asked Questions: Kolleno vs. Jaktra
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Clear technical answers to help you evaluate the right accounts receivable platform.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl bg-white/[0.02] border border-white/10 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between text-white font-medium text-sm sm:text-base hover:bg-white/[0.02] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-zinc-400 text-xs sm:text-sm leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center border-t border-white/5">
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display">
              Ready for Autonomous Collections Without Manual Calling Lists?
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base mb-8">
              Start recovering overdue receivables today with Jaktra. Set up in 15 minutes with zero long-term commitments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-all shadow-lg"
              >
                Get started free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all"
              >
                Explore Free Early Access
              </Link>
            </div>
            <p className="text-xs text-zinc-500 mt-4">
              No credit card required • 15-minute onboarding • AES-256 bank-grade encryption
            </p>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
