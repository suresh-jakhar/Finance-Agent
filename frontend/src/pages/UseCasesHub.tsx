import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Laptop,
  Briefcase,
  Factory,
  HardHat,
  Truck,
  Users,
  Boxes,
  Megaphone,
  CheckCircle2,
  TrendingDown,
  Calculator,
  ChevronDown,
  ShieldCheck,
  Zap,
  CreditCard,
  Search,
} from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { useCasesHubSchema, breadcrumbSchema } from "../components/common/seo-schemas";
import { LandingFooter } from "../components/landing/LandingFooter";

function HeaderNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#0a0a0b]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-decoration-none">
          <img src={jaktraLogo} alt="Jaktra" width={24} height={24} className="h-6 w-6 block" />
          <span className="font-semibold text-white text-lg tracking-tight font-sans">Jaktra</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/pricing" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Pricing
          </Link>
          <Link to="/features" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Features
          </Link>
          <Link to="/compare" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Compare
          </Link>
          <Link to="/resources" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Resources
          </Link>
          <Link
            to="/login"
            className="text-xs sm:text-sm text-zinc-300 hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="text-xs sm:text-sm font-medium bg-white text-zinc-950 px-3.5 py-1.5 rounded-lg hover:bg-zinc-200 transition-colors shadow-sm"
          >
            Get started free
          </Link>
        </div>
      </div>
    </header>
  );
}

interface IndustrySolution {
  id: string;
  name: string;
  url: string;
  category: "saas" | "agencies" | "consulting" | "manufacturing" | "freight" | "wholesale" | "staffing" | "construction";
  categoryLabel: string;
  icon: typeof Laptop;
  typicalDso: number;
  jaktraDso: number;
  collectionChallenge: string;
  howJaktraSolves: string[];
  highlight: string;
  isFeatured?: boolean;
}

