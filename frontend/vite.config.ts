import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createServer } from 'http'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, join, extname } from 'path'

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

const PRERENDER_ROUTES = [
  '/',
  '/privacy',
  '/terms',
  '/docs',
  '/login',
  '/register',
  '/forgot-password',
]

function prerenderPlugin(): Plugin {
  return {
    name: 'vite-plugin-prerender-seo',
    apply: 'build',
    closeBundle: {
      sequential: true,
      order: 'post',
      async handler() {
        if (process.env.VITEST) return

        const distDir = resolve(process.cwd(), 'dist')
        const indexPath = join(distDir, 'index.html')
        if (!existsSync(indexPath)) return

        const spaTemplate = readFileSync(indexPath, 'utf-8')
        console.log('\n🔍 [Prerender] Starting static HTML generation for 7 routes...')

        const server = createServer((req, res) => {
          const url = new URL(req.url || '/', 'http://localhost')
          const pathname = url.pathname

          const ext = extname(pathname)
          if (ext && ext !== '.html') {
            const filePath = join(distDir, pathname)
            if (existsSync(filePath)) {
              res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' })
              res.end(readFileSync(filePath))
              return
            }
          }

          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
          res.end(spaTemplate)
        })

        await new Promise<void>((resolveServer) => {
          server.listen(0, '127.0.0.1', () => resolveServer())
        })

        const address = server.address()
        const port = typeof address === 'object' && address ? address.port : 4174
        const serverUrl = `http://127.0.0.1:${port}`

        try {
          const { chromium } = await import('playwright')
          const browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
          })
          const context = await browser.newContext()

          for (const route of PRERENDER_ROUTES) {
            const page = await context.newPage()
            await page.goto(`${serverUrl}${route}`, { waitUntil: 'networkidle' })
            await page.waitForSelector('#root', { timeout: 10000 })
            await page.waitForTimeout(400)

            await page.evaluate(`
              document.querySelectorAll('[data-fallback]').forEach(function(el) { el.remove(); });
              var titles = Array.from(document.querySelectorAll('title'));
              if (titles.length > 1) {
                for (var i = 0; i < titles.length - 1; i++) {
                  titles[i].remove();
                }
              }
              var descs = Array.from(document.querySelectorAll('meta[name="description"]'));
              if (descs.length > 1) {
                for (var j = 0; j < descs.length - 1; j++) {
                  descs[j].remove();
                }
              }
            `)

            const html = await page.content()
            const outPath = route === '/' ? indexPath : join(distDir, route, 'index.html')
            mkdirSync(resolve(outPath, '..'), { recursive: true })
            writeFileSync(outPath, html, 'utf-8')
            console.log(`  ✅ Prerendered ${route} → ${route === '/' ? 'dist/index.html' : `dist${route}/index.html`}`)
            await page.close()
          }

          await browser.close()
          console.log('🏁 [Prerender] All 7 routes successfully prerendered.\n')
        } catch (err) {
          console.error('⚠️ [Prerender] Warning: Failed to prerender routes:', err)
        } finally {
          server.close()
        }
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
