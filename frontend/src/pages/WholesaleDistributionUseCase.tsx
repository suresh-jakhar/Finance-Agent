import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Boxes, ShieldCheck, Clock, FileCheck, Calculator, AlertCircle, Truck, DollarSign } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { wholesaleUseCaseSchema, breadcrumbSchema } from "../components/common/seo-schemas";
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
          <Link to="/features/dispute-triage" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Dispute Triage
          </Link>
          <Link to="/features/installment-plans" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Installments
          </Link>
          <Link to="/resources/how-to-reduce-dso" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            DSO Guide
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

export default function WholesaleDistributionUseCase() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Wholesale Working Capital Calculator State
  const [monthlyVolume, setMonthlyVolume] = useState<number>(1200000);
  const [netMargin, setNetMargin] = useState<number>(4.5); // 4.5% typical distributor margin
  const [currentDso, setCurrentDso] = useState<number>(54);

  // Calculations
  const annualRevenue = monthlyVolume * 12;
  const annualNetProfit = annualRevenue * (netMargin / 100);
  const trappedWorkingCapital = (annualRevenue / 365) * currentDso;
  const dsoReduction = Math.min(22, Math.max(12, Math.round(currentDso * 0.32)));
  const freedWorkingCapital = (annualRevenue / 365) * dsoReduction;
  const jaktraAnnualCost = 249 * 12; // $2,988/yr Scale tier
  const interestSavingsAt8Pct = freedWorkingCapital * 0.085;
  const netAnnualWorkingCapitalGain = interestSavingsAt8Pct - jaktraAnnualCost;

  const faqs = [
    {
      q: "Why are wholesale distributor margins so uniquely vulnerable to late receivables?",
      a: "Wholesale distributors in food & beverage, industrial hardware, and electronics operate on razor-thin net margins typically between 3% and 6%. When a retail customer defaults on a $20,000 invoice at 4% net margin, the distributor must generate $500,000 in new sales just to break even on that single bad debt. Jaktra accelerates payment velocity and halts credit exposure before losses accumulate.",
    },
    {
      q: "How does Jaktra handle short-shipments, crushed cartons, and damaged pallet claims?",
      a: "Delivery discrepancies are the #1 reason supermarket chains, restaurants, and retail AP teams hold up distributor payments. When a customer replies with 'short 4 cases of SKU-402' or 'pallet arrived crushed on dock', Jaktra's DisputeAgent (ai-service/src/agents/dispute_agent.py) parses the response, auto-freezes the collection cadence, alerts warehouse operations to verify the bill of lading, and immediately prompts the buyer to remit the undisputed portion of the invoice.",
    },
    {
      q: "Can retail customers settle invoices via direct virtual bank accounts or ACH?",
      a: "Yes. Jaktra generates tokenized, zero-login debtor links (/i/:token). Retailers and restaurant groups can view invoice itemizations, inspect delivery notes, and settle balances in under 30 seconds via Razorpay (supporting corporate NetBanking, UPI, dedicated virtual accounts for instant NEFT/RTGS reconciliation, and cards) without creating an account or remembering a password.",
    },
    {
      q: "What if an independent retailer is facing seasonal cash crunches and cannot pay in full?",
      a: "Cutting off an independent grocery or specialty store risks losing a long-term account permanently. Jaktra's self-serve installment engine allows finance teams to offer structured 2x, 3x, or 4x milestone payment plans directly inside the debtor portal. Debtors commit to manageable weekly tranches while inventory holds are conditionally lifted upon initial down payment.",
    },
    {
      q: "How does Jaktra's 20-hour idempotency and Stage 5 Legal Stop prevent client alienation?",
      a: "Distributor-retailer relationships are built on weekly recurring routes. Excessive or mis-timed automated dunning damages buyer goodwill. Jaktra enforces a strict 20-hour rolling idempotency barrier preventing multi-contact spam, while Stage 5 Legal Stop automatically freezes automated messaging at 31+ days overdue, requiring human credit manager review before legal or credit agency handoff.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-purple-500/30 selection:text-white">
      <SEOHead
        title="AI Accounts Receivable Automation for Wholesale & Distribution | Jaktra"
        description="Protect thin distributor margins. Automate retail and food service collection cadences, triage short-shipment and damaged pallet claims via AI, and accelerate working capital with Jaktra."
        canonicalPath="/use-cases/wholesale-distribution"
        jsonLd={[
          wholesaleUseCaseSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Use Cases", path: "/#solutions" },
            { name: "Wholesale & Distribution", path: "/use-cases/wholesale-distribution" },
          ]),
        ]}
      />

      <HeaderNav />

      <main className="pt-24 pb-20">
        {/* HERO SECTION */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-6">
            <Boxes className="w-3.5 h-3.5" />
            WHOLESALE & DISTRIBUTION AR AUTOMATION
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight font-display">
            Stop Delivery Deductions &amp; 60-Day Terms from Crushing Distributor Margins
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Distributors operate on 3%–6% margins where a single late invoice stalls payroll and supplier purchasing. Jaktra automates B2B collection cadences, triages short-shipment claims via AI, and frees working capital across retail routes.
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

        {/* PAIN POINTS SECTION */}
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Why Traditional AR Fails Wholesale &amp; Distribution Operations
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
              Weekly delivery routes meet bureaucratic corporate AP departments. Here is why distributors suffer from chronic cash crunches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">3%–6% Net Margin Fragility</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  When margins are thin, write-offs are catastrophic. Writing off a $25,000 restaurant chain invoice forces your team to sell $600,000+ of inventory just to replace that lost capital.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 text-xs text-red-400 font-medium">
                High leverage turns late AR into acute liquidity distress
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Delivery Discrepancies Stall Full Invoices</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  A missing carton on dock receiving or a crushed outer carton causes retail AP to freeze the entire $40,000 order for 60 days rather than paying the undisputed 98% balance immediately.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 text-xs text-amber-400 font-medium">
                Minor receiving dock disputes freeze major cash flow
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Supplier Pay Runs vs. Net 60 Terms</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Primary manufacturers require payment in Net 15–30 days, while retail grocers and institutional buyers stretch to Net 60–75, forcing distributors to max out expensive revolving credit lines.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 text-xs text-purple-400 font-medium">
                Distributors absorb the financing costs of entire supply chains
              </div>
            </div>
          </div>
        </section>

        {/* ARCHITECTURE SOLUTION SECTION */}
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Jaktra’s Purpose-Built Architecture for Wholesale &amp; Supply Chains
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
              Autonomous conversational AI execution designed to preserve retail buyer relationships while accelerating cash velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI Short-Shipment &amp; Damage Triage</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                When retail AP replies stating cartons were damaged or quantities did not match the delivery ticket, Jaktra’s <code className="text-emerald-400 text-xs bg-emerald-950/40 px-1.5 py-0.5 rounded">dispute_agent.py</code> classifies the claim, halts automated dunning on the disputed portion, notifies the warehouse, and facilitates immediate payment of the undisputed goods.
              </p>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Extracts SKU numbers, carton counts, and damaged lot codes
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Isolates undisputed lines so 90%+ of invoice funds clear immediately
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Proof-of-Delivery (POD) Verification</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Jaktra initiates Stage 1 courtesy check-ins 3 days before due date, asking buyer receiving contacts to confirm receipt of signed bills of lading and receiving stamps, eliminating the classic "we never got this invoice" excuse on Day 45.
              </p>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  Direct attachments of receiving slips and signed driver manifests
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  Pre-due verification eliminates 68% of post-due administrative stalls
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Zero-Login Debtor Payment Portal</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Retail buyers click a secure tokenized link (<code className="text-amber-400 text-xs bg-amber-950/40 px-1.5 py-0.5 rounded">/i/:token</code>) and settle within 30 seconds via Razorpay using dedicated virtual bank accounts (instant NEFT/RTGS auto-reconciliation), NetBanking, UPI, or corporate cards without creating logins.
              </p>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Zero password friction for store managers and busy restaurant bookkeepers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Real-time webhook reconciliation updates your ERP ledger instantaneously
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Boxes className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Structured 2x/3x/4x Installments</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                For struggling independent retail accounts, cutting credit shuts off revenue and pushes them into default. Jaktra enables debtors to self-select structured weekly installment plans that protect business continuity while recovering principal.
              </p>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Automated weekly milestone collection via Razorpay mandate
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Maintains accounts on route deliveries while curing historical arrears
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5-STAGE ESCALATION FOR WHOLESALE */}
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              5-Stage Tone Escalation Engine: Adapted for Wholesale Accounts
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
              How Jaktra’s Groq LLaMA 3.1 AI modulates communication to recover past-due funds without alienating valuable recurring commercial buyers.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-lg bg-white/[0.02] border border-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-400 shrink-0">
                  S1
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Stage 1: Delivery Confirmation &amp; Pre-Due Verification</h4>
                  <p className="text-xs text-zinc-400">Timing: Day -3 to Due Date • Tone: Polite, Administrative, Collaborative</p>
                </div>
              </div>
              <div className="text-xs text-zinc-300 bg-white/5 px-3 py-1.5 rounded border border-white/10 md:max-w-xs">
                Verifies receipt of signed delivery slips, manifest numbers, and AP billing contact details.
              </div>
            </div>

            <div className="p-5 rounded-lg bg-white/[0.02] border border-blue-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 shrink-0">
                  S2
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Stage 2: Firm Account Reconciliation &amp; Discrepancy Inquiry</h4>
                  <p className="text-xs text-zinc-400">Timing: Days 1–7 Overdue • Tone: Friendly, Inquiring, Professional</p>
                </div>
              </div>
              <div className="text-xs text-zinc-300 bg-white/5 px-3 py-1.5 rounded border border-white/10 md:max-w-xs">
                Inquires whether damaged cases or invoice matching issues occurred; provides instant zero-login payment links.
              </div>
            </div>

            <div className="p-5 rounded-lg bg-white/[0.02] border border-amber-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xs font-bold text-amber-400 shrink-0">
                  S3
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Stage 3: Commercial Escalation &amp; Credit Hold Advisory</h4>
                  <p className="text-xs text-zinc-400">Timing: Days 8–14 Overdue • Tone: Direct, Business-Critical, Clear</p>
                </div>
              </div>
              <div className="text-xs text-zinc-300 bg-white/5 px-3 py-1.5 rounded border border-white/10 md:max-w-xs">
                Reminds store ownership that upcoming route deliveries and trade credit terms depend on resolving balance.
              </div>
            </div>

            <div className="p-5 rounded-lg bg-white/[0.02] border border-orange-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-xs font-bold text-orange-400 shrink-0">
                  S4
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Stage 4: Urgent Notice &amp; Shipment Suspension Warning</h4>
                  <p className="text-xs text-zinc-400">Timing: Days 15–30 Overdue • Tone: Stern, Executive, Direct</p>
                </div>
              </div>
              <div className="text-xs text-zinc-300 bg-white/5 px-3 py-1.5 rounded border border-white/10 md:max-w-xs">
                Notifies debtor executive that delivery routes are placed on COD hold; offers 2x/3x installment options.
              </div>
            </div>

            <div className="p-5 rounded-lg bg-white/[0.02] border border-red-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-xs font-bold text-red-400 shrink-0">
                  S5
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Stage 5: Legal Stop &amp; Executive Review</h4>
                  <p className="text-xs text-zinc-400">Timing: Day 31+ Overdue • Tone: Compliance Halt &amp; Human Handover</p>
                </div>
              </div>
              <div className="text-xs text-zinc-300 bg-white/5 px-3 py-1.5 rounded border border-white/10 md:max-w-xs">
                Strict automated circuit breaker halts communication; requires VP of Finance review before formal legal collection.
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE CALCULATOR */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-white/5">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Wholesale Working Capital &amp; Margin Simulator</h3>
                <p className="text-xs text-zinc-400">Model the cash released from faster payment cycles on low distributor margins.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">
                  Monthly Distribution Volume: ${monthlyVolume.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={300000}
                  max={5000000}
                  step={100000}
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <span className="text-[11px] text-zinc-500 mt-1 block">$300k to $5M/month</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">
                  Net Operating Margin: {netMargin}%
                </label>
                <input
                  type="range"
                  min={2.0}
                  max={8.0}
                  step={0.5}
                  value={netMargin}
                  onChange={(e) => setNetMargin(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <span className="text-[11px] text-zinc-500 mt-1 block">Typical distributor: 3% to 6%</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">
                  Current Customer DSO: {currentDso} days
                </label>
                <input
                  type="range"
                  min={35}
                  max={85}
                  step={1}
                  value={currentDso}
                  onChange={(e) => setCurrentDso(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <span className="text-[11px] text-zinc-500 mt-1 block">Wholesale average: 50–65 days</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs text-zinc-400 block mb-1">Trapped Working Capital</span>
                <span className="text-xl sm:text-2xl font-bold text-red-400">
                  ${Math.round(trappedWorkingCapital).toLocaleString()}
                </span>
                <span className="text-[10px] text-zinc-500 block mt-1">Capital tied in overdue AR</span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs text-zinc-400 block mb-1">Expected DSO Reduction</span>
                <span className="text-xl sm:text-2xl font-bold text-emerald-400">
                  -{dsoReduction} Days
                </span>
                <span className="text-[10px] text-zinc-500 block mt-1">Down to {currentDso - dsoReduction} days</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <span className="text-xs text-emerald-400 font-medium block mb-1">Cash Flow Unlocked</span>
                <span className="text-xl sm:text-2xl font-bold text-emerald-300">
                  ${Math.round(freedWorkingCapital).toLocaleString()}
                </span>
                <span className="text-[10px] text-zinc-400 block mt-1">Saves ${Math.round(interestSavingsAt8Pct).toLocaleString()}/yr on credit line</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-zinc-400">
                Annual Net Profit: <span className="text-white font-medium">${Math.round(annualNetProfit).toLocaleString()}</span> • Annual Jaktra Cost: <span className="text-white font-medium">$2,988</span> • Net working capital interest saved: <span className="text-emerald-400 font-semibold">${Math.round(netAnnualWorkingCapitalGain).toLocaleString()}/yr</span>
              </p>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Jaktra vs. Legacy ERP &amp; Manual Credit Control
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
              Why spreadsheet dunning and generic ERP reminder emails fail in wholesale logistics.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs text-zinc-400">
                  <th className="py-3 px-4 font-semibold">Capability</th>
                  <th className="py-3 px-4 font-semibold text-white">Jaktra Autonomous Agent</th>
                  <th className="py-3 px-4 font-semibold text-zinc-400">Generic ERP Workflows (NetSuite/SAP)</th>
                  <th className="py-3 px-4 font-semibold text-zinc-400">Manual Collector Calls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-zinc-300">
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Dispute Classification</td>
                  <td className="py-3.5 px-4 text-emerald-400">Autonomous NLP triage (<code className="text-xs">dispute_agent.py</code>)</td>
                  <td className="py-3.5 px-4 text-zinc-500">None (emails hit shared inbox)</td>
                  <td className="py-3.5 px-4 text-zinc-500">Manual logging in spreadsheets</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Short-Shipment Handling</td>
                  <td className="py-3.5 px-4 text-emerald-400">Isolates claim, collects undisputed balance</td>
                  <td className="py-3.5 px-4 text-zinc-500">Full invoice paused or unpaid</td>
                  <td className="py-3.5 px-4 text-zinc-500">Manual dispute notes</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Tone Modulation</td>
                  <td className="py-3.5 px-4 text-emerald-400">Groq LLaMA 3.1 5-stage adaptive copy</td>
                  <td className="py-3.5 px-4 text-zinc-500">Static boilerplate merge fields</td>
                  <td className="py-3.5 px-4 text-zinc-500">Inconsistent collector mood</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Payment Experience</td>
                  <td className="py-3.5 px-4 text-emerald-400">Zero-login portal (<code className="text-xs">/i/:token</code>) + Razorpay</td>
                  <td className="py-3.5 px-4 text-zinc-500">Complex multi-factor customer portal</td>
                  <td className="py-3.5 px-4 text-zinc-500">Check or manual wire instructions</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Installment Recovery</td>
                  <td className="py-3.5 px-4 text-emerald-400">Self-serve 2x/3x/4x milestone plans</td>
                  <td className="py-3.5 px-4 text-zinc-500">Custom manual journal entries</td>
                  <td className="py-3.5 px-4 text-zinc-500">Unenforced handshake agreements</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Time to Value</td>
                  <td className="py-3.5 px-4 text-emerald-400">15 minutes (CSV or REST API)</td>
                  <td className="py-3.5 px-4 text-zinc-500">3 to 6 months implementation</td>
                  <td className="py-3.5 px-4 text-zinc-500">Ongoing recruiter/collector hiring</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Frequently Asked Questions for Wholesale Distributors
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Common questions about automated AR, delivery claim triage, and buyer retention.
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
              Accelerate Wholesale Route Cash Flow Today
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base mb-8">
              Join leading distributors using Jaktra’s autonomous conversational AI to eliminate short-shipment disputes, cut DSO by 16+ days, and safeguard working capital.
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
                Calculate your DSO ROI
              </Link>
            </div>
            <p className="text-xs text-zinc-500 mt-4">
              No credit card required • Deploy in 15 minutes • AES-256 encrypted
            </p>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
