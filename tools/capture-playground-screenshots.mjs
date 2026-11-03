#!/usr/bin/env node
import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { chromium } from "playwright"

const root = join(import.meta.dirname, "..")
const outDir = join(root, "artifacts")
mkdirSync(outDir, { recursive: true })

const baseUrl = process.env.PLAYGROUND_URL ?? "http://localhost:4317/"

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })

await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 60_000 })
await page.waitForFunction(
  () => document.querySelectorAll("[data-ink-ready]").length > 5,
  { timeout: 30_000 },
)
await page.waitForTimeout(600)

async function shot(name) {
  const path = join(outDir, name)
  await page.screenshot({ path, fullPage: false })
  console.log("wrote", path)
}

await shot("01-hero-buttons.png")

await page.getByRole("heading", { name: "Input · states" }).scrollIntoViewIfNeeded()
await page.waitForTimeout(400)
await shot("02-forms.png")

await page.getByRole("button", { name: "Open sand dialog" }).scrollIntoViewIfNeeded()
await page.waitForTimeout(200)
await page.getByRole("button", { name: "Open sand dialog" }).click()
await page.waitForSelector('[data-slot="dialog-content"][data-state="open"]', { timeout: 10_000 })
await page.waitForTimeout(500)
await shot("03-overlays.png")
await page.keyboard.press("Escape")
await page.waitForTimeout(300)

await page.getByRole("heading", { name: "Calendar · sand grid" }).scrollIntoViewIfNeeded()
await page.waitForTimeout(500)
await shot("04-calendar.png")

await page.getByRole("heading", { name: "Date picker · popover" }).scrollIntoViewIfNeeded()
await page.waitForTimeout(200)
const dateTrigger = page
  .getByRole("heading", { name: "Date picker · popover" })
  .locator("..")
  .getByRole("button")
  .first()
await dateTrigger.click()
await page.waitForSelector('[data-slot="popover-content"][data-state="open"]', { timeout: 10_000 })
await page.waitForTimeout(400)
await shot("05-date-picker-open.png")

await browser.close()
