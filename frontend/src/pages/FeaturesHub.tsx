import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  MessageSquareCode,
  CalendarClock,
  KeyRound,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { featuresHubSchema, breadcrumbSchema } from "../components/common/seo-schemas";
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
          <Link to="/use-cases" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Use Cases
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
            className="text-xs sm:text-sm font-medium bg-white text-zinc-950 px-3.5 py-1.5 rounded-md hover:bg-zinc-200 transition-colors shadow-sm"
          >
            Get started free
          </Link>
        </div>
      </div>
    </header>
  );
}

interface FeatureItem {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  link: string;
  icon: typeof Zap;
  techStack: string;
  stats: { label: string; value: string };
  highlights: string[];
}

const CORE_FEATURES: FeatureItem[] = [
  {
    id: "5-stage-escalation",
    badge: "Core AI Engine",
    title: "5-Stage Generative Tone Escalation",
    tagline: "Dynamic LLaMA 3.1 tone escalation that adapts copy from gentle nudges to formal legal notices.",
    description:
      "Replaces static, repetitive dunning templates with generative LLaMA 3.1 8B intelligence. Cadences smoothly transition through 5 stages: Friendly Reminder (1–7d), Firm Notice (8–14d), Serious Demand (15–21d), Stern Executive Notice (22–30d), and Stage 5 Legal Hold (31+d) with strict human approval gates.",
    link: "/features/5-stage-escalation",
    icon: Zap,
    techStack: "Groq LLaMA 3.1 8B + 20-Hour Idempotency Guard",
    stats: { label: "Cash Recovery Acceleration", value: "3.1×" },
    highlights: [
      "Dynamic prompt interpolation referencing debtor's exact balance and aging",
      "Strict 20-hour idempotency guard eliminates debtor spamming",
      "Automatic Stage 5 Legal Stop halts outreach pending human review",
    ],
  },
  {
    id: "dispute-triage",
    badge: "Inbound NLP Intelligence",
    title: "AI Dispute Triage & Reply Sentiment Classification",
    tagline: "Classifies inbound replies instantly, auto-pauses dunning cadences, and drafts verified resolutions.",
    description:
      "When debtors reply with scope disputes, incorrect invoice amounts, or broken deliverables, Jaktra's NLP classifier detects the sentiment, freezes further automated reminders to prevent harassment, and drafts an intelligent response for finance review.",
    link: "/features/dispute-triage",
    icon: MessageSquareCode,
    techStack: "FastAPI + NLP Sentiment Classifier + Human-in-the-Loop",
    stats: { label: "Dispute Triage Time", value: "< 4 min" },
    highlights: [
      "4-way intent classification: dispute, question, promise, or unclear",
      "Immediate cadence pause halts embarrassing automated follow-ups",
      "Suggested reply drafting saves AR teams 10+ hours per week",
    ],
  },
  {
    id: "installment-plans",
    badge: "Structured Recovery",
    title: "Self-Service Installment Payment Plans",
    tagline: "Empower cash-strapped debtors to split large balances into structured, enforceable payment schedules.",
    description:
      "Instead of forcing an insolvent debtor into total delinquency or costly litigation, offer customized installment schedules directly through their secure portal. Automates milestone tracking and payment reconciliation.",
    link: "/features/installment-plans",
    icon: CalendarClock,
    techStack: "PostgreSQL State Engine + Dynamic Payment Schedules",
    stats: { label: "At-Risk Balance Recovery", value: "82%" },
    highlights: [
      "Debtor self-selects weekly or monthly installment milestones",
      "Automatic reminder cadence tied to individual installment due dates",
      "Instant status update when payments clear via webhooks",
    ],
  },
  {
    id: "zero-login-portal",
    badge: "Cryptographic Payments",
    title: "Tokenized Zero-Login Debtor Payment Portal",
    tagline: "Eliminate password drop-off with secure, single-click payment statements at /i/:token.",
    description:
      "Traditional customer portals experience 70%+ drop-off because debtors forget passwords. Jaktra generates cryptographic, time-limited token links (/i/:token) that allow debtors to review invoices, download statements, and settle instantly with zero account setup.",
    link: "/features/zero-login-portal",
    icon: KeyRound,
    techStack: "Cryptographic SHA-256 Tokens + Instant Statement Sync",
    stats: { label: "Portal Adoption Rate", value: "91%" },
    highlights: [
      "Zero account creation or password friction for debtors",
      "Instant Razorpay checkout (Cards, UPI, NetBanking, Virtual Accounts)",
      "Real-time Statement of Account (SOA) and invoice PDF download",
    ],
  },
  {
    id: "email-deliverability",
    badge: "Infrastructure Resilience",
    title: "Dead Letter Queue (DLQ) & Deliverability Circuit Breaker",
    tagline: "Multi-provider email failover with 3-drop circuit breakers that protect your domain reputation.",
    description:
      "Never burn your domain sender score. If SendGrid experiences a hard bounce or rate limit, Jaktra's Dead Letter Queue catches the failure, triggers exponential backoff, fails over to backup providers (Resend, custom SMTP), and trips a circuit breaker after 3 consecutive failures.",
    link: "/features/email-deliverability",
    icon: ShieldCheck,
    techStack: "Dead Letter Queue + SendGrid / Resend / AES-256 SMTP",
    stats: { label: "Delivery Success Rate", value: "99.4%" },
    highlights: [
      "Automatic multi-channel failover across SendGrid, Resend, and SMTP",
      "3-drop circuit breaker automatically blocks faulty debtor emails",
      "AES-256-GCM encryption for all tenant email credentials",
    ],
  },
  {
    id: "risk-scoring",
    badge: "Predictive Analytics",
    title: "Predictive ML Delinquency Risk Scoring",
    tagline: "Stratify accounts receivable risk with real-time ML scoring to prioritize high-risk debt recovery.",
    description:
      "Identifies which debtors are sliding toward default before 60+ days elapse. Combines invoice aging, balance concentration, historical payment velocity, and communication response latency to assign actionable risk tiers (Low, Medium, High, Critical).",
    link: "/features/risk-scoring",
    icon: TrendingUp,
    techStack: "Python ML Scorer + Multi-Variable Delinquency Heuristics",
    stats: { label: "Early Default Detection", value: "24 days" },
    highlights: [
      "Dynamic risk score recalculation upon every payment or communication event",
      "Automated prioritization of high-risk collections in the Agent workspace",
      "Actionable recommendations: prompt installment offer or executive call",
    ],
  },
];

