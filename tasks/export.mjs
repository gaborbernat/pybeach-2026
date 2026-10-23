import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright-chromium'
import { spawnSync } from 'node:child_process'

mkdirSync('pdf', { recursive: true })
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome' })
try {
  for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 810 }, colorScheme: theme })
    await context.addInitScript(value => localStorage.setItem('slidev-color-schema', value), theme)
    const page = await context.newPage()
    await page.goto('http://localhost:3030/#/export', { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.locator('video').evaluateAll(async videos => Promise.all(videos.map(async video => {
      const poster = document.createElement('img')
      poster.src = video.poster
      poster.className = video.className
      await poster.decode()
      video.replaceWith(poster)
    })))
    await page.pdf({ path: `pdf/pybeach-2026-${theme}.pdf`, printBackground: true, preferCSSPageSize: true })
    await context.close()
  }
} finally {
  await browser.close()
}
const speaker = spawnSync(process.execPath, ['tasks/export-speaker.mjs'], { stdio: 'inherit' })
if (speaker.status !== 0) throw new Error('Speaker export failed')
