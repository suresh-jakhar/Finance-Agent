import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Calculator,
  Mail,
  TrendingDown,
  ArrowRight,
  Clock,
  CheckCircle2,
  Layers,
  Scale,
  Compass,
  Search,
} from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { resourcesHubSchema, breadcrumbSchema } from "../components/common/seo-schemas";
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
          <Link to="/use-cases" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Use Cases
          </Link>
          <Link to="/compare" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Compare
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

interface ResourceItem {
  id: string;
  category: "guide" | "calculator" | "playbook" | "templates";
  badge: string;
  readTime: string;
  title: string;
  tagline: string;
  description: string;
  link: string;
  icon: typeof BookOpen;
  keyTakeaways: string[];
  isFeatured?: boolean;
}

const RESOURCES: ResourceItem[] = [
  {
    id: "how-to-reduce-dso",
    category: "guide",
    badge: "Financial Guide",
    readTime: "12 min read",
    title: "How to Reduce Days Sales Outstanding (DSO): Countback Math & 5 Levers",
    tagline: "The definitive guide for CFOs and Controllers on calculating DSO and cutting 15–25 days of cash lag.",
    description:
      "Explains why the traditional Average DSO formula is deeply flawed for seasonal businesses and demonstrates the Countback (Exhaustive) calculation method step-by-step. Outlines 5 concrete operational levers to unlock working capital.",
    link: "/resources/how-to-reduce-dso",
    icon: TrendingDown,
    isFeatured: true,
    keyTakeaways: [
      "Countback DSO mathematical formula vs simple standard averaging",
      "Benchmarking DSO variances across B2B SaaS, manufacturing, and staffing",
      "5 actionable levers to shorten the cash conversion cycle without damaging client trust",
    ],
  },
  {
    id: "5-stage-ar-tone-escalation",
    category: "playbook",
    badge: "Operational Playbook",
    readTime: "9 min read",
    title: "The 5-Stage AR Tone Escalation Playbook",
    tagline: "How to design collection cadences that recover 85%+ of overdue invoices without alienating buyers.",
    description:
      "A complete guide on mapping dunning outreach across 5 psychological stages: Friendly Reminder (1–7d) to Legal Hold (31+d). Includes cadence timing intervals, subject line formulas, and compliance safeguards.",
    link: "/resources/5-stage-ar-tone-escalation",
    icon: Compass,
    isFeatured: true,
    keyTakeaways: [
      "The psychological escalation curve from gentle nudges to formal notices",
      "Balancing proactive early engagement with strict Stage 5 compliance halts",
      "Eliminating collector burnout by automating repetitive follow-up tasks",
    ],
  },
  {
    id: "ar-automation-roi-calculator",
    category: "calculator",
    badge: "Interactive Model",
    readTime: "Interactive Tool",
    title: "B2B AR Automation ROI & Working Capital Release Calculator",
    tagline: "Calculate your exact working capital release, debt interest saved, and 3-year net automation ROI.",
    description:
      "An interactive mathematical simulator that models your company's revenue, current DSO, debt cost of capital, and invoice volume to project freed cash, interest savings, and net ROI from deploying Jaktra.",
    link: "/resources/ar-automation-roi-calculator",
    icon: Calculator,
    isFeatured: true,
    keyTakeaways: [
      "Real-time working capital release formula: (Revenue / 365) × DSO Reduction",
      "Short-term borrowing interest savings based on benchmark rates",
      "Estimated labor hours saved weekly for credit controllers and AR managers",
    ],
  },
  {
    id: "b2b-dunning-email-templates",
    category: "templates",
    badge: "Ready-to-Use Scripts",
    readTime: "10 min read",
    title: "B2B Dunning Email Templates: 10 Battle-Tested AR Scripts",
    tagline: "Copy-paste collection email scripts across 5 escalation tiers with AI prompt directives.",
    description:
      "10+ field-tested B2B email templates engineered to balance commercial goodwill with urgency. Includes prompt engineering parameters for Groq LLaMA 3.1 to generate dynamic, contextual variations automatically.",
    link: "/resources/b2b-dunning-email-templates",
    icon: Mail,
    isFeatured: false,
    keyTakeaways: [
      "2 vetted templates per escalation stage with dynamic placeholder syntax",
      "Prompt engineering guidelines for courteous AI tone moderation",
      "Clear call-to-action phrasing that drives debtors to self-service payment links",
    ],
  },
];

