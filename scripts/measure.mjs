// Compares the server-rendered layout (JS off) with the hydrated one (JS on), and records Chrome's
// layout-shift score while the JS download is delayed so the SSR HTML paints first.
// usage: node scripts/measure.mjs <baseUrl> <paths,...> [modes: desktop-hints,mobile-hints,desktop-nohints,mobile-nohints] [--verbose]
import { chromium } from 'playwright'

const [base = 'http://localhost:3456', pathArg = '/', modeArg = 'desktop-hints,mobile-hints,desktop-nohints,mobile-nohints'] = process.argv.slice(2).filter(a => !a.startsWith('--'))
const verbose = process.argv.includes('--verbose')
const viewports = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } }
// Chrome UA: the module answers with Critical-CH and Chromium retries with the real viewport size.
// Firefox UA: the module never asks for hints, so the server renders with ssr: true (width 0), like Firefox/Safari.
const chromeUA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36'
const firefoxUA = 'Mozilla/5.0 (X11; Linux x86_64; rv:150.0) Gecko/20100101 Firefox/150.0'
const selectors = ['#probe', '.v-app-bar', '.v-toolbar__extension', '.v-navigation-drawer', '.v-bottom-navigation', '.v-footer', '.v-fab', '.v-fab .v-btn', '.v-layout-item']

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM })

function snapshot (page) {
  return page.evaluate(selectors => {
    const result = {}
    for (const selector of selectors) {
      const boxes = [...document.querySelectorAll(selector)].map(el => {
        const r = el.getBoundingClientRect()
        return [r.left, r.top, r.width, r.height].map(Math.round).join(',')
      })
      if (boxes.length) result[selector] = boxes.join(' | ')
    }
    const main = document.querySelector('.v-main')
    if (main) {
      const style = getComputedStyle(main)
      result['main padding'] = [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft].map(v => parseInt(v)).join(',')
    }
    return result
  }, selectors)
}

async function open ({ path, viewport, hints, js, delayJs }) {
  const context = await browser.newContext({ viewport, javaScriptEnabled: js, userAgent: hints ? chromeUA : firefoxUA })
  await context.addInitScript(() => {
    window.__shifts = []
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.hadRecentInput) continue
        window.__shifts.push({
          value: entry.value,
          sources: entry.sources.map(s => s.node?.id || s.node?.className?.toString().split(' ')[0] || s.node?.nodeName),
        })
      }
    }).observe({ type: 'layout-shift', buffered: true })
    window.__timeline = []
    function record () {
      const main = document.querySelector('.v-main')
      if (!main) return
      const style = getComputedStyle(main)
      const value = [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft].map(v => parseInt(v)).join(',')
      if (window.__timeline.at(-1) !== value) window.__timeline.push(value)
    }
    document.addEventListener('DOMContentLoaded', record)
    new MutationObserver(record).observe(document, { attributes: true, subtree: true, attributeFilter: ['style', 'class'] })
  })
  const page = await context.newPage()
  const warnings = []
  page.on('console', msg => /hydration|mismatch|\[Vue warn\]/i.test(msg.text()) && warnings.push(msg.text().split('\n')[0]))
  page.on('pageerror', e => warnings.push(`pageerror: ${e.message}`))
  if (delayJs) {
    await page.route('**/_nuxt/**', async route => {
      if (route.request().resourceType() === 'script') await new Promise(resolve => setTimeout(resolve, 600))
      await route.continue()
    })
  }
  await page.goto(base + path, { waitUntil: 'load' })
  if (js) {
    await page.waitForFunction(() => document.querySelector('#__nuxt')?.__vue_app__)
    await page.waitForTimeout(1200)
  }
  const result = await snapshot(page)
  if (js) {
    const shifts = await page.evaluate(() => window.__shifts)
    result.cls = shifts.reduce((sum, s) => sum + s.value, 0).toFixed(3)
    result.sources = [...new Set(shifts.flatMap(s => s.sources))].join(' ')
    result.timeline = (await page.evaluate(() => window.__timeline)).join(' → ')
  }
  result.warnings = warnings
  await context.close()
  return result
}

let failures = 0
for (const path of pathArg.split(',')) {
  for (const mode of modeArg.split(',')) {
    const [name, hintMode] = mode.split('-')
    const options = { path, viewport: viewports[name], hints: hintMode === 'hints' }
    const ssr = await open({ ...options, js: false })
    const hydrated = await open({ ...options, js: true, delayJs: true })
    const keys = [...new Set([...Object.keys(ssr), ...Object.keys(hydrated)])].filter(k => !['cls', 'sources', 'warnings', 'timeline'].includes(k))
    const diffs = keys.filter(k => ssr[k] !== hydrated[k])
    if (diffs.length) failures++
    console.log(`${diffs.length ? 'SHIFT' : 'ok   '} ${path} ${mode}  CLS=${hydrated.cls}${hydrated.sources ? ` (${hydrated.sources})` : ''}`)
    for (const k of verbose ? keys : diffs) {
      console.log(`    ${diffs.includes(k) ? '!' : ' '} ${k.padEnd(22)} ssr=${(ssr[k] ?? '-').padEnd(28)} hydrated=${hydrated[k] ?? '-'}`)
    }
    if (hydrated.timeline?.includes('→')) console.log(`    main padding timeline: ${hydrated.timeline}`)
    for (const w of hydrated.warnings) console.log(`    warn: ${w}`)
  }
}
await browser.close()
console.log(`${failures} case(s) with a difference between SSR and hydrated layout`)
