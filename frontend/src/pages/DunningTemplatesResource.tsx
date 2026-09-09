import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Mail, Copy, Check, Sparkles, ShieldAlert, Clock, CheckCircle2, Sliders, ExternalLink } from "lucide-react";
import jaktraLogo from "../assets/jaktra_svg.svg";
import { SEOHead } from "../components/common/SEOHead";
import { dunningTemplatesSchema, breadcrumbSchema } from "../components/common/seo-schemas";

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

interface TemplateItem {
  id: string;
  stageNum: number;
  stageName: string;
  timing: string;
  tone: string;
  badgeColor: string;
  title: string;
  subject: string;
  rawBody: string;
  aiPromptDirective: string;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: "stage-1-courtesy",
    stageNum: 1,
    stageName: "Pre-Due & Due Date Courtesy",
    timing: "3 Days Before Due Date → Due Date",
    tone: "Polite, Helpful, Service-Oriented",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    title: "1. Advance Courtesy & Invoice Verification",
    subject: "Upcoming: Invoice #{invoiceNumber} for {companyName} due on {dueDate}",
    rawBody: `Hi {recipientName},

Hope you’re having a productive week.

This is a quick courtesy note to confirm that Invoice #{invoiceNumber} for {amount} is scheduled for payment on {dueDate}.

We’ve attached a copy of the invoice for your records. You can also view line-item details or pay instantly via our secure one-click portal:
{paymentLink}

If you require any supplemental billing documentation, vendor tax forms, or PO verification, please let us know by replying directly to this email.

Best regards,
Finance & Accounts Receivable Team
{senderCompany}`,
    aiPromptDirective: `Act as a helpful accounts receivable assistant for {senderCompany}. The invoice #{invoiceNumber} ($ {amount}) is coming due in 3 days. Write a collaborative, courteous reminder. Emphasize verification of line items and PO information. Provide a direct one-click settlement link. Assume total good faith.`,
  },
  {
    id: "stage-1-ap-checkin",
    stageNum: 1,
    stageName: "Pre-Due & Due Date Courtesy",
    timing: "Due Date (Day 0)",
    tone: "Friendly Administrative Sync",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    title: "2. Due Date Accounts Payable Check-In",
    subject: "Invoice #{invoiceNumber} is due today — {senderCompany}",
    rawBody: `Hi {recipientName},

We’re reaching out regarding Invoice #{invoiceNumber} ({amount}), which is due today, {dueDate}.

If payment is already scheduled in your weekly AP run, please disregard this note! Otherwise, your accounts team can review and settle in seconds using our zero-login portal:
{paymentLink}

Thank you for your ongoing partnership.

Warm regards,
{senderCompany} Accounting`,
    aiPromptDirective: `Draft a cheerful, zero-friction due date reminder for invoice #{invoiceNumber}. Acknowledge that the payment might already be queued in their weekly payment run. Include the zero-login portal link.`,
  },
  {
    id: "stage-2-polite-reminder",
    stageNum: 2,
    stageName: "Warm Reminder",
    timing: "Days 1–7 Overdue",
    tone: "Collaborative, Assumes Accidental Oversight",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    title: "3. Friendly Post-Due Reminder",
    subject: "Gentle reminder: Invoice #{invoiceNumber} past due ({companyName})",
    rawBody: `Hi {recipientName},

We hope you're having a great week!

We noticed that we haven’t yet received payment for Invoice #{invoiceNumber} ({amount}), which was due on {dueDate}. We know how fast inboxes fill up, so we wanted to bring this to the top of your stack.

You can view the invoice details and complete payment directly here:
{paymentLink}

If payment has already been sent, or if you have any questions about this statement, please reply to let us know so we can update our records.

Best,
Accounts Receivable
{senderCompany}`,
    aiPromptDirective: `Compose a stage 2 reminder for an invoice that is 4 days overdue. Assume accidental oversight or an inbox backlog. Maintain a supportive commercial relationship while clearly highlighting the amount due and one-click payment URL.`,
  },
  {
    id: "stage-2-missing-details",
    stageNum: 2,
    stageName: "Warm Reminder",
    timing: "Days 4–7 Overdue",
    tone: "Helpful Inquiry & Troubleshooting",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    title: "4. AP Troubleshooting & Resend",
    subject: "Quick check-in regarding Invoice #{invoiceNumber} — {companyName}",
    rawBody: `Hi {recipientName},

Following up on our earlier note regarding Invoice #{invoiceNumber} ({amount}) due on {dueDate}.

Sometimes invoices get misrouted or stuck in internal approval queues. Does your team have everything required to approve this payment, or would it help to speak with our accounting team?

Instant payment link:
{paymentLink}

Thank you for helping us keep our accounts reconciled!

Warm regards,
{senderCompany} AR Team`,
    aiPromptDirective: `Inquire proactively whether an internal approval bottleneck or missing paperwork is delaying payment. Keep tone warm and cooperative. Provide payment portal link.`,
  },
  {
    id: "stage-3-firm-notice",
    stageNum: 3,
    stageName: "Firm Notice",
    timing: "Days 8–14 Overdue",
    tone: "Direct, Professional, Action-Oriented",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    title: "5. Structured Overdue Follow-Up",
    subject: "Overdue Notice: Invoice #{invoiceNumber} ({amount}) — Action Required",
    rawBody: `Dear {recipientName},

Our records indicate that Invoice #{invoiceNumber} for {amount} is now past due by more than one week (original due date: {dueDate}).

We have not received payment or a status update regarding this balance. Timely settlement ensures uninterrupted service and helps us maintain our current pricing commitments.

Please submit payment today using our secure portal:
{paymentLink}

If there is a billing discrepancy, or if payment was remitted under a different reference, please reply immediately so we can pause follow-ups and investigate.

Sincerely,
Credit & Collections Desk
{senderCompany}`,
    aiPromptDirective: `Draft a Stage 3 firm collection email. The invoice is 10 days overdue. Shift from casual check-in to clear, direct administrative accountability. Mention that uninterrupted service relies on timely settlement. Provide immediate digital settlement link and invite dispute explanation.`,
  },
  {
    id: "stage-3-payment-plan",
    stageNum: 3,
    stageName: "Firm Notice",
    timing: "Days 10–14 Overdue",
    tone: "Flexible & Solution-Oriented",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    title: "6. Proactive Installment Plan Split Offer",
    subject: "Payment options for Invoice #{invoiceNumber} — {companyName}",
    rawBody: `Dear {recipientName},

We are reaching out regarding Invoice #{invoiceNumber} ({amount}), which is now overdue.

We value your partnership and understand that cash flow timing can occasionally present temporary challenges. If settling this full balance in one payment is currently difficult, we are pleased to offer a structured installment plan:

You can split this balance into 2, 3, or 4 automated milestone payments directly in your portal:
{paymentLink}

Selecting an installment plan keeps your account in full standing and pauses collection escalation. Please review your portal today to choose a schedule that works for your team.

Best regards,
Finance Management
{senderCompany}`,
    aiPromptDirective: `The debtor is 12 days overdue and has not paid. Offer a structured installment plan (2x, 3x, or 4x splits) via the tokenized debtor portal. Frame this as a cooperative working capital accommodation that maintains account goodwill.`,
  },
  {
    id: "stage-4-urgent",
    stageNum: 4,
    stageName: "Urgent Escalation",
    timing: "Days 15–30 Overdue",
    tone: "Urgent, Authoritative, Service Suspension Warning",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    title: "7. Urgent Warning: Impending Service Suspension",
    subject: "URGENT: Outstanding balance on Invoice #{invoiceNumber} — Risk of account hold",
    rawBody: `Dear {recipientName},

This is an urgent communication regarding overdue Invoice #{invoiceNumber} in the amount of {amount}, now {daysOverdue} days past due.

Despite multiple previous notices, your account remains delinquent. As a result, your account has been placed on our finance escalation list and may be subject to a service pause within 3 business days if balance is not cleared.

To avoid suspension of your account services or credit terms, please settle this invoice immediately:
{paymentLink}

If you are experiencing extenuating circumstances or require finance management review, contact us today at billing@{senderCompanyLower}.com.

Regards,
Financial Controller & Operations
{senderCompany}`,
    aiPromptDirective: `Draft a Stage 4 urgent escalation email for an invoice that is 20 days overdue. Clearly state that continued delinquency risks service suspension within 3 business days. Tone must be authoritative, grave, and unambiguous while remaining professional. Provide direct portal link.`,
  },
  {
    id: "stage-4-cfo-escalation",
    stageNum: 4,
    stageName: "Urgent Escalation",
    timing: "Days 22–30 Overdue",
    tone: "Executive / Leadership Notice",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    title: "8. Executive Office Escalation Notice",
    subject: "Notice of Impending Credit Hold: {companyName} — Invoice #{invoiceNumber}",
    rawBody: `Dear {recipientName},

Your account has been escalated to senior financial management regarding unpaid Invoice #{invoiceNumber} ({amount}), which is now over three weeks delinquent.

We have made multiple attempts to resolve this balance amicably. Continued non-payment impacts our ability to provide active services and maintain open credit terms for your organization.

Please arrange immediate settlement via our payment portal:
{paymentLink}

Should payment not be received by Friday at 5:00 PM, we will be forced to pause account deliverables and initiate formal recovery procedures.

Yours faithfully,
Office of the CFO
{senderCompany}`,
    aiPromptDirective: `Write an executive escalation letter from the Office of the CFO. The invoice is 25 days past due. Clearly state that formal credit hold and recovery procedures will be initiated unless settled by the end of the week.`,
  },
  {
    id: "stage-5-final-demand",
    stageNum: 5,
    stageName: "Final Demand / Legal Stop",
    timing: "Day 31+ Overdue",
    tone: "Formal, Legalistic, Final Opportunity",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
    title: "9. Final Demand Notice Before External Collection",
    subject: "FINAL NOTICE: Invoice #{invoiceNumber} — Immediate settlement required",
    rawBody: `FORMAL NOTICE OF DEFAULT

Dear {recipientName},

RE: INVOICE #{invoiceNumber} | OUTSTANDING BALANCE: {amount} | ORIGINAL DUE DATE: {dueDate}

This letter serves as our final formal demand for payment of the aforementioned outstanding invoice. Your balance is now severely overdue, and prior correspondence has gone unanswered.

Unless full payment of {amount} is received within five (5) business days of this notice, we will escalate this matter to our external collections counsel and credit bureau reporting agencies without further notification.

You may satisfy this obligation immediately via secure digital payment:
{paymentLink}

Please treat this notice with the urgency it requires.

Sincerely,
Legal & Financial Recovery Department
{senderCompany}`,
    aiPromptDirective: `Stage 5 Final Formal Demand letter for invoice #{invoiceNumber} ($ {amount}). State clearly that this is the final opportunity to resolve the account before legal transfer. (Note: In Jaktra, automated outbound messages halt at Stage 5 to enforce compliance review).`,
  },
  {
    id: "stage-5-legal-counsel",
    stageNum: 5,
    stageName: "Final Demand / Legal Stop",
    timing: "Day 35+ Overdue",
    tone: "Pre-Litigation Statutory Warning",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
    title: "10. Pre-Litigation Advisory Notice",
    subject: "PRE-LITIGATION NOTICE: Delinquent Account {companyName} — #{invoiceNumber}",
    rawBody: `PRE-LITIGATION NOTICE

To: {recipientName}
Company: {companyName}
Invoice: #{invoiceNumber}
Principal Balance: {amount}

Take notice that {companyName} has defaulted on payment obligations for services rendered under Invoice #{invoiceNumber}.

This file has been queued for immediate transfer to third-party recovery counsel. Continued default may result in legal proceedings to recover the principal balance plus statutory late payment interest and applicable legal costs.

To prevent formal legal filing, clear the balance immediately via our portal:
{paymentLink}

All further communications regarding this account must be in writing.

Recovery Operations
{senderCompany}`,
    aiPromptDirective: `Formal pre-litigation notice informing the debtor that the file is queued for third-party legal recovery unless settled immediately. Written in strict compliance with commercial debt collection standards.`,
  },
];

