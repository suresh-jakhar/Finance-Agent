import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Sparkles, ShieldCheck, Clock, Brain, AlertTriangle, Lock } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { fiveStageEscalationSchema, breadcrumbSchema } from "../components/common/seo-schemas";

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
          <Link to="/compare/upflow-alternative" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Compare Upflow
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

interface StageData {
  stage: number;
  name: string;
  days: string;
  badgeColor: string;
  description: string;
  aiObjective: string;
  complianceRule: string;
  sampleCopy: string;
}

const STAGES: StageData[] = [
  {
    stage: 1,
    name: "Friendly / Warm Reminder",
    days: "Days 1–7 Overdue",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    description: "Assumes accidental oversight. Maintains goodwill while presenting a friction-free payment link.",
    aiObjective: "Polite, supportive tone confirming receipt of invoice and offering direct payment assistance.",
    complianceRule: "Protected by 20-hour idempotency guard. Debtor can pay or reply with inquiries.",
    sampleCopy:
      "Hi Alex — Hope your week is off to a productive start! Just a gentle note that Invoice #INV-2048 ($4,250) was due on Friday. You can review your account statement and clear payment instantly via your direct link: https://jaktra.site/i/demo-token. If you need any clarifications, please let us know!",
  },
  {
    stage: 2,
    name: "Firm Follow-Up",
    days: "Days 8–14 Overdue",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    description: "Professional and direct. Requests payment confirmation and introduces structured installment options.",
    aiObjective: "Assertive yet courteous inquiry regarding expected processing date and installment availability.",
    complianceRule: "Evaluates historical client payment rate. Inbound dispute replies immediately pause cadence.",
    sampleCopy:
      "Hi Alex — We have not yet received payment for Invoice #INV-2048 ($4,250), which is now 10 days past due. Could you please confirm if this has been scheduled with accounts payable? If your team needs structured cash flow flexibility, you can request an installment plan directly through your portal: https://jaktra.site/i/demo-token.",
  },
  {
    stage: 3,
    name: "Serious Notice",
    days: "Days 15–21 Overdue",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    description: "Heightened urgency. Emphasizes contractual payment terms and upcoming operational escalation risks.",
    aiObjective: "Serious, formal language noting credit review and potential disruption of active services or deliverables.",
    complianceRule: "Elevates delinquency risk score. Triggers internal finance manager notification.",
    sampleCopy:
      "Dear Alex — We are following up urgently regarding overdue Invoice #INV-2048 ($4,250), now 18 days past due. To prevent an automatic hold on your account deliverables and maintain good commercial standing, we request that this balance be cleared immediately via your secure portal: https://jaktra.site/i/demo-token.",
  },
  {
    stage: 4,
    name: "Stern Demand",
    days: "Days 22–30 Overdue",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
    description: "Final automated warning. Sets a strict settlement deadline before irreversible executive escalation.",
    aiObjective: "Strict, unyielding demand copy stating exact deadline date and impending transfer to external legal review.",
    complianceRule: "Pre-stop phase. Final opportunity for automated debtor settlement before legal freeze.",
    sampleCopy:
      "URGENT: Final Notice for Overdue Invoice #INV-2048 ($4,250) — Your account is now 26 days overdue despite multiple prior notices. Full payment is required within 4 business days to prevent transfer of this file to our corporate legal and recovery counsel. Settle immediately: https://jaktra.site/i/demo-token.",
  },
  {
    stage: 5,
    name: "Legal Stop (Automation Cutoff)",
    days: "Days 31+ Overdue",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    description: "Strict compliance safeguard. AI automation permanently halts to prevent harassment violations.",
    aiObjective: "AI messaging engine locks down completely. The invoice file is locked and routed for human executive sign-off.",
    complianceRule: "Mandatory FDCPA / regulatory stop. No automated outreach can be sent without human override.",
    sampleCopy:
      "[AUTOMATION HALTED]: Invoice #INV-2048 has reached 31+ days overdue. Automated AI communication has been permanently halted by Jaktra's Stage 5 Legal Stop. This account requires manual executive review and written legal authorization prior to further outreach.",
  },
];

