import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, join } from 'path'

interface SubrouteConfig {
  title: string
  description?: string
  canonical?: string
  noindex?: boolean
}

const PUBLIC_SUBROUTES: Record<string, SubrouteConfig> = {
  '/privacy': {
    title: 'Privacy Policy — Jaktra',
    description: 'How Jaktra collects, uses, and protects your data. Learn about our privacy practices, data retention, multi-tenant isolation, and your rights.',
    canonical: 'https://jaktra.site/privacy',
  },
  '/terms': {
    title: 'Terms of Service — Jaktra',
    description: 'Terms of Service and legal agreements governing the use of the Jaktra accounts receivable automation platform.',
    canonical: 'https://jaktra.site/terms',
  },
  '/docs': {
    title: 'Documentation — Jaktra',
    description: 'Developer documentation, API reference, integration guides, and setup tutorials for Jaktra accounts receivable automation.',
    canonical: 'https://jaktra.site/docs',
  },
  '/pricing': {
    title: 'Pricing — 100% Free During Early Access | Jaktra',
    description: 'Explore Jaktra AR automation pricing. 100% free during early access with zero credit card required. Experience autonomous AI collections with no invoice caps.',
    canonical: 'https://jaktra.site/pricing',
  },
  '/compare/highradius-vs-jaktra': {
    title: 'HighRadius vs Jaktra — Enterprise O2C Suite vs Focused AI Collections Agent',
    description: 'Comparing HighRadius and Jaktra? Learn why Jaktra is not a complete O2C suite replacement, but a focused, autonomous AI collections agent built for fast deployment and high recovery.',
    canonical: 'https://jaktra.site/compare/highradius-vs-jaktra',
  },
  '/compare/highradius-alternative': {
    title: 'HighRadius Alternative — Enterprise O2C Suite vs Focused AI Collections | Jaktra',
    description: 'Looking for a HighRadius alternative? Understand why Jaktra is not a complete O2C suite replacement, but a focused, autonomous AI collections agent built for fast deployment and high recovery.',
    canonical: 'https://jaktra.site/compare/highradius-vs-jaktra',
  },
  '/compare/upflow-alternative': {
    title: 'Upflow Alternative — Autonomous AI Tone Escalation vs Static Dunning | Jaktra',
    description: 'Compare Upflow vs Jaktra. Discover why finance teams upgrade from Upflow\'s static email templates to Jaktra\'s autonomous Groq LLaMA 3.1 tone escalation, NLP dispute triage, and tokenized payment portals.',
    canonical: 'https://jaktra.site/compare/upflow-alternative',
  },
  '/features/5-stage-escalation': {
    title: 'Autonomous 5-Stage AR Tone Escalation Engine — Jaktra',
    description: 'Explore Jaktra\'s 5-stage generative tone escalation engine. How Groq LLaMA 3.1, predictive ML delinquency risk scoring, the 20-hour idempotency guard, and Stage 5 Legal Stop recover cash without client friction.',
    canonical: 'https://jaktra.site/features/5-stage-escalation',
  },
  '/features/dispute-triage': {
    title: 'AI Invoice Dispute Management & Sentiment Triage — Jaktra',
    description: 'Discover how Jaktra\'s NLP DisputeAgent classifies inbound billing inquiries, automatically freezes collection cadences, and drafts suggested resolutions for finance approval.',
    canonical: 'https://jaktra.site/features/dispute-triage',
  },
  '/features/installment-plans': {
    title: 'B2B Payment Plans & Structured AR Installments — Jaktra',
    description: 'Learn how Jaktra recovers at-risk overdue invoices by converting large balances into structured installment schedules via tokenized debtor portals with automated webhook tracking.',
    canonical: 'https://jaktra.site/features/installment-plans',
  },
  '/resources/how-to-reduce-dso': {
    title: 'How to Reduce Days Sales Outstanding (DSO): Countback Math & 5 Levers — Jaktra',
    description: 'A comprehensive guide for CFOs and Controllers on calculating DSO using the Countback method, benchmarking across B2B industries, and cutting DSO by 15–25 days with autonomous AI collections.',
    canonical: 'https://jaktra.site/resources/how-to-reduce-dso',
  },
  '/compare/chaser-alternative': {
    title: 'Chaser Alternative — Autonomous Generative AI AR Agent vs Static Dunning | Jaktra',
    description: 'Compare Chaser vs Jaktra. Learn why finance leaders upgrade from Chaser\'s static email templates and manual phone call tracking to Jaktra\'s autonomous AI agent, tokenized debtor portals, and Razorpay settlement.',
    canonical: 'https://jaktra.site/compare/chaser-alternative',
  },
  '/compare/paidnice-alternative': {
    title: 'PaidNice Alternative — Autonomous AI Tone Escalation vs Static Late Fees | Jaktra',
    description: 'Compare PaidNice vs Jaktra. Learn why finance teams upgrade from PaidNice\'s punitive static late fees to Jaktra\'s autonomous Groq LLaMA 3.1 tone escalation, NLP dispute triage, and self-serve installment recovery.',
    canonical: 'https://jaktra.site/compare/paidnice-alternative',
  },
  '/use-cases/saas': {
    title: 'AI Accounts Receivable Automation for B2B SaaS — Jaktra',
    description: 'Eliminate manual collections for B2B SaaS. Recover overdue ARR, resolve billing disputes autonomously, and protect Net Revenue Retention with Jaktra.',
    canonical: 'https://jaktra.site/use-cases/saas',
  },
  '/use-cases/agencies': {
    title: 'AI Accounts Receivable Automation for Digital Agencies — Jaktra',
    description: 'Eliminate awkward client retainer chasing for creative and digital agencies. Protect client relationships, resolve scope disputes autonomously, and accelerate cash flow with Jaktra.',
    canonical: 'https://jaktra.site/use-cases/agencies',
  },
  '/use-cases/manufacturing': {
    title: 'AI Accounts Receivable Automation for Manufacturing & Supply Chain — Jaktra',
    description: 'Accelerate cash flow in manufacturing. Resolve PO matching disputes, manage Net 60/90 terms, and eliminate receivables drag with autonomous AI dunning.',
    canonical: 'https://jaktra.site/use-cases/manufacturing',
  },
  '/resources/5-stage-ar-tone-escalation': {
    title: 'The 5-Stage AR Tone Escalation Playbook — Jaktra',
    description: 'A comprehensive guide on designing 5-stage accounts receivable escalation cadences that recover 85%+ of overdue invoices without destroying commercial customer relationships.',
    canonical: 'https://jaktra.site/resources/5-stage-ar-tone-escalation',
  },
  '/use-cases/professional-services': {
    title: 'AI Accounts Receivable Automation for Professional Services & Legal — Jaktra',
    description: 'Eliminate partner billing friction for law firms, consultancies, and accounting practices. Triage billable hours scope disputes, automate retainer top-ups, and accelerate cash flow with Jaktra.',
    canonical: 'https://jaktra.site/use-cases/professional-services',
  },
  '/features/zero-login-portal': {
    title: 'Tokenized Zero-Login Debtor Payment Portal Architecture — Jaktra',
    description: 'Explore Jaktra\'s cryptographic zero-login debtor portal (/i/:token). Eliminate 70%+ customer portal drop-off with one-click statements, instant settlement, and self-service installment plans.',
    canonical: 'https://jaktra.site/features/zero-login-portal',
  },
  '/features/email-deliverability': {
    title: 'Dunning Email Deliverability & DLQ Resilience — Jaktra',
    description: 'Protect your primary email domain reputation with Jaktra\'s Dead Letter Queue (DLQ), multi-provider failover (SendGrid, Resend, SMTP), and automated 3-drop circuit breakers.',
    canonical: 'https://jaktra.site/features/email-deliverability',
  },
  '/features/risk-scoring': {
    title: 'Predictive ML Accounts Receivable Delinquency Scoring — Jaktra',
    description: 'Stratify overdue debtors with multi-feature ML risk scoring. Evaluate aging, dollar concentration, follow-up history, and payment velocity to prioritize high-risk collections.',
    canonical: 'https://jaktra.site/features/risk-scoring',
  },
  '/resources/b2b-dunning-email-templates': {
    title: 'B2B Dunning Email Templates: 10 Battle-Tested AR Follow-Up Scripts | Jaktra',
    description: '10+ battle-tested B2B accounts receivable collection email templates across 5 escalation stages. Explore copy-paste templates alongside Groq LLaMA 3.1 AI prompt directives and compliance rules.',
    canonical: 'https://jaktra.site/resources/b2b-dunning-email-templates',
  },
  '/use-cases/construction': {
    title: 'AI Accounts Receivable Automation for Construction & Subcontractors | Jaktra',
    description: 'Accelerate cash flow for commercial contractors and subcontractors. Automate progress billing reminders, triage change-order disputes, track retainage releases, and cut construction DSO with Jaktra.',
    canonical: 'https://jaktra.site/use-cases/construction',
  },
  '/use-cases/logistics-freight': {
    title: 'AI Accounts Receivable Automation for Logistics, Freight & 3PLs | Jaktra',
    description: 'Eliminate the freight working capital crunch. Automate shipper collection cadences, triage detention and accessorial disputes, cut freight factoring dependence, and accelerate cash flow with Jaktra.',
    canonical: 'https://jaktra.site/use-cases/logistics-freight',
  },
  '/use-cases/staffing-recruiting': {
    title: 'AI Accounts Receivable Automation for Staffing & Recruitment | Jaktra',
    description: 'Bridge the weekly contractor payroll gap for staffing and recruitment agencies. Automate client collection cadences, triage timesheet disputes via AI, eliminate payroll factoring fees, and accelerate cash flow.',
    canonical: 'https://jaktra.site/use-cases/staffing-recruiting',
  },
  '/use-cases/wholesale-distribution': {
    title: 'AI Accounts Receivable Automation for Wholesale & Distribution | Jaktra',
    description: 'Protect thin distributor margins. Automate retail and food service collection cadences, triage short-shipment and damaged pallet claims via AI, and accelerate working capital with Jaktra.',
    canonical: 'https://jaktra.site/use-cases/wholesale-distribution',
  },
  '/resources/ar-automation-roi-calculator': {
    title: 'B2B Accounts Receivable Automation ROI & Working Capital Calculator | Jaktra',
    description: 'Calculate your DSO reduction, working capital released, debt interest saved, and net 3-year ROI from automating accounts receivable collections with Jaktra.',
    canonical: 'https://jaktra.site/resources/ar-automation-roi-calculator',
  },
  '/compare/kolleno-alternative': {
    title: 'Kolleno Alternative — Autonomous Conversational AI vs Manual Collector Task Lists | Jaktra',
    description: 'Compare Kolleno vs Jaktra. Learn why finance teams choose Jaktra\'s autonomous Groq LLaMA 3.1 tone escalation and NLP dispute triage over Kolleno\'s manual collector task lists and multi-channel queues.',
    canonical: 'https://jaktra.site/compare/kolleno-alternative',
  },
  '/compare': {
    title: 'B2B Accounts Receivable Software Buyer\'s Guide & Alternatives Hub | Jaktra',
    description: 'Compare the leading B2B accounts receivable automation and dunning software. In-depth architectural comparisons of Jaktra vs HighRadius, Upflow, Chaser, Invoiced, Kolleno, Billtrust, and more.',
    canonical: 'https://jaktra.site/compare',
  },
  '/use-cases': {
    title: 'B2B Accounts Receivable Industry Solutions Directory & DSO Benchmarks | Jaktra',
    description: 'Explore tailored AI accounts receivable automation solutions across 14 B2B verticals. Benchmark industry DSO, calculate unlocked working capital, and deploy automated tone escalation with Jaktra.',
    canonical: 'https://jaktra.site/use-cases',
  },
  '/features': {
    title: 'Autonomous AI Accounts Receivable Capabilities & Features — Jaktra',
    description: 'Explore Jaktra\'s complete AR execution stack: 5-stage generative tone escalation, automated dispute reply triage, tokenized zero-login debtor portals, Dead Letter Queue resilience, and predictive ML risk scoring.',
    canonical: 'https://jaktra.site/features',
  },
  '/resources': {
    title: 'B2B Accounts Receivable Guides, Tools & Research — Jaktra',
    description: 'Free, research-backed guides, financial models, and operational playbooks for CFOs, Controllers, and AR teams to accelerate cash flow and reduce DSO.',
    canonical: 'https://jaktra.site/resources',
  },
  '/login': {
    title: 'Sign In — Jaktra',
    noindex: true,
  },
  '/register': {
    title: 'Get Started — Jaktra',
    noindex: true,
  },
  '/forgot-password': {
    title: 'Reset Password — Jaktra',
    noindex: true,
  },
}