const FAQS = [
  {
    q: "Why do static dunning email templates stop working over time?",
    a: "Static email templates suffer from 'template blindness' and spam filter degradation. When a debtor receives three identical or boilerplate dunning emails with the exact same phrasing, they tune it out or mark it as junk. Modern email filters (Google Workspace, Microsoft 365) detect repetitive templated emails and divert them to the spam or promotional folder. Jaktra solves this by utilizing Groq LLaMA 3.1 inference to dynamically generate unique, context-aware emails tailored to aging, amount, and prior responsiveness.",
  },
  {
    q: "What is the optimal cadence frequency for B2B collection emails?",
    a: "The most effective B2B cadence follows an exponential timeline: a courtesy notice at Day -3, a reminder on Day 1, followed by touches on Day 7, Day 14, Day 21, and Day 30. Blasting emails every 2 days damages client goodwill and triggers mailer spam flags. Jaktra enforces an automated 20-Hour Idempotency Guard to guarantee no debtor receives multiple touches in less than 20 hours.",
  },
  {
    q: "What is the Stage 5 Legal Stop in accounts receivable automation?",
    a: "Once an invoice reaches 31+ days overdue (Stage 5), continuing to send automated generative AI follow-ups poses compliance risks under debt collection regulations and damages legal enforceability. Jaktra's Stage 5 Legal Stop automatically freezes automated communication, locks the audit trail, and escalates the file to human finance leadership for manual legal counsel review.",
  },
  {
    q: "Should I include a payment link directly in every dunning email?",
    a: "Yes, absolutely. Forcing a debtor to log in to an enterprise portal with a forgotten password or manually look up bank account wiring details adds immense friction. Jaktra embeds cryptographic, zero-login payment links (/i/:token) that allow debtors to view their invoice statement and pay instantly via Razorpay (UPI, NetBanking, Cards, or Virtual Bank Accounts) with zero login credentials required.",
  },
  {
    q: "How does Jaktra handle inbound replies to these dunning emails?",
    a: "Unlike static template tools that ignore incoming replies, Jaktra's DisputeAgent (ai-service/src/agents/dispute_agent.py) parses inbound debtor emails using NLP sentiment classification. If a client replies stating that goods were damaged or that an invoice line item was incorrect, Jaktra immediately tags the invoice as 'dispute', halts all automated dunning cadences, and alerts the finance team with a pre-drafted resolution response.",
  },
];