const INDUSTRIES: IndustrySolution[] = [
  {
    id: "saas",
    name: "B2B SaaS & Subscription Software",
    url: "/use-cases/saas",
    category: "saas",
    categoryLabel: "SaaS & Software",
    icon: Laptop,
    typicalDso: 52,
    jaktraDso: 34,
    collectionChallenge:
      "Finance teams hesitate to chase overdue renewals or seat true-ups because aggressive dunning creates friction right before contract renewal conversations.",
    howJaktraSolves: [
      "Generates courteous, relationship-first tone escalation (Warm Reminder → Firm Prompt) that never feels aggressive.",
      "Embedded tokenized payment links allow buyers to update expired cards or pay via ACH in one click.",
      "Automatically freezes collection cadences the instant a buyer replies with a billing question.",
    ],
    highlight: "Protects recurring renewals while cutting DSO by 18 days",
    isFeatured: true,
  },
  {
    id: "agencies",
    name: "Digital & Marketing Agencies",
    url: "/use-cases/agencies",
    category: "agencies",
    categoryLabel: "Agencies & Creative",
    icon: Megaphone,
    typicalDso: 62,
    jaktraDso: 38,
    collectionChallenge:
      "Account managers and creative directors hate having awkward payment conversations with clients, so overdue invoices linger while the agency fronts payroll and ad spend.",
    howJaktraSolves: [
      "Acts as an autonomous, professional third-party AR agent so creative leads never have to make awkward collection calls.",
      "Automates scheduled milestone and retainer follow-ups before the 1st of the month.",
      "Provides structured installment options for large project milestones so clients don't ghost when cash is tight.",
    ],
    highlight: "Takes the awkward collection burden completely off account managers",
    isFeatured: true,
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Industrial Suppliers",
    url: "/use-cases/manufacturing",
    category: "manufacturing",
    categoryLabel: "Manufacturing & Industrial",
    icon: Factory,
    typicalDso: 68,
    jaktraDso: 42,
    collectionChallenge:
      "Enterprise buyers routinely push Net-30 terms out to 60–90 days because invoices sit unread in accounts payable queues until someone systematically follows up.",
    howJaktraSolves: [
      "Sends automated proactive courtesy notices before payment due dates to confirm PO matching and AP receipt.",
      "DisputeAgent classifies clerical hold-ups (missing PO, price variance) and pauses emails to resolve issues quickly.",
      "Enables high-value corporate bank transfers and installment plans for capital orders.",
    ],
    highlight: "Compresses Net-60/90 payment cycles by 26 days without manual calls",
    isFeatured: true,
  },
  {
    id: "professional-services",
    name: "Consulting & Professional Services",
    url: "/use-cases/professional-services",
    category: "consulting",
    categoryLabel: "Professional Services",
    icon: Briefcase,
    typicalDso: 59,
    jaktraDso: 36,
    collectionChallenge:
      "Partner billing hours and project retainers get delayed in multi-layer corporate approval chains, while partners avoid pressing clients for payment.",
    howJaktraSolves: [
      "Runs automated, disciplined reminder cadences directly to client AP departments.",
      "Instantly pauses messaging and notifies the engagement partner when a client questions billed hours.",
      "Sends zero-login payment links so clients can approve and settle invoices without friction.",
    ],
    highlight: "Saves senior partners hours of manual billing administrative overhead",
  },
  {
    id: "logistics-freight",
    name: "Logistics, Freight & 3PL",
    url: "/use-cases/logistics-freight",
    category: "freight",
    categoryLabel: "Logistics & Freight",
    icon: Truck,
    typicalDso: 56,
    jaktraDso: 35,
    collectionChallenge:
      "High volumes of freight bills get buried in shipper inboxes, and minor accessorial questions cause payments to stall for months.",
    howJaktraSolves: [
      "Automates high-volume dunning cadences with Dead Letter Queue (DLQ) delivery tracking to prevent emails landing in spam.",
      "Detects rate and detention disputes immediately, alerting dispatchers before debts age.",
      "Offers fast digital settlement options via credit card, ACH, or net banking.",
    ],
    highlight: "Recovers overdue freight receivables without expanding collections headcount",
  },
  {
    id: "wholesale-distribution",
    name: "Wholesale & Trade Distribution",
    url: "/use-cases/wholesale-distribution",
    category: "wholesale",
    categoryLabel: "Wholesale Trade",
    icon: Boxes,
    typicalDso: 58,
    jaktraDso: 37,
    collectionChallenge:
      "Wholesale buyers stretch trade credit and pay only when pressed, while distributors worry that aggressive collections will push buyers to competing vendors.",
    howJaktraSolves: [
      "Maintains systematic 5-stage reminder cadences that preserve customer goodwill through respectful wording.",
      "Enables structured 2x, 3x, or 4x installment schedules when wholesale buyers face temporary cash flow crunches.",
      "Enforces payment deadlines consistently across your entire customer ledger.",
    ],
    highlight: "Prevents trade receivables from aging into bad debt write-offs",
  },
  {
    id: "staffing-recruiting",
    name: "Staffing & Recruitment Agencies",
    url: "/use-cases/staffing-recruiting",
    category: "staffing",
    categoryLabel: "Staffing & Payroll",
    icon: Users,
    typicalDso: 54,
    jaktraDso: 33,
    collectionChallenge:
      "Staffing agencies must fund contractor payroll every single week, while corporate clients take 45–60 days to pay, forcing agencies into expensive invoice factoring loans.",
    howJaktraSolves: [
      "Dispatches automated, timely reminders aligned with weekly payroll intervals.",
      "Flags timesheet and approval delays early so client hiring managers sign off promptly.",
      "Accelerates cash recovery by 21 days, helping agencies avoid high factoring interest fees.",
    ],
    highlight: "Protects weekly contractor payroll cash flow and eliminates factoring costs",
  },
  {
    id: "construction",
    name: "Commercial Subcontractors & Trade Services",
    url: "/use-cases/construction",
    category: "construction",
    categoryLabel: "Commercial Contractors",
    icon: HardHat,
    typicalDso: 83,
    jaktraDso: 49,
    collectionChallenge:
      "Trade contractors and subcontractors face slow-paying general contractors who hold back progress payments until chased repeatedly.",
    howJaktraSolves: [
      "Automates consistent milestone payment reminders with itemized balance summaries.",
      "Provides direct, zero-login payment links so general contractors can pay immediately via bank transfer or card.",
      "Escalates systematically from friendly courtesy notices to firm executive reminders over 45 days.",
    ],
    highlight: "Recovers progress billings 34 days faster with zero phone chasing",
  },
];