function subrouteHtmlPlugin(): Plugin {
  return {
    name: 'vite-plugin-subroute-seo-html',
    apply: 'build',
    closeBundle: {
      sequential: true,
      order: 'post',
      handler() {
        if (process.env.VITEST) return

        const distDir = resolve(process.cwd(), 'dist')
        const indexPath = join(distDir, 'index.html')
        if (!existsSync(indexPath)) return

        const indexHtml = readFileSync(indexPath, 'utf-8')
        console.log('\n📄 [SEO Plugin] Generating static entry HTML for public routes...')

        for (const [route, config] of Object.entries(PUBLIC_SUBROUTES)) {
          let pageHtml = indexHtml

          // Update title tag
          pageHtml = pageHtml.replace(
            /<title>.*?<\/title>/,
            `<title>${config.title}</title>`
          )

          // Update meta description if specified
          if (config.description) {
            pageHtml = pageHtml.replace(
              /<meta name="description" content="[^"]*"\s*\/?>/,
              `<meta name="description" content="${config.description}" />`
            )
            pageHtml = pageHtml.replace(
              /<meta property="og:description" content="[^"]*"\s*\/?>/,
              `<meta property="og:description" content="${config.description}" />`
            )
            pageHtml = pageHtml.replace(
              /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
              `<meta name="twitter:description" content="${config.description}" />`
            )
          }

          // Update canonical tag if specified
          if (config.canonical) {
            pageHtml = pageHtml.replace(
              /<link rel="canonical" href="[^"]*"\s*\/?>/,
              `<link rel="canonical" href="${config.canonical}" />`
            )
            pageHtml = pageHtml.replace(
              /<meta property="og:url" content="[^"]*"\s*\/?>/,
              `<meta property="og:url" content="${config.canonical}" />`
            )
          }

          // Inject noindex for non-public auth utility routes
          if (config.noindex) {
            pageHtml = pageHtml.replace(
              /<link rel="canonical"[^>]*>/,
              '<meta name="robots" content="noindex, nofollow" />'
            )
          }

          const outPath = join(distDir, route.replace(/^\//, ''), 'index.html')
          mkdirSync(resolve(outPath, '..'), { recursive: true })
          writeFileSync(outPath, pageHtml, 'utf-8')
          console.log(`  ✅ Generated static entry for ${route} → dist${route}/index.html`)
        }

        console.log('🏁 [SEO Plugin] All static route entry files generated successfully.\n')
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), subrouteHtmlPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
