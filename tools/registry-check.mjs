#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(import.meta.dirname, "..")
const reg = JSON.parse(fs.readFileSync(path.join(root, "registry.json"), "utf8"))
let ok = true
for (const item of reg.items ?? []) {
  for (const file of item.files ?? []) {
    const p = path.join(root, file.path)
    if (!fs.existsSync(p)) {
      console.error(`missing registry file: ${file.path}`)
      ok = false
    }
  }
}
if (!ok) process.exit(1)
console.log(`registry ok (${reg.items?.length ?? 0} items)`)