const FAQS = [
  {
    q: "How does Jaktra prevent damage to customer and client relationships?",
    a: "Generic dunning software sends repetitive, robotic notices that sound cold and aggressive. Jaktra uses Groq LLaMA 3.1 to generate respectful, relationship-first communications across 5 distinct stages—starting with a gentle courtesy reminder and only escalating if an invoice remains unpaid for weeks. The tone is always professional, polite, and aligned with standard B2B commercial etiquette.",
  },
  {
    q: "What happens when a debtor replies with a question or dispute?",
    a: "If a debtor replies saying 'we already paid this yesterday', 'the billed amount is incorrect', or 'waiting on manager approval', Jaktra's AI DisputeAgent immediately detects the objection. It instantly freezes all automated follow-ups for that invoice so you never embarrass your company by sending reminders during an active conversation, alerts your team, and drafts an AI-suggested reply for your review.",
  },
  {
    q: "Can debtors settle invoices directly without creating an account or logging in?",
    a: "Yes. Every follow-up email includes a secure, tokenized payment link (`/i/:token`). When your client clicks it, they see their invoice details and can settle immediately via Razorpay, credit card, NetBanking, or UPI in 60 seconds without creating a password or logging into an account.",
  },
  {
    q: "How does Jaktra help when a debtor cannot pay the full balance upfront?",
    a: "Demanding 100% immediate payment from a customer facing temporary cash constraints often causes them to ignore messages entirely. Jaktra allows you to offer flexible, structured installment payment plans (2x, 3x, or 4x installments). Debtors can self-select an installment schedule via their payment link, turning default risk into predictable cash inflows.",
  },
  {
    q: "Does Jaktra replace our existing accounting or invoicing software?",
    a: "No. Jaktra does not replace QuickBooks, Xero, Stripe, or your back-office billing systems. Instead, Jaktra connects to your invoices, tracks payment statuses, runs automated follow-up cadences, handles dispute detection, and reconciles payments back to your records automatically.",
  },
];

