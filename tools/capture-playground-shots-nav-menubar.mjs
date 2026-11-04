#!/usr/bin/env node
import { copyFileSync, mkdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { chromium } from "playwright"

const root = join(import.meta.dirname, "..")
const outDir = join(root, "docs/playground-shots")
const artifactsDir = join(root, "artifacts")
mkdirSync(outDir, { recursive: true })
mkdirSync(artifactsDir, { recursive: true })

const MAX_BYTES = 200 * 1024
const baseUrl = process.env.PLAYGROUND_URL ?? "http://localhost:4317/"

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 960, height: 700 } })

await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 60_000 })
await page.waitForFunction(
  () => document.querySelectorAll("[data-ink-ready]").length > 5,
  { timeout: 30_000 },
)
await page.waitForTimeout(600)

async function shotJpeg(basename) {
  const path = join(outDir, `${basename}.jpg`)
  for (const quality of [82, 72, 62, 52, 42, 32]) {
    await page.screenshot({ path, type: "jpeg", quality, fullPage: false })
    const size = statSync(path).size
    if (size <= MAX_BYTES) {
      console.log(`wrote ${path} (${size} bytes, quality=${quality})`)
      copyFileSync(path, join(artifactsDir, `${basename}.jpg`))
      console.log(`copied to ${join(artifactsDir, `${basename}.jpg`)}`)
      return { path, size }
    }
  }
  throw new Error(`${path} exceeds ${MAX_BYTES} bytes after min quality`)
}

await page.getByRole("heading", { name: "Navigation menu · top nav" }).scrollIntoViewIfNeeded()
await page.waitForTimeout(300)
await page.getByRole("button", { name: "Explore" }).click()
await page.waitForSelector('[data-slot="navigation-menu-viewport"][data-state="open"]', { timeout: 10_000 })
await page.waitForTimeout(500)
const nav = await shotJpeg("06-navigation-menu")

await page.keyboard.press("Escape")
await page.waitForTimeout(250)

await page.getByRole("heading", { name: "Menubar · desktop menus" }).scrollIntoViewIfNeeded()
await page.waitForTimeout(300)
await page.getByRole("menuitem", { name: "View" }).click()
await page.waitForSelector('[data-slot="menubar-content"][data-state="open"]', { timeout: 10_000 })
await page.waitForTimeout(500)
const bar = await shotJpeg("07-menubar")

await browser.close()
console.log(JSON.stringify({ nav, bar }, null, 2))
