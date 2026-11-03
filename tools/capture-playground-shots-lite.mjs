#!/usr/bin/env node
import { mkdirSync, statSync, unlinkSync } from "node:fs"
import { join } from "node:path"
import { chromium } from "playwright"

const root = join(import.meta.dirname, "..")
const outDir = join(root, "docs/playground-shots")
mkdirSync(outDir, { recursive: true })

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
      return
    }
  }
  const size = statSync(path).size
  if (size > MAX_BYTES) {
    throw new Error(`${path} still ${size} bytes after min quality`)
  }
}

await shotJpeg("01-hero-buttons")

await page.getByRole("heading", { name: "Input · states" }).scrollIntoViewIfNeeded()
await page.waitForTimeout(400)
await shotJpeg("02-forms")

await page.getByRole("button", { name: "Open sand dialog" }).scrollIntoViewIfNeeded()
await page.waitForTimeout(200)
await page.getByRole("button", { name: "Open sand dialog" }).click()
await page.waitForSelector('[data-slot="dialog-content"][data-state="open"]', { timeout: 10_000 })
await page.waitForTimeout(500)
await shotJpeg("03-overlays")

await browser.close()

for (const n of ["01-hero-buttons", "02-forms", "03-overlays"]) {
  const png = join(outDir, `${n}.png`)
  try {
    unlinkSync(png)
    console.log("removed", png)
  } catch {
    /* no old png */
  }
}
