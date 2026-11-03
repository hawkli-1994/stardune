#!/usr/bin/env node
/** Embed file contents into public/r/*.json registry stubs. */
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(import.meta.dirname, "..")
const read = (p) => fs.readFileSync(path.join(root, p), "utf8")

const items = [
  {
    file: "public/r/button.json",
    meta: {
      name: "button",
      title: "Button",
      description: "Stardune primary action with watercolor ink frame (rose / star / outline variants).",
      type: "registry:ui",
      dependencies: ["class-variance-authority", "radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/button.tsx", type: "registry:ui", target: "components/ui/button.tsx" },
      { path: "src/lib/ink/recipes/button-ink.ts", type: "registry:lib", target: "lib/ink/recipes/button-ink.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/input.json",
    meta: {
      name: "input",
      title: "Input",
      description: "Sand-slip field with rose outline and star/horizon focus washes.",
      type: "registry:ui",
      dependencies: [],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/input.tsx", type: "registry:ui", target: "components/ui/input.tsx" },
      { path: "src/lib/ink/recipes/input-ink.ts", type: "registry:lib", target: "lib/ink/recipes/input-ink.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/card.json",
    meta: {
      name: "card",
      title: "Card",
      description: "Sand-slip card panel with loose double border (CardHeader/Content/Footer).",
      type: "registry:ui",
      dependencies: [],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/card.tsx", type: "registry:ui", target: "components/ui/card.tsx" },
      { path: "src/lib/ink/recipes/card-ink.ts", type: "registry:lib", target: "lib/ink/recipes/card-ink.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
]

for (const item of items) {
  const doc = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item.meta,
    files: item.files.map((f) => ({ ...f, content: read(f.path) })),
  }
  fs.writeFileSync(path.join(root, item.file), JSON.stringify(doc, null, 2))
  console.log("wrote", item.file)
}
