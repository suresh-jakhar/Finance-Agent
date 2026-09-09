import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, ShieldAlert, Sparkles, CheckCircle2, PauseCircle, MessageSquare, AlertCircle } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { disputeTriageSchema, breadcrumbSchema } from "../components/common/seo-schemas";

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

interface DisputeScenario {
  id: string;
  category: "dispute" | "question" | "payment_promise";
  label: string;
  inboundText: string;
  classification: string;
  confidence: number;
  cadenceAction: string;
  aiSuggestedDraft: string;
}

const SCENARIOS: DisputeScenario[] = [
  {
    id: "billing_dispute",
    category: "dispute",
    label: "Billing Discrepancy",
    inboundText:
      "Hi team — We received this invoice #INV-4091 for $6,800, but our purchase order specified $5,200. There appears to be an extra 20 hours of consulting billed that were never approved by our director. Please revise before we can issue payment.",
    classification: "Dispute (Billing Discrepancy)",
    confidence: 0.96,
    cadenceAction: "AUTOMATICALLY PAUSED (Outreach frozen to prevent relationship friction)",
    aiSuggestedDraft:
      "Hi Jordan — Thank you for bringing this to our attention. We have immediately paused automated reminders for Invoice #INV-4091 while our finance team verifies the 20 consulting hours against your approved PO #PO-8821. We will follow up by tomorrow at 2:00 PM with an adjusted statement or timesheet breakdown. We appreciate your patience!",
  },
  {
    id: "payment_promise",
    category: "payment_promise",
    label: "Payment Promise Date",
    inboundText:
      "Hello! Our quarterly pay run is scheduled for next Thursday, September 18th. Invoice #INV-4091 has been approved by accounting and will be transferred on that date via ACH.",
    classification: "Payment Promise (Scheduled for Sep 18)",
    confidence: 0.94,
    cadenceAction: "CADENCE SNOOZED (Postponed until Sep 19 follow-up verification)",
    aiSuggestedDraft:
      "Hi Jordan — Thanks so much for confirming your pay run date! We have noted that payment for Invoice #INV-4091 ($6,800) is scheduled for Thursday, September 18th, and have postponed further reminders until then. If you need any payment details or want to clear it earlier, your portal remains active: https://jaktra.site/i/demo-token.",
  },
  {
    id: "inquiry_question",
    category: "question",
    label: "Tax & Entity Inquiry",
    inboundText:
      "Hi accounts team — Before we can release payment for this invoice, our compliance team requires an updated W-9 form and your GST identification certificate. Could you send those over?",
    classification: "Question (Vendor Onboarding / Tax Info)",
    confidence: 0.92,
    cadenceAction: "CADENCE PAUSED (Waiting on document provision)",
    aiSuggestedDraft:
      "Hi Jordan — Thanks for reaching out! Attached please find our updated tax documents (W-9 / GST certificate) for your compliance records. We have temporarily paused follow-ups on Invoice #INV-4091. Please let us know once this has been processed by your vendor onboarding desk!",
  },
];