export function FiveStageEscalation() {
  const [selectedStage, setSelectedStage] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const current = STAGES[selectedStage - 1];

  const faqs = [
    {
      q: "Why is a 5-stage escalation better than standard dunning reminders?",
      a: "Standard dunning sends generic, repetitive emails that debtors quickly tune out or mark as spam. Jaktra's 5-stage generative engine modulates tone dynamically: starting with empathetic, polite inquiries that preserve customer goodwill, and gradually escalating to firm, contractual demands only as overdue duration increases.",
    },
    {
      q: "What is the Stage 5 Legal Stop and why is it critical?",
      a: "The Stage 5 Legal Stop is a foundational compliance feature in Jaktra's backend (`agent.service.ts`). When an invoice reaches 31+ days overdue, our engine permanently halts automated AI communications. This prevents regulatory and FDCPA harassment violations, ensuring that no debtor is badgered indefinitely by an automated bot without human executive review.",
    },
    {
      q: "How does the 20-Hour Idempotency Guard prevent debtor spam?",
      a: "Our communication service enforces a strict 20-hour rolling window on all debtor contacts. Even if multiple collection triggers or manual runs occur in a single day, Jaktra guarantees that no customer receives more than one email within a 20-hour period.",
    },
    {
      q: "How does the ML Delinquency Risk Scorer influence tone?",
      a: "Our predictive risk model (`scorer.py`) analyzes four key features: days overdue, invoice amount, historical payment rate, and prior follow-up count. If an enterprise debtor with a flawless multi-year payment record is overdue by 5 days, the model maintains a gentle Stage 1 tone longer, protecting crucial relationships from unnecessary friction.",
    },
    {
      q: "Can debtors respond and dispute invoices during the cadence?",
      a: "Yes. Jaktra includes an inbound NLP DisputeAgent. If a debtor replies with a question about pricing, usage, or deliverables, the engine instantly halts the escalation cadence, marks the invoice as disputed, and drafts an AI-suggested resolution response for your finance team.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-white">
      <SEOHead
        title="Autonomous 5-Stage AR Tone Escalation Engine — Jaktra"
        description="Explore Jaktra's 5-stage generative tone escalation engine. How Groq LLaMA 3.1, predictive ML delinquency risk scoring, the 20-hour idempotency guard, and Stage 5 Legal Stop recover cash without client friction."
        canonicalPath="/features/5-stage-escalation"
        jsonLd={[
          fiveStageEscalationSchema,
          breadcrumbSchema([
            { name: "Features", path: "/features/5-stage-escalation" },
            { name: "5-Stage Tone Escalation", path: "/features/5-stage-escalation" },
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
              5-Stage Tone Escalation
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-300 text-xs font-medium mb-4">
            <Brain className="w-3.5 h-3.5" />
            <span>Groq LLaMA 3.1 Generative Tone Matrix</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            The Autonomous 5-Stage AR Tone Escalation Engine
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Generic dunning emails alienate customers and get ignored. Jaktra uses generative AI to dynamically modulate
            collections copy from courteous reminders to stern demands—backed by strict legal compliance guards.
          </p>
        </div>

        {/* Interactive 5-Stage Matrix Explorer */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Interactive Stage Explorer</h2>
            <p className="text-sm text-zinc-400">
              Click through the 5 escalation stages to inspect the generative tone modulation and compliance safeguards.
            </p>
          </div>

          {/* Stage Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
            {STAGES.map((s) => (
              <button
                key={s.stage}
                onClick={() => setSelectedStage(s.stage)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedStage === s.stage
                    ? "border-blue-500 bg-blue-950/20 shadow-md shadow-blue-500/10"
                    : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                }`}
              >
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Stage {s.stage}</div>
                <div className="text-sm font-bold text-white truncate">{s.name.split(" ")[0]}</div>
                <div className="text-xs text-zinc-500 mt-1">{s.days.split(" ")[0]}</div>
              </button>
            ))}
          </div>

          {/* Stage Details Card */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-zinc-800/80 pb-6">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${current.badgeColor} mb-2`}>
                  Stage {current.stage} • {current.days}
                </span>
                <h3 className="text-2xl font-bold text-white">{current.name}</h3>
              </div>
              <div className="text-xs sm:text-sm text-zinc-400 max-w-xs">{current.description}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-blue-400" />
                  <span>AI Prompt Objective</span>
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/60">
                  {current.aiObjective}
                </p>

                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mt-4 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Compliance & Safety Guard</span>
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/60">
                  {current.complianceRule}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Generated Email Copy Preview</span>
                </h4>
                <div className="text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed bg-zinc-950/90 p-4 rounded-xl border border-zinc-800 text-zinc-300 whitespace-pre-line h-full flex items-center">
                  {current.sampleCopy}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Core Architectural Safeguards */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-4">Three Built-In Architectural Safeguards</h2>
          <p className="text-center text-sm text-zinc-400 mb-10 max-w-2xl mx-auto">
            Most dunning tools blindly blast emails until someone complains. Jaktra is engineered with institutional
            guardrails.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Stage 5 Legal Stop</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Automation strictly halts at 31+ days overdue. AI outreach is permanently frozen to prevent regulatory
                harassment violations, requiring human finance officer sign-off before formal recovery actions.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">20-Hour Idempotency Guard</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Guarantees that no debtor ever receives more than one email in a 20-hour window, eliminating duplicate
                blasts across automated trigger schedules or manual admin syncs.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Predictive Delinquency Scorer</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Machine learning model (`scorer.py`) evaluates invoice balance, payment history, and follow-up frequency
                to automatically tailor escalation velocity and prioritize high-risk accounts.
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
        <section className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-blue-950/40 to-indigo-950/30 p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Accelerate Cash Flow with Intelligent Tone Modulation
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-6">
            Get your autonomous collections agent active in 15 minutes. 100% free during Early Access with zero credit card required.
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
          <Link to="/compare/upflow-alternative" className="hover:text-zinc-300 transition-colors">
            Upflow Alternative
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
