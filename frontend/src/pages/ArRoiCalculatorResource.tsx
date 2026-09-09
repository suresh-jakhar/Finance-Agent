import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Calculator, TrendingDown, DollarSign, Clock, ShieldCheck, Zap, Sparkles } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { roiCalculatorSchema, breadcrumbSchema } from "../components/common/seo-schemas";
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

export default function ArRoiCalculatorResource() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Model Inputs
  const [annualRevenue, setAnnualRevenue] = useState<number>(12000000); // $12M revenue
  const [currentDso, setCurrentDso] = useState<number>(54); // 54 days
  const [dsoReduction, setDsoReduction] = useState<number>(16); // 16 days reduction
  const [arFtes, setArFtes] = useState<number>(2); // 2 collectors
  const [hourlyLoadedRate, setHourlyLoadedRate] = useState<number>(45); // $45/hr
  const [costOfDebt, setCostOfDebt] = useState<number>(8.5); // 8.5% borrowing cost
  const [badDebtRate, setBadDebtRate] = useState<number>(0.75); // 0.75% bad debt

  // Mathematical Calculations
  const trappedWorkingCapital = (annualRevenue / 365) * currentDso;
  const releasedWorkingCapital = (annualRevenue / 365) * dsoReduction;
  const annualInterestSaved = releasedWorkingCapital * (costOfDebt / 100);

  const hoursSavedPerFteMonth = 38; // 38 hours/month automated per collector
  const annualHoursSaved = arFtes * hoursSavedPerFteMonth * 12;
  const annualLaborReclaimed = annualHoursSaved * hourlyLoadedRate;

  const annualBadDebtBaseline = annualRevenue * (badDebtRate / 100);
  const badDebtSaved = annualBadDebtBaseline * 0.32; // 32% reduction via ML risk scoring & dispute triage

  const netAnnualFinancialGain = annualInterestSaved + annualLaborReclaimed + badDebtSaved;
  const threeYearNetBenefit = netAnnualFinancialGain * 3;
  const roiMultiple = "100% Free";

  const faqs = [
    {
      q: "How does accounts receivable automation generate measurable ROI for CFOs?",
      a: "AR automation delivers ROI across three distinct financial pillars: (1) Capital Release & Interest Avoidance: Faster payments reduce DSO, unlocking trapped working capital and saving 7%–10% interest on revolving credit lines or invoice factoring fees. (2) Operational Labor Reallocation: Automating repetitive collection emails, statement reconciliations, and routine inquiries frees 35–45 hours per collector monthly. (3) Bad Debt Mitigation: Early sentiment classification and automated cadence escalation reduce write-offs by preventing invoices from aging past 60+ days where recovery likelihood collapses.",
    },
    {
      q: "Why is working capital release more valuable than software cost savings?",
      a: "For a company generating $15M in annual revenue, cutting DSO from 56 days to 40 days frees approximately $657,500 in liquid working capital. At an 8.5% borrowing cost, that alone saves $55,800 every year in bank interest charges—and during Early Access, Jaktra is 100% free with zero software subscription fees. The cash can be immediately redeployed into inventory, hiring, or growth initiatives without issuing equity or debt.",
    },
    {
      q: "How does Jaktra calculate labor hours saved?",
      a: "Finance industry studies indicate credit controllers spend up to 40% of their working hours manually composing follow-up emails, looking up payment status in banking portals, logging call notes, and manually coordinating disputes. Jaktra's Groq LLaMA 3.1 tone escalation engine and automated DisputeAgent (ai-service/src/agents/dispute_agent.py) handle routine outbound reminders and classify inbound replies autonomously, reclaiming roughly 38 hours per collector each month.",
    },
    {
      q: "How does early dispute triage prevent bad debt write-offs?",
      a: "According to credit management data, over 55% of invoices that age beyond 90 days started as simple administrative disputes (missing PO, billing discrepancy, delivery issue) that were never caught in time. Jaktra classifies inbound customer replies into disputes, promises, or queries immediately upon arrival, halts automated collection cadences, and drafts suggested resolutions for finance approval before the invoice becomes an uncollectible loss.",
    },
    {
      q: "What makes Jaktra's pricing so much more capital-efficient than legacy AR suites?",
      a: "Legacy enterprise platforms (HighRadius, Billtrust, YayPay) require multi-year contracts costing $25,000 to $60,000+ per year plus $10,000+ in implementation consultant fees. Jaktra is 100% free during Early Access with self-serve 15-minute onboarding, zero credit card required, and no invoice limits.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-purple-500/30 selection:text-white">
      <SEOHead
        title="B2B Accounts Receivable Automation ROI & Working Capital Calculator | Jaktra"
        description="Calculate your DSO reduction, working capital released, debt interest saved, and net 3-year ROI from automating accounts receivable collections with Jaktra."
        canonicalPath="/resources/ar-automation-roi-calculator"
        jsonLd={[
          roiCalculatorSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/#resources" },
            { name: "AR Automation ROI Calculator", path: "/resources/ar-automation-roi-calculator" },
          ]),
        ]}
      />

      <HeaderNav />

      <main className="pt-24 pb-20">
        {/* HERO SECTION */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-6">
            <Calculator className="w-3.5 h-3.5" />
            CFO &amp; FINANCE CONTROLLER PLANNING TOOL
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight font-display">
            Accounts Receivable Automation ROI &amp; Working Capital Calculator
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Model the exact financial return of replacing manual collection calling queues with autonomous AI execution. Calculate working capital unlocked, interest expenses avoided, and collector labor reclaimed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-all shadow-md"
            >
              Run your company's calculation
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all"
            >
              Explore Free Early Access
            </Link>
          </div>
        </section>

        {/* CALCULATOR CONTAINER */}
        <section id="calculator" className="max-w-5xl mx-auto px-6 py-12 scroll-mt-20">
          <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white font-display">
                  Enterprise AR Impact Simulator
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Adjust your baseline financial variables to project liquidity, labor savings, and net ROI.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <Sparkles className="w-4 h-4" />
                Live Model • 100% Free Early Access
              </div>
            </div>

            {/* INPUT CONTROLS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {/* Annual Revenue */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium text-zinc-300">Annual B2B Revenue</label>
                  <span className="text-xs font-bold text-emerald-400">
                    ${(annualRevenue / 1000000).toFixed(1)}M
                  </span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={50000000}
                  step={500000}
                  value={annualRevenue}
                  onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                  <span>$1M</span>
                  <span>$50M</span>
                </div>
              </div>

              {/* Current DSO */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium text-zinc-300">Current DSO</label>
                  <span className="text-xs font-bold text-amber-400">{currentDso} Days</span>
                </div>
                <input
                  type="range"
                  min={35}
                  max={90}
                  step={1}
                  value={currentDso}
                  onChange={(e) => setCurrentDso(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                  <span>35 days (Fast)</span>
                  <span>90 days (Slow)</span>
                </div>
              </div>

              {/* Target DSO Reduction */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium text-zinc-300">Target DSO Reduction</label>
                  <span className="text-xs font-bold text-emerald-400">-{dsoReduction} Days</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={25}
                  step={1}
                  value={dsoReduction}
                  onChange={(e) => setDsoReduction(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                  <span>-5 days</span>
                  <span>-25 days</span>
                </div>
              </div>

              {/* Dedicated AR FTEs */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium text-zinc-300">AR &amp; Collections Staff</label>
                  <span className="text-xs font-bold text-blue-400">{arFtes} FTEs</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={1}
                  value={arFtes}
                  onChange={(e) => setArFtes(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                  <span>1 person</span>
                  <span>8 team members</span>
                </div>
              </div>

              {/* Hourly Loaded Rate */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium text-zinc-300">Loaded Finance Rate</label>
                  <span className="text-xs font-bold text-zinc-200">${hourlyLoadedRate}/hr</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={80}
                  step={5}
                  value={hourlyLoadedRate}
                  onChange={(e) => setHourlyLoadedRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                  <span>$30/hr</span>
                  <span>$80/hr (Senior)</span>
                </div>
              </div>

              {/* Cost of Debt / Credit Facility */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium text-zinc-300">Cost of Debt (Revolving Line)</label>
                  <span className="text-xs font-bold text-purple-400">{costOfDebt}%</span>
                </div>
                <input
                  type="range"
                  min={5.0}
                  max={14.0}
                  step={0.5}
                  value={costOfDebt}
                  onChange={(e) => setCostOfDebt(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                  <span>5% (Prime)</span>
                  <span>14% (Factoring)</span>
                </div>
              </div>

              {/* Bad Debt Rate */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium text-zinc-300">Annual Bad Debt Rate</label>
                  <span className="text-xs font-bold text-amber-400">{badDebtRate}%</span>
                </div>
                <input
                  type="range"
                  min={0.2}
                  max={2.5}
                  step={0.05}
                  value={badDebtRate}
                  onChange={(e) => setBadDebtRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                  <span>0.2% (Low)</span>
                  <span>2.5% (High)</span>
                </div>
              </div>
            </div>

            {/* KEY EXECUTIVE METRICS DISPLAY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Working Capital Freed</span>
                </div>
                <div className="text-2xl font-bold text-emerald-400">
                  ${Math.round(releasedWorkingCapital).toLocaleString()}
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Down from ${Math.round(trappedWorkingCapital).toLocaleString()} currently trapped
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1.5">
                  <TrendingDown className="w-4 h-4 text-purple-400" />
                  <span>Annual Interest Saved</span>
                </div>
                <div className="text-2xl font-bold text-purple-400">
                  ${Math.round(annualInterestSaved).toLocaleString()}
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  At {costOfDebt}% credit facility borrowing rate
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1.5">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Collector Hours Saved</span>
                </div>
                <div className="text-2xl font-bold text-blue-400">
                  {annualHoursSaved.toLocaleString()} hrs/yr
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Reclaiming ${Math.round(annualLaborReclaimed).toLocaleString()} in finance labor
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Bad Debt Mitigated</span>
                </div>
                <div className="text-2xl font-bold text-amber-400">
                  ${Math.round(badDebtSaved).toLocaleString()}/yr
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  32% write-off prevention via ML risk scoring
                </p>
              </div>
            </div>

            {/* EXECUTIVE SUMMARY BANNER */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-white/[0.02] to-blue-950/30 border border-emerald-500/30">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 block mb-1">
                    Net Annual Financial Impact
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                    ${Math.round(netAnnualFinancialGain).toLocaleString()}{" "}
                    <span className="text-sm font-normal text-zinc-400">/ year</span>
                  </div>
                  <div className="text-xs text-zinc-400 mt-2 flex flex-wrap items-center gap-4">
                    <span>
                      3-Year Net Benefit:{" "}
                      <strong className="text-emerald-300 font-semibold">
                        ${Math.round(threeYearNetBenefit).toLocaleString()}
                      </strong>
                    </span>
                    <span>•</span>
                    <span>
                      Payback Period:{" "}
                      <strong className="text-white font-semibold">Immediate (Free Early Access)</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Pricing:{" "}
                      <strong className="text-emerald-400 font-semibold">{roiMultiple}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                  <Link
                    to="/register"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-400 text-zinc-950 font-bold text-sm hover:bg-emerald-300 transition-all shadow-lg"
                  >
                    Deploy Jaktra &amp; Unlock Liquidity
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 CORE VALUE LEVERS */}
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              The 4 Financial Levers That Drive AR Automation ROI
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
              Where the economic value is generated inside your profit &amp; loss and balance sheet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Working Capital &amp; Borrowing Cost Avoidance</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                When DSO is cut by 15 days, capital moves from debtor bank accounts directly into your operating cash flow. In an era of 7%–10% interest rates, eliminating the need to draw on credit facilities or invoice factoring produces immediate, dollar-for-dollar bottom line profit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Finance Labor Productivity &amp; Headcount Leverage</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Credit controllers spend up to 40% of their day on low-leverage tasks: drafting routine payment reminders, checking bank accounts for wire arrivals, and emailing statements. Jaktra automates these tasks end-to-end, allowing finance teams to scale without adding headcount.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Bad Debt &amp; Aging Collapse Prevention</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Invoices that reach 90+ days overdue experience an average recovery probability drop to under 50%. Jaktra’s predictive delinquency ML risk scoring (<code className="text-xs bg-white/5 px-1 py-0.5 rounded">scorer.py</code>) stratifies at-risk accounts early and escalates tone before losses crystallize.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">4. Frictionless Digital Remittance Velocity</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                By replacing cumbersome paper checks and password-protected portals with cryptographically tokenized zero-login links (<code className="text-xs bg-white/5 px-1 py-0.5 rounded">/i/:token</code>) and native Razorpay payment rails, corporate AP teams settle balances in 30 seconds.
              </p>
            </div>
          </div>
        </section>

        {/* COMPARISON BENCHMARKS TABLE */}
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Industry DSO &amp; ROI Benchmarks
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
              Average collection metrics observed across major B2B industry verticals after deploying autonomous AR automation.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs text-zinc-400">
                  <th className="py-3 px-4 font-semibold">Industry Vertical</th>
                  <th className="py-3 px-4 font-semibold text-zinc-400">Baseline DSO</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">Post-Jaktra DSO</th>
                  <th className="py-3 px-4 font-semibold text-white">Average Working Capital Freed</th>
                  <th className="py-3 px-4 font-semibold text-zinc-400">Primary Value Driver</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-zinc-300">
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">B2B SaaS &amp; Cloud</td>
                  <td className="py-3.5 px-4 text-zinc-400">48 Days</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">32 Days (-16d)</td>
                  <td className="py-3.5 px-4 text-white">$438,000 per $10M ARR</td>
                  <td className="py-3.5 px-4 text-zinc-400">Seat overage dispute triage &amp; NRR protection</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Wholesale &amp; Distribution</td>
                  <td className="py-3.5 px-4 text-zinc-400">54 Days</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">38 Days (-16d)</td>
                  <td className="py-3.5 px-4 text-white">$526,000 per $12M GMV</td>
                  <td className="py-3.5 px-4 text-zinc-400">Short-shipment triage &amp; margin preservation</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Logistics &amp; Freight 3PLs</td>
                  <td className="py-3.5 px-4 text-zinc-400">58 Days</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">41 Days (-17d)</td>
                  <td className="py-3.5 px-4 text-white">$698,000 per $15M Rev</td>
                  <td className="py-3.5 px-4 text-zinc-400">Detention dispute handling &amp; factoring exit</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Staffing &amp; Recruiting</td>
                  <td className="py-3.5 px-4 text-zinc-400">55 Days</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">37 Days (-18d)</td>
                  <td className="py-3.5 px-4 text-white">$493,000 per $10M Rev</td>
                  <td className="py-3.5 px-4 text-zinc-400">Timesheet dispute triage &amp; payroll financing exit</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Commercial Construction</td>
                  <td className="py-3.5 px-4 text-zinc-400">72 Days</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">51 Days (-21d)</td>
                  <td className="py-3.5 px-4 text-white">$863,000 per $15M Rev</td>
                  <td className="py-3.5 px-4 text-zinc-400">Progress billing &amp; retainage milestone tracking</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Frequently Asked Questions About AR Automation ROI
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Key financial questions answered for CFOs, controllers, and finance executives.
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
              Ready to Turn Trapped Receivables Into Working Capital?
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base mb-8">
              Start recovering overdue receivables today with Jaktra. Set up in 15 minutes with zero long-term commitments and full ROI visibility.
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
                Explore Free Early Access
              </Link>
            </div>
            <p className="text-xs text-zinc-500 mt-4">
              No credit card required • 15-minute setup • AES-256 bank-grade encryption
            </p>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
