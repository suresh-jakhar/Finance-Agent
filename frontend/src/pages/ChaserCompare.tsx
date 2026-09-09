import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, ChevronDown, Sparkles, ShieldCheck, Zap, Bot, CreditCard } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { chaserCompareSchema, breadcrumbSchema } from "../components/common/seo-schemas";

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

export function ChaserCompare() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Why do companies evaluate alternatives to Chaser?",
      a: "Chaser is an established traditional dunning tool, but its core architecture is built around static schedule-based email rules and manual telephone call logging. Finance teams looking for true autonomous execution—where AI modulates tone dynamically, automatically triages dispute replies, and provides tokenized zero-password debtor portals—find Jaktra to be a more agile, cost-effective solution.",
    },
    {
      q: "How does Jaktra replace manual telephone call logging?",
      a: "Chaser features a telephone tracker where human staff manually type notes after calling debtors. Jaktra is built on autonomous agent architecture: instead of relying on human phone collectors, our Groq LLaMA 3.1 agent dynamically modulates written tone across 5 escalation tiers, answers debtor inquiries via AI, and provides zero-login digital payment links that make phone calls unnecessary for 85%+ of invoices.",
    },
    {
      q: "How does dispute handling differ between Chaser and Jaktra?",
      a: "In Chaser, customer replies to dunning emails hit a regular inbox where finance staff must manually spot complaints and manually pause reminder schedules. In Jaktra, our NLP DisputeAgent automatically parses inbound replies, flags disputes or payment promises, immediately halts active cadences, and drafts suggested responses for one-click finance approval.",
    },
    {
      q: "How does debtor payment reconciliation work?",
      a: "Chaser redirects debtors to generic payment links or provides bank wire details. Jaktra generates a secure, cryptographic debtor portal link (`/i/:token`). Debtors inspect their real-time statement of account, request structured installment plans, and pay instantly via Razorpay (UPI, NetBanking, Cards) with immediate webhook ledger reconciliation.",
    },
    {
      q: "How do the pricing models compare?",
      a: "Chaser starts with paid tiers and charges extra for add-on features and collector seats. Jaktra is completely free during our public Early Access program with zero credit card required to start.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-white">
      <SEOHead
        title="Chaser Alternative — Autonomous Generative AI AR Agent vs Static Dunning"
        description="Compare Chaser vs Jaktra. Learn why finance leaders upgrade from Chaser's static email templates and manual phone call tracking to Jaktra's autonomous AI agent, tokenized debtor portals, and Razorpay settlement."
        canonicalPath="/compare/chaser-alternative"
        jsonLd={[
          chaserCompareSchema,
          breadcrumbSchema([
            { name: "Compare", path: "/compare/chaser-alternative" },
            { name: "Chaser Alternative", path: "/compare/chaser-alternative" },
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
              Chaser Alternative
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-300 text-xs font-medium mb-4">
            <Bot className="w-3.5 h-3.5" />
            <span>Autonomous AI Agent vs. Traditional Scheduled Dunning</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            The Modern Chaser Alternative with Autonomous AI Tone Modulation
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Chaser relies on rigid email schedules and manual phone call logging. Jaktra is an autonomous AI collections
            agent that dynamically modulates tone, triages inbound disputes, and settles payments instantly.
          </p>
        </div>

        {/* Comparison Overview Card */}
        <section className="mb-16 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            The Architectural Difference: Automated Schedules vs. Autonomous Execution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-zinc-400 leading-relaxed">
            <div className="border-t border-zinc-800 pt-4">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-500" />
                The Chaser Approach: Static Rules & Manual Tasks
              </h3>
              <p>
                Chaser automates the dispatch of static email templates at fixed intervals (e.g. 7 days, 14 days) and
                provides a task log for human collectors to log manual phone calls. When disputes arise, staff must
                manually monitor inboxes and pause campaigns by hand.
              </p>
            </div>
            <div className="border-t border-blue-500/30 pt-4">
              <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                The Jaktra Approach: Closed-Loop Autonomous AI
              </h3>
              <p>
                Jaktra combines predictive ML delinquency scoring with Groq LLaMA 3.1 generative tone escalation. It
                handles customer communication across 5 stages, automatically halts outreach when disputes are detected,
                and collects payments through zero-login tokenized debtor portals.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-4">Head-to-Head Architectural Comparison</h2>
          <p className="text-center text-sm text-zinc-400 mb-8 max-w-2xl mx-auto">
            Compare operational models, AI capabilities, and debtor experiences side by side.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/80">
                  <th className="py-4 px-6 text-zinc-400 font-semibold">Capability</th>
                  <th className="py-4 px-6 text-blue-400 font-bold bg-blue-950/20">Jaktra</th>
                  <th className="py-4 px-6 text-zinc-400 font-semibold">Chaser</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Outreach Tone Engine</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10 flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Autonomous Groq LLaMA 3.1 5-Stage Tone Modulation</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Static rule-based text templates</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Dispute Sentiment Triage</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10 flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>NLP classifier; auto-pauses cadences; drafts response</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Manual inbox triage and manual sequence pausing</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Debtor Payment Flow</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10 flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Tokenized link (`/i/:token`) with Razorpay & installment plans</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Redirects to generic payment link or bank transfer</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Phone Collection Model</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10 flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Autonomous digital outreach eliminates 85%+ of phone calls</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Task logger for human collectors to make manual calls</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Overdue Escalation Limit</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Stage 5 Legal Stop (Automation cutoff at 31+ days)</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Loops email templates until manually cancelled</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Spam Prevention</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10 flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>20-Hour Rolling Idempotency Guard</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Triggered on fixed day schedules</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-300 font-medium">Transparent Free-to-Start Pricing</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium bg-blue-950/10 flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>100% Free during Early Access (No credit card required)</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Paid tiers only; no free forever tier</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4 Architectural Moats */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Generative Tone Modulation vs Static Templates</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Jaktra’s Groq LLaMA 3.1 agent tailors every message to client aging and prior payment history. Instead of
              canned text, debtors receive thoughtful, human-sounding communications that preserve goodwill.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Automated Dispute Sentiment Triage</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              When a debtor replies with a billing question, Jaktra automatically flags the dispute, freezes the
              cadence immediately, and drafts a resolution response for finance approval—preventing embarrassing follow-ups.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
              <CreditCard className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Friction-Free Debtor Portals (`/i/:token`)</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Debtors access open statements and settle balances via secure tokenized links without passwords. Supports
              instant digital payments via Razorpay (UPI, NetBanking, Cards) and structured installment plans.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Compliance Safeguards (Stage 5 Legal Stop)</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Strict automation stop after 30 days overdue prevents harassment violations. Paired with our 20-hour
              idempotency guard, Jaktra guarantees professional, compliant financial communications.
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
            Switch to Modern AI Accounts Receivable
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-6">
            Eliminate manual call tracking and static templates. Start collecting autonomously today with Jaktra.
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