export function FeaturesHub() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredFeatures =
    activeFilter === "all"
      ? CORE_FEATURES
      : CORE_FEATURES.filter((f) =>
          activeFilter === "ai"
            ? f.id === "5-stage-escalation" || f.id === "dispute-triage" || f.id === "risk-scoring"
            : f.id === "zero-login-portal" || f.id === "installment-plans" || f.id === "email-deliverability"
        );

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-blue-500/20">
      <SEOHead
        title="Autonomous AI Accounts Receivable Capabilities & Features — Jaktra"
        description="Explore Jaktra's complete AR execution stack: 5-stage generative tone escalation, automated dispute reply triage, tokenized zero-login debtor portals, Dead Letter Queue resilience, and predictive ML risk scoring."
        canonicalPath="/features"
        jsonLd={[
          featuresHubSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Features", path: "/features" },
          ]),
        ]}
      />

      <HeaderNav />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-mono mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Autonomous AR Architecture
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
            The Autonomous AI Accounts Receivable Execution Stack
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Replace manual dunning, missed debtor replies, and awkward collection calls with a closed-loop, intelligent AR system. Engineered from the ground up for B2B finance teams.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white text-zinc-950 hover:bg-zinc-200 font-medium px-6 py-3 rounded-lg transition-colors shadow-lg"
            >
              Get started free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 bg-zinc-900 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Explore Free Early Access
            </Link>
          </div>

          {/* Quick Filter Buttons */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilter === "all"
                  ? "bg-white text-zinc-950"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              All 6 Capabilities
            </button>
            <button
              onClick={() => setActiveFilter("ai")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilter === "ai"
                  ? "bg-white text-zinc-950"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              AI & Language Intelligence
            </button>
            <button
              onClick={() => setActiveFilter("infra")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilter === "infra"
                  ? "bg-white text-zinc-950"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              Payment & Infrastructure
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="group relative rounded-2xl border border-white/10 bg-zinc-900/40 p-8 hover:border-white/20 hover:bg-zinc-900/70 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                      {feat.badge}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white/5 text-zinc-300 group-hover:text-white group-hover:bg-blue-600/20 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-semibold text-white tracking-tight mb-2">
                    {feat.title}
                  </h2>
                  <p className="text-sm font-medium text-zinc-300 mb-3">{feat.tagline}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">{feat.description}</p>

                  <div className="space-y-2 mb-6">
                    {feat.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-zinc-500">{feat.stats.label}</div>
                    <div className="text-lg font-bold text-white font-mono">{feat.stats.value}</div>
                  </div>
                  <Link
                    to={feat.link}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group-hover:translate-x-1"
                  >
                    Deep-dive architecture
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Closed-Loop System Architecture Section */}
      <section className="py-20 px-6 border-t border-white/5 bg-zinc-950/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-mono mb-4">
              <Cpu className="w-3.5 h-3.5" />
              End-to-End Workflow
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              How Jaktra's 6 Capabilities Work Together
            </h2>
            <p className="mt-3 text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
              Unlike fragmented tools that only send emails, Jaktra links predictive risk scoring, generative dunning, dispute triage, and debtor settlement into one closed loop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-6 rounded-xl border border-white/10 bg-zinc-900/30">
              <div className="text-xs font-mono text-zinc-500 mb-2">Step 01</div>
              <h3 className="text-base font-semibold text-white mb-2">1. Ingestion & Risk Scoring</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Invoices sync via CSV or accounting API. Jaktra's ML scorer computes delinquency probability based on debtor history and aging.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-zinc-900/30">
              <div className="text-xs font-mono text-zinc-500 mb-2">Step 02</div>
              <h3 className="text-base font-semibold text-white mb-2">2. 5-Stage Escalation</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Groq LLaMA 3.1 adapts reminder tone contextually. 20-hour idempotency prevents duplicate outreach across multiple runs.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-zinc-900/30">
              <div className="text-xs font-mono text-zinc-500 mb-2">Step 03</div>
              <h3 className="text-base font-semibold text-white mb-2">3. Tokenized Portal</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Emails link to an instant /i/:token debtor portal. The buyer reviews statements, pays via Razorpay, or sets up an installment plan.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-zinc-900/30">
              <div className="text-xs font-mono text-zinc-500 mb-2">Step 04</div>
              <h3 className="text-base font-semibold text-white mb-2">4. AI Dispute Triage</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                If the debtor replies with an issue, NLP halts outreach immediately and drafts a resolution. Once paid, webhooks close the invoice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Link Category Navigation */}
      <section className="py-16 px-6 border-t border-white/5 bg-[#010102]">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-blue-950/30 via-zinc-900/50 to-zinc-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white tracking-tight mb-2">
                Explore More Solutions & Research
              </h3>
              <p className="text-sm text-zinc-400 max-w-xl">
                Compare Jaktra against alternative AR software, explore our 14 industry use case benchmarks, or calculate your company's working capital release.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/compare"
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm font-medium text-white transition-colors"
              >
                Compare Software →
              </Link>
              <Link
                to="/use-cases"
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm font-medium text-white transition-colors"
              >
                Industry Solutions →
              </Link>
              <Link
                to="/resources"
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm font-medium text-white transition-colors"
              >
                All Resources →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}

export default FeaturesHub;
