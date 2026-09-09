import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Lock, KeyRound, ShieldCheck, Split, CreditCard, Download, Zap } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { zeroLoginPortalSchema, breadcrumbSchema } from "../components/common/seo-schemas";

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

export function ZeroLoginPortal() {
  const [activeTab, setActiveTab] = useState<"statement" | "installments" | "checkout">("statement");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How is a zero-login debtor portal secure without passwords?",
      a: "Jaktra generates a high-entropy, cryptographically unique URL token (`/i/:token`) for each invoice or statement of account. The token is verified server-side (`backend/src/modules/portal/portal.service.ts`) against the debtor's account record. Because it exposes only that specific customer's invoice data and payment rails, it eliminates account hijacking while removing authentication friction.",
    },
    {
      q: "Why do traditional customer login portals have high abandonment rates?",
      a: "B2B accounts payable teams process invoices for hundreds of vendors. Forcing a busy AP clerk to register an account, create a complex password, and verify an email just to pay one invoice results in over 70% portal abandonment. Jaktra's tokenized portal lets them review and pay in under 45 seconds.",
    },
    {
      q: "Can debtors select installment schedules through the portal without human intervention?",
      a: "Yes. If enabled by the finance team, the portal allows debtors experiencing liquidity pinches to choose a 2-part, 3-part, or 4-part installment plan. Selecting a plan automatically shifts Jaktra's agent to `ActiveInstallmentContext`, updating the collection cadence to remind only for upcoming milestones.",
    },
    {
      q: "What payment rails can buyers use on the tokenized portal?",
      a: "Through Jaktra's native payment adapter (Razorpay), buyers can settle via Instant UPI, Corporate Credit/Debit Cards, NetBanking across all major commercial banks, or obtain dynamic virtual bank accounts for NEFT/RTGS transfers with automated webhook confirmation.",
    },
    {
      q: "Does the finance team get telemetry when a debtor opens the link?",
      a: "Yes. When a debtor opens their tokenized portal link, Jaktra records an audit event timestamp. Finance teams can see exactly when the invoice was viewed, whether the PDF was downloaded, and if the debtor initiated checkout.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-white">
      <SEOHead
        title="Tokenized Zero-Login Debtor Payment Portal Architecture — Jaktra"
        description="Explore Jaktra's cryptographic zero-login debtor portal (/i/:token). Eliminate 70%+ customer portal drop-off with one-click statements, instant settlement, and self-service installment plans."
        canonicalPath="/features/zero-login-portal"
        jsonLd={[
          zeroLoginPortalSchema,
          breadcrumbSchema([
            { name: "Features", path: "/features/5-stage-escalation" },
            { name: "Zero-Login Debtor Portal", path: "/features/zero-login-portal" },
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
              Zero-Login Portal
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-300 text-xs font-medium mb-4">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Frictionless Cryptographic Settlement (/i/:token)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            Tokenized Zero-Login Debtor Payment Portal
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Eliminate 70%+ portal drop-off. Send single-click cryptographically signed statement links where debtors
            can review itemized invoices, set up installment plans, and settle instantly without login passwords.
          </p>
        </div>

        {/* Metrics Banner */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono mb-1">0</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Passwords Required to Pay</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono mb-1">&lt; 45 Sec</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Average Settlement Time</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-1">3.4x</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Higher Conversion vs Login Portals</div>
          </div>
        </section>

        {/* Interactive Debtor Portal Simulator */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-10 mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-xl font-bold text-white">Live Debtor Experience Sandbox</h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Preview the exact zero-friction portal your customers see when clicking their payment link.
              </p>
            </div>

            {/* Tab Controls */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-950 border border-zinc-800">
              <button
                onClick={() => setActiveTab("statement")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeTab === "statement" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Statement View
              </button>
              <button
                onClick={() => setActiveTab("installments")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeTab === "installments" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Installment Split
              </button>
              <button
                onClick={() => setActiveTab("checkout")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeTab === "checkout" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Instant Checkout
              </button>
            </div>
          </div>

          {/* Browser Shell Mockup */}
          <div className="rounded-xl border border-zinc-800 bg-[#090a0f] overflow-hidden shadow-2xl">
            {/* Browser Address Bar */}
            <div className="px-4 py-2.5 bg-zinc-950 border-b border-zinc-800/80 flex items-center gap-3 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 max-w-md mx-auto py-1 px-3 rounded bg-zinc-900 border border-zinc-800/60 font-mono text-[11px] text-zinc-400 flex items-center justify-between">
                <span className="truncate">https://jaktra.site/i/sec_9f82ab410d...</span>
                <Lock className="w-3 h-3 text-emerald-400 shrink-0 ml-2" />
              </div>
            </div>

            {/* Portal Tab Contents */}
            <div className="p-6 sm:p-8">
              {activeTab === "statement" && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-5">
                    <div>
                      <div className="text-xs text-zinc-400 uppercase tracking-wider">Statement of Account</div>
                      <div className="text-2xl font-bold font-mono text-white mt-0.5">$4,250.00 USD</div>
                      <div className="text-xs text-amber-400 mt-1 font-medium">Invoice #INV-2048 · 12 Days Past Due</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200">
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </button>
                      <button
                        onClick={() => setActiveTab("checkout")}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-white hover:bg-zinc-200 text-xs font-semibold text-zinc-950 transition-colors"
                      >
                        <span>Pay $4,250 Now</span>
                      </button>
                    </div>
                  </div>

                  {/* Line Items Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-zinc-800/80 text-zinc-500">
                          <th className="pb-2">Description</th>
                          <th className="pb-2 text-right">Quantity</th>
                          <th className="pb-2 text-right">Unit Price</th>
                          <th className="pb-2 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                        <tr>
                          <td className="py-3 font-medium text-white">Cloud Infrastructure — Enterprise Tier (Monthly)</td>
                          <td className="py-3 text-right">1</td>
                          <td className="py-3 text-right font-mono">$3,500.00</td>
                          <td className="py-3 text-right font-mono">$3,500.00</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-medium text-white">Dedicated API Rate Limit Add-on</td>
                          <td className="py-3 text-right">3</td>
                          <td className="py-3 text-right font-mono">$250.00</td>
                          <td className="py-3 text-right font-mono">$750.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "installments" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white">Structured Installment Options</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Need cash flow flexibility? Split this $4,250.00 balance into monthly installments with zero interest fees.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-4 relative">
                      <div className="text-xs text-zinc-400 uppercase tracking-wider">2 Payments</div>
                      <div className="text-xl font-bold font-mono text-white mt-1">$2,125 / mo</div>
                      <p className="text-[11px] text-zinc-500 mt-2">Due Today & in 30 days</p>
                      <button className="w-full mt-4 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200">
                        Select 2x Plan
                      </button>
                    </div>

                    <div className="rounded-xl border border-blue-500 bg-blue-950/20 p-4 relative">
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-blue-500 text-white font-semibold text-[10px]">
                        Recommended
                      </span>
                      <div className="text-xs text-blue-300 uppercase tracking-wider">3 Payments</div>
                      <div className="text-xl font-bold font-mono text-white mt-1">$1,416 / mo</div>
                      <p className="text-[11px] text-zinc-400 mt-2">Due Today, Day 30 & Day 60</p>
                      <button className="w-full mt-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white">
                        Select 3x Plan
                      </button>
                    </div>

                    <div className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-4 relative">
                      <div className="text-xs text-zinc-400 uppercase tracking-wider">4 Payments</div>
                      <div className="text-xl font-bold font-mono text-white mt-1">$1,062 / mo</div>
                      <p className="text-[11px] text-zinc-500 mt-2">Due over 90 days</p>
                      <button className="w-full mt-4 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200">
                        Select 4x Plan
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "checkout" && (
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="text-xs text-zinc-400 uppercase tracking-wider">Pay Outstanding Balance</div>
                    <div className="text-2xl font-bold font-mono text-white mt-1">$4,250.00 USD</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/80">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-medium text-white">Corporate Credit / Debit Card</span>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-medium">Instant</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/80">
                      <div className="flex items-center gap-3">
                        <KeyRound className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-medium text-white">NetBanking / Direct Debit</span>
                      </div>
                      <span className="text-[11px] text-zinc-400">All Major Banks</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/80">
                      <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-medium text-white">Instant UPI Settlement</span>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-medium">Zero Fee</span>
                    </div>
                  </div>

                  <button className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-colors shadow-lg">
                    Confirm & Settle $4,250.00
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3 Core Architecture Moats */}
        <section className="space-y-12 mb-20">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              1. Cryptographic Tokenized Access with Audit Trail
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Every outreach email embeds a high-entropy URL token generated on demand. When clicked, Jaktra verifies
              the token server-side (`backend/src/modules/portal/portal.service.ts`), recording exact debtor engagement
              timestamps (viewed statement, downloaded PDF, initiated checkout) so your finance team knows who is engaging.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
              <Split className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              2. Self-Serve Installment Plans with Active Context Switching
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Instead of forcing manual phone negotiation when a customer cannot pay in full, the portal allows debtors
              to select structured 2x, 3x, or 4x installment milestones. Selecting a plan automatically creates schedule
              records in `backend/src/modules/payment-plan/` and switches dunning context to `ActiveInstallmentContext`,
              reminding only for upcoming milestones.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <CreditCard className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              3. Instant Gateway Settlement & Real-Time Ledger Updates
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              When a debtor pays through the portal, payment settles instantly across Razorpay rails. Webhook handlers
              verify the signature and update the invoice to `PAID` or `PARTIAL` within seconds, halting all automated
              reminders immediately to ensure zero redundant outreach.
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
        <section className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-blue-950/40 to-purple-950/30 p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Offer Zero-Friction Payment Portals to Your Debtors
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-6">
            Eliminate password barriers and accelerate online cash recovery. Set up Jaktra in 15 minutes with 100% Free Early Access.
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
          <Link to="/features/installment-plans" className="hover:text-zinc-300 transition-colors">
            Installment Plans
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