export function ResourcesHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredResources = useMemo(() => {
    return RESOURCES.filter((r) => {
      if (selectedCategory !== "all" && r.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = r.title.toLowerCase().includes(q);
        const matchesTagline = r.tagline.toLowerCase().includes(q);
        const matchesDesc = r.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesTagline && !matchesDesc) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const featuredResources = useMemo(() => {
    return RESOURCES.filter((r) => r.isFeatured);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#f5f5f5] font-sans selection:bg-[#b7d2f8]/20 selection:text-white antialiased">
      <SEOHead
        title="B2B Accounts Receivable Guides, Tools & Research — Jaktra"
        description="Free, research-backed guides, financial models, and operational playbooks for CFOs, Controllers, and AR teams to accelerate cash flow and reduce DSO."
        canonicalPath="/resources"
        jsonLd={[
          resourcesHubSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
          ]),
        ]}
      />

      <HeaderNav />

      <main className="pt-28 sm:pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-zinc-400">
            <li>
              <Link to="/" className="hover:text-zinc-200 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-zinc-600">/</li>
            <li className="text-zinc-200 font-medium" aria-current="page">
              Resources & Knowledge Hub
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#b7d2f8]/10 text-[#b7d2f8] border border-[#b7d2f8]/20 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Accounts Receivable Knowledge & Playbooks</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 max-w-3xl leading-tight">
            Accounts Receivable Knowledge & Operational Playbooks
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed">
            Free, mathematically rigorous guides, email scripts, and interactive calculators to help finance teams shorten payment cycles, cut bad debt, and protect customer goodwill.
          </p>
        </section>

        {/* Featured Top Resources Shelf */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Featured Executive Resources
            </h2>
            <span className="text-xs text-zinc-500">Essential reading for finance leaders</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredResources.map((res) => {
              const Icon = res.icon;
              return (
                <div
                  key={`featured-${res.id}`}
                  className="flex flex-col justify-between p-6 rounded-2xl bg-[#111113] border border-white/[0.08] hover:border-white/[0.18] hover:bg-[#161619] transition-all duration-200 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                        {res.badge}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {res.readTime}
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#b7d2f8] transition-colors leading-snug">
                      {res.title}
                    </h3>

                    <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                      {res.tagline}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <Icon className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Free Resource</span>
                    </div>
                    <Link
                      to={res.link}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-[#b7d2f8] transition-colors"
                    >
                      Open Resource <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Directory Section */}
        <section className="mb-20">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
              All Financial Guides & Operational Tools
            </h2>
            <p className="text-sm text-zinc-400">
              Filter by resource format to find actionable templates and calculation frameworks.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                    : "bg-[#111113] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                All Resources ({RESOURCES.length})
              </button>
              <button
                onClick={() => setSelectedCategory("guide")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === "guide"
                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                    : "bg-[#111113] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                Financial Guides
              </button>
              <button
                onClick={() => setSelectedCategory("calculator")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === "calculator"
                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                    : "bg-[#111113] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                Calculators
              </button>
              <button
                onClick={() => setSelectedCategory("playbook")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === "playbook"
                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                    : "bg-[#111113] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                Playbooks
              </button>
              <button
                onClick={() => setSelectedCategory("templates")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === "templates"
                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                    : "bg-[#111113] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                Email Templates
              </button>
            </div>

            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics..."
                className="w-full bg-[#111113] border border-white/[0.08] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredResources.map((res) => {
              const Icon = res.icon;
              return (
                <div
                  key={res.id}
                  className="flex flex-col justify-between p-6 rounded-2xl bg-[#111113] border border-white/[0.08] hover:border-white/[0.18] hover:bg-[#161619] transition-all duration-200 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                        {res.badge}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {res.readTime}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#b7d2f8] transition-colors leading-snug">
                      {res.title}
                    </h3>
                    <p className="text-xs font-medium text-zinc-400 mb-3">{res.tagline}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-5">
                      {res.description}
                    </p>

                    <div className="space-y-2 mb-6 pt-3 border-t border-white/[0.04]">
                      <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                        Key Takeaways:
                      </p>
                      {res.keyTakeaways.map((k, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#b7d2f8] shrink-0 mt-0.5" />
                          <span className="leading-snug">{k}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <Icon className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Free Resource</span>
                    </div>
                    <Link
                      to={res.link}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-[#b7d2f8] transition-colors"
                    >
                      Open Resource <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-[#111113] border border-white/[0.08]">
              <p className="text-zinc-400 text-sm mb-3">No resources match your search.</p>
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

        {/* Cross-Platform Navigation */}
        <section className="py-12 border-t border-white/[0.08]">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Looking for Product Capabilities or Industry Solutions?
            </h2>
            <p className="mt-1 text-zinc-400 text-xs sm:text-sm">
              Explore our core platform directories and software evaluation matrix.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Link
              to="/features"
              className="p-6 rounded-2xl border border-white/[0.08] bg-[#111113] hover:border-white/[0.18] hover:bg-[#161619] transition-all group"
            >
              <div className="p-3 rounded-xl bg-white/[0.04] text-[#b7d2f8] w-fit mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1 group-hover:text-[#b7d2f8] transition-colors">
                Platform Features →
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Explore the core autonomous AR capabilities: 5-stage escalation, dispute triage, zero-login portals, and risk scoring.
              </p>
            </Link>

            <Link
              to="/compare"
              className="p-6 rounded-2xl border border-white/[0.08] bg-[#111113] hover:border-white/[0.18] hover:bg-[#161619] transition-all group"
            >
              <div className="p-3 rounded-xl bg-white/[0.04] text-[#b7d2f8] w-fit mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1 group-hover:text-[#b7d2f8] transition-colors">
                Software Buyer's Guide →
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Objective comparisons of Jaktra vs HighRadius, Upflow, Chaser, PaidNice, and Kolleno with live pricing and savings math.
              </p>
            </Link>

            <Link
              to="/use-cases"
              className="p-6 rounded-2xl border border-white/[0.08] bg-[#111113] hover:border-white/[0.18] hover:bg-[#161619] transition-all group"
            >
              <div className="p-3 rounded-xl bg-white/[0.04] text-[#b7d2f8] w-fit mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1 group-hover:text-[#b7d2f8] transition-colors">
                Industry Solutions →
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                DSO benchmarks and tailored dunning workflows across 8 B2B models: SaaS, agencies, consulting, manufacturing, and freight.
              </p>
            </Link>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

export default ResourcesHub;
