// Loads each page against a Nuxt dev server and prints Vue's hydration warnings.
// usage: node scripts/dev-warnings.mjs <baseUrl> <paths,...> [desktop|mobile]
import { chromium } from 'playwright'

const [base, pathArg, viewportName = 'desktop'] = process.argv.slice(2)
const viewport = viewportName === 'mobile' ? { width: 390, height: 844 } : { width: 1440, height: 900 }
const chromeUA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36'
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM })

for (const path of pathArg.split(',')) {
  const context = await browser.newContext({ viewport, userAgent: chromeUA })
  const page = await context.newPage()
  const messages = []
  page.on('console', msg => {
    const text = msg.text()
    if (/hydrat|mismatch/i.test(text)) messages.push(text.split('\n').slice(0, 4).join(' ⏎ '))
  })
  page.on('pageerror', e => messages.push(`pageerror: ${e.message}`))
  await page.goto(base + path, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  console.log(`${messages.length ? 'WARN' : 'ok  '} ${path}`)
  for (const m of messages) console.log(`    ${m.slice(0, 400)}`)
  await context.close()
}
await browser.close()
