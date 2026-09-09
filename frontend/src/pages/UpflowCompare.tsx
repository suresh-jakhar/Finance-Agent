import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, ChevronDown, Sparkles, ShieldCheck, MailX, CreditCard, RefreshCw } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { upflowCompareSchema, breadcrumbSchema } from "../components/common/seo-schemas";

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
            Features
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

export function UpflowCompare() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Why do finance teams switch from Upflow to Jaktra?",
      a: "Upflow modernized accounts receivable reporting, but its collection engine relies on static, rule-based text templates sent on rigid schedules. If a customer replies with a dispute or partial payment promise, static tools often continue blindly blasting overdue notices. Jaktra is an autonomous AI agent: it uses Groq LLaMA 3.1 to modulate tone across 5 stages, automatically triages inbound dispute replies, halts cadences when questions arise, and provides zero-login tokenized payment portals with native Razorpay settlement.",
    },
    {
      q: "How does Jaktra's 5-stage AI tone escalation differ from Upflow's email workflows?",
      a: "In Upflow, you create rigid text templates (Template 1 at Day 7, Template 2 at Day 14). In Jaktra, our AI agent dynamically generates communication copy across 5 distinct urgency tiers (Warm Reminder → Firm Follow-Up → Serious Notice → Stern Demand → Legal Stop) tailored to the debtor's payment history, invoice size, and delinquency risk score. Every message feels natural, polite, and human.",
    },
    {
      q: "What happens when a customer replies to an invoice reminder?",
      a: "In Upflow, replies go to a shared inbox where finance managers must manually sort through complaints and pause email sequences by hand. In Jaktra, our DisputeAgent automatically classifies inbound email sentiment into dispute, question, payment promise, or unclear. If a dispute is detected, the collection cadence is automatically paused, and an AI-drafted resolution response is prepared for finance approval.",
    },
    {
      q: "How does debtor payment work compared to Upflow?",
      a: "Upflow typically attaches static PDF invoices with bank account instructions or redirects debtors through generic payment portals. Jaktra generates a secure, tokenized debtor portal link (`/i/:token`) with no passwords required. Debtors view their complete statement of account, select structured installment payment plans, and pay instantly via Razorpay (UPI, NetBanking, Cards) with real-time webhook reconciliation.",
    },
    {
      q: "How does pricing compare between Jaktra and Upflow?",
      a: "Upflow requires talking to sales for custom quotes and typically has annual contract floors. Jaktra is completely free during our public Early Access program with zero sales calls, no artificial invoice limits, and no credit card required.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-white">
      <SEOHead
        title="Upflow Alternative — Autonomous AI Tone Escalation vs Static Dunning"
        description="Compare Upflow vs Jaktra. Discover why finance teams upgrade from Upflow's static email templates to Jaktra's autonomous Groq LLaMA 3.1 tone escalation, NLP dispute triage, and tokenized payment portals."
        canonicalPath="/compare/upflow-alternative"
        jsonLd={[
          upflowCompareSchema,
          breadcrumbSchema([
            { name: "Compare", path: "/compare/upflow-alternative" },
            { name: "Upflow Alternative", path: "/compare/upflow-alternative" },
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
              <span className="text-zinc-400">Compare</span>
            </li>
            <li>/</li>
            <li className="text-zinc-300 font-medium" aria-current="page">
              Upflow Alternative
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-300 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous AI Agent vs. Static Email Schedules</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            The Modern Upflow Alternative with Autonomous AI Tone Modulation
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Upflow pioneered modern AR reporting. But static, schedule-based email templates alienate customers and
            require manual inbox sorting. Jaktra is the next-generation autonomous AI collections agent.
          </p>
        </div>

        {/* Architectural Shift Overview */}
        <section className="mb-16 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            The Paradigm Shift: From Static Dunning Rules to Autonomous AI Agents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-zinc-400 leading-relaxed">
            <div className="border-t border-zinc-800 pt-4">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-500" />
                The Legacy Model: Rigid Template Schedules
              </h3>
              <p>
                Traditional tools like Upflow rely on static drip campaigns: <em>"Send Template A at Day 7, Template B at
                Day 14."</em> They cannot adapt their tone to customer sentiment, cannot interpret inbound dispute replies,
                and risk damaging commercial goodwill by blasting overdue notices after a customer has asked a question.
              </p>
            </div>
            <div className="border-t border-blue-500/30 pt-4">
              <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                The Jaktra Model: Closed-Loop Autonomous AI
              </h3>
              <p>
                Jaktra combines predictive ML risk scoring with <strong>Groq LLaMA 3.1 generative tone modulation</strong>.
                It adapts messaging across 5 urgency stages, automatically pauses sequences when an inbound dispute is
                detected, guarantees delivery via Dead Letter Queues, and collects instant payments through tokenized debtor
                portals.
              </p>
            </div>
          </div>
        </section>

        {/* Head-to-Head Comparison Matrix */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-4">Detailed Head-to-Head Comparison</h2>
          <p className="text-center text-sm text-zinc-400 mb-8 max-w-2xl mx-auto">
            Evaluate how Jaktra’s autonomous architecture outperforms traditional rule-based dunning workflows.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/80">
                  <th className="py-4 px-6 text-zinc-400 font-semibold">Feature / Capability</th>
                  <th className="py-4 px-6 text-blue-400 font-bold bg-blue-950/20">Jaktra</th>
                  <th className="py-4 px-6 text-zinc-400 font-semibold">Upflow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Outreach Generation</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10 flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Autonomous Groq LLaMA 3.1 5-Stage Tone Modulation</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Static rule-based text templates</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Inbound Dispute Triage</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10 flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>NLP sentiment classifier; auto-pauses cadences; drafts response</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Manual inbox review and manual workflow pausing</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Debtor Payment Experience</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10 flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Tokenized link (`/i/:token`) with Razorpay & installment plans</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Static PDF invoices & bank wire transfer details</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Delivery Resilience</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10 flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Dead Letter Queue (DLQ) with exponential retry & admin alerts</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Standard email dispatch without DLQ isolation</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Overdue Escalation Safeguard</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Stage 5 Legal Stop (Strict halt after 30 days overdue)</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Loops indefinitely until manually stopped</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Spam Protection</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10 flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>20-Hour Rolling Idempotency Guard</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Static schedule triggers</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Transparent Self-Serve Pricing</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10 flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>100% Free during Early Access (No credit card required)</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Opaque sales demos; annual contract minimums</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4 Architectural Differentiators */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Groq LLaMA 3.1 Generative Tone Modulation</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Instead of firing canned, impersonal template strings, Jaktra crafts dynamic email copy that adapts across
              5 stages (Warm Reminder → Firm Follow-Up → Serious Notice → Stern Demand → Legal Stop) tailored to customer
              aging and payment history.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <RefreshCw className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Automatic Inbound Dispute Sentiment Triage</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              When a customer replies with a billing question or dispute, our NLP sentiment agent immediately halts the
              collection cadence to protect the commercial relationship, creates a dispute ticket, and drafts an
              executive resolution response.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
              <CreditCard className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Zero-Login Tokenized Debtor Portals</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Debtors receive a secure tokenized link (`/i/:token`) with zero password friction. They can inspect open
              invoices, request structured installment plans, and pay immediately via Razorpay with instant webhook ledger
              reconciliation.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
              <MailX className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Dead Letter Queue (DLQ) Delivery SLA</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Unlike dumb mailers that bounce silently, Jaktra’s Dead Letter Queue isolates deliverability issues
              (SendGrid, Resend, SMTP), applies exponential retry policies, and alerts administrators before bad emails
              escalate.
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
        <section className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-blue-950/40 to-indigo-950/30 p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Upgrade to Autonomous AI Collections Today
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-6">
            Stop sending robotic, static dunning templates. Accelerate cash recovery while preserving client goodwill
            with Jaktra.
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