export default function UseCasesHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [annualRevenue, setAnnualRevenue] = useState<number>(10000000); // $10M
  const [currentDso, setCurrentDso] = useState<number>(58);
  const [targetDso, setTargetDso] = useState<number>(36);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredIndustries = useMemo(() => {
    return INDUSTRIES.filter((ind) => {
      if (selectedCategory !== "all" && ind.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = ind.name.toLowerCase().includes(q);
        const matchesChallenge = ind.collectionChallenge.toLowerCase().includes(q);
        const matchesCategory = ind.categoryLabel.toLowerCase().includes(q);
        if (!matchesName && !matchesChallenge && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const featuredIndustries = useMemo(() => {
    return INDUSTRIES.filter((i) => i.isFeatured);
  }, []);

  // Working Capital Calculations
  const dsoReduction = Math.max(0, currentDso - targetDso);
  const dailySales = annualRevenue / 365;
  const cashUnlocked = Math.round(dailySales * dsoReduction);
  const annualFinancingSaved = Math.round(cashUnlocked * 0.08); // 8% cost of capital

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#f5f5f5] font-sans selection:bg-[#b7d2f8]/20 selection:text-white antialiased">
      <SEOHead
        title="B2B Accounts Receivable Industry Solutions & DSO Benchmarks | Jaktra"
        description="Discover how Jaktra automates B2B accounts receivable across SaaS, agencies, consulting, manufacturing, freight, wholesale, and staffing. Cut DSO by 15–25 days with autonomous 5-stage tone escalation."
        canonicalPath="/use-cases"
        jsonLd={[
          useCasesHubSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industry Solutions", path: "/use-cases" },
          ]),
        ]}
      />

      <HeaderNav />

      <main className="pt-28 sm:pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-zinc-400">
            <li>
              <Link to="/" className="hover:text-zinc-200 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-zinc-600">/</li>
            <li className="text-zinc-200 font-medium" aria-current="page">
              Industry Solutions
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#b7d2f8]/10 text-[#b7d2f8] border border-[#b7d2f8]/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b7d2f8] animate-pulse" />
            <span>Autonomous B2B Accounts Receivable Automation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5 max-w-3xl leading-tight">
            Accounts Receivable Built for Real-World B2B Cash Flow
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed mb-8">
            Every business model faces overdue invoices for different reasons—from fear of hurting client relationships, to complex corporate approval chains, to cash-strapped buyers. Jaktra replaces painful manual follow-ups with intelligent, respectful collection cadences that recover cash faster without annoying your clients.
          </p>

          {/* 4 Core Pillars of Jaktra */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#111113] border border-white/[0.08]">
            <div className="p-3">
              <div className="flex items-center gap-2 mb-1 text-[#b7d2f8]">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Tone Escalation</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                5 progressive stages from gentle reminders to firm notices that preserve customer trust.
              </p>
            </div>

            <div className="p-3">
              <div className="flex items-center gap-2 mb-1 text-[#b7d2f8]">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Dispute Triage</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                AI detects disputes and freezes cadences instantly so you never harass a questioning client.
              </p>
            </div>

            <div className="p-3">
              <div className="flex items-center gap-2 mb-1 text-[#b7d2f8]">
                <CreditCard className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Zero-Login Pay</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                One-click debtor link to pay via Razorpay, UPI, cards, or bank transfer without passwords.
              </p>
            </div>

            <div className="p-3">
              <div className="flex items-center gap-2 mb-1 text-[#b7d2f8]">
                <TrendingDown className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Installment Plans</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Self-serve 2x, 3x, or 4x installments turn default risks into predictable incoming cash.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Top 3 Solutions Shelf */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                Core Industry Playbooks
              </h2>
            </div>
            <span className="text-xs text-zinc-500">Most requested by finance teams</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredIndustries.map((ind) => {
              const Icon = ind.icon;
              return (
                <div
                  key={`featured-${ind.id}`}
                  className="flex flex-col justify-between p-6 rounded-2xl bg-[#111113] border border-white/[0.08] hover:border-white/[0.18] hover:bg-[#161619] transition-all duration-200 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                        {ind.categoryLabel}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#b7d2f8] transition-colors leading-snug">
                      {ind.name}
                    </h3>

                    <p className="text-xs text-zinc-400 leading-relaxed mb-5">
                      {ind.collectionChallenge}
                    </p>

                    <div className="space-y-2 mb-5">
                      {ind.howJaktraSolves.slice(0, 2).map((pt, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#b7d2f8] shrink-0 mt-0.5" />
                          <span className="leading-snug">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between mt-auto">
                    <div className="text-xs font-mono text-zinc-300">
                      <span>{ind.typicalDso}d → {ind.jaktraDso}d</span>
                      <span className="text-zinc-500 ml-1">(-{ind.typicalDso - ind.jaktraDso}d DSO)</span>
                    </div>
                    <Link
                      to={ind.url}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-[#b7d2f8] transition-colors"
                    >
                      Read Playbook <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Directory Section: Clean Category Filters & Balanced Cards Grid */}
        <section className="mb-20">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
              All Industry Solutions Directory
            </h2>
            <p className="text-sm text-zinc-400">
              Select your business model to see how Jaktra tailors automated follow-up cadences to your customer relationships.
            </p>
          </div>

          {/* Clean Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                    : "bg-[#111113] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                All Businesses ({INDUSTRIES.length})
              </button>
              <button
                onClick={() => setSelectedCategory("saas")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === "saas"
                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                    : "bg-[#111113] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                SaaS & Software
              </button>
              <button
                onClick={() => setSelectedCategory("agencies")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === "agencies"
                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                    : "bg-[#111113] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                Agencies & Creative
              </button>
              <button
                onClick={() => setSelectedCategory("consulting")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === "consulting"
                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                    : "bg-[#111113] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                Consulting
              </button>
              <button
                onClick={() => setSelectedCategory("manufacturing")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === "manufacturing"
                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                    : "bg-[#111113] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                Manufacturing
              </button>
              <button
                onClick={() => setSelectedCategory("freight")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === "freight"
                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                    : "bg-[#111113] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                Freight & 3PL
              </button>
              <button
                onClick={() => setSelectedCategory("wholesale")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === "wholesale"
                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                    : "bg-[#111113] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                Wholesale
              </button>
              <button
                onClick={() => setSelectedCategory("staffing")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === "staffing"
                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                    : "bg-[#111113] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                Staffing
              </button>
              <button
                onClick={() => setSelectedCategory("construction")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === "construction"
                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                    : "bg-[#111113] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                Contractors
              </button>
            </div>

            {/* Keyword Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search solutions..."
                className="w-full bg-[#111113] border border-white/[0.08] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredIndustries.map((ind) => {
              const Icon = ind.icon;
              return (
                <div
                  key={ind.id}
                  className="flex flex-col justify-between p-6 rounded-2xl bg-[#111113] border border-white/[0.08] hover:border-white/[0.18] hover:bg-[#161619] transition-all duration-200 group"
                >
                  <div>
                    {/* Header: Category Badge & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                        {ind.categoryLabel}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#b7d2f8] transition-colors">
                      {ind.name}
                    </h3>

                    {/* The Collection Challenge */}
                    <div className="mb-4">
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        <strong className="text-zinc-300 font-medium">The Challenge: </strong>
                        {ind.collectionChallenge}
                      </p>
                    </div>

                    {/* How Jaktra Solves It */}
                    <div className="space-y-2 mb-6 pt-3 border-t border-white/[0.04]">
                      <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                        How Jaktra Solves It:
                      </p>
                      {ind.howJaktraSolves.map((pt, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#b7d2f8] shrink-0 mt-0.5" />
                          <span className="leading-snug">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: DSO Benchmark & Dedicated Link */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between mt-auto">
                    <div className="text-xs font-mono text-zinc-300">
                      <span>{ind.typicalDso}d → {ind.jaktraDso}d</span>
                      <span className="text-zinc-500 ml-1">(-{ind.typicalDso - ind.jaktraDso}d DSO)</span>
                    </div>
                    <Link
                      to={ind.url}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-[#b7d2f8] transition-colors"
                    >
                      Read Playbook <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredIndustries.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-[#111113] border border-white/[0.08]">
              <p className="text-zinc-400 text-sm mb-3">No industry playbooks match your search query.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-lg bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* Interactive Working Capital & DSO Unlock Calculator */}
        <section className="mb-20 p-6 sm:p-8 rounded-2xl bg-[#111113] border border-white/[0.08]">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#b7d2f8]/10 text-[#b7d2f8] border border-[#b7d2f8]/20 mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>Working Capital Model</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Calculate Cash Released by Compressing Your DSO
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Every day invoices sit unpaid in accounts receivable represents cash trapped on your balance sheet. See how much working capital an automated collections agent releases:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                    Annual Gross Credit Sales
                  </label>
                  <span className="text-sm font-mono font-bold text-white">
                    ${(annualRevenue / 1000000).toFixed(1)}M USD
                  </span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={50000000}
                  step={500000}
                  value={annualRevenue}
                  onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                  className="w-full accent-[#b7d2f8] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1 font-mono">
                  <span>$1M</span>
                  <span>$25M</span>
                  <span>$50M</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Current Baseline DSO
                    </label>
                    <span className="text-sm font-mono font-bold text-zinc-300">
                      {currentDso} days
                    </span>
                  </div>
                  <input
                    type="range"
                    min={35}
                    max={90}
                    step={1}
                    value={currentDso}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCurrentDso(val);
                      if (val <= targetDso) setTargetDso(Math.max(20, val - 10));
                    }}
                    className="w-full accent-zinc-400 cursor-pointer"
                  />
                  <span className="text-[11px] text-zinc-500 mt-1 block">Your current collection velocity</span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Target Jaktra DSO
                    </label>
                    <span className="text-sm font-mono font-bold text-[#b7d2f8]">
                      {targetDso} days
                    </span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={Math.max(25, currentDso - 5)}
                    step={1}
                    value={targetDso}
                    onChange={(e) => setTargetDso(Number(e.target.value))}
                    className="w-full accent-[#b7d2f8] cursor-pointer"
                  />
                  <span className="text-[11px] text-zinc-500 mt-1 block">With autonomous AI cadences</span>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-5 bg-[#0a0a0b] rounded-xl p-6 border border-white/[0.08] space-y-4">
              <div>
                <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-1">
                  Immediate Working Capital Released
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                  ${cashUnlocked.toLocaleString()}
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Cash pulled forward from overdue receivables back into your operational accounts.
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] text-zinc-400 uppercase font-semibold">
                    Financing Saved
                  </div>
                  <div className="text-base font-bold text-white mt-0.5 font-mono">
                    ${annualFinancingSaved.toLocaleString()}/yr
                  </div>
                  <span className="text-[10px] text-zinc-500">At 8% cost of capital</span>
                </div>
                <div>
                  <div className="text-[11px] text-zinc-400 uppercase font-semibold">
                    Hours Reclaimed
                  </div>
                  <div className="text-base font-bold text-white mt-0.5 font-mono">
                    ~38 hrs/mo
                  </div>
                  <span className="text-[10px] text-zinc-500">Saved on manual follow-ups</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/register"
                  className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  Unlock This Working Capital Free <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-Industry DSO Benchmark Table */}
        <section className="mb-20">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              B2B Industry DSO Benchmarks & Collection Realities
            </h2>
            <p className="text-sm text-zinc-400 max-w-3xl">
              Compare your team's collection cycle times against industry baselines and evaluate the impact of automated, dispute-aware AI cadences:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#111113]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                  <th className="p-4 text-zinc-300 font-semibold">Industry Business Model</th>
                  <th className="p-4 text-zinc-300 font-semibold">Baseline DSO</th>
                  <th className="p-4 text-zinc-300 font-semibold">Jaktra Target DSO</th>
                  <th className="p-4 text-zinc-300 font-semibold">Primary Collection Challenge</th>
                  <th className="p-4 text-zinc-300 font-semibold">Dedicated Guide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {INDUSTRIES.map((ind) => (
                  <tr key={`benchmark-${ind.id}`} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-medium text-white flex items-center gap-2">
                      <ind.icon className="w-4 h-4 text-[#b7d2f8] shrink-0" />
                      {ind.name}
                    </td>
                    <td className="p-4 text-zinc-400 font-mono font-medium">{ind.typicalDso} days</td>
                    <td className="p-4 text-white font-mono font-medium">
                      {ind.jaktraDso} days <span className="text-zinc-500">(-{ind.typicalDso - ind.jaktraDso}d)</span>
                    </td>
                    <td className="p-4 text-zinc-400 max-w-xs leading-relaxed">{ind.collectionChallenge}</td>
                    <td className="p-4">
                      <Link
                        to={ind.url}
                        className="text-[#b7d2f8] hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
                      >
                        Read playbook <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-zinc-400">
              Clear answers on how Jaktra automates collections while protecting buyer relationships:
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-white/[0.08] bg-[#111113] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-[#b7d2f8] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-white" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/[0.04] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="p-8 sm:p-12 rounded-2xl bg-[#111113] border border-white/[0.08] text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Accelerate Your Accounts Receivable?
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-6 leading-relaxed">
            Connect QuickBooks, Xero, or Stripe in under 15 minutes. 100% free during Early Access with zero credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-colors shadow-sm"
            >
              Get started free
            </Link>
            <Link
              to="/compare"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white font-medium text-sm hover:bg-white/[0.08] transition-colors"
            >
              Explore Software Comparison Guide
            </Link>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