export function DisputeTriage() {
  const [selectedScenario, setSelectedScenario] = useState<string>("billing_dispute");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scenario = SCENARIOS.find((s) => s.id === selectedScenario) || SCENARIOS[0];

  const faqs = [
    {
      q: "How does Jaktra detect invoice disputes automatically?",
      a: "When debtors reply to an automated reminder email, Jaktra's inbound webhook ingests the text and feeds it into our NLP DisputeAgent (`ai-service/src/agents/dispute_agent.py`). The model classifies the message into dispute, question, payment promise, or unclear, scoring confidence based on language semantics.",
    },
    {
      q: "Why is automatically freezing the collection cadence so important?",
      a: "Sending aggressive overdue reminders to a customer who has already replied with a legitimate billing question or pricing dispute is the #1 cause of customer churn and sour business relationships. Jaktra immediately freezes automated dispatches the second a dispute or question is detected, protecting your brand.",
    },
    {
      q: "Does Jaktra send replies automatically without human review?",
      a: "By default, no. Jaktra generates an AI-suggested resolution draft tailored to the customer's exact inquiry and presents it in your dashboard with confidence scores and reasoning. Your finance manager can approve the draft with one click, edit the text, or upload revised credit memos before sending.",
    },
    {
      q: "What happens when a debtor promises to pay on a specific date?",
      a: "When a customer provides a payment promise (e.g. 'Payment scheduled for next Friday'), Jaktra automatically snoozes reminders until after that promised date. If the funds arrive, the ledger settles via webhook. If the date passes without payment, the engine gently re-engages.",
    },
    {
      q: "Can disputes be resolved with structured installment plans?",
      a: "Yes. In cases where debtors dispute their ability to clear a large lump sum due to temporary cash flow constraints, Jaktra allows finance managers to convert the balance into a structured installment schedule accessible through the debtor's tokenized portal link.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-white">
      <SEOHead
        title="AI Invoice Dispute Management & Sentiment Triage — Jaktra"
        description="Discover how Jaktra's NLP DisputeAgent classifies inbound billing inquiries, automatically freezes collection cadences, and drafts suggested resolutions for finance approval."
        canonicalPath="/features/dispute-triage"
        jsonLd={[
          disputeTriageSchema,
          breadcrumbSchema([
            { name: "Features", path: "/features/5-stage-escalation" },
            { name: "Dispute Triage", path: "/features/dispute-triage" },
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
              Dispute Triage
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-xs font-medium mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Closed-Loop Inbound Sentiment Analysis</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            AI Invoice Dispute Management & Sentiment Triage
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Blasting automated collection demands during an active billing dispute destroys client trust. Jaktra
            automatically classifies inbound replies, freezes cadences instantly, and drafts resolution responses for
            finance review.
          </p>
        </div>

        {/* Interactive Dispute Simulation */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Interactive Dispute Triage Simulator</h2>
            <p className="text-sm text-zinc-400">
              Select an inbound customer reply scenario to see how Jaktra’s NLP DisputeAgent reacts in real time.
            </p>
          </div>

          {/* Scenario Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScenario(s.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedScenario === s.id
                    ? "border-emerald-500 bg-emerald-950/20 shadow-md shadow-emerald-500/10"
                    : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                }`}
              >
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Scenario</div>
                <div className="text-sm font-bold text-white">{s.label}</div>
              </button>
            ))}
          </div>

          {/* Simulation Output Card */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
            {/* Inbound Email Box */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span>Inbound Debtor Email Received</span>
              </div>
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/80 text-sm text-zinc-300 leading-relaxed font-sans">
                "{scenario.inboundText}"
              </div>
            </div>

            {/* AI Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/50">
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>NLP Classification</span>
                </div>
                <div className="text-base font-bold text-white mb-2">{scenario.classification}</div>
                <div className="text-xs text-zinc-400">
                  Confidence Score: <span className="font-mono text-emerald-400 font-semibold">{Math.round(scenario.confidence * 100)}%</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/50">
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <PauseCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Cadence Protection Action</span>
                </div>
                <div className="text-xs sm:text-sm font-medium text-rose-300 leading-relaxed">
                  {scenario.cadenceAction}
                </div>
              </div>
            </div>

            {/* AI Draft Response Box */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI-Suggested Resolution Response (Pending Finance Review)</span>
              </div>
              <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-950/10 text-sm text-zinc-200 leading-relaxed font-sans mb-4">
                {scenario.aiSuggestedDraft}
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>One-Click Finance Approval</span>
                </span>
                <span className="text-xs text-zinc-500">Edit or send directly from your Jaktra dashboard</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Steps in Dispute Lifecycle */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-4">The 3-Step Dispute Resolution Workflow</h2>
          <p className="text-center text-sm text-zinc-400 mb-10 max-w-2xl mx-auto">
            How Jaktra handles inbound billing communication without manual inbox chaos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center mb-4 text-sm font-mono">
                1
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Instant Inbound Ingestion</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                When debtors reply to any collection notice, our inbound webhook processes the raw message, strips
                signatures, and identifies the target invoice token.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center mb-4 text-sm font-mono">
                2
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Automated Cadence Freeze</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                If the sentiment classifier flags a dispute or inquiry, the active escalation sequence halts immediately.
                Debtors are never bombarded with follow-ups while waiting for answers.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center mb-4 text-sm font-mono">
                3
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Pre-Drafted Resolution</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Jaktra drafts a polite, context-aware resolution email citing relevant invoice numbers and amounts.
                Finance teams review and approve with one click.
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
        <section className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-blue-950/40 to-emerald-950/30 p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Stop Churn with Intelligent Dispute Resolution
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-6">
            Protect commercial relationships while collecting cash faster. Start free with Jaktra today.
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
