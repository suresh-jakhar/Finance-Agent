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
