// Captura screenshots do dev server (localhost:5173) nos 3 breakpoints do Figma.
// Uso: 1) npm run dev  2) npm run shots   → gera shots/*.png
// Precisa de Chrome ou Edge instalado (usa puppeteer-core, sem baixar browser).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'shots')
const URL = process.env.URL || 'http://localhost:5173/'

const CANDIDATES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
]
const CHROME = process.env.CHROME || CANDIDATES.find((p) => p && fs.existsSync(p))
if (!CHROME) {
  console.error('Nenhum Chrome/Edge encontrado. Defina CHROME=caminho\\para\\chrome.exe')
  process.exit(1)
}

const sizes = [
  { name: 'mobile', width: 375, height: 900 },
  { name: 'tablet', width: 800, height: 950 },
  { name: 'desktop', width: 1440, height: 950 },
]

fs.mkdirSync(OUT, { recursive: true })
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--force-device-scale-factor=1'],
})
try {
  for (const s of sizes) {
    const page = await browser.newPage()
    await page.setViewport({ width: s.width, height: s.height, deviceScaleFactor: 1 })
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 })
    await page.evaluate(async () => {
      await document.fonts.ready
      await Promise.all(
        [...document.images].map((i) => (i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r }))),
      )
    })
    // captura cada <section> separada, rolando até ela pra disparar reveals whileInView
    const count = await page.evaluate(() => document.querySelectorAll('section').length)
    for (let idx = 0; idx < count; idx++) {
      await page.evaluate((i) => {
        document.querySelectorAll('section')[i].scrollIntoView({ block: 'start' })
      }, idx)
      await new Promise((r) => setTimeout(r, 1800))
      const el = (await page.$$('section'))[idx]
      await el.screenshot({ path: path.join(OUT, `${s.name}-s${idx + 1}.png`) })
      console.log(`✓ shots/${s.name}-s${idx + 1}.png`)
    }
    await page.close()
  }
} finally {
  await browser.close()
}
