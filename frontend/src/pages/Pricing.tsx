import { useState, useId } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, ChevronDown, Calculator, Zap } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { pricingPageSchema, breadcrumbSchema } from "../components/common/seo-schemas";

function HeaderNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#010102]/85 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-decoration-none">
          <img src={jaktraLogo} alt="Jaktra" width={24} height={24} className="h-6 w-6 block" />
          <span className="font-semibold text-white text-lg tracking-tight font-sans">Jaktra</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Home
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

export function Pricing() {
  const [invoiceVolume, setInvoiceVolume] = useState<number>(250000);
  const [daysOverdue, setDaysOverdue] = useState<number>(24);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const volumeSliderId = useId();
  const daysSliderId = useId();

  // Financial ROI calculations (18-day average DSO reduction based on Jaktra benchmark)
  const daysReduction = Math.min(18, Math.max(5, Math.round(daysOverdue * 0.5)));
  const annualSales = invoiceVolume * 12;
  const releasedCash = Math.round((annualSales / 365) * daysReduction);
  const capitalSavings = Math.round(releasedCash * 0.08); // 8% cost of capital

  const faqs = [
    {
      q: "Is Jaktra truly free during Early Access?",
      a: "Yes. Jaktra is 100% free during our Early Access program with zero credit card required. You get full, unrestricted access to the complete 5-stage AI tone escalation engine, dispute triage, tokenized payment portals, and predictive ML risk scoring.",
    },
    {
      q: "Are there any invoice limits during Early Access?",
      a: "No. During early access, there are no artificial invoice limits or restrictive paywalls. You can connect your ledger, import invoices, and automate collections freely.",
    },
    {
      q: "How does the 5-stage AI tone escalation work?",
      a: "Jaktra uses Groq LLaMA 3.1 8B inference to dynamically modulate email tone across 5 stages (Warm Reminder → Direct Confirmation → Serious Notice → Stern Warning → Legal Stop) tailored to customer aging, payment history, and dispute status.",
    },
    {
      q: "Can I connect my own payment gateway?",
      a: "Yes. Jaktra natively connects with Razorpay (supporting UPI, NetBanking, Cards, and direct bank transfers) with instant webhook reconciliation, and features an extensible gateway architecture for enterprise custom integrations and upcoming Stripe connectors.",
    },
    {
      q: "How does automated dispute triage work?",
      a: "When a customer replies with an invoice complaint or inquiry, our AI sentiment analyzer classifies the dispute, halts aggressive escalation cadences automatically, and drafts an executive response for your team to approve.",
    },
    {
      q: "Is our financial data safe and isolated?",
      a: "Absolutely. Jaktra uses tenant-isolated database architecture with AES-256 encryption at rest and TLS 1.3 in transit. Debtor portals use secure cryptographic tokens with no debtor password required.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-white">
      <SEOHead
        title="Jaktra Pricing — 100% Free During Early Access"
        description="Jaktra is 100% free during Early Access. Automate B2B accounts receivable with 5-stage AI tone escalation, dispute triage, and tokenized payment portals with zero credit card required."
        canonicalPath="/pricing"
        jsonLd={[pricingPageSchema, breadcrumbSchema([{ name: "Pricing", path: "/pricing" }])]}
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
            <li className="text-zinc-300 font-medium" aria-current="page">
              Pricing
            </li>
          </ol>
        </nav>

        {/* Hero Title & Subheading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>100% Free During Early Access • Zero Credit Card Required</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Simple, 100% Free Accounts Receivable Automation
          </h1>
          <p className="text-base sm:text-lg text-zinc-400">
            Jaktra is completely free during our public Early Access phase. Autonomously accelerate cash flow, cut Days Sales Outstanding (DSO), and resolve invoice disputes with no credit card required.
          </p>
        </div>

        {/* Single Pricing Card — All Features Free Early Access */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="rounded-2xl border-2 border-emerald-500/50 bg-gradient-to-b from-zinc-900/90 via-zinc-900/60 to-zinc-950 p-8 sm:p-12 relative shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
            {/* Top Pill */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-zinc-950 text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 animate-pulse" />
              100% Free • Early Access
            </div>

            <div className="text-center mb-8 pt-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
                Early Access Plan
              </div>
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-5xl sm:text-6xl font-extrabold text-white font-mono tracking-tight">$0</span>
                <span className="text-emerald-400 text-lg sm:text-xl font-semibold">/ Free Early Access</span>
              </div>
              <p className="text-zinc-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                Full access to all features during Early Access. Automate your collection cadences, triage disputes with AI, and recover overdue receivables with zero commitments.
              </p>
            </div>

            {/* Features Checklist Grid */}
            <div className="border-t border-b border-zinc-800/80 py-8 mb-8">
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-6 text-center">
                All Features Included — Zero Restrictions
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-zinc-200">
                <div className="flex items-start gap-3">
                  <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span><strong className="text-white">Unlimited active invoices</strong> with no volume caps</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span><strong className="text-white">Unlimited team seats</strong> &amp; role permissions</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span><strong className="text-white">5-stage autonomous tone escalation</strong> (LLaMA 3.1)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span><strong className="text-white">NLP dispute triage</strong> &amp; AI draft responses</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span><strong className="text-white">Cryptographic debtor portal</strong> (<code className="text-xs text-emerald-300">/i/:token</code>)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span><strong className="text-white">Structured installment payment plans</strong> (2x–4x)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span><strong className="text-white">Dead Letter Queue (DLQ)</strong> &amp; delivery resilience</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span><strong className="text-white">Predictive ML delinquency risk scoring</strong></span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span><strong className="text-white">Multi-provider email failover</strong> (SendGrid, Resend, SMTP)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span><strong className="text-white">Razorpay settlement</strong> &amp; webhook reconciliation</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span><strong className="text-white">Full tenant isolation</strong> &amp; immutable audit trail</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span><strong className="text-white">Direct CSV import</strong> &amp; custom webhook sync</span>
                </div>
              </div>
            </div>

            {/* CTA button */}
            <div className="flex flex-col items-center justify-center gap-3">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-base font-bold transition-all shadow-lg hover:shadow-xl"
              >
                <span>Get started free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-zinc-400">
                No credit card required • 15-minute onboarding • All features included
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Working Capital & DSO ROI Calculator */}
        <section className="mb-20 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Interactive DSO & Working Capital ROI Calculator
              </h2>
              <p className="text-sm text-zinc-400">
                See how much trapped working capital Jaktra unlocks based on your monthly invoice volume.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <label htmlFor={volumeSliderId} className="text-zinc-300">Monthly Invoiced Volume ($)</label>
                  <span className="text-blue-400 font-mono text-base">${invoiceVolume.toLocaleString()}</span>
                </div>
                <input
                  id={volumeSliderId}
                  type="range"
                  min={50000}
                  max={2000000}
                  step={25000}
                  value={invoiceVolume}
                  onChange={(e) => setInvoiceVolume(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-1">
                  <span>$50,000</span>
                  <span>$1,000,000</span>
                  <span>$2,000,000+</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <label htmlFor={daysSliderId} className="text-zinc-300">Current Average Days Overdue</label>
                  <span className="text-blue-400 font-mono text-base">{daysOverdue} days</span>
                </div>
                <input
                  id={daysSliderId}
                  type="range"
                  min={10}
                  max={60}
                  step={1}
                  value={daysOverdue}
                  onChange={(e) => setDaysOverdue(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-1">
                  <span>10 days</span>
                  <span>30 days</span>
                  <span>60 days</span>
                </div>
              </div>

              <div className="text-xs text-zinc-500 leading-relaxed">
                * Based on Jaktra’s portfolio benchmark: an average 18-day DSO reduction across B2B SaaS and distribution
                receivables, calculated via standard working capital formulas.
              </div>
            </div>

            {/* Results Callout Box */}
            <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
                  Estimated Cash Recovery
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-2">
                  ${releasedCash.toLocaleString()}
                </div>
                <div className="text-sm text-zinc-300 mb-6">
                  in immediate trapped working capital returned to your operating cash flow.
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-zinc-800/80 pt-4">
                  <div>
                    <div className="text-xs text-zinc-400">DSO Reduced By</div>
                    <div className="text-lg font-bold text-emerald-400 font-mono">-{daysReduction} Days</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">Annual Interest Saved</div>
                    <div className="text-lg font-bold text-blue-300 font-mono">${capitalSavings.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <Link
                to="/register"
                className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-200 transition-colors"
              >
                <span>Unlock this cash with Jaktra</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>



        {/* FAQ Accordion Section */}
        <section className="mb-20 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
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

        {/* Final CTA Banner */}
        <section className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-blue-950/40 to-indigo-950/30 p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Automate Your Accounts Receivable?
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-6">
            Join hundreds of forward-thinking finance teams. Create your free account in under 60 seconds with zero credit
            card required.
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
          <Link to="/privacy" className="hover:text-zinc-300 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-zinc-300 transition-colors">
            Terms of Service
          </Link>
          <Link to="/docs" className="hover:text-zinc-300 transition-colors">
            Docs
          </Link>
        </div>
      </footer>
    </div>
  );
}
