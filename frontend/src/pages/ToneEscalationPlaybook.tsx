import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Sparkles, ShieldCheck, Clock, Brain, AlertTriangle, Lock, Copy, Check } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { toneEscalationPlaybookSchema, breadcrumbSchema } from "../components/common/seo-schemas";

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
            Escalation Engine
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

interface PlaybookStage {
  stage: number;
  name: string;
  days: string;
  badgeColor: string;
  psychology: string;
  promptDirective: string;
  sampleEmail: string;
  complianceRule: string;
}

const PLAYBOOK_STAGES: PlaybookStage[] = [
  {
    stage: 1,
    name: "Collaborative Courtesy",
    days: "Days 1–7 Overdue",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    psychology: "Presumed Administrative Oversight. Employs polite, frictionless framing to ensure the customer feels valued while receiving direct payment access.",
    promptDirective: `You are an accounts receivable assistant for Acme Corp. Invoice #INV-2048 ($4,250) is 3 days past due. Tone: warm, collaborative, and helpful. Assume accidental oversight. Emphasize that you are reaching out to ensure everything was received properly. Include direct tokenized payment portal link.`,
    sampleEmail: `Hi Alex,\n\nHope your week is going smoothly! Just a friendly note that Invoice #INV-2048 ($4,250.00) was due on Friday. We want to make sure your team has everything needed for processing.\n\nYou can review your full invoice statement and clear payment directly via your secure one-click link:\nhttps://jaktra.site/i/demo-token\n\nIf you have any questions regarding line items or need updated tax forms, feel free to reply directly to this email.\n\nWarm regards,\nFinance Team, Acme Corp`,
    complianceRule: "Protected by the 20-Hour Idempotency Guard. No repeat outreach permitted within 20 hours.",
  },
  {
    stage: 2,
    name: "Structured Administrative Follow-Up",
    days: "Days 8–14 Overdue",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    psychology: "Priority Scheduling & Cash Flexibility. Moves from casual reminder to structured accounting follow-up. Introduces installment payment alternatives.",
    promptDirective: `You are an accounts receivable assistant. Invoice #INV-2048 ($4,250) is 10 days past due. Prior reminder sent 5 days ago. Tone: professional, structured, and direct. Inquire if this has entered their weekly accounts payable run. Mention that installment plans are available through their portal if needed.`,
    sampleEmail: `Hi Alex,\n\nWe have not yet received payment for Invoice #INV-2048 ($4,250.00), which is now 10 days past due.\n\nCould you kindly check with your accounts payable department to confirm the scheduled remittance date? If your team is experiencing cash timing constraints, you can split this balance into structured monthly installments directly through your portal:\nhttps://jaktra.site/i/demo-token\n\nThank you for keeping your account current.\n\nBest regards,\nAccounts Receivable, Acme Corp`,
    complianceRule: "Evaluates historical client payment velocity. Inbound dispute replies immediately freeze cadences.",
  },
  {
    stage: 3,
    name: "Operational Warning",
    days: "Days 15–21 Overdue",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    psychology: "Commercial Accountability & Deliverable Continuity. Clear warning that prolonged delinquency threatens active services, deliverables, or credit terms.",
    promptDirective: `Invoice #INV-2048 ($4,250) is now 18 days past due. Tone: serious, firm, and urgent. Highlight that continued delay may affect active service availability and commercial credit terms. Urge immediate resolution via the secure link.`,
    sampleEmail: `Dear Alex,\n\nWe are contacting you urgently regarding overdue Invoice #INV-2048 for $4,250.00, which remains unpaid at 18 days past due.\n\nTo ensure uninterrupted delivery of ongoing project milestones and protect your commercial credit standing, we require settlement of this balance immediately.\n\nPlease process this payment today through your direct settlement link:\nhttps://jaktra.site/i/demo-token\n\nIf you have already initiated a bank transfer, please reply with the payment confirmation or reference number.\n\nSincerely,\nFinance Controller, Acme Corp`,
    complianceRule: "Elevates predictive delinquency risk score. Triggers internal finance director notification.",
  },
  {
    stage: 4,
    name: "Formal Pre-Legal Demand",
    days: "Days 22–30 Overdue",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
    psychology: "Executive Escalation & Fixed Deadline. Establishes a concrete date cutoff before the file is forwarded to executive leadership and recovery counsel.",
    promptDirective: `Invoice #INV-2048 ($4,250) is 26 days past due. This is the final notice before automated systems freeze. Tone: formal, uncompromising, and urgent. State strict 4-business-day deadline before file transfer to legal recovery counsel.`,
    sampleEmail: `DEMAND NOTICE: Final Warning for Overdue Invoice #INV-2048\n\nDear Alex,\n\nYour account is now 26 days overdue with an outstanding balance of $4,250.00. Despite multiple prior notices, this obligation has not been resolved.\n\nThis communication serves as formal notice that full payment must be received within four (4) business days (by Friday, 5:00 PM EST). Failure to settle by this deadline will result in immediate suspension of all services and escalation to external corporate legal recovery counsel.\n\nRemit payment immediately to avoid escalation fees:\nhttps://jaktra.site/i/demo-token\n\nOffice of the Chief Financial Officer\nAcme Corp`,
    complianceRule: "Final automated stage. Prepares file metadata and audit trail for executive sign-off.",
  },
  {
    stage: 5,
    name: "Stage 5 Legal Stop (Automation Cutoff)",
    days: "Days 31+ Overdue",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    psychology: "Mandatory Regulatory Cessation. Automated AI messaging is permanently terminated to avoid harassment liability under global debt collection statutes.",
    promptDirective: `[SYSTEM OVERRIDE]: Invoice #INV-2048 has reached 31+ days past due. Automated outreach has been permanently terminated by Jaktra's Stage 5 Legal Stop. No further automated communications may be generated.`,
    sampleEmail: `[AUTOMATION PERMANENTLY HALTED]\n\nInvoice #INV-2048 ($4,250.00) has transitioned to Stage 5 (31+ days overdue).\n\nIn accordance with Jaktra's regulatory compliance engine (backend/src/modules/agent/agent.service.ts), all autonomous messaging has been strictly halted to prevent harassment violations. This file is locked and requires executive review and written legal authorization for any further action.`,
    complianceRule: "Hard code block in agent.service.ts. FDCPA & regulatory compliance enforced.",
  },
];

