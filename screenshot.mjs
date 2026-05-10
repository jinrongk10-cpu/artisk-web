import { chromium } from 'playwright'

const URL = 'http://localhost:5174/'
const VIEWPORT = { width: 1920, height: 1080 }
const OUTPUT = 'artisk-fullpage.png'

async function main() {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()

  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 20000 })
  await page.waitForTimeout(3000)

  const bodyHeight = await page.evaluate(() => document.body.scrollHeight)
  await page.setViewportSize({ width: 1920, height: bodyHeight + 200 })
  await page.waitForTimeout(3000)

  await page.screenshot({
    path: OUTPUT,
    fullPage: true,
    type: 'png',
  })

  console.log(`✅ Screenshot saved: ${OUTPUT}`)
  await browser.close()
}

main().catch((err) => {
  console.error('❌ Screenshot failed:', err)
  process.exit(1)
})
