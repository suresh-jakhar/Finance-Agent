import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Briefcase, Scale, CreditCard, Calculator, Users } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { professionalServicesSchema, breadcrumbSchema } from "../components/common/seo-schemas";

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

export function ProfessionalServicesUseCase() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Lockup & Realization Calculator State
  const [annualFees, setAnnualFees] = useState<number>(3000000);
  const [currentLockupDays, setCurrentLockupDays] = useState<number>(65);
  const [partnerCount, setPartnerCount] = useState<number>(6);

  const capitalTrappedTotal = (annualFees / 365) * currentLockupDays;
  const dsoReductionDays = 18;
  const capitalReleasedTotal = (annualFees / 365) * dsoReductionDays;
  const capitalReleasedPerPartner = Math.round(capitalReleasedTotal / partnerCount);

  const faqs = [
    {
      q: "How does Jaktra eliminate awkward partner collections in law and advisory firms?",
      a: "Senior partners and practice directors should never be forced to chase unpaid bills right before quarterly reviews or strategic pitches. Jaktra acts as an institutional finance buffer: polite, professional reminders originate from accounts receivable, keeping partners 100% focused on billable delivery and client advisory.",
    },
    {
      q: "What happens when a client disputes billable hours or time entries?",
      a: "When a corporate client replies questioning partner billing rates or requesting an itemized breakdown of hours, Jaktra's NLP DisputeAgent flags the inquiry, immediately freezes automated collection cadences, and drafts an internal ticket for the practice billing manager to review with the client.",
    },
    {
      q: "Can clients replenish evergreen retainers through the portal?",
      a: "Yes. Jaktra generates secure, zero-login tokenized payment links (`/i/:token`). Clients can review their statement of account, verify trust or operating account balances, and replenish retainers via corporate credit cards, NetBanking, or instant UPI in under 60 seconds.",
    },
    {
      q: "How does Jaktra protect client relationships during fee escalations?",
      a: "Jaktra's Groq LLaMA 3.1 tone modulation engine dynamically adapts communications across 5 stages: Stage 1 assumes administrative oversight, Stage 2 provides structured accounting follow-up, and Stage 3 introduces installment options—ensuring the firm's elite brand reputation and client goodwill remain pristine.",
    },
    {
      q: "How quickly can a consulting or law firm onboard onto Jaktra?",
      a: "In under 15 minutes. Practice managers can import their billing ledger via CSV or connect directly via API. Jaktra automatically extracts client billing contacts, due dates, and open balances with zero custom IT implementation.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-indigo-500/30 selection:text-white">
      <SEOHead
        title="AI Accounts Receivable Automation for Professional Services & Legal — Jaktra"
        description="Eliminate partner billing friction for law firms, consultancies, and accounting practices. Triage billable hours scope disputes, automate retainer top-ups, and accelerate cash flow with Jaktra."
        canonicalPath="/use-cases/professional-services"
        jsonLd={[
          professionalServicesSchema,
          breadcrumbSchema([
            { name: "Solutions", path: "/use-cases/saas" },
            { name: "Professional Services", path: "/use-cases/professional-services" },
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
              <span className="text-zinc-400">Solutions</span>
            </li>
            <li>/</li>
            <li className="text-zinc-300 font-medium" aria-current="page">
              Professional Services
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Built for Law Firms, Advisory Consultancies & Accounting Practices</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            AI Accounts Receivable Automation for Professional Services
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Eliminate the partner billing bottleneck. Jaktra acts as an institutional finance buffer,
            triages billable hours inquiries autonomously, and accelerates cash recovery while protecting client goodwill.
          </p>
        </div>

        {/* Metrics Banner */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-1">-18 Days</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Average Advisory DSO Reduction</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-mono mb-1">100%</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Partner-Client Rapport Protected</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono mb-1">$148K+</div>
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Cash Released (per $3M Fees)</div>
          </div>
        </section>

        {/* Interactive Lockup & Partner Capital Calculator */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 sm:p-10 mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Partner Capital & Lockup Acceleration Calculator</h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Model how reducing billing lockup days releases liquidity directly to partner capital distributions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Input 1: Annual Billable Fees */}
            <div>
              <label htmlFor="annual-fees-range" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                Annual Billable Fees: <span className="text-white font-mono font-bold">${(annualFees / 1000000).toFixed(1)}M</span>
              </label>
              <input
                id="annual-fees-range"
                type="range"
                min={1000000}
                max={15000000}
                step={500000}
                value={annualFees}
                onChange={(e) => setAnnualFees(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                <span>$1M</span>
                <span>$7.5M</span>
                <span>$15M</span>
              </div>
            </div>

            {/* Input 2: Current Lockup Days */}
            <div>
              <label htmlFor="lockup-days-range" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                Current Total DSO Lockup: <span className="text-amber-400 font-mono font-bold">{currentLockupDays} Days</span>
              </label>
              <input
                id="lockup-days-range"
                type="range"
                min={45}
                max={100}
                step={1}
                value={currentLockupDays}
                onChange={(e) => setCurrentLockupDays(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                <span>45d</span>
                <span>70d</span>
                <span>100d</span>
              </div>
            </div>

            {/* Input 3: Equity Partners Count */}
            <div>
              <label htmlFor="partners-count-range" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                Equity Partners: <span className="text-indigo-400 font-mono font-bold">{partnerCount} Partners</span>
              </label>
              <input
                id="partners-count-range"
                type="range"
                min={2}
                max={25}
                step={1}
                value={partnerCount}
                onChange={(e) => setPartnerCount(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                <span>2</span>
                <span>12</span>
                <span>25</span>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-xl bg-zinc-950/70 border border-zinc-800">
            <div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Capital Trapped in AR Lockup</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">
                ${Math.round(capitalTrappedTotal).toLocaleString()}
              </div>
              <div className="text-xs text-zinc-500 mt-1">{currentLockupDays} days of trailing fee production</div>
            </div>
            <div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Total Firm Liquidity Released</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
                +${Math.round(capitalReleasedTotal).toLocaleString()}
              </div>
              <div className="text-xs text-zinc-500 mt-1">Based on -18 day DSO acceleration</div>
            </div>
            <div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Released per Equity Partner</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-indigo-400">
                +${capitalReleasedPerPartner.toLocaleString()}
              </div>
              <div className="text-xs text-zinc-500 mt-1">Direct cash flow injection to partner distributions</div>
            </div>
          </div>
        </section>

        {/* 3 Core Firm Challenges Solved */}
        <section className="space-y-12 mb-20">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              1. Remove Partners from the Uncomfortable Collector Role
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              When managing partners or practice directors have to send awkward emails chasing unpaid invoices, it creates
              friction before contract renegotiations or project deliveries. Jaktra acts as an institutional finance desk:
              cordial, respectful communications are sent from accounts receivable, keeping partners in their trusted
              advisor role while cash flow accelerates.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
              <Scale className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              2. Billable Hours & Time-Entry Dispute Triage
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Corporate clients frequently hold back payment when questioning hourly time sheets or expense disbursements.
              Jaktra’s NLP DisputeAgent analyzes incoming replies, flags time entry inquiries immediately, halts active
              collection sequences, and drafts an internal ticket for your billing coordinator—preventing embarrassing
              automated follow-ups during fee discussions.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <CreditCard className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              3. Zero-Login Retainer Top-Ups & Milestone Installment Plans
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              For corporate clients experiencing temporary liquidity constraints, demanding immediate full lump-sum
              settlement often causes relationship strain or project stalls. Jaktra embeds cryptographic single-use links
              (`/i/:token`) where clients can pay instantly or choose structured installment milestones with real-time
              ledger reconciliation.
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
        <section className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-indigo-950/40 to-blue-950/30 p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Accelerate Practice Cash Flow Without Straining Client Goodwill
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-6">
            Equip your practice with autonomous AI collections and zero-login settlement. 100% free during Early Access with zero credit card required.
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