export function ToneEscalationPlaybook() {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const stage = PLAYBOOK_STAGES[activeStageIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(stage.sampleEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      q: "Why does Jaktra permanently halt automated outreach at Stage 5 (31+ days)?",
      a: "Continuing to blast automated emails past 30 days overdue creates severe regulatory and legal risks under the Fair Debt Collection Practices Act (FDCPA) and commercial harassment statutes. Jaktra hardcodes a Stage 5 Legal Stop in `backend/src/modules/agent/agent.service.ts` that terminates automated AI messaging and mandates human executive review.",
    },
    {
      q: "How does Groq LLaMA 3.1 prevent repetitive dunning copy?",
      a: "Static dunning tools send the same rigid template on Day 7, Day 14, and Day 21, which causes debtors to mark messages as spam. Jaktra uses Groq LLaMA 3.1 generative inference to dynamically modulate tone, synthesizing the invoice age, payment history, client tier, and outstanding balance into unique, contextual communications.",
    },
    {
      q: "Can businesses adjust stage timing for Net 45 or Net 60 terms?",
      a: "Yes. While Jaktra's default escalation cadences are tuned for Net 30 invoices, finance managers can configure custom milestone thresholds for extended commercial credit terms (such as pre-due check-ins at Day 45 and post-due escalations at Day 65).",
    },
    {
      q: "What happens if a debtor replies with a dispute during Stage 3 or Stage 4?",
      a: "The moment an inbound reply is detected, Jaktra's NLP DisputeAgent analyzes debtor sentiment. If the reply contains a pricing dispute, scope inquiry, or proof-of-delivery question, automated cadences freeze immediately across all channels, preventing aggressive follow-ups during active resolution.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-purple-500/30 selection:text-white">
      <SEOHead
        title="The 5-Stage AR Tone Escalation Playbook — Jaktra"
        description="A comprehensive guide on designing 5-stage accounts receivable escalation cadences that recover 85%+ of overdue invoices without destroying commercial customer relationships."
        canonicalPath="/resources/5-stage-ar-tone-escalation"
        jsonLd={[
          toneEscalationPlaybookSchema,
          breadcrumbSchema([
            { name: "Resources", path: "/resources/how-to-reduce-dso" },
            { name: "5-Stage Tone Escalation Playbook", path: "/resources/5-stage-ar-tone-escalation" },
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
              <span className="text-zinc-400">Resources</span>
            </li>
            <li>/</li>
            <li className="text-zinc-300 font-medium" aria-current="page">
              5-Stage Tone Escalation Playbook
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-xs font-medium mb-4">
            <Brain className="w-3.5 h-3.5" />
            <span>Operational Architecture & AI Prompt Engineering Guide</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            The 5-Stage AR Tone Escalation Playbook
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            How autonomous generative AI tone modulation recovers 85%+ of overdue B2B receivables
            while preserving customer goodwill and enforcing strict regulatory compliance.
          </p>
        </div>

        {/* Core Thesis: Why Static Templates Fail */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-10 mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">The Flaw of Legacy Dunning Sequences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-zinc-400 leading-relaxed">
            <div>
              <h3 className="text-base font-semibold text-red-400 mb-2">Static Rule-Based Dunning (Legacy)</h3>
              <p className="mb-3">
                Traditional software (Upflow, Chaser) fires rigid templates: Template A at Day 7, Template B at Day 14.
                Debtors quickly recognize the robotic pattern and ignore the sender.
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-zinc-500">
                <li>Repetitive wording triggers email spam filters</li>
                <li>Treats enterprise key accounts identically to high-risk debtors</li>
                <li>Zero automated dispute reply handling</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-emerald-400 mb-2">Generative Tone Escalation (Jaktra)</h3>
              <p className="mb-3">
                Jaktra uses Groq LLaMA 3.1 to generate unique, context-aware communications across 5 distinct stages.
                The tone scales smoothly from collaborative courtesy to stern contractual demands.
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-zinc-300">
                <li>Dynamic phrasing ensures high inbox deliverability</li>
                <li>Presents tokenized portals with instant payment and installment splits</li>
                <li>Strict Stage 5 Legal Stop halts automation at 31+ days overdue</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interactive Playbook Explorer */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Interactive 5-Stage Cadence Inspector</h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Select a stage to inspect the underlying psychological framing, AI prompt directives, and sample copy.
              </p>
            </div>
          </div>

          {/* Stage Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
            {PLAYBOOK_STAGES.map((s, idx) => (
              <button
                key={s.stage}
                onClick={() => setActiveStageIndex(idx)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  activeStageIndex === idx
                    ? "border-purple-500 bg-purple-500/10 text-white shadow-md shadow-purple-500/5"
                    : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                  Stage {s.stage}
                </div>
                <div className="text-xs font-semibold truncate text-white">{s.name}</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">{s.days}</div>
              </button>
            ))}
          </div>

          {/* Active Stage Details Card */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 space-y-6">
            {/* Stage Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${stage.badgeColor}`}>
                    Stage {stage.stage}: {stage.days}
                  </span>
                  <span className="text-lg font-bold text-white">{stage.name}</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">{stage.psychology}</p>
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Template"}</span>
              </button>
            </div>

            {/* Prompt Directive Snippet */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 mb-2">
                <Brain className="w-4 h-4" />
                <span>LLM System Prompt Directive (Groq LLaMA 3.1)</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 font-mono text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                {stage.promptDirective}
              </div>
            </div>

            {/* Generated Email Sample */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Sample Generative Outreach</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 font-sans text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                {stage.sampleEmail}
              </div>
            </div>

            {/* Compliance Guard */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-white mb-0.5">Automated Compliance Guard</div>
                <div className="text-xs text-zinc-400 leading-relaxed">{stage.complianceRule}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Core Compliance Pillars */}
        <section className="space-y-6 mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            The 3 Non-Negotiable Compliance Guardrails
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Stage 5 Legal Stop</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Automated AI outreach terminates permanently at 31+ days overdue. Mandates executive human review
                before any further contact to comply with debt collection harassment regulations.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">20-Hour Idempotency</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Enforces a strict minimum 20-hour gap between outbound communications to eliminate duplicate touches
                and prevent aggressive spam cadence penalties.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Instant Dispute Freeze</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Inbound replies expressing billing confusion or dispute immediately pause all dunning cadences,
                preventing angry customer escalation while finance reviews the claim.
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
            Deploy Autonomous 5-Stage Tone Escalation in 15 Minutes
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-6">
            Replace robotic templates with respectful, high-converting AI tone modulation. 100% free during Early Access with zero credit card required.
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
            5-Stage Engine
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