export default function DunningTemplatesResource() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem>(TEMPLATES[0]);
  const [activeTab, setActiveTab] = useState<"template" | "aiPrompt">("template");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Customizer inputs
  const [recipientName, setRecipientName] = useState("Alex Morgan");
  const [companyName, setCompanyName] = useState("Vanguard Tech");
  const [invoiceNumber, setInvoiceNumber] = useState("INV-4092");
  const [amount, setAmount] = useState("$6,450.00");
  const [dueDate, setDueDate] = useState("October 15, 2026");
  const [senderCompany, setSenderCompany] = useState("Nexus Cloud");

  const resolvedSubject = selectedTemplate.subject
    .replace(/{invoiceNumber}/g, invoiceNumber)
    .replace(/{companyName}/g, companyName)
    .replace(/{dueDate}/g, dueDate)
    .replace(/{amount}/g, amount)
    .replace(/{recipientName}/g, recipientName)
    .replace(/{senderCompany}/g, senderCompany);

  const resolvedBody = selectedTemplate.rawBody
    .replace(/{invoiceNumber}/g, invoiceNumber)
    .replace(/{companyName}/g, companyName)
    .replace(/{dueDate}/g, dueDate)
    .replace(/{amount}/g, amount)
    .replace(/{recipientName}/g, recipientName)
    .replace(/{senderCompany}/g, senderCompany)
    .replace(/{senderCompanyLower}/g, senderCompany.toLowerCase().replace(/\s+/g, ""))
    .replace(/{paymentLink}/g, "https://jaktra.site/i/demo-token-xyz")
    .replace(/{daysOverdue}/g, "21");

  const resolvedAiPrompt = selectedTemplate.aiPromptDirective
    .replace(/{invoiceNumber}/g, invoiceNumber)
    .replace(/{amount}/g, amount)
    .replace(/{senderCompany}/g, senderCompany);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#010102] text-zinc-100 font-sans selection:bg-white selection:text-black">
      <SEOHead
        title="B2B Dunning Email Templates: 10 Battle-Tested AR Follow-Up Scripts | Jaktra"
        description="10+ battle-tested B2B dunning email templates across 5 escalation tiers. Explore copy-paste templates alongside Groq LLaMA 3.1 AI prompt directives and compliance safeguards."
        canonicalPath="/resources/b2b-dunning-email-templates"
        jsonLd={[
          dunningTemplatesSchema,
          breadcrumbSchema([
            { name: "Resources", path: "/resources/how-to-reduce-dso" },
            { name: "B2B Dunning Templates", path: "/resources/b2b-dunning-email-templates" },
          ]),
        ]}
      />

      <HeaderNav />

      <main className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-zinc-300 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/resources/how-to-reduce-dso" className="hover:text-zinc-300 transition-colors">Resources</Link>
          <span>/</span>
          <span className="text-zinc-300">B2B Dunning Email Templates</span>
        </nav>

        {/* Hero Section */}
        <header className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Complete AR Collection Playbook & Template Library</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            B2B Dunning Email Templates: 10 Field-Tested Scripts & AI Prompt Directives
          </h1>
          <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed">
            Stop losing client relationships to cold, generic overdue notices. Explore 10 copy-paste collection email templates mapped across our 5 escalation tiers—paired with the exact Groq LLaMA 3.1 AI prompt directives that eliminate template fatigue.
          </p>
        </header>

        {/* The Problem with Static Templates Callout */}
        <section className="mb-16 p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Why 70% of Static Dunning Emails Go Unread</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                When accounting teams blast the exact same boilerplate overdue reminder every week, debtors develop <strong className="text-zinc-200">template blindness</strong>. Modern mail providers (Google Workspace, Office 365) detect identical template bulk dispatch, lowering domain deliverability into junk folders. Jaktra solves this by modulating tone, timing, and phrasing dynamically using generative AI.
              </p>
            </div>
            <Link
              to="/features/5-stage-escalation"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-sm text-white font-medium transition-colors shrink-0"
            >
              <span>Explore Tone Engine</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Live Variable Customizer Bar */}
        <section className="mb-10 p-5 rounded-xl bg-zinc-900/40 border border-white/10">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            <span>Customize Template Preview Variables</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <div>
              <label className="block text-zinc-500 mb-1">Recipient Name</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-zinc-500 mb-1">Debtor Company</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-zinc-500 mb-1">Invoice Number</label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-zinc-500 mb-1">Amount Due</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-zinc-500 mb-1">Due Date</label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-zinc-500 mb-1">Your Company</label>
              <input
                type="text"
                value={senderCompany}
                onChange={(e) => setSenderCompany(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Interactive Template Selector & Viewer */}
        <section className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Template Navigation */}
          <div className="lg:col-span-5 space-y-2">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              Select Template by Escalation Stage
            </h2>
            <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
              {TEMPLATES.map((tmpl) => {
                const isSelected = tmpl.id === selectedTemplate.id;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => {
                      setSelectedTemplate(tmpl);
                      setCopied(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-zinc-800/80 border-white/30 shadow-lg shadow-black/40"
                        : "bg-zinc-900/40 border-white/5 hover:border-white/20 hover:bg-zinc-900/70"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${tmpl.badgeColor}`}>
                        Stage {tmpl.stageNum}: {tmpl.stageName}
                      </span>
                      <span className="text-[11px] text-zinc-500">{tmpl.timing}</span>
                    </div>
                    <div className="text-sm font-semibold text-white">{tmpl.title}</div>
                    <div className="text-xs text-zinc-400 truncate mt-1">
                      {tmpl.subject.replace(/{invoiceNumber}/g, invoiceNumber)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Template Preview & Action Box */}
          <div className="lg:col-span-7 bg-zinc-900/60 border border-white/10 rounded-2xl p-6 relative">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-5">
              <div>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded border ${selectedTemplate.badgeColor}`}>
                  Stage {selectedTemplate.stageNum} — {selectedTemplate.timing}
                </span>
                <h3 className="text-lg font-bold text-white mt-2">{selectedTemplate.title}</h3>
                <div className="text-xs text-zinc-400 mt-0.5">Tone: <span className="text-zinc-200">{selectedTemplate.tone}</span></div>
              </div>

              {/* Tab Switcher: Static vs AI Prompt Directive */}
              <div className="flex items-center gap-1 bg-black/60 p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => setActiveTab("template")}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    activeTab === "template" ? "bg-white text-zinc-950 shadow" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Email Copy
                </button>
                <button
                  onClick={() => setActiveTab("aiPrompt")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${
                    activeTab === "aiPrompt" ? "bg-blue-600 text-white shadow" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>AI Prompt</span>
                </button>
              </div>
            </div>

            {activeTab === "template" ? (
              <div>
                {/* Subject Line Bar */}
                <div className="mb-4 bg-black/40 border border-white/5 rounded-lg p-3">
                  <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1">Subject Line</div>
                  <div className="text-sm font-mono text-zinc-200 select-all">{resolvedSubject}</div>
                </div>

                {/* Email Body */}
                <div className="mb-6 bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-xs sm:text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed select-all">
                  {resolvedBody}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/5">
                  <div className="text-xs text-zinc-500">
                    One-click payment links use <code className="text-zinc-400">/i/:token</code> zero-login URLs.
                  </div>
                  <button
                    onClick={() => handleCopy(`Subject: ${resolvedSubject}\n\n${resolvedBody}`)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-zinc-950 font-medium text-xs sm:text-sm hover:bg-zinc-200 transition-colors shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Full Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4 text-xs text-zinc-400 leading-relaxed">
                  Below is the system prompt directive injected into <strong className="text-white">Groq LLaMA 3.1</strong>. Jaktra replaces static templates with dynamic generative modulation, synthesizing invoice age, payment history, and dispute status.
                </div>
                <div className="mb-6 bg-black/60 border border-blue-500/20 rounded-lg p-4 font-mono text-xs sm:text-sm text-blue-200 whitespace-pre-wrap leading-relaxed select-all">
                  {resolvedAiPrompt}
                </div>
                <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/5">
                  <div className="text-xs text-zinc-500">
                    Groq LLaMA 3.1 8B inference runs in &lt;300ms per generated notice.
                  </div>
                  <button
                    onClick={() => handleCopy(resolvedAiPrompt)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-xs sm:text-sm hover:bg-blue-500 transition-colors shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied Prompt</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy AI Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 5-Stage AR Escalation Architecture Overview */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              The 5-Stage Tone Escalation Architecture
            </h2>
            <p className="text-sm text-zinc-400">
              How Jaktra balances maximum cash acceleration with long-term customer goodwill across aging milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-blue-500/20">
              <div className="text-xs font-bold text-blue-400 mb-1">Stage 1</div>
              <div className="text-sm font-semibold text-white mb-1">Collaborative Courtesy</div>
              <div className="text-xs text-zinc-500 mb-2">Days 0–7 Overdue</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Assumes accidental oversight. Verifies PO receipt and provides instant one-click payment portal links.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-emerald-500/20">
              <div className="text-xs font-bold text-emerald-400 mb-1">Stage 2</div>
              <div className="text-sm font-semibold text-white mb-1">Administrative Sync</div>
              <div className="text-xs text-zinc-500 mb-2">Days 8–14 Overdue</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Polite administrative check-in. Inquires if internal approval paperwork or routing assistance is needed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-amber-500/20">
              <div className="text-xs font-bold text-amber-400 mb-1">Stage 3</div>
              <div className="text-sm font-semibold text-white mb-1">Firm Notice & Plans</div>
              <div className="text-xs text-zinc-500 mb-2">Days 15–21 Overdue</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Direct accountability. Offers self-serve installment plans (2x/3x/4x) to recover cash without confrontation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-orange-500/20">
              <div className="text-xs font-bold text-orange-400 mb-1">Stage 4</div>
              <div className="text-sm font-semibold text-white mb-1">Urgent Hold Warning</div>
              <div className="text-xs text-zinc-500 mb-2">Days 22–30 Overdue</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Authoritative executive notice. Clearly states that continued default risks credit hold or service pause.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-red-500/20">
              <div className="text-xs font-bold text-red-400 mb-1">Stage 5</div>
              <div className="text-sm font-semibold text-white mb-1">Legal Stop & Review</div>
              <div className="text-xs text-zinc-500 mb-2">Day 31+ Overdue</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Automation halts completely. The file is locked and routed to human counsel to protect legal enforceability.
              </p>
            </div>
          </div>
        </section>

        {/* 4 Deliverability Pillars */}
        <section className="mb-20 p-8 rounded-2xl bg-zinc-900/40 border border-white/10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Why High-Performance Dunning Requires Deliverability Infrastructure
          </h2>
          <p className="text-sm text-zinc-400 mb-8 max-w-2xl">
            Even the best dunning email copy is useless if it lands in spam. Jaktra couples AI tone modulation with bulletproof email infrastructure.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">20-Hour Rolling Idempotency</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Guarantees no debtor is contacted twice within 20 hours, preventing aggressive spamming complaints.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Dead Letter Queue (DLQ)</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Catches delivery drops and retries on transient errors with exponential backoff schedules.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">3-Drop Circuit Breaker</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Halts outreach immediately if 3 consecutive emails bounce, protecting your corporate DKIM/SPF reputation.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Automated Dispute Triage</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Inbound replies with billing queries automatically pause all cadences to prevent tone-deaf follow-ups.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Frequently Asked Questions About B2B Dunning
            </h2>
            <p className="text-sm text-zinc-400">
              Everything finance and revenue leaders need to know about optimizing collection correspondence.
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-xl border border-white/10 bg-zinc-900/40 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-zinc-900/60 transition-colors"
                  >
                    <span className="text-sm font-medium text-white">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-white/15 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Automate These Email Cadences with AI in 15 Minutes
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-8">
            Connect your billing system to Jaktra today. 100% free during Early Access with zero credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-colors shadow-lg"
            >
              Get started free
            </Link>
            <Link
              to="/features/5-stage-escalation"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>See How Tone Engine Works</span>
              <ExternalLink className="w-4 h-4 text-zinc-400" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <img src={jaktraLogo} alt="Jaktra" width={18} height={18} className="h-4.5 w-4.5 block" />
            <span>&copy; {new Date().getFullYear()} Jaktra. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/pricing" className="hover:text-zinc-300 transition-colors">Pricing</Link>
            <Link to="/features/5-stage-escalation" className="hover:text-zinc-300 transition-colors">Tone Escalation</Link>
            <Link to="/resources/how-to-reduce-dso" className="hover:text-zinc-300 transition-colors">DSO Guide</Link>
            <Link to="/privacy" className="hover:text-zinc-300 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-zinc-300 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
