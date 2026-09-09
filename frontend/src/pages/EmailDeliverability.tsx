import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, MailCheck, ShieldAlert, RefreshCw, Server, CheckCircle2 } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { emailDeliverabilitySchema, breadcrumbSchema } from "../components/common/seo-schemas";

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
          <Link to="/features/zero-login-portal" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Debtor Portal
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

type SimulationScenario = "rate_limit" | "hard_bounce" | "circuit_breaker";

export function EmailDeliverability() {
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>("circuit_breaker");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does traditional dunning software damage corporate email domain reputation?",
      a: "Legacy dunning tools blindly fire repetitive email templates at outdated or invalid debtor addresses. When inboxes bounce (550 mailbox unavailable) or recipients mark robotic reminders as spam, domain spam scores spike. This degrades SPF/DKIM reputations and causes regular commercial sales and executive emails to land in spam folders.",
    },
    {
      q: "What is Jaktra's Dead Letter Queue (DLQ) and how does it prevent domain blacklisting?",
      a: "Jaktra's DLQ module (`backend/src/modules/dlq/`) acts as an automated safety cushion. When an outbound email fails, rather than repeatedly firing until the provider blacklists your domain, Jaktra logs the exact SMTP error code, applies exponential backoff for temporary glitches, and quarantines permanently failing debtor records into the DLQ.",
    },
    {
      q: "What is the 3-Drop Threshold Circuit Breaker?",
      a: "If an automated dunning email fails 3 consecutive times for a specific debtor, Jaktra immediately trips a circuit breaker: automated messaging is halted for that invoice, preventing further bounces. The account is flagged on your dashboard with an action item to request an updated billing contact.",
    },
    {
      q: "How are email credentials secured across multi-tenant teams?",
      a: "Jaktra encrypts all tenant SMTP, SendGrid, and Resend API credentials at rest using AES-256-GCM (`backend/src/modules/communication/tenant-mailer.ts`). Emails are sent directly through your authenticated domain records, preserving deliverability while maintaining complete cryptographic isolation.",
    },
    {
      q: "Does Jaktra enforce spacing between dunning touches to prevent spam classification?",
      a: "Yes. Jaktra hardcodes a 20-hour idempotency guard (`backend/src/modules/communication/services/idempotency.service.ts`). Even if multiple background collection sweeps run on the same day, no debtor can ever receive more than one outreach in a 20-hour rolling window.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-cyan-500/30 selection:text-white">
      <SEOHead
        title="Dunning Email Deliverability & DLQ Resilience — Jaktra"
        description="Protect your primary email domain reputation with Jaktra's Dead Letter Queue (DLQ), multi-provider failover (SendGrid, Resend, SMTP), and automated 3-drop circuit breakers."
        canonicalPath="/features/email-deliverability"
        jsonLd={[
          emailDeliverabilitySchema,
          breadcrumbSchema([
            { name: "Features", path: "/features/5-stage-escalation" },
            { name: "Email Deliverability", path: "/features/email-deliverability" },
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
              Email Deliverability & DLQ
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-xs font-medium mb-4">
            <MailCheck className="w-3.5 h-3.5" />
            <span>Dead Letter Queue (DLQ) & Sender Reputation Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            Dunning Email Deliverability & Domain Protection
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Never let automated invoice chasing destroy your primary corporate email domain. Jaktra isolates credentials,
            catches bounce codes in real time, and trips automated circuit breakers before spam penalties strike.
          </p>
        </div>

        {/* Metrics Banner */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono mb-1">99.8%</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Primary Inbox Delivery Rate</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-1">3 Drops</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Circuit Breaker Auto-Halt Limit</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono mb-1">AES-256</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">GCM Multi-Tenant Credential Security</div>
          </div>
        </section>

        {/* Interactive DLQ Simulation Sandbox */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-10 mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Interactive Dead Letter Queue (DLQ) Simulator</h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Select a delivery failure event to inspect Jaktra's automated resilience logic and domain protection shields.
              </p>
            </div>

            {/* Scenario Buttons */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-950 border border-zinc-800">
              <button
                onClick={() => setSelectedScenario("rate_limit")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedScenario === "rate_limit" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Soft Bounce / Rate Limit
              </button>
              <button
                onClick={() => setSelectedScenario("hard_bounce")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedScenario === "hard_bounce" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Hard Bounce (550)
              </button>
              <button
                onClick={() => setSelectedScenario("circuit_breaker")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedScenario === "circuit_breaker" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" : "text-zinc-400 hover:text-white"
                }`}
              >
                3-Drop Circuit Breaker
              </button>
            </div>
          </div>

          {/* Terminal / Event Log Display */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 text-zinc-500 text-[11px]">
              <span className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-cyan-400" />
                <span>JAKTRA DLQ MONITOR · RUNNING ASYNC</span>
              </span>
              <span>PORT: 587 (TLSv1.3)</span>
            </div>

            {selectedScenario === "rate_limit" && (
              <div className="space-y-2 text-zinc-300">
                <div className="text-amber-400">[WARN] Delivery encounter: 429 Too Many Requests from recipient MX server.</div>
                <div className="text-zinc-400">&gt; Action: Triggering exponential backoff schedule (Attempt 1 of 3).</div>
                <div className="text-zinc-400">&gt; Next Retry Window: Calculated at +3,600s (1 hour delay).</div>
                <div className="text-emerald-400 font-semibold">&gt; Status: Outbox quarantined. Domain reputation score unaffected (0 complaints).</div>
              </div>
            )}

            {selectedScenario === "hard_bounce" && (
              <div className="space-y-2 text-zinc-300">
                <div className="text-red-400">[ERROR] Delivery failed: 550 5.1.1 User unknown / mailbox unavailable.</div>
                <div className="text-zinc-400">&gt; Action: Intercepted by Dead Letter Queue (backend/src/modules/dlq/).</div>
                <div className="text-zinc-400">&gt; Blind retries suppressed immediately to prevent spam trap penalties.</div>
                <div className="text-cyan-400 font-semibold">&gt; Status: Invoice flagged as BAD_RECIPIENT. Alternative AP contact requested.</div>
              </div>
            )}

            {selectedScenario === "circuit_breaker" && (
              <div className="space-y-2 text-zinc-300">
                <div className="text-red-400">[CIRCUIT BREAKER TRIPPED]: Consecutive failure threshold exceeded (3/3 drops).</div>
                <div className="text-amber-400">&gt; Target: billing@delinquent-client.com · Invoice #INV-1092</div>
                <div className="text-zinc-400">&gt; Automation Lock: Agent dunning cadences strictly HALTED for this invoice record.</div>
                <div className="text-emerald-400 font-semibold">&gt; Shield Active: SENDER REPUTATION PROTECTED. Escalated to internal Finance Ops review.</div>
              </div>
            )}
          </div>
        </section>

        {/* 3 Core Architecture Moats */}
        <section className="space-y-12 mb-20">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              1. Automated 3-Drop Circuit Breaker (Protecting DKIM & SPF Standing)
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              When an overdue contact leaves a client company, their email address gets deactivated. Legacy dunning tools
              hammer that dead inbox week after week, tanking your domain sender score. Jaktra tracks consecutive delivery
              failures: on the 3rd consecutive drop, automation trips a permanent circuit breaker, halts outreach, and
              notifies your finance team to secure an updated billing contact.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <RefreshCw className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              2. Dead Letter Queue with Exponential Backoff Retries
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Temporary corporate mail server glitches, greylisting, and rate limits shouldn't cause lost collection touches.
              Jaktra's DLQ module (`backend/src/modules/dlq/`) parses exact SMTP response codes, retrying transient errors
              using progressive backoff intervals (1 hour, 4 hours, 12 hours) while isolating genuine hard bounces.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              3. 20-Hour Rolling Idempotency Guard (Anti-Spam Spacing)
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Sending multiple emails in a single day makes debtors feel harassed and triggers spam filter flags. Jaktra
              hardcodes a 20-hour idempotency gatekeeper (`idempotency.service.ts`), ensuring no debtor is contacted more
              than once in a rolling 20-hour window across any automated background cycle.
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
        <section className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-cyan-950/40 to-blue-950/30 p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Collect Outstanding Receivables Without Domain Risks
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-6">
            Equip your finance team with enterprise DLQ protection and 99.8% inbox deliverability. 100% free during Early Access with zero credit card required.
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
          <Link to="/features/zero-login-portal" className="hover:text-zinc-300 transition-colors">
            Zero-Login Portal
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
