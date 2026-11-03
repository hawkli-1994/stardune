#!/usr/bin/env node
/** Embed file contents into public/r/*.json registry stubs. */
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(import.meta.dirname, "..")
const read = (p) => fs.readFileSync(path.join(root, p), "utf8")

const fieldDeps = [
  { path: "src/lib/ink/recipes/field-wash-frame.ts", type: "registry:lib", target: "lib/ink/recipes/field-wash-frame.ts" },
  { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
]

const panelDeps = [
  { path: "src/lib/ink/recipes/panel-wash.ts", type: "registry:lib", target: "lib/ink/recipes/panel-wash.ts" },
  { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
]

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
      ...fieldDeps,
    ],
  },
  {
    file: "public/r/textarea.json",
    meta: {
      name: "textarea",
      title: "Textarea",
      description: "Multiline sand-slip field with shared watercolor frame.",
      type: "registry:ui",
      dependencies: [],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/textarea.tsx", type: "registry:ui", target: "components/ui/textarea.tsx" },
      { path: "src/lib/ink/recipes/textarea-ink.ts", type: "registry:lib", target: "lib/ink/recipes/textarea-ink.ts" },
      ...fieldDeps,
    ],
  },
  {
    file: "public/r/label.json",
    meta: {
      name: "label",
      title: "Label",
      description: "Radix label with optional decorative ink underline.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/label.tsx", type: "registry:ui", target: "components/ui/label.tsx" },
      { path: "src/lib/ink/recipes/label-ink.ts", type: "registry:lib", target: "lib/ink/recipes/label-ink.ts" },
    ],
  },
  {
    file: "public/r/select.json",
    meta: {
      name: "select",
      title: "Select",
      description: "Input-like trigger and sand-slip dropdown panel ink.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/select.tsx", type: "registry:ui", target: "components/ui/select.tsx" },
      { path: "src/lib/ink/recipes/select-ink.ts", type: "registry:lib", target: "lib/ink/recipes/select-ink.ts" },
      ...fieldDeps,
    ],
  },
  {
    file: "public/r/switch.json",
    meta: {
      name: "switch",
      title: "Switch",
      description: "Watercolor track and thumb; baobab/rose when checked.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/switch.tsx", type: "registry:ui", target: "components/ui/switch.tsx" },
      { path: "src/lib/ink/recipes/switch-ink.ts", type: "registry:lib", target: "lib/ink/recipes/switch-ink.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/radio-group.json",
    meta: {
      name: "radio-group",
      title: "Radio Group",
      description: "Ink circle radio with rose/baobab selected wash.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/radio-group.tsx", type: "registry:ui", target: "components/ui/radio-group.tsx" },
      { path: "src/lib/ink/recipes/radio-ink.ts", type: "registry:lib", target: "lib/ink/recipes/radio-ink.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/checkbox.json",
    meta: {
      name: "checkbox",
      title: "Checkbox",
      description: "Watercolor square with baobab check and horizon indeterminate stroke.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/checkbox.tsx", type: "registry:ui", target: "components/ui/checkbox.tsx" },
      { path: "src/lib/ink/recipes/checkbox-ink.ts", type: "registry:lib", target: "lib/ink/recipes/checkbox-ink.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/dialog.json",
    meta: {
      name: "dialog",
      title: "Dialog",
      description: "Dusk CSS overlay and sand-slip dialog panel ink.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/dialog.tsx", type: "registry:ui", target: "components/ui/dialog.tsx" },
      { path: "src/lib/ink/recipes/dialog-ink.ts", type: "registry:lib", target: "lib/ink/recipes/dialog-ink.ts" },
      ...panelDeps,
    ],
  },
  {
    file: "public/r/popover.json",
    meta: {
      name: "popover",
      title: "Popover",
      description: "Sand-slip popover panel ink.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/popover.tsx", type: "registry:ui", target: "components/ui/popover.tsx" },
      { path: "src/lib/ink/recipes/popover-ink.ts", type: "registry:lib", target: "lib/ink/recipes/popover-ink.ts" },
      ...panelDeps,
    ],
  },
  {
    file: "public/r/tabs.json",
    meta: {
      name: "tabs",
      title: "Tabs",
      description: "Tab triggers with rose and horizon active ink.",
      type: "registry:ui",
      dependencies: ["class-variance-authority", "radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/tabs.tsx", type: "registry:ui", target: "components/ui/tabs.tsx" },
      { path: "src/lib/ink/recipes/tabs-ink.ts", type: "registry:lib", target: "lib/ink/recipes/tabs-ink.ts" },
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
      ...panelDeps,
    ],
  },
  {
    file: "public/r/slider.json",
    meta: {
      name: "slider",
      title: "Slider",
      description: "Sand track with rose/baobab range wash and star focus thumb.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/slider.tsx", type: "registry:ui", target: "components/ui/slider.tsx" },
      { path: "src/lib/ink/recipes/slider-ink.ts", type: "registry:lib", target: "lib/ink/recipes/slider-ink.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/progress.json",
    meta: {
      name: "progress",
      title: "Progress",
      description: "Sand-slip track with rose/horizon watercolor fill.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/progress.tsx", type: "registry:ui", target: "components/ui/progress.tsx" },
      { path: "src/lib/ink/recipes/progress-ink.ts", type: "registry:lib", target: "lib/ink/recipes/progress-ink.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/tooltip.json",
    meta: {
      name: "tooltip",
      title: "Tooltip",
      description: "Compact sand-slip tooltip panel ink.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/tooltip.tsx", type: "registry:ui", target: "components/ui/tooltip.tsx" },
      { path: "src/lib/ink/recipes/tooltip-ink.ts", type: "registry:lib", target: "lib/ink/recipes/tooltip-ink.ts" },
      { path: "src/lib/ink/recipes/panel-wash.ts", type: "registry:lib", target: "lib/ink/recipes/panel-wash.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/toast.json",
    meta: {
      name: "toast",
      title: "Toast",
      description: "Radix toast with sand-slip surface and useToast helper.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/toast.tsx", type: "registry:ui", target: "components/ui/toast.tsx" },
      { path: "src/hooks/use-toast.ts", type: "registry:hook", target: "hooks/use-toast.ts" },
      { path: "src/lib/ink/recipes/toast-ink.ts", type: "registry:lib", target: "lib/ink/recipes/toast-ink.ts" },
      { path: "src/lib/ink/recipes/panel-wash.ts", type: "registry:lib", target: "lib/ink/recipes/panel-wash.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/separator.json",
    meta: {
      name: "separator",
      title: "Separator",
      description: "Pencil and horizon rule separator ink.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/separator.tsx", type: "registry:ui", target: "components/ui/separator.tsx" },
      { path: "src/lib/ink/recipes/separator-ink.ts", type: "registry:lib", target: "lib/ink/recipes/separator-ink.ts" },
    ],
  },
  {
    file: "public/r/avatar.json",
    meta: {
      name: "avatar",
      title: "Avatar",
      description: "Circular sand-slip ring; Radix image and fallback.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/avatar.tsx", type: "registry:ui", target: "components/ui/avatar.tsx" },
      { path: "src/lib/ink/recipes/avatar-ink.ts", type: "registry:lib", target: "lib/ink/recipes/avatar-ink.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/skeleton.json",
    meta: {
      name: "skeleton",
      title: "Skeleton",
      description: "Sand-shade shimmer placeholder (busy ink layer).",
      type: "registry:ui",
      dependencies: [],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/skeleton.tsx", type: "registry:ui", target: "components/ui/skeleton.tsx" },
      { path: "src/lib/ink/recipes/skeleton-ink.ts", type: "registry:lib", target: "lib/ink/recipes/skeleton-ink.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/alert.json",
    meta: {
      name: "alert",
      title: "Alert",
      description: "Sand-slip alert panel with variant accent washes.",
      type: "registry:ui",
      dependencies: ["class-variance-authority"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/alert.tsx", type: "registry:ui", target: "components/ui/alert.tsx" },
      { path: "src/lib/ink/recipes/alert-ink.ts", type: "registry:lib", target: "lib/ink/recipes/alert-ink.ts" },
      { path: "src/lib/ink/recipes/panel-wash.ts", type: "registry:lib", target: "lib/ink/recipes/panel-wash.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/sheet.json",
    meta: {
      name: "sheet",
      title: "Sheet",
      description: "Dusk overlay slide-over with sand-slip panel ink.",
      type: "registry:ui",
      dependencies: ["class-variance-authority", "radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/sheet.tsx", type: "registry:ui", target: "components/ui/sheet.tsx" },
      { path: "src/lib/ink/recipes/sheet-ink.ts", type: "registry:lib", target: "lib/ink/recipes/sheet-ink.ts" },
      ...panelDeps,
    ],
  },
  {
    file: "public/r/scroll-area.json",
    meta: {
      name: "scroll-area",
      title: "Scroll Area",
      description: "Radix scroll area with watercolor thumb ink.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/scroll-area.tsx", type: "registry:ui", target: "components/ui/scroll-area.tsx" },
      { path: "src/lib/ink/recipes/scroll-area-ink.ts", type: "registry:lib", target: "lib/ink/recipes/scroll-area-ink.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/sidebar.json",
    meta: {
      name: "sidebar",
      title: "Sidebar",
      description: "Sand-slip sidebar rail with provider/inset/menu API.",
      type: "registry:ui",
      dependencies: ["class-variance-authority", "radix-ui"],
      registryDependencies: ["./stardune-theme.json", "./button.json"],
    },
    files: [
      { path: "src/components/ui/sidebar.tsx", type: "registry:ui", target: "components/ui/sidebar.tsx" },
      { path: "src/lib/ink/recipes/sidebar-ink.ts", type: "registry:lib", target: "lib/ink/recipes/sidebar-ink.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/table.json",
    meta: {
      name: "table",
      title: "Table",
      description: "Sand-slip table with pencil row rules.",
      type: "registry:ui",
      dependencies: [],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/table.tsx", type: "registry:ui", target: "components/ui/table.tsx" },
      { path: "src/lib/ink/recipes/table-ink.ts", type: "registry:lib", target: "lib/ink/recipes/table-ink.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/dropdown-menu.json",
    meta: {
      name: "dropdown-menu",
      title: "Dropdown Menu",
      description: "Sand panel dropdown with rose item hover ink.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/dropdown-menu.tsx", type: "registry:ui", target: "components/ui/dropdown-menu.tsx" },
      { path: "src/lib/ink/recipes/dropdown-menu-ink.ts", type: "registry:lib", target: "lib/ink/recipes/dropdown-menu-ink.ts" },
      { path: "src/lib/ink/recipes/panel-wash.ts", type: "registry:lib", target: "lib/ink/recipes/panel-wash.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/accordion.json",
    meta: {
      name: "accordion",
      title: "Accordion",
      description: "Sand-slip accordion with rose/horizon open trigger ink.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/accordion.tsx", type: "registry:ui", target: "components/ui/accordion.tsx" },
      { path: "src/lib/ink/recipes/disclosure-ink.ts", type: "registry:lib", target: "lib/ink/recipes/disclosure-ink.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/collapsible.json",
    meta: {
      name: "collapsible",
      title: "Collapsible",
      description: "Collapsible disclosure with shared trigger/content ink.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/collapsible.tsx", type: "registry:ui", target: "components/ui/collapsible.tsx" },
      { path: "src/lib/ink/recipes/disclosure-ink.ts", type: "registry:lib", target: "lib/ink/recipes/disclosure-ink.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/command.json",
    meta: {
      name: "command",
      title: "Command",
      description: "cmdk palette with Stardune sand panel and item washes.",
      type: "registry:ui",
      dependencies: ["cmdk", "radix-ui"],
      registryDependencies: ["./stardune-theme.json", "./dialog.json"],
    },
    files: [
      { path: "src/components/ui/command.tsx", type: "registry:ui", target: "components/ui/command.tsx" },
      { path: "src/lib/ink/recipes/command-ink.ts", type: "registry:lib", target: "lib/ink/recipes/command-ink.ts" },
      { path: "src/lib/ink/recipes/dropdown-menu-ink.ts", type: "registry:lib", target: "lib/ink/recipes/dropdown-menu-ink.ts" },
      { path: "src/lib/ink/recipes/field-wash-frame.ts", type: "registry:lib", target: "lib/ink/recipes/field-wash-frame.ts" },
      { path: "src/lib/ink/recipes/panel-wash.ts", type: "registry:lib", target: "lib/ink/recipes/panel-wash.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/combobox.json",
    meta: {
      name: "combobox",
      title: "Combobox",
      description: "Searchable combobox built from Popover + Command.",
      type: "registry:ui",
      dependencies: ["radix-ui"],
      registryDependencies: ["./stardune-theme.json", "./command.json", "./button.json"],
    },
    files: [{ path: "src/components/ui/combobox.tsx", type: "registry:ui", target: "components/ui/combobox.tsx" }],
  },
  {
    file: "public/r/calendar.json",
    meta: {
      name: "calendar",
      title: "Calendar",
      description: "DayPicker with Stardune sand panel and day washes.",
      type: "registry:ui",
      dependencies: ["react-day-picker", "date-fns", "class-variance-authority", "radix-ui"],
      registryDependencies: ["./stardune-theme.json", "./button.json"],
    },
    files: [
      { path: "src/components/ui/calendar.tsx", type: "registry:ui", target: "components/ui/calendar.tsx" },
      { path: "src/lib/ink/recipes/calendar-ink.ts", type: "registry:lib", target: "lib/ink/recipes/calendar-ink.ts" },
      { path: "src/lib/ink/recipes/panel-wash.ts", type: "registry:lib", target: "lib/ink/recipes/panel-wash.ts" },
      { path: "src/lib/ink/recipes/wash-utils.ts", type: "registry:lib", target: "lib/ink/recipes/wash-utils.ts" },
    ],
  },
  {
    file: "public/r/date-picker.json",
    meta: {
      name: "date-picker",
      title: "Date Picker",
      description: "Single and range pickers via Popover + Calendar.",
      type: "registry:ui",
      dependencies: ["date-fns", "react-day-picker", "radix-ui"],
      registryDependencies: ["./stardune-theme.json", "./button.json", "./popover.json", "./calendar.json"],
    },
    files: [{ path: "src/components/ui/date-picker.tsx", type: "registry:ui", target: "components/ui/date-picker.tsx" }],
  },
  {
    file: "public/r/badge.json",
    meta: {
      name: "badge",
      title: "Badge",
      description: "Soft sand-slip pill with rose, star, and baobab washes.",
      type: "registry:ui",
      dependencies: ["class-variance-authority", "radix-ui"],
      registryDependencies: ["./stardune-theme.json"],
    },
    files: [
      { path: "src/components/ui/badge.tsx", type: "registry:ui", target: "components/ui/badge.tsx" },
      { path: "src/lib/ink/recipes/badge-ink.ts", type: "registry:lib", target: "lib/ink/recipes/badge-ink.ts" },
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
